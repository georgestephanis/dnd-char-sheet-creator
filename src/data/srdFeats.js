// SRD 5.1 System Reference Document - Feats (CC-BY-4.0 / OGL)

export const SRD_FEATS = [
  {
    id: 'grappler',
    name: 'Grappler',
    prerequisite: 'Strength 13 or higher',
    description: 'You’ve developed the skills necessary to hold your own in close-quarters grappling.',
    benefits: [
      'You have advantage on attack rolls against a creature you are grappling.',
      'You can use your action to try to pin a creature grappled by you. To do so, make another grapple check. If you succeed, you and the creature are both restrained until the grapple ends.'
    ]
  },
  {
    id: 'alert',
    name: 'Alert',
    prerequisite: 'None',
    description: 'Always on the lookout for danger, you gain the following benefits:',
    benefits: [
      '+5 bonus to initiative.',
      'You can’t be surprised while you are conscious.',
      'Other creatures don’t gain advantage on attack rolls against you as a result of being unseen by you.'
    ]
  },
  {
    id: 'great-weapon-master',
    name: 'Great Weapon Master',
    prerequisite: 'None',
    description: 'You’ve learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes.',
    benefits: [
      'On your turn, when you score a critical hit with a melee weapon or reduce a creature to 0 HP with one, you can make one melee weapon attack as a bonus action.',
      'Before you make a melee attack with a heavy weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack’s damage.'
    ]
  },
  {
    id: 'lucky',
    name: 'Lucky',
    prerequisite: 'None',
    description: 'You have inexplicable luck that seems to kick in at just the right moment.',
    benefits: [
      'You have 3 luck points per long rest. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20 and choose which d20 to use.',
      'You can also spend one luck point when an attack roll is made against you to roll a d20 and choose whether the attack uses the attacker’s roll or yours.'
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile',
    prerequisite: 'None',
    description: 'You are exceptionally speedy and agile.',
    benefits: [
      'Your speed increases by 10 feet.',
      'When you use the Dash action, difficult terrain doesn’t cost you extra movement on that turn.',
      'When you make a melee attack against a creature, you don’t provoke opportunity attacks from that creature for the rest of the turn, whether you hit or not.'
    ],
    speedBonus: 10
  },
  {
    id: 'sharpshooter',
    name: 'Sharpshooter',
    prerequisite: 'None',
    description: 'You have mastered ranged weapons and can make shots that others find impossible.',
    benefits: [
      'Attacking at long range doesn’t impose disadvantage on your ranged weapon attack rolls.',
      'Your ranged weapon attacks ignore half cover and three-quarters cover.',
      'Before you make an attack with a ranged weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, add +10 to the attack’s damage.'
    ]
  },
  {
    id: 'shield-master',
    name: 'Shield Master',
    prerequisite: 'None',
    description: 'You use shields not just for protection but also for offense.',
    benefits: [
      'If you take the Attack action on your turn, you can use a bonus action to try to shove a creature within 5 feet of you with your shield.',
      'If you aren’t incapacitated, you can add your shield’s AC bonus to any Dexterity saving throw you make against a spell or other harmful effect that targets only you.',
      'If you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you can use your reaction to take no damage if you succeed on the saving throw, interposing your shield between yourself and the source of the effect.'
    ]
  },
  {
    id: 'tough',
    name: 'Tough',
    prerequisite: 'None',
    description: 'Your hit point maximum increases by an amount equal to twice your level when you gain this feat. Whenever you gain a level thereafter, your hit point maximum increases by an additional 2 hit points.',
    extraHpPerLevel: 2,
    benefits: [
      'Your hit point maximum increases by an amount equal to twice your level when you take this feat, and increases by 2 hit points every time you level up thereafter.'
    ]
  },
  {
    id: 'war-caster',
    name: 'War Caster',
    prerequisite: 'The ability to cast at least one spell',
    description: 'You have practiced casting spells in the midst of combat, learning techniques that grant you the following benefits:',
    benefits: [
      'You have advantage on Constitution saving throws that you make to maintain your concentration on a spell when you take damage.',
      'You can perform the somatic components of spells even when you have weapons or a shield in one or both hands.',
      'When a hostile creature’s movement provokes an opportunity attack from you, you can use your reaction to cast a spell at the creature, rather than making an opportunity attack. The spell must have a casting time of 1 action and must target only that creature.'
    ]
  },
  {
    id: 'resilient',
    name: 'Resilient',
    prerequisite: 'None',
    description: 'Choose one ability score: increase it by 1 and gain proficiency in saving throws using that ability.',
    benefits: [
      'Increase the chosen ability score by 1, to a maximum of 20.',
      'You gain proficiency in saving throws using the chosen ability.'
    ]
  }
];
