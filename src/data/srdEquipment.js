// SRD 5.1 System Reference Document - Equipment & Weapons (CC-BY-4.0 / OGL)

export const SRD_ARMOR = [
  // Light Armor
  { id: 'padded', name: 'Padded', category: 'Light', ac: 11, dexMod: true, maxDex: null, stealthDisadvantage: true, minStr: 0, weight: 8, cost: '5 gp' },
  { id: 'leather', name: 'Leather Armor', category: 'Light', ac: 11, dexMod: true, maxDex: null, stealthDisadvantage: false, minStr: 0, weight: 10, cost: '10 gp' },
  { id: 'studded-leather', name: 'Studded Leather', category: 'Light', ac: 12, dexMod: true, maxDex: null, stealthDisadvantage: false, minStr: 0, weight: 13, cost: '45 gp' },
  // Medium Armor
  { id: 'hide', name: 'Hide Armor', category: 'Medium', ac: 12, dexMod: true, maxDex: 2, stealthDisadvantage: false, minStr: 0, weight: 12, cost: '10 gp' },
  { id: 'chain-shirt', name: 'Chain Shirt', category: 'Medium', ac: 13, dexMod: true, maxDex: 2, stealthDisadvantage: false, minStr: 0, weight: 20, cost: '50 gp' },
  { id: 'scale-mail', name: 'Scale Mail', category: 'Medium', ac: 14, dexMod: true, maxDex: 2, stealthDisadvantage: true, minStr: 0, weight: 45, cost: '50 gp' },
  { id: 'breastplate', name: 'Breastplate', category: 'Medium', ac: 14, dexMod: true, maxDex: 2, stealthDisadvantage: false, minStr: 0, weight: 20, cost: '400 gp' },
  { id: 'half-plate', name: 'Half Plate', category: 'Medium', ac: 15, dexMod: true, maxDex: 2, stealthDisadvantage: true, minStr: 0, weight: 40, cost: '750 gp' },
  // Heavy Armor
  { id: 'ring-mail', name: 'Ring Mail', category: 'Heavy', ac: 14, dexMod: false, maxDex: 0, stealthDisadvantage: true, minStr: 0, weight: 40, cost: '30 gp' },
  { id: 'chain-mail', name: 'Chain Mail', category: 'Heavy', ac: 16, dexMod: false, maxDex: 0, stealthDisadvantage: true, minStr: 13, weight: 55, cost: '75 gp' },
  { id: 'splint', name: 'Splint Armor', category: 'Heavy', ac: 17, dexMod: false, maxDex: 0, stealthDisadvantage: true, minStr: 15, weight: 60, cost: '200 gp' },
  { id: 'plate', name: 'Plate Armor', category: 'Heavy', ac: 18, dexMod: false, maxDex: 0, stealthDisadvantage: true, minStr: 15, weight: 65, cost: '1,500 gp' },
  // Shield
  { id: 'shield', name: 'Shield', category: 'Shield', acBonus: 2, dexMod: false, stealthDisadvantage: false, weight: 6, cost: '10 gp' }
];

export const SRD_WEAPONS = [
  // Simple Melee
  { id: 'club', name: 'Club', category: 'Simple Melee', damage: '1d4', damageType: 'bludgeoning', properties: ['Light'], weight: 2, cost: '1 sp' },
  { id: 'dagger', name: 'Dagger', category: 'Simple Melee', damage: '1d4', damageType: 'piercing', properties: ['Finesse', 'Light', 'Thrown (20/60)'], weight: 1, cost: '2 gp' },
  { id: 'greatclub', name: 'Greatclub', category: 'Simple Melee', damage: '1d8', damageType: 'bludgeoning', properties: ['Two-handed'], weight: 10, cost: '2 sp' },
  { id: 'handaxe', name: 'Handaxe', category: 'Simple Melee', damage: '1d6', damageType: 'slashing', properties: ['Light', 'Thrown (20/60)'], weight: 2, cost: '5 gp' },
  { id: 'javelin', name: 'Javelin', category: 'Simple Melee', damage: '1d6', damageType: 'piercing', properties: ['Thrown (30/120)'], weight: 2, cost: '5 sp' },
  { id: 'light-hammer', name: 'Light Hammer', category: 'Simple Melee', damage: '1d4', damageType: 'bludgeoning', properties: ['Light', 'Thrown (20/60)'], weight: 2, cost: '2 gp' },
  { id: 'mace', name: 'Mace', category: 'Simple Melee', damage: '1d6', damageType: 'bludgeoning', properties: [], weight: 4, cost: '5 gp' },
  { id: 'quarterstaff', name: 'Quarterstaff', category: 'Simple Melee', damage: '1d6', damageType: 'bludgeoning', properties: ['Versatile (1d8)'], weight: 4, cost: '2 sp' },
  { id: 'sickle', name: 'Sickle', category: 'Simple Melee', damage: '1d4', damageType: 'slashing', properties: ['Light'], weight: 2, cost: '1 gp' },
  { id: 'spear', name: 'Spear', category: 'Simple Melee', damage: '1d6', damageType: 'piercing', properties: ['Thrown (20/60)', 'Versatile (1d8)'], weight: 3, cost: '1 gp' },
  // Simple Ranged
  { id: 'light-crossbow', name: 'Light Crossbow', category: 'Simple Ranged', damage: '1d8', damageType: 'piercing', properties: ['Ammunition (80/320)', 'Loading', 'Two-handed'], weight: 5, cost: '25 gp' },
  { id: 'dart', name: 'Dart', category: 'Simple Ranged', damage: '1d4', damageType: 'piercing', properties: ['Finesse', 'Thrown (20/60)'], weight: 0.25, cost: '5 cp' },
  { id: 'shortbow', name: 'Shortbow', category: 'Simple Ranged', damage: '1d6', damageType: 'piercing', properties: ['Ammunition (80/320)', 'Two-handed'], weight: 2, cost: '25 gp' },
  { id: 'sling', name: 'Sling', category: 'Simple Ranged', damage: '1d4', damageType: 'bludgeoning', properties: ['Ammunition (30/120)'], weight: 0, cost: '1 sp' },
  // Martial Melee
  { id: 'battleaxe', name: 'Battleaxe', category: 'Martial Melee', damage: '1d8', damageType: 'slashing', properties: ['Versatile (1d10)'], weight: 4, cost: '10 gp' },
  { id: 'flail', name: 'Flail', category: 'Martial Melee', damage: '1d8', damageType: 'bludgeoning', properties: [], weight: 2, cost: '10 gp' },
  { id: 'glaive', name: 'Glaive', category: 'Martial Melee', damage: '1d10', damageType: 'slashing', properties: ['Heavy', 'Reach', 'Two-handed'], weight: 6, cost: '20 gp' },
  { id: 'greataxe', name: 'Greataxe', category: 'Martial Melee', damage: '1d12', damageType: 'slashing', properties: ['Heavy', 'Two-handed'], weight: 7, cost: '30 gp' },
  { id: 'greatsword', name: 'Greatsword', category: 'Martial Melee', damage: '2d6', damageType: 'slashing', properties: ['Heavy', 'Two-handed'], weight: 6, cost: '50 gp' },
  { id: 'halberd', name: 'Halberd', category: 'Martial Melee', damage: '1d10', damageType: 'slashing', properties: ['Heavy', 'Reach', 'Two-handed'], weight: 6, cost: '20 gp' },
  { id: 'lance', name: 'Lance', category: 'Martial Melee', damage: '1d12', damageType: 'piercing', properties: ['Reach', 'Special'], weight: 6, cost: '10 gp' },
  { id: 'longsword', name: 'Longsword', category: 'Martial Melee', damage: '1d8', damageType: 'slashing', properties: ['Versatile (1d10)'], weight: 3, cost: '15 gp' },
  { id: 'maul', name: 'Maul', category: 'Martial Melee', damage: '2d6', damageType: 'bludgeoning', properties: ['Heavy', 'Two-handed'], weight: 10, cost: '10 gp' },
  { id: 'morningstar', name: 'Morningstar', category: 'Martial Melee', damage: '1d8', damageType: 'piercing', properties: [], weight: 4, cost: '15 gp' },
  { id: 'pike', name: 'Pike', category: 'Martial Melee', damage: '1d10', damageType: 'piercing', properties: ['Heavy', 'Reach', 'Two-handed'], weight: 18, cost: '5 gp' },
  { id: 'rapier', name: 'Rapier', category: 'Martial Melee', damage: '1d8', damageType: 'piercing', properties: ['Finesse'], weight: 2, cost: '25 gp' },
  { id: 'scimitar', name: 'Scimitar', category: 'Martial Melee', damage: '1d6', damageType: 'slashing', properties: ['Finesse', 'Light'], weight: 3, cost: '25 gp' },
  { id: 'shortsword', name: 'Shortsword', category: 'Martial Melee', damage: '1d6', damageType: 'piercing', properties: ['Finesse', 'Light'], weight: 2, cost: '10 gp' },
  { id: 'trident', name: 'Trident', category: 'Martial Melee', damage: '1d6', damageType: 'piercing', properties: ['Thrown (20/60)', 'Versatile (1d8)'], weight: 4, cost: '5 gp' },
  { id: 'war-pick', name: 'War Pick', category: 'Martial Melee', damage: '1d8', damageType: 'piercing', properties: [], weight: 2, cost: '5 gp' },
  { id: 'warhammer', name: 'Warhammer', category: 'Martial Melee', damage: '1d8', damageType: 'bludgeoning', properties: ['Versatile (1d10)'], weight: 2, cost: '15 gp' },
  { id: 'whip', name: 'Whip', category: 'Martial Melee', damage: '1d4', damageType: 'slashing', properties: ['Finesse', 'Reach'], weight: 3, cost: '2 gp' },
  // Martial Ranged
  { id: 'blowgun', name: 'Blowgun', category: 'Martial Ranged', damage: '1', damageType: 'piercing', properties: ['Ammunition (25/100)', 'Loading'], weight: 1, cost: '10 gp' },
  { id: 'hand-crossbow', name: 'Hand Crossbow', category: 'Martial Ranged', damage: '1d6', damageType: 'piercing', properties: ['Ammunition (30/120)', 'Light', 'Loading'], weight: 3, cost: '75 gp' },
  { id: 'heavy-crossbow', name: 'Heavy Crossbow', category: 'Martial Ranged', damage: '1d10', damageType: 'piercing', properties: ['Ammunition (100/400)', 'Heavy', 'Loading', 'Two-handed'], weight: 18, cost: '50 gp' },
  { id: 'longbow', name: 'Longbow', category: 'Martial Ranged', damage: '1d8', damageType: 'piercing', properties: ['Ammunition (150/600)', 'Heavy', 'Two-handed'], weight: 2, cost: '50 gp' }
];

export const SRD_ADVENTURING_PACKS = [
  {
    id: 'explorers-pack',
    name: "Explorer's Pack",
    cost: '10 gp',
    weight: 59,
    contents: ['Backpack', 'Bedroll', 'Mess kit', 'Tinderbox', 'Torches (10)', 'Rations (10 days)', 'Waterskin', '50 feet of hempen rope']
  },
  {
    id: 'dungeoneers-pack',
    name: "Dungeoneer's Pack",
    cost: '12 gp',
    weight: 61.5,
    contents: ['Backpack', 'Crowbar', 'Hammer', 'Pitons (10)', 'Torches (10)', 'Tinderbox', 'Rations (10 days)', 'Waterskin', '50 feet of hempen rope']
  },
  {
    id: 'burglars-pack',
    name: "Burglar's Pack",
    cost: '16 gp',
    weight: 47.5,
    contents: ['Backpack', 'Bag of 1,000 ball bearings', '10 feet of string', 'A bell', 'Candles (5)', 'Crowbar', 'Hammer', 'Pitons (10)', 'Hooded lantern', 'Oil (2 flasks)', 'Rations (5 days)', 'Tinderbox', 'Waterskin']
  },
  {
    id: 'priests-pack',
    name: "Priest's Pack",
    cost: '19 gp',
    weight: 25,
    contents: ['Backpack', 'Blanket', 'Candles (10)', 'Tinderbox', 'Alms box', 'Blocks of incense (2)', 'Censer', 'Vestments', 'Rations (2 days)', 'Waterskin']
  },
  {
    id: 'scholars-pack',
    name: "Scholar's Pack",
    cost: '40 gp',
    weight: 11,
    contents: ['Backpack', 'Book of lore', 'Bottle of ink', 'Ink pen', 'Parchment (10 sheets)', 'Small bag of sand', 'Small knife']
  }
];
