import { Minus, Plus } from 'lucide-react';

interface SpellSlotTrackerProps {
  level: number;
  total: number;
  used: number;
  onUse: () => void;
  onRestore: () => void;
  onTotalChange: (total: number) => void;
}

export const SpellSlotTracker = ({
  level,
  total,
  used,
  onUse,
  onRestore,
  onTotalChange,
}: SpellSlotTrackerProps) => {
  const available = total - used;

  return (
    <div className="flex items-center justify-between py-2 px-3 bg-secondary/30 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm font-display text-primary">Nível {level}</span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all ${
                i < available ? 'spell-slot-available' : 'spell-slot-used'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onRestore}
          disabled={used === 0}
          className="p-1 hover:bg-success/20 rounded disabled:opacity-30"
        >
          <Plus className="w-4 h-4 text-success" />
        </button>
        <button
          onClick={onUse}
          disabled={available === 0}
          className="p-1 hover:bg-destructive/20 rounded disabled:opacity-30"
        >
          <Minus className="w-4 h-4 text-destructive" />
        </button>
        <input
          type="number"
          value={total}
          onChange={(e) => onTotalChange(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-10 h-6 text-center bg-input rounded border border-border text-xs focus:outline-none focus:border-primary"
          min={0}
        />
      </div>
    </div>
  );
};
