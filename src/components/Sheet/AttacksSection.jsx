import React from 'react';
import { Plus, Trash2, Sword } from 'lucide-react';
import { getAbilityModifier, getProficiencyBonus, formatModifier } from '../../utils/dndRules';

export default function AttacksSection({ character, scores, onRollAttack, onOpenAddAttack, onRemoveAttack }) {
  const profBonus = getProficiencyBonus(character.level || 1);
  const attacks = character.attacks || [];

  return (
    <div className="section-box" style={{ marginBottom: '0.75rem' }}>
      <div className="section-box-title">
        <span>Attacks &amp; Spellcasting</span>
        <button
          type="button"
          className="btn btn-secondary btn-sm no-print"
          style={{ padding: '0.15rem 0.5rem', fontSize: '0.72rem' }}
          onClick={onOpenAddAttack}
        >
          <Plus size={13} />
          <span>Add Attack</span>
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="attacks-table">
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ width: '55px', textAlign: 'center' }}>Atk Bonus</th>
              <th>Damage / Type</th>
              <th className="no-print" style={{ width: '30px' }}><span className="visually-hidden">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {attacks.map(atk => {
              const abMod = getAbilityModifier(scores[atk.ability || 'str']);
              const isProf = atk.isProficient ?? true;
              const bonus = (atk.bonusToHit || 0) + abMod + (isProf ? profBonus : 0);

              // Damage formula with ability modifier
              const damageWithMod = atk.damageDice
                ? `${atk.damageDice}${abMod !== 0 ? (abMod > 0 ? `+${abMod}` : abMod) : ''} ${atk.damageType || ''}`
                : atk.damageType || '';

              return (
                <tr key={atk.id}>
                  <td>
                    <button
                      type="button"
                      className="attack-row-btn"
                      title={`Click to roll ${atk.name} attack`}
                      onClick={() => onRollAttack && onRollAttack(atk, bonus, abMod)}
                    >
                      <Sword size={13} style={{ color: 'var(--parchment-text-muted)' }} />
                      <span>{atk.name}</span>
                    </button>
                    {atk.notes && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--parchment-text-muted)', marginTop: '0.1rem' }}>
                        {atk.notes}
                      </div>
                    )}
                  </td>
                  <td style={{ fontWeight: 800, textAlign: 'center', fontFamily: 'var(--font-heading)' }}>
                    <button
                      type="button"
                      className="btn-reset"
                      style={{ fontWeight: 800, fontFamily: 'var(--font-heading)', cursor: 'pointer', width: '100%', padding: '0.25rem 0' }}
                      aria-label={`Roll ${atk.name} attack, ${formatModifier(bonus)} to hit`}
                      onClick={() => onRollAttack && onRollAttack(atk, bonus, abMod)}
                    >
                      {formatModifier(bonus)}
                    </button>
                  </td>
                  <td style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                    {damageWithMod}
                  </td>
                  <td className="no-print" style={{ textAlign: 'center' }}>
                    <button aria-label={`Remove ${atk.name}`}
                      type="button"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-red)' }}
                      title="Remove attack"
                      onClick={() => onRemoveAttack && onRemoveAttack(atk.id)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {attacks.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '1rem', color: 'var(--parchment-text-muted)' }}>
                  No attacks listed. Click &ldquo;Add Attack&rdquo; above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
