// SRD 5.1 System Reference Document - Races & Lineages (CC-BY-4.0 / OGL)

export const SRD_RACES = [
  {
    id: 'dwarf',
    name: 'Dwarf',
    description: 'Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.',
    speed: 25,
    size: 'Medium',
    abilityScoreBonuses: { con: 2 },
    traits: [
      { name: 'Darkvision', description: 'You can see in dim light within 60 feet as if it were bright light, and in darkness as if dim light.' },
      { name: 'Dwarven Resilience', description: 'You have advantage on saving throws against poison, and resistance against poison damage.' },
      { name: 'Dwarven Combat Training', description: 'Proficiency with battleaxe, handaxe, light hammer, and warhammer.' },
      { name: 'Stonecunning', description: 'Add double your proficiency bonus to History checks related to the origin of stonework.' }
    ],
    languages: ['Common', 'Dwarvish'],
    weaponProficiencies: ['battleaxe', 'handaxe', 'light hammer', 'warhammer'],
    subraces: [
      {
        id: 'hill-dwarf',
        name: 'Hill Dwarf',
        description: 'As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience.',
        abilityScoreBonuses: { wis: 1 },
        traits: [
          { name: 'Dwarven Toughness', description: 'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.' }
        ],
        extraHpPerLevel: 1
      },
      {
        id: 'mountain-dwarf',
        name: 'Mountain Dwarf',
        description: 'Strong and hardy, accustomed to a difficult life in rugged terrain.',
        abilityScoreBonuses: { str: 2 },
        traits: [
          { name: 'Dwarven Armor Training', description: 'You have proficiency with light and medium armor.' }
        ],
        armorProficiencies: ['light', 'medium']
      }
    ]
  },
  {
    id: 'elf',
    name: 'Elf',
    description: 'Elves are a magical people of otherworldly grace, living in the world but not entirely part of it.',
    speed: 30,
    size: 'Medium',
    abilityScoreBonuses: { dex: 2 },
    traits: [
      { name: 'Darkvision', description: 'You can see in dim light within 60 feet as if it were bright light, and in darkness as if dim light.' },
      { name: 'Keen Senses', description: 'You have proficiency in the Perception skill.' },
      { name: 'Fey Ancestry', description: 'You have advantage on saving throws against being charmed, and magic cannot put you to sleep.' },
      { name: 'Trance', description: 'Elves don’t need to sleep. Instead, they meditate deeply for 4 hours a day.' }
    ],
    skillProficiencies: ['Perception'],
    languages: ['Common', 'Elvish'],
    subraces: [
      {
        id: 'high-elf',
        name: 'High Elf',
        description: 'As a high elf, you have a keen mind and a mastery of at least the basics of magic.',
        abilityScoreBonuses: { int: 1 },
        traits: [
          { name: 'Elf Weapon Training', description: 'Proficiency with longsword, shortsword, shortbow, and longbow.' },
          { name: 'Cantrip', description: 'You know one cantrip of your choice from the wizard spell list (Intelligence is your spellcasting ability).' },
          { name: 'Extra Language', description: 'You can speak, read, and write one extra language of your choice.' }
        ],
        weaponProficiencies: ['longsword', 'shortsword', 'shortbow', 'longbow'],
        extraCantripsCount: 1,
        cantripSource: 'wizard'
      },
      {
        id: 'wood-elf',
        name: 'Wood Elf',
        description: 'As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly and stealthily.',
        speed: 35,
        abilityScoreBonuses: { wis: 1 },
        traits: [
          { name: 'Elf Weapon Training', description: 'Proficiency with longsword, shortsword, shortbow, and longbow.' },
          { name: 'Fleet of Foot', description: 'Your base walking speed increases to 35 feet.' },
          { name: 'Mask of the Wild', description: 'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.' }
        ],
        weaponProficiencies: ['longsword', 'shortsword', 'shortbow', 'longbow']
      },
      {
        id: 'drow',
        name: 'Drow (Dark Elf)',
        description: 'Descended from an earlier subrace of elves, drow were banished from the surface world.',
        abilityScoreBonuses: { cha: 1 },
        traits: [
          { name: 'Superior Darkvision', description: 'Your darkvision has a radius of 120 feet.' },
          { name: 'Sunlight Sensitivity', description: 'You have disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when you or your target is in direct sunlight.' },
          { name: 'Drow Magic', description: 'You know the Dancing Lights cantrip. At 3rd level, cast Faerie Fire once per long rest. At 5th level, cast Darkness once per long rest.' },
          { name: 'Drow Weapon Training', description: 'Proficiency with rapiers, shortswords, and hand crossbows.' }
        ],
        weaponProficiencies: ['rapier', 'shortsword', 'hand crossbow'],
        innateSpells: ['Dancing Lights']
      }
    ]
  },
  {
    id: 'halfling',
    name: 'Halfling',
    description: 'The comforts of home are the goals of most halflings’ lives: a place to settle in peace and quiet, far from marauding monsters.',
    speed: 25,
    size: 'Small',
    abilityScoreBonuses: { dex: 2 },
    traits: [
      { name: 'Lucky', description: 'When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.' },
      { name: 'Brave', description: 'You have advantage on saving throws against being frightened.' },
      { name: 'Halfling Nimbleness', description: 'You can move through the space of any creature that is of a size larger than yours.' }
    ],
    languages: ['Common', 'Halfling'],
    subraces: [
      {
        id: 'lightfoot-halfling',
        name: 'Lightfoot Halfling',
        description: 'As a lightfoot halfling, you can easily hide from notice, even using other people as cover.',
        abilityScoreBonuses: { cha: 1 },
        traits: [
          { name: 'Naturally Stealthy', description: 'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.' }
        ]
      },
      {
        id: 'stout-halfling',
        name: 'Stout Halfling',
        description: 'As a stout halfling, you’re hardier than average and have some resistance to poison.',
        abilityScoreBonuses: { con: 1 },
        traits: [
          { name: 'Stout Resilience', description: 'You have advantage on saving throws against poison, and you have resistance against poison damage.' }
        ]
      }
    ]
  },
  {
    id: 'human',
    name: 'Human',
    description: 'Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators and pioneers.',
    speed: 30,
    size: 'Medium',
    abilityScoreBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    traits: [
      { name: 'Versatility', description: 'Humans adapt to any climate, role, or culture.' }
    ],
    languages: ['Common', 'Choice of one extra'],
    subraces: [
      {
        id: 'human-standard',
        name: 'Standard Human',
        description: '+1 to all six ability scores, plus an extra language of your choice.',
        abilityScoreBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
        traits: []
      },
      {
        id: 'human-variant',
        name: 'Variant Human',
        description: '+1 to two different ability scores of your choice, 1 skill proficiency, and 1 feat of your choice.',
        abilityScoreBonuses: {}, // User picks 2
        isVariant: true,
        extraSkillCount: 1,
        extraFeatCount: 1,
        traits: [
          { name: 'Skills', description: 'You gain proficiency in one skill of your choice.' },
          { name: 'Feat', description: 'You gain one feat of your choice.' }
        ]
      }
    ]
  },
  {
    id: 'dragonborn',
    name: 'Dragonborn',
    description: 'Born of dragons, dragonborn walk proudly through a world that greets them with fearful incomprehension.',
    speed: 30,
    size: 'Medium',
    abilityScoreBonuses: { str: 2, cha: 1 },
    traits: [
      { name: 'Draconic Ancestry', description: 'You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table; your breath weapon and damage resistance are determined by the dragon type.' },
      { name: 'Breath Weapon', description: 'You can use your action to exhale destructive energy. The DC for this saving throw equals 8 + CON modifier + proficiency bonus. On failed save takes 2d6 damage (increases at 6th, 11th, and 16th level).' },
      { name: 'Damage Resistance', description: 'You have resistance to the damage type associated with your draconic ancestry.' }
    ],
    languages: ['Common', 'Draconic'],
    subraces: [
      { id: 'dragonborn-red', name: 'Red Dragonborn', ancestry: 'Red', damageType: 'Fire', breath: '15 ft. cone (DEX save)' },
      { id: 'dragonborn-blue', name: 'Blue Dragonborn', ancestry: 'Blue', damageType: 'Lightning', breath: '5 by 30 ft. line (DEX save)' },
      { id: 'dragonborn-green', name: 'Green Dragonborn', ancestry: 'Green', damageType: 'Poison', breath: '15 ft. cone (CON save)' },
      { id: 'dragonborn-black', name: 'Black Dragonborn', ancestry: 'Black', damageType: 'Acid', breath: '5 by 30 ft. line (DEX save)' },
      { id: 'dragonborn-white', name: 'White Dragonborn', ancestry: 'White', damageType: 'Cold', breath: '15 ft. cone (CON save)' },
      { id: 'dragonborn-gold', name: 'Gold Dragonborn', ancestry: 'Gold', damageType: 'Fire', breath: '15 ft. cone (DEX save)' },
      { id: 'dragonborn-silver', name: 'Silver Dragonborn', ancestry: 'Silver', damageType: 'Cold', breath: '15 ft. cone (CON save)' },
      { id: 'dragonborn-bronze', name: 'Bronze Dragonborn', ancestry: 'Bronze', damageType: 'Lightning', breath: '5 by 30 ft. line (DEX save)' },
      { id: 'dragonborn-copper', name: 'Copper Dragonborn', ancestry: 'Copper', damageType: 'Acid', breath: '5 by 30 ft. line (DEX save)' },
      { id: 'dragonborn-brass', name: 'Brass Dragonborn', ancestry: 'Brass', damageType: 'Fire', breath: '5 by 30 ft. line (DEX save)' }
    ]
  },
  {
    id: 'gnome',
    name: 'Gnome',
    description: 'A constant hum of busy activity pervades the warrens and neighborhoods where gnomes form their close-knit communities.',
    speed: 25,
    size: 'Small',
    abilityScoreBonuses: { int: 2 },
    traits: [
      { name: 'Darkvision', description: 'You can see in dim light within 60 feet as if it were bright light, and in darkness as if dim light.' },
      { name: 'Gnome Cunning', description: 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.' }
    ],
    languages: ['Common', 'Gnomish'],
    subraces: [
      {
        id: 'forest-gnome',
        name: 'Forest Gnome',
        description: 'As a forest gnome, you have a natural knack for illusion and inherent quickness and stealth.',
        abilityScoreBonuses: { dex: 1 },
        traits: [
          { name: 'Natural Illusionist', description: 'You know the Minor Illusion cantrip. Intelligence is your spellcasting ability for it.' },
          { name: 'Speak with Small Beasts', description: 'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts.' }
        ],
        innateSpells: ['Minor Illusion']
      },
      {
        id: 'rock-gnome',
        name: 'Rock Gnome',
        description: 'As a rock gnome, you have a natural inventiveness and hardiness beyond that of other gnomes.',
        abilityScoreBonuses: { con: 1 },
        traits: [
          { name: 'Artificer’s Lore', description: 'Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, add twice your proficiency bonus.' },
          { name: 'Tinker', description: 'Proficiency with artisan’s tools (tinker’s tools). Using those tools, construct tiny clockwork devices.' }
        ],
        toolProficiencies: ["Tinker's Tools"]
      }
    ]
  },
  {
    id: 'half-elf',
    name: 'Half-Elf',
    description: 'Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents.',
    speed: 30,
    size: 'Medium',
    abilityScoreBonuses: { cha: 2 }, // plus two choices of +1
    hasFlexibleBonuses: true,
    flexibleBonusCount: 2,
    traits: [
      { name: 'Darkvision', description: 'You can see in dim light within 60 feet as if it were bright light, and in darkness as if dim light.' },
      { name: 'Fey Ancestry', description: 'You have advantage on saving throws against being charmed, and magic cannot put you to sleep.' },
      { name: 'Skill Versatility', description: 'You gain proficiency in two skills of your choice.' }
    ],
    extraSkillCount: 2,
    languages: ['Common', 'Elvish', 'Choice of one extra'],
    subraces: []
  },
  {
    id: 'half-orc',
    name: 'Half-Orc',
    description: 'Half-orcs’ grayish pigmentation, sloping brows, jutting jaws, prominent teeth, and towering builds make their orcish heritage plain for all to see.',
    speed: 30,
    size: 'Medium',
    abilityScoreBonuses: { str: 2, con: 1 },
    traits: [
      { name: 'Darkvision', description: 'You can see in dim light within 60 feet as if it were bright light, and in darkness as if dim light.' },
      { name: 'Menacing', description: 'You gain proficiency in the Intimidation skill.' },
      { name: 'Relentless Endurance', description: 'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. Once per long rest.' },
      { name: 'Savage Attacks', description: 'When you score a critical hit with a melee weapon attack, you can roll one of the weapon’s damage dice one additional time and add it to the extra damage.' }
    ],
    skillProficiencies: ['Intimidation'],
    languages: ['Common', 'Orc'],
    subraces: []
  },
  {
    id: 'tiefling',
    name: 'Tiefling',
    description: 'To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling.',
    speed: 30,
    size: 'Medium',
    abilityScoreBonuses: { int: 1, cha: 2 },
    traits: [
      { name: 'Darkvision', description: 'You can see in dim light within 60 feet as if it were bright light, and in darkness as if dim light.' },
      { name: 'Hellish Resistance', description: 'You have resistance to fire damage.' },
      { name: 'Infernal Legacy', description: 'You know the Thaumaturgy cantrip. At 3rd level, cast Hellish Rebuke once per long rest (2nd level). At 5th level, cast Darkness once per long rest.' }
    ],
    languages: ['Common', 'Infernal'],
    innateSpells: ['Thaumaturgy'],
    subraces: []
  }
];
