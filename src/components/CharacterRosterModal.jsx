import React, { useRef, useState } from 'react';
import Modal from './Common/Modal';
import { X, UserPlus, Download, Upload, Copy, Trash2, Play, Users } from 'lucide-react';
import { exportCharacterToJson, exportAllCharactersToJson, importCharactersFromJson } from '../utils/storage';

export default function CharacterRosterModal({
  isOpen,
  onClose,
  characters,
  activeCharacterId,
  onSelectCharacter,
  onDeleteCharacter,
  onDuplicateCharacter,
  onOpenCreationWizard,
  onImportCharacters
}) {
  const fileInputRef = useRef(null);
  const [importStatus, setImportStatus] = useState(null); // { type: 'success' | 'error', message }
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  if (!isOpen) return null;

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        const res = importCharactersFromJson(text);
        if (res.success) {
          setImportStatus({ type: 'success', message: `Imported ${res.count} character${res.count === 1 ? '' : 's'}.` });
          onImportCharacters(res.list);
        } else {
          setImportStatus({ type: 'error', message: `Import failed: ${res.error}` });
        }
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  return (
    <Modal onClose={onClose} style={{ maxWidth: '800px' }} labelledBy="characterroster-modal-title">
      <div className="modal-header">
        <div className="modal-title">
          <Users size={20} className="text-gold" />
          <span id="characterroster-modal-title">Character Roster & Vault</span>
        </div>
        <button type="button" className="btn btn-secondary btn-icon" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div className="modal-body">
        {/* Roster Top Action Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem', justifyContent: 'space-between' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onOpenCreationWizard();
            }}
          >
            <UserPlus size={16} />
            <span>Create New Character</span>
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json,application/json"
              style={{ display: 'none' }}
              onChange={handleImportFile}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={16} />
              <span>Import JSON</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => exportAllCharactersToJson(characters)}
            >
              <Download size={16} />
              <span>Backup All</span>
            </button>
          </div>
        </div>

        {importStatus && (
          <div
            role="status"
            style={{
              marginBottom: '1rem',
              padding: '0.6rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              border: `1px solid ${importStatus.type === 'error' ? 'var(--accent-red)' : 'var(--border-gold)'}`,
              color: importStatus.type === 'error' ? 'var(--accent-red)' : 'var(--text-gold)'
            }}
          >
            {importStatus.message}
          </div>
        )}

        {characters.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
            Your vault is empty. Create a character or import a JSON backup.
          </div>
        )}

        {/* Characters Grid / List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto' }}>
          {characters.map(char => {
            const isActive = char.id === activeCharacterId;
            return (
              <div
                key={char.id}
                style={{
                  background: isActive ? 'linear-gradient(90deg, #1f2735 0%, #171b24 100%)' : 'var(--bg-card)',
                  border: isActive ? '2px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  transition: 'border-color 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2b3240 0%, #151820 100%)',
                      border: '1.5px solid var(--border-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      flexShrink: 0
                    }}
                  >
                    ⚔️
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                        {char.name || 'Unnamed Adventurer'}
                      </span>
                      {isActive && (
                        <span style={{ fontSize: '0.65rem', background: 'var(--accent-gold)', color: '#111', fontWeight: 800, padding: '0.1rem 0.4rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                          Active
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      Level {char.level || 1} &bull; {char.raceName || char.raceId} &bull; {char.className || char.classId} {char.subclassName ? `(${char.subclassName})` : ''} &bull; HP: {char.currentHp ?? char.maxHp}/{char.maxHp}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {!isActive && (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      title="Select character"
                      onClick={() => {
                        onSelectCharacter(char.id);
                        onClose();
                      }}
                    >
                      <Play size={14} />
                      <span>Select</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-secondary btn-icon btn-sm"
                    title="Duplicate character"
                    aria-label={`Duplicate ${char.name || 'character'}`}
                    onClick={() => onDuplicateCharacter(char.id)}
                  >
                    <Copy size={15} />
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary btn-icon btn-sm"
                    title="Export JSON"
                    aria-label={`Export ${char.name || 'character'} as JSON`}
                    onClick={() => exportCharacterToJson(char)}
                  >
                    <Download size={15} />
                  </button>

                  {pendingDeleteId === char.id ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-accent btn-sm"
                        onClick={() => {
                          setPendingDeleteId(null);
                          onDeleteCharacter(char.id);
                        }}
                      >
                        Delete {char.name || 'character'}?
                      </button>
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => setPendingDeleteId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary btn-icon btn-sm"
                      title="Delete character"
                      aria-label={`Delete ${char.name || 'character'}`}
                      style={{ color: 'var(--accent-red)' }}
                      onClick={() => setPendingDeleteId(char.id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Close Roster
        </button>
      </div>
    </Modal>
  );
}
