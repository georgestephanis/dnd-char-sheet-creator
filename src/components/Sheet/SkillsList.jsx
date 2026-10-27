import React from 'react';
import { SKILLS, getAbilityModifier, getProficiencyBonus, formatModifier } from '../../utils/dndRules';

export default function SkillsList({ character, scores, onRollSkill, onCycleSkillProficiency }) {
  const profBonus = getProficiencyBonus(character.level || 1);
  const proficientSkills = character.skillProficiencies || [];
  const expertiseSkills = character.expertiseSkills || [];

  // Check if Bard (Jack of All Trades)
  const isJackOfAllTrades = character.classId === 'bard' && (character.level || 1) >= 2;
  const jackBonus = Math.floor(profBonus / 2);

  return (
    <div className="section-box">
      <div className="section-box-title">
        <span>Skills</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {SKILLS.map(sk => {
          const abMod = getAbilityModifier(scores[sk.ability]);
          const isExp = expertiseSkills.includes(sk.name);
          const isProf = proficientSkills.includes(sk.name);

          let totalMod = abMod;
          if (isExp) {
            totalMod += profBonus * 2;
          } else if (isProf) {
            totalMod += profBonus;
          } else if (isJackOfAllTrades) {
            totalMod += jackBonus;
          }

          const indicatorClass = isExp ? 'expertise' : isProf ? 'proficient' : '';

          return (
            <div key={sk.id} className="stat-list-item">
              <span
                className={`proficiency-indicator ${indicatorClass}`}
                title="Click to cycle: Proficient &rarr; Expertise &rarr; None"
                onClick={() => onCycleSkillProficiency && onCycleSkillProficiency(sk.name)}
              />
              <span
                className="stat-mod-value"
                onClick={() => onRollSkill && onRollSkill(sk.name, totalMod)}
              >
                {formatModifier(totalMod)}
              </span>
              <span
                className="stat-name-label"
                onClick={() => onRollSkill && onRollSkill(sk.name, totalMod)}
              >
                {sk.name}
              </span>
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
