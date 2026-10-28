import React from 'react';

export default function RoleplaySection({ character, onUpdateCharacter }) {
  if (!character) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* 4 Characteristics boxes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
        <div className="section-box">
          <div className="section-box-title">
            <span>Personality Traits</span>
          </div>
          <textarea aria-label="Personality traits"
            className="form-textarea"
            style={{ background: 'rgba(255, 255, 255, 0.7)', border: '1px solid var(--parchment-border)', color: 'var(--parchment-text)', fontSize: '0.85rem' }}
            rows="3"
            value={character.personality || ''}
            placeholder="Unique mannerisms, temperament, habit..."
            onChange={(e) => onUpdateCharacter({ personality: e.target.value })}
          />
        </div>

        <div className="section-box">
          <div className="section-box-title">
            <span>Ideals</span>
          </div>
          <textarea aria-label="Ideals"
            className="form-textarea"
            style={{ background: 'rgba(255, 255, 255, 0.7)', border: '1px solid var(--parchment-border)', color: 'var(--parchment-text)', fontSize: '0.85rem' }}
            rows="3"
            value={character.ideals || ''}
            placeholder="What core moral compass drives your decisions?"
            onChange={(e) => onUpdateCharacter({ ideals: e.target.value })}
          />
        </div>

        <div className="section-box">
          <div className="section-box-title">
            <span>Bonds</span>
          </div>
          <textarea aria-label="Bonds"
            className="form-textarea"
            style={{ background: 'rgba(255, 255, 255, 0.7)', border: '1px solid var(--parchment-border)', color: 'var(--parchment-text)', fontSize: '0.85rem' }}
            rows="3"
            value={character.bonds || ''}
            placeholder="People, places, or oaths you protect with your life..."
            onChange={(e) => onUpdateCharacter({ bonds: e.target.value })}
          />
        </div>

        <div className="section-box">
          <div className="section-box-title">
            <span>Flaws</span>
          </div>
          <textarea aria-label="Flaws"
            className="form-textarea"
            style={{ background: 'rgba(255, 255, 255, 0.7)', border: '1px solid var(--parchment-border)', color: 'var(--parchment-text)', fontSize: '0.85rem' }}
            rows="3"
            value={character.flaws || ''}
            placeholder="A secret vice, weakness, or fatal failing..."
            onChange={(e) => onUpdateCharacter({ flaws: e.target.value })}
          />
        </div>
      </div>

      {/* Backstory & Notes */}
      <div className="section-box">
        <div className="section-box-title">
          <span>Character Backstory &amp; History</span>
        </div>
        <textarea aria-label="Backstory"
          className="form-textarea"
          style={{ background: 'rgba(255, 255, 255, 0.7)', border: '1px solid var(--parchment-border)', color: 'var(--parchment-text)', fontSize: '0.85rem' }}
          rows="5"
          value={character.backstory || ''}
          placeholder="Where did your hero begin? What inciting incident pushed you onto the road of adventure?"
          onChange={(e) => onUpdateCharacter({ backstory: e.target.value })}
        />
      </div>
    </div>
  );
}
