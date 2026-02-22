import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  AlertTriangle, 
  CheckCircle, 
  AlertCircle, 
  Factory, 
  Leaf, 
  BarChart3,
  DollarSign, 
  BookOpen,
  Plus,
  Search,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  Send,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import factoryGptLogo from '@/assets/factory-gpt-logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2 } from 'lucide-react';

type PlantKey = 'all' | 'plantA' | 'plantB';

const plantKpiData: Record<PlantKey, { oee: { value: number; target: number; status: 'good' | 'warning'; label: string }; carbon: { value: number; target: number; status: 'good' | 'warning'; label: string }; scrap: { value: number; target: number; status: 'good' | 'warning'; label: string } }> = {
  plantA: {
    oee: { value: 81.2, target: 85, status: 'warning', label: 'OEE Impianto' },
    carbon: { value: -10.1, target: -20, status: 'warning', label: 'Carbon Footprint vs 2023' },
    scrap: { value: 2.4, target: 2.0, status: 'warning', label: 'Tasso Scarti' },
  },
  plantB: {
    oee: { value: 75.8, target: 85, status: 'warning', label: 'OEE Impianto' },
    carbon: { value: -6.5, target: -20, status: 'warning', label: 'Carbon Footprint vs 2023' },
    scrap: { value: 3.2, target: 2.0, status: 'warning', label: 'Tasso Scarti' },
  },
  all: {
    oee: { value: 78.5, target: 85, status: 'warning', label: 'OEE Impianto' },
    carbon: { value: -8.3, target: -20, status: 'warning', label: 'Carbon Footprint vs 2023' },
    scrap: { value: 2.8, target: 2.0, status: 'warning', label: 'Tasso Scarti' },
  },
};

const recentChats = [
  { id: '1', title: 'Analisi OEE linea sedute', timestamp: '2 ore fa' },
  { id: '2', title: 'Carbon footprint Tailor Made', timestamp: 'Ieri' },
  { id: '3', title: 'Margini canale Contract', timestamp: '3 giorni fa' },
  { id: '4', title: 'Rating fornitori ESG', timestamp: '5 giorni fa' },
];

const getStatusColor = (status: 'good' | 'warning' | 'critical') => {
  switch (status) {
    case 'good': return 'text-emerald-400';
    case 'warning': return 'text-amber-400';
    case 'critical': return 'text-red-400';
  }
};

const getStatusBg = (status: 'good' | 'warning' | 'critical') => {
  switch (status) {
    case 'good': return 'bg-emerald-500/20 border-emerald-500/30';
    case 'warning': return 'bg-amber-500/20 border-amber-500/30';
    case 'critical': return 'bg-red-500/20 border-red-500/30';
  }
};

const getStatusIcon = (status: 'good' | 'warning' | 'critical') => {
  switch (status) {
    case 'good': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
    case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
    case 'critical': return <AlertCircle className="w-4 h-4 text-red-400" />;
  }
};

export default function FactoryOverviewPage() {
  const navigate = useNavigate();
  const [selectedPlant, setSelectedPlant] = useState<PlantKey>('all');
  const data = plantKpiData[selectedPlant];
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [requestAgentOpen, setRequestAgentOpen] = useState(false);
  const [agentForm, setAgentForm] = useState({ sintesi: '', descrizione: '', comeOggi: 'non_viene_fatto', altroText: '' });
  const [agentSubmitted, setAgentSubmitted] = useState(false);
  const { language: lang, setLanguage: setLang, t } = useLanguage();

  const handleNewChat = () => navigate('/');

  const handleAgentSubmit = () => {
    setAgentSubmitted(true);
    setTimeout(() => {
      setRequestAgentOpen(false);
      setAgentSubmitted(false);
      setAgentForm({ sintesi: '', descrizione: '', comeOggi: 'non_viene_fatto', altroText: '' });
    }, 2000);
  };

  const appModules = [
    { label: t('produzioneAI'), icon: Factory, path: '/production', description: t('descProduzione') },
    { label: t('sostenibilitaCircolaritaAI'), icon: Leaf, path: '/sustainability', description: t('descSostenibilita') },
    { label: t('canaliSinergieAI'), icon: BarChart3, path: '/channels', description: t('descCanali') },
    { label: t('ratingFornitoriAI'), icon: Star, path: '/suppliers', description: t('descFornitori') },
    { label: t('costiMarginalitaAI'), icon: DollarSign, path: '/costs', description: t('descCosti') },
    { label: t('khaiLabel'), icon: BookOpen, path: '/knowledge', description: t('descKnowledge') },
  ];

  const filteredChats = recentChats.filter(chat => 
    searchQuery === '' || chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[hsl(200,10%,8%)] flex">
      <aside className={cn("flex flex-col bg-[hsl(200,10%,6%)] border-r border-white/10 transition-all duration-300", sidebarCollapsed ? "w-16" : "w-72")}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0"><Sparkles className="w-5 h-5 text-primary-foreground" /></div>
          {!sidebarCollapsed && <span className="font-semibold text-lg text-white">FactoryGPT</span>}
        </div>
        <div className="p-3">
          <button onClick={handleNewChat} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/10 text-white/80 font-medium transition-all hover:bg-white/5", sidebarCollapsed && "justify-center")}>
            <Plus className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>{t('newChatLabel')}</span>}
          </button>
        </div>
        {!sidebarCollapsed && (
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <Search className="w-4 h-4 text-white/40" />
              <input type="text" placeholder={t('searchChats')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none" />
            </div>
          </div>
        )}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {!sidebarCollapsed && (
            <>
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider px-3 mb-2">{t('recentChats')}</p>
              {filteredChats.map((chat) => (
                <button key={chat.id} className="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 transition-colors text-left group">
                  <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                  <div className="flex-1 min-w-0"><p className="text-sm truncate">{chat.title}</p><p className="text-xs text-white/40 flex items-center gap-1"><Clock className="w-3 h-3" />{chat.timestamp}</p></div>
                </button>
              ))}
            </>
          )}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors", sidebarCollapsed && "justify-center px-2")}>
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <><ChevronLeft className="w-5 h-5" /><span className="text-sm">{t('collapse')}</span></>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className="absolute top-4 right-6 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-white/50" />
            <Select value={selectedPlant} onValueChange={(v) => setSelectedPlant(v as PlantKey)}>
              <SelectTrigger className="w-[160px] h-9 text-sm bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(200,10%,12%)] border-white/10">
                <SelectItem value="all" className="text-white/70">{lang === 'it' ? 'Tutti gli stabilimenti' : 'All Plants'}</SelectItem>
                <SelectItem value="plantA" className="text-white/70">Plant A — Montelupo</SelectItem>
                <SelectItem value="plantB" className="text-white/70">Plant B — Fossalta</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-white/70 hover:text-white hover:bg-white/10">
                <span className="text-xl">{lang === 'it' ? '🇮🇹' : '🇬🇧'}</span>
                <span className="text-sm">{lang === 'it' ? 'Italiano' : 'English'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[hsl(200,10%,12%)] border-white/10">
              <DropdownMenuItem onClick={() => setLang('it')} className={cn("text-white/70 hover:text-white", lang === 'it' && 'bg-white/10')}><span className="text-xl mr-2">🇮🇹</span> Italiano</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang('en')} className={cn("text-white/70 hover:text-white", lang === 'en' && 'bg-white/10')}><span className="text-xl mr-2">🇬🇧</span> English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-4xl">
          <div className={cn("rounded-xl p-4 border backdrop-blur-sm", getStatusBg(data.oee.status))}>
            <div className="flex items-center justify-between mb-2"><span className="text-xs font-medium text-white/60 uppercase tracking-wide">{data.oee.label}</span>{getStatusIcon(data.oee.status)}</div>
            <div className="flex items-baseline gap-1"><span className={cn("text-2xl font-bold", getStatusColor(data.oee.status))}>{data.oee.value}%</span><span className="text-xs text-white/40">/ {data.oee.target}%</span></div>
          </div>
          <div className={cn("rounded-xl p-4 border backdrop-blur-sm", getStatusBg(data.carbon.status))}>
            <div className="flex items-center justify-between mb-2"><span className="text-xs font-medium text-white/60 uppercase tracking-wide">{data.carbon.label}</span>{getStatusIcon(data.carbon.status)}</div>
            <div className="flex items-baseline gap-1"><span className={cn("text-2xl font-bold", getStatusColor(data.carbon.status))}>{data.carbon.value}%</span><span className="text-xs text-white/40">target {data.carbon.target}%</span></div>
          </div>
          <div className={cn("rounded-xl p-4 border backdrop-blur-sm", getStatusBg(data.scrap.status))}>
            <div className="flex items-center justify-between mb-2"><span className="text-xs font-medium text-white/60 uppercase tracking-wide">{data.scrap.label}</span>{getStatusIcon(data.scrap.status)}</div>
            <div className="flex items-baseline gap-1"><span className={cn("text-2xl font-bold", getStatusColor(data.scrap.status))}>{data.scrap.value}%</span><span className="text-xs text-white/40">target {data.scrap.target}%</span></div>
          </div>
        </div>

        <button onClick={handleNewChat} className="relative mb-8 group cursor-pointer transition-transform hover:scale-105 flex flex-col items-center">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-150 group-hover:bg-primary/30 transition-colors" />
          <img src={factoryGptLogo} alt="FactoryGPT" className="relative w-48 h-48 object-contain rounded-full" style={{ filter: 'drop-shadow(0 0 30px hsl(var(--primary) / 0.5))' }} />
        </button>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {appModules.map((module) => (
            <button key={module.label} onClick={() => navigate(module.path)} className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 rounded-2xl p-6 text-center transition-all duration-200 hover:scale-[1.02]">
              <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-colors"><module.icon className="w-7 h-7 text-primary" /></div>
              <h3 className="font-semibold text-white text-sm mb-1">{module.label}</h3>
              <p className="text-[10px] text-white/50">{module.description}</p>
            </button>
          ))}
          {/* Request an Agent card */}
          <button onClick={() => setRequestAgentOpen(true)} className="group bg-transparent hover:bg-white/5 border-2 border-dashed border-white/20 hover:border-primary/40 rounded-2xl p-6 text-center transition-all duration-200 hover:scale-[1.02]">
            <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-colors"><Sparkles className="w-7 h-7 text-primary" /></div>
            <h3 className="font-semibold text-white text-sm mb-1">{t('requestAgent')}</h3>
            <p className="text-[10px] text-white/50">{t('requestAgentDesc')}</p>
          </button>
        </div>

        <Dialog open={requestAgentOpen} onOpenChange={(open) => { setRequestAgentOpen(open); if (!open) { setAgentSubmitted(false); setAgentForm({ sintesi: '', descrizione: '', comeOggi: 'non_viene_fatto', altroText: '' }); } }}>
          <DialogContent className="sm:max-w-lg bg-[hsl(200,10%,12%)] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">{t('requestAgent')}</DialogTitle>
              <DialogDescription className="text-white/50">{t('requestAgentDesc')}</DialogDescription>
            </DialogHeader>
            {agentSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <p className="text-white font-medium">{t('requestSubmitted')}</p>
                <p className="text-white/50 text-sm">{t('wellGetBack')}</p>
              </div>
            ) : (
              <div className="space-y-5 pt-2">
                <div className="space-y-2">
                  <Label className="text-white/80 text-sm font-medium">{t('processSummary')}</Label>
                  <Textarea placeholder={t('processSummaryPlaceholder')} value={agentForm.sintesi} onChange={(e) => setAgentForm(prev => ({ ...prev, sintesi: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[80px] focus-visible:ring-primary/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80 text-sm font-medium">{t('whatToAchieve')}</Label>
                  <Textarea placeholder={t('whatToAchievePlaceholder')} value={agentForm.descrizione} onChange={(e) => setAgentForm(prev => ({ ...prev, descrizione: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[80px] focus-visible:ring-primary/50" />
                </div>
                <div className="space-y-3">
                  <Label className="text-white/80 text-sm font-medium">{t('howDoneToday')}</Label>
                  <RadioGroup value={agentForm.comeOggi} onValueChange={(value) => setAgentForm(prev => ({ ...prev, comeOggi: value, altroText: value !== 'altro' ? '' : prev.altroText }))} className="space-y-2">
                    <div className="flex items-center gap-3"><RadioGroupItem value="non_viene_fatto" id="non_viene_fatto" className="border-white/30 text-primary" /><Label htmlFor="non_viene_fatto" className="text-white/70 cursor-pointer">{t('notDone')}</Label></div>
                    <div className="flex items-center gap-3"><RadioGroupItem value="excel" id="excel" className="border-white/30 text-primary" /><Label htmlFor="excel" className="text-white/70 cursor-pointer">{t('inExcel')}</Label></div>
                    <div className="flex items-center gap-3"><RadioGroupItem value="altro" id="altro" className="border-white/30 text-primary" /><Label htmlFor="altro" className="text-white/70 cursor-pointer">{t('other')}</Label></div>
                  </RadioGroup>
                  {agentForm.comeOggi === 'altro' && (
                    <input type="text" placeholder={t('specifyHow')} value={agentForm.altroText} onChange={(e) => setAgentForm(prev => ({ ...prev, altroText: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 mt-1" />
                  )}
                </div>
                <Button onClick={handleAgentSubmit} disabled={!agentForm.sintesi.trim() || !agentForm.descrizione.trim()} className="w-full gap-2"><Send className="w-4 h-4" />{t('submitRequest')}</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
