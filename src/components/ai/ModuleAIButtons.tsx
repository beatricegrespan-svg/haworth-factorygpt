import { useState, useRef, useEffect } from 'react';
import { Sparkles, Search, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AskFactoryGPTModal } from './AskFactoryGPTModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';

interface ModuleAIButtonsProps {
  moduleName: string;
  moduleInsight?: string;
  moduleReferences?: string[];
}

const defaultModuleInsights: Record<string, { text: string; references: string[] }> = {
  'Produzione': {
    text: "Problema principale: micro-fermate Linea Sedute Contract. OEE impianto al 78.5% vs target 85%. Azione raccomandata: stima recupero +4.2% OEE, +85 unità/giorno. Linea Tailor Made penalizzata da changeover frequenti: raggruppare ordini simili riduce scarto al 2.2%.",
    references: ["Dashboard Produzione", "Report OEE Giornaliero"]
  },
  'Sostenibilità': {
    text: "Il 60% delle emissioni è Scope 3 (supply chain). Il fornitore tessuti non certificato Tailor Made contribuisce da solo al 14% delle emissioni totali. Sostituirlo con alternativa Oeko-Tex ridurrebbe le emissioni di 19.9 ton CO2e/anno, portando il progresso al -22% vs 2023 — superando il target annuale del -20%.",
    references: ["Report Carbon Footprint 2025", "Piano Decarbonizzazione Haworth"]
  },
  'Circolarità': {
    text: "Il catalogo materiali Tailor Made è il principale ostacolo al target 75% di circolarità (attuale: 58.4%). Aggiornando i fornitori tessuti con alternative Oeko-Tex certificate, si stima un incremento al 73.1% entro Q2 2025, con -18 ton CO2e/anno. Azione: avviare RFQ per 3 fornitori alternativi certificati entro fine mese.",
    references: ["Catalogo Materiali Certificati", "Report Circolarità Q1 2025"]
  },
  'Canali': {
    text: "I clienti Contract che acquistano Tailor Made hanno LTV 2.3x superiore alla media. Attivare una campagna cross-selling sui 23 account chiave identificati potrebbe generare +€18,000 di margine mensile, portando il peso Tailor Made al 20% del revenue totale.",
    references: ["Dashboard Canali", "Analisi Marginalità per SKU"]
  },
  'Fornitori': {
    text: "Il fornitore tessuti TM-04 (Tessutificio Nord, peso 18% della spesa) è l'unico senza certificazione ambientale e ha il peggior ESG score del panel (42/100). È anche il principale driver del gap carbonio Tailor Made. Azione prioritaria: avviare processo di sostituzione o audit miglioramento entro Q2 2025.",
    references: ["Panel Fornitori ESG 2025", "Analisi Rischio Supply Chain"]
  },
  'Costi': {
    text: "Il costo degli scarti è cresciuto del 12.5% nell'ultimo mese, principalmente sulla Linea Tailor Made (+€850 vs settimana scorsa). La causa è correlata al difetto di rifilatura legno (QI-002 in corso di analisi). Risolvere il difetto ridurrebbe il costo scarti di ~€1,200/settimana.",
    references: ["Report Costi Qualità", "Dashboard Analisi Scarti"]
  },
  'KHAI': {
    text: "Le procedure più consultate questa settimana sono 'Procedura Take-Back Prodotto' e 'Certificazioni Fornitori Oeko-Tex', coerenti con le priorità correnti di sostenibilità. 2 documenti scaduti da aggiornare: 'Standard Qualità ISO 9001' e 'Protocollo Carbon Footprint'.",
    references: ["Libreria Conoscenze", "Report Utilizzo Procedure"]
  },
};

export const ModuleAIButtons = ({ moduleName, moduleInsight, moduleReferences }: ModuleAIButtonsProps) => {
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [isInvestigateOpen, setIsInvestigateOpen] = useState(false);
  const [followUpMessages, setFollowUpMessages] = useState<{id: string; role: 'user'|'assistant'; content: string}[]>([]);
  const [followUpInput, setFollowUpInput] = useState('');
  const [isFollowUpTyping, setIsFollowUpTyping] = useState(false);
  const followUpEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    followUpEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [followUpMessages]);

  useEffect(() => {
    if (!isInvestigateOpen) {
      setFollowUpMessages([]);
      setFollowUpInput('');
    }
  }, [isInvestigateOpen]);

  const handleFollowUpSend = () => {
    if (!followUpInput.trim() || isFollowUpTyping) return;
    const userMsg = { id: Date.now().toString(), role: 'user' as const, content: followUpInput };
    setFollowUpMessages(prev => [...prev, userMsg]);
    setFollowUpInput('');
    setIsFollowUpTyping(true);
    setTimeout(() => {
      const aiMsg = { id: (Date.now() + 1).toString(), role: 'assistant' as const, content: `Ho analizzato la tua domanda riguardo "${userMsg.content}". Sulla base dei dati attuali del modulo **${moduleName}**, posso confermare che i parametri sono in linea con quanto riportato nell'analisi precedente. Ti consiglio di verificare i dettagli direttamente nel modulo dedicato.` };
      setFollowUpMessages(prev => [...prev, aiMsg]);
      setIsFollowUpTyping(false);
    }, 1500);
  };

  const insightData = defaultModuleInsights[moduleName] || defaultModuleInsights['Produzione'];
  const insightText = moduleInsight || insightData.text;
  const insightRefs = moduleReferences || insightData.references;

  return (
    <>
      <Button
        onClick={() => setIsAskOpen(true)}
        className="fixed bottom-6 right-6 z-40 shadow-lg gap-2 bg-primary hover:bg-primary/90"
        size="lg"
      >
        <Sparkles className="w-5 h-5" />
        Ask FactoryGPT
      </Button>

      <AskFactoryGPTModal 
        isOpen={isAskOpen} 
        onClose={() => setIsAskOpen(false)}
        onInvestigate={() => {
          setIsAskOpen(false);
          setIsInvestigateOpen(true);
        }}
      />

      <Dialog open={isInvestigateOpen} onOpenChange={setIsInvestigateOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              {t('investigateLabel')}
            </DialogTitle>
            <p className="text-sm font-semibold text-primary mt-1">Analisi AI — {moduleName}</p>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {insightText.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                  )}
                </div>
              </div>
              {insightRefs.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50 ml-8">
                  <p className="text-xs text-muted-foreground mb-1">{t('references')}:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {insightRefs.map((ref, i) => (
                      <span key={i} className="text-xs bg-accent px-2 py-1 rounded">{ref}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {followUpMessages.map((msg) => (
              <div key={msg.id} className={msg.role === 'user' ? 'flex justify-end' : ''}>
                <div className={msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]' : 'p-4 rounded-lg bg-muted/50'}>
                  <div className="flex items-start gap-3">
                    {msg.role === 'assistant' && <Sparkles className="w-5 h-5 text-primary shrink-0 mt-1" />}
                    <div className="text-sm whitespace-pre-wrap">
                      {msg.content.split('**').map((part, i) => 
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isFollowUpTyping && (
              <div className="p-4 rounded-lg bg-muted/50 animate-pulse">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                </div>
              </div>
            )}
            <div ref={followUpEndRef} />
          </div>
          <div className="pt-3 border-t">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={followUpInput}
                onChange={(e) => setFollowUpInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleFollowUpSend(); } }}
                placeholder={t('followUpPlaceholder')}
                className="flex-1 bg-background border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button onClick={handleFollowUpSend} disabled={!followUpInput.trim() || isFollowUpTyping} size="icon" className="shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
