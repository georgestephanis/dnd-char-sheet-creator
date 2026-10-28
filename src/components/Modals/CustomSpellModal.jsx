import React, { useState } from 'react';
import Modal from '../Common/Modal';
import { X, Sparkles } from 'lucide-react';
import { SRD_SPELLS } from '../../data/srdSpells';

export default function CustomSpellModal({ isOpen, onClose, onSaveSpell }) {
  const [activeTab, setActiveTab] = useState('srd'); // 'srd' or 'custom'
  const [filterClass, setFilterClass] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Custom spell form state
  const [customName, setCustomName] = useState('');
  const [customLevel, setCustomLevel] = useState(1);
  const [customSchool, setCustomSchool] = useState('Evocation');
  const [customCastingTime, setCustomCastingTime] = useState('1 action');
  const [customRange, setCustomRange] = useState('60 feet');
  const [customDuration, setCustomDuration] = useState('Instantaneous');
  const [customDescription, setCustomDescription] = useState('');
  const [customPrepared, setCustomPrepared] = useState(true);

  if (!isOpen) return null;

  const filteredSrdSpells = SRD_SPELLS.filter(s => {
    if (filterLevel !== 'all' && s.level.toString() !== filterLevel) return false;
    if (filterClass !== 'all' && !s.classes.includes(filterClass)) return false;
    if (searchQuery.trim() && !s.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handlePickSrdSpell = (spell) => {
    onSaveSpell({
      id: `${spell.id}-${Date.now()}`,
      name: spell.name,
      level: spell.level,
      school: spell.school,
      castingTime: spell.castingTime,
      range: spell.range,
      duration: spell.duration,
      description: spell.description,
      prepared: spell.level === 0 ? true : false,
      ritual: !!spell.ritual
    });
    onClose();
  };

  const handleSaveCustomSpell = (e) => {
    e.preventDefault();
    if (!customName.trim()) return;

    onSaveSpell({
      id: `custom-spell-${Date.now()}`,
      name: customName.trim(),
      level: parseInt(customLevel, 10) || 0,
      school: customSchool,
      castingTime: customCastingTime,
      range: customRange,
      duration: customDuration,
      description: customDescription,
      prepared: customPrepared,
      isCustom: true
    });
    onClose();
  };

  return (
    <Modal onClose={onClose} style={{ maxWidth: '750px' }} labelledBy="customspell-modal-title">
      <div className="modal-header">
        <div className="modal-title">
          <Sparkles size={20} className="text-gold" />
          <span id="customspell-modal-title">Add Spell to Spellbook</span>
        </div>
        <button type="button" className="btn btn-secondary btn-icon" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
        <button
          type="button"
          className={`sheet-tab-btn ${activeTab === 'srd' ? 'active' : ''}`}
          style={{ flex: 1, justifyContent: 'center' }}
          onClick={() => setActiveTab('srd')}
        >
          Browse SRD Spellbook
        </button>
        <button
          type="button"
          className={`sheet-tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
          style={{ flex: 1, justifyContent: 'center' }}
          onClick={() => setActiveTab('custom')}
        >
          Create Custom / Homebrew Spell
        </button>
      </div>

      <div className="modal-body">
        {activeTab === 'srd' ? (
          <div>
            {/* Filter Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search spell name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="form-select"
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="0">Cantrips (0)</option>
                <option value="1">1st Level</option>
                <option value="2">2nd Level</option>
                <option value="3">3rd Level</option>
                <option value="4">4th Level</option>
                <option value="5">5th Level</option>
              </select>
              <select
                className="form-select"
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
              >
                <option value="all">All Classes</option>
                <option value="wizard">Wizard</option>
                <option value="cleric">Cleric</option>
                <option value="druid">Druid</option>
                <option value="bard">Bard</option>
                <option value="sorcerer">Sorcerer</option>
                <option value="warlock">Warlock</option>
                <option value="paladin">Paladin</option>
                <option value="ranger">Ranger</option>
              </select>
            </div>

            {/* Spell List */}
            <div style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {filteredSrdSpells.map(s => (
                <div
                  key={s.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '0.65rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-gold)', fontFamily: 'var(--font-heading)' }}>{s.name}</span>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(212, 175, 55, 0.15)', color: 'var(--text-gold)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        {s.level === 0 ? 'Cantrip' : `Level ${s.level}`} &bull; {s.school}
                      </span>
                      {s.ritual && (
                        <span style={{ fontSize: '0.7rem', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                          Ritual
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {s.castingTime} &bull; {s.range} &bull; {s.duration}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '0.3rem', lineHeight: '1.4' }}>
                      {s.description.length > 140 ? `${s.description.substring(0, 140)}...` : s.description}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handlePickSrdSpell(s)}
                  >
                    Add
                  </button>
                </div>
              ))}
              {filteredSrdSpells.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No spells found matching filters.
                </div>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveCustomSpell}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label htmlFor="customspellmodal-spell-name" className="form-label">Spell Name *</label>
                <input id="customspellmodal-spell-name"
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Arcane Vortex"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="customspellmodal-spell-level" className="form-label">Spell Level</label>
                <select id="customspellmodal-spell-level"
                  className="form-select"
                  value={customLevel}
                  onChange={(e) => setCustomLevel(parseInt(e.target.value, 10))}
                >
                  <option value="0">Cantrip (0)</option>
                  <option value="1">1st Level</option>
                  <option value="2">2nd Level</option>
                  <option value="3">3rd Level</option>
                  <option value="4">4th Level</option>
                  <option value="5">5th Level</option>
                  <option value="6">6th Level</option>
                  <option value="7">7th Level</option>
                  <option value="8">8th Level</option>
                  <option value="9">9th Level</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div className="form-group">
                <label htmlFor="customspellmodal-school" className="form-label">School</label>
                <select id="customspellmodal-school"
                  className="form-select"
                  value={customSchool}
                  onChange={(e) => setCustomSchool(e.target.value)}
                >
                  {['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'].map(sc => (
                    <option key={sc} value={sc}>{sc}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="customspellmodal-casting-time" className="form-label">Casting Time</label>
                <input id="customspellmodal-casting-time"
                  type="text"
                  className="form-input"
                  value={customCastingTime}
                  onChange={(e) => setCustomCastingTime(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="customspellmodal-range" className="form-label">Range</label>
                <input id="customspellmodal-range"
                  type="text"
                  className="form-input"
                  value={customRange}
                  onChange={(e) => setCustomRange(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="customspellmodal-duration" className="form-label">Duration</label>
              <input id="customspellmodal-duration"
                type="text"
                className="form-input"
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="customspellmodal-description-rules" className="form-label">Description & Rules</label>
              <textarea id="customspellmodal-description-rules"
                className="form-textarea"
                rows="3"
                placeholder="Spell effects, damage, saving throw required..."
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                id="customPreparedCheck"
                checked={customPrepared}
                onChange={(e) => setCustomPrepared(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--accent-gold)' }}
              />
              <label htmlFor="customPreparedCheck" style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
                Prepare this spell now
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Homebrew Spell
              </button>
            </div>
          </form>
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
