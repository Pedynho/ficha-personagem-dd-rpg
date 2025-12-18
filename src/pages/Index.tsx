import { useState } from 'react';
import { useCharacter } from '@/hooks/useCharacter';
import { TabAtributos } from '@/components/TabAtributos';
import { TabCombate } from '@/components/TabCombate';
import { TabInventario } from '@/components/TabInventario';
import { TabPerfil } from '@/components/TabPerfil';
import { TabMagias } from '@/components/TabMagias';
import { TabConfig } from '@/components/TabConfig';
import { 
  Dices, 
  Swords, 
  Package, 
  User, 
  Sparkles,
  Settings,
  RotateCcw,
  Moon,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

type TabKey = 'atributos' | 'combate' | 'inventario' | 'perfil' | 'magias' | 'config';

const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'atributos', label: 'Atributos', icon: Dices },
  { key: 'combate', label: 'Combate', icon: Swords },
  { key: 'inventario', label: 'Inventário', icon: Package },
  { key: 'perfil', label: 'Perfil', icon: User },
  { key: 'magias', label: 'Magias', icon: Sparkles },
  { key: 'config', label: 'Config', icon: Settings },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('atributos');
  const {
    character,
    updateCharacter,
    updateAttribute,
    updateSpellcasting,
    updateDeathSaves,
    updateTreasure,
    toggleProficiency,
    toggleExpertise,
    useSpellSlot,
    restoreSpellSlot,
    longRest,
    resetCharacter,
    importCharacter,
    getModifier,
  } = useCharacter();

  const handleLongRest = () => {
    longRest();
    toast.success('Descanso Longo realizado!', {
      description: 'HP restaurado, dados de vida recuperados e espaços de magia recarregados.',
    });
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar a ficha? Todos os dados serão perdidos.')) {
      resetCharacter();
      toast.success('Ficha resetada!');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="container max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-display text-gradient-gold truncate">
                {character.name || 'Nova Ficha'}
              </h1>
              {character.className && (
                <p className="text-xs text-muted-foreground truncate">
                  {character.race} {character.className} Nv. {character.level}
                </p>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem onClick={handleLongRest} className="gap-2 cursor-pointer">
                  <Moon className="w-4 h-4" />
                  Descanso Longo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleReset} className="gap-2 cursor-pointer text-destructive">
                  <RotateCcw className="w-4 h-4" />
                  Resetar Ficha
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-lg mx-auto px-4 py-4 pb-24">
        {activeTab === 'atributos' && (
          <TabAtributos
            character={character}
            onAttributeChange={updateAttribute}
            onToggleProficiency={toggleProficiency}
            onToggleExpertise={toggleExpertise}
            onCharacterChange={updateCharacter}
            getModifier={getModifier}
          />
        )}
        {activeTab === 'combate' && (
          <TabCombate
            character={character}
            onCharacterChange={updateCharacter}
            onDeathSaveChange={updateDeathSaves}
            getModifier={getModifier}
          />
        )}
        {activeTab === 'inventario' && (
          <TabInventario
            character={character}
            onCharacterChange={updateCharacter}
            onTreasureChange={updateTreasure}
          />
        )}
        {activeTab === 'perfil' && (
          <TabPerfil
            character={character}
            onCharacterChange={updateCharacter}
          />
        )}
        {activeTab === 'magias' && (
          <TabMagias
            character={character}
            onCharacterChange={updateCharacter}
            onSpellcastingChange={updateSpellcasting}
            onUseSpellSlot={useSpellSlot}
            onRestoreSpellSlot={restoreSpellSlot}
          />
        )}
        {activeTab === 'config' && (
          <TabConfig
            character={character}
            onImportCharacter={importCharacter}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border safe-area-pb">
        <div className="container max-w-lg mx-auto">
          <div className="flex justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex flex-col items-center py-3 px-2 transition-all ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-primary/20' : ''}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] mt-1 font-display tracking-wide ${isActive ? 'text-primary' : ''}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
