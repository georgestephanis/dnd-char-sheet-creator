import React, { useState } from 'react';
import Modal from '../Common/Modal';
import { X, Dices, RotateCcw } from 'lucide-react';
import { rollDice } from '../../utils/dndRules';

export default function DiceRollerModal({ isOpen, onClose, onRollComplete }) {
  const [selectedDie, setSelectedDie] = useState(20);
  const [dieCount, setDieCount] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [rollMode, setRollMode] = useState('normal'); // 'normal', 'advantage', 'disadvantage'
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);

  if (!isOpen) return null;

  const handleRoll = (sides = selectedDie, count = dieCount, mod = modifier) => {
    if (rollMode === 'normal' || sides !== 20 || count > 1) {
      const res = rollDice(count, sides, mod);
      const entry = {
        title: `${count}d${sides}${mod ? (mod > 0 ? `+${mod}` : `${mod}`) : ''}`,
        sides,
        modifier: mod,
        rolls: res.rolls,
        natural: count === 1 ? res.rolls[0] : null,
        total: res.total,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      setCurrentResult(entry);
      setHistory(prev => [entry, ...prev.slice(0, 19)]);
      if (onRollComplete) onRollComplete(entry);
    } else {
      // Advantage / Disadvantage for d20
      const r1 = Math.floor(Math.random() * 20) + 1;
      const r2 = Math.floor(Math.random() * 20) + 1;
      const picked = rollMode === 'advantage' ? Math.max(r1, r2) : Math.min(r1, r2);
      const dropped = rollMode === 'advantage' ? Math.min(r1, r2) : Math.max(r1, r2);
      const entry = {
        title: `1d20 ${rollMode.toUpperCase()} (${mod >= 0 ? `+${mod}` : mod})`,
        sides: 20,
        modifier: mod,
        rolls: [r1, r2],
        natural: picked,
        picked,
        dropped,
        total: picked + mod,
        isAdvDis: true,
        mode: rollMode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      setCurrentResult(entry);
      setHistory(prev => [entry, ...prev.slice(0, 19)]);
      if (onRollComplete) onRollComplete(entry);
    }
  };

  const diceOptions = [4, 6, 8, 10, 12, 20, 100];

  return (
    <Modal onClose={onClose} labelledBy="diceroller-modal-title">
      <div className="modal-header">
        <div className="modal-title">
          <Dices size={20} className="text-gold" />
          <span id="diceroller-modal-title">Interactive Dice Roller</span>
        </div>
        <button type="button" className="btn btn-secondary btn-icon" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div className="modal-body">
        {/* Quick Dice Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.4rem', marginBottom: '1rem' }}>
          {diceOptions.map(d => (
            <button
              key={d}
              type="button"
              className={`btn ${selectedDie === d ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.6rem 0.2rem', flexDirection: 'column', fontSize: '0.8rem', fontWeight: 'bold' }}
              onClick={() => {
                setSelectedDie(d);
                handleRoll(d, dieCount, modifier);
              }}
            >
              <span>d{d}</span>
            </button>
          ))}
        </div>

        {/* Dice Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div>
            <label htmlFor="dicerollermodal-count" className="form-label">Count</label>
            <input id="dicerollermodal-count"
              type="number"
              className="form-input"
              min="1"
              max="20"
              value={dieCount}
              onChange={(e) => setDieCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
            />
          </div>

          <div>
            <label htmlFor="dicerollermodal-modifier" className="form-label">Modifier</label>
            <input id="dicerollermodal-modifier"
              type="number"
              className="form-input"
              value={modifier}
              onChange={(e) => setModifier(parseInt(e.target.value, 10) || 0)}
            />
          </div>

          <div>
            <label htmlFor="dicerollermodal-mode-d20" className="form-label">Mode (d20)</label>
            <select id="dicerollermodal-mode-d20"
              className="form-select"
              value={selectedDie !== 20 || dieCount > 1 ? 'normal' : rollMode}
              onChange={(e) => setRollMode(e.target.value)}
              disabled={selectedDie !== 20 || dieCount > 1}
              title={selectedDie !== 20 || dieCount > 1 ? 'Advantage and disadvantage apply to a single d20' : undefined}
            >
              <option value="normal">Normal</option>
              <option value="advantage">Advantage</option>
              <option value="disadvantage">Disadvantage</option>
            </select>
          </div>
        </div>

        {/* Roll Action Button */}
        <button
          type="button"
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.75rem', fontSize: '1.1rem', justifyContent: 'center', marginBottom: '1.25rem' }}
          onClick={() => handleRoll()}
        >
          <Dices size={20} />
          <span>Roll {dieCount}d{selectedDie}{modifier ? (modifier > 0 ? `+${modifier}` : modifier) : ''}</span>
        </button>

        {/* Current Result Showcase */}
        {currentResult && (
          <div style={{
            background: 'linear-gradient(135deg, #1c2230 0%, #151922 100%)',
            border: '2px solid var(--border-gold)',
            borderRadius: '8px',
            padding: '1rem',
            textAlign: 'center',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-gold)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {currentResult.title}
            </div>

            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '3.2rem',
              fontWeight: 800,
              color: currentResult.sides === 20 && currentResult.natural === 20 ? '#10b981' : currentResult.sides === 20 && currentResult.natural === 1 ? '#ef4444' : 'var(--text-main)',
              lineHeight: 1.1,
              margin: '0.2rem 0'
            }}>
              {currentResult.total}
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {currentResult.isAdvDis ? (
                <span>
                  Rolled [{currentResult.rolls.join(', ')}] &rarr; Kept {currentResult.picked} ({currentResult.mode})
                </span>
              ) : (
                <span>
                  Dice: [{currentResult.rolls.join(', ')}] {currentResult.modifier !== 0 && `(Mod: ${currentResult.modifier >= 0 ? `+${currentResult.modifier}` : currentResult.modifier})`}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Roll History */}
        {history.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="form-label" style={{ margin: 0 }}>Recent Rolls</span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => { setHistory([]); setCurrentResult(null); }}
              >
                <RotateCcw size={12} />
                <span>Clear</span>
              </button>
            </div>
            <div style={{ maxHeight: '160px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {history.map((h, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    padding: '0.4rem 0.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 600, color: 'var(--text-gold)', marginRight: '0.5rem' }}>{h.title}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>[{h.rolls.join(', ')}]</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                    {h.total}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
