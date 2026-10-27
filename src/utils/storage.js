// LocalStorage & JSON Export/Import Management for D&D Characters

import { SAMPLE_CHARACTERS } from '../data/sampleCharacters';

const STORAGE_KEY = 'dnd_characters_v1';
const ACTIVE_CHAR_KEY = 'dnd_active_character_id_v1';

export function loadCharacters() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with sample characters
      saveCharacters(SAMPLE_CHARACTERS);
      return SAMPLE_CHARACTERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
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
  if (!target) return characters;

  const clone = JSON.parse(JSON.stringify(target));
  clone.id = `char-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
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
        if (item && item.name) {
          item.id = `char-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
          existing.unshift(item);
          importedCount++;
        }
      });
    } else if (data && data.name) {
      data.id = `char-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      existing.unshift(data);
      importedCount = 1;
    } else {
      throw new Error('Invalid character file format.');
    }

    saveCharacters(existing);
    return { success: true, count: importedCount, list: existing };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
