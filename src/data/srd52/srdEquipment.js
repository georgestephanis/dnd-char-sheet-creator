// SRD 5.2.1 System Reference Document (CC-BY-4.0) — https://www.dndbeyond.com/srd
// Armor, weapons, weapon masteries & packs

export const SRD_ARMOR = [
  // Light Armor (1 Minute to Don or Doff)
  { id: 'padded', name: 'Padded Armor', category: 'Light', ac: 11, dexMod: true, maxDex: null, stealthDisadvantage: true, minStr: 0, weight: 8, cost: '5 gp' },
  { id: 'leather', name: 'Leather Armor', category: 'Light', ac: 11, dexMod: true, maxDex: null, stealthDisadvantage: false, minStr: 0, weight: 10, cost: '10 gp' },
  { id: 'studded-leather', name: 'Studded Leather Armor', category: 'Light', ac: 12, dexMod: true, maxDex: null, stealthDisadvantage: false, minStr: 0, weight: 13, cost: '45 gp' },
  // Medium Armor (5 Minutes to Don and 1 Minute to Doff)
  { id: 'hide', name: 'Hide Armor', category: 'Medium', ac: 12, dexMod: true, maxDex: 2, stealthDisadvantage: false, minStr: 0, weight: 12, cost: '10 gp' },
  { id: 'chain-shirt', name: 'Chain Shirt', category: 'Medium', ac: 13, dexMod: true, maxDex: 2, stealthDisadvantage: false, minStr: 0, weight: 20, cost: '50 gp' },
  { id: 'scale-mail', name: 'Scale Mail', category: 'Medium', ac: 14, dexMod: true, maxDex: 2, stealthDisadvantage: true, minStr: 0, weight: 45, cost: '50 gp' },
  { id: 'breastplate', name: 'Breastplate', category: 'Medium', ac: 14, dexMod: true, maxDex: 2, stealthDisadvantage: false, minStr: 0, weight: 20, cost: '400 gp' },
  { id: 'half-plate', name: 'Half Plate Armor', category: 'Medium', ac: 15, dexMod: true, maxDex: 2, stealthDisadvantage: true, minStr: 0, weight: 40, cost: '750 gp' },
  // Heavy Armor (10 Minutes to Don and 5 Minutes to Doff)
  { id: 'ring-mail', name: 'Ring Mail', category: 'Heavy', ac: 14, dexMod: false, maxDex: 0, stealthDisadvantage: true, minStr: 0, weight: 40, cost: '30 gp' },
  { id: 'chain-mail', name: 'Chain Mail', category: 'Heavy', ac: 16, dexMod: false, maxDex: 0, stealthDisadvantage: true, minStr: 13, weight: 55, cost: '75 gp' },
  { id: 'splint', name: 'Splint Armor', category: 'Heavy', ac: 17, dexMod: false, maxDex: 0, stealthDisadvantage: true, minStr: 15, weight: 60, cost: '200 gp' },
  { id: 'plate', name: 'Plate Armor', category: 'Heavy', ac: 18, dexMod: false, maxDex: 0, stealthDisadvantage: true, minStr: 15, weight: 65, cost: '1,500 gp' },
  // Shield (Utilize Action to Don or Doff)
  { id: 'shield', name: 'Shield', category: 'Shield', acBonus: 2, dexMod: false, stealthDisadvantage: false, weight: 6, cost: '10 gp' }
];

export const SRD_WEAPONS = [
  // Simple Melee
  { id: 'club', name: 'Club', category: 'Simple Melee', damage: '1d4', damageType: 'bludgeoning', properties: ['Light'], mastery: 'slow', weight: 2, cost: '1 sp' },
  { id: 'dagger', name: 'Dagger', category: 'Simple Melee', damage: '1d4', damageType: 'piercing', properties: ['Finesse', 'Light', 'Thrown (20/60)'], mastery: 'nick', weight: 1, cost: '2 gp' },
  { id: 'greatclub', name: 'Greatclub', category: 'Simple Melee', damage: '1d8', damageType: 'bludgeoning', properties: ['Two-Handed'], mastery: 'push', weight: 10, cost: '2 sp' },
  { id: 'handaxe', name: 'Handaxe', category: 'Simple Melee', damage: '1d6', damageType: 'slashing', properties: ['Light', 'Thrown (20/60)'], mastery: 'vex', weight: 2, cost: '5 gp' },
  { id: 'javelin', name: 'Javelin', category: 'Simple Melee', damage: '1d6', damageType: 'piercing', properties: ['Thrown (30/120)'], mastery: 'slow', weight: 2, cost: '5 sp' },
  { id: 'light-hammer', name: 'Light Hammer', category: 'Simple Melee', damage: '1d4', damageType: 'bludgeoning', properties: ['Light', 'Thrown (20/60)'], mastery: 'nick', weight: 2, cost: '2 gp' },
  { id: 'mace', name: 'Mace', category: 'Simple Melee', damage: '1d6', damageType: 'bludgeoning', properties: [], mastery: 'sap', weight: 4, cost: '5 gp' },
  { id: 'quarterstaff', name: 'Quarterstaff', category: 'Simple Melee', damage: '1d6', damageType: 'bludgeoning', properties: ['Versatile (1d8)'], mastery: 'topple', weight: 4, cost: '2 sp' },
  { id: 'sickle', name: 'Sickle', category: 'Simple Melee', damage: '1d4', damageType: 'slashing', properties: ['Light'], mastery: 'nick', weight: 2, cost: '1 gp' },
  { id: 'spear', name: 'Spear', category: 'Simple Melee', damage: '1d6', damageType: 'piercing', properties: ['Thrown (20/60)', 'Versatile (1d8)'], mastery: 'sap', weight: 3, cost: '1 gp' },
  // Simple Ranged
  { id: 'dart', name: 'Dart', category: 'Simple Ranged', damage: '1d4', damageType: 'piercing', properties: ['Finesse', 'Thrown (20/60)'], mastery: 'vex', weight: 0.25, cost: '5 cp' },
  { id: 'light-crossbow', name: 'Light Crossbow', category: 'Simple Ranged', damage: '1d8', damageType: 'piercing', properties: ['Ammunition (80/320; Bolt)', 'Loading', 'Two-Handed'], mastery: 'slow', weight: 5, cost: '25 gp' },
  { id: 'shortbow', name: 'Shortbow', category: 'Simple Ranged', damage: '1d6', damageType: 'piercing', properties: ['Ammunition (80/320; Arrow)', 'Two-Handed'], mastery: 'vex', weight: 2, cost: '25 gp' },
  { id: 'sling', name: 'Sling', category: 'Simple Ranged', damage: '1d4', damageType: 'bludgeoning', properties: ['Ammunition (30/120; Bullet)'], mastery: 'slow', weight: 0, cost: '1 sp' },
  // Martial Melee
  { id: 'battleaxe', name: 'Battleaxe', category: 'Martial Melee', damage: '1d8', damageType: 'slashing', properties: ['Versatile (1d10)'], mastery: 'topple', weight: 4, cost: '10 gp' },
  { id: 'flail', name: 'Flail', category: 'Martial Melee', damage: '1d8', damageType: 'bludgeoning', properties: [], mastery: 'sap', weight: 2, cost: '10 gp' },
  { id: 'glaive', name: 'Glaive', category: 'Martial Melee', damage: '1d10', damageType: 'slashing', properties: ['Heavy', 'Reach', 'Two-Handed'], mastery: 'graze', weight: 6, cost: '20 gp' },
  { id: 'greataxe', name: 'Greataxe', category: 'Martial Melee', damage: '1d12', damageType: 'slashing', properties: ['Heavy', 'Two-Handed'], mastery: 'cleave', weight: 7, cost: '30 gp' },
  { id: 'greatsword', name: 'Greatsword', category: 'Martial Melee', damage: '2d6', damageType: 'slashing', properties: ['Heavy', 'Two-Handed'], mastery: 'graze', weight: 6, cost: '50 gp' },
  { id: 'halberd', name: 'Halberd', category: 'Martial Melee', damage: '1d10', damageType: 'slashing', properties: ['Heavy', 'Reach', 'Two-Handed'], mastery: 'cleave', weight: 6, cost: '20 gp' },
  { id: 'lance', name: 'Lance', category: 'Martial Melee', damage: '1d10', damageType: 'piercing', properties: ['Heavy', 'Reach', 'Two-Handed (unless mounted)'], mastery: 'topple', weight: 6, cost: '10 gp' },
  { id: 'longsword', name: 'Longsword', category: 'Martial Melee', damage: '1d8', damageType: 'slashing', properties: ['Versatile (1d10)'], mastery: 'sap', weight: 3, cost: '15 gp' },
  { id: 'maul', name: 'Maul', category: 'Martial Melee', damage: '2d6', damageType: 'bludgeoning', properties: ['Heavy', 'Two-Handed'], mastery: 'topple', weight: 10, cost: '10 gp' },
  { id: 'morningstar', name: 'Morningstar', category: 'Martial Melee', damage: '1d8', damageType: 'piercing', properties: [], mastery: 'sap', weight: 4, cost: '15 gp' },
  { id: 'pike', name: 'Pike', category: 'Martial Melee', damage: '1d10', damageType: 'piercing', properties: ['Heavy', 'Reach', 'Two-Handed'], mastery: 'push', weight: 18, cost: '5 gp' },
  { id: 'rapier', name: 'Rapier', category: 'Martial Melee', damage: '1d8', damageType: 'piercing', properties: ['Finesse'], mastery: 'vex', weight: 2, cost: '25 gp' },
  { id: 'scimitar', name: 'Scimitar', category: 'Martial Melee', damage: '1d6', damageType: 'slashing', properties: ['Finesse', 'Light'], mastery: 'nick', weight: 3, cost: '25 gp' },
  { id: 'shortsword', name: 'Shortsword', category: 'Martial Melee', damage: '1d6', damageType: 'piercing', properties: ['Finesse', 'Light'], mastery: 'vex', weight: 2, cost: '10 gp' },
  { id: 'trident', name: 'Trident', category: 'Martial Melee', damage: '1d8', damageType: 'piercing', properties: ['Thrown (20/60)', 'Versatile (1d10)'], mastery: 'topple', weight: 4, cost: '5 gp' },
  { id: 'warhammer', name: 'Warhammer', category: 'Martial Melee', damage: '1d8', damageType: 'bludgeoning', properties: ['Versatile (1d10)'], mastery: 'push', weight: 5, cost: '15 gp' },
  { id: 'war-pick', name: 'War Pick', category: 'Martial Melee', damage: '1d8', damageType: 'piercing', properties: ['Versatile (1d10)'], mastery: 'sap', weight: 2, cost: '5 gp' },
  { id: 'whip', name: 'Whip', category: 'Martial Melee', damage: '1d4', damageType: 'slashing', properties: ['Finesse', 'Reach'], mastery: 'slow', weight: 3, cost: '2 gp' },
  // Martial Ranged
  { id: 'blowgun', name: 'Blowgun', category: 'Martial Ranged', damage: '1', damageType: 'piercing', properties: ['Ammunition (25/100; Needle)', 'Loading'], mastery: 'vex', weight: 1, cost: '10 gp' },
  { id: 'hand-crossbow', name: 'Hand Crossbow', category: 'Martial Ranged', damage: '1d6', damageType: 'piercing', properties: ['Ammunition (30/120; Bolt)', 'Light', 'Loading'], mastery: 'vex', weight: 3, cost: '75 gp' },
  { id: 'heavy-crossbow', name: 'Heavy Crossbow', category: 'Martial Ranged', damage: '1d10', damageType: 'piercing', properties: ['Ammunition (100/400; Bolt)', 'Heavy', 'Loading', 'Two-Handed'], mastery: 'push', weight: 18, cost: '50 gp' },
  { id: 'longbow', name: 'Longbow', category: 'Martial Ranged', damage: '1d8', damageType: 'piercing', properties: ['Ammunition (150/600; Arrow)', 'Heavy', 'Two-Handed'], mastery: 'slow', weight: 2, cost: '50 gp' },
  { id: 'musket', name: 'Musket', category: 'Martial Ranged', damage: '1d12', damageType: 'piercing', properties: ['Ammunition (40/120; Bullet)', 'Loading', 'Two-Handed'], mastery: 'slow', weight: 10, cost: '500 gp' },
  { id: 'pistol', name: 'Pistol', category: 'Martial Ranged', damage: '1d10', damageType: 'piercing', properties: ['Ammunition (30/90; Bullet)', 'Loading'], mastery: 'vex', weight: 3, cost: '250 gp' }
];

export const SRD_WEAPON_MASTERIES = [
  { id: 'cleave', name: 'Cleave', description: 'If you hit a creature with a melee attack roll using this weapon, you can make a melee attack roll with the weapon against a second creature within 5 feet of the first that is also within your reach. On a hit, the second creature takes the weapon\'s damage, but don\'t add your ability modifier to that damage unless that modifier is negative. You can make this extra attack only once per turn.' },
  { id: 'graze', name: 'Graze', description: 'If your attack roll with this weapon misses a creature, you can deal damage to that creature equal to the ability modifier you used to make the attack roll. This damage is the same type dealt by the weapon, and the damage can be increased only by increasing the ability modifier.' },
  { id: 'nick', name: 'Nick', description: 'When you make the extra attack of the Light property, you can make it as part of the Attack action instead of as a Bonus Action. You can make this extra attack only once per turn.' },
  { id: 'push', name: 'Push', description: 'If you hit a creature with this weapon, you can push the creature up to 10 feet straight away from yourself if it is Large or smaller.' },
  { id: 'sap', name: 'Sap', description: 'If you hit a creature with this weapon, that creature has Disadvantage on its next attack roll before the start of your next turn.' },
  { id: 'slow', name: 'Slow', description: 'If you hit a creature with this weapon and deal damage to it, you can reduce its Speed by 10 feet until the start of your next turn. If the creature is hit more than once by weapons that have this property, the Speed reduction doesn\'t exceed 10 feet.' },
  { id: 'topple', name: 'Topple', description: 'If you hit a creature with this weapon, you can force the creature to make a Constitution saving throw (DC 8 plus the ability modifier used to make the attack roll and your Proficiency Bonus). On a failed save, the creature has the Prone condition.' },
  { id: 'vex', name: 'Vex', description: 'If you hit a creature with this weapon and deal damage to the creature, you have Advantage on your next attack roll against that creature before the end of your next turn.' }
];

export const SRD_ADVENTURING_PACKS = [
  {
    id: 'burglars-pack',
    name: 'Burglar\'s Pack',
    cost: '16 gp',
    weight: 42,
    contents: ['Backpack', 'Ball Bearings', 'Bell', 'Candles (10)', 'Crowbar', 'Hooded Lantern', 'Oil (7 flasks)', 'Rations (5 days)', 'Rope', 'Tinderbox', 'Waterskin']
  },
  {
    id: 'diplomats-pack',
    name: 'Diplomat\'s Pack',
    cost: '39 gp',
    weight: 39,
    contents: ['Chest', 'Fine Clothes', 'Ink', 'Ink Pens (5)', 'Lamp', 'Map or Scroll Cases (2)', 'Oil (4 flasks)', 'Paper (5 sheets)', 'Parchment (5 sheets)', 'Perfume', 'Tinderbox']
  },
  {
    id: 'dungeoneers-pack',
    name: 'Dungeoneer\'s Pack',
    cost: '12 gp',
    weight: 55,
    contents: ['Backpack', 'Caltrops', 'Crowbar', 'Oil (2 flasks)', 'Rations (10 days)', 'Rope', 'Tinderbox', 'Torches (10)', 'Waterskin']
  },
  {
    id: 'entertainers-pack',
    name: 'Entertainer\'s Pack',
    cost: '40 gp',
    weight: 58.5,
    contents: ['Backpack', 'Bedroll', 'Bell', 'Bullseye Lantern', 'Costumes (3)', 'Mirror', 'Oil (8 flasks)', 'Rations (9 days)', 'Tinderbox', 'Waterskin']
  },
  {
    id: 'explorers-pack',
    name: 'Explorer\'s Pack',
    cost: '10 gp',
    weight: 55,
    contents: ['Backpack', 'Bedroll', 'Oil (2 flasks)', 'Rations (10 days)', 'Rope', 'Tinderbox', 'Torches (10)', 'Waterskin']
  },
  {
    id: 'priests-pack',
    name: 'Priest\'s Pack',
    cost: '33 gp',
    weight: 29,
    contents: ['Backpack', 'Blanket', 'Holy Water', 'Lamp', 'Rations (7 days)', 'Robe', 'Tinderbox']
  },
  {
    id: 'scholars-pack',
    name: 'Scholar\'s Pack',
    cost: '40 gp',
    weight: 22,
    contents: ['Backpack', 'Book', 'Ink', 'Ink Pen', 'Lamp', 'Oil (10 flasks)', 'Parchment (10 sheets)', 'Tinderbox']
  }
];
