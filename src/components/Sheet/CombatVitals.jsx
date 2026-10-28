import React, { useState } from 'react';
import { Shield, Zap, Wind, Heart, RotateCcw, BedDouble } from 'lucide-react';
import { calculateArmorClass, getAbilityModifier, formatModifier, hasFeat, getHitDiceLabel } from '../../utils/dndRules';

export default function CombatVitals({ character, scores, onUpdateCharacter, onLongRest }) {
  const [damageInput, setDamageInput] = useState('');
  const [showAcOverride, setShowAcOverride] = useState(false);

  const dexMod = getAbilityModifier(scores.dex);
  const calculatedAc = calculateArmorClass(character, scores);

  // Initiative: DEX mod + feat bonus (e.g. Alert +5)
  const hasAlertFeat = hasFeat(character, 'Alert');
  const initiativeMod = dexMod + (hasAlertFeat ? 5 : 0);

  const speed = character.speed || 30;
  const currentHp = character.currentHp ?? character.maxHp ?? 10;
  const maxHp = character.maxHp || 10;
  const tempHp = character.tempHp || 0;
  const deathSaves = character.deathSaves || { successes: 0, failures: 0 };

  const handleApplyDamage = () => {
    const val = parseInt(damageInput, 10);
    if (isNaN(val) || val <= 0) return;

    let remainingDmg = val;
    let newTempHp = tempHp;
    let newCurrentHp = currentHp;

    if (newTempHp > 0) {
      if (remainingDmg <= newTempHp) {
        newTempHp -= remainingDmg;
        remainingDmg = 0;
      } else {
        remainingDmg -= newTempHp;
        newTempHp = 0;
      }
    }

    if (remainingDmg > 0) {
      newCurrentHp = Math.max(0, newCurrentHp - remainingDmg);
    }

    onUpdateCharacter({ currentHp: newCurrentHp, tempHp: newTempHp });
    setDamageInput('');
  };

  const handleApplyHeal = () => {
    const val = parseInt(damageInput, 10);
    if (isNaN(val) || val <= 0) return;
    const newCurrentHp = Math.min(maxHp, currentHp + val);
    onUpdateCharacter({ currentHp: newCurrentHp });
    setDamageInput('');
  };

  const toggleDeathSaveSuccess = (index) => {
    const newSucc = deathSaves.successes === index + 1 ? index : index + 1;
    onUpdateCharacter({ deathSaves: { ...deathSaves, successes: newSucc } });
  };

  const toggleDeathSaveFailure = (index) => {
    const newFail = deathSaves.failures === index + 1 ? index : index + 1;
    onUpdateCharacter({ deathSaves: { ...deathSaves, failures: newFail } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Top 3 Vitals: AC, Initiative, Speed */}
      <div className="combat-top-row">
        {/* Armor Class */}
        <div className="combat-stat-bubble" style={{ position: 'relative' }}>
          <Shield size={16} style={{ color: 'var(--parchment-text-muted)', marginBottom: '0.1rem' }} />
          <div className="combat-stat-val">
            {calculatedAc}
          </div>
          <div className="sheet-label">Armor Class</div>
          <button aria-label="Configure AC or Override"
            type="button"
            className="no-print"
            title="Configure AC or Override"
            style={{ position: 'absolute', top: '2px', right: '4px', background: 'none', border: 'none', fontSize: '0.65rem', cursor: 'pointer', color: 'var(--parchment-text-muted)' }}
            onClick={() => setShowAcOverride(v => !v)}
          >
            ⚙
          </button>
        </div>

        {/* Initiative */}
        <div className="combat-stat-bubble">
          <Zap size={16} style={{ color: 'var(--parchment-text-muted)', marginBottom: '0.1rem' }} />
          <div className="combat-stat-val">
            {formatModifier(initiativeMod)}
          </div>
          <div className="sheet-label">Initiative</div>
        </div>

        {/* Speed */}
        <div className="combat-stat-bubble">
          <Wind size={16} style={{ color: 'var(--parchment-text-muted)', marginBottom: '0.1rem' }} />
          <div className="combat-stat-val">
            {speed}<span style={{ fontSize: '0.9rem' }}>ft</span>
          </div>
          <div className="sheet-label">Speed</div>
        </div>
      </div>

      {/* AC Override Box (shown if toggled) */}
      {showAcOverride && (
        <div className="no-print" style={{ background: 'var(--parchment-card)', border: '1px solid var(--parchment-border)', padding: '0.5rem', borderRadius: '6px', marginBottom: '0.75rem', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <strong>AC Override:</strong>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.1rem 0.3rem', fontSize: '0.7rem' }}
              onClick={() => onUpdateCharacter({ acOverride: null })}
            >
              Reset to Auto
            </button>
          </div>
          <input aria-label="Armor class override"
            type="number"
            className="form-input"
            style={{ width: '80px', padding: '0.2rem', background: '#fff', color: '#111' }}
            placeholder={calculatedAc}
            value={character.acOverride ?? ''}
            onChange={(e) => onUpdateCharacter({ acOverride: e.target.value ? parseInt(e.target.value, 10) : null })}
          />
        </div>
      )}

      {/* Hit Points Tracker Box */}
      <div className="hp-tracker-box">
        <div className="hp-header">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700 }}>
            <Heart size={14} style={{ color: 'var(--accent-red)' }} />
            Hit Points
          </span>
          <span style={{ color: 'var(--parchment-text-muted)' }}>
            Max HP: <strong>{maxHp}</strong>
          </span>
        </div>

        <div className="hp-input-row">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input aria-label="Current hit points"
              type="number"
              className="hp-large-input"
              value={currentHp}
              min={0}
              max={maxHp}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val)) onUpdateCharacter({ currentHp: Math.max(0, Math.min(maxHp, val)) });
              }}
            />
            <span className="sheet-label" style={{ marginTop: '0.2rem' }}>Current HP</span>
          </div>

          {/* Quick Damage & Healing Controls (No-print) */}
          <div className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <input aria-label="Damage or healing amount"
                type="number"
                placeholder="Amt"
                style={{ width: '55px', padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--parchment-border)', textAlign: 'center', fontFamily: 'var(--font-ui)', fontWeight: 600 }}
                value={damageInput}
                onChange={(e) => setDamageInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-accent btn-sm"
                title="Subtract HP"
                onClick={handleApplyDamage}
              >
                Dmg
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                title="Add HP"
                onClick={handleApplyHeal}
              >
                Heal
              </button>
            </div>

            {/* Temp HP */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.1rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--parchment-text-muted)' }}>Temp:</span>
              <input aria-label="Temporary hit points"
                type="number"
                placeholder="0"
                style={{ width: '55px', padding: '0.15rem', borderRadius: '4px', border: '1px solid var(--parchment-border)', textAlign: 'center', fontFamily: 'var(--font-ui)' }}
                value={tempHp || ''}
                min={0}
                onChange={(e) => onUpdateCharacter({ tempHp: Math.max(0, parseInt(e.target.value, 10) || 0) })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hit Dice & Death Saves Box */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
        {/* Hit Dice */}
        <div className="section-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="section-box-title" style={{ fontSize: '0.75rem', marginBottom: '0.3rem' }}>
              <span>Hit Dice</span>
            </div>
            <div style={{ textAlign: 'center', padding: '0.3rem 0' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--parchment-text)' }}>
                {Math.max(0, (character.level || 1) - (character.hitDiceUsed || 0))} / {getHitDiceLabel(character)}
              </div>
              <div className="sheet-label">Remaining</div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm no-print"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.3rem', fontSize: '0.7rem' }}
            title="Perform Long Rest: Restore full HP, reset half hit dice, and reset spell slots"
            onClick={onLongRest}
          >
            <BedDouble size={13} />
            <span>Long Rest</span>
          </button>
        </div>

        {/* Death Saves */}
        <div className="section-box">
          <div className="section-box-title" style={{ fontSize: '0.75rem', marginBottom: '0.4rem' }}>
            <span>Death Saves</span>
            <button aria-label="Reset Death Saves"
              type="button"
              className="no-print"
              title="Reset Death Saves"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--parchment-text-muted)' }}
              onClick={() => onUpdateCharacter({ deathSaves: { successes: 0, failures: 0 } })}
            >
              <RotateCcw size={12} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '0.1rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
              <span>Successes</span>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                {[0, 1, 2].map(i => (
                  <button
                    type="button"
                    key={i}
                    className="btn-reset pip-btn"
                    aria-label={`Death save success ${i + 1}`}
                    aria-pressed={i < deathSaves.successes}
                    onClick={() => toggleDeathSaveSuccess(i)}
                    style={{
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      border: '1.5px solid var(--parchment-border)',
                      cursor: 'pointer',
                      display: 'inline-block',
                      background: i < deathSaves.successes ? 'var(--accent-green)' : '#fff'
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
              <span>Failures</span>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                {[0, 1, 2].map(i => (
                  <button
                    type="button"
                    key={i}
                    className="btn-reset pip-btn"
                    aria-label={`Death save failure ${i + 1}`}
                    aria-pressed={i < deathSaves.failures}
                    onClick={() => toggleDeathSaveFailure(i)}
                    style={{
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      border: '1.5px solid var(--parchment-border)',
                      cursor: 'pointer',
                      display: 'inline-block',
                      background: i < deathSaves.failures ? 'var(--accent-red)' : '#fff'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
