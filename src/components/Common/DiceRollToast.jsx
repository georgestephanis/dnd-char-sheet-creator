import React from 'react';
import { Dices, X } from 'lucide-react';

export default function DiceRollToast({ rollToast, onDismiss }) {
  if (!rollToast) return null;

  const isNat20 = rollToast.dieRoll === 20;
  const isNat1 = rollToast.dieRoll === 1;

  return (
    <div
      className="no-print"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: 'linear-gradient(135deg, #1b202c 0%, #11141c 100%)',
        border: isNat20 ? '2px solid #10b981' : isNat1 ? '2px solid #ef4444' : '2px solid var(--border-gold)',
        borderRadius: '8px',
        padding: '0.85rem 1.25rem',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        animation: 'slideUp 0.25s ease-out'
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: isNat20 ? 'rgba(16, 185, 129, 0.2)' : isNat1 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(212, 175, 55, 0.15)',
          border: '1.5px solid var(--border-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <Dices size={24} style={{ color: isNat20 ? '#10b981' : isNat1 ? '#ef4444' : 'var(--text-gold)' }} />
      </div>

      <div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-gold)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {rollToast.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.1rem' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: isNat20 ? '#10b981' : isNat1 ? '#ef4444' : '#fff', lineHeight: 1 }}>
            {rollToast.total}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            ({rollToast.breakdown})
          </span>
          {isNat20 && <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.75rem' }}>NATURAL 20!</span>}
          {isNat1 && <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.75rem' }}>CRITICAL FAIL!</span>}
        </div>
      </div>

      <button
        type="button"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', marginLeft: '0.5rem' }}
        onClick={onDismiss}
      >
        <X size={16} />
      </button>
    </div>
  );
}
