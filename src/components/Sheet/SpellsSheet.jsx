import React, { useState } from 'react';
import { Plus, Trash2, Wand2, Sparkles, BookOpen, Check } from 'lucide-react';
import { SRD_CLASSES } from '../../data/srdClasses';
import { getAbilityModifier, getProficiencyBonus, getSpellSlotsForClass, formatModifier } from '../../utils/dndRules';

export default function SpellsSheet({ character, scores, onUpdateCharacter, onOpenAddSpell, onRemoveSpell, onCastSpell }) {
  const classData = SRD_CLASSES.find(c => c.id === character.classId) || SRD_CLASSES[0];
  const spellAbility = character.spellcastingAbility || classData.spellcastingAbility || 'int';
  const profBonus = getProficiencyBonus(character.level || 1);

  const abilityMod = getAbilityModifier(scores[spellAbility]);
  const spellSaveDc = 8 + profBonus + abilityMod;
  const spellAttackBonus = profBonus + abilityMod;

  const casterType = classData.spellcasterType || (classData.spellcaster ? 'full' : 'none');
  const maxSlots = getSpellSlotsForClass(casterType, character.level || 1);
  const usedSlots = character.spellSlotsUsed || [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const spells = character.spells || [];

  const handleToggleSlot = (lvlIndex, slotNum) => {
    const currentUsed = usedSlots[lvlIndex] || 0;
    const newUsed = slotNum <= currentUsed ? slotNum - 1 : slotNum;
    const nextArr = [...usedSlots];
    nextArr[lvlIndex] = newUsed;
    onUpdateCharacter({ spellSlotsUsed: nextArr });
  };

  const handleTogglePrepared = (spellId) => {
    const updated = spells.map(sp => {
      if (sp.id === spellId) return { ...sp, prepared: !sp.prepared };
      return sp;
    });
    onUpdateCharacter({ spells: updated });
  };

  // Group spells by level
  const spellsByLevel = {};
  for (let l = 0; l <= 9; l++) spellsByLevel[l] = [];
  spells.forEach(sp => {
    const lvl = sp.level || 0;
    if (!spellsByLevel[lvl]) spellsByLevel[lvl] = [];
    spellsByLevel[lvl].push(sp);
  });

  return (
    <div className="sheet-page" style={{ marginTop: '1rem' }}>
      {/* Spellcasting Header Box */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', border: '2px solid var(--parchment-border)', borderRadius: '8px', padding: '1rem', background: 'var(--parchment-card)', marginBottom: '1.25rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--parchment-text)' }}>
            {spellAbility.toUpperCase()}
          </div>
          <div className="sheet-label">Spellcasting Ability</div>
        </div>

        <div style={{ textAlign: 'center', borderLeft: '2px solid var(--parchment-border-light)', borderRight: '2px solid var(--parchment-border-light)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--parchment-text)' }}>
            {spellSaveDc}
          </div>
          <div className="sheet-label">Spell Save DC</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--parchment-text)' }}>
            {formatModifier(spellAttackBonus)}
          </div>
          <div className="sheet-label">Spell Attack Bonus</div>
        </div>
      </div>

      {/* Spell Slots Tracker (Levels 1 to 9) */}
      <div className="section-box" style={{ marginBottom: '1.25rem' }}>
        <div className="section-box-title">
          <span>Spell Slots Tracker</span>
          <button
            type="button"
            className="btn btn-secondary btn-sm no-print"
            style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem' }}
            onClick={() => onUpdateCharacter({ spellSlotsUsed: [0, 0, 0, 0, 0, 0, 0, 0, 0] })}
          >
            Reset All Slots
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
          {Array.from({ length: 9 }).map((_, idx) => {
            const slotLvl = idx + 1;
            const total = maxSlots[idx] || 0;
            const used = usedSlots[idx] || 0;

            if (total === 0) return null;

            return (
              <div
                key={slotLvl}
                style={{
                  border: '1.5px solid var(--parchment-border)',
                  borderRadius: '6px',
                  padding: '0.4rem 0.2rem',
                  background: 'rgba(255, 255, 255, 0.6)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.8rem', color: 'var(--parchment-text)' }}>
                  Lvl {slotLvl}
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, margin: '0.2rem 0' }}>
                  {total - used} / {total}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem', flexWrap: 'wrap' }}>
                  {Array.from({ length: total }).map((__, sIdx) => {
                    const isExpended = sIdx < used;
                    return (
                      <span
                        key={sIdx}
                        title={`Slot ${sIdx + 1} (${isExpended ? 'Expended' : 'Available'})`}
                        onClick={() => handleToggleSlot(idx, sIdx + 1)}
                        style={{
                          width: '11px',
                          height: '11px',
                          borderRadius: '50%',
                          border: '1.5px solid var(--parchment-border)',
                          background: isExpended ? 'var(--accent-red)' : 'var(--accent-gold)',
                          cursor: 'pointer',
                          display: 'inline-block'
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spells List by Level */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--parchment-text)' }}>
          Spells Known &amp; Prepared
        </h3>
        <button
          type="button"
          className="btn btn-primary btn-sm no-print"
          onClick={onOpenAddSpell}
        >
          <Plus size={14} />
          <span>Add Spell</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => {
          const list = spellsByLevel[lvl] || [];
          if (list.length === 0 && (maxSlots[lvl - 1] === 0 || lvl > 5)) return null;

          return (
            <div key={lvl} className="section-box" style={{ breakInside: 'avoid' }}>
              <div className="section-box-title" style={{ fontSize: '0.8rem' }}>
                <span>{lvl === 0 ? 'Cantrips (0 Level)' : `Level ${lvl} Spells`}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--parchment-text-muted)' }}>
                  {list.length} spell{list.length === 1 ? '' : 's'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {list.map(sp => (
                  <div
                    key={sp.id}
                    style={{
                      borderBottom: '1px dotted var(--parchment-border-light)',
                      paddingBottom: '0.35rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {lvl > 0 && (
                          <input
                            type="checkbox"
                            checked={sp.prepared ?? false}
                            title="Prepared"
                            onChange={() => handleTogglePrepared(sp.id)}
                            style={{ accentColor: 'var(--accent-gold)' }}
                          />
                        )}
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--parchment-text)' }}>
                          {sp.name}
                        </span>
                        {sp.ritual && (
                          <span style={{ fontSize: '0.65rem', background: 'rgba(59, 130, 246, 0.15)', color: '#2563eb', padding: '0.05rem 0.3rem', borderRadius: '3px' }}>
                            R
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        {lvl > 0 && (
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm no-print"
                            style={{ padding: '0.1rem 0.4rem', fontSize: '0.68rem' }}
                            title="Cast spell (expend slot)"
                            onClick={() => onCastSpell && onCastSpell(sp)}
                          >
                            <Wand2 size={11} />
                            <span>Cast</span>
                          </button>
                        )}
                        <button
                          type="button"
                          className="no-print"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-red)', padding: '0.1rem' }}
                          title="Remove spell"
                          onClick={() => onRemoveSpell && onRemoveSpell(sp.id)}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--parchment-text-muted)' }}>
                      {sp.castingTime} &bull; {sp.range} &bull; {sp.duration}
                    </div>

                    {sp.description && (
                      <div style={{ fontSize: '0.76rem', color: 'var(--parchment-text)', lineHeight: '1.3' }}>
                        {sp.description}
                      </div>
                    )}
                  </div>
                ))}

                {list.length === 0 && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--parchment-text-muted)', fontStyle: 'italic', padding: '0.3rem 0' }}>
                    No {lvl === 0 ? 'cantrips' : `level ${lvl} spells`} recorded.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
