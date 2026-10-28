// SRD 5.2.1 System Reference Document (CC-BY-4.0) — https://www.dndbeyond.com/srd
// Classes & subclasses

const ASI = { name: 'Ability Score Improvement', description: 'You gain the Ability Score Improvement feat or another feat of your choice for which you qualify.' };

// --- Barbarian, Bard, Cleric ---

const CLASSES_A = [
  {
    id: 'barbarian',
    name: 'Barbarian',
    description: 'A fierce warrior who channels a primal power called Rage to gain extraordinary might and resilience in battle.',
    hitDie: 12,
    primaryAbility: ['str'],
    savingThrows: ['str', 'con'],
    armorProficiencies: ['Light armor', 'Medium armor', 'Shields'],
    weaponProficiencies: ['Simple weapons', 'Martial weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival']
    },
    subclassLevel: 3,
    spellcaster: false,
    weaponMasteryCount: 2,
    startingEquipmentPackages: [
      { id: 'A', label: "Greataxe, 4 Handaxes, Explorer's Pack, and 15 GP", items: ['Greataxe', 'Handaxe (4)', "Explorer's Pack", '15 GP'] },
      { id: 'B', label: '75 GP', items: ['75 GP'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Rage', description: 'As a Bonus Action (not in Heavy armor), enter a Rage: Resistance to Bludgeoning, Piercing, and Slashing damage; bonus damage on Strength attacks (Rage Damage column, +2 to +4); Advantage on Strength checks and saves; no Concentration or spellcasting. It lasts until the end of your next turn and can be extended each turn by attacking an enemy, forcing a save, or taking a Bonus Action, up to 10 minutes; it ends early if you don Heavy armor or are Incapacitated. Uses per the Rages column (2 at level 1, up to 6); regain one on a Short Rest and all on a Long Rest.' },
        { name: 'Unarmored Defense', description: 'While not wearing armor, your base AC equals 10 + your Dexterity and Constitution modifiers. You can use a Shield and still gain this benefit.' },
        { name: 'Weapon Mastery', description: 'You can use the mastery properties of two kinds of Simple or Martial Melee weapons of your choice, changing one choice after a Long Rest. The number increases per the Weapon Mastery column (3 at level 4, 4 at level 10).' }
      ],
      2: [
        { name: 'Danger Sense', description: 'You have Advantage on Dexterity saving throws unless you have the Incapacitated condition.' },
        { name: 'Reckless Attack', description: 'When you make your first attack roll on your turn, you can attack recklessly, gaining Advantage on attack rolls using Strength until the start of your next turn, but attack rolls against you have Advantage during that time.' }
      ],
      3: [
        { name: 'Barbarian Subclass', description: 'You gain a Barbarian subclass of your choice, such as the Path of the Berserker.' },
        { name: 'Primal Knowledge', description: 'You gain proficiency in another skill from the Barbarian skill list. While your Rage is active, you can make Acrobatics, Intimidation, Perception, Stealth, or Survival checks as Strength checks.' }
      ],
      4: [ASI],
      5: [
        { name: 'Extra Attack', description: 'You can attack twice instead of once whenever you take the Attack action on your turn.' },
        { name: 'Fast Movement', description: 'Your speed increases by 10 feet while you aren\'t wearing Heavy armor.' }
      ],
      6: [{ name: 'Subclass Feature', description: 'You gain a feature from your Primal Path.' }],
      7: [
        { name: 'Feral Instinct', description: 'You have Advantage on Initiative rolls.' },
        { name: 'Instinctive Pounce', description: 'As part of the Bonus Action you take to enter your Rage, you can move up to half your Speed.' }
      ],
      8: [ASI],
      9: [{ name: 'Brutal Strike', description: 'When using Reckless Attack, you can forgo Advantage on one Strength-based attack roll (which mustn\'t have Disadvantage); on a hit it deals an extra 1d10 damage and you apply one effect: Forceful Blow (push the target 15 feet away, then you may move up to half your Speed toward it without provoking Opportunity Attacks) or Hamstring Blow (target\'s Speed reduced by 15 feet until the start of your next turn).' }],
      10: [{ name: 'Subclass Feature', description: 'You gain a feature from your Primal Path.' }],
      11: [{ name: 'Relentless Rage', description: 'If you drop to 0 Hit Points while raging and don\'t die outright, make a DC 10 Constitution save; on a success your Hit Points become twice your Barbarian level. The DC increases by 5 each subsequent use and resets to 10 after a Short or Long Rest.' }],
      12: [ASI],
      13: [{ name: 'Improved Brutal Strike', description: 'New Brutal Strike options: Staggering Blow (target has Disadvantage on its next saving throw and can\'t make Opportunity Attacks until the start of your next turn) and Sundering Blow (the next attack roll by another creature against the target before your next turn gains +5).' }],
      14: [{ name: 'Subclass Feature', description: 'You gain a feature from your Primal Path.' }],
      15: [{ name: 'Persistent Rage', description: 'When you roll Initiative, you can regain all expended uses of Rage (once per Long Rest). Your Rage now lasts 10 minutes without needing to be extended, ending early only if you are Unconscious or don Heavy armor.' }],
      16: [ASI],
      17: [{ name: 'Improved Brutal Strike', description: 'Brutal Strike\'s extra damage increases to 2d10, and you can apply two different Brutal Strike effects with each use.' }],
      18: [{ name: 'Indomitable Might', description: 'If your total for a Strength check or Strength saving throw is less than your Strength score, you can use that score in place of the total.' }],
      19: [{ name: 'Epic Boon', description: 'You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Irresistible Offense is recommended.' }],
      20: [{ name: 'Primal Champion', description: 'Your Strength and Constitution scores increase by 4, to a maximum of 25.' }]
    },
    subclasses: [
      {
        id: 'path-of-the-berserker',
        name: 'Path of the Berserker',
        description: 'Barbarians who walk the Path of the Berserker channel their Rage into untrammeled, violent fury.',
        featuresByLevel: {
          3: [{ name: 'Frenzy', description: 'If you use Reckless Attack while raging, the first target you hit on your turn with a Strength-based attack takes extra damage equal to a number of d6s equal to your Rage Damage bonus, of the same type as the weapon or Unarmed Strike.' }],
          6: [{ name: 'Mindless Rage', description: 'You have Immunity to the Charmed and Frightened conditions while raging. If you\'re Charmed or Frightened when you enter your Rage, the condition ends on you.' }],
          10: [{ name: 'Retaliation', description: 'When you take damage from a creature within 5 feet of you, you can take a Reaction to make one melee attack against it with a weapon or an Unarmed Strike.' }],
          14: [{ name: 'Intimidating Presence', description: 'As a Bonus Action, each creature of your choice in a 30-foot Emanation must succeed on a Wisdom save (DC 8 + Strength modifier + Proficiency Bonus) or be Frightened for 1 minute, repeating the save at the end of each of its turns. Once per Long Rest, or restore the use by expending a use of Rage (no action required).' }]
        }
      }
    ]
  },
  {
    id: 'bard',
    name: 'Bard',
    description: 'An inspiring performer who weaves magic through words, music, and dance to bolster allies and confound foes.',
    hitDie: 8,
    primaryAbility: ['cha'],
    savingThrows: ['dex', 'cha'],
    armorProficiencies: ['Light armor'],
    weaponProficiencies: ['Simple weapons'],
    toolProficiencies: ['Three Musical Instruments of your choice'],
    skillChoices: {
      count: 3,
      options: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival']
    },
    subclassLevel: 3,
    spellcaster: true,
    spellcastingAbility: 'cha',
    spellcasterType: 'full',
    weaponMasteryCount: 0,
    cantripsByLevel: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    preparedSpellsByLevel: [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22],
    startingEquipmentPackages: [
      { id: 'A', label: "Leather Armor, 2 Daggers, Musical Instrument of your choice, Entertainer's Pack, and 19 GP", items: ['Leather Armor', 'Dagger (2)', 'Musical Instrument', "Entertainer's Pack", '19 GP'] },
      { id: 'B', label: '90 GP', items: ['90 GP'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Bardic Inspiration', description: 'As a Bonus Action, give a creature within 60 feet who can see or hear you a Bardic Inspiration die (d6); within the next hour, when it fails a D20 Test, it can roll the die and add it to the d20. Uses equal your Charisma modifier (minimum 1), regained on a Long Rest. The die becomes a d8 at level 5, d10 at level 10, and d12 at level 15.' },
        { name: 'Spellcasting', description: 'You cast Bard spells using Charisma, with a Musical Instrument as a Spellcasting Focus. You know 2 cantrips and prepare 4 level 1+ spells, increasing per the Bard Features table; whenever you gain a Bard level, you can replace one cantrip and one prepared spell.' }
      ],
      2: [
        { name: 'Expertise', description: 'You gain Expertise in two of your skill proficiencies of your choice (Performance and Persuasion recommended).' },
        { name: 'Jack of All Trades', description: 'You can add half your Proficiency Bonus (round down) to any ability check that uses a skill proficiency you lack and that doesn\'t otherwise use your Proficiency Bonus.' }
      ],
      3: [{ name: 'Bard Subclass', description: 'You gain a Bard subclass of your choice, such as the College of Lore.' }],
      4: [ASI],
      5: [{ name: 'Font of Inspiration', description: 'You regain all expended uses of Bardic Inspiration when you finish a Short or Long Rest, and you can expend a spell slot (no action required) to regain one expended use. Your Bardic Inspiration die becomes a d8.' }],
      6: [{ name: 'Subclass Feature', description: 'You gain a feature from your Bard College.' }],
      7: [{ name: 'Countercharm', description: 'If you or a creature within 30 feet of you fails a saving throw against an effect that applies the Charmed or Frightened condition, you can take a Reaction to cause the save to be rerolled with Advantage.' }],
      8: [ASI],
      9: [{ name: 'Expertise', description: 'You gain Expertise in two more of your skill proficiencies of your choice.' }],
      10: [{ name: 'Magical Secrets', description: 'Whenever your Prepared Spells number increases, you can choose the new spells from the Bard, Cleric, Druid, and Wizard spell lists, and they count as Bard spells for you; you can also use those lists when replacing a prepared spell. Your Bardic Inspiration die becomes a d10.' }],
      11: [],
      12: [ASI],
      13: [],
      14: [{ name: 'Subclass Feature', description: 'You gain a feature from your Bard College.' }],
      15: [],
      16: [ASI],
      17: [],
      18: [{ name: 'Superior Inspiration', description: 'When you roll Initiative, you regain expended uses of Bardic Inspiration until you have two if you have fewer than that.' }],
      19: [{ name: 'Epic Boon', description: 'You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Spell Recall is recommended.' }],
      20: [{ name: 'Words of Creation', description: 'You always have Power Word Heal and Power Word Kill prepared. When you cast either spell, you can target a second creature with it if that creature is within 10 feet of the first target.' }]
    },
    subclasses: [
      {
        id: 'college-of-lore',
        name: 'College of Lore',
        description: 'Bards of the College of Lore collect spells and secrets from diverse sources, such as scholarly tomes, mystical rites, and peasant tales.',
        featuresByLevel: {
          3: [
            { name: 'Bonus Proficiencies', description: 'You gain proficiency with three skills of your choice.' },
            { name: 'Cutting Words', description: 'When a creature you can see within 60 feet makes a damage roll or succeeds on an ability check or attack roll, you can take a Reaction to expend a use of Bardic Inspiration, rolling the die and subtracting the result from the creature\'s roll.' }
          ],
          6: [{ name: 'Magical Discoveries', description: 'You learn two spells of your choice from the Cleric, Druid, or Wizard spell lists (each a cantrip or a spell for which you have spell slots). You always have them prepared, and whenever you gain a Bard level you can replace one with another that meets these requirements.' }],
          14: [{ name: 'Peerless Skill', description: 'When you fail an ability check or attack roll, you can expend a use of Bardic Inspiration, roll the die, and add it to the d20, potentially turning the failure into a success. On a failure, the Bardic Inspiration isn\'t expended.' }]
        }
      }
    ]
  },
  {
    id: 'cleric',
    name: 'Cleric',
    description: 'A priestly champion who draws on divine power through prayer and meditation to heal, protect, and smite.',
    hitDie: 8,
    primaryAbility: ['wis'],
    savingThrows: ['wis', 'cha'],
    armorProficiencies: ['Light armor', 'Medium armor', 'Shields'],
    weaponProficiencies: ['Simple weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion']
    },
    subclassLevel: 3,
    spellcaster: true,
    spellcastingAbility: 'wis',
    spellcasterType: 'full',
    weaponMasteryCount: 0,
    cantripsByLevel: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    preparedSpellsByLevel: [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22],
    startingEquipmentPackages: [
      { id: 'A', label: "Chain Shirt, Shield, Mace, Holy Symbol, Priest's Pack, and 7 GP", items: ['Chain Shirt', 'Shield', 'Mace', 'Holy Symbol', "Priest's Pack", '7 GP'] },
      { id: 'B', label: '110 GP', items: ['110 GP'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Spellcasting', description: 'You cast Cleric spells using Wisdom, with a Holy Symbol as a Spellcasting Focus. You know 3 cantrips and prepare 4 level 1+ spells, increasing per the Cleric Features table; you can change your prepared spells after a Long Rest and replace one cantrip when you gain a Cleric level.' },
        { name: 'Divine Order', description: 'Choose a sacred role: Protector (proficiency with Martial weapons and training with Heavy armor) or Thaumaturge (one extra Cleric cantrip, and a bonus equal to your Wisdom modifier, minimum +1, to Intelligence (Arcana or Religion) checks).' }
      ],
      2: [{ name: 'Channel Divinity', description: 'Use Channel Divinity twice (3 at level 6, 4 at level 18), regaining one use on a Short Rest and all on a Long Rest; save DCs equal your spell save DC. Divine Spark: as a Magic action, a creature within 30 feet either regains 1d8 + Wisdom modifier HP or makes a Constitution save, taking that much Necrotic or Radiant damage (half on success); 2d8 at level 7, 3d8 at 13, 4d8 at 18. Turn Undead: as a Magic action, each Undead of your choice within 30 feet must succeed on a Wisdom save or be Frightened and Incapacitated for 1 minute, ending early if it takes damage.' }],
      3: [{ name: 'Cleric Subclass', description: 'You gain a Cleric subclass of your choice, such as the Life Domain.' }],
      4: [ASI],
      5: [{ name: 'Sear Undead', description: 'When you use Turn Undead, roll a number of d8s equal to your Wisdom modifier (minimum 1d8); each Undead that fails its save takes that much Radiant damage, which doesn\'t end the turn effect.' }],
      6: [{ name: 'Subclass Feature', description: 'You gain a feature from your Divine Domain.' }],
      7: [{ name: 'Blessed Strikes', description: 'Choose one: Divine Strike (once on each of your turns when you hit with a weapon attack, deal an extra 1d8 Necrotic or Radiant damage) or Potent Spellcasting (add your Wisdom modifier to the damage of any Cleric cantrip).' }],
      8: [ASI],
      9: [],
      10: [{ name: 'Divine Intervention', description: 'As a Magic action, cast any Cleric spell of level 5 or lower that doesn\'t require a Reaction, without expending a spell slot or needing Material components. Once per Long Rest.' }],
      11: [],
      12: [ASI],
      13: [],
      14: [{ name: 'Improved Blessed Strikes', description: 'Divine Strike damage increases to 2d8; or, with Potent Spellcasting, when you deal damage with a Cleric cantrip you can grant yourself or a creature within 60 feet Temporary Hit Points equal to twice your Wisdom modifier.' }],
      15: [],
      16: [ASI],
      17: [{ name: 'Subclass Feature', description: 'You gain a feature from your Divine Domain.' }],
      18: [],
      19: [{ name: 'Epic Boon', description: 'You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Fate is recommended.' }],
      20: [{ name: 'Greater Divine Intervention', description: 'When you use Divine Intervention, you can choose Wish. If you do so, you can\'t use Divine Intervention again until you finish 2d4 Long Rests.' }]
    },
    subclasses: [
      {
        id: 'life-domain',
        name: 'Life Domain',
        description: 'The Life Domain focuses on the positive energy that sustains all life; its Clerics are masters of healing.',
        featuresByLevel: {
          3: [
            { name: 'Disciple of Life', description: 'When a spell you cast with a spell slot restores Hit Points to a creature, it regains additional Hit Points equal to 2 + the spell slot\'s level.' },
            { name: 'Life Domain Spells', description: 'You always have these spells prepared: level 3 Aid, Bless, Cure Wounds, Lesser Restoration; level 5 Mass Healing Word, Revivify; level 7 Aura of Life, Death Ward; level 9 Greater Restoration, Mass Cure Wounds.' },
            { name: 'Preserve Life', description: 'As a Magic action, expend a use of Channel Divinity to restore Hit Points equal to five times your Cleric level, divided among Bloodied creatures within 30 feet (including you). A creature can\'t be restored above half its Hit Point maximum.' }
          ],
          6: [{ name: 'Blessed Healer', description: 'Immediately after you cast a spell with a spell slot that restores Hit Points to one or more creatures other than yourself, you regain Hit Points equal to 2 + the spell slot\'s level.' }],
          17: [{ name: 'Supreme Healing', description: 'When you would roll dice to restore Hit Points with a spell or Channel Divinity, use the highest number possible for each die instead (e.g., 2d6 restores 12).' }]
        }
      }
    ]
  }
];

// --- Druid, Fighter, Monk, Paladin, Ranger ---
const epicBoon = (rec) => ({ name: 'Epic Boon', description: `You gain an Epic Boon feat or another feat of your choice for which you qualify. ${rec} is recommended.` });
const subFeature = (sub) => ({ name: 'Subclass Feature', description: `You gain a feature from your ${sub}.` });

const CLASSES_B = [
  // ───────────────────────────── DRUID ─────────────────────────────
  {
    id: 'druid',
    name: 'Druid',
    description: 'A priest of nature who wields primal magic and can take on the forms of beasts.',
    hitDie: 8,
    primaryAbility: ['wis'],
    savingThrows: ['int', 'wis'],
    armorProficiencies: ['Light armor', 'Shields'],
    weaponProficiencies: ['Simple weapons'],
    toolProficiencies: ['Herbalism Kit'],
    skillChoices: {
      count: 2,
      options: ['Animal Handling', 'Arcana', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival']
    },
    subclassLevel: 3,
    spellcaster: true,
    spellcastingAbility: 'wis',
    spellcasterType: 'full',
    weaponMasteryCount: 0,
    cantripsByLevel: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    preparedSpellsByLevel: [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22],
    startingEquipmentPackages: [
      { id: 'a', label: 'Option A: Druid gear and 9 GP', items: ['Leather Armor', 'Shield', 'Sickle', 'Druidic Focus (Quarterstaff)', "Explorer's Pack", 'Herbalism Kit', '9 GP'] },
      { id: 'b', label: 'Option B: 50 GP', items: ['50 GP'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Spellcasting', description: 'You cast Druid spells using Wisdom, preparing spells from the Druid list (start with 4 level 1 spells) and knowing 2 cantrips; you can change prepared spells on a Long Rest and use a Druidic Focus.' },
        { name: 'Druidic', description: 'You know Druidic and always have Speak with Animals prepared. Others spot a hidden Druidic message with a DC 15 Intelligence (Investigation) check but can’t decipher it without magic.' },
        { name: 'Primal Order', description: 'Choose a role. Magician: one extra Druid cantrip and a bonus to Intelligence (Arcana or Nature) checks equal to your Wisdom modifier (min +1). Warden: proficiency with Martial weapons and training with Medium armor.' }
      ],
      2: [
        { name: 'Wild Shape', description: 'As a Bonus Action, shape-shift into a known Beast form for hours equal to half your Druid level, gaining Temporary Hit Points equal to your Druid level. Two uses (3 at level 6, 4 at level 17); regain one on a Short Rest and all on a Long Rest. Known forms/max CR: 4 forms CR 1/4 (level 2), 6 forms CR 1/2 (level 4), 8 forms CR 1 with Fly Speed allowed (level 8). You can’t cast spells while shape-shifted.' },
        { name: 'Wild Companion', description: 'As a Magic action, expend a spell slot or a use of Wild Shape to cast Find Familiar without Material components; the familiar is Fey and disappears when you finish a Long Rest.' }
      ],
      3: [{ name: 'Druid Subclass', description: 'You gain a Druid subclass of your choice: Circle of the Land.' }],
      4: [ASI],
      5: [{ name: 'Wild Resurgence', description: 'Once per turn, if you have no Wild Shape uses left, expend a spell slot to regain one use. You can also expend one Wild Shape use to gain a level 1 spell slot, once per Long Rest.' }],
      6: [subFeature('Circle of the Land')],
      7: [{ name: 'Elemental Fury', description: 'Choose Potent Spellcasting (add your Wisdom modifier to damage of Druid cantrips) or Primal Strike (once per turn, a weapon or Wild Shape Beast attack hit deals an extra 1d8 Cold, Fire, Lightning, or Thunder damage).' }],
      8: [ASI],
      9: [],
      10: [subFeature('Circle of the Land')],
      11: [],
      12: [ASI],
      13: [],
      14: [subFeature('Circle of the Land')],
      15: [{ name: 'Improved Elemental Fury', description: 'Potent Spellcasting: Druid cantrips with a range of 10 feet or greater gain +300 feet of range. Primal Strike: the extra damage increases to 2d8.' }],
      16: [ASI],
      17: [],
      18: [{ name: 'Beast Spells', description: 'You can cast spells while in Wild Shape, except spells with a Material component that has a cost or is consumed.' }],
      19: [epicBoon('Boon of Dimensional Travel')],
      20: [{ name: 'Archdruid', description: 'Evergreen Wild Shape: regain one Wild Shape use when you roll Initiative with none left. Nature Magician: once per Long Rest, convert Wild Shape uses into a single spell slot (2 spell levels per use). Longevity: you age only one year for every ten.' }]
    },
    subclasses: [
      {
        id: 'circle-of-the-land',
        name: 'Circle of the Land',
        description: 'Mystics and sages who safeguard ancient knowledge and rites, drawing magic from the land they attune to.',
        featuresByLevel: {
          3: [
            { name: 'Circle of the Land Spells', description: 'On each Long Rest, choose arid, polar, temperate, or tropical land and always have its spells prepared. Arid: Blur, Burning Hands, Fire Bolt (3), Fireball (5), Blight (7), Wall of Stone (9). Polar: Fog Cloud, Hold Person, Ray of Frost (3), Sleet Storm (5), Ice Storm (7), Cone of Cold (9). Temperate: Misty Step, Shocking Grasp, Sleep (3), Lightning Bolt (5), Freedom of Movement (7), Tree Stride (9). Tropical: Acid Splash, Ray of Sickness, Web (3), Stinking Cloud (5), Polymorph (7), Insect Plague (9).' },
            { name: 'Land’s Aid', description: 'As a Magic action, expend a Wild Shape use to target a 10-foot-radius Sphere within 60 feet: chosen creatures make a Constitution save vs. your spell save DC, taking 2d6 Necrotic damage (half on success), and one creature regains 2d6 Hit Points. Increases to 3d6 at level 10 and 4d6 at level 14.' }
          ],
          6: [{ name: 'Natural Recovery', description: 'Once per Long Rest, cast one prepared level 1+ Circle spell without a slot. Also, once per Long Rest when you finish a Short Rest, recover spell slots with a combined level up to half your Druid level (round up), none level 6+.' }],
          10: [{ name: 'Nature’s Ward', description: 'You are immune to the Poisoned condition and have Resistance to a damage type based on your current land: Arid—Fire, Polar—Cold, Temperate—Lightning, Tropical—Poison.' }],
          14: [{ name: 'Nature’s Sanctuary', description: 'As a Magic action, expend a Wild Shape use to create a 15-foot Cube of spectral trees on the ground within 120 feet for 1 minute. You and allies have Half Cover there, and allies gain your Nature’s Ward Resistance. As a Bonus Action, move the Cube up to 60 feet.' }]
        }
      }
    ]
  },

  // ───────────────────────────── FIGHTER ─────────────────────────────
  {
    id: 'fighter',
    name: 'Fighter',
    description: 'A master of martial combat, skilled with a variety of weapons and armor.',
    hitDie: 10,
    primaryAbility: ['str', 'dex'],
    savingThrows: ['str', 'con'],
    armorProficiencies: ['Light armor', 'Medium armor', 'Heavy armor', 'Shields'],
    weaponProficiencies: ['Simple weapons', 'Martial weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Persuasion', 'Perception', 'Survival']
    },
    subclassLevel: 3,
    spellcaster: false,
    weaponMasteryCount: 3,
    startingEquipmentPackages: [
      { id: 'a', label: 'Option A: Heavy melee kit and 4 GP', items: ['Chain Mail', 'Greatsword', 'Flail', 'Javelin (8)', "Dungeoneer's Pack", '4 GP'] },
      { id: 'b', label: 'Option B: Ranged/finesse kit and 11 GP', items: ['Studded Leather Armor', 'Scimitar', 'Shortsword', 'Longbow', 'Arrow (20)', 'Quiver', "Dungeoneer's Pack", '11 GP'] },
      { id: 'c', label: 'Option C: 155 GP', items: ['155 GP'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Fighting Style', description: 'You gain a Fighting Style feat of your choice (Defense is recommended). Whenever you gain a Fighter level, you can replace it with a different Fighting Style feat.' },
        { name: 'Second Wind', description: 'As a Bonus Action, regain Hit Points equal to 1d10 + your Fighter level. Two uses (3 at level 4, 4 at level 10); regain one on a Short Rest and all on a Long Rest.' },
        { name: 'Weapon Mastery', description: 'You can use the mastery properties of three kinds of Simple or Martial weapons (4 at level 4, 5 at level 10, 6 at level 16); change one choice on a Long Rest.' }
      ],
      2: [
        { name: 'Action Surge (one use)', description: 'On your turn, take one additional action, except the Magic action. Once per Short or Long Rest; twice per rest (but once per turn) starting at level 17.' },
        { name: 'Tactical Mind', description: 'When you fail an ability check, expend a Second Wind use to roll 1d10 and add it to the check; if it still fails, the use isn’t expended.' }
      ],
      3: [{ name: 'Fighter Subclass', description: 'You gain a Fighter subclass of your choice: Champion.' }],
      4: [ASI],
      5: [
        { name: 'Extra Attack', description: 'You can attack twice instead of once whenever you take the Attack action on your turn.' },
        { name: 'Tactical Shift', description: 'Whenever you activate Second Wind with a Bonus Action, you can move up to half your Speed without provoking Opportunity Attacks.' }
      ],
      6: [ASI],
      7: [subFeature('Champion')],
      8: [ASI],
      9: [
        { name: 'Indomitable (one use)', description: 'If you fail a saving throw, reroll it with a bonus equal to your Fighter level and use the new roll. Once per Long Rest (twice at level 13, three times at level 17).' },
        { name: 'Tactical Master', description: 'When you attack with a weapon whose mastery property you can use, you can replace that property with Push, Sap, or Slow for that attack.' }
      ],
      10: [subFeature('Champion')],
      11: [{ name: 'Two Extra Attacks', description: 'You can attack three times instead of once whenever you take the Attack action on your turn.' }],
      12: [ASI],
      13: [
        { name: 'Indomitable (two uses)', description: 'You can use Indomitable twice before a Long Rest.' },
        { name: 'Studied Attacks', description: 'If you miss a creature with an attack roll, you have Advantage on your next attack roll against it before the end of your next turn.' }
      ],
      14: [ASI],
      15: [subFeature('Champion')],
      16: [ASI],
      17: [
        { name: 'Action Surge (two uses)', description: 'You can use Action Surge twice before a rest, but only once on a turn.' },
        { name: 'Indomitable (three uses)', description: 'You can use Indomitable three times before a Long Rest.' }
      ],
      18: [subFeature('Champion')],
      19: [epicBoon('Boon of Combat Prowess')],
      20: [{ name: 'Three Extra Attacks', description: 'You can attack four times instead of once whenever you take the Attack action on your turn.' }]
    },
    subclasses: [
      {
        id: 'champion',
        name: 'Champion',
        description: 'A warrior who pursues physical excellence in combat, dealing devastating blows and withstanding peril.',
        featuresByLevel: {
          3: [
            { name: 'Improved Critical', description: 'Your attack rolls with weapons and Unarmed Strikes score a Critical Hit on a roll of 19 or 20.' },
            { name: 'Remarkable Athlete', description: 'You have Advantage on Initiative rolls and Strength (Athletics) checks. Immediately after you score a Critical Hit, you can move up to half your Speed without provoking Opportunity Attacks.' }
          ],
          7: [{ name: 'Additional Fighting Style', description: 'You gain another Fighting Style feat of your choice.' }],
          10: [{ name: 'Heroic Warrior', description: 'During combat, you can give yourself Heroic Inspiration whenever you start your turn without it.' }],
          15: [{ name: 'Superior Critical', description: 'Your attack rolls with weapons and Unarmed Strikes score a Critical Hit on a roll of 18–20.' }],
          18: [{ name: 'Survivor', description: 'Defy Death: Advantage on Death Saving Throws, and a roll of 18–20 counts as a 20. Heroic Rally: at the start of each turn, if Bloodied with at least 1 Hit Point, regain 5 + your Constitution modifier Hit Points.' }]
        }
      }
    ]
  },

  // ───────────────────────────── MONK ─────────────────────────────
  {
    id: 'monk',
    name: 'Monk',
    description: 'A martial artist who channels inner focus into swift unarmed strikes and supernatural feats.',
    hitDie: 8,
    primaryAbility: ['dex', 'wis'],
    savingThrows: ['str', 'dex'],
    armorProficiencies: [],
    weaponProficiencies: ['Simple weapons', 'Martial weapons that have the Light property'],
    toolProficiencies: ['One type of Artisan’s Tools or Musical Instrument of your choice'],
    skillChoices: {
      count: 2,
      options: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth']
    },
    subclassLevel: 3,
    spellcaster: false,
    weaponMasteryCount: 0,
    startingEquipmentPackages: [
      { id: 'a', label: 'Option A: Monk gear and 11 GP', items: ['Spear', 'Dagger (5)', 'Artisan’s Tools or Musical Instrument (chosen for tool proficiency)', "Explorer's Pack", '11 GP'] },
      { id: 'b', label: 'Option B: 50 GP', items: ['50 GP'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Martial Arts', description: 'While unarmed or wielding only Monk weapons (Simple Melee and Light Martial Melee) without armor or Shield: make an Unarmed Strike as a Bonus Action, roll your Martial Arts die (1d6; 1d8 at 5, 1d10 at 11, 1d12 at 17) for damage, and use Dexterity for attack/damage and Grapple/Shove DCs.' },
        { name: 'Unarmored Defense', description: 'While not wearing armor or wielding a Shield, your base AC equals 10 + your Dexterity and Wisdom modifiers.' }
      ],
      2: [
        { name: 'Monk’s Focus', description: 'You have Focus Points equal to your Monk level, regained on a Short or Long Rest; save DC is 8 + Wisdom modifier + Proficiency Bonus. Flurry of Blows (1 FP: two Unarmed Strikes as a Bonus Action), Patient Defense (Disengage as a Bonus Action, or 1 FP for Disengage and Dodge), Step of the Wind (Dash as a Bonus Action, or 1 FP for Disengage and Dash with doubled jump distance).' },
        { name: 'Unarmored Movement', description: 'Your Speed increases by 10 feet while not wearing armor or wielding a Shield (+15 ft. at 6, +20 ft. at 10, +25 ft. at 14, +30 ft. at 18).' },
        { name: 'Uncanny Metabolism', description: 'When you roll Initiative, you can regain all expended Focus Points and regain Hit Points equal to your Monk level + a roll of your Martial Arts die. Once per Long Rest.' }
      ],
      3: [
        { name: 'Deflect Attacks', description: 'When hit by an attack dealing Bludgeoning, Piercing, or Slashing damage, take a Reaction to reduce the damage by 1d10 + Dexterity modifier + Monk level. If reduced to 0, spend 1 FP to redirect: a creature within 5 feet (melee) or 60 feet (ranged) makes a Dexterity save or takes two Martial Arts die rolls + Dexterity modifier damage of the same type.' },
        { name: 'Monk Subclass', description: 'You gain a Monk subclass of your choice: Warrior of the Open Hand.' }
      ],
      4: [
        ASI,
        { name: 'Slow Fall', description: 'Take a Reaction when you fall to reduce falling damage by five times your Monk level.' }
      ],
      5: [
        { name: 'Extra Attack', description: 'You can attack twice instead of once whenever you take the Attack action on your turn.' },
        { name: 'Stunning Strike', description: 'Once per turn when you hit with a Monk weapon or Unarmed Strike, spend 1 FP: the target makes a Constitution save or is Stunned until the start of your next turn; on a success, its Speed is halved and the next attack against it has Advantage.' }
      ],
      6: [
        { name: 'Empowered Strikes', description: 'Your Unarmed Strikes can deal Force damage or their normal damage type.' },
        subFeature('Warrior of the Open Hand')
      ],
      7: [{ name: 'Evasion', description: 'When a Dexterity save lets you take half damage, you take no damage on a success and half on a failure. Doesn’t work while Incapacitated.' }],
      8: [ASI],
      9: [{ name: 'Acrobatic Movement', description: 'While not wearing armor or wielding a Shield, you can move along vertical surfaces and across liquids on your turn without falling.' }],
      10: [
        { name: 'Heightened Focus', description: 'Flurry of Blows makes three Unarmed Strikes for 1 FP; Patient Defense with FP grants Temporary Hit Points equal to two Martial Arts die rolls; Step of the Wind with FP lets you carry a willing Large or smaller creature within 5 feet without provoking Opportunity Attacks.' },
        { name: 'Self-Restoration', description: 'At the end of each of your turns, you can remove Charmed, Frightened, or Poisoned from yourself. Forgoing food and drink doesn’t give you Exhaustion.' }
      ],
      11: [subFeature('Warrior of the Open Hand')],
      12: [ASI],
      13: [{ name: 'Deflect Energy', description: 'You can use Deflect Attacks against attacks of any damage type.' }],
      14: [{ name: 'Disciplined Survivor', description: 'You gain proficiency in all saving throws. When you fail a save, you can spend 1 FP to reroll it and must use the new roll.' }],
      15: [{ name: 'Perfect Focus', description: 'When you roll Initiative and don’t use Uncanny Metabolism, you regain Focus Points until you have 4 if you have 3 or fewer.' }],
      16: [ASI],
      17: [subFeature('Warrior of the Open Hand')],
      18: [{ name: 'Superior Defense', description: 'At the start of your turn, spend 3 FP to gain Resistance to all damage except Force for 1 minute or until Incapacitated.' }],
      19: [epicBoon('Boon of Irresistible Offense')],
      20: [{ name: 'Body and Mind', description: 'Your Dexterity and Wisdom scores increase by 4, to a maximum of 25.' }]
    },
    subclasses: [
      {
        id: 'warrior-of-the-open-hand',
        name: 'Warrior of the Open Hand',
        description: 'Masters of unarmed combat who push and trip foes and manipulate their own energy to protect themselves.',
        featuresByLevel: {
          3: [{ name: 'Open Hand Technique', description: 'When you hit with a Flurry of Blows attack, impose one effect: Addle (no Opportunity Attacks until its next turn starts), Push (Strength save or pushed up to 15 feet), or Topple (Dexterity save or Prone).' }],
          6: [{ name: 'Wholeness of Body', description: 'As a Bonus Action, regain Hit Points equal to a roll of your Martial Arts die + Wisdom modifier (minimum 1). Uses equal to Wisdom modifier (minimum 1) per Long Rest.' }],
          11: [{ name: 'Fleet Step', description: 'When you take a Bonus Action other than Step of the Wind, you can also use Step of the Wind immediately after it.' }],
          17: [{ name: 'Quivering Palm', description: 'When you hit with an Unarmed Strike, spend 4 FP to start vibrations lasting days equal to your Monk level. End them with an action or by forgoing one attack of the Attack action (same plane): the target makes a Constitution save, taking 10d12 Force damage on a failure or half on a success. Only one creature at a time.' }]
        }
      }
    ]
  },

  // ───────────────────────────── PALADIN ─────────────────────────────
  {
    id: 'paladin',
    name: 'Paladin',
    description: 'A holy warrior bound to a sacred oath who channels divine power to heal and smite.',
    hitDie: 10,
    primaryAbility: ['str', 'cha'],
    savingThrows: ['wis', 'cha'],
    armorProficiencies: ['Light armor', 'Medium armor', 'Heavy armor', 'Shields'],
    weaponProficiencies: ['Simple weapons', 'Martial weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion']
    },
    subclassLevel: 3,
    spellcaster: true,
    spellcastingAbility: 'cha',
    spellcasterType: 'half',
    weaponMasteryCount: 2,
    preparedSpellsByLevel: [2, 3, 4, 5, 6, 6, 7, 7, 9, 9, 10, 10, 11, 11, 12, 12, 14, 14, 15, 15],
    startingEquipmentPackages: [
      { id: 'a', label: 'Option A: Paladin gear and 9 GP', items: ['Chain Mail', 'Shield', 'Longsword', 'Javelin (6)', 'Holy Symbol', "Priest's Pack", '9 GP'] },
      { id: 'b', label: 'Option B: 150 GP', items: ['150 GP'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Lay On Hands', description: 'You have a healing pool of five times your Paladin level, replenished on a Long Rest. As a Bonus Action, touch a creature to restore Hit Points from the pool, or spend 5 points to remove the Poisoned condition.' },
        { name: 'Spellcasting', description: 'You cast Paladin spells using Charisma, preparing spells from the Paladin list (start with 2 level 1 spells); replace one prepared spell on a Long Rest. You can use a Holy Symbol as a focus.' },
        { name: 'Weapon Mastery', description: 'You can use the mastery properties of two kinds of weapons with which you have proficiency; change the choices on a Long Rest.' }
      ],
      2: [
        { name: 'Fighting Style', description: 'You gain a Fighting Style feat, or instead choose Blessed Warrior: learn two Cleric cantrips (Guidance and Sacred Flame recommended) that count as Paladin spells using Charisma.' },
        { name: 'Paladin’s Smite', description: 'You always have Divine Smite prepared and can cast it once without a spell slot per Long Rest.' }
      ],
      3: [
        { name: 'Channel Divinity', description: 'Two uses (3 at level 11); regain one on a Short Rest and all on a Long Rest; save DC equals your spell save DC. Divine Sense: as a Bonus Action, for 10 minutes detect Celestials, Fiends, and Undead and consecrated/desecrated places or objects within 60 feet.' },
        { name: 'Paladin Subclass', description: 'You gain a Paladin subclass of your choice: Oath of Devotion.' }
      ],
      4: [ASI],
      5: [
        { name: 'Extra Attack', description: 'You can attack twice instead of once whenever you take the Attack action on your turn.' },
        { name: 'Faithful Steed', description: 'You always have Find Steed prepared and can cast it once without a spell slot per Long Rest.' }
      ],
      6: [{ name: 'Aura of Protection', description: 'You and allies in a 10-foot Emanation gain a bonus to saving throws equal to your Charisma modifier (minimum +1). Inactive while you are Incapacitated; a creature benefits from only one such aura.' }],
      7: [subFeature('Oath of Devotion')],
      8: [ASI],
      9: [{ name: 'Abjure Foes', description: 'As a Magic action, expend a Channel Divinity use to target creatures equal to your Charisma modifier (minimum 1) within 60 feet; each makes a Wisdom save or is Frightened for 1 minute or until it takes damage, and can only move, take an action, or take a Bonus Action on its turns.' }],
      10: [{ name: 'Aura of Courage', description: 'You and allies have Immunity to the Frightened condition while in your Aura of Protection.' }],
      11: [{ name: 'Radiant Strikes', description: 'When you hit with a Melee weapon or Unarmed Strike attack, the target takes an extra 1d8 Radiant damage.' }],
      12: [ASI],
      13: [],
      14: [{ name: 'Restoring Touch', description: 'When you use Lay On Hands, you can also remove Blinded, Charmed, Deafened, Frightened, Paralyzed, or Stunned, spending 5 points from the pool per condition.' }],
      15: [subFeature('Oath of Devotion')],
      16: [ASI],
      17: [],
      18: [{ name: 'Aura Expansion', description: 'Your Aura of Protection is now a 30-foot Emanation.' }],
      19: [epicBoon('Boon of Truesight')],
      20: [subFeature('Oath of Devotion')]
    },
    subclasses: [
      {
        id: 'oath-of-devotion',
        name: 'Oath of Devotion',
        description: 'Paladins bound to the ideals of justice and order, the archetypal knight in shining armor.',
        featuresByLevel: {
          3: [
            { name: 'Oath of Devotion Spells', description: 'You always have these spells prepared: Protection from Evil and Good, Shield of Faith (3); Aid, Zone of Truth (5); Beacon of Hope, Dispel Magic (9); Freedom of Movement, Guardian of Faith (13); Commune, Flame Strike (17).' },
            { name: 'Sacred Weapon', description: 'When you take the Attack action, expend a Channel Divinity use to imbue a held Melee weapon for 10 minutes: add your Charisma modifier (minimum +1) to its attack rolls, it can deal Radiant damage, and it sheds Bright Light 20 feet and Dim Light 20 feet beyond.' }
          ],
          7: [{ name: 'Aura of Devotion', description: 'You and allies have Immunity to the Charmed condition while in your Aura of Protection.' }],
          15: [{ name: 'Smite of Protection', description: 'Whenever you cast Divine Smite, you and allies have Half Cover while in your Aura of Protection until the start of your next turn.' }],
          20: [{ name: 'Holy Nimbus', description: 'As a Bonus Action, empower your aura for 10 minutes: Advantage on saves forced by Fiends or Undead, enemies starting their turn in the aura take Radiant damage equal to your Charisma modifier + Proficiency Bonus, and the aura is filled with sunlight. Once per Long Rest, or restore by expending a level 5 spell slot.' }]
        }
      }
    ]
  },

  // ───────────────────────────── RANGER ─────────────────────────────
  {
    id: 'ranger',
    name: 'Ranger',
    description: 'A wandering warrior who blends martial skill with nature magic to hunt down foes.',
    hitDie: 10,
    primaryAbility: ['dex', 'wis'],
    savingThrows: ['str', 'dex'],
    armorProficiencies: ['Light armor', 'Medium armor', 'Shields'],
    weaponProficiencies: ['Simple weapons', 'Martial weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 3,
      options: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival']
    },
    subclassLevel: 3,
    spellcaster: true,
    spellcastingAbility: 'wis',
    spellcasterType: 'half',
    weaponMasteryCount: 2,
    preparedSpellsByLevel: [2, 3, 4, 5, 6, 6, 7, 7, 9, 9, 10, 10, 11, 11, 12, 12, 14, 14, 15, 15],
    startingEquipmentPackages: [
      { id: 'a', label: 'Option A: Ranger gear and 7 GP', items: ['Studded Leather Armor', 'Scimitar', 'Shortsword', 'Longbow', 'Arrow (20)', 'Quiver', 'Druidic Focus (sprig of mistletoe)', "Explorer's Pack", '7 GP'] },
      { id: 'b', label: 'Option B: 150 GP', items: ['150 GP'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Spellcasting', description: 'You cast Ranger spells using Wisdom, preparing spells from the Ranger list (start with 2 level 1 spells); replace one prepared spell on a Long Rest. You can use a Druidic Focus.' },
        { name: 'Favored Enemy', description: 'You always have Hunter’s Mark prepared and can cast it without a spell slot twice per Long Rest (3 at level 5, 4 at level 9, 5 at level 13, 6 at level 17).' },
        { name: 'Weapon Mastery', description: 'You can use the mastery properties of two kinds of weapons with which you have proficiency; change the choices on a Long Rest.' }
      ],
      2: [
        { name: 'Deft Explorer', description: 'You gain Expertise in one skill proficiency you lack Expertise in, and you learn two languages of your choice.' },
        { name: 'Fighting Style', description: 'You gain a Fighting Style feat, or instead choose Druidic Warrior: learn two Druid cantrips (Guidance and Starry Wisp recommended) that count as Ranger spells using Wisdom.' }
      ],
      3: [{ name: 'Ranger Subclass', description: 'You gain a Ranger subclass of your choice: Hunter.' }],
      4: [ASI],
      5: [{ name: 'Extra Attack', description: 'You can attack twice instead of once whenever you take the Attack action on your turn.' }],
      6: [{ name: 'Roving', description: 'Your Speed increases by 10 feet while not wearing Heavy armor, and you have a Climb Speed and Swim Speed equal to your Speed.' }],
      7: [subFeature('Hunter')],
      8: [ASI],
      9: [{ name: 'Expertise', description: 'Choose two skill proficiencies you lack Expertise in; you gain Expertise in them.' }],
      10: [{ name: 'Tireless', description: 'As a Magic action, gain Temporary Hit Points equal to 1d8 + Wisdom modifier (minimum 1), usable Wisdom modifier times (minimum 1) per Long Rest. Whenever you finish a Short Rest, your Exhaustion level decreases by 1.' }],
      11: [subFeature('Hunter')],
      12: [ASI],
      13: [{ name: 'Relentless Hunter', description: 'Taking damage can’t break your Concentration on Hunter’s Mark.' }],
      14: [{ name: 'Nature’s Veil', description: 'As a Bonus Action, give yourself the Invisible condition until the end of your next turn. Uses equal to Wisdom modifier (minimum 1) per Long Rest.' }],
      15: [subFeature('Hunter')],
      16: [ASI],
      17: [{ name: 'Precise Hunter', description: 'You have Advantage on attack rolls against the creature currently marked by your Hunter’s Mark.' }],
      18: [{ name: 'Feral Senses', description: 'You have Blindsight with a range of 30 feet.' }],
      19: [epicBoon('Boon of Dimensional Travel')],
      20: [{ name: 'Foe Slayer', description: 'The damage die of your Hunter’s Mark is a d10 rather than a d6.' }]
    },
    subclasses: [
      {
        id: 'hunter',
        name: 'Hunter',
        description: 'Rangers who stalk prey in the wilds and elsewhere to protect nature and people from destructive forces.',
        featuresByLevel: {
          3: [
            { name: 'Hunter’s Lore', description: 'While a creature is marked by your Hunter’s Mark, you know whether it has any Immunities, Resistances, or Vulnerabilities, and what they are.' },
            { name: 'Hunter’s Prey', description: 'Choose one (swap on a Short or Long Rest). Colossus Slayer: once per turn, a weapon hit deals an extra 1d8 damage to a creature missing any Hit Points. Horde Breaker: once per turn, make another attack with the same weapon against a different creature within 5 feet of the original target and in range that you haven’t attacked this turn.' }
          ],
          7: [{ name: 'Defensive Tactics', description: 'Choose one (swap on a Short or Long Rest). Escape the Horde: Opportunity Attacks have Disadvantage against you. Multiattack Defense: when a creature hits you, it has Disadvantage on other attack rolls against you this turn.' }],
          11: [{ name: 'Superior Hunter’s Prey', description: 'Once per turn when you damage a creature marked by your Hunter’s Mark, you can also deal the spell’s extra damage to a different creature you can see within 30 feet of the first.' }],
          15: [{ name: 'Superior Hunter’s Defense', description: 'When you take damage, take a Reaction to gain Resistance to that damage and any other damage of the same type until the end of the current turn.' }]
        }
      }
    ]
  }
];

// --- Rogue, Sorcerer, Warlock, Wizard ---
const sub = (s) => ({ name: 'Subclass Feature', description: 'You gain a feature from your ' + s + '.' });

const CLASSES_C = [
  {
    id: 'rogue',
    name: 'Rogue',
    description: 'A dexterous expert who relies on stealth, cunning, and precise Sneak Attacks to exploit a foe’s distraction.',
    hitDie: 8,
    primaryAbility: ['dex'],
    savingThrows: ['dex', 'int'],
    armorProficiencies: ['Light armor'],
    weaponProficiencies: ['Simple weapons', 'Martial weapons that have the Finesse or Light property'],
    toolProficiencies: ["Thieves' Tools"],
    skillChoices: {
      count: 4,
      options: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Persuasion', 'Sleight of Hand', 'Stealth']
    },
    subclassLevel: 3,
    spellcaster: false,
    weaponMasteryCount: 2,
    startingEquipmentPackages: [
      { id: 'rogue-a', label: "Option A: Leather Armor, 2 Daggers, Shortsword, Shortbow, 20 Arrows, Quiver, Thieves' Tools, Burglar's Pack, and 8 GP", items: ['Leather Armor', 'Dagger', 'Dagger', 'Shortsword', 'Shortbow', 'Arrows (20)', 'Quiver', "Thieves' Tools", "Burglar's Pack", '8 GP'] },
      { id: 'rogue-b', label: 'Option B: 100 GP', items: ['100 GP'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Expertise', description: 'You gain Expertise in two of your skill proficiencies of your choice (Sleight of Hand and Stealth recommended). At Rogue level 6, you gain Expertise in two more.' },
        { name: 'Sneak Attack', description: 'Once per turn, deal an extra 1d6 damage (increasing per the Sneak Attack column, to 10d6 at level 19) to one creature you hit with a Finesse or Ranged weapon attack if you have Advantage, or if an ally who isn’t Incapacitated is within 5 feet of the target and you don’t have Disadvantage.' },
        { name: "Thieves' Cant", description: "You know Thieves' Cant and one other language of your choice from the language tables in Character Creation." },
        { name: 'Weapon Mastery', description: 'You can use the mastery properties of two kinds of weapons with which you have proficiency (e.g., Daggers and Shortbows). You can change these choices whenever you finish a Long Rest.' }
      ],
      2: [{ name: 'Cunning Action', description: 'On your turn, you can take the Dash, Disengage, or Hide action as a Bonus Action.' }],
      3: [
        { name: 'Rogue Subclass', description: 'You gain a Rogue subclass of your choice, such as the Thief.' },
        { name: 'Steady Aim', description: 'As a Bonus Action, give yourself Advantage on your next attack roll this turn. You can use this only if you haven’t moved this turn, and afterward your Speed is 0 until the end of the turn.' }
      ],
      4: [ASI],
      5: [
        { name: 'Cunning Strike', description: 'When you deal Sneak Attack damage, you can forgo Sneak Attack dice to add an effect (save DC = 8 + Dex modifier + Proficiency Bonus): Poison (1d6; Con save or Poisoned for 1 minute, repeating the save each turn end; requires a Poisoner’s Kit), Trip (1d6; Large or smaller target makes a Dex save or is Prone), or Withdraw (1d6; move up to half your Speed without provoking Opportunity Attacks).' },
        { name: 'Uncanny Dodge', description: 'When an attacker you can see hits you with an attack roll, you can take a Reaction to halve the attack’s damage against you (round down).' }
      ],
      6: [{ name: 'Expertise', description: 'You gain Expertise in two more of your skill proficiencies of your choice.' }],
      7: [
        { name: 'Evasion', description: 'When subjected to an effect that allows a Dexterity save for half damage, you take no damage on a success and half damage on a failure. Not usable while Incapacitated.' },
        { name: 'Reliable Talent', description: 'Whenever you make an ability check that uses one of your skill or tool proficiencies, you can treat a d20 roll of 9 or lower as a 10.' }
      ],
      8: [ASI],
      9: [sub('Thief subclass')],
      10: [ASI],
      11: [{ name: 'Improved Cunning Strike', description: 'You can use up to two Cunning Strike effects when you deal Sneak Attack damage, paying the die cost for each.' }],
      12: [ASI],
      13: [sub('Thief subclass')],
      14: [{ name: 'Devious Strikes', description: 'New Cunning Strike options: Daze (2d6; Con save or on its next turn it can only move or take an action or a Bonus Action), Knock Out (6d6; Con save or Unconscious for 1 minute or until it takes damage, repeating the save at the end of each of its turns), and Obscure (3d6; Dex save or Blinded until the end of its next turn).' }],
      15: [{ name: 'Slippery Mind', description: 'You gain proficiency in Wisdom and Charisma saving throws.' }],
      16: [ASI],
      17: [sub('Thief subclass')],
      18: [{ name: 'Elusive', description: 'No attack roll can have Advantage against you unless you have the Incapacitated condition.' }],
      19: [{ name: 'Epic Boon', description: 'You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of the Night Spirit is recommended.' }],
      20: [{ name: 'Stroke of Luck', description: 'If you fail a D20 Test, you can turn the roll into a 20. Once used, you can’t use it again until you finish a Short or Long Rest.' }]
    },
    subclasses: [
      {
        id: 'thief',
        name: 'Thief',
        description: 'A mix of burglar, treasure hunter, and explorer who excels at agility, stealth, delving into ruins, and using the magic items found there.',
        featuresByLevel: {
          3: [
            { name: 'Fast Hands', description: 'As a Bonus Action, make a Dexterity (Sleight of Hand) check to pick a lock, disarm a trap with Thieves’ Tools, or pick a pocket; or take the Utilize action, or the Magic action to use a magic item that requires it.' },
            { name: 'Second-Story Work', description: 'You gain a Climb Speed equal to your Speed, and you can determine your jump distance using Dexterity rather than Strength.' }
          ],
          9: [{ name: 'Supreme Sneak', description: 'New Cunning Strike option, Stealth Attack (Cost: 1d6): if you have the Hide action’s Invisible condition, this attack doesn’t end it if you end the turn behind Three-Quarters Cover or Total Cover.' }],
          13: [{ name: 'Use Magic Device', description: 'You can attune to up to four magic items at once. When you use a magic item property that expends charges, roll 1d6; on a 6 you use it without expending charges. You can use any Spell Scroll (Int as spellcasting ability); cantrips and level 1 spells cast reliably, higher levels require a DC 10 + spell level Intelligence (Arcana) check or the scroll disintegrates.' }],
          17: [{ name: 'Thief’s Reflexes', description: 'You can take two turns during the first round of any combat: the first at your normal Initiative and the second at your Initiative minus 10.' }]
        }
      }
    ]
  },
  {
    id: 'sorcerer',
    name: 'Sorcerer',
    description: 'An innate spellcaster whose magic flows from within, fueled by Sorcery Points and shaped with Metamagic.',
    hitDie: 6,
    primaryAbility: ['cha'],
    savingThrows: ['con', 'cha'],
    armorProficiencies: [],
    weaponProficiencies: ['Simple weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion']
    },
    subclassLevel: 3,
    spellcaster: true,
    spellcastingAbility: 'cha',
    spellcasterType: 'full',
    weaponMasteryCount: 0,
    cantripsByLevel: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    preparedSpellsByLevel: [2, 4, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22],
    startingEquipmentPackages: [
      { id: 'sorcerer-a', label: "Option A: Spear, 2 Daggers, Arcane Focus (crystal), Dungeoneer's Pack, and 28 GP", items: ['Spear', 'Dagger', 'Dagger', 'Arcane Focus (crystal)', "Dungeoneer's Pack", '28 GP'] },
      { id: 'sorcerer-b', label: 'Option B: 50 GP', items: ['50 GP'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Spellcasting', description: 'You cast Sorcerer spells using Charisma, with an Arcane Focus as your focus. You know four cantrips (more at levels 4 and 10) and prepare spells per the Prepared Spells column; you can swap one cantrip and one prepared spell whenever you gain a Sorcerer level.' },
        { name: 'Innate Sorcery', description: 'As a Bonus Action, unleash your magic for 1 minute: your Sorcerer spell save DC increases by 1 and you have Advantage on attack rolls of Sorcerer spells you cast. Usable twice per Long Rest.' }
      ],
      2: [
        { name: 'Font of Magic', description: 'You have Sorcery Points equal to the Sorcery Points column (2 at level 2), regained on a Long Rest. Expend a spell slot to gain points equal to its level (no action), or as a Bonus Action create a spell slot (level 1: 2 SP, level 2: 3 SP min. level 3, level 3: 5 SP min. level 5, level 4: 6 SP min. level 7, level 5: 7 SP min. level 9); created slots vanish on a Long Rest.' },
        { name: 'Metamagic', description: 'You gain two Metamagic options, spending Sorcery Points to modify spells; only one option per spell unless noted. You can replace one option whenever you gain a Sorcerer level.' }
      ],
      3: [{ name: 'Sorcerer Subclass', description: 'You gain a Sorcerer subclass of your choice, such as Draconic Sorcery.' }],
      4: [ASI],
      5: [{ name: 'Sorcerous Restoration', description: 'When you finish a Short Rest, regain expended Sorcery Points up to half your Sorcerer level (round down). Once per Long Rest.' }],
      6: [sub('Draconic Sorcery subclass')],
      7: [{ name: 'Sorcery Incarnate', description: 'If you have no uses of Innate Sorcery left, you can activate it by spending 2 Sorcery Points. While Innate Sorcery is active, you can use up to two Metamagic options on each spell you cast.' }],
      8: [ASI],
      9: [],
      10: [{ name: 'Metamagic', description: 'You gain two more Metamagic options.' }],
      11: [],
      12: [ASI],
      13: [],
      14: [sub('Draconic Sorcery subclass')],
      15: [],
      16: [ASI],
      17: [{ name: 'Metamagic', description: 'You gain two more Metamagic options.' }],
      18: [sub('Draconic Sorcery subclass')],
      19: [{ name: 'Epic Boon', description: 'You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Dimensional Travel is recommended.' }],
      20: [{ name: 'Arcane Apotheosis', description: 'While your Innate Sorcery is active, you can use one Metamagic option on each of your turns without spending Sorcery Points on it.' }]
    },
    subclasses: [
      {
        id: 'draconic-sorcery',
        name: 'Draconic Sorcery',
        description: 'Your innate magic comes from the gift of a dragon. Draconic Resilience: Hit Point maximum +3 (and +1 per further Sorcerer level); while not wearing armor, base AC = 10 + Dexterity modifier + Charisma modifier.',
        featuresByLevel: {
          3: [
            { name: 'Draconic Resilience', description: 'Your Hit Point maximum increases by 3, and by 1 whenever you gain another Sorcerer level. While you aren’t wearing armor, your base Armor Class equals 10 + your Dexterity and Charisma modifiers.' },
            { name: 'Draconic Spells', description: 'You always have these spells prepared: level 3 Alter Self, Chromatic Orb, Command, Dragon’s Breath; level 5 Fear, Fly; level 7 Arcane Eye, Charm Monster; level 9 Legend Lore, Summon Dragon.' }
          ],
          6: [{ name: 'Elemental Affinity', description: 'Choose Acid, Cold, Fire, Lightning, or Poison. You have Resistance to that type, and when you cast a spell dealing that type you can add your Charisma modifier to one damage roll of the spell.' }],
          14: [{ name: 'Dragon Wings', description: 'As a Bonus Action, sprout draconic wings for 1 hour (or until dismissed), gaining a Fly Speed of 60 feet. Once per Long Rest, or restore the use by spending 3 Sorcery Points.' }],
          18: [{ name: 'Dragon Companion', description: 'You can cast Summon Dragon without a Material component, and once per Long Rest without a spell slot. When you cast it, you can make it not require Concentration, in which case its duration becomes 1 minute.' }]
        }
      }
    ]
  },
  {
    id: 'warlock',
    name: 'Warlock',
    description: 'An occultist who gains Pact Magic and Eldritch Invocations through a bargain with a mysterious otherworldly patron.',
    hitDie: 8,
    primaryAbility: ['cha'],
    savingThrows: ['wis', 'cha'],
    armorProficiencies: ['Light armor'],
    weaponProficiencies: ['Simple weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: ['Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion']
    },
    subclassLevel: 3,
    spellcaster: true,
    spellcastingAbility: 'cha',
    spellcasterType: 'pact',
    weaponMasteryCount: 0,
    cantripsByLevel: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    preparedSpellsByLevel: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
    invocationsByLevel: [1, 3, 3, 3, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10],
    startingEquipmentPackages: [
      { id: 'warlock-a', label: "Option A: Leather Armor, Sickle, 2 Daggers, Arcane Focus (orb), Book (occult lore), Scholar's Pack, and 15 GP", items: ['Leather Armor', 'Sickle', 'Dagger', 'Dagger', 'Arcane Focus (orb)', 'Book (occult lore)', "Scholar's Pack", '15 GP'] },
      { id: 'warlock-b', label: 'Option B: 100 GP', items: ['100 GP'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Eldritch Invocations', description: 'You gain one Eldritch Invocation of your choice (such as Pact of the Tome), and more as shown in the Invocations column. You must meet prerequisites, and whenever you gain a Warlock level you can replace one invocation (unless it is a prerequisite for another).' },
        { name: 'Pact Magic', description: 'You cast Warlock spells using Charisma, with an Arcane Focus as your focus. You know two cantrips (more at levels 4 and 10); your Pact Magic slots are all of the same level (per the Slot Level column) and are regained on a Short or Long Rest. You can replace one cantrip and one prepared spell whenever you gain a Warlock level.' }
      ],
      2: [{ name: 'Magical Cunning', description: 'Perform a 1-minute esoteric rite to regain expended Pact Magic spell slots, up to half your maximum (round up). Once per Long Rest.' }],
      3: [{ name: 'Warlock Subclass', description: 'You gain a Warlock subclass of your choice, such as the Fiend Patron.' }],
      4: [ASI],
      5: [],
      6: [sub('Fiend Patron subclass')],
      7: [],
      8: [ASI],
      9: [{ name: 'Contact Patron', description: 'You always have Contact Other Plane prepared. Once per Long Rest, you can cast it without a spell slot to contact your patron, automatically succeeding on its saving throw.' }],
      10: [sub('Fiend Patron subclass')],
      11: [{ name: 'Mystic Arcanum (level 6 spell)', description: 'Choose one level 6 Warlock spell as an arcanum; you can cast it once without a spell slot per Long Rest. You gain further arcana at levels 13 (level 7), 15 (level 8), and 17 (level 9), and can replace one arcanum spell whenever you gain a Warlock level.' }],
      12: [ASI],
      13: [{ name: 'Mystic Arcanum (level 7 spell)', description: 'Choose one level 7 Warlock spell as an arcanum, castable once per Long Rest without a spell slot.' }],
      14: [sub('Fiend Patron subclass')],
      15: [{ name: 'Mystic Arcanum (level 8 spell)', description: 'Choose one level 8 Warlock spell as an arcanum, castable once per Long Rest without a spell slot.' }],
      16: [ASI],
      17: [{ name: 'Mystic Arcanum (level 9 spell)', description: 'Choose one level 9 Warlock spell as an arcanum, castable once per Long Rest without a spell slot.' }],
      18: [],
      19: [{ name: 'Epic Boon', description: 'You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Fate is recommended.' }],
      20: [{ name: 'Eldritch Master', description: 'When you use your Magical Cunning feature, you regain all your expended Pact Magic spell slots.' }]
    },
    subclasses: [
      {
        id: 'fiend-patron',
        name: 'Fiend Patron',
        description: 'Your pact draws on the Lower Planes, bargaining with a demon lord, archdevil, or other mighty fiend whose aims are evil.',
        featuresByLevel: {
          3: [
            { name: 'Dark One’s Blessing', description: 'When you reduce an enemy to 0 Hit Points (or someone else does so within 10 feet of you), you gain Temporary Hit Points equal to your Charisma modifier + Warlock level (minimum 1).' },
            { name: 'Fiend Spells', description: 'You always have these spells prepared: level 3 Burning Hands, Command, Scorching Ray, Suggestion; level 5 Fireball, Stinking Cloud; level 7 Fire Shield, Wall of Fire; level 9 Geas, Insect Plague.' }
          ],
          6: [{ name: 'Dark One’s Own Luck', description: 'When you make an ability check or saving throw, you can add 1d10 to the roll, even after seeing it. Usable a number of times equal to your Charisma modifier (minimum once) per Long Rest, no more than once per roll.' }],
          10: [{ name: 'Fiendish Resilience', description: 'Whenever you finish a Short or Long Rest, choose one damage type other than Force; you have Resistance to it until you choose a different one.' }],
          14: [{ name: 'Hurl Through Hell', description: 'Once per turn when you hit a creature with an attack roll, it must succeed on a Charisma save against your spell save DC or vanish through the Lower Planes, taking 8d10 Psychic damage if it isn’t a Fiend and having the Incapacitated condition until the end of your next turn, when it returns. Once per Long Rest, or restore the use by expending a Pact Magic spell slot.' }]
        }
      }
    ]
  },
  {
    id: 'wizard',
    name: 'Wizard',
    description: 'A scholarly student of arcane magic who records spells in a spellbook and prepares them through study.',
    hitDie: 6,
    primaryAbility: ['int'],
    savingThrows: ['int', 'wis'],
    armorProficiencies: [],
    weaponProficiencies: ['Simple weapons'],
    toolProficiencies: [],
    skillChoices: {
      count: 2,
      options: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Nature', 'Religion']
    },
    subclassLevel: 3,
    spellcaster: true,
    spellcastingAbility: 'int',
    spellcasterType: 'full',
    weaponMasteryCount: 0,
    cantripsByLevel: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    preparedSpellsByLevel: [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 18, 19, 21, 22, 23, 24, 25],
    startingEquipmentPackages: [
      { id: 'wizard-a', label: "Option A: 2 Daggers, Arcane Focus (Quarterstaff), Robe, Spellbook, Scholar's Pack, and 5 GP", items: ['Dagger', 'Dagger', 'Arcane Focus (Quarterstaff)', 'Robe', 'Spellbook', "Scholar's Pack", '5 GP'] },
      { id: 'wizard-b', label: 'Option B: 55 GP', items: ['55 GP'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Spellcasting', description: 'You cast Wizard spells using Intelligence, with an Arcane Focus or your spellbook as focus. You know three cantrips (more at levels 4 and 10). Your spellbook starts with six level 1 Wizard spells and gains two Wizard spells each level; you prepare spells from it per the Prepared Spells column and can change them on a Long Rest.' },
        { name: 'Ritual Adept', description: 'You can cast any spell as a Ritual if it has the Ritual tag and is in your spellbook, without having it prepared, but you must read from the book.' },
        { name: 'Arcane Recovery', description: 'When you finish a Short Rest, recover expended spell slots with a combined level up to half your Wizard level (round up), none of level 6 or higher. Once per Long Rest.' }
      ],
      2: [{ name: 'Scholar', description: 'Choose one skill in which you have proficiency among Arcana, History, Investigation, Medicine, Nature, or Religion; you have Expertise in it.' }],
      3: [{ name: 'Wizard Subclass', description: 'You gain a Wizard subclass of your choice, such as the Evoker.' }],
      4: [ASI],
      5: [{ name: 'Memorize Spell', description: 'Whenever you finish a Short Rest, you can replace one of your prepared level 1+ Wizard spells with another level 1+ spell from your spellbook.' }],
      6: [sub('Evoker subclass')],
      7: [],
      8: [ASI],
      9: [],
      10: [sub('Evoker subclass')],
      11: [],
      12: [ASI],
      13: [],
      14: [sub('Evoker subclass')],
      15: [],
      16: [ASI],
      17: [],
      18: [{ name: 'Spell Mastery', description: 'Choose a level 1 and a level 2 spell in your spellbook with a casting time of an action; you always have them prepared and can cast them at their lowest level without a spell slot. You can swap either for an eligible spell of the same level on a Long Rest.' }],
      19: [{ name: 'Epic Boon', description: 'You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Spell Recall is recommended.' }],
      20: [{ name: 'Signature Spells', description: 'Choose two level 3 spells in your spellbook; you always have them prepared and can cast each once at level 3 without a spell slot, regaining this on a Short or Long Rest.' }]
    },
    subclasses: [
      {
        id: 'evoker',
        name: 'Evoker',
        description: 'A Wizard who studies Evocation magic, creating explosive elemental effects.',
        featuresByLevel: {
          3: [
            { name: 'Evocation Savant', description: 'Add two Wizard Evocation spells of level 2 or lower to your spellbook for free, and one more free Evocation spell whenever you gain access to a new level of spell slots.' },
            { name: 'Potent Cantrip', description: 'When you cast a damaging cantrip and miss with the attack roll or the target succeeds on its save, the target takes half the cantrip’s damage (if any) but suffers no additional effect.' }
          ],
          6: [{ name: 'Sculpt Spells', description: 'When you cast an Evocation spell affecting creatures you can see, choose up to 1 + the spell’s level of them; they automatically succeed on their saves and take no damage if they would normally take half on a success.' }],
          10: [{ name: 'Empowered Evocation', description: 'Whenever you cast a Wizard Evocation spell, add your Intelligence modifier to one damage roll of that spell.' }],
          14: [{ name: 'Overchannel', description: 'When you cast a damaging Wizard spell with a level 1–5 slot, you can deal maximum damage on the turn you cast it. The first use per Long Rest is free; each further use before a Long Rest deals 2d12 Necrotic damage per slot level to you (ignoring Resistance and Immunity), increasing by 1d12 per level each subsequent use.' }]
        }
      }
    ]
  }
];

export const SRD_CLASSES = [...CLASSES_A, ...CLASSES_B, ...CLASSES_C];
