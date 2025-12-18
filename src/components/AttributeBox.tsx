import { ATTRIBUTES } from '@/types/character';

interface AttributeBoxProps {
  attribute: typeof ATTRIBUTES[number];
  value: number;
  modifier: number;
  onChange: (value: number) => void;
}

export const AttributeBox = ({ attribute, value, modifier, onChange }: AttributeBoxProps) => {
  const modifierDisplay = modifier >= 0 ? `+${modifier}` : `${modifier}`;

  return (
    <div className="attribute-box rounded-lg p-3 flex flex-col items-center gap-1 animate-fadeIn">
      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-display">
        {attribute.abbr}
      </span>
      <span className="text-2xl font-bold text-primary font-display">
        {modifierDisplay}
      </span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-12 h-8 text-center bg-secondary/50 rounded border border-border text-sm focus:outline-none focus:border-primary"
      />
    </div>
  );
};
