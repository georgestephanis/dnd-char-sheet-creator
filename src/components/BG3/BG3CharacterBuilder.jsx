import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import {
  Shield, Sword, Wand2, Sparkles, User, BookOpen, Check, Dices, Star, ChevronRight,
  ChevronLeft, Award, ArrowLeft, RefreshCw
} from 'lucide-react';
import { SAMPLE_CHARACTERS } from '../../data/sampleCharacters';
import { getRuleset, DEFAULT_SRD_VERSION } from '../../data/rulesets';
import { generateCharacterId } from '../../utils/storage';
import {
  POINT_BUY_COSTS, POINT_BUY_TOTAL, roll4d6DropLowest, getAbilityModifier,
  formatModifier, calculateArmorClass
} from '../../utils/dndRules';
import { activateOnKey } from '../../utils/a11y';

// Recommended 27-point buy scores per class (5e optimal arrays)
const CLASS_RECOMMENDED_SCORES = {
  barbarian: { str: 15, con: 14, dex: 13, wis: 12, cha: 10, int: 8 },
  bard: { cha: 15, dex: 14, con: 13, wis: 12, int: 10, str: 8 },
  cleric: { wis: 15, con: 14, str: 13, dex: 12, cha: 10, int: 8 },
  druid: { wis: 15, con: 14, dex: 13, int: 12, cha: 10, str: 8 },
  fighter: { str: 15, con: 14, dex: 13, wis: 12, cha: 10, int: 8 },
  monk: { dex: 15, wis: 14, con: 13, str: 12, int: 10, cha: 8 },
  paladin: { str: 15, cha: 14, con: 13, wis: 12, dex: 10, int: 8 },
  ranger: { dex: 15, wis: 14, con: 13, str: 12, int: 10, cha: 8 },
  rogue: { dex: 15, con: 14, int: 13, wis: 12, cha: 10, str: 8 },
  sorcerer: { cha: 15, con: 14, dex: 13, wis: 12, int: 10, str: 8 },
  warlock: { cha: 15, con: 14, dex: 13, wis: 12, int: 10, str: 8 },
  wizard: { int: 15, dex: 14, con: 13, wis: 12, cha: 10, str: 8 },
};

// Original names for the random name generator (no names from published settings or games)
const FANTASY_NAMES = {
  dwarf: ['Torvin', 'Helgrid', 'Bramdur', 'Kethra', 'Orvald', 'Dagny', 'Rurik', 'Sigra', 'Thrandal', 'Moira'],
  elf: ['Altea', 'Ilvaris', 'Saelith', 'Thenwyn', 'Faelor', 'Yselle', 'Caerith', 'Lithriel', 'Arvanis', 'Nymara'],
  human: ['Maren', 'Rowan', 'Mira', 'Aldric', 'Seraphina', 'Joren', 'Talia', 'Corwin', 'Elena', 'Bastian'],
  tiefling: ['Ashka', 'Ruin', 'Vexis', 'Morrow', 'Nyxara', 'Cinder', 'Sarrowyn', 'Hollow', 'Vesper', 'Solace'],
  halfling: ['Corin', 'Pip', 'Tamsin', 'Wendel', 'Marigold', 'Odo', 'Fennick', 'Rosie', 'Barley', 'Clover'],
  dragonborn: ['Kaurax', 'Vyrsha', 'Thoravek', 'Sarnith', 'Draxis', 'Ylsira', 'Gorvath', 'Rhessa', 'Torrak', 'Ixalia'],
  gnome: ['Fizzwick', 'Nim', 'Tibble', 'Quillon', 'Dabber', 'Lissel', 'Wobblenock', 'Pellin', 'Zinnia', 'Glim'],
  'half-elf': ['Sorrel', 'Kaelen', 'Avelyn', 'Doran', 'Liora', 'Merrick', 'Isra', 'Tobin', 'Calla', 'Riven'],
  'half-orc': ['Grask', 'Murga', 'Thokra', 'Brul', 'Vashka', 'Korrin', 'Ugra', 'Drak', 'Hesk', 'Orla']
};

const FANTASY_AVATARS = [
  { id: 'av-knight', label: 'Knight', icon: '🛡️', role: 'Paladin / Fighter' },
  { id: 'av-wizard', label: 'Mage', icon: '🧙‍♂️', role: 'Wizard / Sorcerer' },
  { id: 'av-rogue', label: 'Rogue', icon: '🗡️', role: 'Rogue / Assassin' },
  { id: 'av-ranger', label: 'Ranger', icon: '🏹', role: 'Ranger / Scout' },
  { id: 'av-cleric', label: 'Cleric', icon: '✨', role: 'Cleric / Healer' },
  { id: 'av-druid', label: 'Druid', icon: '🌿', role: 'Druid / Shaman' },
  { id: 'av-barbarian', label: 'Barbarian', icon: '🪓', role: 'Barbarian / Berserker' },
  { id: 'av-bard', label: 'Bard', icon: '🎶', role: 'Bard / Skald' },
  { id: 'av-warlock', label: 'Warlock', icon: '👁️', role: 'Warlock / Occultist' },
  { id: 'av-monk', label: 'Monk', icon: '🥋', role: 'Monk / Ascetic' },
  { id: 'av-dragonborn', label: 'Dragonborn', icon: '🐉', role: 'Draconic Champion' },
  { id: 'av-tiefling', label: 'Tiefling', icon: '😈', role: 'Fiendish Spellblade' },
  { id: 'av-dwarf', label: 'Dwarf', icon: '🧔', role: 'Dwarven Thane' },
  { id: 'av-elf', label: 'Elf', icon: '🧝‍♀️', role: 'Elven Noble' }
];

export default function BG3CharacterBuilder({
  isOpen,
  onClose,
  onCharacterCreated,
  initialCharacter = null
}) {
  // The SRD version is fixed per character: chosen at creation, kept on respec
  const [srdVersion] = useState(initialCharacter?.srdVersion || DEFAULT_SRD_VERSION);
  const ruleset = getRuleset(srdVersion);
  const { races: SRD_RACES, classes: SRD_CLASSES, backgrounds: SRD_BACKGROUNDS, spells: SRD_SPELLS } = ruleset;

  const [activeTab, setActiveTab] = useState('origin'); // 'origin', 'race', 'class', 'abilities', 'background', 'skills', 'spells', 'equipment', 'identity'

  // Origin Type
  const [originType, setOriginType] = useState('custom'); // 'custom' or preset character id

  // Identity
  const [charName, setCharName] = useState('Adventurer');
  const [playerName, setPlayerName] = useState('Player');
  const [alignment, setAlignment] = useState('Neutral Good');
  const [avatarIcon, setAvatarIcon] = useState('⚔️');
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');

  // Race
  const [selectedRaceId, setSelectedRaceId] = useState('human');
  const [selectedSubraceId, setSelectedSubraceId] = useState('');
  const [dragonbornAncestry, setDragonbornAncestry] = useState('Red');

  // Class & Level
  const [selectedClassId, setSelectedClassId] = useState('fighter');
  const [startingLevel, setStartingLevel] = useState(1);
  const [selectedSubclassId, setSelectedSubclassId] = useState('');
  const [fightingStyle, setFightingStyle] = useState('defense');

  // Ability Scores
  const [scoreMethod, setScoreMethod] = useState('pointbuy'); // 'pointbuy', 'standard', 'roll', 'manual'
  const [pointBuyScores, setPointBuyScores] = useState({ str: 14, dex: 13, con: 14, int: 10, wis: 12, cha: 10 });
  const [baseScores, setBaseScores] = useState({ str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 });

  // Background
  const [selectedBackgroundId, setSelectedBackgroundId] = useState('acolyte');

  // Skills
  const [selectedClassSkills, setSelectedClassSkills] = useState(['Athletics', 'Perception']);
  const [selectedExpertise, setSelectedExpertise] = useState([]);

  // Spells
  const [selectedCantrips, setSelectedCantrips] = useState([]);
  const [selectedFirstLevelSpells, setSelectedFirstLevelSpells] = useState([]);

  // Equipment package
  const [selectedEquipIndex, setSelectedEquipIndex] = useState(0);

  // If initialCharacter is provided, populate state once (the builder is remounted per opening)
  useEffect(() => {
    if (initialCharacter) {
      // Look up the character's own ruleset so this effect doesn't depend on render state
      const { races: savedRaces, classes: savedClasses, backgrounds: savedBackgrounds, spells: savedSpells } =
        getRuleset(initialCharacter.srdVersion);
      setCharName(initialCharacter.name || 'Adventurer');
      setPlayerName(initialCharacter.player || 'Player');
      setAlignment(initialCharacter.alignment || 'Neutral Good');
      setAvatarIcon(initialCharacter.avatarIcon || '⚔️');
      setCustomAvatarUrl(initialCharacter.avatarUrl || '');
      // Saved ids may refer to content removed from the SRD dataset; resolve them so the
      // selected cards match what will actually be saved
      const race = savedRaces.find(r => r.id === initialCharacter.raceId) || savedRaces.find(r => r.id === 'human');
      const subrace = race.subraces?.find(sr => sr.id === initialCharacter.subraceId) || race.subraces?.[0];
      setSelectedRaceId(race.id);
      setSelectedSubraceId(subrace?.id || '');
      setSelectedClassId(initialCharacter.classId || 'fighter');
      setSelectedSubclassId(initialCharacter.subclassId || '');
      setStartingLevel(initialCharacter.level || 1);
      // Removed backgrounds become Custom so the character keeps a homebrew background
      setSelectedBackgroundId(
        savedBackgrounds.some(bg => bg.id === initialCharacter.backgroundId)
          ? initialCharacter.backgroundId
          : (initialCharacter.backgroundId ? 'custom' : 'acolyte')
      );
      if (initialCharacter.abilityScores) {
        const stored = { ...initialCharacter.abilityScores };
        const values = Object.values(stored);
        const isPointBuy = values.every(v => POINT_BUY_COSTS[v] !== undefined) &&
          values.reduce((acc, v) => acc + POINT_BUY_COSTS[v], 0) === POINT_BUY_TOTAL;
        // Only seed point buy with scores it can represent; otherwise keep its valid default
        if (isPointBuy) setPointBuyScores(stored);
        setBaseScores(stored);
        // Rolled or hand-entered scores can't be represented as a 27-point buy
        setScoreMethod(isPointBuy ? 'pointbuy' : 'roll');
      }
      if (initialCharacter.skillProficiencies) {
        // Background skills are re-added on save; only class picks belong in this list
        const bg = savedBackgrounds.find(b => b.id === initialCharacter.backgroundId);
        const bgSkills = bg?.skillProficiencies || [];
        // Keep only skills this class can pick, up to its quota, so the step starts out valid
        const loadedClass = savedClasses.find(c => c.id === initialCharacter.classId);
        const classOptions = loadedClass?.skillChoices?.options || [];
        const quota = loadedClass?.skillChoices?.count || 2;
        setSelectedClassSkills(
          initialCharacter.skillProficiencies
            .filter(sk => !bgSkills.includes(sk) && classOptions.includes(sk))
            .slice(0, quota)
        );
      }
      if (initialCharacter.expertiseSkills) {
        setSelectedExpertise([...initialCharacter.expertiseSkills]);
      }
      if (initialCharacter.fightingStyle) {
        setFightingStyle(initialCharacter.fightingStyle);
      }
      // Only preselect SRD spells on this class's list; others stay on the sheet untouched
      const knownSpells = initialCharacter.spells || [];
      const isClassSpell = (sp) => savedSpells.some(s => s.id === sp.id && s.classes.includes(initialCharacter.classId));
      setSelectedCantrips(knownSpells.filter(sp => sp.level === 0 && isClassSpell(sp)).map(sp => sp.id));
      setSelectedFirstLevelSpells(knownSpells.filter(sp => sp.level === 1 && isClassSpell(sp)).map(sp => sp.id));
      setOriginType('custom');
    }
  }, [initialCharacter]);

  if (!isOpen) return null;

  const currentRace = SRD_RACES.find(r => r.id === selectedRaceId) || SRD_RACES[0];
  const currentSubrace = currentRace.subraces?.find(s => s.id === selectedSubraceId) || currentRace.subraces?.[0];
  const currentClass = SRD_CLASSES.find(c => c.id === selectedClassId) || SRD_CLASSES[0];
  const currentBackground = SRD_BACKGROUNDS.find(b => b.id === selectedBackgroundId) || SRD_BACKGROUNDS[0];

  // Calculate racial bonuses
  const racialBonuses = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
  if (currentRace.abilityScoreBonuses) {
    Object.entries(currentRace.abilityScoreBonuses).forEach(([k, v]) => {
      racialBonuses[k] = (racialBonuses[k] || 0) + v;
    });
  }
  if (currentSubrace?.abilityScoreBonuses) {
    Object.entries(currentSubrace.abilityScoreBonuses).forEach(([k, v]) => {
      racialBonuses[k] = (racialBonuses[k] || 0) + v;
    });
  }

  // Active base scores depending on method
  const activeBaseScores = scoreMethod === 'pointbuy' ? pointBuyScores : baseScores;

  // Final scores & modifiers
  const finalScores = {};
  for (const ab of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
    finalScores[ab] = (activeBaseScores[ab] || 10) + (racialBonuses[ab] || 0);
  }

  // Point buy budget math
  const pointBuySpent = Object.values(pointBuyScores).reduce((acc, score) => {
    return acc + (POINT_BUY_COSTS[score] ?? 0);
  }, 0);
  const pointBuyRemaining = POINT_BUY_TOTAL - pointBuySpent;

  const handlePointBuyChange = (ab, delta) => {
    const current = pointBuyScores[ab] || 8;
    const target = current + delta;
    if (target < 8 || target > 15) return;
    const currentCost = POINT_BUY_COSTS[current];
    const targetCost = POINT_BUY_COSTS[target];
    const costDiff = targetCost - currentCost;
    if (pointBuyRemaining - costDiff < 0) return;

    setPointBuyScores(prev => ({ ...prev, [ab]: target }));
  };

  const handleApplyClassRecommendedScores = () => {
    const rec = CLASS_RECOMMENDED_SCORES[currentClass.id] || CLASS_RECOMMENDED_SCORES.fighter;
    setPointBuyScores({ ...rec });
    setScoreMethod('pointbuy');
  };

  const handleResetScoresToEight = () => {
    setPointBuyScores({ str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 });
    setScoreMethod('pointbuy');
  };

  const handleRollAllScores = () => {
    const newScores = {};
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(ab => {
      newScores[ab] = roll4d6DropLowest().total;
    });
    setBaseScores(newScores);
    setScoreMethod('roll');
  };

  // Class Selection Handler: Cleans up skills, spells, equipment
  const handleSelectClass = (classId) => {
    const newClass = SRD_CLASSES.find(c => c.id === classId);
    if (!newClass) return;

    setSelectedClassId(classId);
    setSelectedSubclassId(newClass.subclasses?.[0]?.id || '');

    // Reconcile skills: keep any currently selected class skills that are valid for the new class
    const availableOptions = newClass.skillChoices?.options || [];
    const bgSkills = currentBackground.skillProficiencies || [];
    const preserved = selectedClassSkills.filter(sk => availableOptions.includes(sk) && !bgSkills.includes(sk));

    const countNeeded = newClass.skillChoices?.count || 2;
    const neededMore = countNeeded - preserved.length;
    const candidateSkills = availableOptions.filter(sk => !bgSkills.includes(sk) && !preserved.includes(sk));
    const nextSkills = [...preserved, ...candidateSkills.slice(0, Math.max(0, neededMore))];
    setSelectedClassSkills(nextSkills);

    // Reconcile spells
    if (newClass.spellcaster) {
      const classCantrips = SRD_SPELLS.filter(s => s.level === 0 && s.classes.includes(classId));
      setSelectedCantrips(classCantrips.slice(0, 3).map(s => s.id));
      const classLevel1 = SRD_SPELLS.filter(s => s.level === 1 && s.classes.includes(classId));
      setSelectedFirstLevelSpells(classLevel1.slice(0, 4).map(s => s.id));
    } else {
      setSelectedCantrips([]);
      setSelectedFirstLevelSpells([]);
    }

    setSelectedEquipIndex(0);
  };

  // Background Selection Handler
  const handleSelectBackground = (bgId) => {
    const newBg = SRD_BACKGROUNDS.find(b => b.id === bgId);
    if (!newBg) return;

    setSelectedBackgroundId(bgId);

    const bgSkills = newBg.skillProficiencies || [];
    const availableClassOptions = currentClass.skillChoices?.options || [];
    const preserved = selectedClassSkills.filter(sk => !bgSkills.includes(sk) && availableClassOptions.includes(sk));
    const countNeeded = currentClass.skillChoices?.count || 2;
    const neededMore = countNeeded - preserved.length;
    const candidates = availableClassOptions.filter(sk => !bgSkills.includes(sk) && !preserved.includes(sk));

    setSelectedClassSkills([...preserved, ...candidates.slice(0, Math.max(0, neededMore))]);
  };

  // Skill Toggle Handler: prevents lockouts by swapping if full
  const handleToggleSkill = (sk) => {
    const isBgSkill = currentBackground.skillProficiencies?.includes(sk);
    if (isBgSkill) return;

    const isSelected = selectedClassSkills.includes(sk);
    const maxCount = currentClass.skillChoices?.count || 2;

    if (isSelected) {
      setSelectedClassSkills(prev => prev.filter(s => s !== sk));
    } else {
      if (selectedClassSkills.length < maxCount) {
        setSelectedClassSkills(prev => [...prev, sk]);
      } else {
        // Swap oldest selected skill to maintain intuitive interactivity
        setSelectedClassSkills(prev => [...prev.slice(1), sk]);
      }
    }
  };

  // Load a sample starter hero
  const handleSelectOrigin = (originId) => {
    if (originId === 'custom') {
      setOriginType('custom');
      return;
    }
    const sample = SAMPLE_CHARACTERS.find(s => s.id === originId);
    if (sample) {
      setOriginType(originId);
      setCharName(sample.name);
      setAlignment(sample.alignment);
      setSelectedRaceId(sample.raceId);
      setSelectedSubraceId(sample.subraceId || '');
      setSelectedClassId(sample.classId);
      setSelectedSubclassId(sample.subclassId || '');
      setSelectedBackgroundId(sample.backgroundId);
      setPointBuyScores({ ...sample.abilityScores });
      setBaseScores({ ...sample.abilityScores });
      setSelectedClassSkills([...sample.skillProficiencies]);
    }
  };

  // Random Fantasy Name Generator
  const handleRandomizeName = () => {
    const racePool = FANTASY_NAMES[selectedRaceId] || FANTASY_NAMES.human;
    const rand = racePool[Math.floor(Math.random() * racePool.length)];
    setCharName(rand);
  };

  // Vitals calculation for right inspector
  const conMod = getAbilityModifier(finalScores.con);
  const dexMod = getAbilityModifier(finalScores.dex);
  const isHillDwarf = currentSubrace?.id === 'hill-dwarf';
  const bonusHpPerLevel = isHillDwarf ? 1 : 0;
  const startingHp = (currentClass.hitDie || 8) + conMod + bonusHpPerLevel;
  const speed = currentSubrace?.speed || currentRace.speed || 30;

  // A subclass is only chosen once the character reaches the class's subclass level
  const subclassLevel = currentClass.subclassLevel || 3;
  const isSubclassAvailable = startingLevel >= subclassLevel;
  const effectiveSubclass = isSubclassAvailable
    ? (currentClass.subclasses?.find(s => s.id === selectedSubclassId) || currentClass.subclasses?.[0] || null)
    : null;

  // Mock character for AC calculation
  const mockChar = {
    classId: currentClass.id,
    subclassId: effectiveSubclass?.id || '',
    equippedArmor: currentClass.id === 'fighter' || currentClass.id === 'paladin'
      ? { ac: 16, category: 'Heavy' }
      : currentClass.id === 'rogue' || currentClass.id === 'ranger'
      ? { ac: 11, category: 'Light' }
      : null,
    equippedShield: currentClass.id === 'fighter' || currentClass.id === 'cleric',
    fightingStyle: fightingStyle
  };
  const calculatedAc = calculateArmorClass(mockChar, finalScores);

  // Validation checks for pillar badges
  // Rogues choose two proficient skills for Expertise at 1st level
  const expertiseCount = currentClass.id === 'rogue' ? 2 : 0;
  const allProficientSkills = Array.from(new Set([...(currentBackground.skillProficiencies || []), ...selectedClassSkills]));
  const validExpertise = selectedExpertise.filter(sk => allProficientSkills.includes(sk)).slice(0, expertiseCount);
  const handleToggleExpertise = (sk) => {
    if (validExpertise.includes(sk)) {
      setSelectedExpertise(validExpertise.filter(s => s !== sk));
    } else if (validExpertise.length < expertiseCount) {
      setSelectedExpertise([...validExpertise, sk]);
    } else {
      setSelectedExpertise([...validExpertise.slice(1), sk]);
    }
  };

  const isSkillsComplete = selectedClassSkills.length === (currentClass.skillChoices?.count || 2) &&
    validExpertise.length === expertiseCount;
  const isAbilitiesComplete = scoreMethod === 'pointbuy' ? pointBuyRemaining === 0 : true;

  // Handle finalize character
  const handleVentureForth = () => {
    const features = [];
    currentRace.traits?.forEach((t, i) => {
      features.push({ id: `rf-${i}`, name: t.name, source: currentRace.name, description: t.description });
    });
    currentSubrace?.traits?.forEach((st, i) => {
      features.push({ id: `srf-${i}`, name: st.name, source: currentSubrace.name, description: st.description });
    });
    if (currentClass.featuresByLevel?.[1]) {
      currentClass.featuresByLevel[1].forEach((cf, i) => {
        features.push({ id: `cf-1-${i}`, name: cf.name, source: `${currentClass.name} (Lvl 1)`, description: cf.description });
      });
    }
    // Cleric, Sorcerer and Warlock pick their subclass at 1st level and gain its features then
    if (effectiveSubclass && subclassLevel === 1) {
      (effectiveSubclass.featuresByLevel?.[1] || []).forEach((sf, i) => {
        features.push({ id: `scf-1-${i}`, name: sf.name, source: `${effectiveSubclass.name} (Lvl 1)`, description: sf.description });
      });
    }
    // Custom backgrounds only carry a placeholder feature; don't add it to the sheet
    if (currentBackground.feature && !currentBackground.isCustom) {
      features.push({
        id: `bg-feat`,
        name: currentBackground.feature.name,
        source: `Background (${currentBackground.name})`,
        description: currentBackground.feature.description
      });
    }

    const attacks = [];
    if (currentClass.startingEquipmentPackages?.[selectedEquipIndex]) {
      const pack = currentClass.startingEquipmentPackages[selectedEquipIndex];
      pack.items.forEach((item, idx) => {
        if (item.includes('Sword') || item.includes('Bow') || item.includes('Axe') || item.includes('Staff') || item.includes('Dagger') || item.includes('Crossbow')) {
          const isDex = item.includes('Bow') || item.includes('Crossbow') || item.includes('Dagger') || item.includes('Rapier');
          attacks.push({
            id: `atk-init-${idx}`,
            name: item,
            ability: isDex ? 'dex' : 'str',
            isProficient: true,
            bonusToHit: 0,
            damageDice: item.includes('Greataxe') ? '1d12' : item.includes('Greatsword') ? '2d6' : item.includes('Dagger') ? '1d4' : '1d8',
            damageType: item.includes('Bow') || item.includes('Crossbow') || item.includes('Dagger') ? 'piercing' : 'slashing',
            notes: isDex ? 'Finesse / Ranged' : 'Melee'
          });
        }
      });
    }
    if (attacks.length === 0) {
      attacks.push({
        id: 'atk-unarmed',
        name: 'Unarmed Strike',
        ability: 'str',
        isProficient: true,
        bonusToHit: 0,
        damageDice: '1',
        damageType: 'bludgeoning',
        notes: 'Melee weapon attack'
      });
    }

    const inventory = [];
    if (currentClass.startingEquipmentPackages?.[selectedEquipIndex]) {
      currentClass.startingEquipmentPackages[selectedEquipIndex].items.forEach((it, idx) => {
        inventory.push({ id: `eq-${idx}`, name: it, quantity: 1, weight: 3, equipped: idx < 2 });
      });
    }

    const spells = [];
    selectedCantrips.forEach(id => {
      const sp = SRD_SPELLS.find(s => s.id === id);
      if (sp) spells.push({ ...sp, prepared: true });
    });
    selectedFirstLevelSpells.forEach(id => {
      const sp = SRD_SPELLS.find(s => s.id === id);
      if (sp) spells.push({ ...sp, prepared: true });
    });

    const newCharacter = {
      id: initialCharacter?.id || generateCharacterId(),
      srdVersion,
      name: charName.trim() || 'Adventurer',
      raceId: currentRace.id,
      subraceId: currentSubrace?.id || '',
      raceName: currentSubrace?.name || currentRace.name,
      classId: currentClass.id,
      className: currentClass.name,
      subclassId: effectiveSubclass?.id || '',
      subclassName: effectiveSubclass?.name || '',
      level: startingLevel,
      backgroundId: currentBackground.id,
      backgroundName: currentBackground.name,
      alignment,
      player: playerName.trim() || 'Player',
      xp: '0',
      inspiration: false,
      abilityScores: activeBaseScores,
      racialBonuses,
      customAbilityBonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
      savingThrowsProficient: currentClass.savingThrows || ['str', 'con'],
      skillProficiencies: allProficientSkills,
      expertiseSkills: validExpertise,
      equippedArmor: mockChar.equippedArmor,
      equippedShield: mockChar.equippedShield,
      fightingStyle: fightingStyle,
      maxHp: startingHp,
      currentHp: startingHp,
      tempHp: 0,
      hitDiceMax: `${startingLevel}d${currentClass.hitDie || 8}`,
      hitDiceUsed: 0,
      speed: speed,
      deathSaves: { successes: 0, failures: 0 },
      exhaustion: 0,
      attacks,
      features,
      spells,
      spellSlotsUsed: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      equipment: inventory,
      currency: { cp: 0, sp: 0, ep: 0, gp: currentBackground.gold || 15, pp: 0 },
      proficienciesText: `Armor: ${currentClass.armorProficiencies?.join(', ') || 'None'}\nWeapons: ${currentClass.weaponProficiencies?.join(', ') || 'Simple'}\nLanguages: ${currentRace.languages?.join(', ')}`,
      personality: currentBackground.suggestedCharacteristics?.traits?.[0] || '',
      ideals: currentBackground.suggestedCharacteristics?.ideals?.[0] || '',
      bonds: currentBackground.suggestedCharacteristics?.bonds?.[0] || '',
      flaws: currentBackground.suggestedCharacteristics?.flaws?.[0] || '',
      backstory: '',
      avatarIcon: avatarIcon,
      avatarUrl: customAvatarUrl
    };

    onCharacterCreated(initialCharacter ? mergeRespec(initialCharacter, newCharacter) : newCharacter);
    onClose();
  };

  // A respec re-derives what the builder controls and keeps everything else the character earned
  const mergeRespec = (existing, rebuilt) => {
    const classChanged = existing.classId !== rebuilt.classId;
    const builderSpellIds = new Set(rebuilt.spells.map(sp => sp.id));
    const isBuilderFeature = (f) => /^(rf-|srf-|cf-1-|scf-1-|bg-feat|vf-1)/.test(f.id || ''); // vf-1: legacy Variant Human feat
    const subclassChanged = (existing.subclassId || '') !== (rebuilt.subclassId || '');
    // Level-up subclass features use sf- ids; older/sample data marks them by source instead
    const oldSubclassName = (existing.subclassName || '').toLowerCase();
    const isSubclassLevelFeature = (f) =>
      /^sf-/.test(f.id || '') ||
      /^subclass\b/i.test(f.source || '') ||
      (oldSubclassName && (f.source || '').toLowerCase().startsWith(oldSubclassName));
    const isClassLevelFeature = (f) => /^(f-|sf-)/.test(f.id || '');

    // Also drop older copies of features the builder just regenerated (e.g. sample characters' own ids)
    const rebuiltNames = new Set(rebuilt.features.map(f => (f.name || '').toLowerCase()));
    const keptFeatures = (existing.features || []).filter(f =>
      !isBuilderFeature(f) &&
      !(classChanged && isClassLevelFeature(f)) &&
      !(subclassChanged && isSubclassLevelFeature(f)) &&
      !rebuiltNames.has((f.name || '').toLowerCase())
    );
    const keptSpells = (existing.spells || []).filter(sp =>
      // Drop only spells the builder offered (this class's SRD cantrips/1st-level) and that were deselected
      !builderSpellIds.has(sp.id) &&
      !((sp.level === 0 || sp.level === 1) && SRD_SPELLS.some(s => s.id === sp.id && s.classes.includes(existing.classId)))
    );

    // Max HP: level-1 value plus the fixed average for each further level
    const hitDie = currentClass.hitDie || 8;
    // Tough grants +2 HP per level including 1st, so it's added for every level separately
    const hasTough = keptFeatures.some(f => /^feat:\s*tough$/i.test(f.name || ''));
    const level = rebuilt.level || 1;
    // Same rules as level-up: each level grants at least 1 HP
    const toughPerLevel = hasTough ? 2 : 0;
    // CON for HP includes the ASI/feat bonuses this respec preserves
    const hpConMod = getAbilityModifier(finalScores.con + (existing.customAbilityBonuses?.con || 0));
    const firstLevelHp = Math.max(1, (currentClass.hitDie || 8) + hpConMod + bonusHpPerLevel + toughPerLevel);
    const perLevelHp = Math.max(1, Math.floor(hitDie / 2) + 1 + hpConMod + bonusHpPerLevel + toughPerLevel);
    const maxHp = firstLevelHp + (level - 1) * perLevelHp;
    const damageTaken = Math.max(0, (existing.maxHp || 0) - (existing.currentHp ?? existing.maxHp ?? 0));

    return {
      ...existing,
      ...rebuilt,
      // Earned and hand-entered state the builder doesn't model
      xp: existing.xp ?? rebuilt.xp,
      inspiration: existing.inspiration ?? false,
      customAbilityBonuses: existing.customAbilityBonuses || rebuilt.customAbilityBonuses,
      features: [...rebuilt.features, ...keptFeatures],
      spells: [...rebuilt.spells, ...keptSpells],
      spellSlotsUsed: existing.spellSlotsUsed || rebuilt.spellSlotsUsed,
      attacks: existing.attacks?.length ? existing.attacks : rebuilt.attacks,
      equipment: existing.equipment?.length ? existing.equipment : rebuilt.equipment,
      currency: existing.currency || rebuilt.currency,
      personality: existing.personality ?? rebuilt.personality,
      ideals: existing.ideals ?? rebuilt.ideals,
      bonds: existing.bonds ?? rebuilt.bonds,
      flaws: existing.flaws ?? rebuilt.flaws,
      backstory: existing.backstory ?? rebuilt.backstory,
      deathSaves: existing.deathSaves || rebuilt.deathSaves,
      tempHp: existing.tempHp ?? 0,
      exhaustion: existing.exhaustion ?? rebuilt.exhaustion,
      hitDiceUsed: Math.min(existing.hitDiceUsed || 0, level),
      maxHp,
      currentHp: Math.max(0, maxHp - damageTaken)
    };
  };

  const stepsList = [
    { id: 'origin', label: 'Start', badge: originType === 'custom' ? 'Custom Hero' : 'Sample Hero', status: 'complete', icon: User },
    { id: 'race', label: 'Race', badge: currentSubrace?.name || currentRace.name, status: 'complete', icon: Sparkles },
    { id: 'class', label: 'Class', badge: currentClass.name, status: 'complete', icon: Sword },
    { id: 'abilities', label: 'Abilities', badge: scoreMethod === 'pointbuy' && pointBuyRemaining !== 0 ? `${pointBuyRemaining} pts` : 'Ready', status: isAbilitiesComplete ? 'complete' : 'pending', icon: Award },
    { id: 'background', label: 'Background', badge: currentBackground.name, status: 'complete', icon: BookOpen },
    { id: 'skills', label: 'Skills', badge: `${selectedClassSkills.length}/${currentClass.skillChoices?.count || 2}`, status: isSkillsComplete ? 'complete' : 'pending', icon: Check },
    ...(currentClass.spellcaster ? [{ id: 'spells', label: 'Spells', badge: `${selectedCantrips.length} Cantrips`, status: 'complete', icon: Wand2 }] : []),
    { id: 'equipment', label: 'Equipment', badge: 'Selected', status: 'complete', icon: Shield },
    { id: 'identity', label: 'Identity', badge: charName || 'Adventurer', status: 'complete', icon: User }
  ];

  const currentStepIndex = stepsList.findIndex(s => s.id === activeTab);
  const handlePrevStep = () => {
    if (currentStepIndex > 0) setActiveTab(stepsList[currentStepIndex - 1].id);
  };
  const handleNextStep = () => {
    if (currentStepIndex < stepsList.length - 1) setActiveTab(stepsList[currentStepIndex + 1].id);
  };

  return (
    <Modal onClose={onClose} className="bg3-overlay-dialog" labelledBy="bg3-forge-title" closeOnBackdrop={false}>
      <div className="bg3-creator-container" style={{ width: '96vw', maxWidth: '1440px', height: '94vh' }}>

        {/* PILLAR 1: STEP CATEGORIES */}
        <div className="bg3-steps-pillar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.6rem', borderBottom: '1px solid rgba(223, 184, 90, 0.25)', marginBottom: '0.5rem' }}>
            <span id="bg3-forge-title" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 800, fontSize: '0.95rem' }}>
              CHARACTER FORGE
            </span>
            <button aria-label="Close Builder"
              type="button"
              className="btn btn-secondary btn-icon btn-sm"
              onClick={onClose}
              title="Close Builder"
            >
              <ArrowLeft size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, overflowY: 'auto' }}>
            {stepsList.map(step => {
              const StepIcon = step.icon;
              return (
                <button
                  key={step.id}
                  type="button"
                  className={`bg3-step-item ${activeTab === step.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(step.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <StepIcon size={16} style={{ color: activeTab === step.id ? 'var(--accent-gold)' : '#94a3b8' }} />
                    <div>
                      <div>{step.label}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>{step.badge}</div>
                    </div>
                  </div>
                  <span className={`bg3-step-badge ${step.status}`}>
                    {step.status === 'complete' ? <Check size={12} /> : '!'}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', marginTop: 'auto' }}
            onClick={onClose}
          >
            Cancel &amp; Return
          </button>
        </div>

        {/* PILLAR 2: CENTER STAGE (THE INTERACTIVE WORKSPACE) */}
        <div className="bg3-stage-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* TAB: ORIGIN */}
            {activeTab === 'origin' && (
              <div>
                <div className="bg3-section-title">
                  <User size={24} />
                  <span>CHOOSE YOUR STARTING POINT</span>
                </div>
                <div className="bg3-section-subtitle">
                  Forge your own legend from scratch as a Custom Adventurer, or embark on your journey as an iconic pre-made hero.
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  {/* Custom Hero Card */}
                  <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={originType === 'custom'}
                    className={`bg3-card ${originType === 'custom' ? 'selected' : ''}`}
                    onClick={() => handleSelectOrigin('custom')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                      <div style={{ fontSize: '1.6rem' }}>⚔️</div>
                      <div>
                        <div className="bg3-card-header">Custom Adventurer</div>
                        <div className="bg3-badge-pill">Free Choice</div>
                      </div>
                    </div>
                    <div className="bg3-card-desc">
                      Create your hero from the ground up. Choose your own lineage, class, ability scores, background, and spells.
                    </div>
                  </div>

                  {/* Sample Starter Heroes */}
                  {SAMPLE_CHARACTERS.map(orig => (
                    <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={originType === orig.id}
                      key={orig.id}
                      className={`bg3-card ${originType === orig.id ? 'selected' : ''}`}
                      onClick={() => handleSelectOrigin(orig.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                        <div style={{ fontSize: '1.6rem' }}>{orig.classId === 'fighter' ? '🛡️' : orig.classId === 'wizard' ? '🧙‍♂️' : '🗡️'}</div>
                        <div>
                          <div className="bg3-card-header">{orig.name}</div>
                          <div className="bg3-badge-pill">{orig.raceName} &bull; {orig.className}</div>
                        </div>
                      </div>
                      <div className="bg3-card-desc">
                        {orig.backstory?.substring(0, 110)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: RACE */}
            {activeTab === 'race' && (
              <div>
                <div className="bg3-section-title">
                  <Sparkles size={24} />
                  <span>CHOOSE RACE &amp; LINEAGE</span>
                </div>
                <div className="bg3-section-subtitle">
                  Select your physical ancestry. Your lineage shapes your senses, innate talents, and biological resilience.
                </div>

                <div className="bg3-cards-grid">
                  {SRD_RACES.map(r => (
                    <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={selectedRaceId === r.id}
                      key={r.id}
                      className={`bg3-card ${selectedRaceId === r.id ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedRaceId(r.id);
                        if (r.subraces && r.subraces.length > 0) {
                          setSelectedSubraceId(r.subraces[0].id);
                        } else {
                          setSelectedSubraceId('');
                        }
                      }}
                    >
                      <div className="bg3-card-header">{r.name}</div>
                      <div className="bg3-card-desc">{r.description}</div>
                      <div className="bg3-badge-pill">
                        Speed: {r.speed}ft &bull; {r.subraces?.length > 1 ? `${r.subraces.length} Subraces` : r.subraces?.length === 1 ? r.subraces[0].name : 'Standard'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subrace Picker */}
                {currentRace.subraces && currentRace.subraces.length > 0 && (
                  <div style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(223, 184, 90, 0.3)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                      SUBRACE / LINEAGE ({currentRace.name})
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
                      {currentRace.subraces.map(sub => (
                        <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={selectedSubraceId === sub.id}
                          key={sub.id}
                          className={`bg3-card ${selectedSubraceId === sub.id ? 'selected' : ''}`}
                          onClick={() => setSelectedSubraceId(sub.id)}
                        >
                          <div className="bg3-card-header">{sub.name}</div>
                          <div className="bg3-card-desc">{sub.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dragonborn Ancestry */}
                {selectedRaceId === 'dragonborn' && (
                  <div style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(223, 184, 90, 0.3)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                      DRACONIC ANCESTRY
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.5rem' }}>
                      {['Black (Acid)', 'Blue (Lightning)', 'Brass (Fire)', 'Bronze (Lightning)', 'Copper (Acid)', 'Gold (Fire)', 'Green (Poison)', 'Red (Fire)', 'Silver (Cold)', 'White (Cold)'].map(anc => {
                        const color = anc.split(' ')[0];
                        return (
                          <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={dragonbornAncestry === color}
                            key={color}
                            className={`bg3-card ${dragonbornAncestry === color ? 'selected' : ''}`}
                            onClick={() => setDragonbornAncestry(color)}
                          >
                            <div className="bg3-card-header">{anc}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB: CLASS */}
            {activeTab === 'class' && (
              <div>
                <div className="bg3-section-title">
                  <Sword size={24} />
                  <span>CHOOSE CLASS &amp; DISCIPLINE</span>
                </div>
                <div className="bg3-section-subtitle">
                  Your class governs your combat style, hit die, saving throw masteries, and magical gifts.
                </div>

                <div className="bg3-cards-grid">
                  {SRD_CLASSES.map(c => {
                    const isSelected = selectedClassId === c.id;
                    return (
                      <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={isSelected}
                        key={c.id}
                        className={`bg3-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectClass(c.id)}
                      >
                        <div className="bg3-card-header">{c.name}</div>
                        <div className="bg3-card-desc">{c.description}</div>
                        <div className="bg3-badge-pill">
                          Hit Die: d{c.hitDie} &bull; Saves: {c.savingThrows?.map(s => s.toUpperCase()).join(', ')}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Subclass selection once the class's subclass level is reached */}
                {!isSubclassAvailable && currentClass.subclasses?.length > 0 && (
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                    {currentClass.name}s choose their subclass at level {subclassLevel}. You'll pick it when you level up.
                  </div>
                )}
                {isSubclassAvailable && currentClass.subclasses && currentClass.subclasses.length > 0 && (
                  <div style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(223, 184, 90, 0.3)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                      SUBCLASS / ARCHETYPE ({currentClass.name})
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
                      {currentClass.subclasses.map(sub => (
                        <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={effectiveSubclass?.id === sub.id}
                          key={sub.id}
                          className={`bg3-card ${effectiveSubclass?.id === sub.id ? 'selected' : ''}`}
                          onClick={() => setSelectedSubclassId(sub.id)}
                        >
                          <div className="bg3-card-header">{sub.name}</div>
                          <div className="bg3-card-desc">{sub.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fighter Fighting Style */}
                {currentClass.id === 'fighter' && (
                  <div style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(223, 184, 90, 0.3)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                      FIGHTING STYLE
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
                      {[
                        { id: 'defense', name: 'Defense', desc: '+1 bonus to AC while wearing armor.' },
                        { id: 'dueling', name: 'Dueling', desc: '+2 damage when wielding one melee weapon.' },
                        { id: 'greatweapon', name: 'Great Weapon Fighting', desc: 'Reroll 1s and 2s on two-handed damage dice.' },
                        { id: 'archery', name: 'Archery', desc: '+2 bonus to attack rolls with ranged weapons.' }
                      ].map(fs => (
                        <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={fightingStyle === fs.id}
                          key={fs.id}
                          className={`bg3-card ${fightingStyle === fs.id ? 'selected' : ''}`}
                          onClick={() => setFightingStyle(fs.id)}
                        >
                          <div className="bg3-card-header">{fs.name}</div>
                          <div className="bg3-card-desc">{fs.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: ABILITIES */}
            {activeTab === 'abilities' && (
              <div>
                <div className="bg3-section-title">
                  <Award size={24} />
                  <span>ABILITY SCORES ALLOCATION</span>
                </div>
                <div className="bg3-section-subtitle">
                  Allocate your core attributes. Primary stats recommended for {currentClass.name} are marked with a ⭐ star.
                </div>

                {/* Toolbar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      className={`btn ${scoreMethod === 'pointbuy' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      onClick={() => setScoreMethod('pointbuy')}
                    >
                      Point Buy (27 pts)
                    </button>
                    <button
                      type="button"
                      className={`btn ${scoreMethod === 'standard' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      onClick={() => {
                        setScoreMethod('standard');
                        setBaseScores({ str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 });
                      }}
                    >
                      Standard Array
                    </button>
                    <button
                      type="button"
                      className={`btn ${scoreMethod === 'roll' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      onClick={handleRollAllScores}
                    >
                      <Dices size={14} />
                      <span>Roll 4d6 Drop Lowest</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ color: 'var(--text-gold)', borderColor: 'var(--border-gold)', fontWeight: 700 }}
                      onClick={handleApplyClassRecommendedScores}
                      title="Instantly allocate optimal 27 point buy for your class"
                    >
                      <Star size={14} fill="var(--accent-gold)" />
                      <span>Use Recommended</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={handleResetScoresToEight}
                      title="Reset all stats to base 8"
                    >
                      <RefreshCw size={14} />
                      <span>Reset to 8s</span>
                    </button>
                  </div>
                </div>

                {scoreMethod === 'pointbuy' && (
                  <div style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1.5px solid var(--border-gold)', borderRadius: '8px', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 700 }}>
                      POINT BUY BUDGET
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Points Remaining:</span>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: pointBuyRemaining === 0 ? 'var(--accent-green)' : pointBuyRemaining < 0 ? 'var(--accent-red)' : 'var(--text-gold)' }}>
                        {pointBuyRemaining} / {POINT_BUY_TOTAL}
                      </span>
                    </div>
                  </div>
                )}

                {/* 6 Ability Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                  {[
                    { id: 'str', name: 'Strength', desc: 'Athletics, melee attack & damage' },
                    { id: 'dex', name: 'Dexterity', desc: 'Initiative, Armor Class, ranged attacks, stealth' },
                    { id: 'con', name: 'Constitution', desc: 'Hit points, concentration checks' },
                    { id: 'int', name: 'Intelligence', desc: 'Arcana, history, investigation, wizard magic' },
                    { id: 'wis', name: 'Wisdom', desc: 'Perception, insight, cleric/druid magic' },
                    { id: 'cha', name: 'Charisma', desc: 'Persuasion, deception, sorcerer/warlock magic' }
                  ].map(stat => {
                    const isPrimary = currentClass.primaryAbility?.includes(stat.id);
                    const base = activeBaseScores[stat.id] || 10;
                    const bonus = racialBonuses[stat.id] || 0;
                    const total = base + bonus;
                    const mod = getAbilityModifier(total);

                    return (
                      <div
                        key={stat.id}
                        style={{
                          background: isPrimary ? 'linear-gradient(145deg, #1f2737 0%, #11151f 100%)' : 'linear-gradient(145deg, #161c26 0%, #0e1219 100%)',
                          border: isPrimary ? '1.5px solid var(--border-gold)' : '1px solid rgba(223, 184, 90, 0.25)',
                          borderRadius: '8px',
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxShadow: isPrimary ? '0 0 15px rgba(223, 184, 90, 0.15)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: isPrimary ? 'var(--text-gold)' : 'var(--text-main)' }}>
                            {stat.name.toUpperCase()}
                          </span>
                          {isPrimary && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.68rem', color: 'var(--accent-gold)', fontWeight: 800, background: 'rgba(223, 184, 90, 0.15)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                              <Star size={10} fill="var(--accent-gold)" /> Recommended
                            </span>
                          )}
                        </div>

                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                          {stat.desc}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                          {scoreMethod === 'pointbuy' ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <button aria-label={`Decrease ${stat.id.toUpperCase()}`}
                                type="button"
                                className="btn btn-secondary btn-icon btn-sm"
                                style={{ width: '28px', height: '28px' }}
                                disabled={base <= 8}
                                onClick={() => handlePointBuyChange(stat.id, -1)}
                              >
                                -
                              </button>
                              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, width: '26px', textAlign: 'center' }}>
                                {base}
                              </span>
                              <button aria-label={`Increase ${stat.id.toUpperCase()}`}
                                type="button"
                                className="btn btn-secondary btn-icon btn-sm"
                                style={{ width: '28px', height: '28px' }}
                                disabled={base >= 15 || pointBuyRemaining - (POINT_BUY_COSTS[base + 1] - POINT_BUY_COSTS[base]) < 0}
                                onClick={() => handlePointBuyChange(stat.id, 1)}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Base:</span>
                              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800 }}>{base}</span>
                            </div>
                          )}

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {bonus > 0 && (
                              <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, background: 'rgba(223, 184, 90, 0.15)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                                +{bonus} {currentRace.name.split(' ')[0]}
                              </span>
                            )}
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-gold)', lineHeight: 1 }}>
                                {formatModifier(mod)}
                              </div>
                              <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Total {total}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: BACKGROUND */}
            {activeTab === 'background' && (
              <div>
                <div className="bg3-section-title">
                  <BookOpen size={24} />
                  <span>CHOOSE BACKGROUND &amp; HISTORY</span>
                </div>
                <div className="bg3-section-subtitle">
                  Your background reveals where you came from, your place in the world, and your core proficiencies.
                </div>

                <div className="bg3-cards-grid">
                  {SRD_BACKGROUNDS.map(b => (
                    <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={selectedBackgroundId === b.id}
                      key={b.id}
                      className={`bg3-card ${selectedBackgroundId === b.id ? 'selected' : ''}`}
                      onClick={() => handleSelectBackground(b.id)}
                    >
                      <div className="bg3-card-header">{b.name}</div>
                      <div className="bg3-card-desc">{b.description}</div>
                      <div className="bg3-badge-pill">
                        Skills: {b.skillProficiencies?.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>

                {currentBackground.feature && (
                  <div style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(223, 184, 90, 0.3)', borderRadius: '8px', padding: '1rem', marginTop: '1rem' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                      BACKGROUND FEATURE: {currentBackground.feature?.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.4' }}>
                      {currentBackground.feature?.description}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: SKILLS */}
            {activeTab === 'skills' && (
              <div>
                <div className="bg3-section-title">
                  <Check size={24} />
                  <span>CHOOSE CLASS SKILLS</span>
                </div>
                <div className="bg3-section-subtitle">
                  Select {currentClass.skillChoices?.count || 2} skill proficiencies granted by the {currentClass.name} class. Skills already granted by your background are marked with a lock.
                </div>

                {/* Background Skills Preview */}
                {currentBackground.skillProficiencies && currentBackground.skillProficiencies.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      Granted by Background ({currentBackground.name})
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {currentBackground.skillProficiencies.map(sk => (
                        <span key={sk} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(223, 184, 90, 0.15)', border: '1px solid var(--border-gold)', color: 'var(--text-gold)', padding: '0.3rem 0.65rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                          <Shield size={14} /> {sk} (Background)
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 700 }}>
                    Class Choices: {selectedClassSkills.length} of {currentClass.skillChoices?.count || 2} Selected
                  </div>
                  {selectedClassSkills.length > (currentClass.skillChoices?.count || 2) && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-red)' }}>Too many selected</span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  {currentClass.skillChoices?.options.map(sk => {
                    const isBgSkill = currentBackground.skillProficiencies?.includes(sk);
                    const isSelected = selectedClassSkills.includes(sk);

                    return (
                      <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={isSelected || isBgSkill} aria-disabled={isBgSkill || undefined}
                        key={sk}
                        onClick={() => handleToggleSkill(sk)}
                        className={`bg3-card ${isSelected || isBgSkill ? 'selected' : ''}`}
                        style={{ opacity: isBgSkill ? 0.75 : 1, cursor: isBgSkill ? 'not-allowed' : 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span className="bg3-card-header" style={{ margin: 0 }}>{sk}</span>
                          {(isSelected || isBgSkill) && <Check size={16} style={{ color: 'var(--text-gold)' }} />}
                        </div>
                        <div className="bg3-card-desc">
                          {isBgSkill ? 'Granted by Background' : isSelected ? 'Proficient' : 'Click to select'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {expertiseCount > 0 && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '0.75rem' }}>
                      Expertise: {validExpertise.length} of {expertiseCount} Selected
                      <span style={{ fontWeight: 400, color: '#94a3b8' }}> — double your proficiency bonus for two proficient skills</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                      {allProficientSkills.map(sk => {
                        const isExpert = validExpertise.includes(sk);
                        return (
                          <button
                            type="button"
                            key={sk}
                            onClick={() => handleToggleExpertise(sk)}
                            className={`bg3-card ${isExpert ? 'selected' : ''}`}
                            aria-pressed={isExpert}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span className="bg3-card-header" style={{ margin: 0 }}>{sk}</span>
                              {isExpert && <Star size={16} style={{ color: 'var(--text-gold)' }} />}
                            </div>
                            <div className="bg3-card-desc">{isExpert ? 'Expertise' : 'Click to choose'}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: SPELLS */}
            {activeTab === 'spells' && (
              <div>
                <div className="bg3-section-title">
                  <Wand2 size={24} />
                  <span>SELECT CANTRIPS &amp; SPELLS</span>
                </div>
                <div className="bg3-section-subtitle">
                  Draw upon arcane or divine power. Choose your starting cantrips and 1st-level spells.
                </div>

                <div className="form-label" style={{ color: 'var(--text-gold)', marginBottom: '0.5rem' }}>Cantrips (Pick up to 3)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {SRD_SPELLS.filter(s => s.level === 0 && s.classes.includes(currentClass.id)).map(sp => {
                    const isSelected = selectedCantrips.includes(sp.id);
                    return (
                      <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={isSelected}
                        key={sp.id}
                        className={`bg3-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          if (isSelected) setSelectedCantrips(prev => prev.filter(id => id !== sp.id));
                          else setSelectedCantrips(prev => [...prev, sp.id]);
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span className="bg3-card-header">{sp.name}</span>
                          {isSelected && <Check size={16} style={{ color: 'var(--text-gold)' }} />}
                        </div>
                        <div className="bg3-badge-pill">{sp.school} &bull; {sp.castingTime}</div>
                        <div className="bg3-card-desc" style={{ marginTop: '0.4rem' }}>{sp.description.substring(0, 110)}...</div>
                      </div>
                    );
                  })}
                </div>

                <div className="form-label" style={{ color: 'var(--text-gold)', marginBottom: '0.5rem' }}>1st Level Spells (Pick up to 4)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
                  {SRD_SPELLS.filter(s => s.level === 1 && s.classes.includes(currentClass.id)).map(sp => {
                    const isSelected = selectedFirstLevelSpells.includes(sp.id);
                    return (
                      <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={isSelected}
                        key={sp.id}
                        className={`bg3-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          if (isSelected) setSelectedFirstLevelSpells(prev => prev.filter(id => id !== sp.id));
                          else setSelectedFirstLevelSpells(prev => [...prev, sp.id]);
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span className="bg3-card-header">{sp.name}</span>
                          {isSelected && <Check size={16} style={{ color: 'var(--text-gold)' }} />}
                        </div>
                        <div className="bg3-badge-pill">{sp.school} &bull; {sp.castingTime}</div>
                        <div className="bg3-card-desc" style={{ marginTop: '0.4rem' }}>{sp.description.substring(0, 110)}...</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: EQUIPMENT */}
            {activeTab === 'equipment' && (
              <div>
                <div className="bg3-section-title">
                  <Shield size={24} />
                  <span>STARTING EQUIPMENT PACKAGE</span>
                </div>
                <div className="bg3-section-subtitle">
                  Select your starting loadout of arms, armor, and adventuring packs.
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {currentClass.startingEquipmentPackages?.map((pkg, idx) => (
                    <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={selectedEquipIndex === idx}
                      key={pkg.id || idx}
                      className={`bg3-card ${selectedEquipIndex === idx ? 'selected' : ''}`}
                      onClick={() => setSelectedEquipIndex(idx)}
                    >
                      <div className="bg3-card-header">{pkg.label}</div>
                      <div className="bg3-card-desc" style={{ color: 'var(--text-gold)', fontWeight: 600 }}>
                        Included: {pkg.items.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: IDENTITY */}
            {activeTab === 'identity' && (
              <div>
                <div className="bg3-section-title">
                  <User size={24} />
                  <span>APPEARANCE &amp; IDENTITY</span>
                </div>
                <div className="bg3-section-subtitle">
                  Give your fledgling hero a name, alignment, portrait, and roleplay traits.
                </div>

                {/* Hero Name & Random Generator */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label htmlFor="bg3characterbuilder-heros-name-random-name" className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Hero&rsquo;s Name *</span>
                      <button
                        type="button"
                        onClick={handleRandomizeName}
                        style={{ background: 'none', border: 'none', color: 'var(--text-gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.78rem' }}
                      >
                        <Dices size={14} /> Random Name
                      </button>
                    </label>
                    <input id="bg3characterbuilder-heros-name-random-name"
                      type="text"
                      className="form-input"
                      value={charName}
                      placeholder="e.g. Maren Ashford"
                      onChange={(e) => setCharName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bg3characterbuilder-alignment" className="form-label">Alignment</label>
                    <select id="bg3characterbuilder-alignment"
                      className="form-select"
                      value={alignment}
                      onChange={(e) => setAlignment(e.target.value)}
                    >
                      {['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'].map(al => (
                        <option key={al} value={al}>{al}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Avatar Gallery */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div id="portrait-gallery-label" className="form-label" style={{ color: 'var(--text-gold)', marginBottom: '0.5rem' }}>
                    Choose Character Portrait
                  </div>
                  <div role="group" aria-labelledby="portrait-gallery-label" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.65rem', marginBottom: '0.75rem' }}>
                    {FANTASY_AVATARS.map(av => {
                      const isSel = avatarIcon === av.icon;
                      return (
                        <div role="button" tabIndex={0} onKeyDown={activateOnKey} aria-pressed={isSel}
                          key={av.id}
                          className={`bg3-card ${isSel ? 'selected' : ''}`}
                          style={{ textAlign: 'center', padding: '0.65rem 0.4rem', cursor: 'pointer' }}
                          onClick={() => {
                            setAvatarIcon(av.icon);
                            setCustomAvatarUrl('');
                          }}
                        >
                          <div style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>{av.icon}</div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isSel ? 'var(--text-gold)' : 'var(--text-main)' }}>{av.label}</div>
                          <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{av.role}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="form-group" style={{ maxWidth: '480px' }}>
                    <label htmlFor="bg3characterbuilder-or-custom-image-url" className="form-label">Or Custom Image URL</label>
                    <input id="bg3characterbuilder-or-custom-image-url"
                      type="url"
                      className="form-input"
                      placeholder="https://example.com/portrait.jpg"
                      value={customAvatarUrl}
                      onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM STEP NAVIGATION BUTTONS */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(223, 184, 90, 0.25)', paddingTop: '1rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              disabled={currentStepIndex === 0}
              onClick={handlePrevStep}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <ChevronLeft size={16} />
              <span>Previous: {currentStepIndex > 0 ? stepsList[currentStepIndex - 1].label : 'Start'}</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              disabled={currentStepIndex === stepsList.length - 1}
              onClick={handleNextStep}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-gold)', borderColor: 'var(--border-gold)' }}
            >
              <span>Next: {currentStepIndex < stepsList.length - 1 ? stepsList[currentStepIndex + 1].label : 'Finish'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* PILLAR 3: RIGHT CHARACTER SUMMARY (LIVE INSPECTOR) */}
        <div className="bg3-summary-pillar">
          <div className="bg3-portrait-frame">
            {customAvatarUrl ? (
              <img src={customAvatarUrl} alt={charName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              avatarIcon || '⚔️'
            )}
          </div>
          <div className="bg3-summary-name">
            {charName || 'Adventurer'}
          </div>
          <div className="bg3-summary-subtitle">
            Level {startingLevel} &bull; {currentSubrace?.name || currentRace.name} &bull; {currentClass.name}
          </div>

          {/* Vitals Row */}
          <div className="bg3-vitals-row">
            <div className="bg3-vital-cell">
              <div className="bg3-vital-val" style={{ color: 'var(--accent-red)' }}>{startingHp}</div>
              <div className="bg3-vital-lbl">Hit Points</div>
            </div>
            <div className="bg3-vital-cell">
              <div className="bg3-vital-val">{calculatedAc}</div>
              <div className="bg3-vital-lbl">AC</div>
            </div>
            <div className="bg3-vital-cell">
              <div className="bg3-vital-val">{formatModifier(dexMod)}</div>
              <div className="bg3-vital-lbl">Init</div>
            </div>
            <div className="bg3-vital-cell">
              <div className="bg3-vital-val">{speed}ft</div>
              <div className="bg3-vital-lbl">Speed</div>
            </div>
          </div>

          {/* Ability Scores Mini Table */}
          <div className="bg3-abilities-list">
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', color: 'var(--text-gold)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              Ability Scores
            </div>
            {[
              { id: 'str', label: 'STR' },
              { id: 'dex', label: 'DEX' },
              { id: 'con', label: 'CON' },
              { id: 'int', label: 'INT' },
              { id: 'wis', label: 'WIS' },
              { id: 'cha', label: 'CHA' }
            ].map(stat => {
              const isPrimary = currentClass.primaryAbility?.includes(stat.id);
              const total = finalScores[stat.id];
              const mod = getAbilityModifier(total);

              return (
                <div key={stat.id} className={`bg3-ability-row ${isPrimary ? 'primary-stat' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {isPrimary && <Star size={12} fill="var(--accent-gold)" color="var(--accent-gold)" />}
                    <span style={{ fontWeight: 700, color: isPrimary ? 'var(--text-gold)' : 'var(--text-main)' }}>
                      {stat.label}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{total}</span>
                    <span className="bg3-ability-mod">{formatModifier(mod)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {initialCharacter && (
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4, marginBottom: '0.5rem' }}>
              Respec keeps inventory, attacks, currency, backstory, homebrew, ASIs and level-up features.
              {initialCharacter.classId !== selectedClassId && ' Changing class removes features gained from the old class.'}
            </div>
          )}

          {/* Grand Create Hero Golden Button */}
          <button
            type="button"
            className="bg3-btn-venture"
            onClick={handleVentureForth}
          >
            <span>{initialCharacter ? 'Save Changes' : 'Create Hero'}</span>
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </Modal>
  );
}
