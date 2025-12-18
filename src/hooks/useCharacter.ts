import { useState, useEffect, useCallback } from 'react';
import { Character, getDefaultCharacter } from '@/types/character';

const STORAGE_KEY = 'dnd5e_character';

export const useCharacter = () => {
  const [character, setCharacter] = useState<Character>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return { ...getDefaultCharacter(), ...JSON.parse(saved) };
      } catch {
        return getDefaultCharacter();
      }
    }
    return getDefaultCharacter();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
  }, [character]);

  const updateCharacter = useCallback(<K extends keyof Character>(
    field: K,
    value: Character[K]
  ) => {
    setCharacter(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateAttribute = useCallback((
    attr: keyof Character['attributes'],
    value: number
  ) => {
    setCharacter(prev => ({
      ...prev,
      attributes: { ...prev.attributes, [attr]: value }
    }));
  }, []);

  const updateSpellcasting = useCallback(<K extends keyof Character['spellcasting']>(
    field: K,
    value: Character['spellcasting'][K]
  ) => {
    setCharacter(prev => ({
      ...prev,
      spellcasting: { ...prev.spellcasting, [field]: value }
    }));
  }, []);

  const updateDeathSaves = useCallback((
    type: 'successes' | 'failures',
    value: number
  ) => {
    setCharacter(prev => ({
      ...prev,
      deathSaves: { ...prev.deathSaves, [type]: Math.min(3, Math.max(0, value)) }
    }));
  }, []);

  const updateTreasure = useCallback((
    coin: keyof Character['treasure'],
    value: number
  ) => {
    setCharacter(prev => ({
      ...prev,
      treasure: { ...prev.treasure, [coin]: Math.max(0, value) }
    }));
  }, []);

  const toggleProficiency = useCallback((
    type: 'savingThrowProficiencies' | 'skillProficiencies',
    skill: string
  ) => {
    setCharacter(prev => {
      const current = prev[type];
      const updated = current.includes(skill)
        ? current.filter(s => s !== skill)
        : [...current, skill];
      return { ...prev, [type]: updated };
    });
  }, []);

  const toggleExpertise = useCallback((skill: string) => {
    setCharacter(prev => {
      const current = prev.skillExpertise;
      const updated = current.includes(skill)
        ? current.filter(s => s !== skill)
        : [...current, skill];
      return { ...prev, skillExpertise: updated };
    });
  }, []);

  const useSpellSlot = useCallback((level: number) => {
    setCharacter(prev => {
      const slot = prev.spellcasting.spellSlots[level as keyof typeof prev.spellcasting.spellSlots];
      if (slot.used < slot.total) {
        return {
          ...prev,
          spellcasting: {
            ...prev.spellcasting,
            spellSlots: {
              ...prev.spellcasting.spellSlots,
              [level]: { ...slot, used: slot.used + 1 }
            }
          }
        };
      }
      return prev;
    });
  }, []);

  const restoreSpellSlot = useCallback((level: number) => {
    setCharacter(prev => {
      const slot = prev.spellcasting.spellSlots[level as keyof typeof prev.spellcasting.spellSlots];
      if (slot.used > 0) {
        return {
          ...prev,
          spellcasting: {
            ...prev.spellcasting,
            spellSlots: {
              ...prev.spellcasting.spellSlots,
              [level]: { ...slot, used: slot.used - 1 }
            }
          }
        };
      }
      return prev;
    });
  }, []);

  const longRest = useCallback(() => {
    setCharacter(prev => ({
      ...prev,
      hitPointsCurrent: prev.hitPointsMax,
      hitPointsTemp: 0,
      hitDiceUsed: Math.max(0, prev.hitDiceUsed - Math.floor(prev.hitDiceTotal / 2)),
      deathSaves: { successes: 0, failures: 0 },
      spellcasting: {
        ...prev.spellcasting,
        spellSlots: Object.fromEntries(
          Object.entries(prev.spellcasting.spellSlots).map(([level, slot]) => [
            level,
            { ...slot, used: 0 }
          ])
        ) as typeof prev.spellcasting.spellSlots
      }
    }));
  }, []);

  const resetCharacter = useCallback(() => {
    setCharacter(getDefaultCharacter());
  }, []);

  const importCharacter = useCallback((data: Partial<Character>) => {
    setCharacter({ ...getDefaultCharacter(), ...data });
  }, []);

  const getModifier = useCallback((score: number) => {
    return Math.floor((score - 10) / 2);
  }, []);

  return {
    character,
    updateCharacter,
    updateAttribute,
    updateSpellcasting,
    updateDeathSaves,
    updateTreasure,
    toggleProficiency,
    toggleExpertise,
    useSpellSlot,
    restoreSpellSlot,
    longRest,
    resetCharacter,
    importCharacter,
    getModifier,
  };
};
