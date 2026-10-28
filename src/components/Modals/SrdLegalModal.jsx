import React from 'react';
import Modal from '../Common/Modal';
import { X, ShieldCheck } from 'lucide-react';
import { RULESET_LIST } from '../../data/rulesets';

export default function SrdLegalModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} labelledBy="srdlegal-modal-title">
      <div className="modal-header">
        <div className="modal-title">
          <ShieldCheck size={20} className="text-gold" />
          <span id="srdlegal-modal-title">SRD Legal & Attribution</span>
        </div>
        <button type="button" className="btn btn-secondary btn-icon" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div className="modal-body" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
        <p style={{ marginBottom: '1rem' }}>
          This application uses game content from the System Reference Documents below, released under the Creative Commons Attribution 4.0 International License (CC-BY-4.0). Each character uses one of them, chosen when the character is created.
        </p>

        {RULESET_LIST.map(rs => (
          <div key={rs.version} style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
            <h4 style={{ color: 'var(--text-gold)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              {rs.label} <span style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--text-muted)' }}>(matches the {rs.playersHandbook})</span>
            </h4>
            <p style={{ fontSize: '0.85rem' }}>{rs.attribution}</p>
          </div>
        ))}

        <p style={{ marginBottom: '0.5rem' }}>
          <strong>No Server Storage:</strong> All character data, custom entries, and sheet modifications are stored strictly client-side in your web browser&rsquo;s <code>localStorage</code>. No personal data or character sheets are transmitted or stored on any remote server.
        </p>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Close Notice
        </button>
      </div>
    </Modal>
  );
}
