import { Character, Attack } from '@/types/character';
import { FantasyInput } from './ui/FantasyInput';
import { DeathSaveTracker } from './DeathSaveTracker';
import { Shield, Zap, Move, Heart, Plus, Trash2, Swords } from 'lucide-react';
import { useState } from 'react';

interface TabCombateProps {
  character: Character;
  onCharacterChange: <K extends keyof Character>(field: K, value: Character[K]) => void;
  onDeathSaveChange: (type: 'successes' | 'failures', value: number) => void;
  getModifier: (score: number) => number;
}

export const TabCombate = ({
  character,
  onCharacterChange,
  onDeathSaveChange,
  getModifier,
}: TabCombateProps) => {
  const [newAttack, setNewAttack] = useState<Partial<Attack>>({});

  const hpPercentage = (character.hitPointsCurrent / character.hitPointsMax) * 100;

  const addAttack = () => {
    if (newAttack.name) {
      onCharacterChange('attacks', [
        ...character.attacks,
        {
          name: newAttack.name || '',
          attackBonus: newAttack.attackBonus || '+0',
          damage: newAttack.damage || '1d6',
          damageType: newAttack.damageType || 'cortante',
        },
      ]);
      setNewAttack({});
    }
  };

  const removeAttack = (index: number) => {
    onCharacterChange(
      'attacks',
      character.attacks.filter((_, i) => i !== index)
    );
  };

  const adjustHP = (amount: number) => {
    const newHP = Math.min(character.hitPointsMax, Math.max(0, character.hitPointsCurrent + amount));
    onCharacterChange('hitPointsCurrent', newHP);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Combat Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="attribute-box rounded-lg p-3 flex flex-col items-center">
          <Shield className="w-5 h-5 text-primary mb-1" />
          <span className="text-2xl font-bold text-primary font-display">{character.armorClass}</span>
          <input
            type="number"
            value={character.armorClass}
            onChange={(e) => onCharacterChange('armorClass', parseInt(e.target.value) || 10)}
            className="w-12 h-6 text-center bg-secondary/50 rounded border border-border text-xs mt-1 focus:outline-none focus:border-primary"
          />
          <span className="text-[10px] text-muted-foreground uppercase mt-1">CA</span>
        </div>
        <div className="attribute-box rounded-lg p-3 flex flex-col items-center">
          <Zap className="w-5 h-5 text-primary mb-1" />
          <span className="text-2xl font-bold text-primary font-display">
            {getModifier(character.attributes.dexterity) >= 0 ? '+' : ''}
            {getModifier(character.attributes.dexterity)}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase mt-1">Iniciativa</span>
        </div>
        <div className="attribute-box rounded-lg p-3 flex flex-col items-center">
          <Move className="w-5 h-5 text-primary mb-1" />
          <span className="text-2xl font-bold text-primary font-display">{character.speed}</span>
          <input
            type="number"
            value={character.speed}
            onChange={(e) => onCharacterChange('speed', parseInt(e.target.value) || 30)}
            className="w-12 h-6 text-center bg-secondary/50 rounded border border-border text-xs mt-1 focus:outline-none focus:border-primary"
          />
          <span className="text-[10px] text-muted-foreground uppercase mt-1">Desloc.</span>
        </div>
      </div>

      {/* Hit Points Section */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-destructive" />
          <span className="text-sm font-display text-primary uppercase tracking-wider">Pontos de Vida</span>
        </div>

        {/* HP Bar */}
        <div className="relative h-8 bg-secondary rounded-full overflow-hidden mb-3">
          <div
            className="absolute inset-y-0 left-0 hp-bar transition-all duration-300"
            style={{ width: `${Math.max(0, hpPercentage)}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bold text-foreground drop-shadow">
              {character.hitPointsCurrent} / {character.hitPointsMax}
            </span>
          </div>
        </div>

        {/* Quick HP Buttons */}
        <div className="flex gap-2 mb-3">
          {[-5, -1, 1, 5].map((amount) => (
            <button
              key={amount}
              onClick={() => adjustHP(amount)}
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${
                amount < 0
                  ? 'bg-destructive/20 text-destructive hover:bg-destructive/30'
                  : 'bg-success/20 text-success hover:bg-success/30'
              }`}
            >
              {amount > 0 ? '+' : ''}{amount}
            </button>
          ))}
        </div>

        {/* HP Inputs */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-muted-foreground uppercase">Máximo</span>
            <input
              type="number"
              value={character.hitPointsMax}
              onChange={(e) => onCharacterChange('hitPointsMax', parseInt(e.target.value) || 1)}
              className="w-full h-8 text-center bg-input rounded border border-border focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-muted-foreground uppercase">Atual</span>
            <input
              type="number"
              value={character.hitPointsCurrent}
              onChange={(e) => onCharacterChange('hitPointsCurrent', parseInt(e.target.value) || 0)}
              className="w-full h-8 text-center bg-input rounded border border-border focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-muted-foreground uppercase">Temporário</span>
            <input
              type="number"
              value={character.hitPointsTemp}
              onChange={(e) => onCharacterChange('hitPointsTemp', parseInt(e.target.value) || 0)}
              className="w-full h-8 text-center bg-input rounded border border-border focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Hit Dice */}
      <div className="flex gap-3">
        <div className="flex-1 bg-secondary/30 rounded-lg p-3">
          <span className="text-[10px] text-muted-foreground uppercase">Dados de Vida</span>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              value={character.hitDice}
              onChange={(e) => onCharacterChange('hitDice', e.target.value)}
              placeholder="d8"
              className="w-16 h-8 text-center bg-input rounded border border-border focus:outline-none focus:border-primary"
            />
            <span className="text-muted-foreground">×</span>
            <input
              type="number"
              value={character.hitDiceTotal - character.hitDiceUsed}
              onChange={(e) => {
                const available = parseInt(e.target.value) || 0;
                onCharacterChange('hitDiceUsed', character.hitDiceTotal - available);
              }}
              className="w-12 h-8 text-center bg-input rounded border border-border focus:outline-none focus:border-primary"
            />
            <span className="text-muted-foreground">/</span>
            <input
              type="number"
              value={character.hitDiceTotal}
              onChange={(e) => onCharacterChange('hitDiceTotal', parseInt(e.target.value) || 1)}
              className="w-12 h-8 text-center bg-input rounded border border-border focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Death Saves */}
      <DeathSaveTracker
        successes={character.deathSaves.successes}
        failures={character.deathSaves.failures}
        onSuccessChange={(v) => onDeathSaveChange('successes', v)}
        onFailureChange={(v) => onDeathSaveChange('failures', v)}
      />

      {/* Attacks */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <div className="flex items-center gap-2 mb-3">
          <Swords className="w-5 h-5 text-primary" />
          <span className="text-sm font-display text-primary uppercase tracking-wider">Ataques</span>
        </div>

        {character.attacks.map((attack, index) => (
          <div key={index} className="flex items-center gap-2 py-2 border-b border-border/50">
            <div className="flex-1">
              <span className="font-medium">{attack.name}</span>
              <div className="text-xs text-muted-foreground">
                {attack.attackBonus} | {attack.damage} {attack.damageType}
              </div>
            </div>
            <button
              onClick={() => removeAttack(index)}
              className="p-1 text-destructive hover:bg-destructive/20 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Add Attack Form */}
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Nome"
              value={newAttack.name || ''}
              onChange={(e) => setNewAttack({ ...newAttack, name: e.target.value })}
              className="input-fantasy px-2 py-1 rounded text-sm"
            />
            <input
              type="text"
              placeholder="Bônus (+5)"
              value={newAttack.attackBonus || ''}
              onChange={(e) => setNewAttack({ ...newAttack, attackBonus: e.target.value })}
              className="input-fantasy px-2 py-1 rounded text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Dano (1d8+3)"
              value={newAttack.damage || ''}
              onChange={(e) => setNewAttack({ ...newAttack, damage: e.target.value })}
              className="input-fantasy px-2 py-1 rounded text-sm"
            />
            <input
              type="text"
              placeholder="Tipo"
              value={newAttack.damageType || ''}
              onChange={(e) => setNewAttack({ ...newAttack, damageType: e.target.value })}
              className="input-fantasy px-2 py-1 rounded text-sm"
            />
          </div>
          <button
            onClick={addAttack}
            className="w-full py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Ataque
          </button>
        </div>
      </div>
    </div>
  );
};
