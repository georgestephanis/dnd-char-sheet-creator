import React from 'react';
import { ABILITIES, getAbilityModifier, getProficiencyBonus, formatModifier } from '../../utils/dndRules';

export default function SavingThrows({ character, scores, onRollSave, onToggleSaveProficiency }) {
  const profBonus = getProficiencyBonus(character.level || 1);
  const proficientSaves = character.savingThrowsProficient || [];

  return (
    <div className="section-box">
      <div className="section-box-title">
        <span>Saving Throws</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {ABILITIES.map(ab => {
          const mod = getAbilityModifier(scores[ab.id]);
          const isProf = proficientSaves.includes(ab.id);
          const totalMod = mod + (isProf ? profBonus : 0);

          return (
            <div key={ab.id} className="stat-list-item">
              <button
                type="button"
                className={`proficiency-indicator btn-reset ${isProf ? 'proficient' : ''}`}
                title={`Toggle ${ab.name} save proficiency`}
                aria-label={`${ab.name} save proficiency`}
                aria-pressed={isProf}
                onClick={() => onToggleSaveProficiency && onToggleSaveProficiency(ab.id)}
              />
              <button
                type="button"
                className="stat-roll-btn btn-reset"
                aria-label={`Roll ${ab.name} save, ${formatModifier(totalMod)}`}
                onClick={() => onRollSave && onRollSave(`${ab.name} Save`, totalMod)}
              >
                <span className="stat-mod-value">{formatModifier(totalMod)}</span>
                <span className="stat-name-label">{ab.name}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
