import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function SrdLegalModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <dialog open className="modal-dialog" onClick={(e) => { if (e.target.tagName === 'DIALOG') onClose(); }}>
      <div className="modal-header">
        <div className="modal-title">
          <ShieldCheck size={20} className="text-gold" />
          <span>SRD 5.1 Legal & Open Gaming Attribution</span>
        </div>
        <button type="button" className="btn btn-secondary btn-icon" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div className="modal-body" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
        <p style={{ marginBottom: '1rem' }}>
          This application uses game content from the <strong>System Reference Document 5.1 (&ldquo;SRD 5.1&rdquo;)</strong>, released by Wizards of the Coast LLC under the Creative Commons Attribution 4.0 International License (CC-BY-4.0).
        </p>

        <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
          <h4 style={{ color: 'var(--text-gold)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Attribution Notice</h4>
          <p style={{ fontSize: '0.85rem' }}>
            This work includes material taken from the System Reference Document 5.1 (&ldquo;SRD 5.1&rdquo;) by Wizards of the Coast LLC and available at{' '}
            <a href="https://dnd.wizards.com/resources/systems-reference-document" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)' }}>
              https://dnd.wizards.com/resources/systems-reference-document
            </a>. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/legalcode" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)' }}>
              https://creativecommons.org/licenses/by/4.0/legalcode
            </a>.
          </p>
        </div>

        <p style={{ marginBottom: '0.5rem' }}>
          <strong>No Server Storage:</strong> All character data, custom entries, and sheet modifications are stored strictly client-side in your web browser&rsquo;s <code>localStorage</code>. No personal data or character sheets are transmitted or stored on any remote server.
        </p>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Close Notice
        </button>
      </div>
    </dialog>
  );
}
