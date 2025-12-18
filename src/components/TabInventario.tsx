import { Character } from '@/types/character';
import { FantasyTextarea } from './ui/FantasyTextarea';
import { Plus, Trash2, Package, Coins } from 'lucide-react';
import { useState } from 'react';

interface TabInventarioProps {
  character: Character;
  onCharacterChange: <K extends keyof Character>(field: K, value: Character[K]) => void;
  onTreasureChange: (coin: keyof Character['treasure'], value: number) => void;
}

export const TabInventario = ({
  character,
  onCharacterChange,
  onTreasureChange,
}: TabInventarioProps) => {
  const [newItem, setNewItem] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newProficiency, setNewProficiency] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      onCharacterChange('equipment', [...character.equipment, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    onCharacterChange('equipment', character.equipment.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !character.languages.includes(newLanguage.trim())) {
      onCharacterChange('languages', [...character.languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (index: number) => {
    onCharacterChange('languages', character.languages.filter((_, i) => i !== index));
  };

  const addProficiency = () => {
    if (newProficiency.trim() && !character.otherProficiencies.includes(newProficiency.trim())) {
      onCharacterChange('otherProficiencies', [...character.otherProficiencies, newProficiency.trim()]);
      setNewProficiency('');
    }
  };

  const removeProficiency = (index: number) => {
    onCharacterChange('otherProficiencies', character.otherProficiencies.filter((_, i) => i !== index));
  };

  const coins = [
    { key: 'pp' as const, label: 'PP', color: 'text-blue-300' },
    { key: 'gp' as const, label: 'PO', color: 'text-yellow-400' },
    { key: 'ep' as const, label: 'PE', color: 'text-gray-300' },
    { key: 'sp' as const, label: 'PP', color: 'text-gray-400' },
    { key: 'cp' as const, label: 'PC', color: 'text-amber-600' },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Treasure */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <div className="flex items-center gap-2 mb-3">
          <Coins className="w-5 h-5 text-primary" />
          <span className="text-sm font-display text-primary uppercase tracking-wider">Tesouro</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {coins.map((coin) => (
            <div key={coin.key} className="flex flex-col items-center">
              <span className={`text-xs font-bold ${coin.color}`}>{coin.label}</span>
              <input
                type="number"
                value={character.treasure[coin.key]}
                onChange={(e) => onTreasureChange(coin.key, parseInt(e.target.value) || 0)}
                className="w-full h-10 text-center bg-input rounded border border-border focus:outline-none focus:border-primary text-sm"
                min={0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Equipment */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-5 h-5 text-primary" />
          <span className="text-sm font-display text-primary uppercase tracking-wider">Equipamento</span>
        </div>
        
        <div className="space-y-1 mb-3 max-h-60 overflow-y-auto">
          {character.equipment.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-1 px-2 bg-secondary/30 rounded">
              <span className="text-sm">{item}</span>
              <button
                onClick={() => removeItem(index)}
                className="p-1 text-destructive hover:bg-destructive/20 rounded"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Novo item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            className="flex-1 input-fantasy px-3 py-2 rounded text-sm"
          />
          <button
            onClick={addItem}
            className="px-3 py-2 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Languages */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <span className="text-sm font-display text-primary uppercase tracking-wider">Idiomas</span>
        
        <div className="flex flex-wrap gap-2 mt-3 mb-3">
          {character.languages.map((lang, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-secondary rounded text-sm"
            >
              {lang}
              <button
                onClick={() => removeLanguage(index)}
                className="text-destructive hover:text-destructive/80"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Novo idioma..."
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addLanguage()}
            className="flex-1 input-fantasy px-3 py-2 rounded text-sm"
          />
          <button
            onClick={addLanguage}
            className="px-3 py-2 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Other Proficiencies */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <span className="text-sm font-display text-primary uppercase tracking-wider">Outras Proficiências</span>
        
        <div className="flex flex-wrap gap-2 mt-3 mb-3">
          {character.otherProficiencies.map((prof, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-secondary rounded text-sm"
            >
              {prof}
              <button
                onClick={() => removeProficiency(index)}
                className="text-destructive hover:text-destructive/80"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nova proficiência..."
            value={newProficiency}
            onChange={(e) => setNewProficiency(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addProficiency()}
            className="flex-1 input-fantasy px-3 py-2 rounded text-sm"
          />
          <button
            onClick={addProficiency}
            className="px-3 py-2 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
