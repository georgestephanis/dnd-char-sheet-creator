# AGENTS.md — Development Guidelines for AI Agents & Contributors

This document defines the architectural principles, invariants, coding standards, and operational guidelines for agents working on the **D&D 5e Character Forge & Sheet Creator**.

---

## 🎯 1. Repository North Star & Architectural Invariants

1. **Pure Client-Side React Application**:
   - Built with **React 19** and **Vite**.
   - **Zero Server Storage**: All character data is strictly persisted client-side in the browser's `localStorage` (key: `dnd_characters_v1`). Never introduce backend databases, remote auth, or external server APIs for character storage.
   - Portable backup is provided via client-side JSON export and import in `src/utils/storage.js`.

2. **Dual Experience Model**:
   - **Baldur’s Gate 3 Aesthetic (`src/components/BG3/`)**: A rich, gothic obsidian/gold 3-pillar interface for character creation, in-game party member inspection, and level-up advancement.
   - **Tabletop 5e Printable Sheet (`src/components/Sheet/`)**: A high-density, classic 3-column D&D 5e character sheet designed for pen-and-paper tabletop gaming with dedicated `@media print` styling.

3. **SRD 5.1 & CC-BY-4.0 Compliance**:
   - Content included in static datasets (`src/data/`) must originate from the official **System Reference Document 5.1 (SRD 5.1)** released under **Creative Commons Attribution 4.0 International (CC-BY-4.0)**.
   - Do **NOT** hardcode non-SRD copyrighted intellectual property (e.g. non-SRD subclasses, proprietary monsters, or campaign-specific lore).
   - The UI is visually *inspired by* Baldur's Gate 3, but must not use its names, terms or assets in user-facing text: no "Tav", "Origin" heroes, "Venture Forth", BG3 weapon actions, companion names, or "BG3"/"Baldur's Gate" labels. `BG3*` component names and `bg3-` CSS classes are internal and fine.
   - Support homebrew and personal customization through the provided custom attack, spell, feature, and item creation modals.

---

## 🎨 2. Styling & Design Standards

1. **Vanilla CSS Only**:
   - Do **NOT** install or use Tailwind CSS unless explicitly requested by the user.
   - Global design tokens, typography, and tabletop print styles reside in `src/index.css`.
   - BG3 gothic filigree, glowing borders, card states, and inspector styles reside in `src/components/BG3/bg3.css`.

2. **Gothic BG3 Palette & Tokens**:
   - Dark obsidian radial gradients: `radial-gradient(circle at 50% 10%, #151b26 0%, #0b0e14 100%)`
   - Burnished gold filigree: `var(--border-gold)` (`#dfb85a`), `var(--accent-gold)` (`#eab308`), `var(--text-gold)` (`#ffd874`)
   - Card selection states: `1.5px solid var(--border-gold)` with top glowing accent bar (`::before`) and amber box-shadow.

3. **Print Isolation (`@media print`)**:
   - When printing via `window.print()`, all web chrome, navigation headers, action buttons, modals, and toasts must be hidden (`display: none !important`).
   - The printed output must cleanly paginate across standard US Letter and A4 paper in high-contrast black & white.

---

## 🛠️ 3. Environment & Build Commands

### Node.js & Path Setup
On macOS development environments where `node` or `npx` is managed via `nvm`, always ensure the PATH is exported before executing shell commands:
```bash
export PATH="/Users/georgestephanis/.nvm/versions/node/v22.22.2/bin:/opt/homebrew/bin:$PATH";
```

### Essential Commands
- **Start Development Server**: `npm run dev`. Vite prints the URL; it starts at 5173 (or `$PORT`) and moves to the next free port if that's taken, so never assume 5173.
- **Production Build Check**: `npm run build` (uses `vite build`). Always run this before completing complex tasks to verify zero bundling or syntax errors.
- **Preview Production Bundle**: `npm run preview`.

---

## 🧩 4. Data Flow & State Structure

### Character Schema (`Character` object)
A character is stored as a flat, portable JSON-serializable object:
```json
{
  "id": "char-1730000000000",
  "name": "Torvin Stonehelm",
  "raceId": "dwarf",
  "subraceId": "hill-dwarf",
  "raceName": "Hill Dwarf",
  "classId": "fighter",
  "className": "Fighter",
  "subclassId": "champion",
  "subclassName": "Champion",
  "level": 3,
  "backgroundId": "acolyte",
  "backgroundName": "Acolyte",
  "alignment": "Lawful Good",
  "player": "Adventurer",
  "abilityScores": { "str": 15, "dex": 12, "con": 14, "int": 8, "wis": 13, "cha": 10 },
  "racialBonuses": { "con": 2, "wis": 1 },
  "customAbilityBonuses": { "str": 0, "dex": 0, "con": 0, "int": 0, "wis": 0, "cha": 0 },
  "savingThrowsProficient": ["str", "con"],
  "skillProficiencies": ["Athletics", "Intimidation", "Perception", "Survival"],
  "expertiseSkills": [],
  "equippedArmor": { "name": "Chain Mail", "category": "Heavy", "ac": 16 },
  "equippedShield": true,
  "fightingStyle": "defense",
  "maxHp": 28,
  "currentHp": 28,
  "tempHp": 0,
  "hitDiceMax": "3d10",
  "hitDiceUsed": 0,
  "speed": 25,
  "attacks": [ ... ],
  "features": [ ... ],
  "spells": [ ... ],
  "spellSlotsUsed": [0, 0, 0, 0, 0, 0, 0, 0, 0],
  "equipment": [ ... ],
  "currency": { "cp": 0, "sp": 0, "ep": 0, "gp": 15, "pp": 0 },
  "personality": "...",
  "ideals": "...",
  "bonds": "...",
  "flaws": "...",
  "backstory": "...",
  "avatarIcon": "🛡️",
  "avatarUrl": ""
}
```

### Rules Engine (`src/utils/dndRules.js`)
All mathematical formulas and 5e mechanics must be kept in pure utility functions in `dndRules.js`:
- `getAbilityModifier(score)`: `Math.floor((score - 10) / 2)`
- `formatModifier(mod)`: `+3`, `-1`, `+0`
- `getProficiencyBonus(level)`: `Math.floor((level - 1) / 4) + 2`
- `calculateArmorClass(character, finalScores)`: Computes base AC (unarmored, light, medium, heavy armor) + Dexterity cap + Shield bonus + Defense fighting style.
- `getCarryingCapacity(strScore)`: `strScore * 15` lbs.
- `getSpellSlotsForClass(casterType, level)`: Progression tables for full casters (Wizard, Cleric, Druid, Bard, Sorcerer), half casters (Paladin, Ranger), and Pact Magic (Warlock). Takes a caster type (`'full' | 'half' | 'pact'`), **not** a class id — use `getSpellSlotsForCharacter(character)` from components.
- `findAvailableSlotIndex(maxSlots, slotsUsed, spellLevel)`: lowest free slot at or above a spell's level.
- `getSkillBonus(character, skillName, score)`: proficiency, expertise and Jack of All Trades; use it for passives too.
- `getHitDiceLabel(character)`, `parseDamageExpression(expr)`, `hasFeat(character, name)`.

---

## 💡 5. UX & Modern Web Guidance Rules

1. **Prevent Interactive Lockouts**:
   - In character creation, changing class or background must automatically sanitize and reconcile `selectedClassSkills` and `selectedSpells`. Never allow obsolete or out-of-class skills to remain in state and block new choices.
   - When skill selections are at maximum quota, clicking a new valid skill should swap out the oldest selection rather than silently blocking the user.

2. **Modal Dialogs & Scroll Containment**:
   - Follow modern web best practices for modal overlays. Set `overscroll-behavior: contain` on modal dialogs and backdrops (`dialog:modal`, `.modal-overlay`) to prevent scroll chaining to the underlying page.
   - Do **NOT** mutate root `overflow: hidden` on `<html>` or `<body>` as it causes layout shifts and scroll jumps.

3. **Accessibility & Responsive Fallbacks**:
   - Always ensure interactive buttons and cards have descriptive labels, `title` attributes, and keyboard focus outlines.
   - The 3-pillar BG3 layout gracefully collapses on smaller viewports (`@media (max-width: 1100px)` and `@media (max-width: 900px)`).

---

## 📦 6. Extending Content & Adding Features

- **Adding a New SRD Subclass or Feature**: Update `src/data/srdClasses.js` with the archetype name, description, and `featuresByLevel` map.
- **Adding a New Spell**: Add the spell record to `src/data/srdSpells.js` with `level`, `school`, `castingTime`, `range`, `classes`, and `description`.
- **Adding New Feats**: Add the entry to `src/data/srdFeats.js` (SRD 5.1 contains only Grappler; non-SRD feats belong in homebrew, not the dataset).
- **Detecting a feat in rules code**: use `hasFeat(character, 'Name')` from `dndRules.js`, not substring matches on feature names.

## 🧱 7. Component Conventions

- **Dialogs**: wrap every modal in `src/components/Common/Modal.jsx` (native `showModal()`), and mount it only while open (`{isOpen && <Modal…/>}`) so form state starts fresh.
- **Interactive elements**: use `<button type="button">`. Where a rich card must stay a `div`, add `role="button"`, `tabIndex={0}`, `onKeyDown={activateOnKey}` (from `src/utils/a11y.js`) and `aria-pressed` for selection state.
- **Hooks**: never call hooks after an early `return`; render an inner component instead.
- **Print**: hide inactive tabs with classes (not inline `display: none`) so `@media print` can reveal them.
