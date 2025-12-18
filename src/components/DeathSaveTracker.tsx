import { Skull, Heart } from 'lucide-react';

interface DeathSaveTrackerProps {
    successes: number;
    failures: number;
    onSuccessChange: (value: number) => void;
    onFailureChange: (value: number) => void;
}

export const DeathSaveTracker = ({
    successes,
    failures,
    onSuccessChange,
    onFailureChange,
}: DeathSaveTrackerProps) => {
    return (
        <div className="bg-secondary/30 rounded-lg p-3">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-display mb-2">
                Testes contra a Morte
            </h4>
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-success" />
                    <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                            <button
                                key={i}
                                onClick={() => onSuccessChange(successes === i ? i - 1 : i)}
                                className={`w-5 h-5 rounded-full border-2 transition-all ${i <= successes
                                        ? 'bg-success border-success'
                                        : 'border-success/50 hover:border-success'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Skull className="w-4 h-4 text-destructive" />
                    <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                            <button
                                key={i}
                                onClick={() => onFailureChange(failures === i ? i - 1 : i)}
                                className={`w-5 h-5 rounded-full border-2 transition-all ${i <= failures
                                        ? 'bg-destructive border-destructive'
                                        : 'border-destructive/50 hover:border-destructive'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
