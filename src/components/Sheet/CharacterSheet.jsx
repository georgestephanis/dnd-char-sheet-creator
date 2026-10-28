import React, { useState } from 'react';
import SheetHeader from './SheetHeader';
import AbilityScores from './AbilityScores';
import SavingThrows from './SavingThrows';
import SkillsList from './SkillsList';
import CombatVitals from './CombatVitals';
import AttacksSection from './AttacksSection';
import FeaturesSection from './FeaturesSection';
import InventorySection from './InventorySection';
import SpellsSheet from './SpellsSheet';
import RoleplaySection from './RoleplaySection';
import { getCalculatedAbilityScores, getProficiencyBonus, getSkillBonus } from '../../utils/dndRules';
import { Shield, Sparkles, BookOpen, User, Star } from 'lucide-react';

export default function CharacterSheet({
  character,
  onUpdateCharacter,
  onRollCheck,
  onRollSave,
  onRollSkill,
  onRollAttack,
  onCastSpell,
  onLongRest,
  onOpenAddAttack,
  onOpenAddSpell,
  onOpenAddFeature,
  onOpenAddItem
}) {
  const [activeTab, setActiveTab] = useState('core'); // 'core', 'spells', 'roleplay'

  if (!character) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
        No character selected. Choose or create a character to begin.
      </div>
    );
  }

  const scores = getCalculatedAbilityScores(character);
  const profBonus = getProficiencyBonus(character.level || 1);

  // Passive Senses calculations
  const passivePerception = 10 + getSkillBonus(character, 'Perception', scores.wis);
  const passiveInsight = 10 + getSkillBonus(character, 'Insight', scores.wis);
  const passiveInvestigation = 10 + getSkillBonus(character, 'Investigation', scores.int);

  const handleToggleSaveProficiency = (abId) => {
    const list = character.savingThrowsProficient || [];
    const nextList = list.includes(abId) ? list.filter(a => a !== abId) : [...list, abId];
    onUpdateCharacter({ savingThrowsProficient: nextList });
  };

  const handleCycleSkillProficiency = (skillName) => {
    const profs = character.skillProficiencies || [];
    const exps = character.expertiseSkills || [];

    if (exps.includes(skillName)) {
      // Expertise -> None
      onUpdateCharacter({
        skillProficiencies: profs.filter(s => s !== skillName),
        expertiseSkills: exps.filter(s => s !== skillName)
      });
    } else if (profs.includes(skillName)) {
      // Proficient -> Expertise
      onUpdateCharacter({
        expertiseSkills: [...exps, skillName]
      });
    } else {
      // None -> Proficient
      onUpdateCharacter({
        skillProficiencies: [...profs, skillName]
      });
    }
  };

  const handleRemoveAttack = (atkId) => {
    const list = (character.attacks || []).filter(a => a.id !== atkId);
    onUpdateCharacter({ attacks: list });
  };

  const handleRemoveSpell = (spellId) => {
    const list = (character.spells || []).filter(s => s.id !== spellId);
    onUpdateCharacter({ spells: list });
  };

  const handleRemoveFeature = (featId) => {
    const list = (character.features || []).filter(f => f.id !== featId);
    onUpdateCharacter({ features: list });
  };

  const handleRemoveItem = (itemId) => {
    const list = (character.equipment || []).filter(i => i.id !== itemId);
    onUpdateCharacter({ equipment: list });
  };

  return (
    <div>
      {/* Tab Navigation (Screen only) */}
      <div className="sheet-tabs no-print">
        <button
          type="button"
          className={`sheet-tab-btn ${activeTab === 'core' ? 'active' : ''}`}
          onClick={() => setActiveTab('core')}
        >
          <Shield size={16} />
          <span>Core Sheet</span>
        </button>

        <button
          type="button"
          className={`sheet-tab-btn ${activeTab === 'spells' ? 'active' : ''}`}
          onClick={() => setActiveTab('spells')}
        >
          <Sparkles size={16} />
          <span>Spellbook &amp; Magic</span>
        </button>

        <button
          type="button"
          className={`sheet-tab-btn ${activeTab === 'roleplay' ? 'active' : ''}`}
          onClick={() => setActiveTab('roleplay')}
        >
          <BookOpen size={16} />
          <span>Roleplay &amp; Bio</span>
        </button>

        {/* Inspiration Badge */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{
              background: character.inspiration ? 'linear-gradient(135deg, #c59b27 0%, #9a7313 100%)' : 'var(--bg-card)',
              color: character.inspiration ? '#111' : 'var(--text-muted)',
              border: character.inspiration ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
              fontWeight: 700
            }}
            onClick={() => onUpdateCharacter({ inspiration: !character.inspiration })}
          >
            <Star size={14} fill={character.inspiration ? '#111' : 'none'} />
            <span>Inspiration {character.inspiration ? 'Active' : ''}</span>
          </button>
        </div>
      </div>

      {/* PAGE 1: Core Character Sheet (Visible on screen if tab is 'core', or in print) */}
      <div className={`sheet-page ${activeTab !== 'core' ? 'no-print-hide' : ''}`} style={activeTab !== 'core' ? { display: 'none' } : {}}>
        <SheetHeader character={character} onUpdateCharacter={onUpdateCharacter} />

        {/* Main 3-Column Sheet Body */}
        <div className="sheet-columns-grid">
          {/* Column 1: Abilities, Saves, Skills & Passive Senses */}
          <div>
            <div className="abilities-container">
              <AbilityScores
                scores={scores}
                onRollCheck={onRollCheck}
              />

              <div className="skills-and-saves-column">
                {/* Proficiency Bonus & Inspiration Bar */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <div className="combat-stat-bubble" style={{ flex: 1, padding: '0.35rem 0.2rem' }}>
                    <div className="combat-stat-val" style={{ fontSize: '1.25rem' }}>
                      +{profBonus}
                    </div>
                    <div className="sheet-label">Proficiency</div>
                  </div>

                  <div className="combat-stat-bubble" style={{ flex: 1, padding: '0.35rem 0.2rem' }}>
                    <div className="combat-stat-val" style={{ fontSize: '1.25rem' }}>
                      {character.inspiration ? '★' : '—'}
                    </div>
                    <div className="sheet-label">Inspiration</div>
                  </div>
                </div>

                <SavingThrows
                  character={character}
                  scores={scores}
                  onRollSave={onRollSave}
                  onToggleSaveProficiency={handleToggleSaveProficiency}
                />

                <SkillsList
                  character={character}
                  scores={scores}
                  onRollSkill={onRollSkill}
                  onCycleSkillProficiency={handleCycleSkillProficiency}
                />

                {/* Passive Senses Box */}
                <div className="section-box">
                  <div className="section-box-title" style={{ fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                    <span>Passive Senses</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Passive Perception:</span>
                      <strong>{passivePerception}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Passive Insight:</span>
                      <strong>{passiveInsight}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Passive Investigation:</span>
                      <strong>{passiveInvestigation}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Combat Vitals & Attacks & Inventory */}
          <div>
            <CombatVitals
              character={character}
              scores={scores}
              onUpdateCharacter={onUpdateCharacter}
              onLongRest={onLongRest}
            />

            <AttacksSection
              character={character}
              scores={scores}
              onRollAttack={onRollAttack}
              onOpenAddAttack={onOpenAddAttack}
              onRemoveAttack={handleRemoveAttack}
            />

            <InventorySection
              character={character}
              scores={scores}
              onUpdateCharacter={onUpdateCharacter}
              onOpenAddItem={onOpenAddItem}
              onRemoveItem={handleRemoveItem}
            />
          </div>

          {/* Column 3: Features & Traits */}
          <div>
            <FeaturesSection
              character={character}
              onOpenAddFeature={onOpenAddFeature}
              onRemoveFeature={handleRemoveFeature}
            />
          </div>
        </div>
      </div>

      {/* PAGE 2 / TAB: Spellbook & Magic */}
      <div style={activeTab !== 'spells' ? { display: 'none' } : {}}>
        <SpellsSheet
          character={character}
          scores={scores}
          onUpdateCharacter={onUpdateCharacter}
          onOpenAddSpell={onOpenAddSpell}
          onRemoveSpell={handleRemoveSpell}
          onCastSpell={onCastSpell}
        />
      </div>

      {/* PAGE 3 / TAB: Roleplay & Bio */}
      <div className="sheet-page" style={activeTab !== 'roleplay' ? { display: 'none', marginTop: '1rem' } : { marginTop: '1rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--parchment-text)', marginBottom: '1rem', borderBottom: '2px solid var(--parchment-border-light)', paddingBottom: '0.5rem' }}>
          Roleplay, Traits &amp; Backstory
        </h3>
        <RoleplaySection
          character={character}
          onUpdateCharacter={onUpdateCharacter}
        />
      </div>
    </div>
  );
}
