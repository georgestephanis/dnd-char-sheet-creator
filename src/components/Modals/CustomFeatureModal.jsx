import React, { useState } from 'react';
import { X, Award } from 'lucide-react';

export default function CustomFeatureModal({ isOpen, onClose, onSaveFeature }) {
  const [name, setName] = useState('');
  const [source, setSource] = useState('Feat');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSaveFeature({
      id: `feat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      source: source.trim(),
      description: description.trim()
    });
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <dialog open className="modal-dialog" onClick={(e) => { if (e.target.tagName === 'DIALOG') onClose(); }}>
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <div className="modal-title">
            <Award size={20} className="text-gold" />
            <span>Add Custom Feature / Trait / Feat</span>
          </div>
          <button type="button" className="btn btn-secondary btn-icon" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Feature Name *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="e.g. War Caster, Fey Touched, Relentless Will"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Source / Origin</label>
            <select
              className="form-select"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              <option value="Feat">Feat</option>
              <option value="Racial">Racial Trait</option>
              <option value="Class">Class Feature</option>
              <option value="Subclass">Subclass Feature</option>
              <option value="Background">Background Feature</option>
              <option value="Supernatural Gift / Boon">Supernatural Gift / Boon</option>
              <option value="Custom">Custom / Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description & Rules *</label>
            <textarea
              className="form-textarea"
              rows="4"
              required
              placeholder="What does this feature allow your character to do?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Feature
          </button>
        </div>
      </form>
    </dialog>
  );
}
