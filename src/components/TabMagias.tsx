import { Character, SpellSlots } from '@/types/character';
import { FantasyInput } from './ui/FantasyInput';
import { SpellSlotTracker } from './SpellSlotTracker';
import { Plus, Trash2, Sparkles, Wand2 } from 'lucide-react';
import { useState } from 'react';

interface TabMagiasProps {
  character: Character;
  onCharacterChange: <K extends keyof Character>(field: K, value: Character[K]) => void;
  onSpellcastingChange: <K extends keyof Character['spellcasting']>(
    field: K,
    value: Character['spellcasting'][K]
  ) => void;
  onUseSpellSlot: (level: number) => void;
  onRestoreSpellSlot: (level: number) => void;
}

export const TabMagias = ({
  character,
  onCharacterChange,
  onSpellcastingChange,
  onUseSpellSlot,
  onRestoreSpellSlot,
}: TabMagiasProps) => {
  const [newSpell, setNewSpell] = useState<{ level: number; name: string }>({ level: 0, name: '' });

  const spellcasting = character.spellcasting;

  const addSpell = () => {
    if (newSpell.name.trim()) {
      const level = newSpell.level as keyof typeof spellcasting.spellsKnown;
      const currentSpells = spellcasting.spellsKnown[level] || [];
      onSpellcastingChange('spellsKnown', {
        ...spellcasting.spellsKnown,
        [level]: [...currentSpells, newSpell.name.trim()],
      });
      setNewSpell({ ...newSpell, name: '' });
    }
  };

  const removeSpell = (level: number, index: number) => {
    const lvl = level as keyof typeof spellcasting.spellsKnown;
    const currentSpells = spellcasting.spellsKnown[lvl] || [];
    onSpellcastingChange('spellsKnown', {
      ...spellcasting.spellsKnown,
      [lvl]: currentSpells.filter((_, i) => i !== index),
    });
  };

  const updateSlotTotal = (level: number, total: number) => {
    const lvl = level as keyof SpellSlots;
    onSpellcastingChange('spellSlots', {
      ...spellcasting.spellSlots,
      [lvl]: { ...spellcasting.spellSlots[lvl], total },
    });
  };

  const spellLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Spellcasting Info */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <div className="flex items-center gap-2 mb-3">
          <Wand2 className="w-5 h-5 text-magic" />
          <span className="text-sm font-display text-primary uppercase tracking-wider">Conjuração</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <FantasyInput
            label="Classe de Conjurador"
            value={spellcasting.class}
            onChange={(e) => onSpellcastingChange('class', e.target.value)}
            placeholder="Mago, Clérigo..."
          />
          <FantasyInput
            label="Habilidade Chave"
            value={spellcasting.ability}
            onChange={(e) => onSpellcastingChange('ability', e.target.value)}
            placeholder="INT, SAB, CAR..."
          />
          <FantasyInput
            label="CD do Teste de Resistência"
            type="number"
            value={spellcasting.spellSaveDC}
            onChange={(e) => onSpellcastingChange('spellSaveDC', parseInt(e.target.value) || 0)}
          />
          <FantasyInput
            label="Bônus de Ataque"
            type="number"
            value={spellcasting.spellAttackBonus}
            onChange={(e) => onSpellcastingChange('spellAttackBonus', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Spell Slots */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-magic" />
          <span className="text-sm font-display text-primary uppercase tracking-wider">Espaços de Magia</span>
        </div>
        
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => {
            const slot = spellcasting.spellSlots[level as keyof SpellSlots];
            if (slot.total === 0 && level > 1) return null;
            return (
              <SpellSlotTracker
                key={level}
                level={level}
                total={slot.total}
                used={slot.used}
                onUse={() => onUseSpellSlot(level)}
                onRestore={() => onRestoreSpellSlot(level)}
                onTotalChange={(total) => updateSlotTotal(level, total)}
              />
            );
          })}
        </div>
      </div>

      {/* Add Spell Form */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <span className="text-sm font-display text-primary uppercase tracking-wider mb-3 block">
          Adicionar Magia
        </span>
        <div className="flex gap-2">
          <select
            value={newSpell.level}
            onChange={(e) => setNewSpell({ ...newSpell, level: parseInt(e.target.value) })}
            className="w-20 input-fantasy px-2 py-2 rounded text-sm"
          >
            <option value={0}>Truque</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((l) => (
              <option key={l} value={l}>Nv. {l}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nome da magia..."
            value={newSpell.name}
            onChange={(e) => setNewSpell({ ...newSpell, name: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && addSpell()}
            className="flex-1 input-fantasy px-3 py-2 rounded text-sm"
          />
          <button
            onClick={addSpell}
            className="px-3 py-2 bg-magic/20 text-magic rounded hover:bg-magic/30 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Spells by Level */}
      {spellLevels.map((level) => {
        const spells = spellcasting.spellsKnown[level] || [];
        if (spells.length === 0) return null;

        return (
          <div key={level} className="bg-card rounded-lg p-4 card-glow">
            <span className="text-sm font-display text-magic uppercase tracking-wider mb-2 block">
              {level === 0 ? 'Truques' : `Nível ${level}`}
            </span>
            <div className="space-y-1">
              {spells.map((spell, index) => (
                <div key={index} className="flex items-center justify-between py-1 px-2 bg-secondary/30 rounded">
                  <span className="text-sm">{spell}</span>
                  <button
                    onClick={() => removeSpell(level, index)}
                    className="p-1 text-destructive hover:bg-destructive/20 rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
