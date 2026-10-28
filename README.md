# D&D 5e Character Forge & Level-Up Sheet (SRD 5.1)

[![Try it live](https://img.shields.io/badge/try_it_live-dnd.stephanis.me-dfb85a?style=for-the-badge&labelColor=151b26)](https://dnd.stephanis.me)
[![License: CC BY 4.0 (SRD content)](https://img.shields.io/badge/SRD_5.1-CC_BY_4.0-0b0e14?style=for-the-badge&labelColor=151b26)](https://creativecommons.org/licenses/by/4.0/)

A responsive, client-side web application for creating, managing, leveling up, and printing **Dungeons & Dragons 5th Edition** characters using official **System Reference Document 5.1 (SRD 5.1)** content under Creative Commons (CC-BY-4.0).

Featuring a **guided character creation & level-up interface**, an **illustrated Adventurer View** for play, and a **high-density tabletop character sheet** cleanly styled for physical printing.

> **Design inspiration:** the creator and Adventurer View take visual cues from the character screens of *Baldur's Gate 3* (dark panels, gold filigree, a three-column layout). That's the only connection. This is an independent fan project, not affiliated with or endorsed by Larian Studios or Wizards of the Coast, and it uses no assets, names, or content from the game. All game content comes from the SRD 5.1.

---

## ✨ Features

### ⚔️ Character Creation Forge
- **3-Pillar Layout**: Step navigation on the left, interactive selection stage in the center, and live character summary inspector on the right with the golden *"Create Hero"* button.
- **Starting Point**: Build a custom adventurer or start from a sample hero (*Torvin Stonehelm*, *Altea Stardancer*, *Corin Underbough*).
- **Lineage & Subraces**: All 9 SRD races (Dwarf, Elf, Halfling, Human, Dragonborn, Gnome, Half-Elf, Half-Orc, Tiefling) with their SRD subraces (Hill Dwarf, High Elf, Lightfoot Halfling, Rock Gnome), traits, Darkvision, speeds, and Draconic ancestries.
- **12 Classes & Level 1 Disciplines**: Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard with fighting styles, divine domains, and patrons.
- **Ability Score Allocation**:
  - **Point Buy (27 Points)** with standard costs (8 to 15), live budget progress meter, and `[-]`/`[+]` spinners.
  - **⭐ Class Recommended (1-Click)**: Instantly assign optimal 27-point stats tailored to your class.
  - **Standard Array** (15, 14, 13, 12, 10, 8) and **Roll 4d6 Drop Lowest** with interactive dice rolls.
  - Clear **+2 / +1 racial bonus tags** and live modifier calculations.
- **Background & Skill Selection**: The SRD Acolyte background or a custom/homebrew background. Rogues choose their two Expertise skills. Auto-pruning prevents locked states when switching classes; locks granted background proficiencies with a shield badge and allows dynamic skill swapping.
- **Spells & Magic**: Starting Cantrips and 1st-level spells filtered by class with spell slot indicators.
- **Appearance & Identity**: Curated fantasy character avatar gallery, custom image URL input, alignment matrix, and a **Random Fantasy Name Generator (🎲)** tailored to your race.

---

### 🛡️ Adventurer View
- Inspect your active character in an illustrated, game-style character panel.
- **Live Vitals**: Interactive Hit Points bar with `+1`, `-1`, `+5`, `-5` quick adjustments, Temp HP, Armor Class, Initiative, and Speed.
- **Attribute & Skill Checks**: Click any ability or skill to roll 1d20 + modifier with animated toast feedback (saving throws roll from the tabletop sheet).
- **Weapons & Attacks**: Equipped weapons display to-hit bonuses and damage dice; click to roll.
- **Interactive Spell Slots**: Clickable pips to expend and restore spell slots level 1 through 9. Casting uses the lowest free slot at or above the spell's level.
- **Carrying Capacity**: Live encumbrance meter tracking backpack gear weight against Strength capacity.
- **Forge / Respec Button**: Re-open any character in the Character Forge to re-allocate stats, equipment, or spells.

---

### 📜 Printable Tabletop Character Sheet
- High-density, 3-column classic 5e sheet layout with tabbed views: **Combat & Core**, **Features & Traits**, **Inventory & Equipment**, **Spellbook**, and **Roleplay & Backstory**.
- **Print-Ready (`@media print`)**: Prints all three pages (Core, Spellbook, Roleplay) on US Letter or A4 from either view. Web chrome, buttons, headers, and tabs are stripped, producing a clean, high-contrast, black-and-white physical character sheet.

---

### 📈 Level-Up Advancement
- Advance characters one level at a time from Level 1 to 20 (with *Level Up & Continue* for several levels):
  - **Hit Points Increase**: Choose "Take Average" or "Roll 1dHitDie live" with animated dice rolling.
  - **Class Features Unlocked**: Automatic breakdown of all features granted at the new level.
  - **Subclass Selection**: Prompts when reaching your class's archetype level (e.g. Level 3 for Fighter/Rogue, Level 2 for Wizard).
  - **ASI & Feats**: Choose between +2 to one ability, +1 to two abilities, or a Feat (SRD 5.1 includes Grappler).
  - **Live Before ➔ After Diff**: Right-hand inspector displays real-time before/after stat increases.

---

### 🔒 Privacy & Local Vault
- **100% Client-Side**: No account needed, no server storage, zero data sent to external servers.
- **LocalStorage Persistence**: Characters automatically save to local storage (`dnd_characters_v1`).
- **Export & Import**: Export single characters or your entire roster as portable JSON files, with full import support.
- **Custom Homebrew**: Add custom attacks, spells, features, and inventory items.

---

## 🚀 Getting Started

Just want to roll up a hero? Try it in your browser at **[dnd.stephanis.me](https://dnd.stephanis.me)**. No install needed, and characters stay in your browser's local storage.

### Prerequisites
- Node.js (v18.0.0 or higher, v20+ recommended)
- npm or pnpm

### Installation
```bash
# Clone repository
git clone https://github.com/georgestephanis/dnd-char-sheet-creator.git
cd dnd-char-sheet-creator

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173/`). If that port is busy, Vite picks the next free one automatically; set `PORT=4000 npm run dev` to choose one yourself.

### Building for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
dnd-char-sheet-creator/
├── src/
│   ├── components/
│   │   ├── BG3/
│   │   │   ├── BG3CharacterBuilder.jsx    # 3-pillar character creation forge
│   │   │   ├── BG3CharacterInspector.jsx  # Adventurer View character panel
│   │   │   ├── BG3LevelUpModal.jsx        # Level-up advancement modal
│   │   │   └── bg3.css                    # Gothic obsidian, gold filigree & ornate styles
│   │   ├── Sheet/
│   │   │   ├── CharacterSheet.jsx         # Tabletop 5e main sheet container
│   │   │   ├── AbilityScores.jsx          # Ability scores & modifiers
│   │   │   ├── CombatVitals.jsx           # HP, AC, Initiative, Speed, Hit Dice
│   │   │   ├── AttacksSection.jsx         # Weapons & attack actions
│   │   │   ├── SpellsSheet.jsx            # Spellbook & spell slot tracking
│   │   │   └── ...                        # Features, Inventory, Roleplay, Skills
│   │   ├── Common/
│   │   │   ├── Modal.jsx                  # Shared native <dialog> (showModal, Escape, focus return)
│   │   │   └── DiceRollToast.jsx          # Roll result toast (live region)
│   │   ├── Modals/
│   │   │   ├── DiceRollerModal.jsx        # 3D interactive dice tray
│   │   │   ├── SrdLegalModal.jsx          # SRD 5.1 CC-BY-4.0 attribution
│   │   │   └── Custom*Modal.jsx           # Custom attack, spell, feature & item builders
│   │   ├── CharacterRosterModal.jsx       # Roster vault, JSON export & import
│   │   ├── Header.jsx                     # Top bar: Tabletop vs Adventurer View, Level Up, + New Hero
│   │   └── ...
│   ├── data/
│   │   ├── srdRaces.js                    # 9 SRD races, SRD subraces, traits & stat bonuses
│   │   ├── srdClasses.js                  # 12 SRD classes, archetypes & level 1-20 features
│   │   ├── srdBackgrounds.js              # SRD backgrounds, skill proficiencies & features
│   │   ├── srdFeats.js                    # SRD feats (Grappler)
│   │   ├── srdSpells.js                   # SRD spell library (Cantrips through 5th level)
│   │   ├── srdEquipment.js                # Weapons, armor, packs & gear
│   │   └── sampleCharacters.js            # Starter heroes (Torvin, Altea, Corin)
│   ├── utils/
│   │   ├── dndRules.js                    # Modifiers, AC, skills, slots, carrying capacity, point buy
│   │   ├── a11y.js                        # Keyboard activation helper for role="button" elements
│   │   └── storage.js                     # LocalStorage CRUD, export/import & character tracking
│   ├── App.jsx                            # Root application component
│   └── index.css                          # Core design system & print stylesheet (@media print)
└── package.json
```

---

## ⚖️ Legal & SRD 5.1 Attribution

This work includes material taken from the **System Reference Document 5.1 (“SRD 5.1”)** by Wizards of the Coast LLC, available at [https://dnd.wizards.com/resources/systems-reference-document](https://dnd.wizards.com/resources/systems-reference-document). 

The SRD 5.1 is licensed under the **Creative Commons Attribution 4.0 International License (CC-BY-4.0)**, available at [https://creativecommons.org/licenses/by/4.0/legalcode](https://creativecommons.org/licenses/by/4.0/legalcode).

*Dungeons & Dragons* and *D&D* are registered trademarks of Wizards of the Coast LLC. This project is an independent community tool and is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC or Larian Studios.
