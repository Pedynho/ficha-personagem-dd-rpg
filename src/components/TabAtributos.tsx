import { Character, ATTRIBUTES, SKILLS, SAVING_THROWS } from '@/types/character';
import { AttributeBox } from './AttributeBox';
import { SkillItem } from './SkillItem';
import { SavingThrowItem } from './SavingThrowItem';
import { FantasyInput } from './ui/FantasyInput';
import { Sparkles } from 'lucide-react';

interface TabAtributosProps {
  character: Character;
  onAttributeChange: (attr: keyof Character['attributes'], value: number) => void;
  onToggleProficiency: (type: 'savingThrowProficiencies' | 'skillProficiencies', skill: string) => void;
  onToggleExpertise: (skill: string) => void;
  onCharacterChange: <K extends keyof Character>(field: K, value: Character[K]) => void;
  getModifier: (score: number) => number;
}

export const TabAtributos = ({
  character,
  onAttributeChange,
  onToggleProficiency,
  onToggleExpertise,
  onCharacterChange,
  getModifier,
}: TabAtributosProps) => {
  const getSkillModifier = (attribute: keyof Character['attributes'], skillKey: string) => {
    const base = getModifier(character.attributes[attribute]);
    const isProficient = character.skillProficiencies.includes(skillKey);
    const isExpert = character.skillExpertise.includes(skillKey);
    
    if (isExpert) return base + character.proficiencyBonus * 2;
    if (isProficient) return base + character.proficiencyBonus;
    return base;
  };

  const getSaveModifier = (attribute: keyof Character['attributes']) => {
    const base = getModifier(character.attributes[attribute]);
    const isProficient = character.savingThrowProficiencies.includes(attribute);
    return isProficient ? base + character.proficiencyBonus : base;
  };

  const passivePerception = 10 + getSkillModifier('wisdom', 'perception');

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Inspiration & Proficiency */}
      <div className="flex gap-3">
        <button
          onClick={() => onCharacterChange('inspiration', !character.inspiration)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 transition-all ${
            character.inspiration
              ? 'bg-primary/20 border-primary animate-pulse-glow'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${character.inspiration ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className="text-sm font-display">Inspiração</span>
        </button>
        <div className="flex items-center gap-2 px-4 bg-secondary/30 rounded-lg">
          <span className="text-xs text-muted-foreground">Bônus Prof.</span>
          <input
            type="number"
            value={character.proficiencyBonus}
            onChange={(e) => onCharacterChange('proficiencyBonus', parseInt(e.target.value) || 2)}
            className="w-12 h-8 text-center bg-input rounded border border-border font-bold text-primary focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Attributes Grid */}
      <div className="grid grid-cols-3 gap-2">
        {ATTRIBUTES.map((attr) => (
          <AttributeBox
            key={attr.key}
            attribute={attr}
            value={character.attributes[attr.key as keyof Character['attributes']]}
            modifier={getModifier(character.attributes[attr.key as keyof Character['attributes']])}
            onChange={(value) => onAttributeChange(attr.key as keyof Character['attributes'], value)}
          />
        ))}
      </div>

      {/* Saving Throws */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <h3 className="text-sm font-display text-primary uppercase tracking-wider mb-3">
          Testes de Resistência
        </h3>
        <div className="space-y-1">
          {SAVING_THROWS.map((save) => (
            <SavingThrowItem
              key={save.attribute}
              name={save.name}
              abbr={save.abbr}
              modifier={getSaveModifier(save.attribute as keyof Character['attributes'])}
              isProficient={character.savingThrowProficiencies.includes(save.attribute)}
              onToggle={() => onToggleProficiency('savingThrowProficiencies', save.attribute)}
            />
          ))}
        </div>
      </div>

      {/* Passive Perception */}
      <div className="flex items-center justify-between bg-secondary/30 rounded-lg px-4 py-3">
        <span className="text-sm">Percepção Passiva</span>
        <span className="text-xl font-bold text-primary font-display">{passivePerception}</span>
      </div>

      {/* Skills */}
      <div className="bg-card rounded-lg p-4 card-glow">
        <h3 className="text-sm font-display text-primary uppercase tracking-wider mb-3">
          Perícias
        </h3>
        <div className="space-y-0">
          {SKILLS.map((skill) => {
            const attrKey = skill.attribute as keyof Character['attributes'];
            const abbr = ATTRIBUTES.find(a => a.key === skill.attribute)?.abbr || '';
            return (
              <SkillItem
                key={skill.key}
                name={skill.name}
                attributeAbbr={abbr}
                modifier={getSkillModifier(attrKey, skill.key)}
                isProficient={character.skillProficiencies.includes(skill.key)}
                isExpert={character.skillExpertise.includes(skill.key)}
                onToggleProficiency={() => onToggleProficiency('skillProficiencies', skill.key)}
                onToggleExpertise={() => onToggleExpertise(skill.key)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
