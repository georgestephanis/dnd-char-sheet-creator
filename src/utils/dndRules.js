// D&D 5e Rules Engine & Calculation Utilities (SRD 5.1 compliant)

import { SRD_CLASSES } from '../data/srdClasses';

export const ABILITIES = [
  { id: 'str', name: 'Strength', short: 'STR' },
  { id: 'dex', name: 'Dexterity', short: 'DEX' },
  { id: 'con', name: 'Constitution', short: 'CON' },
  { id: 'int', name: 'Intelligence', short: 'INT' },
  { id: 'wis', name: 'Wisdom', short: 'WIS' },
  { id: 'cha', name: 'Charisma', short: 'CHA' }
];

export const SKILLS = [
  { id: 'acrobatics', name: 'Acrobatics', ability: 'dex' },
  { id: 'animal-handling', name: 'Animal Handling', ability: 'wis' },
  { id: 'arcana', name: 'Arcana', ability: 'int' },
  { id: 'athletics', name: 'Athletics', ability: 'str' },
  { id: 'deception', name: 'Deception', ability: 'cha' },
  { id: 'history', name: 'History', ability: 'int' },
  { id: 'insight', name: 'Insight', ability: 'wis' },
  { id: 'intimidation', name: 'Intimidation', ability: 'cha' },
  { id: 'investigation', name: 'Investigation', ability: 'int' },
  { id: 'medicine', name: 'Medicine', ability: 'wis' },
  { id: 'nature', name: 'Nature', ability: 'int' },
  { id: 'perception', name: 'Perception', ability: 'wis' },
  { id: 'performance', name: 'Performance', ability: 'cha' },
  { id: 'persuasion', name: 'Persuasion', ability: 'cha' },
  { id: 'religion', name: 'Religion', ability: 'int' },
  { id: 'sleight-of-hand', name: 'Sleight of Hand', ability: 'dex' },
  { id: 'stealth', name: 'Stealth', ability: 'dex' },
  { id: 'survival', name: 'Survival', ability: 'wis' }
];

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

export const POINT_BUY_COSTS = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9
};

export const POINT_BUY_TOTAL = 27;

export function getAbilityModifier(score) {
  const s = parseInt(score, 10) || 10;
  return Math.floor((s - 10) / 2);
}

export function formatModifier(mod) {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function getProficiencyBonus(level) {
  const lvl = parseInt(level, 10) || 1;
  return Math.floor((lvl - 1) / 4) + 2;
}

// Full Caster Spell Slots by Level [level]: [1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th]
export const FULL_CASTER_SLOTS = {
  1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
  2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
  3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
  4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
  5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
  6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
  7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
  8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
  9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
  10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
  11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
  20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
};

// Half Caster Spell Slots (Paladin, Ranger)
export const HALF_CASTER_SLOTS = {
  1: [0, 0, 0, 0, 0],
  2: [2, 0, 0, 0, 0],
  3: [3, 0, 0, 0, 0],
  4: [3, 0, 0, 0, 0],
  5: [4, 2, 0, 0, 0],
  6: [4, 2, 0, 0, 0],
  7: [4, 3, 0, 0, 0],
  8: [4, 3, 0, 0, 0],
  9: [4, 3, 2, 0, 0],
  10: [4, 3, 2, 0, 0],
  11: [4, 3, 3, 0, 0],
  12: [4, 3, 3, 0, 0],
  13: [4, 3, 3, 1, 0],
  14: [4, 3, 3, 1, 0],
  15: [4, 3, 3, 2, 0],
  16: [4, 3, 3, 2, 0],
  17: [4, 3, 3, 3, 1],
  18: [4, 3, 3, 3, 1],
  19: [4, 3, 3, 3, 2],
  20: [4, 3, 3, 3, 2]
};

// Warlock Pact Magic Slots: [slotsCount, slotLevel]
export const WARLOCK_SLOTS = {
  1: [1, 1],
  2: [2, 1],
  3: [2, 2],
  4: [2, 2],
  5: [2, 3],
  6: [2, 3],
  7: [2, 4],
  8: [2, 4],
  9: [2, 5],
  10: [2, 5],
  11: [3, 5],
  12: [3, 5],
  13: [3, 5],
  14: [3, 5],
  15: [3, 5],
  16: [3, 5],
  17: [4, 5],
  18: [4, 5],
  19: [4, 5],
  20: [4, 5]
};

export function getSpellSlotsForClass(casterType, level) {
  const lvl = Math.min(20, Math.max(1, parseInt(level, 10) || 1));
  if (casterType === 'full') {
    return FULL_CASTER_SLOTS[lvl] || [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  if (casterType === 'half') {
    const halfSlots = HALF_CASTER_SLOTS[lvl] || [0, 0, 0, 0, 0];
    return [...halfSlots, 0, 0, 0, 0];
  }
  if (casterType === 'pact') {
    const [count, slotLvl] = WARLOCK_SLOTS[lvl] || [1, 1];
    const slots = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    slots[slotLvl - 1] = count;
    return slots;
  }
  return [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

// Resolve a class id to its caster type ('full' | 'half' | 'pact' | 'none')
export function getCasterType(classId) {
  const classData = SRD_CLASSES.find(c => c.id === classId);
  if (!classData) return 'none';
  return classData.spellcasterType || (classData.spellcaster ? 'full' : 'none');
}

export function getSpellSlotsForCharacter(character) {
  return getSpellSlotsForClass(getCasterType(character.classId), character.level || 1);
}

// Lowest slot level (0-based index) at or above the spell's level with a slot remaining, or -1
export function findAvailableSlotIndex(maxSlots, slotsUsed, spellLevel) {
  for (let i = Math.max(0, spellLevel - 1); i < maxSlots.length; i++) {
    if ((maxSlots[i] || 0) > (slotsUsed[i] || 0)) return i;
  }
  return -1;
}

export function getHitDieSize(classId) {
  return SRD_CLASSES.find(c => c.id === classId)?.hitDie || 8;
}

export function getHitDiceLabel(character) {
  return character.hitDiceMax || `${character.level || 1}d${getHitDieSize(character.classId)}`;
}

// True when the character has a feature granting the named feat (e.g. "Feat: Alert")
export function hasFeat(character, featName) {
  const target = featName.toLowerCase();
  return (character.features || []).some(f => {
    const name = (f?.name || '').toLowerCase().replace(/^feat:\s*/, '');
    return name === target;
  });
}

// Skill bonus including proficiency, expertise and the Bard's Jack of All Trades
export function getSkillBonus(character, skillName, abilityScore) {
  const profBonus = getProficiencyBonus(character.level || 1);
  const abMod = getAbilityModifier(abilityScore);
  if (character.expertiseSkills?.includes(skillName)) return abMod + profBonus * 2;
  if (character.skillProficiencies?.includes(skillName)) return abMod + profBonus;
  if (character.classId === 'bard' && (character.level || 1) >= 2) return abMod + Math.floor(profBonus / 2);
  return abMod;
}

// Parse damage like "1d8", "2d6+1" or a flat "1" into { count, sides, flat }, or null
export function parseDamageExpression(expr) {
  const text = String(expr ?? '').replace(/\s+/g, '');
  const dice = text.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
  if (dice) {
    return { count: parseInt(dice[1], 10), sides: parseInt(dice[2], 10), flat: parseInt(dice[3] || '0', 10) };
  }
  if (/^\d+$/.test(text)) return { count: 0, sides: 0, flat: parseInt(text, 10) };
  return null;
}

// Calculate total ability score including racial bonuses and ASI improvements
export function getCalculatedAbilityScores(character) {
  const base = character.abilityScores || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
  const bonuses = character.racialBonuses || {};
  const customBonuses = character.customAbilityBonuses || {};

  const scores = {};
  for (const ab of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
    const b = parseInt(base[ab], 10) || 10;
    const r = parseInt(bonuses[ab], 10) || 0;
    const c = parseInt(customBonuses[ab], 10) || 0;
    scores[ab] = b + r + c;
  }
  return scores;
}

// Calculate Armor Class (AC)
export function calculateArmorClass(character, scores) {
  if (character.acOverride !== undefined && character.acOverride !== null && character.acOverride !== '') {
    return parseInt(character.acOverride, 10) || 10;
  }

  const dexMod = getAbilityModifier(scores.dex);
  const conMod = getAbilityModifier(scores.con);
  const wisMod = getAbilityModifier(scores.wis);

  const equippedArmor = character.equippedArmor; // object with { ac, category, maxDex, dexMod }
  const hasShield = character.equippedShield;

  let baseAc = 10;

  if (equippedArmor && equippedArmor.ac) {
    if (equippedArmor.category === 'Light') {
      baseAc = equippedArmor.ac + dexMod;
    } else if (equippedArmor.category === 'Medium') {
      const allowedDex = Math.min(dexMod, equippedArmor.maxDex ?? 2);
      baseAc = equippedArmor.ac + allowedDex;
    } else if (equippedArmor.category === 'Heavy') {
      baseAc = equippedArmor.ac;
    }
  } else {
    // Unarmored calculations
    if (character.classId === 'barbarian') {
      baseAc = 10 + dexMod + conMod;
    } else if (character.classId === 'monk' && !hasShield) {
      baseAc = 10 + dexMod + wisMod;
    } else if (character.subclassId === 'draconic-bloodline') {
      baseAc = 13 + dexMod;
    } else {
      baseAc = 10 + dexMod;
    }
  }

  if (hasShield) {
    baseAc += 2;
  }

  // Check for defense fighting style (+1 if wearing armor)
  if (equippedArmor && character.fightingStyle === 'defense') {
    baseAc += 1;
  }

  return baseAc;
}

// Roll 4d6 drop lowest for an ability score
export function roll4d6DropLowest() {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ];
  rolls.sort((a, b) => a - b);
  const dropped = rolls[0];
  const sum = rolls[1] + rolls[2] + rolls[3];
  return { rolls, dropped, total: sum };
}

// Generic dice roller
export function rollDice(count = 1, sides = 20, modifier = 0) {
  const rolls = [];
  let sum = 0;
  for (let i = 0; i < count; i++) {
    const val = Math.floor(Math.random() * sides) + 1;
    rolls.push(val);
    sum += val;
  }
  return {
    count,
    sides,
    rolls,
    sum,
    modifier,
    total: sum + modifier
  };
}

// Calculate carrying capacity in lbs
export function getCarryingCapacity(strScore) {
  return (parseInt(strScore, 10) || 10) * 15;
}
