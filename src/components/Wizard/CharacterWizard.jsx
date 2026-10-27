import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Dices, Shield, Sword, Wand2, User, BookOpen } from 'lucide-react';
import { SRD_RACES } from '../../data/srdRaces';
import { SRD_CLASSES } from '../../data/srdClasses';
import { SRD_BACKGROUNDS } from '../../data/srdBackgrounds';
import { SRD_FEATS } from '../../data/srdFeats';
import { SRD_SPELLS } from '../../data/srdSpells';
import { STANDARD_ARRAY, POINT_BUY_COSTS, POINT_BUY_TOTAL, roll4d6DropLowest, getAbilityModifier, formatModifier, getProficiencyBonus } from '../../utils/dndRules';

export default function CharacterWizard({ isOpen, onClose, onCharacterCreated }) {
  const [step, setStep] = useState(1);

  // Step 1: Race
  const [selectedRaceId, setSelectedRaceId] = useState('human');
  const [selectedSubraceId, setSelectedSubraceId] = useState('human-standard');
  const [dragonbornAncestry, setDragonbornAncestry] = useState('Red');
  const [variantHumanStats, setVariantHumanStats] = useState(['str', 'dex']);
  const [variantHumanFeatId, setVariantHumanFeatId] = useState('alert');

  // Step 2: Class & Level
  const [selectedClassId, setSelectedClassId] = useState('fighter');
  const [startingLevel, setStartingLevel] = useState(1);
  const [selectedSubclassId, setSelectedSubclassId] = useState('');

  // Step 3: Ability Scores
  const [scoreMethod, setScoreMethod] = useState('standard'); // 'standard', 'pointbuy', 'roll', 'manual'
  const [baseScores, setBaseScores] = useState({ str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 });
  const [pointBuyScores, setPointBuyScores] = useState({ str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 });
  const [rolledDiceLogs, setRolledDiceLogs] = useState({});

  // Step 4: Background & Roleplay
  const [selectedBackgroundId, setSelectedBackgroundId] = useState('soldier');
  const [alignment, setAlignment] = useState('Neutral Good');
  const [charName, setCharName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [personality, setPersonality] = useState('');
  const [ideals, setIdeals] = useState('');
  const [bonds, setBonds] = useState('');
  const [flaws, setFlaws] = useState('');

  // Step 5: Skills
  const [selectedClassSkills, setSelectedClassSkills] = useState([]);

  // Step 6: Equipment Package
  const [selectedEquipPackageIndex, setSelectedEquipPackageIndex] = useState(0);

  // Step 7: Spells
  const [selectedCantrips, setSelectedCantrips] = useState([]);
  const [selectedFirstLevelSpells, setSelectedFirstLevelSpells] = useState([]);

  if (!isOpen) return null;

  const currentRace = SRD_RACES.find(r => r.id === selectedRaceId) || SRD_RACES[0];
  const currentSubrace = currentRace.subraces?.find(s => s.id === selectedSubraceId) || currentRace.subraces?.[0];
  const currentClass = SRD_CLASSES.find(c => c.id === selectedClassId) || SRD_CLASSES[0];
  const currentBackground = SRD_BACKGROUNDS.find(b => b.id === selectedBackgroundId) || SRD_BACKGROUNDS[0];

  // Calculate racial bonuses
  const racialBonuses = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
  if (currentRace.abilityScoreBonuses) {
    Object.entries(currentRace.abilityScoreBonuses).forEach(([k, v]) => {
      racialBonuses[k] = (racialBonuses[k] || 0) + v;
    });
  }
  if (currentSubrace?.abilityScoreBonuses) {
    Object.entries(currentSubrace.abilityScoreBonuses).forEach(([k, v]) => {
      racialBonuses[k] = (racialBonuses[k] || 0) + v;
    });
  }
  if (selectedRaceId === 'human' && selectedSubraceId === 'human-variant') {
    variantHumanStats.forEach(stat => {
      racialBonuses[stat] = 1;
    });
  }

  // Active base scores depending on method
  const activeBaseScores = scoreMethod === 'pointbuy' ? pointBuyScores : baseScores;

  // Final ability scores
  const finalScores = {};
  for (const ab of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
    finalScores[ab] = (activeBaseScores[ab] || 10) + (racialBonuses[ab] || 0);
  }

  // Calculate Point Buy Spent
  const pointBuySpent = Object.values(pointBuyScores).reduce((acc, score) => {
    return acc + (POINT_BUY_COSTS[score] ?? 0);
  }, 0);
  const pointBuyRemaining = POINT_BUY_TOTAL - pointBuySpent;

  // Handle Point Buy Score Change
  const handlePointBuyChange = (ab, delta) => {
    const current = pointBuyScores[ab] || 8;
    const target = current + delta;
    if (target < 8 || target > 15) return;
    const currentCost = POINT_BUY_COSTS[current];
    const targetCost = POINT_BUY_COSTS[target];
    const costDiff = targetCost - currentCost;
    if (pointBuyRemaining - costDiff < 0) return;

    setPointBuyScores(prev => ({ ...prev, [ab]: target }));
  };

  // Roll 4d6 drop lowest for all 6 scores
  const handleRollAllScores = () => {
    const newScores = {};
    const logs = {};
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(ab => {
      const res = roll4d6DropLowest();
      newScores[ab] = res.total;
      logs[ab] = res;
    });
    setBaseScores(newScores);
    setRolledDiceLogs(logs);
    setScoreMethod('roll');
  };

  // Next / Previous Step navigation
  const nextStep = () => setStep(s => Math.min(8, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  // Finish Character Creation
  const handleFinish = () => {
    const conMod = getAbilityModifier(finalScores.con);
    const hitDie = currentClass.hitDie || 8;
    const isHillDwarf = selectedSubraceId === 'hill-dwarf';
    const bonusHpPerLevel = isHillDwarf ? 1 : 0;
    const lvl1Hp = hitDie + conMod + bonusHpPerLevel;

    // Build features list
    const features = [];
    currentRace.traits?.forEach((t, i) => {
      features.push({ id: `rf-${i}`, name: t.name, source: currentRace.name, description: t.description });
    });
    currentSubrace?.traits?.forEach((st, i) => {
      features.push({ id: `srf-${i}`, name: st.name, source: currentSubrace.name, description: st.description });
    });
    if (currentClass.featuresByLevel?.[1]) {
      currentClass.featuresByLevel[1].forEach((cf, i) => {
        features.push({ id: `cf-1-${i}`, name: cf.name, source: `${currentClass.name} (Lvl 1)`, description: cf.description });
      });
    }
    if (currentBackground.feature) {
      features.push({
        id: `bg-feat`,
        name: currentBackground.feature.name,
        source: `Background (${currentBackground.name})`,
        description: currentBackground.feature.description
      });
    }
    if (selectedRaceId === 'human' && selectedSubraceId === 'human-variant') {
      const feat = SRD_FEATS.find(f => f.id === variantHumanFeatId);
      if (feat) {
        features.push({ id: `vf-1`, name: `Feat: ${feat.name}`, source: 'Variant Human Feat', description: feat.description });
      }
    }

    // Weapons / Attacks
    const attacks = [];
    if (currentClass.startingEquipmentPackages?.[selectedEquipPackageIndex]) {
      const pack = currentClass.startingEquipmentPackages[selectedEquipPackageIndex];
      pack.items.forEach((item, idx) => {
        if (item.includes('Sword') || item.includes('Bow') || item.includes('Axe') || item.includes('Staff') || item.includes('Dagger') || item.includes('Crossbow')) {
          const isDex = item.includes('Bow') || item.includes('Crossbow') || item.includes('Dagger') || item.includes('Rapier');
          attacks.push({
            id: `atk-init-${idx}`,
            name: item,
            ability: isDex ? 'dex' : 'str',
            isProficient: true,
            bonusToHit: 0,
            damageDice: item.includes('Greataxe') ? '1d12' : item.includes('Greatsword') ? '2d6' : item.includes('Dagger') ? '1d4' : '1d8',
            damageType: item.includes('Bow') || item.includes('Crossbow') || item.includes('Dagger') ? 'piercing' : 'slashing',
            notes: isDex ? 'Finesse / Ranged' : 'Melee'
          });
        }
      });
    }
    if (attacks.length === 0) {
      attacks.push({
        id: 'atk-unarmed',
        name: 'Unarmed Strike',
        ability: 'str',
        isProficient: true,
        bonusToHit: 0,
        damageDice: '1',
        damageType: 'bludgeoning',
        notes: 'Basic strike'
      });
    }

    // Equipment inventory
    const inventory = [];
    if (currentClass.startingEquipmentPackages?.[selectedEquipPackageIndex]) {
      currentClass.startingEquipmentPackages[selectedEquipPackageIndex].items.forEach((it, idx) => {
        inventory.push({ id: `eq-${idx}`, name: it, quantity: 1, weight: 2, equipped: true });
      });
    }
    if (currentBackground.equipment) {
      currentBackground.equipment.forEach((it, idx) => {
        inventory.push({ id: `bg-eq-${idx}`, name: it, quantity: 1, weight: 1, equipped: false });
      });
    }

    // Spells
    const spells = [];
    selectedCantrips.forEach(cid => {
      const sp = SRD_SPELLS.find(s => s.id === cid);
      if (sp) spells.push({ ...sp, prepared: true });
    });
    selectedFirstLevelSpells.forEach(sid => {
      const sp = SRD_SPELLS.find(s => s.id === sid);
      if (sp) spells.push({ ...sp, prepared: true });
    });

    const newCharacter = {
      id: `char-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: charName.trim() || 'New Adventurer',
      raceId: selectedRaceId,
      subraceId: selectedSubraceId,
      raceName: currentSubrace ? `${currentSubrace.name}` : currentRace.name,
      classId: selectedClassId,
      className: currentClass.name,
      subclassId: selectedSubclassId,
      subclassName: currentClass.subclasses?.find(s => s.id === selectedSubclassId)?.name || '',
      level: startingLevel,
      backgroundId: selectedBackgroundId,
      backgroundName: currentBackground.name,
      alignment,
      player: playerName.trim() || 'Player',
      xp: '0',
      inspiration: false,
      abilityScores: activeBaseScores,
      racialBonuses,
      customAbilityBonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
      savingThrowsProficient: currentClass.savingThrows || ['str', 'con'],
      skillProficiencies: Array.from(new Set([...(currentBackground.skillProficiencies || []), ...selectedClassSkills])),
      expertiseSkills: currentClass.id === 'rogue' ? selectedClassSkills.slice(0, 2) : [],
      equippedArmor: null,
      equippedShield: false,
      maxHp: lvl1Hp,
      currentHp: lvl1Hp,
      tempHp: 0,
      hitDiceMax: `${startingLevel}d${hitDie}`,
      hitDiceUsed: 0,
      speed: currentSubrace?.speed || currentRace.speed || 30,
      deathSaves: { successes: 0, failures: 0 },
      exhaustion: 0,
      attacks,
      features,
      spells,
      spellSlotsUsed: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      equipment: inventory,
      currency: { cp: 0, sp: 0, ep: 0, gp: currentBackground.gold || 15, pp: 0 },
      proficienciesText: `Armor: ${currentClass.armorProficiencies?.join(', ') || 'None'}\nWeapons: ${currentClass.weaponProficiencies?.join(', ') || 'Simple'}\nLanguages: ${currentRace.languages?.join(', ')}`,
      personality: personality.trim() || currentBackground.suggestedCharacteristics?.traits?.[0] || '',
      ideals: ideals.trim() || currentBackground.suggestedCharacteristics?.ideals?.[0] || '',
      bonds: bonds.trim() || currentBackground.suggestedCharacteristics?.bonds?.[0] || '',
      flaws: flaws.trim() || currentBackground.suggestedCharacteristics?.flaws?.[0] || '',
      backstory: '',
      avatarUrl: ''
    };

    onCharacterCreated(newCharacter);
    onClose();
  };

  return (
    <dialog open className="modal-dialog" style={{ maxWidth: '850px' }} onClick={(e) => { if (e.target.tagName === 'DIALOG') onClose(); }}>
      <div className="modal-header">
        <div className="modal-title">
          <Sparkles size={20} className="text-gold" />
          <span>Interactive Character Creator (Step {step} of 8)</span>
        </div>
        <button type="button" className="btn btn-secondary btn-icon" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      {/* Steps Indicator Bar */}
      <div style={{ display: 'flex', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)', padding: '0.4rem 0.75rem', overflowX: 'auto', gap: '0.25rem' }}>
        {[
          { num: 1, label: 'Race' },
          { num: 2, label: 'Class' },
          { num: 3, label: 'Abilities' },
          { num: 4, label: 'Background' },
          { num: 5, label: 'Skills' },
          { num: 6, label: 'Equipment' },
          { num: 7, label: 'Spells' },
          { num: 8, label: 'Review' }
        ].map(s => (
          <button
            key={s.num}
            type="button"
            onClick={() => setStep(s.num)}
            style={{
              background: step === s.num ? 'var(--accent-gold)' : 'transparent',
              color: step === s.num ? '#111' : step > s.num ? 'var(--text-gold)' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '4px',
              padding: '0.25rem 0.55rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <span>{s.num}.</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      <div className="modal-body" style={{ minHeight: '380px' }}>
        {/* STEP 1: RACE */}
        {step === 1 && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '0.5rem' }}>
              Select Race &amp; Lineage
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Your race grants innate ability modifiers, speed, languages, and unique racial traits.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', marginBottom: '1.25rem' }}>
              {SRD_RACES.map(r => (
                <div
                  key={r.id}
                  onClick={() => {
                    setSelectedRaceId(r.id);
                    if (r.subraces && r.subraces.length > 0) {
                      setSelectedSubraceId(r.subraces[0].id);
                    } else {
                      setSelectedSubraceId('');
                    }
                  }}
                  style={{
                    background: selectedRaceId === r.id ? 'rgba(212, 175, 55, 0.15)' : 'var(--bg-card)',
                    border: selectedRaceId === r.id ? '2px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '0.65rem 0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', color: selectedRaceId === r.id ? 'var(--text-gold)' : 'var(--text-main)' }}>
                    {r.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Speed: {r.speed} ft &bull; {r.size}
                  </div>
                </div>
              ))}
            </div>

            {/* Subrace Picker */}
            {currentRace.subraces && currentRace.subraces.length > 0 && (
              <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
                <label className="form-label">Subrace / Lineage</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {currentRace.subraces.map(sub => (
                    <button
                      key={sub.id}
                      type="button"
                      className={`btn ${selectedSubraceId === sub.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      onClick={() => setSelectedSubraceId(sub.id)}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
                {currentSubrace && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>
                    {currentSubrace.description}
                  </div>
                )}
              </div>
            )}

            {/* Racial Traits Overview */}
            <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div className="form-label" style={{ marginBottom: '0.4rem' }}>Racial Traits Granted:</div>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {currentRace.traits?.map((t, idx) => (
                  <li key={idx}><strong>{t.name}:</strong> {t.description}</li>
                ))}
                {currentSubrace?.traits?.map((st, idx) => (
                  <li key={`st-${idx}`}><strong>{st.name}:</strong> {st.description}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* STEP 2: CLASS & LEVEL */}
        {step === 2 && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '0.5rem' }}>
              Select Class &amp; Starting Level
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Your class defines your combat role, hit points, proficiencies, and special features.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.65rem', marginBottom: '1.25rem' }}>
              {SRD_CLASSES.map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedClassId(c.id)}
                  style={{
                    background: selectedClassId === c.id ? 'rgba(212, 175, 55, 0.15)' : 'var(--bg-card)',
                    border: selectedClassId === c.id ? '2px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '0.65rem',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', color: selectedClassId === c.id ? 'var(--text-gold)' : 'var(--text-main)' }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Hit Die: d{c.hitDie}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', marginTop: '0.1rem' }}>
                    Saves: {c.savingThrows?.map(s => s.toUpperCase()).join(', ')}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-gold)', marginBottom: '0.35rem' }}>
                {currentClass.name} Overview
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {currentClass.description}
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <strong>Armor:</strong> {currentClass.armorProficiencies?.join(', ') || 'None'} &bull; <strong>Weapons:</strong> {currentClass.weaponProficiencies?.join(', ')}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ABILITY SCORES */}
        {step === 3 && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '0.5rem' }}>
              Determine Ability Scores
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Choose your method: Standard Array (15, 14, 13, 12, 10, 8), 27-Point Buy, or 4d6 Drop Lowest dice rolling.
            </p>

            {/* Method Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <button
                type="button"
                className={`btn ${scoreMethod === 'standard' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                onClick={() => {
                  setScoreMethod('standard');
                  setBaseScores({ str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 });
                }}
              >
                Standard Array
              </button>
              <button
                type="button"
                className={`btn ${scoreMethod === 'pointbuy' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                onClick={() => setScoreMethod('pointbuy')}
              >
                Point Buy (27 pts)
              </button>
              <button
                type="button"
                className={`btn ${scoreMethod === 'roll' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                onClick={handleRollAllScores}
              >
                <Dices size={14} />
                <span>Roll 4d6 Drop Lowest</span>
              </button>
              <button
                type="button"
                className={`btn ${scoreMethod === 'manual' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                onClick={() => setScoreMethod('manual')}
              >
                Manual Entry
              </button>
            </div>

            {scoreMethod === 'pointbuy' && (
              <div style={{ background: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border-gold)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>Point Buy Budget Remaining:</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: pointBuyRemaining === 0 ? 'var(--accent-green)' : pointBuyRemaining < 0 ? 'var(--accent-red)' : 'var(--accent-gold)' }}>
                  {pointBuyRemaining} / {POINT_BUY_TOTAL}
                </span>
              </div>
            )}

            {/* Ability Scores Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.65rem' }}>
              {[
                { id: 'str', label: 'STR' },
                { id: 'dex', label: 'DEX' },
                { id: 'con', label: 'CON' },
                { id: 'int', label: 'INT' },
                { id: 'wis', label: 'WIS' },
                { id: 'cha', label: 'CHA' }
              ].map(stat => {
                const base = activeBaseScores[stat.id] || 10;
                const bonus = racialBonuses[stat.id] || 0;
                const total = base + bonus;
                const mod = getAbilityModifier(total);

                return (
                  <div
                    key={stat.id}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1.5px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '0.75rem 0.4rem',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {stat.label}
                    </div>

                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-gold)', margin: '0.2rem 0' }}>
                      {formatModifier(mod)}
                    </div>

                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                      Total: {total}
                    </div>

                    {scoreMethod === 'pointbuy' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.1rem 0.4rem' }}
                          onClick={() => handlePointBuyChange(stat.id, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 700, minWidth: '18px' }}>{base}</span>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.1rem 0.4rem' }}
                          onClick={() => handlePointBuyChange(stat.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <input
                        type="number"
                        className="form-input"
                        style={{ width: '55px', textAlign: 'center', padding: '0.2rem' }}
                        value={base}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 8;
                          setBaseScores(prev => ({ ...prev, [stat.id]: val }));
                        }}
                      />
                    )}

                    {bonus > 0 && (
                      <div style={{ fontSize: '0.68rem', color: 'var(--accent-green)', marginTop: '0.3rem' }}>
                        +{bonus} Racial
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: BACKGROUND & ROLEPLAY */}
        {step === 4 && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '0.5rem' }}>
              Background &amp; Alignment
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Your character&rsquo;s origins shape their skills, personality, ideals, and story.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', marginBottom: '1.25rem' }}>
              {SRD_BACKGROUNDS.map(bg => (
                <div
                  key={bg.id}
                  onClick={() => setSelectedBackgroundId(bg.id)}
                  style={{
                    background: selectedBackgroundId === bg.id ? 'rgba(212, 175, 55, 0.15)' : 'var(--bg-card)',
                    border: selectedBackgroundId === bg.id ? '2px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '0.65rem',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', color: selectedBackgroundId === bg.id ? 'var(--text-gold)' : 'var(--text-main)' }}>
                    {bg.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Skills: {bg.skillProficiencies?.join(', ') || 'Custom'}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Alignment</label>
                <select
                  className="form-select"
                  value={alignment}
                  onChange={(e) => setAlignment(e.target.value)}
                >
                  {['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'].map(al => (
                    <option key={al} value={al}>{al}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Background Feature</label>
                <div style={{ fontSize: '0.85rem', background: 'var(--bg-card)', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                  <strong>{currentBackground.feature?.name}</strong>: {currentBackground.feature?.description?.substring(0, 90)}...
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: SKILLS */}
        {step === 5 && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '0.5rem' }}>
              Choose Class Skill Proficiencies
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              {currentClass.name} grants {currentClass.skillChoices?.count || 2} skill proficiencies from the class list. (Background already gives: {currentBackground.skillProficiencies?.join(', ') || 'None'}).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {currentClass.skillChoices?.options.map(sk => {
                const isBgSkill = currentBackground.skillProficiencies?.includes(sk);
                const isSelected = selectedClassSkills.includes(sk);

                return (
                  <button
                    key={sk}
                    type="button"
                    disabled={isBgSkill}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedClassSkills(prev => prev.filter(s => s !== sk));
                      } else {
                        if (selectedClassSkills.length < (currentClass.skillChoices?.count || 2)) {
                          setSelectedClassSkills(prev => [...prev, sk]);
                        }
                      }
                    }}
                    style={{
                      background: isBgSkill ? '#1a221f' : isSelected ? 'rgba(212, 175, 55, 0.2)' : 'var(--bg-card)',
                      border: isSelected ? '1.5px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '0.65rem 0.75rem',
                      textAlign: 'left',
                      color: isBgSkill ? 'var(--accent-green)' : isSelected ? 'var(--text-gold)' : 'var(--text-main)',
                      cursor: isBgSkill ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{sk}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {isBgSkill ? 'Granted by Background' : isSelected ? 'Selected' : 'Available'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: EQUIPMENT */}
        {step === 6 && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '0.5rem' }}>
              Starting Equipment Package
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Choose your starting gear package according to your class traditions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentClass.startingEquipmentPackages?.map((pkg, idx) => (
                <label
                  key={pkg.id || idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.85rem 1rem',
                    borderRadius: '6px',
                    background: selectedEquipPackageIndex === idx ? 'rgba(212, 175, 55, 0.15)' : 'var(--bg-card)',
                    border: selectedEquipPackageIndex === idx ? '2px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="equipPackRadio"
                    checked={selectedEquipPackageIndex === idx}
                    onChange={() => setSelectedEquipPackageIndex(idx)}
                    style={{ marginTop: '0.2rem', accentColor: 'var(--accent-gold)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{pkg.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-gold)', marginTop: '0.25rem' }}>
                      Items: {pkg.items.join(', ')}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7: SPELLS */}
        {step === 7 && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '0.5rem' }}>
              Spells Known &amp; Prepared
            </h3>
            {!currentClass.spellcaster ? (
              <div style={{ background: 'var(--bg-card)', padding: '1.5rem', textAlign: 'center', borderRadius: '6px', color: 'var(--text-muted)' }}>
                <Shield size={32} style={{ margin: '0 auto 0.5rem auto', color: 'var(--text-gold)' }} />
                <p>The {currentClass.name} class does not cast spells at Level 1.</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>You may proceed directly to the final review step!</p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Pick your initial Cantrips and 1st-level spells from the {currentClass.name} spell list.
                </p>

                {/* Cantrips */}
                <div className="form-label" style={{ marginBottom: '0.4rem' }}>Cantrips (Pick up to 3)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {SRD_SPELLS.filter(s => s.level === 0 && s.classes.includes(currentClass.id)).map(sp => {
                    const isSelected = selectedCantrips.includes(sp.id);
                    return (
                      <button
                        key={sp.id}
                        type="button"
                        onClick={() => {
                          if (isSelected) setSelectedCantrips(prev => prev.filter(id => id !== sp.id));
                          else setSelectedCantrips(prev => [...prev, sp.id]);
                        }}
                        style={{
                          background: isSelected ? 'rgba(212, 175, 55, 0.2)' : 'var(--bg-card)',
                          border: isSelected ? '1.5px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '0.55rem',
                          textAlign: 'left',
                          color: isSelected ? 'var(--text-gold)' : 'var(--text-main)',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{sp.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{sp.school} &bull; {sp.castingTime}</div>
                      </button>
                    );
                  })}
                </div>

                {/* 1st Level Spells */}
                <div className="form-label" style={{ marginBottom: '0.4rem' }}>1st Level Spells (Pick up to 4)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {SRD_SPELLS.filter(s => s.level === 1 && s.classes.includes(currentClass.id)).map(sp => {
                    const isSelected = selectedFirstLevelSpells.includes(sp.id);
                    return (
                      <button
                        key={sp.id}
                        type="button"
                        onClick={() => {
                          if (isSelected) setSelectedFirstLevelSpells(prev => prev.filter(id => id !== sp.id));
                          else setSelectedFirstLevelSpells(prev => [...prev, sp.id]);
                        }}
                        style={{
                          background: isSelected ? 'rgba(212, 175, 55, 0.2)' : 'var(--bg-card)',
                          border: isSelected ? '1.5px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '0.55rem',
                          textAlign: 'left',
                          color: isSelected ? 'var(--text-gold)' : 'var(--text-main)',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{sp.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{sp.school} &bull; {sp.castingTime}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 8: REVIEW & IDENTITY */}
        {step === 8 && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '0.5rem' }}>
              Final Identity &amp; Forge Character
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Name your hero and review all starting statistics before bringing them to life!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Character Name *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Drizzt Do'Urden, Thorin Oakenshield"
                  value={charName}
                  onChange={(e) => setCharName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Player Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your Name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Summary Pill */}
            <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-gold)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Lineage</div>
                <div style={{ fontWeight: 700, color: 'var(--text-gold)' }}>{currentSubrace?.name || currentRace.name}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Class</div>
                <div style={{ fontWeight: 700, color: 'var(--text-gold)' }}>Level 1 {currentClass.name}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Background</div>
                <div style={{ fontWeight: 700, color: 'var(--text-gold)' }}>{currentBackground.name}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Starting HP</div>
                <div style={{ fontWeight: 800, color: 'var(--accent-red)', fontSize: '1.1rem' }}>
                  {currentClass.hitDie + getAbilityModifier(finalScores.con) + (selectedSubraceId === 'hill-dwarf' ? 1 : 0)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
        <div>
          {step > 1 && (
            <button type="button" className="btn btn-secondary" onClick={prevStep}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          {step < 8 ? (
            <button type="button" className="btn btn-primary" onClick={nextStep}>
              <span>Next Step</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={handleFinish}>
              <Check size={16} />
              <span>Forge &amp; Open Character Sheet</span>
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}
