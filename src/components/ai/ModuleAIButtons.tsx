import { useState, useRef, useEffect } from 'react';
import { Sparkles, Search, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AskFactoryGPTModal } from './AskFactoryGPTModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ModuleAIButtonsProps {
  moduleName: string;
  investigateResponse?: string;
}

const defaultInvestigateResponses: Record<string, string> = {
  'Produzione': "📊 **Analisi Automatica - Produzione**\n\n**Cosa potresti voler sapere:**\n\n**1. Quale linea ha il peggior rapporto energia consumata / vetture prodotte? Cosa sta causando l'inefficienza?**\n→ La Linea 2 presenta il peggior rapporto energetico: 18.5 kWh/vettura vs media impianto di 14.2 kWh. Le micro-fermate frequenti mantengono i sistemi attivi senza produzione effettiva, aumentando il consumo a vuoto del 31%.\n\n**2. Qual è l'impatto sull'OEE dei cambi di configurazione (setup changeover) legati agli ordini Tailor Made questa settimana?**\n→ I 12 changeover Tailor Made hanno causato 4.2h di fermo totale, riducendo l'OEE del 3.1%. Il tempo medio di setup è 21 min vs target 15 min. La Linea 1 è la più impattata con 7 cambi configurazione.\n\n**3. La performance della Linea 1 è sostenibile?**\n→ Sì, ma il sistema idraulico necessita manutenzione urgente entro questa settimana.\n\n**Azione:** Ottimizzare la sequenza ordini Tailor Made per ridurre i changeover e ricalibrare i parametri energetici della Linea 2.",
  'Manutenzione': "🔧 **Analisi Automatica - Manutenzione**\n\n**Cosa potresti voler sapere:**\n\n**1. Qual è la manutenzione più urgente?**\n→ Sistema Idraulico Pressa #3 - L'analisi vibrazioni mostra 73% probabilità di guasto entro 72h. Ultima manutenzione >1 anno fa.\n\n**2. C'è un pattern nei fermi non pianificati?**\n→ Sì, la Linea 2 ha avuto 3 fermi nelle ultime 2 settimane, tutti legati al sensore di prossimità del nastro.\n\n**3. Siamo in ritardo su qualche manutenzione preventiva?**\n→ 2 work order in ritardo: lubrificazione Packaging Unit e controllo cinghie Linea 3.\n\n**Azione:** Completare la manutenzione del sistema idraulico entro venerdì per evitare un fermo stimato di 8+ ore.",
  'Qualità': "✅ **Analisi Automatica - Qualità**\n\n**Cosa potresti voler sapere:**\n\n**1. Perché lo scrap rate è sopra target?**\n→ La Linea 2 ha 3.2% vs target 2.5%. Le micro-fermate causano disallineamento prodotto alle ripartenze.\n\n**2. Qual è il difetto più costoso?**\n→ 'Difetti dimensionali' rappresentano il 42% degli scarti totali (€1,890 oggi). Correlato alla calibrazione pressa.\n\n**3. Ci sono trend preoccupanti?**\n→ Lo scrap trend è in aumento da 3 giorni sulla Linea 2. Se non interveniamo, potrebbe raggiungere 4% entro fine settimana.\n\n**Azione:** Verificare calibrazione pressa Linea 2 e parametri di setup turno mattutino.",
  'Costi': "💰 **Analisi Automatica - Costi**\n\n**Cosa potresti voler sapere:**\n\n**1. Cosa sta facendo salire i costi?**\n→ Gli scarti della Linea 2 stanno aggiungendo €1,890/giorno sopra il target. È il driver principale.\n\n**2. Quale SKU ha il costo unitario più alto?**\n→ Componente A-500 con €12.50/unità (+3.2% vs periodo precedente). Il costo energia è salito del 5%.\n\n**3. Dove possiamo risparmiare subito?**\n→ Risolvere il problema sensore Linea 2 = -€1,200/giorno in scarti. ROI immediato.\n\n**Azione:** Il fix del sensore Linea 2 genererebbe un risparmio di ~€30,000/mese.",
  'KHAI': "📚 **Analisi Automatica - Know How Aziendale**\n\n**Cosa potresti voler sapere:**\n\n**1. Quali procedure sono più consultate questa settimana?**\n→ 'Sensor Calibration Guidelines' e 'LOTO Procedure' - coerente con i problemi attuali sulla Linea 2.\n\n**2. Ci sono procedure scadute da aggiornare?**\n→ 2 documenti non aggiornati da >6 mesi: 'Quality Standards ISO 9001' e 'Emergency Shutdown Procedure'.\n\n**3. Quali playbook sono più rilevanti ora?**\n→ 'Equipment Malfunction Response' dato il rischio guasto sistema idraulico.\n\n**Azione:** Aggiornare la procedura di calibrazione sensori con le nuove impostazioni post-fix Linea 2.",
  'Piano Produzione': "📋 **Analisi Automatica - Piano Produzione**\n\n**Cosa potresti voler sapere:**\n\n**1. Ci sono ordini bloccati?**\n→ Sì, l'ordine ORD-2024-0158 (Modulo C-150) è fermo sulla Linea 2 a causa del sensore difettoso. 234/750 pezzi completati.\n\n**2. Riusciremo a completare tutto oggi?**\n→ Con il blocco attuale, stimiamo un ritardo di 2h sull'ordine C-150. Gli altri ordini sono in linea.\n\n**3. Chi è sovraccarico?**\n→ Giuseppe Verdi è assegnato all'ordine bloccato. Potrebbe essere redistribuito temporaneamente.\n\n**Azione:** Sbloccare l'ordine ORD-2024-0158 risolvendo il problema sensore sulla Linea 2.",
};

export const ModuleAIButtons = ({ moduleName, investigateResponse }: ModuleAIButtonsProps) => {
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [isInvestigateOpen, setIsInvestigateOpen] = useState(false);
  const [followUpMessages, setFollowUpMessages] = useState<{id: string; role: 'user'|'assistant'; content: string}[]>([]);
  const [followUpInput, setFollowUpInput] = useState('');
  const [isFollowUpTyping, setIsFollowUpTyping] = useState(false);
  const followUpEndRef = useRef<HTMLDivElement>(null);

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

  const response = investigateResponse || defaultInvestigateResponses[moduleName] || defaultInvestigateResponses['Produzione'];

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
              FactoryGPT Investigation
            </DialogTitle>
            <p className="text-sm font-semibold text-primary mt-1">Analisi AI — {moduleName}</p>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {response.split('**').map((part, i) => {
                    if (i % 2 === 1) {
                      const isHighlight = part.startsWith('Analisi Automatica') || 
                                          part === 'Cosa potresti voler sapere:' || 
                                          part === 'Azione:' ||
                                          part.startsWith('Azione:');
                      return (
                        <strong key={i} className={isHighlight ? 'text-primary text-base' : ''}>
                          {part}
                        </strong>
                      );
                    }
                    return part;
                  })}
                </div>
              </div>
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
                placeholder="Fai una domanda di approfondimento..."
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
