import React, { useState } from 'react';
import Modal from '../Common/Modal';
import { X, Sword } from 'lucide-react';
import { SRD_WEAPONS } from '../../data/srdEquipment';

export default function CustomAttackModal({ isOpen, onClose, onSaveAttack }) {
  const [selectedPreset, setSelectedPreset] = useState('');
  const [name, setName] = useState('');
  const [ability, setAbility] = useState('str');
  const [damageDice, setDamageDice] = useState('1d8');
  const [damageType, setDamageType] = useState('slashing');
  const [bonusToHit, setBonusToHit] = useState(0);
  const [isProficient, setIsProficient] = useState(true);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handlePresetSelect = (presetId) => {
    setSelectedPreset(presetId);
    const weapon = SRD_WEAPONS.find(w => w.id === presetId);
    if (weapon) {
      setName(weapon.name);
      setDamageDice(weapon.damage);
      setDamageType(weapon.damageType);
      setNotes(weapon.properties.join(', '));
      // Guess ability based on properties/category
      if (weapon.category.includes('Ranged') || weapon.properties.includes('Finesse')) {
        setAbility('dex');
      } else {
        setAbility('str');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSaveAttack({
      id: `atk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      ability,
      damageDice: damageDice.trim(),
      damageType: damageType.trim(),
      bonusToHit: parseInt(bonusToHit, 10) || 0,
      isProficient,
      notes: notes.trim()
    });
    onClose();
  };

  return (
    <Modal onClose={onClose} labelledBy="customattack-modal-title">
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <div className="modal-title">
            <Sword size={20} className="text-gold" />
            <span id="customattack-modal-title">Add Attack / Weapon</span>
          </div>
          <button type="button" className="btn btn-secondary btn-icon" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Quick SRD Weapon Picker */}
          <div className="form-group">
            <label htmlFor="customattackmodal-select-from-srd-weapons-option" className="form-label">Select from SRD Weapons (Optional)</label>
            <select id="customattackmodal-select-from-srd-weapons-option"
              className="form-select"
              value={selectedPreset}
              onChange={(e) => handlePresetSelect(e.target.value)}
            >
              <option value="">-- Choose an SRD Weapon to auto-fill --</option>
              {SRD_WEAPONS.map(w => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.category} &bull; {w.damage} {w.damageType})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label htmlFor="customattackmodal-attack-weapon-name" className="form-label">Attack / Weapon Name *</label>
              <input id="customattackmodal-attack-weapon-name"
                type="text"
                className="form-input"
                required
                placeholder="e.g. Longsword, Shortbow, Eldritch Blast"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="customattackmodal-governing-ability" className="form-label">Governing Ability</label>
              <select id="customattackmodal-governing-ability"
                className="form-select"
                value={ability}
                onChange={(e) => setAbility(e.target.value)}
              >
                <option value="str">STR (Strength)</option>
                <option value="dex">DEX (Dexterity)</option>
                <option value="con">CON (Constitution)</option>
                <option value="int">INT (Intelligence)</option>
                <option value="wis">WIS (Wisdom)</option>
                <option value="cha">CHA (Charisma)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label htmlFor="customattackmodal-damage-formula" className="form-label">Damage Formula</label>
              <input id="customattackmodal-damage-formula"
                type="text"
                className="form-input"
                placeholder="1d8, 2d6, 1d10"
                value={damageDice}
                onChange={(e) => setDamageDice(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="customattackmodal-damage-type" className="form-label">Damage Type</label>
              <input id="customattackmodal-damage-type"
                type="text"
                className="form-input"
                placeholder="slashing, piercing..."
                value={damageType}
                onChange={(e) => setDamageType(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="customattackmodal-extra-bonus-to-hit" className="form-label">Extra Bonus to Hit</label>
              <input id="customattackmodal-extra-bonus-to-hit"
                type="number"
                className="form-input"
                placeholder="0"
                value={bonusToHit}
                onChange={(e) => setBonusToHit(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
            <input
              type="checkbox"
              id="isProficientCheck"
              checked={isProficient}
              onChange={(e) => setIsProficient(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--accent-gold)' }}
            />
            <label htmlFor="isProficientCheck" style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
              Add Character Proficiency Bonus to Attack Rolls
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="customattackmodal-properties-range-notes" className="form-label">Properties / Range / Notes</label>
            <input id="customattackmodal-properties-range-notes"
              type="text"
              className="form-input"
              placeholder="e.g. Finesse, Versatile (1d10), Range 80/320 ft"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Attack
          </button>
        </div>
      </form>
    </Modal>
  );
}
