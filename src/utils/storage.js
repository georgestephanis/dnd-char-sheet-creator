// LocalStorage & JSON Export/Import Management for D&D Characters

import { SAMPLE_CHARACTERS } from '../data/sampleCharacters';
import { DEFAULT_SRD_VERSION } from '../data/rulesets';

const STORAGE_KEY = 'dnd_characters_v1';
const ACTIVE_CHAR_KEY = 'dnd_active_character_id_v1';

export function generateCharacterId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `char-${crypto.randomUUID()}`;
  }
  return `char-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}

const ARRAY_FIELDS = ['attacks', 'features', 'spells', 'equipment', 'skillProficiencies', 'expertiseSkills', 'savingThrowsProficient'];

// Fill in fields older or hand-edited files may lack, so components can rely on their shape
export function normalizeCharacter(raw) {
  const character = { ...raw };
  // Downstream code compares ids and calls string methods on names
  character.id = (typeof character.id === 'string' || typeof character.id === 'number') && String(character.id)
    ? String(character.id)
    : generateCharacterId();
  character.name = typeof character.name === 'string' ? character.name : String(character.name ?? '');
  for (const field of ARRAY_FIELDS) {
    if (!Array.isArray(character[field])) character[field] = [];
  }
  character.features = character.features.filter(f => f && typeof f === 'object' && typeof f.name === 'string');
  // XP used to be free text; keep it a whole, non-negative number
  // Strip thousands separators and spaces only, so '1.5' or '1e2' aren't misread as 15 / 12
  const xp = Math.trunc(Number(String(character.xp ?? '').replace(/[,\s]/g, '')));
  character.xp = Number.isFinite(xp) ? Math.max(0, xp) : 0;
  // Characters saved before rulesets were versioned use the default (SRD 5.1)
  if (typeof character.srdVersion !== 'string') character.srdVersion = DEFAULT_SRD_VERSION;
  if (!Array.isArray(character.spellSlotsUsed)) character.spellSlotsUsed = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  if (!character.abilityScores || typeof character.abilityScores !== 'object') {
    character.abilityScores = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
  }
  const level = parseInt(character.level, 10);
  character.level = Number.isFinite(level) ? Math.min(20, Math.max(1, level)) : 1;
  return character;
}

export function loadCharacters() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with sample characters
      saveCharacters(SAMPLE_CHARACTERS);
      return SAMPLE_CHARACTERS;
    }
    const parsed = JSON.parse(raw);
    // An empty array is a deliberate empty roster; only seed samples when the key is absent
    if (Array.isArray(parsed)) {
      const entries = parsed.filter(c => c && typeof c === 'object' && !Array.isArray(c));
      const characters = entries.map(normalizeCharacter);
      // Persist ids generated for legacy entries so they stay stable across reloads
      if (entries.some((c, i) => c.id !== characters[i].id || c.name !== characters[i].name)) saveCharacters(characters);
      return characters;
    }
    return SAMPLE_CHARACTERS;
  } catch (err) {
    console.error('Failed to load characters from localStorage:', err);
    return SAMPLE_CHARACTERS;
  }
}

export function saveCharacters(characters) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
  } catch (err) {
    console.error('Failed to save characters to localStorage:', err);
  }
}

export function getActiveCharacterId(characters) {
  try {
    const savedId = localStorage.getItem(ACTIVE_CHAR_KEY);
    if (savedId && characters.some(c => c.id === savedId)) {
      return savedId;
    }
  } catch {
    // ignore
  }
  return characters.length > 0 ? characters[0].id : null;
}

export function setActiveCharacterId(id) {
  try {
    localStorage.setItem(ACTIVE_CHAR_KEY, id);
  } catch {
    // ignore
  }
}

export function saveSingleCharacter(updatedCharacter) {
  const characters = loadCharacters();
  const index = characters.findIndex(c => c.id === updatedCharacter.id);
  if (index >= 0) {
    characters[index] = updatedCharacter;
  } else {
    characters.unshift(updatedCharacter);
  }
  saveCharacters(characters);
  return characters;
}

export function deleteCharacterById(id) {
  const characters = loadCharacters();
  const filtered = characters.filter(c => c.id !== id);
  saveCharacters(filtered);
  return filtered;
}

export function duplicateCharacterById(id) {
  const characters = loadCharacters();
  const target = characters.find(c => c.id === id);
  if (!target) return { updatedList: characters, newCharacterId: null };

  const clone = JSON.parse(JSON.stringify(target));
  clone.id = generateCharacterId();
  clone.name = `${target.name} (Copy)`;
  characters.unshift(clone);
  saveCharacters(characters);
  return { updatedList: characters, newCharacterId: clone.id };
}

export function exportCharacterToJson(character) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(character, null, 2));
  const downloadAnchor = document.createElement('a');
  const safeName = (character.name || 'character').toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `${safeName}-lvl${character.level || 1}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportAllCharactersToJson(characters) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(characters, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `dnd-roster-backup-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importCharactersFromJson(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    const existing = loadCharacters();
    let importedCount = 0;

    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item && typeof item === 'object' && !Array.isArray(item) && item.name) {
          existing.unshift(normalizeCharacter({ ...item, id: generateCharacterId() }));
          importedCount++;
        }
      });
    } else if (data && typeof data === 'object' && data.name) {
      existing.unshift(normalizeCharacter({ ...data, id: generateCharacterId() }));
      importedCount = 1;
    } else {
      throw new Error('Invalid character file format.');
    }

    if (importedCount === 0) {
      throw new Error('No characters found in file.');
    }

    saveCharacters(existing);
    return { success: true, count: importedCount, list: existing };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
