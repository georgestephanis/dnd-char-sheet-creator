import React, { useState } from 'react';
import { X, TrendingUp, Sparkles, Shield, Heart, Award, Dices } from 'lucide-react';
import { SRD_CLASSES } from '../data/srdClasses';
import { SRD_FEATS } from '../data/srdFeats';
import { getAbilityModifier, getProficiencyBonus, getSpellSlotsForClass } from '../utils/dndRules';

export default function LevelUpModal({ isOpen, onClose, character, onSaveLeveledCharacter }) {
  if (!isOpen || !character) return null;

  const currentLevel = character.level || 1;
  const [targetLevel, setTargetLevel] = useState(Math.min(20, currentLevel + 1));

  const classData = SRD_CLASSES.find(c => c.id === character.classId) || SRD_CLASSES[0];
  const hitDie = classData.hitDie || 8;
  const conMod = getAbilityModifier((character.abilityScores?.con || 10) + (character.racialBonuses?.con || 0) + (character.customAbilityBonuses?.con || 0));

  // Extra HP bonuses (Hill dwarf +1, Tough feat +2)
  const isHillDwarf = character.subraceId === 'hill-dwarf';
  const hasToughFeat = character.features?.some(f => f.name.toLowerCase().includes('tough'));
  const extraHpPerLevel = (isHillDwarf ? 1 : 0) + (hasToughFeat ? 2 : 0);

  // HP gain choice: 'average' or 'rolled'
  const standardAvgGain = Math.max(1, Math.floor(hitDie / 2) + 1 + conMod + extraHpPerLevel);
  const [hpMethod, setHpMethod] = useState('average');
  const [rolledDieValue, setRolledDieValue] = useState(null);
  const [manualHpGain, setManualHpGain] = useState(standardAvgGain);

  // Subclass choice
  const needsSubclass = targetLevel >= classData.subclassLevel && !character.subclassId;
  const [selectedSubclassId, setSelectedSubclassId] = useState(character.subclassId || (classData.subclasses[0]?.id || ''));

  // ASI or Feat Choice
  // Check if targetLevel is an ASI level for this class
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

  // Get features unlocked at the target level
  const classFeaturesAtTarget = classData.featuresByLevel?.[targetLevel] || [];
  const chosenSubclass = classData.subclasses.find(s => s.id === selectedSubclassId);
  const subclassFeaturesAtTarget = chosenSubclass?.featuresByLevel?.[targetLevel] || [];

  const handleApplyLevelUp = () => {
    const hpToAdd = hpMethod === 'average' ? standardAvgGain : manualHpGain;
    const newMaxHp = (character.maxHp || 10) + hpToAdd;
    const newCurrentHp = (character.currentHp || 10) + hpToAdd;

    // Collect new features
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

    if (chosenSubclass) {
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

    // Apply ASI or Feat if applicable
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

    const updated = {
      ...character,
      level: targetLevel,
      subclassId: selectedSubclassId || character.subclassId,
      subclassName: chosenSubclass?.name || character.subclassName,
      maxHp: newMaxHp,
      currentHp: newCurrentHp,
      hitDiceMax: `${targetLevel}d${hitDie}`,
      customAbilityBonuses: customBonuses,
      features: newFeatures
    };

    onSaveLeveledCharacter(updated);
    onClose();
  };

  return (
    <dialog open className="modal-dialog" style={{ maxWidth: '720px' }} onClick={(e) => { if (e.target.tagName === 'DIALOG') onClose(); }}>
      <div className="modal-header">
        <div className="modal-title">
          <TrendingUp size={22} className="text-gold" />
          <span>Level Up Engine: Level {currentLevel} &rarr; Level {targetLevel}</span>
        </div>
        <button type="button" className="btn btn-secondary btn-icon" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div className="modal-body">
        {/* Level Selector */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-card)', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid var(--border-gold)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-gold)', fontSize: '1.1rem' }}>
              Advancing {character.name || 'Character'}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Class: {classData.name} (Hit Die: d{hitDie}) &bull; New Proficiency Bonus: +{getProficiencyBonus(targetLevel)}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label className="form-label" style={{ margin: 0 }}>Target Level:</label>
            <select
              className="form-select"
              style={{ width: '85px', fontWeight: 'bold' }}
              value={targetLevel}
              onChange={(e) => setTargetLevel(parseInt(e.target.value, 10))}
            >
              {Array.from({ length: 20 - currentLevel }, (_, i) => currentLevel + 1 + i).map(lvl => (
                <option key={lvl} value={lvl}>Lvl {lvl}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Hit Points Calculation Section */}
        <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 700 }}>
            <Heart size={18} style={{ color: 'var(--accent-red)' }} />
            <span>Hit Points Increase</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {/* Average Option */}
            <div
              onClick={() => setHpMethod('average')}
              style={{
                background: hpMethod === 'average' ? 'rgba(212, 175, 55, 0.12)' : 'var(--bg-surface)',
                border: hpMethod === 'average' ? '2px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                Take Average ({standardAvgGain} HP)
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Fixed: {Math.floor(hitDie / 2) + 1} (d{hitDie} avg) + {conMod} (CON mod) {extraHpPerLevel ? `+ ${extraHpPerLevel} (traits)` : ''}
              </div>
            </div>

            {/* Roll Option */}
            <div
              onClick={() => { if (rolledDieValue === null) handleRollHitDie(); else setHpMethod('rolled'); }}
              style={{
                background: hpMethod === 'rolled' ? 'rgba(212, 175, 55, 0.12)' : 'var(--bg-surface)',
                border: hpMethod === 'rolled' ? '2px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  Roll Hit Die {rolledDieValue !== null && `(${manualHpGain} HP)`}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {rolledDieValue !== null ? `Rolled ${rolledDieValue} on 1d${hitDie} + ${conMod}` : `Click to roll 1d${hitDie} live!`}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={(e) => { e.stopPropagation(); handleRollHitDie(); }}
              >
                <Dices size={15} />
                <span>Roll</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subclass Selection (if reaching subclass level) */}
        {targetLevel >= classData.subclassLevel && (!character.subclassId || character.subclassId === '') && (
          <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-gold)', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 700 }}>
              <Shield size={18} />
              <span>Choose Your Archetype / Subclass</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              At Level {classData.subclassLevel}, {classData.name}s unlock their defining specialization.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {classData.subclasses.map(sub => (
                <label
                  key={sub.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    background: selectedSubclassId === sub.id ? 'rgba(212, 175, 55, 0.15)' : 'var(--bg-surface)',
                    border: selectedSubclassId === sub.id ? '2px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="subclassChoice"
                    checked={selectedSubclassId === sub.id}
                    onChange={() => setSelectedSubclassId(sub.id)}
                    style={{ marginTop: '0.2rem', accentColor: 'var(--accent-gold)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-gold)', fontFamily: 'var(--font-heading)' }}>
                      {sub.name}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                      {sub.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Ability Score Improvement (ASI) or Feat Selection */}
        {isAsiLevel && (
          <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-gold)', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 700 }}>
              <Award size={18} />
              <span>Ability Score Improvement (Level {targetLevel})</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              You can increase one ability score by 2, increase two ability scores by 1, or choose a Feat.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
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
                Choose a Feat
              </button>
            </div>

            {asiType === 'plusTwo' && (
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Ability Score to Increase by +2</label>
                <select
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
                  <label className="form-label">First Ability (+1)</label>
                  <select
                    className="form-select"
                    value={plusOneFirst}
                    onChange={(e) => setPlusOneFirst(e.target.value)}
                  >
                    <option value="str">Strength</option>
                    <option value="dex">Dexterity</option>
                    <option value="con">Constitution</option>
                    <option value="int">Intelligence</option>
                    <option value="wis">Wisdom</option>
                    <option value="cha">Charisma</option>
                  </select>
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Second Ability (+1)</label>
                  <select
                    className="form-select"
                    value={plusOneSecond}
                    onChange={(e) => setPlusOneSecond(e.target.value)}
                  >
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
                <label className="form-label">Select Feat</label>
                <select
                  className="form-select"
                  value={selectedFeatId}
                  onChange={(e) => setSelectedFeatId(e.target.value)}
                >
                  {SRD_FEATS.map(feat => (
                    <option key={feat.id} value={feat.id}>
                      {feat.name} {feat.prerequisite !== 'None' ? `(${feat.prerequisite})` : ''}
                    </option>
                  ))}
                </select>
                {SRD_FEATS.find(f => f.id === selectedFeatId) && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '4px' }}>
                    {SRD_FEATS.find(f => f.id === selectedFeatId)?.description}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Newly Unlocked Features Preview */}
        {(classFeaturesAtTarget.length > 0 || subclassFeaturesAtTarget.length > 0) && (
          <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 700 }}>
              <Sparkles size={18} />
              <span>Features Unlocked at Level {targetLevel}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {classFeaturesAtTarget.map((f, i) => (
                <div key={i} style={{ borderLeft: '3px solid var(--accent-gold)', paddingLeft: '0.65rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{f.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{f.description}</div>
                </div>
              ))}
              {subclassFeaturesAtTarget.map((sf, i) => (
                <div key={`sub-${i}`} style={{ borderLeft: '3px solid var(--accent-blue)', paddingLeft: '0.65rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#60a5fa' }}>{sf.name} ({chosenSubclass?.name})</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{sf.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          style={{ padding: '0.6rem 1.25rem' }}
          onClick={handleApplyLevelUp}
        >
          <TrendingUp size={16} />
          <span>Confirm &amp; Advance to Level {targetLevel}</span>
        </button>
      </div>
    </dialog>
  );
}
