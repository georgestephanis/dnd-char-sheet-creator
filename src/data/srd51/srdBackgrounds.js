// SRD 5.1 System Reference Document - Backgrounds (CC-BY-4.0 / OGL)

export const SRD_BACKGROUNDS = [
  {
    id: 'acolyte',
    name: 'Acolyte',
    description: 'You have spent your life in the service of a temple to a specific god or pantheon of gods.',
    skillProficiencies: ['Insight', 'Religion'],
    languagesCount: 2,
    feature: {
      name: 'Shelter of the Faithful',
      description: 'As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith.'
    },
    equipment: [
      'Holy symbol',
      'Prayer book or prayer wheel',
      '5 sticks of incense',
      'Vestments',
      'Common clothes',
      'Pouch containing 15 gp'
    ],
    gold: 15,
    suggestedCharacteristics: {
      traits: [
        'I idolize a particular hero of my faith, and constantly refer to that person’s deeds and example.',
        'I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.',
        'I see omens in every event and action. The gods try to speak to us, we just need to listen.',
        'Nothing can shake my optimistic attitude.'
      ],
      ideals: [
        'Tradition: The ancient traditions of worship and sacrifice must be preserved. (Lawful)',
        'Charity: I always try to help those in need, no matter what the personal cost. (Good)',
        'Change: We must help bring about the changes the gods are constantly working in the world. (Chaotic)',
        'Power: I hope to one day rise to the top of my faith’s religious hierarchy. (Lawful)'
      ],
      bonds: [
        'I would die to recover an ancient relic of my faith that was lost long ago.',
        'I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.',
        'I owe my life to the priest who took me in when my parents died.',
        'Everything I do is for the common people.'
      ],
      flaws: [
        'I judge others harshly, and myself even more severely.',
        'I put too much trust in those who wield power within my temple’s hierarchy.',
        'My piety sometimes leads me to blindly trust those that profess faith in my god.',
        'I am inflexible in my thinking.'
      ]
    }
  },
  {
    id: 'custom',
    name: 'Custom / Homebrew Background',
    description: 'Create a fully personalized background with custom skills, tool proficiencies, languages, and features.',
    skillProficiencies: [],
    toolProficiencies: [],
    languagesCount: 2,
    isCustom: true,
    feature: {
      name: 'Custom Feature',
      description: 'Define your background feature.'
    },
    equipment: ['Common clothes', 'Pouch containing 15 gp'],
    gold: 15,
    suggestedCharacteristics: {
      traits: [],
      ideals: [],
      bonds: [],
      flaws: []
    }
  }
];
