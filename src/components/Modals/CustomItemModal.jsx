import React, { useState } from 'react';
import Modal from '../Common/Modal';
import { X, Backpack } from 'lucide-react';
import { SRD_ARMOR, SRD_WEAPONS, SRD_ADVENTURING_PACKS } from '../../data/srdEquipment';

export default function CustomItemModal({ isOpen, onClose, onSaveItem }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(1);
  const [equipped, setEquipped] = useState(false);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSelectPreset = (e) => {
    const val = e.target.value;
    if (!val) return;

    // Check armor
    const arm = SRD_ARMOR.find(a => a.id === val);
    if (arm) {
      setName(arm.name);
      setWeight(arm.weight);
      setNotes(`Armor (${arm.category}), AC ${arm.ac || '+2'}`);
      return;
    }

    // Check weapon
    const wep = SRD_WEAPONS.find(w => w.id === val);
    if (wep) {
      setName(wep.name);
      setWeight(wep.weight);
      setNotes(`Weapon (${wep.category}), ${wep.damage} ${wep.damageType}`);
      return;
    }

    // Check pack
    const pack = SRD_ADVENTURING_PACKS.find(p => p.id === val);
    if (pack) {
      setName(pack.name);
      setWeight(pack.weight);
      setNotes(`Pack contents: ${pack.contents.join(', ')}`);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSaveItem({
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      quantity: Math.max(1, parseInt(quantity, 10) || 1),
      weight: parseFloat(weight) || 0,
      equipped,
      notes: notes.trim()
    });
    setName('');
    setQuantity(1);
    setWeight(1);
    setEquipped(false);
    setNotes('');
    onClose();
  };

  return (
    <Modal onClose={onClose} labelledBy="customitem-modal-title">
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <div className="modal-title">
            <Backpack size={20} className="text-gold" />
            <span id="customitem-modal-title">Add Inventory Item</span>
          </div>
          <button type="button" className="btn btn-secondary btn-icon" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Fill from SRD Equipment Preset</label>
            <select className="form-select" onChange={handleSelectPreset}>
              <option value="">-- Choose item preset or write your own --</option>
              <optgroup label="Armor & Shields">
                {SRD_ARMOR.map(a => (
                  <option key={a.id} value={a.id}>{a.name} ({a.category} &bull; {a.weight} lbs)</option>
                ))}
              </optgroup>
              <optgroup label="Weapons">
                {SRD_WEAPONS.map(w => (
                  <option key={w.id} value={w.id}>{w.name} ({w.category} &bull; {w.weight} lbs)</option>
                ))}
              </optgroup>
              <optgroup label="Adventuring Packs">
                {SRD_ADVENTURING_PACKS.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.weight} lbs)</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Item Name *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="e.g. Potion of Healing, Rope (50 ft), Ring of Protection"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                min="1"
                className="form-input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Weight each (lbs)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                className="form-input"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes / Attunement / Description</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Attuned, Consumable, Magic Item"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="equippedCheck"
              checked={equipped}
              onChange={(e) => setEquipped(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--accent-gold)' }}
            />
            <label htmlFor="equippedCheck" style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
              Currently Equipped / Carried on Person
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add to Inventory
          </button>
        </div>
      </form>
    </Modal>
  );
}
