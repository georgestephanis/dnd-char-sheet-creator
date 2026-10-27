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
              <span
                className={`proficiency-indicator ${isProf ? 'proficient' : ''}`}
                title={`Toggle ${ab.name} save proficiency`}
                onClick={() => onToggleSaveProficiency && onToggleSaveProficiency(ab.id)}
              />
              <span
                className="stat-mod-value"
                onClick={() => onRollSave && onRollSave(`${ab.name} Save`, totalMod)}
              >
                {formatModifier(totalMod)}
              </span>
              <span
                className="stat-name-label"
                onClick={() => onRollSave && onRollSave(`${ab.name} Save`, totalMod)}
              >
                {ab.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
