import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, FileText, ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types/factory';
import { preloadedQuestions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Map reference names to routes
const referenceRoutes: Record<string, string> = {
  "Quality Incidents Table - Linea 2": "/production/quality",
  "Scrap Declaration Log 10:00": "/production/quality",
  "Quality Control Report": "/production/quality",
  "Scrap Analysis Dashboard": "/production/quality",
  "Sensor Calibration Guidelines": "/knowledge",
  "Production Performance Report": "/production",
  "Work Order WO-2024-0156": "/maintenance",
  "Preventive Maintenance Schedule": "/maintenance",
  "Factory Overview Report": "/factory",
};

interface AskFactoryGPTModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvestigate?: () => void;
}

const mockResponses: Record<string, { content: string; references?: string[] }> = {
  "why did oee drop yesterday": {
    content: "Yesterday's OEE dropped by 2.3% primarily due to **micro-stoppages on Line 2**. The conveyor belt proximity sensor triggered 12 false positives between 06:00-08:00, causing the line to stop for approximately 45 minutes total.\n\n**Root Cause:** Sensor sensitivity was set too high after last week's calibration.\n\n**Impact:** ~€2,100 in lost production value.\n\n**Recommended Action:** Recalibrate the proximity sensor with the updated settings from the Sensor Calibration Guidelines.",
    references: ["Sensor Calibration Guidelines", "Production Performance Report"]
  },
  "what maintenance should i do this week": {
    content: "Based on predictive analysis and scheduled maintenance, here are this week's priorities:\n\n**Critical (Do Today):**\n1. **Press #3 Hydraulic System** - Vibration analysis shows 73% probability of pump failure within 72 hours. Estimated downtime if it fails: 8+ hours.\n\n**High Priority (This Week):**\n2. **Conveyor Belt Line 2** - Recalibrate sensors causing micro-stoppages\n3. **Packaging Unit A** - Monthly lubrication (scheduled Friday)\n\n**Potential Savings:** Completing the hydraulic maintenance proactively could save €15,000+ in emergency repair and lost production.",
    references: ["Work Order WO-2024-0156", "Preventive Maintenance Schedule"]
  },
  "cost impact of today's scrap": {
    content: "Today's scrap cost analysis:\n\n**Total Scrap Cost: €3,450**\n\n**Breakdown by Line:**\n- Line 1: €620 (1.8% scrap rate) ✓ Within target\n- Line 2: €1,890 (3.2% scrap rate) ⚠️ Above target\n- Line 3: €940 (2.1% scrap rate) ~ At target\n\n**Line 2 Issue:** Higher scrap correlates with the micro-stoppages causing product misalignment. The restart sequences after each stop produced 23 defective pieces.\n\n**Recommendation:** Fixing the sensor issue on Line 2 would reduce daily scrap by approximately €1,200.",
    references: ["Quality Control Report", "Scrap Analysis Dashboard"]
  },
  "qualità abbassata": {
    content: "Analizzando i dati di produzione, ho identificato la causa del calo di qualità alle **13:00**.\n\n**Root Cause:** Alle ore **10:00** sono stati dichiarati **23 pezzi di scarto** sulla **Linea 2** con causale **\"Difetti dimensionali\"**. Questo ha impattato l'indice di qualità OEE che è sceso dal 98% al 96% nelle ore successive.\n\n**Dettaglio:**\n- **Orario dichiarazione scarti:** 10:00\n- **Linea coinvolta:** Linea 2\n- **Causale:** Difetti dimensionali (fuori tolleranza)\n- **Quantità:** 23 pezzi\n- **Impatto economico:** €890\n\n**Correlazione:** Il calo visibile alle 13:00 riflette l'aggiornamento del calcolo OEE rolling che include la finestra oraria delle 10:00.\n\n**Azione consigliata:** Verificare la calibrazione della pressa sulla Linea 2 e controllare i parametri di setup del turno mattutino.",
    references: ["Quality Incidents Table - Linea 2", "Scrap Declaration Log 10:00"]
  },
  "hydraulic system priority": {
    content: "La manutenzione dell'**Hydraulic System** è classificata come **high priority** per i seguenti motivi:\n\n**1. Criticità nel ciclo produttivo:**\nL'impianto idraulico è un elemento fondamentale per il funzionamento della pressa principale. Un guasto improvviso causerebbe l'arresto completo della Linea 1, con un impatto stimato di **€15,000+** in perdita di produzione.\n\n**2. Storico manutenzioni:**\nL'ultima manutenzione completa risale a **più di 1 anno fa** (Gennaio 2024). Il ciclo raccomandato dal produttore è di 6 mesi.\n\n**3. Indicatori predittivi:**\n- Analisi vibrazioni: +15% rispetto al baseline\n- Temperatura olio: leggermente sopra la norma\n- Probabilità guasto entro 72h: 73%\n\n**Raccomandazione:** Eseguire la manutenzione preventiva entro questa settimana per evitare fermi non pianificati.",
    references: ["Work Order WO-2024-0156", "Preventive Maintenance Schedule"]
  },
  "default": {
    content: "I've analyzed the available data across Production, Maintenance, and Operational Knowledge modules. Based on your question, here's what I found:\n\nThe factory is currently operating at 78.5% OEE with some areas of concern on Line 2. There are 3 pending work orders for this week, with the hydraulic pump maintenance being the highest priority.\n\nWould you like me to dive deeper into any specific area?",
    references: ["Factory Overview Report"]
  }
};

export const AskFactoryGPTModal = ({ isOpen, onClose, onInvestigate }: AskFactoryGPTModalProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleReferenceClick = (ref: string) => {
    const route = referenceRoutes[ref];
    if (route) {
      onClose();
      navigate(route);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('oee') && lowerQuestion.includes('drop')) {
      return mockResponses['why did oee drop yesterday'];
    }
    if (lowerQuestion.includes('maintenance') && lowerQuestion.includes('week')) {
      return mockResponses['what maintenance should i do this week'];
    }
    if (lowerQuestion.includes('cost') && lowerQuestion.includes('scrap')) {
      return mockResponses['cost impact of today\'s scrap'];
    }
    if (lowerQuestion.includes('qualità') || lowerQuestion.includes('quality') || 
        (lowerQuestion.includes('abbassata') || lowerQuestion.includes('abbassato')) ||
        (lowerQuestion.includes('13') || lowerQuestion.includes('1:'))) {
      return mockResponses['qualità abbassata'];
    }
    if (lowerQuestion.includes('hydraulic') && (lowerQuestion.includes('priority') || lowerQuestion.includes('high') || lowerQuestion.includes('perché') || lowerQuestion.includes('perche'))) {
      return mockResponses['hydraulic system priority'];
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

    // Simulate AI response
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
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl h-[80vh] bg-card rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Ask FactoryGPT</h2>
              <p className="text-sm text-muted-foreground">Your AI manufacturing assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
                <p className="text-muted-foreground text-sm">
                  Ask me about production performance, maintenance, or operational procedures.
                </p>
                {onInvestigate && (
                  <Button
                    onClick={onInvestigate}
                    className="mt-4 gap-2 bg-[#C8E600] hover:bg-[#b3cc00] text-black"
                    size="lg"
                  >
                    <Search className="w-5 h-5" />
                    Investigate with FactoryGPT
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Suggested Questions
                </p>
                <div className="grid gap-2">
                  {preloadedQuestions.slice(0, 4).map((question, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(question)}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted text-left transition-colors group"
                    >
                      <span className="text-sm">{question}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
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
                      message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                    )}
                  >
                    <div className="whitespace-pre-wrap text-sm">
                      {message.content.split('**').map((part, i) => 
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </div>
                    
                    {message.references && message.references.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <p className="text-xs text-muted-foreground mb-2">References:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.references.map((ref, i) => {
                            const hasRoute = referenceRoutes[ref];
                            return (
                              <button
                                key={i}
                                onClick={() => handleReferenceClick(ref)}
                                disabled={!hasRoute}
                                className={cn(
                                  "inline-flex items-center gap-1 text-xs bg-accent px-2 py-1 rounded transition-colors",
                                  hasRoute && "hover:bg-primary hover:text-primary-foreground cursor-pointer"
                                )}
                              >
                                <FileText className="w-3 h-3" />
                                {ref}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="chat-bubble-ai animate-pulse-subtle">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animation-delay-150" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animation-delay-300" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-muted/30">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about production, maintenance, or procedures..."
              className="flex-1 bg-background border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              size="icon"
              className="shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
