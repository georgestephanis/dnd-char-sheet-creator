import React, { useState } from 'react';
import {
  Sword, Heart, Wand2, Sparkles, TrendingUp, Scroll, Dices, Moon
} from 'lucide-react';
import {
  getAbilityModifier, formatModifier, calculateArmorClass,
  getProficiencyBonus, getCarryingCapacity, getSpellSlotsForCharacter,
  getSkillBonus, getHitDiceLabel, getCalculatedAbilityScores, getInitiativeModifier, formatXp,
  SKILLS
} from '../../utils/dndRules';
import { activateOnKey } from '../../utils/a11y';

export default function BG3CharacterInspector({
  character,
  onUpdateCharacter,
  onOpenLevelUp,
  onOpenRespecForge,
  onSwitchToTabletopSheet,
  onRollCheck,
  onRollSkill,
  onRollAttack,
  onCastSpell,
  onLongRest
}) {
  const [activeTab, setActiveTab] = useState('combat'); // 'combat', 'spellbook', 'passives'

  if (!character) return null;

  const level = character.level || 1;
  const profBonus = getProficiencyBonus(level);
  const finalScores = getCalculatedAbilityScores(character);

  const calculatedAc = calculateArmorClass(character, finalScores);
  const speed = character.speed || 30;

  // HP Adjustments
  const maxHp = character.maxHp || 10;
  const currentHp = character.currentHp ?? maxHp;
  const tempHp = character.tempHp || 0;

  const handleAdjustHp = (delta) => {
    const updated = Math.max(0, Math.min(maxHp, currentHp + delta));
    onUpdateCharacter({ currentHp: updated });
  };

  // Carrying Capacity
  const capacity = getCarryingCapacity(finalScores.str);
  const currentWeight = (character.equipment || []).reduce((acc, it) => acc + ((it.weight || 0) * (it.quantity || 1)), 0);
  const isEncumbered = currentWeight > capacity;

  // Spell Slots
  const totalSlots = getSpellSlotsForCharacter(character);
  const slotsUsed = character.spellSlotsUsed || [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const handleToggleSpellSlot = (slotIdx, pipIdx) => {
    const used = slotsUsed[slotIdx] || 0;
    const newUsed = pipIdx < used ? pipIdx : pipIdx + 1;
    const nextArr = [...slotsUsed];
    nextArr[slotIdx] = newUsed;
    onUpdateCharacter({ spellSlotsUsed: nextArr });
  };

  return (
    <div className="bg3-inspector-container">
      {/* TOP COMPANION HEADER BANNER */}
      <div className="bg3-inspector-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="bg3-portrait-frame" style={{ width: '64px', height: '64px', margin: 0, fontSize: '1.75rem', flexShrink: 0 }}>
            {character.avatarUrl ? (
              <img src={character.avatarUrl} alt={character.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              character.avatarIcon || '⚔️'
            )}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="bg3-summary-name" style={{ textAlign: 'left', fontSize: '1.5rem', margin: 0 }}>
                {character.name || 'Unnamed Adventurer'}
              </span>
              <span className="bg3-badge-pill" style={{ margin: 0, textTransform: 'uppercase' }}>
                Level {level} {character.className}
              </span>
              {character.subclassName && (
                <span className="bg3-badge-pill" style={{ margin: 0, background: 'rgba(255, 255, 255, 0.08)', color: '#cbd5e1', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
                  {character.subclassName}
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              {character.raceName} &bull; {character.backgroundName} &bull; {character.alignment} &bull; XP: {formatXp(character.xp)}
            </div>
          </div>
        </div>

        {/* Top Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-primary"
            style={{ fontWeight: 800, padding: '0.5rem 1rem' }}
            onClick={onOpenLevelUp}
            title="Level up this character"
          >
            <TrendingUp size={16} />
            <span>Level Up</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onOpenRespecForge}
            title="Edit character stats and options in the Character Forge"
            style={{ color: 'var(--text-gold)', borderColor: 'var(--border-gold)' }}
          >
            <Sparkles size={16} />
            <span>Forge / Respec</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onLongRest}
            title="Long Rest: restores full HP, Hit Dice, and Spell Slots"
          >
            <Moon size={16} />
            <span>Long Rest</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onSwitchToTabletopSheet}
            title="Switch to printable 5e Tabletop Sheet"
          >
            <Scroll size={16} />
            <span>Tabletop Sheet</span>
          </button>
        </div>
      </div>

      {/* 3-COLUMN INSPECTOR GRID */}
      <div className="bg3-inspector-grid">

        {/* COLUMN 1: VITALS, ATTRIBUTES & SKILLS */}
        <div className="bg3-column">
          {/* Hit Points Bar Card */}
          <div className="bg3-panel-box" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-heading)', color: 'var(--accent-red)', fontWeight: 800 }}>
                <Heart size={18} fill="var(--accent-red)" />
                <span>HIT POINTS</span>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>
                <span style={{ color: currentHp <= maxHp * 0.25 ? 'var(--accent-red)' : 'var(--text-gold)', fontSize: '1.25rem' }}>
                  {currentHp}
                </span>
                <span style={{ color: '#94a3b8' }}> / {maxHp}</span>
                {tempHp > 0 && <span style={{ color: '#38bdf8' }}> (+{tempHp} Temp)</span>}
              </div>
            </div>

            {/* Health Meter */}
            <div style={{ width: '100%', height: '8px', background: '#1c1917', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.65rem' }}>
              <div
                style={{
                  width: `${Math.min(100, (currentHp / maxHp) * 100)}%`,
                  height: '100%',
                  background: currentHp <= maxHp * 0.25 ? 'var(--accent-red)' : 'linear-gradient(90deg, #b91c1c 0%, #ef4444 100%)',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleAdjustHp(-5)}>-5</button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleAdjustHp(-1)}>-1</button>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Hit Dice: {getHitDiceLabel(character)}</span>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleAdjustHp(1)}>+1</button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleAdjustHp(5)}>+5</button>
              </div>
            </div>
          </div>

          {/* Vitals Row */}
          <div className="bg3-vitals-row" style={{ marginBottom: '1rem' }}>
            <div className="bg3-vital-cell">
              <div className="bg3-vital-val" style={{ color: 'var(--text-gold)' }}>{calculatedAc}</div>
              <div className="bg3-vital-lbl">Armour Class</div>
            </div>
            <div className="bg3-vital-cell">
              <div className="bg3-vital-val">{formatModifier(getInitiativeModifier(character, finalScores))}</div>
              <div className="bg3-vital-lbl">Initiative</div>
            </div>
            <div className="bg3-vital-cell">
              <div className="bg3-vital-val">{speed}ft</div>
              <div className="bg3-vital-lbl">Speed</div>
            </div>
            <div className="bg3-vital-cell">
              <div className="bg3-vital-val">+{profBonus}</div>
              <div className="bg3-vital-lbl">Prof Bonus</div>
            </div>
          </div>

          {/* Ability Scores Table */}
          <div className="bg3-panel-box" style={{ marginBottom: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Ability Attributes</span>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'none' }}>Click to roll check</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.45rem' }}>
              {[
                { id: 'str', label: 'Strength', short: 'STR' },
                { id: 'dex', label: 'Dexterity', short: 'DEX' },
                { id: 'con', label: 'Constitution', short: 'CON' },
                { id: 'int', label: 'Intelligence', short: 'INT' },
                { id: 'wis', label: 'Wisdom', short: 'WIS' },
                { id: 'cha', label: 'Charisma', short: 'CHA' }
              ].map(stat => {
                const total = finalScores[stat.id];
                const mod = getAbilityModifier(total);
                const isPrimary = character.classId === 'fighter' && stat.id === 'str' ||
                  character.classId === 'wizard' && stat.id === 'int' ||
                  character.classId === 'rogue' && stat.id === 'dex';
                const isSaveProf = character.savingThrowsProficient?.includes(stat.id);

                return (
                  <div role="button" tabIndex={0} onKeyDown={activateOnKey}
                    key={stat.id}
                    onClick={() => onRollCheck(stat.label, mod)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: isPrimary ? '1px solid var(--border-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      padding: '0.4rem 0.6rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    title={`Click to roll 1d20 ${formatModifier(mod)} for ${stat.label} check`}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        {isSaveProf && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-gold)' }} title="Proficient in saving throw" />}
                        <span style={{ fontWeight: 800, fontSize: '0.82rem', color: isPrimary ? 'var(--text-gold)' : 'var(--text-main)' }}>
                          {stat.short}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Score {total}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-gold)' }}>
                      {formatModifier(mod)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="bg3-panel-box">
            <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Skills &amp; Masteries
            </div>
            <div style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {SKILLS.map(sk => {
                const isProf = character.skillProficiencies?.includes(sk.name);
                const isExp = character.expertiseSkills?.includes(sk.name);
                const bonus = getSkillBonus(character, sk.name, finalScores[sk.ability]);

                return (
                  <div role="button" tabIndex={0} onKeyDown={activateOnKey}
                    key={sk.name}
                    onClick={() => onRollSkill(sk.name, bonus)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.2rem 0.4rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      background: isProf ? 'rgba(223, 184, 90, 0.08)' : 'transparent'
                    }}
                    title={`Click to roll ${sk.name} check (${formatModifier(bonus)})`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem' }}>
                      <span style={{ color: isProf ? 'var(--accent-gold)' : '#475569', fontSize: '0.75rem' }}>
                        {isExp ? '★' : isProf ? '●' : '○'}
                      </span>
                      <span style={{ color: isProf ? 'var(--text-gold)' : '#94a3b8', fontWeight: isProf ? 700 : 400 }}>
                        {sk.name}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: '#64748b' }}>({sk.ability.toUpperCase()})</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isProf ? 'var(--text-gold)' : '#cbd5e1' }}>
                      {formatModifier(bonus)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* COLUMN 2: COMBAT ACTIONS, SPELLBOOK & PASSIVES */}
        <div className="bg3-column">
          {/* Sub-tab switcher */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid rgba(223, 184, 90, 0.25)', paddingBottom: '0.5rem' }}>
            <button
              type="button"
              className={`btn ${activeTab === 'combat' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={() => setActiveTab('combat')}
            >
              <Sword size={14} />
              <span>Weapons &amp; Attacks ({character.attacks?.length || 0})</span>
            </button>
            {character.spells && character.spells.length > 0 && (
              <button
                type="button"
                className={`btn ${activeTab === 'spellbook' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                onClick={() => setActiveTab('spellbook')}
              >
                <Wand2 size={14} />
                <span>Spellbook ({character.spells.length})</span>
              </button>
            )}
            <button
              type="button"
              className={`btn ${activeTab === 'passives' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={() => setActiveTab('passives')}
            >
              <Sparkles size={14} />
              <span>Features &amp; Passives ({character.features?.length || 0})</span>
            </button>
          </div>

          {/* COMBAT ATTACKS TAB */}
          {activeTab === 'combat' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                Equipped martial attacks and weapon actions. Click an action to roll attack &amp; damage.
              </div>

              {character.attacks?.map(atk => {
                const statMod = getAbilityModifier(finalScores[atk.ability || 'str']);
                const toHit = statMod + (atk.isProficient ? profBonus : 0) + (atk.bonusToHit || 0);

                return (
                  <div key={atk.id} className="bg3-card" style={{ padding: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Sword size={18} style={{ color: 'var(--text-gold)' }} />
                        <span className="bg3-card-header" style={{ margin: 0, fontSize: '1.05rem' }}>
                          {atk.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ fontWeight: 800 }}
                        onClick={() => onRollAttack(atk, toHit, statMod)}
                      >
                        <Dices size={14} />
                        <span>Attack {formatModifier(toHit)}</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.82rem', color: '#94a3b8' }}>
                      <span>Damage: <strong style={{ color: 'var(--text-gold)' }}>{atk.damageDice} {formatModifier(statMod)}</strong> ({atk.damageType || 'slashing'})</span>
                      {atk.notes && <span>&bull; {atk.notes}</span>}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* SPELLBOOK TAB */}
          {activeTab === 'spellbook' && (
            <div>
              {/* Spell Slots Meter */}
              <div className="bg3-panel-box" style={{ marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Spell Slots Available
                </div>
                <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                  {totalSlots.map((max, idx) => {
                    if (max === 0) return null;
                    const used = slotsUsed[idx] || 0;
                    const levelNum = idx + 1;

                    return (
                      <div key={levelNum} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(223, 184, 90, 0.2)' }}>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Lvl {levelNum} Slots</div>
                        <div style={{ display: 'flex', gap: '0.3rem' }}>
                          {Array.from({ length: max }, (_, pIdx) => {
                            const isSlotUsed = pIdx < used;
                            return (
                              <button
                                key={pIdx}
                                type="button"
                                aria-label={`Level ${levelNum} slot ${pIdx + 1}`}
                                aria-pressed={isSlotUsed}
                                onClick={() => handleToggleSpellSlot(idx, pIdx)}
                                style={{
                                  width: '18px',
                                  height: '18px',
                                  borderRadius: '50%',
                                  border: '1px solid var(--accent-gold)',
                                  background: isSlotUsed ? 'transparent' : 'var(--accent-gold)',
                                  cursor: 'pointer'
                                }}
                                title={isSlotUsed ? `Slot ${pIdx + 1} expended (Click to restore)` : `Slot ${pIdx + 1} ready (Click to expend)`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Spells List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {character.spells?.map(sp => (
                  <div key={sp.id} className="bg3-card" style={{ padding: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span className="bg3-card-header" style={{ margin: 0, fontSize: '1.05rem' }}>{sp.name}</span>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => onCastSpell(sp)}
                      >
                        <Wand2 size={14} />
                        <span>{sp.level === 0 ? 'Cast Cantrip' : `Cast (Lvl ${sp.level})`}</span>
                      </button>
                    </div>
                    <div className="bg3-badge-pill" style={{ margin: '0.2rem 0' }}>{sp.school} &bull; {sp.castingTime} &bull; {sp.range}</div>
                    <div className="bg3-card-desc" style={{ marginTop: '0.35rem' }}>{sp.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PASSIVES & FEATURES TAB */}
          {activeTab === 'passives' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {character.features?.map(feat => (
                <div key={feat.id} className="bg3-card" style={{ padding: '0.85rem' }}>
                  <div className="bg3-card-header" style={{ fontSize: '1rem', color: 'var(--text-gold)' }}>
                    {feat.name}
                  </div>
                  {feat.source && <div className="bg3-badge-pill" style={{ margin: '0.2rem 0' }}>{feat.source}</div>}
                  <div className="bg3-card-desc" style={{ marginTop: '0.35rem' }}>
                    {feat.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* COLUMN 3: EQUIPMENT, INVENTORY & BIO */}
        <div className="bg3-column">
          {/* Carrying Capacity & Currency */}
          <div className="bg3-panel-box" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 800, fontSize: '0.85rem' }}>
                INVENTORY LOADOUT
              </span>
              <span style={{ fontSize: '0.75rem', color: isEncumbered ? 'var(--accent-red)' : '#94a3b8' }}>
                {currentWeight} / {capacity} lbs
              </span>
            </div>

            <div style={{ width: '100%', height: '6px', background: '#1c1917', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: `${Math.min(100, (currentWeight / capacity) * 100)}%`,
                  height: '100%',
                  background: isEncumbered ? 'var(--accent-red)' : 'linear-gradient(90deg, #dfb85a 0%, #ffd874 100%)'
                }}
              />
            </div>

            {/* Currency Pouch */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', textAlign: 'center' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.3rem', borderRadius: '4px', border: '1px solid rgba(223, 184, 90, 0.2)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 800 }}>{character.currency?.gp || 0}</div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Gold (GP)</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.3rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', color: '#cbd5e1', fontWeight: 800 }}>{character.currency?.sp || 0}</div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Silver (SP)</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.3rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', color: '#b45309', fontWeight: 800 }}>{character.currency?.cp || 0}</div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Copper (CP)</div>
              </div>
            </div>
          </div>

          {/* Equipment List */}
          <div className="bg3-panel-box" style={{ marginBottom: '1rem', maxHeight: '240px', overflowY: 'auto' }}>
            <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              Backpack Gear
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {character.equipment?.map(eq => (
                <div key={eq.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem 0.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '4px', fontSize: '0.8rem' }}>
                  <span>{eq.name} {eq.quantity > 1 && `(x${eq.quantity})`}</span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{eq.weight * (eq.quantity || 1)} lbs</span>
                </div>
              ))}
            </div>
          </div>

          {/* Roleplay Bio */}
          <div className="bg3-panel-box">
            <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              Personality &amp; Lore
            </div>
            <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.4', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {character.personality && (
                <div><strong style={{ color: 'var(--text-gold)' }}>Trait:</strong> {character.personality}</div>
              )}
              {character.ideals && (
                <div><strong style={{ color: 'var(--text-gold)' }}>Ideal:</strong> {character.ideals}</div>
              )}
              {character.bonds && (
                <div><strong style={{ color: 'var(--text-gold)' }}>Bond:</strong> {character.bonds}</div>
              )}
              {character.flaws && (
                <div><strong style={{ color: 'var(--text-gold)' }}>Flaw:</strong> {character.flaws}</div>
              )}
              {character.backstory && (
                <div style={{ marginTop: '0.3rem', fontStyle: 'italic', color: '#94a3b8' }}>&ldquo;{character.backstory}&rdquo;</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
