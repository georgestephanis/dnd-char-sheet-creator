// Rulesets: each SRD version's data behind one lookup. A character stores the version it was
// created with (`srdVersion`); characters saved before versioning existed are SRD 5.1.
import { SRD_CLASSES as CLASSES_51 } from './srd51/srdClasses';
import { SRD_RACES as RACES_51 } from './srd51/srdRaces';
import { SRD_BACKGROUNDS as BACKGROUNDS_51 } from './srd51/srdBackgrounds';
import { SRD_SPELLS as SPELLS_51 } from './srd51/srdSpells';
import { SRD_FEATS as FEATS_51 } from './srd51/srdFeats';
import { SRD_ARMOR as ARMOR_51, SRD_WEAPONS as WEAPONS_51, SRD_ADVENTURING_PACKS as PACKS_51 } from './srd51/srdEquipment';

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
    masteries: []
  }
};

export function getRuleset(version) {
  return RULESETS[version] || RULESETS[DEFAULT_SRD_VERSION];
}

export function getCharacterRuleset(character) {
  return getRuleset(character?.srdVersion);
}
