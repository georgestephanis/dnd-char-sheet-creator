import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CharacterSheet from './components/Sheet/CharacterSheet';
import BG3CharacterBuilder from './components/BG3/BG3CharacterBuilder';
import BG3CharacterInspector from './components/BG3/BG3CharacterInspector';
import BG3LevelUpModal from './components/BG3/BG3LevelUpModal';
import CharacterRosterModal from './components/CharacterRosterModal';
import DiceRollerModal from './components/Modals/DiceRollerModal';
import SrdLegalModal from './components/Modals/SrdLegalModal';
import CustomAttackModal from './components/Modals/CustomAttackModal';
import CustomSpellModal from './components/Modals/CustomSpellModal';
import CustomFeatureModal from './components/Modals/CustomFeatureModal';
import CustomItemModal from './components/Modals/CustomItemModal';
import DiceRollToast from './components/Common/DiceRollToast';

import {
  loadCharacters,
  saveCharacters,
  saveSingleCharacter,
  deleteCharacterById,
  duplicateCharacterById,
  getActiveCharacterId,
  setActiveCharacterId
} from './utils/storage';

import { rollDice } from './utils/dndRules';

export default function App() {
  const [characters, setCharacters] = useState(() => loadCharacters());
  const [activeCharacterId, setActiveCharId] = useState(() => getActiveCharacterId(characters));
  const [viewMode, setViewMode] = useState('sheet'); // 'sheet' (Tabletop) or 'bg3_view' (BG3 Inspector)

  // Creation & Respec Forge
  const [isCreationWizardOpen, setIsCreationWizardOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);

  // Modals
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [isLevelUpOpen, setIsLevelUpOpen] = useState(false);
  const [isDiceRollerOpen, setIsDiceRollerOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  // Sub-entity creation modals
  const [isAddAttackOpen, setIsAddAttackOpen] = useState(false);
  const [isAddSpellOpen, setIsAddSpellOpen] = useState(false);
  const [isAddFeatureOpen, setIsAddFeatureOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  // Dice roll toast
  const [rollToast, setRollToast] = useState(null);

  // Active character
  const activeCharacter = characters.find(c => c.id === activeCharacterId) || characters[0] || null;

  useEffect(() => {
    if (activeCharacterId) {
      setActiveCharacterId(activeCharacterId);
    }
  }, [activeCharacterId]);

  // Auto-dismiss roll toast after 6 seconds
  useEffect(() => {
    if (rollToast) {
      const timer = setTimeout(() => {
        setRollToast(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [rollToast]);

  const handleSelectCharacter = (id) => {
    setActiveCharId(id);
  };

  const handleUpdateCharacter = (updates) => {
    if (!activeCharacter) return;
    const updated = { ...activeCharacter, ...updates };
    const newList = characters.map(c => c.id === updated.id ? updated : c);
    setCharacters(newList);
    saveSingleCharacter(updated);
  };

  const handleDeleteCharacter = (id) => {
    const remaining = deleteCharacterById(id);
    setCharacters(remaining);
    if (activeCharacterId === id) {
      setActiveCharId(remaining[0]?.id || null);
    }
  };

  const handleDuplicateCharacter = (id) => {
    const res = duplicateCharacterById(id);
    setCharacters(res.updatedList);
    setActiveCharId(res.newCharacterId);
  };

  const handleCharacterSaved = (savedChar) => {
    if (editingCharacter) {
      handleUpdateCharacter(savedChar);
      setEditingCharacter(null);
      showToast({
        title: `${savedChar.name} Respec Saved!`,
        dieRoll: 20,
        total: `Level ${savedChar.level} ${savedChar.className}`,
        breakdown: 'Updated character in local vault'
      });
    } else {
      const updatedList = [savedChar, ...characters];
      setCharacters(updatedList);
      setActiveCharId(savedChar.id);
      saveSingleCharacter(savedChar);
      showToast({
        title: `${savedChar.name} Created!`,
        dieRoll: 20,
        total: `Level ${savedChar.level} ${savedChar.className}`,
        breakdown: 'Character saved to local vault'
      });
    }
    setIsCreationWizardOpen(false);
  };

  const handleSaveLeveledCharacter = (leveledChar) => {
    handleUpdateCharacter(leveledChar);
    showToast({
      title: `Advanced to Level ${leveledChar.level}!`,
      total: `${leveledChar.className} Lvl ${leveledChar.level}`,
      breakdown: `Max HP increased to ${leveledChar.maxHp}`,
      dieRoll: 20
    });
  };

  const showToast = (toastData) => {
    setRollToast(toastData);
  };

  // Mirror dice tray results into the roll toast
  const handleDiceTrayRoll = (entry) => {
    const isSingleD20 = entry.sides === 20 && (entry.isAdvDis || entry.rolls.length === 1);
    showToast({
      title: entry.title,
      dieRoll: isSingleD20 ? (entry.picked ?? entry.rolls[0]) : null,
      total: entry.total,
      breakdown: entry.isAdvDis
        ? `kept ${entry.picked}, dropped ${entry.dropped}`
        : `rolls: ${entry.rolls.join(', ')}`
    });
  };

  // Roll standard ability check (1d20 + mod)
  const handleRollCheck = (abilityName, mod) => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + mod;
    showToast({
      title: `${abilityName} Check`,
      dieRoll: d20,
      total,
      breakdown: `d20 (${d20}) ${mod >= 0 ? `+ ${mod}` : `- ${Math.abs(mod)}`}`
    });
  };

  // Roll saving throw (1d20 + mod)
  const handleRollSave = (saveName, mod) => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + mod;
    showToast({
      title: `${saveName}`,
      dieRoll: d20,
      total,
      breakdown: `d20 (${d20}) ${mod >= 0 ? `+ ${mod}` : `- ${Math.abs(mod)}`}`
    });
  };

  // Roll skill check (1d20 + mod)
  const handleRollSkill = (skillName, mod) => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + mod;
    showToast({
      title: `${skillName} Check`,
      dieRoll: d20,
      total,
      breakdown: `d20 (${d20}) ${mod >= 0 ? `+ ${mod}` : `- ${Math.abs(mod)}`}`
    });
  };

  // Roll attack and damage
  const handleRollAttack = (atk, toHitBonus, abilityMod) => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const toHitTotal = d20 + toHitBonus;

    let damageTotal = 0;
    let damageRolls = [];
    if (atk.damageDice) {
      const match = atk.damageDice.match(/(\d+)d(\d+)/);
      if (match) {
        const count = parseInt(match[1], 10);
        const sides = parseInt(match[2], 10);
        const res = rollDice(count, sides, abilityMod);
        damageTotal = res.total;
        damageRolls = res.rolls;
      }
    }

    showToast({
      title: `${atk.name} Attack`,
      dieRoll: d20,
      total: `Atk: ${toHitTotal} | Dmg: ${damageTotal > 0 ? damageTotal : '—'}`,
      breakdown: `To Hit: [d20 (${d20}) ${toHitBonus >= 0 ? `+ ${toHitBonus}` : `- ${Math.abs(toHitBonus)}`}] ${damageRolls.length > 0 ? `• Dmg dice: [${damageRolls.join(', ')}] ${abilityMod >= 0 ? `+${abilityMod}` : abilityMod} (${atk.damageType || ''})` : ''}`
    });
  };

  // Cast spell (expends spell slot)
  const handleCastSpell = (spell) => {
    if (spell.level > 0) {
      const slotIndex = spell.level - 1;
      const currentUsed = activeCharacter.spellSlotsUsed?.[slotIndex] || 0;
      const nextArr = [...(activeCharacter.spellSlotsUsed || [0, 0, 0, 0, 0, 0, 0, 0, 0])];
      nextArr[slotIndex] = currentUsed + 1;
      handleUpdateCharacter({ spellSlotsUsed: nextArr });
    }

    showToast({
      title: `Cast: ${spell.name}`,
      dieRoll: 10,
      total: spell.level === 0 ? 'Cantrip' : `Slot Lvl ${spell.level} Expended`,
      breakdown: `${spell.castingTime} • ${spell.range}`
    });
  };

  // Long Rest
  const handleLongRest = () => {
    if (!activeCharacter) return;
    const maxHp = activeCharacter.maxHp || 10;
    const lvl = activeCharacter.level || 1;
    const currentUsedDice = activeCharacter.hitDiceUsed || 0;
    const restoredDice = Math.max(1, Math.floor(lvl / 2));
    const newUsedDice = Math.max(0, currentUsedDice - restoredDice);

    handleUpdateCharacter({
      currentHp: maxHp,
      tempHp: 0,
      hitDiceUsed: newUsedDice,
      spellSlotsUsed: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      deathSaves: { successes: 0, failures: 0 }
    });

    showToast({
      title: 'Long Rest Finished',
      dieRoll: 20,
      total: `HP Restored to ${maxHp}`,
      breakdown: `All spell slots restored & ${restoredDice} Hit Dice recovered`
    });
  };

  // Print Character Sheet
  const handlePrint = () => {
    window.print();
  };

  // Add sub-entities
  const handleSaveAttack = (atk) => {
    const list = [...(activeCharacter?.attacks || []), atk];
    handleUpdateCharacter({ attacks: list });
  };

  const handleSaveSpell = (sp) => {
    const list = [...(activeCharacter?.spells || []), sp];
    handleUpdateCharacter({ spells: list });
  };

  const handleSaveFeature = (feat) => {
    const list = [...(activeCharacter?.features || []), feat];
    handleUpdateCharacter({ features: list });
  };

  const handleSaveItem = (item) => {
    const list = [...(activeCharacter?.equipment || []), item];
    handleUpdateCharacter({ equipment: list });
  };

  return (
    <div className="app-container">
      {/* Top Header & Toolbar */}
      <Header
        characters={characters}
        activeCharacter={activeCharacter}
        viewMode={viewMode}
        onSetViewMode={setViewMode}
        onSelectCharacter={handleSelectCharacter}
        onOpenCreationWizard={() => {
          setEditingCharacter(null);
          setIsCreationWizardOpen(true);
        }}
        onOpenRoster={() => setIsRosterOpen(true)}
        onOpenLevelUp={() => setIsLevelUpOpen(true)}
        onOpenDiceRoller={() => setIsDiceRollerOpen(true)}
        onOpenLegalModal={() => setIsLegalModalOpen(true)}
        onPrint={handlePrint}
      />

      {/* Main Sheet Workspace */}
      <main className="app-main">
        {activeCharacter ? (
          viewMode === 'bg3_view' ? (
            <BG3CharacterInspector
              character={activeCharacter}
              onUpdateCharacter={handleUpdateCharacter}
              onOpenLevelUp={() => setIsLevelUpOpen(true)}
              onOpenRespecForge={() => {
                setEditingCharacter(activeCharacter);
                setIsCreationWizardOpen(true);
              }}
              onSwitchToTabletopSheet={() => setViewMode('sheet')}
              onRollCheck={handleRollCheck}
              onRollSave={handleRollSave}
              onRollSkill={handleRollSkill}
              onRollAttack={handleRollAttack}
              onCastSpell={handleCastSpell}
              onLongRest={handleLongRest}
            />
          ) : (
            <CharacterSheet
              character={activeCharacter}
              onUpdateCharacter={handleUpdateCharacter}
              onRollCheck={handleRollCheck}
              onRollSave={handleRollSave}
              onRollSkill={handleRollSkill}
              onRollAttack={handleRollAttack}
              onCastSpell={handleCastSpell}
              onLongRest={handleLongRest}
              onOpenAddAttack={() => setIsAddAttackOpen(true)}
              onOpenAddSpell={() => setIsAddSpellOpen(true)}
              onOpenAddFeature={() => setIsAddFeatureOpen(true)}
              onOpenAddItem={() => setIsAddItemOpen(true)}
            />
          )
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '1rem' }}>
              Welcome to D&amp;D 5e Character Forge
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
              Create a new character using the Baldur&rsquo;s Gate 3 inspired character creator or choose a sample hero.
            </p>
            <button
              type="button"
              className="bg3-btn-venture"
              style={{ maxWidth: '300px', margin: '0 auto' }}
              onClick={() => {
                setEditingCharacter(null);
                setIsCreationWizardOpen(true);
              }}
            >
              Venture Forth &amp; Create Hero
            </button>
          </div>
        )}
      </main>

      {/* Baldur's Gate 3 Character Creation / Respec Forge Modal */}
      <BG3CharacterBuilder
        isOpen={isCreationWizardOpen}
        initialCharacter={editingCharacter}
        onClose={() => {
          setIsCreationWizardOpen(false);
          setEditingCharacter(null);
        }}
        onCharacterCreated={handleCharacterSaved}
      />

      {/* Baldur's Gate 3 Level Up Modal */}
      <BG3LevelUpModal
        isOpen={isLevelUpOpen}
        onClose={() => setIsLevelUpOpen(false)}
        character={activeCharacter}
        onSaveLeveledCharacter={handleSaveLeveledCharacter}
      />

      {/* Character Roster / Vault Modal */}
      <CharacterRosterModal
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        characters={characters}
        activeCharacterId={activeCharacterId}
        onSelectCharacter={handleSelectCharacter}
        onDeleteCharacter={handleDeleteCharacter}
        onDuplicateCharacter={handleDuplicateCharacter}
        onOpenCreationWizard={() => {
          setIsRosterOpen(false);
          setEditingCharacter(null);
          setIsCreationWizardOpen(true);
        }}
        onImportCharacters={(imported) => {
          setCharacters(imported);
          if (imported.length > 0) setActiveCharId(imported[0].id);
        }}
      />

      {/* Dice Roller Tray Modal */}
      <DiceRollerModal
        isOpen={isDiceRollerOpen}
        onClose={() => setIsDiceRollerOpen(false)}
        onRollComplete={handleDiceTrayRoll}
      />

      {/* SRD Legal Modal */}
      <SrdLegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
      />

      {/* Custom Sub-entity Modals */}
      <CustomAttackModal
        isOpen={isAddAttackOpen}
        onClose={() => setIsAddAttackOpen(false)}
        onSaveAttack={handleSaveAttack}
      />

      <CustomSpellModal
        isOpen={isAddSpellOpen}
        onClose={() => setIsAddSpellOpen(false)}
        onSaveSpell={handleSaveSpell}
      />

      <CustomFeatureModal
        isOpen={isAddFeatureOpen}
        onClose={() => setIsAddFeatureOpen(false)}
        onSaveFeature={handleSaveFeature}
      />

      <CustomItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onSaveItem={handleSaveItem}
      />

      {/* Live Dice Roll Toast Feedback */}
      <DiceRollToast
        rollToast={rollToast}
        onDismiss={() => setRollToast(null)}
      />
    </div>
  );
}
