import React from 'react';

export default function SheetHeader({ character, onUpdateCharacter }) {
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
          <input aria-label="Alignment"
            type="text"
            className="meta-value"
            value={character.alignment || ''}
            placeholder="Alignment"
            onChange={(e) => onUpdateCharacter({ alignment: e.target.value })}
          />
          <div className="sheet-label">Alignment</div>
        </div>

        <div className="meta-field">
          <input aria-label="Experience points"
            type="text"
            className="meta-value"
            value={character.xp || '0'}
            placeholder="XP"
            onChange={(e) => onUpdateCharacter({ xp: e.target.value })}
          />
          <div className="sheet-label">Experience Points</div>
        </div>
      </div>
    </div>
  );
}
