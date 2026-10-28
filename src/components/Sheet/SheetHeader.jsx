import React, { useState } from 'react';
import { getRuleset } from '../../data/rulesets';
import { ALIGNMENTS, formatXp } from '../../utils/dndRules';

export default function SheetHeader({ character, onUpdateCharacter }) {
  const [isEditingXp, setIsEditingXp] = useState(false);
  if (!character) return null;

  return (
    <div className="sheet-header-box">
      {/* Left: Character Name */}
      <div className="char-name-block">
        <input aria-label="Character name"
          type="text"
          className="char-name-input"
          value={character.name || ''}
          placeholder="Character Name"
          onChange={(e) => onUpdateCharacter({ name: e.target.value })}
        />
        <div className="sheet-label">Character Name</div>
      </div>

      {/* Right: Metadata Grid */}
      <div className="char-metadata-grid">
        <div className="meta-field">
          <div className="meta-value">
            {character.className || 'Fighter'} {character.level || 1} {character.subclassName ? `(${character.subclassName})` : ''}
          </div>
          <div className="sheet-label">Class &amp; Level</div>
        </div>

        <div className="meta-field">
          <div className="meta-value">
            {character.backgroundName || 'Background'}
          </div>
          <div className="sheet-label">Background</div>
        </div>

        <div className="meta-field">
          <div className="meta-value" title={`Matches the ${getRuleset(character.srdVersion).playersHandbook}`}>
            {getRuleset(character.srdVersion).label}
          </div>
          <div className="sheet-label">Rules</div>
        </div>

        <div className="meta-field">
          <input aria-label="Player name"
            type="text"
            className="meta-value"
            value={character.player || ''}
            placeholder="Player"
            onChange={(e) => onUpdateCharacter({ player: e.target.value })}
          />
          <div className="sheet-label">Player Name</div>
        </div>

        <div className="meta-field">
          <div className="meta-value">
            {character.raceName || character.raceId || 'Human'}
          </div>
          <div className="sheet-label">Race / Lineage</div>
        </div>

        <div className="meta-field">
          <select aria-label="Alignment"
            className="meta-value meta-select"
            value={character.alignment || ''}
            onChange={(e) => onUpdateCharacter({ alignment: e.target.value })}
          >
            {!character.alignment && <option value="">Choose…</option>}
            {/* Keep a hand-entered alignment from older saves selectable */}
            {character.alignment && !ALIGNMENTS.includes(character.alignment) && (
              <option value={character.alignment}>{character.alignment}</option>
            )}
            {ALIGNMENTS.map(al => <option key={al} value={al}>{al}</option>)}
          </select>
          <div className="sheet-label">Alignment</div>
        </div>

        <div className="meta-field">
          {/* Text input so XP can show thousands separators; digits only while editing */}
          <input aria-label="Experience points"
            type="text"
            inputMode="numeric"
            pattern="[0-9,]*"
            className="meta-value"
            value={isEditingXp ? String(character.xp ?? '') : formatXp(character.xp)}
            onFocus={() => setIsEditingXp(true)}
            onChange={(e) => {
              const digits = e.target.value.replace(/[^\d]/g, '');
              onUpdateCharacter({ xp: digits === '' ? '' : parseInt(digits, 10) });
            }}
            onBlur={() => {
              setIsEditingXp(false);
              if (character.xp === '') onUpdateCharacter({ xp: 0 });
            }}
          />
          <div className="sheet-label">Experience Points</div>
        </div>
      </div>
    </div>
  );
}
