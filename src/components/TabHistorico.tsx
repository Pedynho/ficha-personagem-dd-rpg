import React, { useState } from 'react';
import type { Character } from '@/types/character';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
    character: Character;
    onCharacterChange: <K extends keyof Character>(field: K, value: Character[K]) => void;
}

export const TabHistorico = ({ character, onCharacterChange }: Props) => {
    const [nota, setNota] = useState('');

    const addNota = () => {
        const text = nota.trim();
        if (!text) return;
        const newItem = { datetime: new Date().toISOString(), nota: text };
        onCharacterChange('historico', [...character.historico, newItem]);
        setNota('');
    };

    const removeNota = (index: number) => {
        const updated = character.historico.filter((_, i) => i !== index);
        onCharacterChange('historico', updated);
    };

    return (
        <div className="space-y-4 animate-fadeIn">
            <h2 className="text-lg font-display">Histórico</h2>

            <div className="bg-card rounded-lg p-4 card-glow">
                <label className="block text-sm mb-2">Adicionar Nota</label>
                <div className="flex flex-col gap-2">
                    <textarea
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
                        className="w-full max-w-full input-fantasy p-2 rounded h-24 resize-none overflow-auto"
                        placeholder="Escreva sua nota sobre a sessão..."
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={addNota}
                            className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                {character.historico.length === 0 && (
                    <div className="text-sm text-muted-foreground">Nenhuma nota registrada.</div>
                )}

                {character.historico.slice().reverse().map((item, idx) => {
                    // reversed index to show newest first
                    const realIndex = character.historico.length - 1 - idx;
                    return (
                        <div key={item.datetime} className="bg-card rounded-lg p-3 flex justify-between items-start">
                            <div>
                                <div className="text-xs text-muted-foreground">{new Date(item.datetime).toLocaleString('pt-BR')}</div>
                                <div className="mt-1 text-sm whitespace-pre-wrap">{item.nota}</div>
                            </div>
                            <button onClick={() => removeNota(realIndex)} className="p-1 text-destructive hover:bg-destructive/20 rounded">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TabHistorico;
