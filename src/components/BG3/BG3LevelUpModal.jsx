import React, { useState } from 'react';
import Modal from '../Common/Modal';
import {
  Shield, Heart, Award, Dices, ChevronRight
} from 'lucide-react';
import { SRD_CLASSES } from '../../data/srdClasses';
import { SRD_FEATS } from '../../data/srdFeats';
import { getAbilityModifier, getProficiencyBonus, hasFeat, getCalculatedAbilityScores } from '../../utils/dndRules';
import { activateOnKey } from '../../utils/a11y';

// Mount the dialog only while open, keyed to the character's current level, so every
// opening starts from fresh state instead of the previous session's choices.
export default function BG3LevelUpModal({ isOpen, onClose, character, onSaveLeveledCharacter }) {
  if (!isOpen || !character) return null;
  return (
    <LevelUpDialog
      key={`${character.id}-${character.level || 1}`}
      onClose={onClose}
      character={character}
      onSaveLeveledCharacter={onSaveLeveledCharacter}
    />
  );
}

function LevelUpDialog({ onClose, character, onSaveLeveledCharacter }) {
  const currentLevel = character.level || 1;
  const targetLevel = Math.min(20, currentLevel + 1);

  const classData = SRD_CLASSES.find(c => c.id === character.classId) || SRD_CLASSES[0];
  const hitDie = classData.hitDie || 8;
  const conMod = getAbilityModifier(getCalculatedAbilityScores(character).con);

  const isHillDwarf = character.subraceId === 'hill-dwarf';
  const hasToughFeat = hasFeat(character, 'Tough');
  const extraHpPerLevel = (isHillDwarf ? 1 : 0) + (hasToughFeat ? 2 : 0);

  const standardAvgGain = Math.max(1, Math.floor(hitDie / 2) + 1 + conMod + extraHpPerLevel);
  const [hpMethod, setHpMethod] = useState('average');
  const [rolledDieValue, setRolledDieValue] = useState(null);
  const [manualHpGain, setManualHpGain] = useState(standardAvgGain);

  const needsSubclass = targetLevel >= classData.subclassLevel && !character.subclassId;
  const [selectedSubclassId, setSelectedSubclassId] = useState(character.subclassId || (classData.subclasses[0]?.id || ''));

  // ASI or Feat Choice
  const isFighter = character.classId === 'fighter';
  const isRogue = character.classId === 'rogue';
  const isAsiLevel = [4, 8, 12, 16, 19].includes(targetLevel) ||
    (isFighter && [6, 14].includes(targetLevel)) ||
    (isRogue && targetLevel === 10);

  const [asiType, setAsiType] = useState('plusTwo'); // 'plusTwo', 'plusOnePlusOne', 'feat'
  const [plusTwoAbility, setPlusTwoAbility] = useState('str');
  const [plusOneFirst, setPlusOneFirst] = useState('str');
  const [plusOneSecond, setPlusOneSecond] = useState('dex');
  const [selectedFeatId, setSelectedFeatId] = useState(SRD_FEATS[0]?.id || 'tough');

  const handleRollHitDie = () => {
    const rolled = Math.floor(Math.random() * hitDie) + 1;
    setRolledDieValue(rolled);
    const total = Math.max(1, rolled + conMod + extraHpPerLevel);
    setManualHpGain(total);
    setHpMethod('rolled');
  };

  const classFeaturesAtTarget = classData.featuresByLevel?.[targetLevel] || [];
  const chosenSubclass = classData.subclasses.find(s => s.id === selectedSubclassId);
  const subclassFeaturesAtTarget = chosenSubclass?.featuresByLevel?.[targetLevel] || [];

  const isMaxLevel = currentLevel >= 20;

  // continueAfter keeps the dialog open; it remounts for the next level (keyed on level)
  const handleApplyLevelUp = (continueAfter = false) => {
    if (isMaxLevel) return;
    const hpToAdd = hpMethod === 'average' ? standardAvgGain : manualHpGain;
    const newMaxHp = (character.maxHp || 10) + hpToAdd;
    const newCurrentHp = (character.currentHp || 10) + hpToAdd;

    const newFeatures = [...(character.features || [])];

    classFeaturesAtTarget.forEach(f => {
      if (!newFeatures.some(ex => ex.name === f.name)) {
        newFeatures.push({
          id: `f-${targetLevel}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: f.name,
          source: `Class (Level ${targetLevel})`,
          description: f.description
        });
      }
    });

    if (chosenSubclass && targetLevel >= classData.subclassLevel) {
      subclassFeaturesAtTarget.forEach(sf => {
        if (!newFeatures.some(ex => ex.name === sf.name)) {
          newFeatures.push({
            id: `sf-${targetLevel}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            name: sf.name,
            source: `${chosenSubclass.name} (Level ${targetLevel})`,
            description: sf.description
          });
        }
      });
    }

    const customBonuses = { ...(character.customAbilityBonuses || { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 }) };

    if (isAsiLevel) {
      if (asiType === 'plusTwo') {
        customBonuses[plusTwoAbility] = (customBonuses[plusTwoAbility] || 0) + 2;
        newFeatures.push({
          id: `asi-${targetLevel}-${Date.now()}`,
          name: `Ability Score Improvement (+2 ${plusTwoAbility.toUpperCase()})`,
          source: `ASI (Level ${targetLevel})`,
          description: `Increased ${plusTwoAbility.toUpperCase()} by 2.`
        });
      } else if (asiType === 'plusOnePlusOne') {
        customBonuses[plusOneFirst] = (customBonuses[plusOneFirst] || 0) + 1;
        customBonuses[plusOneSecond] = (customBonuses[plusOneSecond] || 0) + 1;
        newFeatures.push({
          id: `asi-${targetLevel}-${Date.now()}`,
          name: `Ability Score Improvement (+1 ${plusOneFirst.toUpperCase()}, +1 ${plusOneSecond.toUpperCase()})`,
          source: `ASI (Level ${targetLevel})`,
          description: `Increased ${plusOneFirst.toUpperCase()} by 1 and ${plusOneSecond.toUpperCase()} by 1.`
        });
      } else if (asiType === 'feat') {
        const feat = SRD_FEATS.find(f => f.id === selectedFeatId);
        if (feat) {
          newFeatures.push({
            id: `feat-${feat.id}-${Date.now()}`,
            name: `Feat: ${feat.name}`,
            source: `Feat (Level ${targetLevel})`,
            description: feat.description
          });
        }
      }
    }

    // Only assign a subclass once the class's subclass level is reached
    const finalSubclassId = character.subclassId || (targetLevel >= classData.subclassLevel ? selectedSubclassId : '');

    const updated = {
      ...character,
      level: targetLevel,
      subclassId: finalSubclassId,
      // Derived from the saved id so the two fields can't disagree
      subclassName: classData.subclasses.find(sc => sc.id === finalSubclassId)?.name || '',
      maxHp: newMaxHp,
      currentHp: newCurrentHp,
      hitDiceMax: `${targetLevel}d${hitDie}`,
      customAbilityBonuses: customBonuses,
      features: newFeatures
    };

    onSaveLeveledCharacter(updated);
    if (!continueAfter) onClose();
  };

  return (
    <Modal onClose={onClose} className="bg3-overlay-dialog" labelledBy="bg3-levelup-title" closeOnBackdrop={false}>
      <div className="bg3-creator-container" style={{ width: '92vw', maxWidth: '1100px', gridTemplateColumns: '1fr 340px', height: '88vh' }}>

        {/* LEFT / CENTER STAGE: LEVEL-UP PERKS & CHOICES */}
        <div className="bg3-stage-panel">
          {/* Header Banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(223, 184, 90, 0.3)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <div id="bg3-levelup-title" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                LEVEL UP ADVANCEMENT
              </div>
              <div className="bg3-section-title" style={{ margin: 0 }}>
                {classData.name.toUpperCase()} &bull; LEVEL {targetLevel}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {/* One level per step, so every level's HP, ASI and subclass choice is made */}
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                {isMaxLevel ? 'Maximum level' : `Lvl ${currentLevel} → `}
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--text-gold)' }}>
                Lvl {isMaxLevel ? currentLevel : targetLevel}
              </span>
            </div>
          </div>

          {/* Hit Points Card */}
          <div style={{ background: 'linear-gradient(145deg, #18202d 0%, #11151e 100%)', border: '1.5px solid rgba(223, 184, 90, 0.3)', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 800 }}>
              <Heart size={18} style={{ color: 'var(--accent-red)' }} />
              <span>HIT POINTS INCREASE</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={hpMethod === 'average'}
                onClick={() => setHpMethod('average')}
                className={`bg3-card ${hpMethod === 'average' ? 'selected' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                <div className="bg3-card-header" style={{ fontSize: '1.1rem' }}>
                  Take Average (+{standardAvgGain} HP)
                </div>
                <div className="bg3-card-desc">
                  Fixed standard: {Math.floor(hitDie / 2) + 1} (d{hitDie} avg) + {conMod} (CON mod) {extraHpPerLevel ? `+ ${extraHpPerLevel} (traits)` : ''}
                </div>
              </div>

              <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={hpMethod === 'rolled'}
                onClick={() => { if (rolledDieValue === null) handleRollHitDie(); else setHpMethod('rolled'); }}
                className={`bg3-card ${hpMethod === 'rolled' ? 'selected' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="bg3-card-header" style={{ fontSize: '1.1rem' }}>
                    Roll 1d{hitDie} {rolledDieValue !== null && `(+${manualHpGain} HP)`}
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={(e) => { e.stopPropagation(); handleRollHitDie(); }}
                  >
                    <Dices size={14} />
                    <span>Roll</span>
                  </button>
                </div>
                <div className="bg3-card-desc">
                  {rolledDieValue !== null ? `Rolled ${rolledDieValue} on 1d${hitDie} + ${conMod} CON mod` : `Click to roll 1d${hitDie} live!`}
                </div>
              </div>
            </div>
          </div>

          {/* Subclass Selection */}
          {needsSubclass && (
            <div style={{ background: 'linear-gradient(145deg, #18202d 0%, #11151e 100%)', border: '1.5px solid var(--border-gold)', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 800 }}>
                <Shield size={18} />
                <span>SELECT SUBCLASS ARCHETYPE</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
                {classData.subclasses.map(sub => (
                  <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={selectedSubclassId === sub.id}
                    key={sub.id}
                    className={`bg3-card ${selectedSubclassId === sub.id ? 'selected' : ''}`}
                    onClick={() => setSelectedSubclassId(sub.id)}
                  >
                    <div className="bg3-card-header">{sub.name}</div>
                    <div className="bg3-card-desc">{sub.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ASI / Feats Selection */}
          {isAsiLevel && (
            <div style={{ background: 'linear-gradient(145deg, #18202d 0%, #11151e 100%)', border: '1.5px solid var(--border-gold)', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 800 }}>
                <Award size={18} />
                <span>ABILITY SCORE IMPROVEMENT OR FEAT</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <button
                  type="button"
                  className={`btn ${asiType === 'plusTwo' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'center' }}
                  onClick={() => setAsiType('plusTwo')}
                >
                  +2 to One Score
                </button>
                <button
                  type="button"
                  className={`btn ${asiType === 'plusOnePlusOne' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'center' }}
                  onClick={() => setAsiType('plusOnePlusOne')}
                >
                  +1 to Two Scores
                </button>
                <button
                  type="button"
                  className={`btn ${asiType === 'feat' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'center' }}
                  onClick={() => setAsiType('feat')}
                >
                  Choose Feat
                </button>
              </div>

              {asiType === 'plusTwo' && (
                <div className="form-group" style={{ margin: 0 }}>
                  <label htmlFor="bg3levelupmodal-ability-to-increase-by-2" className="form-label">Ability to increase by +2</label>
                  <select id="bg3levelupmodal-ability-to-increase-by-2"
                    className="form-select"
                    value={plusTwoAbility}
                    onChange={(e) => setPlusTwoAbility(e.target.value)}
                  >
                    <option value="str">Strength (+2)</option>
                    <option value="dex">Dexterity (+2)</option>
                    <option value="con">Constitution (+2)</option>
                    <option value="int">Intelligence (+2)</option>
                    <option value="wis">Wisdom (+2)</option>
                    <option value="cha">Charisma (+2)</option>
                  </select>
                </div>
              )}

              {asiType === 'plusOnePlusOne' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label htmlFor="bg3levelupmodal-first-ability-1" className="form-label">First Ability (+1)</label>
                    <select id="bg3levelupmodal-first-ability-1" className="form-select" value={plusOneFirst} onChange={(e) => setPlusOneFirst(e.target.value)}>
                      <option value="str">Strength</option>
                      <option value="dex">Dexterity</option>
                      <option value="con">Constitution</option>
                      <option value="int">Intelligence</option>
                      <option value="wis">Wisdom</option>
                      <option value="cha">Charisma</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label htmlFor="bg3levelupmodal-second-ability-1" className="form-label">Second Ability (+1)</label>
                    <select id="bg3levelupmodal-second-ability-1" className="form-select" value={plusOneSecond} onChange={(e) => setPlusOneSecond(e.target.value)}>
                      <option value="str">Strength</option>
                      <option value="dex">Dexterity</option>
                      <option value="con">Constitution</option>
                      <option value="int">Intelligence</option>
                      <option value="wis">Wisdom</option>
                      <option value="cha">Charisma</option>
                    </select>
                  </div>
                </div>
              )}

              {asiType === 'feat' && (
                <div className="form-group" style={{ margin: 0 }}>
                  <label htmlFor="bg3levelupmodal-feat-selection" className="form-label">Feat Selection</label>
                  <select id="bg3levelupmodal-feat-selection" className="form-select" value={selectedFeatId} onChange={(e) => setSelectedFeatId(e.target.value)}>
                    {SRD_FEATS.map(feat => (
                      <option key={feat.id} value={feat.id}>{feat.name} ({feat.prerequisite})</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Features Unlocked List */}
          {(classFeaturesAtTarget.length > 0 || subclassFeaturesAtTarget.length > 0) && (
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(223, 184, 90, 0.3)', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                FEATURES UNLOCKED AT LEVEL {targetLevel}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {classFeaturesAtTarget.map((f, i) => (
                  <div key={i} style={{ borderLeft: '3px solid var(--accent-gold)', paddingLeft: '0.65rem' }}>
                    <div style={{ fontWeight: 700, color: '#fff' }}>{f.name}</div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{f.description}</div>
                  </div>
                ))}
                {subclassFeaturesAtTarget.map((sf, i) => (
                  <div key={`sub-${i}`} style={{ borderLeft: '3px solid #60a5fa', paddingLeft: '0.65rem' }}>
                    <div style={{ fontWeight: 700, color: '#60a5fa' }}>{sf.name}</div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{sf.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PILLAR: CHARACTER SUMMARY & CONFIRM */}
        <div className="bg3-summary-pillar">
          <div className="bg3-portrait-frame">
            ⚔️
          </div>
          <div className="bg3-summary-name">
            {character.name}
          </div>
          <div className="bg3-summary-subtitle">
            Advancing to Level {targetLevel} {classData.name}
          </div>

          <div className="bg3-vitals-row">
            <div className="bg3-vital-cell">
              <div className="bg3-vital-val" style={{ color: 'var(--accent-red)' }}>
                {(character.maxHp || 10) + (hpMethod === 'average' ? standardAvgGain : manualHpGain)}
              </div>
              <div className="bg3-vital-lbl">Max HP</div>
            </div>
            <div className="bg3-vital-cell">
              <div className="bg3-vital-val">
                +{getProficiencyBonus(targetLevel)}
              </div>
              <div className="bg3-vital-lbl">Proficiency</div>
            </div>
            <div className="bg3-vital-cell">
              <div className="bg3-vital-val">
                {targetLevel}d{hitDie}
              </div>
              <div className="bg3-vital-lbl">Hit Dice</div>
            </div>
            <div className="bg3-vital-cell">
              <div className="bg3-vital-val">
                {character.speed || 30}ft
              </div>
              <div className="bg3-vital-lbl">Speed</div>
            </div>
          </div>

          <div style={{ flex: 1, borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.85rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>
              Level Advancement Highlights
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.4' }}>
              &bull; HP increases by <strong>+{hpMethod === 'average' ? standardAvgGain : manualHpGain}</strong>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.4' }}>
              &bull; Hit dice pool expanded to <strong>{targetLevel}d{hitDie}</strong>
            </div>
            {isAsiLevel && (
              <div style={{ fontSize: '0.82rem', color: 'var(--text-gold)', lineHeight: '1.4' }}>
                &bull; Gained Ability Score Improvement / Feat
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              type="button"
              className="bg3-btn-venture"
              onClick={() => handleApplyLevelUp(false)}
              disabled={isMaxLevel}
              title={isMaxLevel ? 'Already at maximum level (20)' : undefined}
            >
              <span>{isMaxLevel ? 'Maximum Level Reached' : 'Complete Level Up'}</span>
              <ChevronRight size={18} />
            </button>
            {targetLevel < 20 && !isMaxLevel && (
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center', color: 'var(--text-gold)', borderColor: 'var(--border-gold)' }}
                onClick={() => handleApplyLevelUp(true)}
              >
                Level Up &amp; Continue to Lvl {targetLevel + 1}
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>

      </div>
    </Modal>
  );
}
