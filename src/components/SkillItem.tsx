import { Check, Star } from 'lucide-react';

interface SkillItemProps {
  name: string;
  attributeAbbr: string;
  modifier: number;
  isProficient: boolean;
  isExpert: boolean;
  onToggleProficiency: () => void;
  onToggleExpertise: () => void;
}

export const SkillItem = ({
  name,
  attributeAbbr,
  modifier,
  isProficient,
  isExpert,
  onToggleProficiency,
  onToggleExpertise,
}: SkillItemProps) => {
  const modifierDisplay = modifier >= 0 ? `+${modifier}` : `${modifier}`;

  return (
    <div className="skill-item flex items-center justify-between py-2 px-1">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleProficiency}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            isProficient
              ? 'bg-primary border-primary'
              : 'border-muted-foreground hover:border-primary'
          }`}
        >
          {isProficient && <Check className="w-3 h-3 text-primary-foreground" />}
        </button>
        <button
          onClick={onToggleExpertise}
          className={`w-4 h-4 flex items-center justify-center transition-all ${
            isExpert ? 'text-primary' : 'text-muted-foreground/30 hover:text-muted-foreground'
          }`}
          disabled={!isProficient}
        >
          <Star className={`w-3 h-3 ${isExpert ? 'fill-primary' : ''}`} />
        </button>
        <span className="text-sm">
          {name}{' '}
          <span className="text-xs text-muted-foreground">({attributeAbbr})</span>
        </span>
      </div>
      <span className={`font-bold text-sm ${modifier >= 0 ? 'text-success' : 'text-destructive'}`}>
        {modifierDisplay}
      </span>
    </div>
  );
};
