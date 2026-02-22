import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, FileText, ArrowRight, Wrench, DollarSign, BookOpen, CheckCircle, ClipboardList, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types/factory';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import factoryGptLogo from '@/assets/factory-gpt-logo.png';
import { useLanguage } from '@/contexts/LanguageContext';

interface FactoryGPTChatProps {
  onNavigateToFactory?: () => void;
}

const mockResponses: Record<string, { content: string; references?: string[]; navigateTo?: string }> = {
  "energy_efficiency": {
    content: "**Analisi Rapporto Energia / Vetture Prodotte:**\n\n**Linea 2 ha il peggior rapporto energetico: 18.5 kWh/vettura** vs media impianto di 14.2 kWh/vettura.\n\n**Cause dell'inefficienza:**\n1. Le micro-fermate frequenti mantengono i sistemi attivi senza produzione effettiva, aumentando il consumo a vuoto del **31%**\n2. Il sensore di prossimità genera falsi positivi che causano cicli di stop/restart energeticamente costosi\n3. Il sistema di riscaldamento pressa rimane in standby attivo durante le fermate\n\n**Confronto linee:**\n- Linea 1: 13.8 kWh/vettura ✓\n- Linea 2: 18.5 kWh/vettura ⚠️ (+30% vs media)\n- Linea 3: 14.3 kWh/vettura ✓\n\n**Azione raccomandata:** Ricalibrare il sensore Linea 2 e implementare lo spegnimento automatico dei sistemi ausiliari durante le micro-fermate. Risparmio stimato: €2,800/settimana.",
    references: ["Report Consumi Energetici", "Dashboard Efficienza Linee"]
  },
  "tailor_made_changeover": {
    content: "**Impatto Changeover Tailor Made sull'OEE questa settimana:**\n\n**12 cambi configurazione** completati per ordini Tailor Made, con un impatto complessivo di **-3.1% sull'OEE**.\n\n**Dettaglio:**\n- Tempo totale fermo per setup: **4.2 ore**\n- Tempo medio per changeover: **21 min** (target: 15 min)\n- Linea più impattata: **Linea 1** con 7 cambi configurazione\n\n**Breakdown per linea:**\n- Linea 1: 7 changeover → 2.6h fermo → -4.1% OEE ⚠️\n- Linea 2: 3 changeover → 1.1h fermo → -2.3% OEE\n- Linea 3: 2 changeover → 0.5h fermo → -1.2% OEE\n\n**Root cause dei tempi lunghi:**\nI setup Tailor Made richiedono cambio stampi + ricalibrazione parametri qualità, allungando i tempi del 40% rispetto ai setup standard.\n\n**Azione raccomandata:** Ottimizzare la sequenza ordini per raggruppare configurazioni simili e ridurre i changeover del 30%. Risparmio stimato: 1.3h/settimana.",
    references: ["Piano Ordini Tailor Made", "Report Setup Changeover"]
  },
  "oee_drop": {
    content: "Ieri l'OEE è sceso del 2.3% principalmente a causa di **micro-fermate sulla Linea 2**. Il sensore di prossimità del nastro trasportatore ha generato 12 falsi positivi tra le 06:00 e le 08:00, causando fermi linea per circa 45 minuti in totale.\n\n**Causa principale:** La sensibilità del sensore era troppo alta dopo la calibrazione della settimana scorsa.\n\n**Impatto:** ~€2,100 in valore di produzione perso.\n\n**Azione raccomandata:** Ricalibrare il sensore di prossimità con le impostazioni aggiornate dalle Linee Guida di Calibrazione Sensori.",
    references: ["Linee Guida Calibrazione Sensori", "Report Performance Produzione"]
  },
  "maintenance_week": {
    content: "Basandomi sull'analisi predittiva e sulla manutenzione programmata, ecco le priorità di questa settimana:\n\n**Critico (Da Fare Oggi):**\n1. **Sistema Idraulico Pressa #3** - L'analisi delle vibrazioni mostra una probabilità del 73% di guasto pompa entro 72 ore. Tempo di fermo stimato in caso di guasto: 8+ ore.\n\n**Alta Priorità (Questa Settimana):**\n2. **Nastro Trasportatore Linea 2** - Ricalibrare i sensori che causano micro-fermate\n3. **Unità Confezionamento A** - Lubrificazione mensile (programmata venerdì)\n\n**Risparmio Potenziale:** Completare la manutenzione idraulica in modo proattivo potrebbe far risparmiare €15,000+ in riparazioni di emergenza e produzione persa.",
    references: ["Ordine di Lavoro WO-2024-0156", "Piano Manutenzione Preventiva"]
  },
  "scrap_cost": {
    content: "Analisi costi scarti di oggi:\n\n**Costo Totale Scarti: €3,450**\n\n**Dettaglio per Linea:**\n- Linea 1: €620 (1.8% tasso scarto) ✓ Nel target\n- Linea 2: €1,890 (3.2% tasso scarto) ⚠️ Sopra target\n- Linea 3: €940 (2.1% tasso scarto) ~ Al target\n\n**Problema Linea 2:** Gli scarti più alti correlano con le micro-fermate che causano disallineamento del prodotto. Le sequenze di riavvio dopo ogni stop hanno prodotto 23 pezzi difettosi.\n\n**Raccomandazione:** Sistemare il problema del sensore sulla Linea 2 ridurrebbe gli scarti giornalieri di circa €1,200.",
    references: ["Report Controllo Qualità", "Dashboard Analisi Scarti"]
  },
  "production": {
    content: "Certo! Ti porto subito alla sezione **Produzione** dove puoi vedere:\n\n- **Shopfloor Digitale (MES)** - Tracciamento ordini e stato produzione in tempo reale\n- **Performance Produzione** - OEE, produzione vs target, bottleneck\n- **Qualità** - Tracciamento difetti e analisi scarti\n\nClicca sul modulo che ti interessa nella barra laterale, oppure posso mostrarti direttamente i dati qui in chat.",
    navigateTo: "/production"
  },
  "maintenance": {
    content: "Ti porto alla sezione **Manutenzione**! Qui troverai:\n\n- Ordini di lavoro aperti e priorità\n- Analisi predittiva guasti\n- Piano manutenzione preventiva\n- Storico interventi",
    navigateTo: "/maintenance"
  },
  "quality": {
    content: "Andiamo alla sezione **Qualità**! Qui puoi monitorare:\n\n- Tasso di difettosità per linea\n- Trend qualità nel tempo\n- Analisi cause radice\n- Report ispezioni",
    navigateTo: "/production/quality"
  },
  "costs": {
    content: "Ecco la sezione **Costi**! Troverai:\n\n- Costi operativi per reparto\n- Analisi costi qualità e scarti\n- Trend e comparazioni\n- Budget vs actual",
    navigateTo: "/costs"
  },
  "factory_overview": {
    content: "Ecco l'overview dello stato attuale della fabbrica:\n\n**OEE Attuale: 78.5%** ⚠️\n\nNelle ultime 2 ore l'OEE è **diminuito del 2.3%** (era all'80.8% alle 08:00). La causa principale sono le **micro-fermate sulla Linea 2** dovute a falsi positivi del sensore di prossimità del nastro trasportatore.\n\n**Costo Scarti Oggi: €3,450**\n- Linea 1: €620 (1.8%) ✓\n- Linea 2: €1,890 (3.2%) ⚠️ Sopra target\n- Linea 3: €940 (2.1%)\n\n**Prossima Manutenzione Programmata:**\n📅 **16 Gennaio** - Sistema Idraulico Pressa #3 (Priorità Alta)\nTempo stimato: 4 ore | Motivo: Analisi vibrazioni indica usura precoce della pompa\n\n**Azione Consigliata:** Intervenire subito sul sensore Linea 2 per recuperare l'OEE e ridurre gli scarti.",
    references: ["Production Performance", "Quality", "Procedura Manutenzione Sistema Idraulico"]
  },
  "oee_plant_comparison": {
    content: "**Confronto OEE — Plant 1 vs Plant 2 (ultimi 90 giorni)**\n\n**Media OEE:**\n- Plant 1: **82.4%** (+1.2% vs trimestre precedente) ✓\n- Plant 2: **74.8%** (-2.7% vs trimestre precedente) ⚠️\n\n**Gap: 7.6 punti percentuali**\n\n**Root Cause Analysis — Plant 2:**\n\n**1. Availability (68.3% vs 85.1% Plant 1):**\n→ 14 fermi non pianificati negli ultimi 90gg, di cui 8 legati a guasti sistema idraulico. Tempo medio di ripristino: 3.2h vs 1.1h Plant 1.\n\n**2. Performance (87.2% vs 93.5% Plant 1):**\n→ Velocità ridotta del 12% sulle linee 2 e 4 per problemi ricorrenti di alimentazione materiale. Setup changeover Tailor Made più lunghi (+40% vs Plant 1).\n\n**3. Quality (96.1% vs 98.2% Plant 1):**\n→ Tasso scarto medio 3.1% su Plant 2 vs 1.8% Plant 1. Causa principale: calibrazione pressa non ottimale post-changeover.\n\n**Trend:** Plant 2 in peggioramento costante da 6 settimane. Senza intervento, l'OEE potrebbe scendere sotto il 72% entro fine mese.\n\n**Azioni raccomandate:**\n1. Piano manutenzione straordinaria sistema idraulico Plant 2\n2. Standardizzare procedure changeover Tailor Made (adottare best practice Plant 1)\n3. Implementare calibrazione automatica post-setup",
    references: ["Report OEE 90gg", "Analisi Comparativa Plant", "Piano Manutenzione Straordinaria"]
  },
  "default": {
    content: "Ho analizzato i dati disponibili tra Produzione, Manutenzione e Knowledge Base. Ecco cosa ho trovato:\n\nLa fabbrica sta attualmente operando al **78.5% OEE** con alcune aree di attenzione sulla Linea 2. Ci sono 3 ordini di lavoro pendenti per questa settimana, con la manutenzione della pompa idraulica come priorità massima.\n\nVuoi che approfondisca qualche area specifica?"
  }
};

const suggestedQuestions = [
  { text: "Quale linea ha il peggior rapporto energia consumata / vetture prodotte? Cosa sta causando l'inefficienza?", icon: ClipboardList, pillars: ["Tecnologia & Produzione", "Decarbonizzazione"] },
  { text: "Qual è l'impatto sull'OEE dei cambi di configurazione (setup changeover) legati agli ordini Tailor Made questa settimana?", icon: Wrench, pillars: ["Diversificazione dell'Offerta", "Tecnologia & Produzione"] },
  { text: "Qual è l'impatto economico degli scarti di oggi?", icon: DollarSign, pillars: ["Decarbonizzazione", "Tecnologia & Produzione"] },
  { text: "Dammi un confronto OEE tra Plant 1 e Plant 2 negli ultimi 90 giorni, con root cause analysis.", icon: BookOpen, pillars: ["Tecnologia & Produzione", "Diversificazione dell'Offerta"] },
];

export const FactoryGPTChat = ({ onNavigateToFactory }: FactoryGPTChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    if ((lowerQuestion.includes('plant') || lowerQuestion.includes('confronto')) && lowerQuestion.includes('oee') && (lowerQuestion.includes('90') || lowerQuestion.includes('root cause'))) {
      return mockResponses['oee_plant_comparison'];
    }
    if ((lowerQuestion.includes('energia') || lowerQuestion.includes('energy')) && (lowerQuestion.includes('vettur') || lowerQuestion.includes('rapporto') || lowerQuestion.includes('inefficienza'))) {
      return mockResponses['energy_efficiency'];
    }
    if ((lowerQuestion.includes('changeover') || lowerQuestion.includes('setup') || lowerQuestion.includes('tailor made')) && (lowerQuestion.includes('oee') || lowerQuestion.includes('impatto'))) {
      return mockResponses['tailor_made_changeover'];
    }
    if ((lowerQuestion.includes('overview') || lowerQuestion.includes('status')) && (lowerQuestion.includes('fabbrica') || lowerQuestion.includes('factory'))) {
      return mockResponses['factory_overview'];
    }
    if (lowerQuestion.includes('oee') && (lowerQuestion.includes('cal') || lowerQuestion.includes('drop') || lowerQuestion.includes('sceso'))) {
      return mockResponses['oee_drop'];
    }
    if ((lowerQuestion.includes('manutenzione') || lowerQuestion.includes('maintenance')) && (lowerQuestion.includes('settimana') || lowerQuestion.includes('week'))) {
      return mockResponses['maintenance_week'];
    }
    if ((lowerQuestion.includes('cost') || lowerQuestion.includes('scart') || lowerQuestion.includes('scrap')) && (lowerQuestion.includes('impatto') || lowerQuestion.includes('oggi'))) {
      return mockResponses['scrap_cost'];
    }
    if (lowerQuestion.includes('produzione') || lowerQuestion.includes('production') || lowerQuestion.includes('mes')) {
      return mockResponses['production'];
    }
    if (lowerQuestion.includes('manutenzione') && lowerQuestion.includes('portami')) {
      return mockResponses['maintenance'];
    }
    if (lowerQuestion.includes('qualità') || lowerQuestion.includes('quality')) {
      return mockResponses['quality'];
    }
    if (lowerQuestion.includes('costi') || lowerQuestion.includes('costs')) {
      return mockResponses['costs'];
    }
    return mockResponses['default'];
  };

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(messageText);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        references: response.references
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Auto-navigate if response suggests it
      if (response.navigateTo) {
        setTimeout(() => {
          navigate(response.navigateTo!);
        }, 2000);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-16 py-8">
        {messages.length > 0 && (
          <div className="max-w-3xl mx-auto mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMessages([])}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('newChat')}
            </Button>
          </div>
        )}
        {messages.length === 0 ? (
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Welcome Message */}
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-3">{t('welcomeMessage')}</h1>
              <p className="text-muted-foreground text-lg">
                {t('chatPlaceholder')}
              </p>
            </div>
            
            {/* Suggested Questions */}
            <div className="grid gap-3 md:grid-cols-2">
              {suggestedQuestions.map((question, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(question.text)}
                  className="flex flex-col gap-2 p-4 rounded-xl border bg-card hover:bg-muted/50 text-left transition-all group hover:shadow-md"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <question.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium flex-1">{question.text}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 pl-14">
                    {question.pillars.map((pillar, j) => (
                      <span
                        key={j}
                        className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Access to Factory */}
            <div className="flex justify-center pt-4">
              <Button
                size="lg"
                onClick={onNavigateToFactory}
                className="gap-3 bg-primary hover:bg-primary/90 px-6"
              >
                <img src={factoryGptLogo} alt="Factory" className="w-6 h-6 object-contain rounded-full" />
                <span className="text-primary-foreground">{t('goToFactory')}</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "animate-slide-up",
                  message.role === 'user' ? 'flex justify-end' : ''
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%]",
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-md px-5 py-3' 
                      : 'bg-muted/50 rounded-2xl rounded-bl-md px-5 py-4'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-primary">FactoryGPT</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content.split('**').map((part, i) => 
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                  </div>
                  
                  {message.references && message.references.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground mb-2">{t('references')}:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.references.map((ref, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 text-xs bg-background px-2.5 py-1.5 rounded-md border"
                          >
                            <FileText className="w-3 h-3 text-primary" />
                            {ref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="bg-muted/50 rounded-2xl rounded-bl-md px-5 py-4 max-w-[85%]">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary">FactoryGPT</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Portami alla Factory button in center of chat */}
            <div className="flex justify-center pt-4">
              <Button
                size="lg"
                onClick={onNavigateToFactory}
                className="gap-3 bg-primary hover:bg-primary/90 px-6"
              >
                <img src={factoryGptLogo} alt="Factory" className="w-6 h-6 object-contain rounded-full" />
                <span className="text-primary-foreground">{t('goToFactory')}</span>
              </Button>
            </div>
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-8 lg:px-16 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-2 border focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('typeMessage')}
              className="flex-1 bg-transparent py-2 text-sm focus:outline-none placeholder:text-muted-foreground/70"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              size="icon"
              className="shrink-0 rounded-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">
            FactoryGPT può commettere errori. Verifica sempre le informazioni critiche.
          </p>
        </div>
      </div>
    </div>
  );
};
