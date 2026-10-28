import React from 'react';
import { SKILLS, formatModifier, getSkillBonus } from '../../utils/dndRules';

export default function SkillsList({ character, scores, onRollSkill, onCycleSkillProficiency }) {
  const proficientSkills = character.skillProficiencies || [];
  const expertiseSkills = character.expertiseSkills || [];

  return (
    <div className="section-box">
      <div className="section-box-title">
        <span>Skills</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {SKILLS.map(sk => {
          const isExp = expertiseSkills.includes(sk.name);
          const isProf = proficientSkills.includes(sk.name);
          const totalMod = getSkillBonus(character, sk.name, scores[sk.ability]);

          const indicatorClass = isExp ? 'expertise' : isProf ? 'proficient' : '';

          return (
            <div key={sk.id} className="stat-list-item">
              <button
                type="button"
                className={`proficiency-indicator btn-reset ${indicatorClass}`}
                title="Click to cycle: Proficient &rarr; Expertise &rarr; None"
                aria-label={`${sk.name} proficiency: ${isExp ? 'expertise' : isProf ? 'proficient' : 'none'}. Activate to change.`}
                onClick={() => onCycleSkillProficiency && onCycleSkillProficiency(sk.name)}
              />
              <button
                type="button"
                className="stat-roll-btn btn-reset"
                aria-label={`Roll ${sk.name} check, ${formatModifier(totalMod)}`}
                onClick={() => onRollSkill && onRollSkill(sk.name, totalMod)}
              >
                <span className="stat-mod-value">{formatModifier(totalMod)}</span>
                <span className="stat-name-label">{sk.name}</span>
              </button>
              <span className="stat-ability-badge">
                ({sk.ability})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
