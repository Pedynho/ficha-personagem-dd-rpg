import React, { useState } from 'react';
import type { Character } from '@/types/character';

type Props = {
    character: Character;
    onImportCharacter: (c: Partial<Character>) => void;
};

export const TabConfig = ({ character, onImportCharacter }: Props) => {
    const [json, setJson] = useState('');

    const handlePaste = () => {
        try {
            const parsed = JSON.parse(json);
            onImportCharacter(parsed);
            alert('Personagem importado com sucesso.');
        } catch (e) {
            alert('JSON inválido.');
        }
    };

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(character, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${character.name || 'character'}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-display">Configurações</h2>

            <div className="space-y-2">
                <label className="block text-sm">Exportar ficha</label>
                <button onClick={handleExport} className="px-3 py-2 bg-primary text-primary-foreground rounded">Exportar JSON</button>
            </div>

            <div className="space-y-2">
                <label className="block text-sm">Importar ficha (cole JSON abaixo)</label>
                <textarea value={json} onChange={(e) => setJson(e.target.value)} className="w-full h-40 input-fantasy p-2 rounded" />
                <div className="flex gap-2">
                    <button onClick={handlePaste} className="px-3 py-2 bg-primary text-primary-foreground rounded">Importar</button>
                    <button onClick={() => setJson('')} className="px-3 py-2 border rounded">Limpar</button>
                </div>
            </div>
        </div>
    );
};

export default TabConfig;
