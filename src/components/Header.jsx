import React from 'react';
import { UserPlus, Users, TrendingUp, Printer, Dices, ShieldAlert, Sparkles, Scroll } from 'lucide-react';

export default function Header({
  characters,
  activeCharacter,
  viewMode, // 'sheet' or 'bg3_view'
  onSetViewMode,
  onSelectCharacter,
  onOpenCreationWizard,
  onOpenRoster,
  onOpenLevelUp,
  onOpenDiceRoller,
  onOpenLegalModal,
  onPrint
}) {
  return (
    <header className="app-header">
      {/* Brand Section */}
      <div className="brand-section">
        <div className="brand-icon">⚔️</div>
        <div>
          <div className="brand-title">D&amp;D 5e Character Forge</div>
          <div className="brand-subtitle">Guided Creator &bull; Level-Up &bull; SRD 5.1 &bull; Printable</div>
        </div>
      </div>

      {/* Actions & Selector */}
      <div className="header-actions">
        {/* Character Quick Switcher */}
        {characters.length > 0 && (
          <select
            className="char-selector-select"
            value={activeCharacter?.id || ''}
            onChange={(e) => onSelectCharacter(e.target.value)}
            title="Switch Active Character"
          >
            {characters.map(c => (
              <option key={c.id} value={c.id}>
                {c.name || 'Unnamed'} (Lvl {c.level || 1} {c.className || c.classId})
              </option>
            ))}
          </select>
        )}

        {/* View Mode Switcher: Tabletop Sheet vs Adventurer View */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.45)', padding: '2px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            id="btn-view-tabletop"
            className="btn btn-sm"
            style={{
              background: viewMode === 'sheet' ? 'linear-gradient(180deg, rgba(223, 184, 90, 0.25) 0%, rgba(223, 184, 90, 0.1) 100%)' : 'transparent',
              color: viewMode === 'sheet' ? 'var(--text-gold)' : '#94a3b8',
              borderColor: viewMode === 'sheet' ? 'var(--border-gold)' : 'transparent',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
            onClick={() => onSetViewMode('sheet')}
            title="Switch to printable 5e Tabletop Character Sheet"
          >
            <Scroll size={14} />
            <span>Tabletop Sheet</span>
          </button>
          <button
            type="button"
            id="btn-view-bg3"
            className="btn btn-sm"
            style={{
              background: viewMode === 'bg3_view' ? 'linear-gradient(180deg, rgba(223, 184, 90, 0.25) 0%, rgba(223, 184, 90, 0.1) 100%)' : 'transparent',
              color: viewMode === 'bg3_view' ? 'var(--text-gold)' : '#94a3b8',
              borderColor: viewMode === 'bg3_view' ? 'var(--border-gold)' : 'transparent',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
            onClick={() => onSetViewMode('bg3_view')}
            title="Switch to the illustrated Adventurer View"
          >
            <Sparkles size={14} />
            <span>Adventurer View</span>
          </button>
        </div>

        {/* Level Up Button (Highlight) */}
        {activeCharacter && (
          <button
            type="button"
            id="btn-level-up"
            className="btn btn-primary"
            style={{ fontWeight: 800 }}
            onClick={onOpenLevelUp}
            title="Level up this character"
          >
            <TrendingUp size={16} />
            <span>Level Up</span>
          </button>
        )}

        {/* New Character */}
        <button
          type="button"
          id="btn-new-hero"
          className="btn btn-secondary"
          onClick={onOpenCreationWizard}
          title="Open the Character Forge"
          style={{ borderColor: 'var(--border-gold)', color: 'var(--text-gold)', fontWeight: 700 }}
        >
          <UserPlus size={16} />
          <span>+ New Hero</span>
        </button>

        {/* Roster / Vault */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onOpenRoster}
          title="Open character vault"
        >
          <Users size={16} />
          <span>Roster ({characters.length})</span>
        </button>

        {/* Dice Roller */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onOpenDiceRoller}
          title="Open dice roller"
        >
          <Dices size={16} />
          <span>Dice</span>
        </button>

        {/* Print Character Sheet */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onPrint}
          title="Print character sheet"
        >
          <Printer size={16} />
          <span>Print</span>
        </button>

        {/* SRD Legal Modal */}
        <button aria-label="SRD 5.1 CC-BY-4.0 Attribution"
          type="button"
          className="btn btn-secondary btn-icon"
          onClick={onOpenLegalModal}
          title="SRD 5.1 CC-BY-4.0 Attribution"
        >
          <ShieldAlert size={16} />
        </button>
      </div>
    </header>
  );
}
