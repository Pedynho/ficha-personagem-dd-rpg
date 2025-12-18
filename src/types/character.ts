export interface Character {
    // Basic Info
    name: string;
    className: string;
    level: number;
    background: string;
    playerName: string;
    race: string;
    alignment: string;
    experiencePoints: number;
    inspiration: boolean;

    // Attributes
    attributes: {
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
    };

    // Combat
    armorClass: number;
    initiative: number;
    speed: number;
    hitPointsMax: number;
    hitPointsCurrent: number;
    hitPointsTemp: number;
    hitDice: string;
    hitDiceTotal: number;
    hitDiceUsed: number;
    deathSaves: {
        successes: number;
        failures: number;
    };

    // Proficiencies
    proficiencyBonus: number;
    savingThrowProficiencies: string[];
    skillProficiencies: string[];
    skillExpertise: string[];

    // Equipment & Inventory
    equipment: string[];
    treasure: {
        cp: number;
        sp: number;
        ep: number;
        gp: number;
        pp: number;
    };

    // Attacks
    attacks: Attack[];

    // Features & Traits
    personalityTraits: string;
    ideals: string;
    bonds: string;
    flaws: string;
    featuresAndTraits: string[];
    otherProficiencies: string[];
    languages: string[];

    // Appearance
    age: string;
    height: string;
    weight: string;
    eyes: string;
    skin: string;
    hair: string;
    appearance: string;
    backstory: string;
    alliesAndOrganizations: string;

    // Spellcasting
    spellcasting: {
        class: string;
        ability: string;
        spellSaveDC: number;
        spellAttackBonus: number;
        cantrips: string[];
        spellSlots: SpellSlots;
        spellsKnown: SpellsByLevel;
    };
}

export interface Attack {
    name: string;
    attackBonus: string;
    damage: string;
    damageType: string;
}

export interface SpellSlots {
    1: { total: number; used: number };
    2: { total: number; used: number };
    3: { total: number; used: number };
    4: { total: number; used: number };
    5: { total: number; used: number };
    6: { total: number; used: number };
    7: { total: number; used: number };
    8: { total: number; used: number };
    9: { total: number; used: number };
}

export interface SpellsByLevel {
    0: string[];
    1: string[];
    2: string[];
    3: string[];
    4: string[];
    5: string[];
    6: string[];
    7: string[];
    8: string[];
    9: string[];
}

export const SKILLS = [
    { name: 'Acrobacia', attribute: 'dexterity', key: 'acrobatics' },
    { name: 'Arcanismo', attribute: 'intelligence', key: 'arcana' },
    { name: 'Atletismo', attribute: 'strength', key: 'athletics' },
    { name: 'Atuação', attribute: 'charisma', key: 'performance' },
    { name: 'Blefar', attribute: 'charisma', key: 'deception' },
    { name: 'Furtividade', attribute: 'dexterity', key: 'stealth' },
    { name: 'História', attribute: 'intelligence', key: 'history' },
    { name: 'Intimidação', attribute: 'charisma', key: 'intimidation' },
    { name: 'Intuição', attribute: 'wisdom', key: 'insight' },
    { name: 'Investigação', attribute: 'intelligence', key: 'investigation' },
    { name: 'Lidar com Animais', attribute: 'wisdom', key: 'animalHandling' },
    { name: 'Medicina', attribute: 'wisdom', key: 'medicine' },
    { name: 'Natureza', attribute: 'intelligence', key: 'nature' },
    { name: 'Percepção', attribute: 'wisdom', key: 'perception' },
    { name: 'Persuasão', attribute: 'charisma', key: 'persuasion' },
    { name: 'Prestidigitação', attribute: 'dexterity', key: 'sleightOfHand' },
    { name: 'Religião', attribute: 'intelligence', key: 'religion' },
    { name: 'Sobrevivência', attribute: 'wisdom', key: 'survival' },
] as const;

export const SAVING_THROWS = [
    { name: 'Força', attribute: 'strength', abbr: 'FOR' },
    { name: 'Destreza', attribute: 'dexterity', abbr: 'DES' },
    { name: 'Constituição', attribute: 'constitution', abbr: 'CON' },
    { name: 'Inteligência', attribute: 'intelligence', abbr: 'INT' },
    { name: 'Sabedoria', attribute: 'wisdom', abbr: 'SAB' },
    { name: 'Carisma', attribute: 'charisma', abbr: 'CAR' },
] as const;

export const ATTRIBUTES = [
    { name: 'Força', key: 'strength', abbr: 'FOR' },
    { name: 'Destreza', key: 'dexterity', abbr: 'DES' },
    { name: 'Constituição', key: 'constitution', abbr: 'CON' },
    { name: 'Inteligência', key: 'intelligence', abbr: 'INT' },
    { name: 'Sabedoria', key: 'wisdom', abbr: 'SAB' },
    { name: 'Carisma', key: 'charisma', abbr: 'CAR' },
] as const;

export const getDefaultCharacter = (): Character => ({
    name: '',
    className: '',
    level: 1,
    background: '',
    playerName: '',
    race: '',
    alignment: '',
    experiencePoints: 0,
    inspiration: false,
    attributes: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
    },
    armorClass: 10,
    initiative: 0,
    speed: 30,
    hitPointsMax: 10,
    hitPointsCurrent: 10,
    hitPointsTemp: 0,
    hitDice: 'd8',
    hitDiceTotal: 1,
    hitDiceUsed: 0,
    deathSaves: { successes: 0, failures: 0 },
    proficiencyBonus: 2,
    savingThrowProficiencies: [],
    skillProficiencies: [],
    skillExpertise: [],
    equipment: [],
    treasure: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
    attacks: [],
    personalityTraits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    featuresAndTraits: [],
    otherProficiencies: [],
    languages: ['Comum'],
    age: '',
    height: '',
    weight: '',
    eyes: '',
    skin: '',
    hair: '',
    appearance: '',
    backstory: '',
    alliesAndOrganizations: '',
    spellcasting: {
        class: '',
        ability: '',
        spellSaveDC: 0,
        spellAttackBonus: 0,
        cantrips: [],
        spellSlots: {
            1: { total: 0, used: 0 },
            2: { total: 0, used: 0 },
            3: { total: 0, used: 0 },
            4: { total: 0, used: 0 },
            5: { total: 0, used: 0 },
            6: { total: 0, used: 0 },
            7: { total: 0, used: 0 },
            8: { total: 0, used: 0 },
            9: { total: 0, used: 0 },
        },
        spellsKnown: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
        },
    },
});
