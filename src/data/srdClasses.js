// SRD 5.1 System Reference Document - Classes & Subclasses (CC-BY-4.0 / OGL)

export const SRD_CLASSES = [
  {
    id: 'barbarian',
    name: 'Barbarian',
    description: 'A fierce warrior of primitive background who can enter a battle rage.',
    hitDie: 12,
    primaryAbility: ['str'],
    savingThrows: ['str', 'con'],
    armorProficiencies: ['Light armor', 'Medium armor', 'Shields'],
    weaponProficiencies: ['Simple weapons', 'Martial weapons'],
    skillChoices: {
      count: 2,
      options: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival']
    },
    subclassLevel: 3,
    spellcaster: false,
    startingEquipmentPackages: [
      { id: 'b1', label: 'A greataxe OR any martial melee weapon', items: ['Greataxe'] },
      { id: 'b2', label: 'Two handaxes OR any simple weapon', items: ['Handaxe', 'Handaxe'] },
      { id: 'b3', label: "An explorer's pack and four javelins", items: ["Explorer's Pack", 'Javelin (4)'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Rage', description: 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. Gain advantage on STR checks/saves, bonus melee damage (+2), resistance to bludgeoning/piercing/slashing.' },
        { name: 'Unarmored Defense', description: 'While not wearing armor, your AC equals 10 + DEX modifier + CON modifier. You can use a shield.' }
      ],
      2: [
        { name: 'Reckless Attack', description: 'Throw aside defense to attack with fierce desperation. Advantage on melee weapon attack rolls using STR, but attack rolls against you have advantage until next turn.' },
        { name: 'Danger Sense', description: 'Advantage on DEX saving throws against effects that you can see, such as traps and spells (while not blinded, deafened, or incapacitated).' }
      ],
      3: [
        { name: 'Primal Path', description: 'Choose a primal path: Path of the Berserker.' }
      ],
      4: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      5: [
        { name: 'Extra Attack', description: 'You can attack twice, instead of once, whenever you take the Attack action on your turn.' },
        { name: 'Fast Movement', description: 'Your speed increases by 10 feet while not wearing heavy armor.' }
      ],
      6: [{ name: 'Path Feature', description: 'Subclass feature improvement.' }],
      7: [{ name: 'Feral Instinct', description: 'Advantage on initiative rolls, and can act even if surprised if you rage.' }],
      8: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      9: [{ name: 'Brutal Critical (1 die)', description: 'Roll one additional weapon damage die when determining critical hit damage.' }],
      10: [{ name: 'Path Feature', description: 'Subclass feature improvement.' }],
      11: [{ name: 'Relentless Rage', description: 'Drop to 0 HP? Make DC 10 CON save to drop to 1 HP instead.' }],
      12: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      13: [{ name: 'Brutal Critical (2 dice)', description: 'Roll two additional weapon damage dice on critical hit.' }],
      14: [{ name: 'Path Feature', description: 'Subclass feature improvement.' }],
      15: [{ name: 'Persistent Rage', description: 'Your rage ends early only if you fall unconscious or choose to end it.' }],
      16: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      17: [{ name: 'Brutal Critical (3 dice)', description: 'Roll three additional weapon damage dice on critical hit.' }],
      18: [{ name: 'Indomitable Might', description: 'If total for a STR check is less than your STR score, use that score instead.' }],
      19: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      20: [{ name: 'Primal Champion', description: 'Your STR and CON scores increase by 4, with maximums of 24.' }]
    },
    subclasses: [
      {
        id: 'path-of-the-berserker',
        name: 'Path of the Berserker',
        description: 'For some barbarians, rage is a means to an end; that end being violence.',
        featuresByLevel: {
          3: [{ name: 'Frenzy', description: 'When raging, you can go into a frenzy. You can make a single melee weapon attack as a bonus action on each of your turns, but suffer 1 level of exhaustion when the rage ends.' }],
          6: [{ name: 'Mindless Rage', description: 'You cannot be charmed or frightened while raging. If you are charmed or frightened when you enter your rage, the effect is suspended.' }],
          10: [{ name: 'Intimidating Presence', description: 'Use your action to frighten someone with your menacing presence (DC 8 + proficiency + CHA mod).' }],
          14: [{ name: 'Retaliation', description: 'When you take damage from a creature within 5 feet of you, you can use your reaction to make a melee weapon attack against that creature.' }]
        }
      }
    ]
  },
  {
    id: 'bard',
    name: 'Bard',
    description: 'An inspiring magician whose power echoes the music of creation.',
    hitDie: 8,
    primaryAbility: ['cha'],
    savingThrows: ['dex', 'cha'],
    armorProficiencies: ['Light armor'],
    weaponProficiencies: ['Simple weapons', 'Hand crossbows', 'Longswords', 'Rapiers', 'Shortswords'],
    toolProficiencies: ['Three musical instruments of your choice'],
    skillChoices: {
      count: 3,
      options: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival']
    },
    subclassLevel: 3,
    spellcaster: true,
    spellcastingAbility: 'cha',
    spellcasterType: 'full',
    featuresByLevel: {
      1: [
        { name: 'Spellcasting', description: 'You have learned to untangle and reshape the fabric of reality through song and speech.' },
        { name: 'Bardic Inspiration (d6)', description: 'Use a bonus action to inspire another creature within 60 ft with a d6 inspiration die. Uses equal CHA modifier per long rest.' }
      ],
      2: [
        { name: 'Jack of All Trades', description: 'Add half your proficiency bonus, rounded down, to any ability check you make that doesn’t already include your proficiency bonus.' },
        { name: 'Song of Rest (d6)', description: 'Use soothing music to help revitalize wounded allies during a short rest (extra 1d6 healing).' }
      ],
      3: [
        { name: 'Bard College', description: 'Choose your bard college: College of Lore.' },
        { name: 'Expertise', description: 'Choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either chosen proficiency.' }
      ],
      4: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      5: [
        { name: 'Bardic Inspiration (d8)', description: 'Inspiration die increases to d8.' },
        { name: 'Font of Inspiration', description: 'Regain all expended uses of Bardic Inspiration when you finish a short or long rest.' }
      ],
      6: [
        { name: 'Countercharm', description: 'Use musical notes or words of power to disrupt mind-influencing effects (advantage on saves against being frightened or charmed).' },
        { name: 'College Feature', description: 'Subclass feature improvement.' }
      ],
      8: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      10: [
        { name: 'Bardic Inspiration (d10)', description: 'Inspiration die increases to d10.' },
        { name: 'Expertise (2 more)', description: 'Choose two more of your skill proficiencies to double proficiency bonus.' },
        { name: 'Magical Secrets', description: 'Choose two spells from any class spell list.' }
      ],
      12: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      14: [
        { name: 'Magical Secrets', description: 'Choose two additional spells from any class.' },
        { name: 'College Feature', description: 'Subclass feature improvement.' }
      ],
      15: [{ name: 'Bardic Inspiration (d12)', description: 'Inspiration die increases to d12.' }],
      16: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      18: [{ name: 'Magical Secrets', description: 'Choose two additional spells from any class.' }],
      19: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      20: [{ name: 'Superior Inspiration', description: 'When you roll initiative and have no uses of Bardic Inspiration left, regain one use.' }]
    },
    subclasses: [
      {
        id: 'college-of-lore',
        name: 'College of Lore',
        description: 'Bards of the College of Lore know something about most everything, collecting bits of knowledge from sources as varied as scholarly tomes and peasant tales.',
        featuresByLevel: {
          3: [
            { name: 'Bonus Proficiencies', description: 'You gain proficiency with three skills of your choice.' },
            { name: 'Cutting Words', description: 'Use your reaction and expend one Bardic Inspiration die to subtract the number rolled from an enemy’s attack roll, ability check, or damage roll.' }
          ],
          6: [{ name: 'Additional Magical Secrets', description: 'You learn two spells of your choice from any class list that are of a level you can cast.' }],
          14: [{ name: 'Peerless Skill', description: 'When you make an ability check, you can roll one Bardic Inspiration die and add the number rolled to your ability check.' }]
        }
      }
    ]
  },
  {
    id: 'cleric',
    name: 'Cleric',
    description: 'A priestly champion who wields divine magic in service of a higher power.',
    hitDie: 8,
    primaryAbility: ['wis'],
    savingThrows: ['wis', 'cha'],
    armorProficiencies: ['Light armor', 'Medium armor', 'Shields'],
    weaponProficiencies: ['Simple weapons'],
    skillChoices: {
      count: 2,
      options: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion']
    },
    subclassLevel: 1,
    spellcaster: true,
    spellcastingAbility: 'wis',
    spellcasterType: 'full',
    featuresByLevel: {
      1: [
        { name: 'Spellcasting', description: 'As a conduit for divine power, you can cast cleric spells.' },
        { name: 'Divine Domain', description: 'Choose a domain related to your deity: Life Domain.' }
      ],
      2: [
        { name: 'Channel Divinity (1/rest)', description: 'Channel divine energy to fuel magical effects: Turn Undead and domain feature.' },
        { name: 'Turn Undead', description: 'As an action, speak a prayer censuring undead. Each undead within 30 ft that can see/hear you must make a WIS saving throw or be turned for 1 minute.' }
      ],
      4: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      5: [{ name: 'Destroy Undead (CR 1/2)', description: 'When an undead fails its save against Turn Undead, it is instantly destroyed if its CR is 1/2 or lower.' }],
      6: [{ name: 'Channel Divinity (2/rest)', description: 'You can use Channel Divinity twice between rests.' }],
      8: [
        { name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' },
        { name: 'Destroy Undead (CR 1)', description: 'Destroys undead with CR 1 or lower.' }
      ],
      10: [{ name: 'Divine Intervention', description: 'Call on your deity to intervene. Roll percentile dice: if you roll equal to or lower than your cleric level, your deity intervenes.' }],
      11: [{ name: 'Destroy Undead (CR 2)', description: 'Destroys undead with CR 2 or lower.' }],
      12: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      14: [{ name: 'Destroy Undead (CR 3)', description: 'Destroys undead with CR 3 or lower.' }],
      16: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      17: [{ name: 'Destroy Undead (CR 4)', description: 'Destroys undead with CR 4 or lower.' }],
      18: [{ name: 'Channel Divinity (3/rest)', description: 'You can use Channel Divinity three times between rests.' }],
      19: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      20: [{ name: 'Divine Intervention Improvement', description: 'Your call for intervention succeeds automatically.' }]
    },
    subclasses: [
      {
        id: 'life-domain',
        name: 'Life Domain',
        description: 'The Life domain focuses on the vibrant positive energy — one of the fundamental forces of the universe — that sustains all life.',
        bonusArmorProficiencies: ['Heavy armor'],
        featuresByLevel: {
          1: [
            { name: 'Bonus Heavy Armor Proficiency', description: 'Gain proficiency with heavy armor.' },
            { name: 'Disciple of Life', description: 'Healing spells are more effective: whenever you use a spell of 1st level or higher to restore hit points, the creature regains additional hit points equal to 2 + the spell’s level.' }
          ],
          2: [
            { name: 'Channel Divinity: Preserve Life', description: 'Restore HP equal to 5 × your cleric level to any number of friendly creatures within 30 ft (cannot bring above half max HP).' }
          ],
          6: [
            { name: 'Blessed Healer', description: 'When you cast a healing spell on another creature, you regain hit points equal to 2 + the spell’s level.' }
          ],
          8: [
            { name: 'Divine Strike', description: 'Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 radiant damage (increases to 2d8 at 14th level).' }
          ],
          17: [
            { name: 'Supreme Healing', description: 'When you would normally roll one or more dice to restore hit points with a spell, you instead use the highest number possible for each die.' }
          ]
        }
      }
    ]
  },
  {
    id: 'druid',
    name: 'Druid',
    description: 'A priest of the Old Faith, wielding the powers of nature and adopting animal forms.',
    hitDie: 8,
    primaryAbility: ['wis'],
    savingThrows: ['int', 'wis'],
    armorProficiencies: ['Light armor', 'Medium armor', 'Shields (non-metal)'],
    weaponProficiencies: ['Clubs', 'Daggers', 'Darts', 'Javelins', 'Maces', 'Quarterstaffs', 'Scimitars', 'Sickles', 'Slings', 'Spears'],
    toolProficiencies: ['Herbalism kit'],
    skillChoices: {
      count: 2,
      options: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival']
    },
    subclassLevel: 2,
    spellcaster: true,
    spellcastingAbility: 'wis',
    spellcasterType: 'full',
    featuresByLevel: {
      1: [
        { name: 'Druidic', description: 'You know Druidic, the secret language of druids.' },
        { name: 'Spellcasting', description: 'Drawing on divine essence of nature itself, you can cast spells.' }
      ],
      2: [
        { name: 'Wild Shape', description: 'Magically assume the shape of a beast that you have seen before (twice per short or long rest).' },
        { name: 'Druid Circle', description: 'Choose your druidic circle: Circle of the Land.' }
      ],
      4: [
        { name: 'Wild Shape Improvement', description: 'Can transform into beasts of CR 1/2 with swim speed.' },
        { name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }
      ],
      8: [
        { name: 'Wild Shape Improvement', description: 'Can transform into beasts of CR 1 with flying speed.' },
        { name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }
      ],
      12: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      16: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      18: [
        { name: 'Timeless Body', description: 'For every 10 years that pass, your body ages only 1 year.' },
        { name: 'Beast Spells', description: 'You can cast many of your druid spells in any shape you assume using Wild Shape.' }
      ],
      19: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      20: [{ name: 'Archdruid', description: 'You can use Wild Shape an unlimited number of times.' }]
    },
    subclasses: [
      {
        id: 'circle-of-the-land',
        name: 'Circle of the Land',
        description: 'Mystics and sages who safeguard ancient knowledge and rites through a vast oral tradition.',
        featuresByLevel: {
          2: [
            { name: 'Bonus Cantrip', description: 'You learn one additional druid cantrip of your choice.' },
            { name: 'Natural Recovery', description: 'During a short rest, recover expended spell slots with combined level up to half your druid level (rounded up).' }
          ],
          6: [{ name: "Land's Stride", description: 'Moving through nonmagical difficult terrain costs no extra movement. Pass through nonmagical plants without being slowed or damaged.' }],
          10: [{ name: "Nature's Ward", description: "You can't be charmed or frightened by elementals or fey, and you are immune to poison and disease." }],
          14: [{ name: "Nature's Sanctuary", description: 'When a beast or plant creature attacks you, that creature must make a WIS saving throw or choose a different target.' }]
        }
      }
    ]
  },
  {
    id: 'fighter',
    name: 'Fighter',
    description: 'A master of martial combat, skilled with a variety of weapons and armor.',
    hitDie: 10,
    primaryAbility: ['str', 'dex'],
    savingThrows: ['str', 'con'],
    armorProficiencies: ['All armor', 'Shields'],
    weaponProficiencies: ['Simple weapons', 'Martial weapons'],
    skillChoices: {
      count: 2,
      options: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival']
    },
    subclassLevel: 3,
    spellcaster: false,
    startingEquipmentPackages: [
      { id: 'f1', label: 'Chain mail OR leather armor, longbow, and 20 arrows', items: ['Chain Mail'] },
      { id: 'f2', label: 'A martial weapon and a shield OR two martial weapons', items: ['Longsword', 'Shield'] },
      { id: 'f3', label: 'A light crossbow and 20 bolts OR two handaxes', items: ['Light Crossbow', 'Crossbow Bolt (20)'] },
      { id: 'f4', label: "A dungeoneer's pack OR an explorer's pack", items: ["Dungeoneer's Pack"] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Fighting Style', description: 'Adopt a particular style of fighting (Archery, Defense, Dueling, Great Weapon Fighting, Protection, Two-Weapon Fighting).' },
        { name: 'Second Wind', description: 'On your turn, use a bonus action to regain hit points equal to 1d10 + your fighter level (once per short or long rest).' }
      ],
      2: [
        { name: 'Action Surge (1 use)', description: 'On your turn, you can take one additional action on top of your regular action and bonus action (once per short or long rest).' }
      ],
      3: [
        { name: 'Martial Archetype', description: 'Choose your archetype: Champion.' }
      ],
      4: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      5: [{ name: 'Extra Attack', description: 'Attack twice whenever you take the Attack action on your turn.' }],
      6: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      7: [{ name: 'Archetype Feature', description: 'Subclass feature improvement.' }],
      8: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      9: [{ name: 'Indomitable (1 use)', description: 'Reroll a saving throw that you fail (must use new roll; once per long rest).' }],
      10: [{ name: 'Archetype Feature', description: 'Subclass feature improvement.' }],
      11: [{ name: 'Extra Attack (2)', description: 'Attack three times whenever you take the Attack action on your turn.' }],
      12: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      13: [{ name: 'Indomitable (2 uses)', description: 'Use Indomitable twice between long rests.' }],
      14: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      15: [{ name: 'Archetype Feature', description: 'Subclass feature improvement.' }],
      16: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      17: [
        { name: 'Action Surge (2 uses)', description: 'Use Action Surge twice between rests.' },
        { name: 'Indomitable (3 uses)', description: 'Use Indomitable three times between long rests.' }
      ],
      18: [{ name: 'Archetype Feature', description: 'Subclass feature improvement.' }],
      19: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      20: [{ name: 'Extra Attack (3)', description: 'Attack four times whenever you take the Attack action on your turn.' }]
    },
    subclasses: [
      {
        id: 'champion',
        name: 'Champion',
        description: 'The archetypal Champion focuses on the development of raw physical power honed to deadly perfection.',
        featuresByLevel: {
          3: [{ name: 'Improved Critical', description: 'Your weapon attacks score a critical hit on a roll of 19 or 20.' }],
          7: [{ name: 'Remarkable Athlete', description: 'Add half your proficiency bonus to any STR, DEX, or CON check that doesn’t already use your proficiency bonus. Running long jump distance increases by STR modifier in feet.' }],
          10: [{ name: 'Additional Fighting Style', description: 'Choose a second Fighting Style option.' }],
          15: [{ name: 'Superior Critical', description: 'Your weapon attacks score a critical hit on a roll of 18–20.' }],
          18: [{ name: 'Survivor', description: 'At the start of each of your turns in combat, regain 5 + CON modifier HP if you have no more than half your hit points left.' }]
        }
      }
    ]
  },
  {
    id: 'monk',
    name: 'Monk',
    description: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.',
    hitDie: 8,
    primaryAbility: ['dex', 'wis'],
    savingThrows: ['str', 'dex'],
    armorProficiencies: [],
    weaponProficiencies: ['Simple weapons', 'Shortswords'],
    skillChoices: {
      count: 2,
      options: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth']
    },
    subclassLevel: 3,
    spellcaster: false,
    featuresByLevel: {
      1: [
        { name: 'Unarmored Defense', description: 'While not wearing armor and not wielding a shield, your AC equals 10 + DEX modifier + WIS modifier.' },
        { name: 'Martial Arts (1d4)', description: 'Use DEX instead of STR for monk weapons/unarmed strikes. Roll d4 for unarmed strikes. Bonus action unarmed strike after attacking.' }
      ],
      2: [
        { name: 'Ki (2 Points)', description: 'Spend Ki points to fuel various features: Flurry of Blows, Patient Defense, Step of the Wind.' },
        { name: 'Unarmored Movement (+10 ft)', description: 'Speed increases by 10 ft while not wearing armor or wielding a shield.' }
      ],
      3: [
        { name: 'Monastic Tradition', description: 'Choose your tradition: Way of the Open Hand.' },
        { name: 'Deflect Missiles', description: 'Use your reaction to deflect or catch the missile when you are hit by a ranged weapon attack.' }
      ],
      4: [
        { name: 'Slow Fall', description: 'Use reaction when you fall to reduce falling damage by 5 × your monk level.' },
        { name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }
      ],
      5: [
        { name: 'Extra Attack', description: 'Attack twice whenever you take the Attack action.' },
        { name: 'Stunning Strike', description: 'Spend 1 Ki point to attempt to stun a target hit by a melee weapon attack (CON save or stunned until end of next turn).' }
      ],
      6: [
        { name: 'Ki-Empowered Strikes', description: 'Unarmed strikes count as magical for overcoming resistance and immunity.' },
        { name: 'Tradition Feature', description: 'Subclass feature improvement.' }
      ],
      7: [
        { name: 'Evasion', description: 'Take no damage on successful DEX save against area effects, and only half damage on failed save.' },
        { name: 'Stillness of Mind', description: 'Use action to end one effect on yourself that is causing you to be charmed or frightened.' }
      ],
      8: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      12: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      14: [{ name: 'Diamond Body', description: 'Gain proficiency in all saving throws. Spend 1 Ki point to reroll a failed saving throw.' }],
      16: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      19: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      20: [{ name: 'Empty Body', description: 'Spend 4 Ki points to become invisible for 1 minute and gain resistance to all damage except force.' }]
    },
    subclasses: [
      {
        id: 'way-of-the-open-hand',
        name: 'Way of the Open Hand',
        description: 'Monks of the Way of the Open Hand are the ultimate masters of martial arts combat, whether armed or unarmed.',
        featuresByLevel: {
          3: [{ name: 'Open Hand Technique', description: 'Whenever you hit a creature with one of the attacks granted by your Flurry of Blows, you can knock it prone, push it up to 15 ft, or prevent it from taking reactions.' }],
          6: [{ name: 'Wholeness of Body', description: 'As an action, regain HP equal to 3 × your monk level (once per long rest).' }],
          11: [{ name: 'Tranquility', description: 'Gain the effect of a Sanctuary spell after finishing a long rest (DC 8 + WIS mod + prof bonus).' }],
          17: [{ name: 'Quivering Palm', description: 'Set up lethal vibrations in someone’s body. When you hit with an unarmed strike, spend 3 Ki points. Later, spend action to force a CON save or drop to 0 HP (or take 10d10 necrotic damage on save).' }]
        }
      }
    ]
  },
  {
    id: 'paladin',
    name: 'Paladin',
    description: 'A holy warrior bound to a sacred oath.',
    hitDie: 10,
    primaryAbility: ['str', 'cha'],
    savingThrows: ['wis', 'cha'],
    armorProficiencies: ['All armor', 'Shields'],
    weaponProficiencies: ['Simple weapons', 'Martial weapons'],
    skillChoices: {
      count: 2,
      options: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion']
    },
    subclassLevel: 3,
    spellcaster: true,
    spellcastingAbility: 'cha',
    spellcasterType: 'half',
    featuresByLevel: {
      1: [
        { name: 'Divine Sense', description: 'Detect presence of any celestial, fiend, or undead within 60 ft (1 + CHA mod uses per long rest).' },
        { name: 'Lay on Hands', description: 'Pool of healing power equal to your paladin level × 5. Touch a creature to restore HP or spend 5 HP to cure disease/poison.' }
      ],
      2: [
        { name: 'Fighting Style', description: 'Adopt Defense, Dueling, Great Weapon Fighting, or Protection.' },
        { name: 'Spellcasting', description: 'Cast prepared paladin spells using Charisma.' },
        { name: 'Divine Smite', description: 'When you hit with a melee weapon attack, expend a spell slot to deal extra radiant damage (2d8 for 1st level, +1d8 per higher level up to 5d8; +1d8 vs undead/fiends).' }
      ],
      3: [
        { name: 'Divine Health', description: 'Immune to disease.' },
        { name: 'Sacred Oath', description: 'Choose your oath: Oath of Devotion.' }
      ],
      4: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      5: [{ name: 'Extra Attack', description: 'Attack twice whenever you take the Attack action.' }],
      6: [{ name: 'Aura of Protection', description: 'Whenever you or a friendly creature within 10 ft makes a saving throw, gain a bonus equal to your CHA modifier (minimum +1).' }],
      8: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      10: [{ name: 'Aura of Courage', description: 'You and friendly creatures within 10 ft cannot be frightened.' }],
      11: [{ name: 'Improved Divine Smite', description: 'All your melee weapon attacks deal an extra 1d8 radiant damage on hit.' }],
      12: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      14: [{ name: 'Cleansing Touch', description: 'Use action to end one spell on yourself or a willing creature (CHA mod times per long rest).' }],
      16: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      19: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }]
    },
    subclasses: [
      {
        id: 'oath-of-devotion',
        name: 'Oath of Devotion',
        description: 'The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order.',
        featuresByLevel: {
          3: [
            { name: 'Channel Divinity: Sacred Weapon', description: 'Add your CHA modifier to attack rolls with one weapon for 1 minute, and it emits bright light.' },
            { name: 'Channel Divinity: Turn the Unholy', description: 'Turn fiends and undead within 30 ft that fail a WIS save.' }
          ],
          7: [{ name: 'Aura of Devotion', description: 'You and friendly creatures within 10 ft cannot be charmed.' }],
          15: [{ name: 'Purity of Spirit', description: 'You are always under the effects of a Protection from Evil and Good spell.' }],
          20: [{ name: 'Holy Nimbus', description: 'As an action, emit aura of sunlight for 1 minute: 10 radiant damage to enemies starting turn in it, advantage on saves against fiend/undead spells.' }]
        }
      }
    ]
  },
  {
    id: 'ranger',
    name: 'Ranger',
    description: 'A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization.',
    hitDie: 10,
    primaryAbility: ['dex', 'wis'],
    savingThrows: ['str', 'dex'],
    armorProficiencies: ['Light armor', 'Medium armor', 'Shields'],
    weaponProficiencies: ['Simple weapons', 'Martial weapons'],
    skillChoices: {
      count: 3,
      options: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival']
    },
    subclassLevel: 3,
    spellcaster: true,
    spellcastingAbility: 'wis',
    spellcasterType: 'half',
    featuresByLevel: {
      1: [
        { name: 'Favored Enemy', description: 'Advantage on Survival checks to track your favored enemies, and Intelligence checks to recall information about them.' },
        { name: 'Natural Explorer', description: 'Difficult terrain doesn’t slow your group, you can’t get lost except by magical means, and remain alert to danger while foraging/navigating.' }
      ],
      2: [
        { name: 'Fighting Style', description: 'Choose Archery, Defense, Dueling, or Two-Weapon Fighting.' },
        { name: 'Spellcasting', description: 'Cast ranger spells using Wisdom.' }
      ],
      3: [{ name: 'Ranger Archetype', description: 'Choose your archetype: Hunter.' }],
      4: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      5: [{ name: 'Extra Attack', description: 'Attack twice whenever you take the Attack action.' }],
      8: [
        { name: 'Land’s Stride', description: 'Moving through nonmagical difficult terrain costs no extra movement.' },
        { name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }
      ],
      10: [{ name: 'Hide in Plain Sight', description: 'Spend 1 minute creating camouflage to gain +10 to Stealth checks.' }],
      12: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      14: [{ name: 'Vanish', description: 'Hide as a bonus action on your turn, and cannot be tracked by nonmagical means.' }],
      16: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      19: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      20: [{ name: 'Foe Slayer', description: 'Once on each of your turns, add your WIS modifier to the attack roll or damage roll of an attack against one of your favored enemies.' }]
    },
    subclasses: [
      {
        id: 'hunter',
        name: 'Hunter',
        description: 'Emulating the Hunter archetype means accepting your place as a bulwark between civilization and the terrors of the wilderness.',
        featuresByLevel: {
          3: [{ name: "Hunter's Prey: Colossus Slayer", description: 'Your tenacity can wear down the most potent foes: deal an extra 1d8 damage once per turn to a weapon hit against an injured target.' }],
          7: [{ name: 'Defensive Tactics: Escape the Horde', description: 'Opportunity attacks against you are made with disadvantage.' }],
          11: [{ name: 'Multiattack: Volley', description: 'Make a ranged attack against any number of creatures within 10 ft of a point you can see within your weapon’s range.' }],
          15: [{ name: 'Superior Hunter’s Defense: Evasion', description: 'Take no damage on successful DEX save against area spells, half on failed save.' }]
        }
      }
    ]
  },
  {
    id: 'rogue',
    name: 'Rogue',
    description: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.',
    hitDie: 8,
    primaryAbility: ['dex'],
    savingThrows: ['dex', 'int'],
    armorProficiencies: ['Light armor'],
    weaponProficiencies: ['Simple weapons', 'Hand crossbows', 'Longswords', 'Rapiers', 'Shortswords'],
    toolProficiencies: ["Thieves' tools"],
    skillChoices: {
      count: 4,
      options: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth']
    },
    subclassLevel: 3,
    spellcaster: false,
    startingEquipmentPackages: [
      { id: 'r1', label: 'A rapier OR a shortsword', items: ['Rapier'] },
      { id: 'r2', label: 'A shortbow and quiver of 20 arrows OR a shortsword', items: ['Shortbow', 'Arrow (20)'] },
      { id: 'r3', label: "A burglar's pack OR a dungeoneer's pack", items: ["Burglar's Pack"] },
      { id: 'r4', label: "Leather armor, two daggers, and thieves' tools", items: ['Leather Armor', 'Dagger (2)', "Thieves' Tools"] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Expertise', description: 'Double proficiency bonus for two of your skill proficiencies, or one skill and thieves’ tools.' },
        { name: 'Sneak Attack (1d6)', description: 'Once per turn, deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the roll (or an ally within 5 ft of target), using a finesse or ranged weapon.' },
        { name: 'Thieves’ Cant', description: 'A secret dialect of signs, symbols, and slang understood only by rogues.' }
      ],
      2: [
        { name: 'Cunning Action', description: 'Take a bonus action on each of your turns in combat to Dash, Disengage, or Hide.' }
      ],
      3: [
        { name: 'Roguish Archetype', description: 'Choose your archetype: Thief.' },
        { name: 'Sneak Attack (2d6)', description: 'Sneak attack increases to 2d6.' }
      ],
      4: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      5: [
        { name: 'Uncanny Dodge', description: 'When an attacker that you can see hits you with an attack, use your reaction to halve the attack’s damage against you.' },
        { name: 'Sneak Attack (3d6)', description: 'Sneak attack increases to 3d6.' }
      ],
      6: [{ name: 'Expertise (2 more)', description: 'Choose two more proficiencies to double proficiency bonus.' }],
      7: [
        { name: 'Evasion', description: 'Take no damage on successful DEX save against area attacks, half on failed save.' },
        { name: 'Sneak Attack (4d6)', description: 'Sneak attack increases to 4d6.' }
      ],
      8: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      9: [
        { name: 'Archetype Feature', description: 'Subclass feature improvement.' },
        { name: 'Sneak Attack (5d6)', description: 'Sneak attack increases to 5d6.' }
      ],
      10: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      11: [
        { name: 'Reliable Talent', description: 'Whenever you make an ability check that lets you add your proficiency bonus, treat a d20 roll of 9 or lower as a 10.' },
        { name: 'Sneak Attack (6d6)', description: 'Sneak attack increases to 6d6.' }
      ],
      12: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      13: [{ name: 'Sneak Attack (7d6)', description: 'Sneak attack increases to 7d6.' }],
      14: [{ name: 'Blindsense', description: 'If you are able to hear, you are aware of the location of any hidden or invisible creature within 10 ft.' }],
      15: [
        { name: 'Slippery Mind', description: 'Gain proficiency in Wisdom saving throws.' },
        { name: 'Sneak Attack (8d6)', description: 'Sneak attack increases to 8d6.' }
      ],
      16: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      17: [{ name: 'Sneak Attack (9d6)', description: 'Sneak attack increases to 9d6.' }],
      18: [{ name: 'Elusive', description: 'No attack roll has advantage against you while you aren’t incapacitated.' }],
      19: [
        { name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' },
        { name: 'Sneak Attack (10d6)', description: 'Sneak attack increases to 10d6.' }
      ],
      20: [{ name: 'Stroke of Luck', description: 'If your attack misses or an ability check fails, treat the d20 roll as a 20 (once per short or long rest).' }]
    },
    subclasses: [
      {
        id: 'thief',
        name: 'Thief',
        description: 'You hone your skills in the larcenous arts: burglary, picking pockets, and sleight of hand.',
        featuresByLevel: {
          3: [
            { name: 'Fast Hands', description: 'Use your Cunning Action bonus action to make a Dexterity (Sleight of Hand) check, use thieves’ tools to disarm a trap/pick a lock, or take the Use an Object action.' },
            { name: 'Second-Story Work', description: 'Climbing no longer costs extra movement. Running jump distance increases by your DEX modifier in feet.' }
          ],
          9: [{ name: 'Supreme Sneak', description: 'Advantage on Dexterity (Stealth) check if you move no more than half your speed on the same turn.' }],
          13: [{ name: 'Use Magic Device', description: 'Ignore all class, race, and level requirements on the use of magic items.' }],
          17: [{ name: 'Thief’s Reflexes', description: 'Take two turns during the first round of any combat.' }]
        }
      }
    ]
  },
  {
    id: 'sorcerer',
    name: 'Sorcerer',
    description: 'A spellcaster who draws on inherent magic from a gift or bloodline.',
    hitDie: 6,
    primaryAbility: ['cha'],
    savingThrows: ['con', 'cha'],
    armorProficiencies: [],
    weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
    skillChoices: {
      count: 2,
      options: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion']
    },
    subclassLevel: 1,
    spellcaster: true,
    spellcastingAbility: 'cha',
    spellcasterType: 'full',
    featuresByLevel: {
      1: [
        { name: 'Spellcasting', description: 'An event in your past, or in the life of a parent or ancestor, left an indelible mark on you, infusing you with arcane magic.' },
        { name: 'Sorcerous Origin', description: 'Choose your origin: Draconic Bloodline.' }
      ],
      2: [
        { name: 'Font of Magic', description: 'Tap into a deep well of magic within yourself: represented by Sorcery Points (equal to your level).' }
      ],
      3: [
        { name: 'Metamagic (2 options)', description: 'Gain the ability to twist spells to suit your needs: choose 2 (Careful Spell, Distant Spell, Empowered Spell, Extended Spell, Heightened Spell, Quickened Spell, Subtle Spell, Twinned Spell).' }
      ],
      4: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      8: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      10: [{ name: 'Metamagic (3rd option)', description: 'Gain a 3rd Metamagic option.' }],
      12: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      16: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      17: [{ name: 'Metamagic (4th option)', description: 'Gain a 4th Metamagic option.' }],
      19: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      20: [{ name: 'Sorcerous Restoration', description: 'Regain 4 expended sorcery points whenever you finish a short rest.' }]
    },
    subclasses: [
      {
        id: 'draconic-bloodline',
        name: 'Draconic Bloodline',
        description: 'Your innate magic comes from draconic magic that was mingled with your blood or that of your ancestors.',
        featuresByLevel: {
          1: [
            { name: 'Dragon Ancestor', description: 'Choose one type of dragon. You can speak, read, and write Draconic and double your proficiency on CHA checks when interacting with dragons.' },
            { name: 'Draconic Resilience', description: 'Your hit point maximum increases by 1 for each sorcerer level. While wearing no armor, your base AC equals 13 + your DEX modifier.' }
          ],
          6: [{ name: 'Elemental Affinity', description: 'Add your CHA modifier to the damage roll of spells that deal your dragon ancestor’s damage type. Spend 1 sorcery point to gain resistance to that type for 1 hour.' }],
          14: [{ name: 'Dragon Wings', description: 'Gain the ability to sprout dragon wings from your back, gaining a flying speed equal to your current walking speed.' }],
          18: [{ name: 'Draconic Presence', description: 'Channel the dread presence of your dragon ancestor: spend 5 sorcery points to exude an aura of awe or fear in a 60-foot radius.' }]
        }
      }
    ]
  },
  {
    id: 'warlock',
    name: 'Warlock',
    description: 'A wielder of magic that is derived from a bargain with an otherworldly entity.',
    hitDie: 8,
    primaryAbility: ['cha'],
    savingThrows: ['wis', 'cha'],
    armorProficiencies: ['Light armor'],
    weaponProficiencies: ['Simple weapons'],
    skillChoices: {
      count: 2,
      options: ['Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion']
    },
    subclassLevel: 1,
    spellcaster: true,
    spellcastingAbility: 'cha',
    spellcasterType: 'pact',
    featuresByLevel: {
      1: [
        { name: 'Otherworldly Patron', description: 'Swear a pact with an otherworldly patron: The Fiend.' },
        { name: 'Pact Magic', description: 'Cast warlock spells that recharge on a short rest. All spell slots are of the highest available level.' }
      ],
      2: [
        { name: 'Eldritch Invocations (2)', description: 'Gain fragments of forbidden knowledge that imbue you with an abiding magical ability.' }
      ],
      3: [
        { name: 'Pact Boon', description: 'Your patron bestows a gift: Pact of the Blade, Pact of the Chain, or Pact of the Tome.' }
      ],
      4: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      5: [{ name: 'Eldritch Invocations (3)', description: 'Gain an additional Eldritch Invocation.' }],
      7: [{ name: 'Eldritch Invocations (4)', description: 'Gain an additional Eldritch Invocation.' }],
      8: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      9: [{ name: 'Eldritch Invocations (5)', description: 'Gain an additional Eldritch Invocation.' }],
      11: [{ name: 'Mystic Arcanum (6th level)', description: 'Choose one 6th-level spell from the warlock list to cast once per long rest without expending a spell slot.' }],
      12: [
        { name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' },
        { name: 'Eldritch Invocations (6)', description: 'Gain an additional Eldritch Invocation.' }
      ],
      13: [{ name: 'Mystic Arcanum (7th level)', description: 'Choose one 7th-level warlock spell to cast once per long rest.' }],
      15: [
        { name: 'Mystic Arcanum (8th level)', description: 'Choose one 8th-level warlock spell to cast once per long rest.' },
        { name: 'Eldritch Invocations (7)', description: 'Gain an additional Eldritch Invocation.' }
      ],
      16: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      17: [{ name: 'Mystic Arcanum (9th level)', description: 'Choose one 9th-level warlock spell to cast once per long rest.' }],
      18: [{ name: 'Eldritch Invocations (8)', description: 'Gain an additional Eldritch Invocation.' }],
      19: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      20: [{ name: 'Eldritch Master', description: 'Spend 1 minute entreating your patron to regain all expended Pact Magic spell slots (once per long rest).' }]
    },
    subclasses: [
      {
        id: 'the-fiend',
        name: 'The Fiend',
        description: 'You have made a pact with a fiend from the lower planes of existence.',
        featuresByLevel: {
          1: [{ name: "Dark One's Blessing", description: 'When you reduce a hostile creature to 0 HP, you gain temporary hit points equal to your CHA modifier + your warlock level (minimum 1).' }],
          6: [{ name: "Dark One's Own Luck", description: 'Call on your fiendish patron to alter fate: add 1d10 to an ability check or saving throw (once per short or long rest).' }],
          10: [{ name: 'Fiendish Resilience', description: 'Choose one damage type when you finish a short or long rest; gain resistance to that damage type until you choose a different one.' }],
          14: [{ name: 'Hurl Through Hell', description: 'When you hit a creature with an attack, banish it instantly through the Lower Planes: it takes 10d10 psychic damage when it returns at the end of your next turn (once per long rest).' }]
        }
      }
    ]
  },
  {
    id: 'wizard',
    name: 'Wizard',
    description: 'A scholarly magic-user capable of manipulating the structures of reality.',
    hitDie: 6,
    primaryAbility: ['int'],
    savingThrows: ['int', 'wis'],
    armorProficiencies: [],
    weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
    skillChoices: {
      count: 2,
      options: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion']
    },
    subclassLevel: 2,
    spellcaster: true,
    spellcastingAbility: 'int',
    spellcasterType: 'full',
    startingEquipmentPackages: [
      { id: 'w1', label: 'A quarterstaff OR a dagger', items: ['Quarterstaff'] },
      { id: 'w2', label: 'A component pouch OR an arcane focus', items: ['Arcane Focus'] },
      { id: 'w3', label: "A scholar's pack OR an explorer's pack", items: ["Scholar's Pack"] },
      { id: 'w4', label: 'A spellbook', items: ['Spellbook'] }
    ],
    featuresByLevel: {
      1: [
        { name: 'Spellcasting', description: 'As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power.' },
        { name: 'Arcane Recovery', description: 'Once per day when you finish a short rest, recover expended spell slots with combined level up to half your wizard level (rounded up, max 5th level).' }
      ],
      2: [
        { name: 'Arcane Tradition', description: 'Choose your arcane tradition: School of Evocation.' }
      ],
      4: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      8: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      12: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      16: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      18: [
        { name: 'Spell Mastery', description: 'Choose a 1st-level and a 2nd-level wizard spell in your spellbook: you can cast them at their lowest level without expending a spell slot.' }
      ],
      19: [{ name: 'Ability Score Improvement', description: 'Increase one ability score by 2, or two scores by 1, or take a feat.' }],
      20: [
        { name: 'Signature Spells', description: 'Choose two 3rd-level wizard spells in your spellbook as signature spells: always have them prepared and cast each once at 3rd level without expending a slot.' }
      ]
    },
    subclasses: [
      {
        id: 'school-of-evocation',
        name: 'School of Evocation',
        description: 'You focus your study on magic that creates powerful elemental effects such as bitter cold, searing flame, and rolling thunder.',
        featuresByLevel: {
          2: [
            { name: 'Evocation Savant', description: 'Gold and time you must spend to copy an evocation spell into your spellbook is halved.' },
            { name: 'Sculpt Spells', description: 'When you cast an evocation spell that affects other creatures you can see, you can choose a number of them equal to 1 + the spell’s level to automatically succeed on their saving throws and take no damage if they would normally take half.' }
          ],
          6: [{ name: 'Potent Cantrip', description: 'Your damaging cantrips affect even creatures that avoid the brunt of the effect: when a creature succeeds on a save against your cantrip, it takes half the cantrip’s damage.' }],
          10: [{ name: 'Empowered Evocation', description: 'Add your INT modifier to one damage roll of any wizard evocation spell you cast.' }],
          14: [{ name: 'Overchannel', description: 'When you cast a wizard spell of 1st through 5th level that deals damage, deal maximum damage instead of rolling (takes necrotic damage if used again before long rest).' }]
        }
      }
    ]
  }
];
