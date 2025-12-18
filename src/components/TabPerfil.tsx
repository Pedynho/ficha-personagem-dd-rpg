import { Character } from '@/types/character';
import { FantasyInput } from './ui/FantasyInput';
import { FantasyTextarea } from './ui/FantasyTextarea';
import { Plus, Trash2, User, BookOpen, Users } from 'lucide-react';
import { useState } from 'react';

interface TabPerfilProps {
  character: Character;
  onCharacterChange: <K extends keyof Character>(field: K, value: Character[K]) => void;
}

export const TabPerfil = ({
  character,
  onCharacterChange,
}: TabPerfilProps) => {
  const [newFeature, setNewFeature] = useState('');

  const addFeature = () => {
    if (newFeature.trim()) {
      onCharacterChange('featuresAndTraits', [...character.featuresAndTraits, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    onCharacterChange('featuresAndTraits', character.featuresAndTraits.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Basic Info */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <div className="flex items-center gap-2 mb-3">
          <User className="w-5 h-5 text-primary" />
          <span className="text-sm font-display text-primary uppercase tracking-wider">Informações Básicas</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <FantasyInput
            label="Nome"
            value={character.name}
            onChange={(e) => onCharacterChange('name', e.target.value)}
            placeholder="Nome do Personagem"
          />
          <FantasyInput
            label="Jogador"
            value={character.playerName}
            onChange={(e) => onCharacterChange('playerName', e.target.value)}
            placeholder="Nome do Jogador"
          />
          <FantasyInput
            label="Classe"
            value={character.className}
            onChange={(e) => onCharacterChange('className', e.target.value)}
            placeholder="Guerreiro, Mago..."
          />
          <FantasyInput
            label="Nível"
            type="number"
            value={character.level}
            onChange={(e) => onCharacterChange('level', parseInt(e.target.value) || 1)}
            min={1}
            max={20}
          />
          <FantasyInput
            label="Raça"
            value={character.race}
            onChange={(e) => onCharacterChange('race', e.target.value)}
            placeholder="Humano, Elfo..."
          />
          <FantasyInput
            label="Antecedente"
            value={character.background}
            onChange={(e) => onCharacterChange('background', e.target.value)}
            placeholder="Soldado, Sábio..."
          />
          <FantasyInput
            label="Tendência"
            value={character.alignment}
            onChange={(e) => onCharacterChange('alignment', e.target.value)}
            placeholder="Leal e Bom..."
          />
          <FantasyInput
            label="XP"
            type="number"
            value={character.experiencePoints}
            onChange={(e) => onCharacterChange('experiencePoints', parseInt(e.target.value) || 0)}
            min={0}
          />
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <span className="text-sm font-display text-primary uppercase tracking-wider mb-3 block">Aparência</span>
        
        <div className="grid grid-cols-3 gap-3 mb-3">
          <FantasyInput
            label="Idade"
            value={character.age}
            onChange={(e) => onCharacterChange('age', e.target.value)}
          />
          <FantasyInput
            label="Altura"
            value={character.height}
            onChange={(e) => onCharacterChange('height', e.target.value)}
          />
          <FantasyInput
            label="Peso"
            value={character.weight}
            onChange={(e) => onCharacterChange('weight', e.target.value)}
          />
          <FantasyInput
            label="Olhos"
            value={character.eyes}
            onChange={(e) => onCharacterChange('eyes', e.target.value)}
          />
          <FantasyInput
            label="Pele"
            value={character.skin}
            onChange={(e) => onCharacterChange('skin', e.target.value)}
          />
          <FantasyInput
            label="Cabelos"
            value={character.hair}
            onChange={(e) => onCharacterChange('hair', e.target.value)}
          />
        </div>

        <FantasyTextarea
          label="Descrição da Aparência"
          value={character.appearance}
          onChange={(e) => onCharacterChange('appearance', e.target.value)}
          placeholder="Descreva a aparência do personagem..."
        />
      </div>

      {/* Personality */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <span className="text-sm font-display text-primary uppercase tracking-wider mb-3 block">Personalidade</span>
        
        <div className="space-y-3">
          <FantasyTextarea
            label="Traços de Personalidade"
            value={character.personalityTraits}
            onChange={(e) => onCharacterChange('personalityTraits', e.target.value)}
            placeholder="Como seu personagem se comporta..."
          />
          <FantasyTextarea
            label="Ideais"
            value={character.ideals}
            onChange={(e) => onCharacterChange('ideals', e.target.value)}
            placeholder="O que seu personagem acredita..."
          />
          <FantasyTextarea
            label="Vínculos"
            value={character.bonds}
            onChange={(e) => onCharacterChange('bonds', e.target.value)}
            placeholder="Conexões importantes..."
          />
          <FantasyTextarea
            label="Defeitos"
            value={character.flaws}
            onChange={(e) => onCharacterChange('flaws', e.target.value)}
            placeholder="Fraquezas e vícios..."
          />
        </div>
      </div>

      {/* Backstory */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="text-sm font-display text-primary uppercase tracking-wider">História</span>
        </div>
        
        <FantasyTextarea
          value={character.backstory}
          onChange={(e) => onCharacterChange('backstory', e.target.value)}
          placeholder="A história do seu personagem..."
          className="min-h-[150px]"
        />
      </div>

      {/* Allies */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-primary" />
          <span className="text-sm font-display text-primary uppercase tracking-wider">Aliados & Organizações</span>
        </div>
        
        <FantasyTextarea
          value={character.alliesAndOrganizations}
          onChange={(e) => onCharacterChange('alliesAndOrganizations', e.target.value)}
          placeholder="Aliados, guildas, facções..."
        />
      </div>

      {/* Features */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <span className="text-sm font-display text-primary uppercase tracking-wider mb-3 block">
          Características & Habilidades
        </span>
        
        <div className="space-y-2 mb-3 max-h-60 overflow-y-auto">
          {character.featuresAndTraits.map((feature, index) => (
            <div key={index} className="flex items-start justify-between py-2 px-3 bg-secondary/30 rounded">
              <span className="text-sm flex-1">{feature}</span>
              <button
                onClick={() => removeFeature(index)}
                className="p-1 text-destructive hover:bg-destructive/20 rounded ml-2"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nova característica..."
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addFeature()}
            className="flex-1 input-fantasy px-3 py-2 rounded text-sm"
          />
          <button
            onClick={addFeature}
            className="px-3 py-2 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
