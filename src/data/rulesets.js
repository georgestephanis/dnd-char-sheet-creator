// Rulesets: each SRD version's data behind one lookup. A character stores the version it was
// created with (`srdVersion`); characters saved before versioning existed are SRD 5.1.
import { SRD_CLASSES as CLASSES_51 } from './srd51/srdClasses';
import { SRD_RACES as RACES_51 } from './srd51/srdRaces';
import { SRD_BACKGROUNDS as BACKGROUNDS_51 } from './srd51/srdBackgrounds';
import { SRD_SPELLS as SPELLS_51 } from './srd51/srdSpells';
import { SRD_FEATS as FEATS_51 } from './srd51/srdFeats';
import { SRD_ARMOR as ARMOR_51, SRD_WEAPONS as WEAPONS_51, SRD_ADVENTURING_PACKS as PACKS_51 } from './srd51/srdEquipment';
import { SRD_CLASSES as CLASSES_52 } from './srd52/srdClasses';
import { SRD_RACES as RACES_52 } from './srd52/srdRaces';
import { SRD_BACKGROUNDS as BACKGROUNDS_52 } from './srd52/srdBackgrounds';
import { SRD_SPELLS as SPELLS_52 } from './srd52/srdSpells';
import { SRD_FEATS as FEATS_52 } from './srd52/srdFeats';
import {
  SRD_ARMOR as ARMOR_52, SRD_WEAPONS as WEAPONS_52, SRD_ADVENTURING_PACKS as PACKS_52, SRD_WEAPON_MASTERIES as MASTERIES_52
} from './srd52/srdEquipment';

export const DEFAULT_SRD_VERSION = '5.1';

export const RULESETS = {
  '5.1': {
    version: '5.1',
    label: 'SRD 5.1',
    playersHandbook: "2014 Player's Handbook",
    summary: 'Classic 5th edition rules: racial ability score bonuses and subraces.',
    sourceUrl: 'https://www.dndbeyond.com/srd',
    attribution:
      'This work includes material taken from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode.',
    classes: CLASSES_51,
    races: RACES_51,
    backgrounds: BACKGROUNDS_51,
    spells: SPELLS_51,
    feats: FEATS_51,
    armor: ARMOR_51,
    weapons: WEAPONS_51,
    packs: PACKS_51,
    masteries: [],
    // Ability score increases come from the species (racial bonuses)
    abilityBonusSource: 'species',
    halfCasterType: 'half'
  },
  '5.2': {
    version: '5.2',
    label: 'SRD 5.2.1',
    playersHandbook: "2024 Player's Handbook",
    summary: 'Revised 5th edition rules: backgrounds grant ability increases and an Origin feat, species have no ability bonuses, and weapons have masteries.',
    sourceUrl: 'https://www.dndbeyond.com/srd',
    attribution:
      'This work includes material from the System Reference Document 5.2.1 (“SRD 5.2.1”) by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.',
    classes: CLASSES_52,
    races: RACES_52,
    backgrounds: BACKGROUNDS_52,
    spells: SPELLS_52,
    feats: FEATS_52,
    armor: ARMOR_52,
    weapons: WEAPONS_52,
    packs: PACKS_52,
    masteries: MASTERIES_52,
    // Ability score increases come from the background (+2/+1 or +1/+1/+1)
    abilityBonusSource: 'background',
    // Paladins and Rangers get spell slots from level 1
    halfCasterType: 'half-5.2'
  }
};

export const RULESET_LIST = Object.values(RULESETS);

export function getRuleset(version) {
  return RULESETS[version] || RULESETS[DEFAULT_SRD_VERSION];
}

export function getCharacterRuleset(character) {
  return getRuleset(character?.srdVersion);
}
