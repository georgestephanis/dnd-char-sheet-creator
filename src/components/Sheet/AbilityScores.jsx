import React from 'react';
import { ABILITIES, getAbilityModifier, formatModifier } from '../../utils/dndRules';

export default function AbilityScores({ scores, onRollCheck, onUpdateScore }) {
  return (
    <div className="abilities-sidebar">
      {ABILITIES.map(ab => {
        const score = scores[ab.id] || 10;
        const mod = getAbilityModifier(score);

        return (
          <div key={ab.id} className="ability-score-card">
            <span className="ability-name">{ab.short}</span>
            <div
              className="ability-modifier"
              title={`Click to roll ${ab.name} check (${formatModifier(mod)})`}
              onClick={() => onRollCheck && onRollCheck(ab.name, mod)}
            >
              {formatModifier(mod)}
            </div>
            <div className="ability-score-bubble">
              {score}
            </div>
          </div>
        );
      })}
    </div>
  );
}
