import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, FileText, ArrowRight, ArrowLeft, RefreshCw, Leaf, BarChart3, Factory } from 'lucide-react';
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
  "oee_production": {
    content: "**OEE per Linea di Produzione — Oggi:**\n\n**OEE medio impianto: 78.5%** ⚠️ (target: 85%)\n\n**Dettaglio per linea:**\n- Linea Sedute Contract: **74.1%** ⚠️ (-2.3% vs ieri)\n- Linea Tavoli & Superfici: **81.2%** ⚠️\n- Linea Retail Standard: **83.5%** ⚠️\n- Linea Tailor Made: **76.8%** ⚠️\n\n**Principali cause di perdita OEE:**\n1. **Linea Sedute Contract** — micro-fermate nastro assemblaggio imbottitura (sensore prossimità da ricalibcare): -6.1%\n2. **Linea Tailor Made** — changeover setup frequenti per personalizzazioni: -4.2%\n3. **Linea Tavoli** — attesa materiali da magazzino (45 min fermo): -3.8%\n\n**Tasso Scarti attuale: 2.8%** ⚠️ (target: 2.0%)\n- Linea TM: 3.6% ⚠️ (rifilatura legno fuori tolleranza)\n- Linea Sedute: 2.9% ⚠️\n- Linea Retail: 1.8% ✓\n\n**Azione raccomandata:** Ricalibrazione sensore Linea Sedute Contract stima recupero +4.2% OEE e +85 unità/giorno.",
    references: ["Dashboard Produzione", "Report OEE Giornaliero"]
  },
  "carbon_footprint": {
    content: "**Carbon Footprint per Prodotto — Contract vs Tailor Made:**\n\n**Media CO2e per unità prodotta:**\n- Contract Standard: **12.4 kg CO2e/unità** ✓ (target: 12.0)\n- Retail: **14.1 kg CO2e/unità** ⚠️\n- Tailor Made: **19.7 kg CO2e/unità** ⚠️ (+59% vs Contract)\n\n**Cause principali del gap Tailor Made:**\n1. Materiali non standardizzati → supply chain più lunga (+4.2 kg CO2e)\n2. Lavorazioni aggiuntive e setup macchine (+2.1 kg CO2e)\n3. Spedizioni parziali più frequenti (+1.0 kg CO2e)\n\n**Opportunità di riduzione:**\n- Fornitori tessuti locali certificati Oeko-Tex: -2.8 kg CO2e/unità\n- Consolidare ordini TM in batch settimanali: -1.2 kg CO2e/unità\n- Obiettivo raggiungibile: **15.7 kg CO2e/unità** entro Q3 2025\n\n**Progressione target annuale -20% vs 2023:** attualmente a **-8.3%** ⚠️\nSostituendo il fornitore tessuti, si raggiungerebbe -22%, superando il target.",
    references: ["Report Carbon Footprint 2025", "Piano Decarbonizzazione Haworth"]
  },
  "channel_margins": {
    content: "**Margine Lordo per Canale — Settimana Corrente:**\n\n**Contract B2B: 38.4%** ✓ (target: 36%)\n**Retail: 42.1%** ✓ (target: 40%)\n**Tailor Made: 51.2%** ✓ (target: 48%)\n\n**Revenue mix questa settimana:**\n- Contract: €142,000 (58% del totale) → margine €54,528\n- Retail: €67,500 (27%) → margine €28,418\n- Tailor Made: €37,200 (15%) → margine €19,046\n\n**Insight AI:**\nIl canale Tailor Made ha il margine più alto (+12.8pp vs Contract) ma pesa solo il 15% del revenue. Aumentare il mix TM al 20% porterebbe un incremento margine di ~€12,000/settimana.\n\n**Sinergia rilevata:** I clienti Contract che hanno acquistato Tailor Made negli ultimi 6 mesi hanno un LTV 2.3x superiore alla media.",
    references: ["Dashboard Canali", "Analisi Marginalità per SKU"]
  },
  "takeback_program": {
    content: "**Programma Take-Back — Riepilogo Mese Corrente:**\n\n**Prodotti rientrati: 47 unità** (+12% vs mese scorso)\n\n**Distribuzione per canale di origine:**\n- Contract: 31 unità (66%) — principalmente sedute da ufficio\n- Retail: 11 unità (23%) — mix prodotti\n- Tailor Made: 5 unità (11%)\n\n**Tasso di Remanufacturing: 72%** ✓ (target: 70%)\n- 34 unità → remanufactured e reimmesse in catalogo Outlet\n- 9 unità → smontate per ricambi/materiali\n- 4 unità → avviate a filiera riciclo certificata\n\n**Valore recuperato:** €8,450 prodotti remanufactured | €1,200 materiali recuperati\n**CO2 evitata:** 2.8 ton CO2e (vs produzione nuova equivalente)\n\n**Azione raccomandata:** Attivare campagna proattiva take-back sui clienti Contract con prodotti > 7 anni. Identificati 87 clienti idonei. Potenziale: +30 unità/mese, -5.2 ton CO2e.",
    references: ["Report Take-Back Mensile", "Catalogo Outlet Remanufactured"]
  },
  "default": {
    content: "Ho analizzato i dati disponibili su produzione, sostenibilità e canali di vendita. Ecco la situazione attuale:\n\n**OEE impianto: 78.5%** ⚠️ (target 85%) — micro-fermate Linea Sedute Contract\n**Tasso Scarti: 2.8%** ⚠️ (target 2.0%)\n**Carbon Footprint: -8.3% vs 2023** ⚠️ (target -20%)\n**Remanufacturing: 72%** ✓ (target 70%)\n\nVuoi approfondire una di queste aree?"
  }
};

const suggestedQuestions = [
  {
    text: "Qual è l'OEE attuale per linea di produzione? Dove si concentrano le perdite?",
    icon: Factory,
    pillars: ["Produzione", "Tecnologia & Operations"]
  },
  {
    text: "Qual è il carbon footprint medio per prodotto Contract vs Tailor Made? Dove possiamo ridurre le emissioni?",
    icon: Leaf,
    pillars: ["Sostenibilità & Decarbonizzazione", "Circolarità"]
  },
  {
    text: "Come si distribuisce il margine lordo tra i canali Contract, Retail e Tailor Made questa settimana?",
    icon: BarChart3,
    pillars: ["Sinergia tra canali", "Costi & Marginalità"]
  },
  {
    text: "Quanti prodotti sono rientrati con il programma take-back questo mese? Qual è il tasso di remanufacturing?",
    icon: RefreshCw,
    pillars: ["Circolarità & Economia Circolare", "Sostenibilità"]
  }
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
    
    if (lowerQuestion.includes('oee') || lowerQuestion.includes('scarti') || lowerQuestion.includes('linea') || lowerQuestion.includes('produzione') || lowerQuestion.includes('perdite')) {
      return mockResponses['oee_production'];
    }
    if (lowerQuestion.includes('carbon') || lowerQuestion.includes('co2') || lowerQuestion.includes('emissioni') || lowerQuestion.includes('footprint')) {
      return mockResponses['carbon_footprint'];
    }
    if (lowerQuestion.includes('canali') || lowerQuestion.includes('margine') || lowerQuestion.includes('contract') || lowerQuestion.includes('retail') || lowerQuestion.includes('tailor')) {
      return mockResponses['channel_margins'];
    }
    if (lowerQuestion.includes('take-back') || lowerQuestion.includes('takeback') || lowerQuestion.includes('remanufactur') || lowerQuestion.includes('rientrat') || lowerQuestion.includes('riciclat') || lowerQuestion.includes('circolar')) {
      return mockResponses['takeback_program'];
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
                <img src={factoryGptLogo} alt="Haworth" className="w-6 h-6 object-contain rounded-full" />
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

            {/* Go to Haworth Hub button */}
            <div className="flex justify-center pt-4">
              <Button
                size="lg"
                onClick={onNavigateToFactory}
                className="gap-3 bg-primary hover:bg-primary/90 px-6"
              >
                <img src={factoryGptLogo} alt="Haworth" className="w-6 h-6 object-contain rounded-full" />
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
