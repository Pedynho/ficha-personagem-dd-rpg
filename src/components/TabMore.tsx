import React, { useState } from 'react';
import type { Character } from '@/types/character';

type Props = {
    character: Character;
    onImportCharacter: (c: Partial<Character>) => void;
};

export const TabMore = ({ character, onImportCharacter }: Props) => {
    const [json, setJson] = useState('');
    const [copied, setCopied] = useState(false);
    const pixKey = '949b1858-d509-4c4a-9bb7-51729f2744e9';

    const copyPixKey = async () => {
        try {
            await navigator.clipboard.writeText(pixKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            alert('Não foi possível copiar a chave.');
        }
    };

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
            <h2 className="text-lg font-display">Doação</h2>
            <div className="bg-card rounded-lg p-4 card-glow">
                <p className='text-sm ml-1 mt-2'><strong>PicPay:</strong> Pedro Afonso Gomes Moura</p>
                <div className="flex items-center gap-3 mt-2">
                    <div className="w-12 h-12 flex-none flex items-center justify-center rounded bg-white/5">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="4" fill="#12B886" />
                            <text x="12" y="16" textAnchor="middle" fontSize="9" fontFamily="Arial" fill="white">PIX</text>
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">Chave PIX</div>
                        <div className="mt-1 flex items-center gap-2">
                            <div className="text-sm text-muted-foreground truncate">{pixKey}</div>
                            <button onClick={copyPixKey} className="px-2 py-1 bg-primary text-primary-foreground rounded text-sm">
                                {copied ? 'Copiado!' : 'Copiar chave'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-lg font-display">Exportar/Importar</h2>
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
            <div className='space-y-2'>

            </div>
        </div>
    );
};

export default TabMore;
