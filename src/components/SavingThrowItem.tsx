import { Check } from 'lucide-react';

interface SavingThrowItemProps {
    name: string;
    abbr: string;
    modifier: number;
    isProficient: boolean;
    onToggle: () => void;
}

export const SavingThrowItem = ({
    name,
    modifier,
    isProficient,
    onToggle,
}: SavingThrowItemProps) => {
    const modifierDisplay = modifier >= 0 ? `+${modifier}` : `${modifier}`;

    return (
        <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
                <button
                    onClick={onToggle}
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isProficient
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground hover:border-primary'
                        }`}
                >
                    {isProficient && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                </button>
                <span className="text-sm">{name}</span>
            </div>
            <span className={`font-bold text-sm ${modifier >= 0 ? 'text-success' : 'text-destructive'}`}>
                {modifierDisplay}
            </span>
        </div>
    );
};
