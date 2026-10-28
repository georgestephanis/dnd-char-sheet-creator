import React from 'react';
import { Plus, Trash2, Coins, Backpack } from 'lucide-react';
import { getCarryingCapacity } from '../../utils/dndRules';

export default function InventorySection({ character, scores, onUpdateCharacter, onOpenAddItem, onRemoveItem }) {
  const currency = character.currency || { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };
  const equipment = character.equipment || [];

  const strScore = scores.str || 10;
  const carryCapacity = getCarryingCapacity(strScore);

  const totalWeight = equipment.reduce((sum, item) => {
    return sum + (item.weight || 0) * (item.quantity || 1);
  }, 0);

  const updateCurrency = (denom, val) => {
    onUpdateCharacter({
      currency: {
        ...currency,
        [denom]: Math.max(0, parseInt(val, 10) || 0)
      }
    });
  };

  const toggleItemEquipped = (id) => {
    const updated = equipment.map(item => {
      if (item.id === id) {
        return { ...item, equipped: !item.equipped };
      }
      return item;
    });
    onUpdateCharacter({ equipment: updated });
  };

  return (
    <div className="section-box" style={{ marginBottom: '0.75rem' }}>
      <div className="section-box-title">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Backpack size={15} style={{ color: 'var(--accent-gold)' }} />
          Equipment &amp; Treasure
        </span>
        <button
          type="button"
          className="btn btn-secondary btn-sm no-print"
          style={{ padding: '0.15rem 0.5rem', fontSize: '0.72rem' }}
          onClick={onOpenAddItem}
        >
          <Plus size={13} />
          <span>Add Item</span>
        </button>
      </div>

      {/* Currency Pouch */}
      <div style={{ background: 'rgba(255, 255, 255, 0.7)', border: '1px solid var(--parchment-border-light)', borderRadius: '6px', padding: '0.5rem 0.6rem', marginBottom: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--parchment-text-muted)', marginBottom: '0.35rem' }}>
          <Coins size={13} />
          <span>Coinage</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.35rem', textAlign: 'center' }}>
          {[
            { id: 'cp', label: 'CP' },
            { id: 'sp', label: 'SP' },
            { id: 'ep', label: 'EP' },
            { id: 'gp', label: 'GP' },
            { id: 'pp', label: 'PP' }
          ].map(coin => (
            <div key={coin.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <input aria-label={`${coin.label || coin.id.toUpperCase()} amount`}
                type="number"
                min="0"
                style={{ width: '100%', maxWidth: '50px', padding: '0.2rem', textAlign: 'center', fontWeight: 700, border: '1px solid var(--parchment-border)', borderRadius: '4px', background: '#fff' }}
                value={currency[coin.id] ?? 0}
                onChange={(e) => updateCurrency(coin.id, e.target.value)}
              />
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--parchment-text-muted)', marginTop: '0.1rem' }}>{coin.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weight & Encumbrance Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--parchment-text-muted)', marginBottom: '0.5rem', padding: '0 0.2rem' }}>
        <span>Weight Carried: <strong>{totalWeight.toFixed(1)} lbs</strong></span>
        <span>Capacity: <strong>{carryCapacity} lbs</strong></span>
      </div>

      {/* Inventory Items List */}
      <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.75rem' }}>
        {equipment.map(item => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
              padding: '0.3rem 0.4rem',
              borderBottom: '1px dotted var(--parchment-border-light)',
              background: item.equipped ? 'rgba(212, 175, 55, 0.08)' : 'transparent'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1 }}>
              <input aria-label={`${item.name} equipped`}
                type="checkbox"
                checked={item.equipped ?? false}
                title="Equipped"
                onChange={() => toggleItemEquipped(item.id)}
                style={{ accentColor: 'var(--accent-gold)' }}
              />
              <span style={{ fontWeight: item.equipped ? 700 : 500, color: 'var(--parchment-text)' }}>
                {item.quantity > 1 ? `${item.quantity}x ` : ''}{item.name}
              </span>
              {item.weight > 0 && (
                <span style={{ fontSize: '0.7rem', color: 'var(--parchment-text-muted)' }}>
                  ({(item.weight * (item.quantity || 1)).toFixed(1)} lbs)
                </span>
              )}
            </div>

            <button aria-label={`Remove ${item.name}`}
              type="button"
              className="no-print"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-red)', padding: '0.1rem' }}
              title="Remove item"
              onClick={() => onRemoveItem && onRemoveItem(item.id)}
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}

        {equipment.length === 0 && (
          <div style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--parchment-text-muted)', fontSize: '0.8rem' }}>
            No items in inventory.
          </div>
        )}
      </div>

      {/* Other Proficiencies & Languages */}
      <div style={{ borderTop: '1px solid var(--parchment-border-light)', paddingTop: '0.5rem' }}>
        <div className="sheet-label" style={{ marginBottom: '0.25rem' }}>Other Proficiencies &amp; Languages</div>
        <textarea aria-label="Other proficiencies and languages"
          className="form-textarea"
          style={{ background: 'rgba(255, 255, 255, 0.7)', border: '1px solid var(--parchment-border)', color: 'var(--parchment-text)', fontSize: '0.8rem' }}
          rows="3"
          value={character.proficienciesText || ''}
          placeholder="Languages, tool proficiencies, weapon/armor training..."
          onChange={(e) => onUpdateCharacter({ proficienciesText: e.target.value })}
        />
      </div>
    </div>
  );
}
