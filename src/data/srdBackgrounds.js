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
    id: 'criminal',
    name: 'Criminal / Spy',
    description: 'You are an experienced criminal with a history of breaking the law and surviving on the streets.',
    skillProficiencies: ['Deception', 'Stealth'],
    toolProficiencies: ["One type of gaming set", "Thieves' tools"],
    feature: {
      name: 'Criminal Contact',
      description: 'You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals. You know how to get messages to and from your contact, even over great distances.'
    },
    equipment: [
      'A crowbar',
      'Dark common clothes with a hood',
      'Pouch containing 15 gp'
    ],
    gold: 15,
    suggestedCharacteristics: {
      traits: [
        'I always have a plan for what to do when things go wrong.',
        'I am always calm, no matter the situation. I never raise my voice or let my emotions control me.',
        'The first thing I do in a new place is note the locations of everything valuable — or where such things could be hidden.'
      ],
      ideals: [
        'Honor: I don’t steal from others in the trade. (Lawful)',
        'Freedom: Chains are meant to be broken, as are those who would forge them. (Chaotic)',
        'Greed: I will do whatever it takes to become wealthy. (Evil)'
      ],
      bonds: [
        'I’m trying to pay off an old debt I owe to a generous benefactor.',
        'My ill-gotten gains go to support my family.',
        'Someone I loved died because of a mistake I made. That will never happen again.'
      ],
      flaws: [
        'When I see something valuable, I can’t think about anything but how to steal it.',
        'When faced with a choice between money and my friends, I usually choose the money.',
        'An innocent person is in prison for a crime that I committed. I’m okay with that.'
      ]
    }
  },
  {
    id: 'folk-hero',
    name: 'Folk Hero',
    description: 'You come from a humble social rank, but you are destined for so much more. Already the people of your home regard you as their champion.',
    skillProficiencies: ['Animal Handling', 'Survival'],
    toolProficiencies: ["One type of artisan's tools", "Vehicles (land)"],
    feature: {
      name: 'Rustic Hospitality',
      description: 'Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners.'
    },
    equipment: [
      "Set of artisan's tools",
      'A shovel',
      'An iron pot',
      'Common clothes',
      'Pouch containing 10 gp'
    ],
    gold: 10,
    suggestedCharacteristics: {
      traits: [
        'I judge people by their actions, not their words.',
        'If someone is in trouble, I’m always ready to lend help.',
        'When I set my mind to something, I follow through no matter what gets in my way.'
      ],
      ideals: [
        'Respect: People deserve to be treated with dignity and respect. (Good)',
        'Fairness: No one should get preferential treatment before the law. (Lawful)',
        'Freedom: Tyrants must not be allowed to oppress the people. (Chaotic)'
      ],
      bonds: [
        'I have a family, but I have no idea where they are. One day, I hope to see them again.',
        'I protect those who cannot protect themselves.',
        'A proud noble once gave me a horrible beating, and I will take my revenge on any bully I encounter.'
      ],
      flaws: [
        'The tyrant who rules my land will stop at nothing to see me killed.',
        'I’m convinced of the significance of my destiny, and blind to my shortcomings and the risk of failure.'
      ]
    }
  },
  {
    id: 'noble',
    name: 'Noble',
    description: 'You understand wealth, power, and privilege. You carry a noble title, and your family owns land and wields significant political influence.',
    skillProficiencies: ['History', 'Persuasion'],
    toolProficiencies: ['One type of gaming set'],
    languagesCount: 1,
    feature: {
      name: 'Position of Privilege',
      description: 'Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wherever you are.'
    },
    equipment: [
      'A set of fine clothes',
      'A signet ring',
      'A scroll of pedigree',
      'Purse containing 25 gp'
    ],
    gold: 25,
    suggestedCharacteristics: {
      traits: [
        'My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world.',
        'The common folk love me for my kindness and generosity.',
        'No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.'
      ],
      ideals: [
        'Respect: Respect is due to me because of my position, but all people regardless of station deserve to be treated with dignity. (Good)',
        'Responsibility: It is my duty to respect the authority of those above me, just as those below me must respect mine. (Lawful)',
        'Noble Obligation: It is my duty to protect and care for the people beneath me. (Good)'
      ],
      bonds: [
        'I will face any challenge to win the approval of my family.',
        'My house’s alliance with another noble family must be sustained at all costs.',
        'Nothing is more important than the other members of my family.'
      ],
      flaws: [
        'I secretly believe that everyone is beneath me.',
        'I hide a truly scandalous secret that could ruin my family forever.',
        'I too often hear veiled insults and threats in every word addressed to me, and I’m quick to anger.'
      ]
    }
  },
  {
    id: 'sage',
    name: 'Sage',
    description: 'You spent years learning the lore of the multiverse. You scoured manuscripts, studied scrolls, and listened to the greatest experts.',
    skillProficiencies: ['Arcana', 'History'],
    languagesCount: 2,
    feature: {
      name: 'Researcher',
      description: 'When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it.'
    },
    equipment: [
      'A bottle of black ink',
      'A quill',
      'A small knife',
      'A letter from a dead colleague posing an unanswered question',
      'Common clothes',
      'Pouch containing 10 gp'
    ],
    gold: 10,
    suggestedCharacteristics: {
      traits: [
        'I use polysyllabic words that convey the impression of great erudition.',
        'I’ve read every book in the world’s greatest libraries — or I like to boast that I have.',
        'I’m used to helping out those who aren’t as smart as I am, and I patiently explain anything and everything to others.'
      ],
      ideals: [
        'Knowledge: The path to power and self-improvement is through knowledge. (Neutral)',
        'Beauty: What is beautiful points us beyond itself toward what is true. (Good)',
        'Logic: Emotions must not cloud our logical thinking. (Lawful)'
      ],
      bonds: [
        'It is my duty to protect my students.',
        'I have an ancient text that holds terrible secrets that must not fall into the wrong hands.',
        'I work to preserve a library, university, scriptorium, or monastery.'
      ],
      flaws: [
        'I am easily distracted by the promise of information.',
        'Most people scream and run when they see a demon. I stop and take notes on its anatomy.',
        'I speak without really thinking through my words, invariably insulting others.'
      ]
    }
  },
  {
    id: 'soldier',
    name: 'Soldier',
    description: 'War has been your life for as long as you care to remember. You trained as a youth, studied the use of weapons and armor, and learned basic survival.',
    skillProficiencies: ['Athletics', 'Intimidation'],
    toolProficiencies: ['One type of gaming set', 'Vehicles (land)'],
    feature: {
      name: 'Military Rank',
      description: 'You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority and influence.'
    },
    equipment: [
      'An insignia of rank',
      'A trophy taken from a fallen enemy (dagger, broken blade, or banner)',
      'A set of bone dice or deck of cards',
      'Common clothes',
      'Pouch containing 10 gp'
    ],
    gold: 10,
    suggestedCharacteristics: {
      traits: [
        'I’m always polite and respectful.',
        'I’m haunted by memories of war. I can’t get the images of violence out of my mind.',
        'I’ve lost too many friends, and I’m slow to make new ones.'
      ],
      ideals: [
        'Greater Good: Our lot is to lay down our lives in defense of others. (Good)',
        'Responsibility: I do what I must and obey just authority. (Lawful)',
        'Independence: When people follow orders blindly, they embrace a kind of tyranny. (Chaotic)'
      ],
      bonds: [
        'I would still lay down my life for the people I served with.',
        'Someone saved my life on the battlefield. To this day, I will never leave a friend behind.',
        'My honor is my life.'
      ],
      flaws: [
        'The monstrous enemy we faced in battle still leaves me quivering with fear.',
        'I have little respect for anyone who is not a proven warrior.',
        'I made a terrible mistake in battle that cost many lives — and I would do anything to keep that secret.'
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
