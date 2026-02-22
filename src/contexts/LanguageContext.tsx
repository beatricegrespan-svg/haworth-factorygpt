import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'it' | 'en';

const translations = {
  it: {
    // TopBar
    filters: 'Filtri',
    today: 'Oggi',
    thisWeek: 'Questa Settimana',
    thisMonth: 'Questo Mese',
    allLines: 'Tutte le Linee',

    // Sidebar
    factoryGPTChat: 'FactoryGPT Chat',
    factoryHub: 'Haworth Hub',
    produzioneAI: 'Produzione AI',
    sostenibilitaCircolaritaAI: 'Sostenibilità & Circolarità AI',
    canaliSinergieAI: 'Canali & Sinergie',
    qualitaBrandAI: 'Qualità & Brand',
    costiMarginalitaAI: 'Costi & Marginalità',
    khaiLabel: 'KHAI - Know How Aziendale AI',
    collapse: 'Comprimi',

    // KPI labels
    oeeImpianto: 'OEE Impianto',
    tassoScarti: 'Tasso Scarti',
    tassoRemanufacturing: 'Tasso Remanufacturing',
    carbonFootprint: 'Carbon Footprint (vs 2023)',
    materialiRiciclati: 'Materiali Riciclati/Riciclabili',
    prodottiTakeBack: 'Prodotti Take-Back (mese)',
    wasteToLandfill: 'Waste-to-Landfill',
    energiaRinnovabile: 'Energia Rinnovabile',
    co2Evitata: 'CO2e Evitata (take-back)',
    revenueContract: 'Revenue Contract',
    revenueRetail: 'Revenue Retail',
    revenueTailorMade: 'Revenue Tailor Made',
    margineLoredoMedio: 'Margine Lordo Medio',

    // Tab labels
    sostenibilitaTab: 'Sostenibilità',
    circolaritaTab: 'Circolarità',

    // HomePage
    commandCenter: 'Centro di Comando',
    commandCenterDesc: 'Panoramica in tempo reale delle operazioni di Haworth Lifestyle',
    aiInsights: 'Insight e Avvisi AI',
    aiSuggestedActions: 'Azioni Suggerite AI',
    factoryEventsCalendar: 'Calendario Eventi',
    vsYesterday: 'vs ieri',
    openWorkOrder: 'Apri ordine di lavoro',
    viewProcedure: 'Vedi procedura',
    analyzeIssue: 'Analizza problema',
    maintenance: 'Manutenzione',
    production: 'Produzione',
    shift: 'Turno',
    absence: 'Assenza',

    // QualityPage
    qualityControl: 'Qualità & Brand',
    qualityControlDesc: 'Controllo qualità e coerenza brand su tutte le collezioni',
    scrapTrend: 'Trend Difetti',
    scrapBreakdown: 'Analisi Difetti (Pareto)',
    showTop5: 'Mostra Top 5',
    viewAll: 'Vedi Tutto',
    qualityIncidents: 'Incidenti Qualità',
    id: 'ID',
    dateTime: 'Data/Ora',
    lineAsset: 'Linea / Collezione',
    defectType: 'Tipo Difetto',
    severity: 'Gravità',
    status: 'Stato',
    owner: 'Responsabile',
    qualityChecks: 'Controlli Qualità',
    checkName: 'Nome Controllo',
    frequency: 'Frequenza',
    lastCompleted: 'Ultimo Completamento',
    summary: 'Riepilogo',
    evidence: 'Evidenze',
    aiRootCauseHypothesis: 'Ipotesi Causa Radice AI',
    incidentTimeline: 'Timeline Incidente',
    topCostImpact: 'Impatto costo totale Top 5',
    costImpact: 'Impatto Costo',
    count: 'Conteggio',
    references: 'Riferimenti',
    line: 'Linea',
    target: 'Target',
    suggestedCorrectiveActions: 'Azioni Correttive Suggerite',

    // CostsPage
    costsOverview: 'Costi & Marginalità',
    costBreakdown: 'Ripartizione Costi',
    topCostDrivers: 'Principali Fattori di Costo',
    unitCostBySKU: 'Costo Unitario per Prodotto',
    sku: 'SKU',
    productName: 'Nome Prodotto',
    unitsProduced: 'Unità Prodotte',
    cogsUnit: 'COGS/Unità',
    scrapCost: 'Costo Scarti',
    trend: 'Trend',
    vsLastPeriod: 'vs periodo precedente',
    cogsComponents: 'Componenti COGS (per unità)',
    qualityImpact: 'Impatto Qualità',
    scrapRateLabel: 'Tasso Scarti',
    scrapCostAllocation: 'Allocazione Costo Scarti',
    aiSuggestions: 'Suggerimenti AI',
    viewQualityIncidents: 'Vedi incidenti qualità',
    checkMaintenanceSchedule: 'Controlla piano manutenzione',

    // KnowledgePage
    khaiTitle: 'KHAI - Know How Aziendale AI',
    khaiDesc: 'Accesso AI a procedure, standard e memoria operativa',
    knowledgeLibrary: 'Libreria Conoscenze',
    askAI: 'Chiedi all\'AI',
    playbooks: 'Playbook',
    searchDocuments: 'Cerca documenti, procedure, standard...',
    all: 'Tutto',
    procedures: 'Procedure',
    workInstructions: 'Istruzioni di Lavoro',
    qualityStandards: 'Standard Qualità',
    hrPolicies: 'HR & Policy',
    updated: 'Aggiornato',
    aiKnowledgeAssistant: 'Assistente AI Knowledge',
    aiKnowledgeAssistantDesc: 'Fai domande in linguaggio naturale su procedure e standard',
    suggestedQuestions: 'Domande Suggerite',
    askPlaceholder: 'Chiedi informazioni su procedure, standard o policy...',
    ask: 'Chiedi',
    linkedDocument: 'Documento collegato',

    // FactoryGPTChat
    welcomeMessage: 'Ciao Ervino, cosa vuoi sapere su Haworth Lifestyle oggi?',
    chatPlaceholder: 'Chiedimi informazioni su produzione, sostenibilità, canali di vendita o qualità.',
    newChat: 'Nuova chat',
    goToFactory: 'Portami a Haworth Hub',
    typeMessage: 'Scrivi un messaggio...',
    askFactoryGPT: 'Ask FactoryGPT',

    // ModuleAIButtons
    investigateLabel: 'FactoryGPT Investigation',
    aiAnalysis: 'Analisi AI',
    followUpPlaceholder: 'Fai una domanda di approfondimento...',

    // FactoryOverviewPage
    newChatLabel: 'Nuova chat',
    searchChats: 'Cerca chat...',
    recentChats: 'Chat Recenti',
    prodVsPlan: 'Prodotto vs Pianificato',
    scrap: 'Scarti',
    threshold: 'soglia',
    requestAgent: 'Request an Agent',
    requestAgentDesc: 'Descrivi il processo e cosa vorresti ottenere dal tuo agente AI.',
    processSummary: 'Sintesi Processo',
    processSummaryPlaceholder: 'Descrivi brevemente il processo...',
    whatToAchieve: "Cosa vorresti ottenere dall'agente AI?",
    whatToAchievePlaceholder: "Descrivi cosa vorresti che l'agente facesse...",
    howDoneToday: 'Come viene fatto ad oggi?',
    notDone: 'Non viene fatto',
    inExcel: 'In Excel',
    other: 'Altro',
    specifyHow: 'Specifica come...',
    submitRequest: 'Invia Richiesta',
    requestSubmitted: 'Richiesta inviata!',
    wellGetBack: 'Ti contatteremo presto.',
    descProduzione: 'OEE, scarti e linee di produzione',
    descSostenibilita: 'Carbon footprint, take-back e materiali',
    descCanali: 'Contract, Retail, Tailor Made',
    descQualita: 'Standard qualitativi e brand',
    descCosti: 'COGS e margini per canale',
    descKnowledge: 'Documentazione e procedure',

    // Calendar
    sun: 'Dom', mon: 'Lun', tue: 'Mar', wed: 'Mer', thu: 'Gio', fri: 'Ven', sat: 'Sab',
    january: 'Gennaio', february: 'Febbraio', march: 'Marzo', april: 'Aprile',
    may: 'Maggio', june: 'Giugno', july: 'Luglio', august: 'Agosto',
    september: 'Settembre', october: 'Ottobre', november: 'Novembre', december: 'Dicembre',
  },
  en: {
    // TopBar
    filters: 'Filters',
    today: 'Today',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    allLines: 'All Lines',

    // Sidebar
    factoryGPTChat: 'FactoryGPT Chat',
    factoryHub: 'Haworth Hub',
    produzioneAI: 'Production AI',
    sostenibilitaCircolaritaAI: 'Sustainability & Circularity AI',
    canaliSinergieAI: 'Channels & Synergies',
    qualitaBrandAI: 'Quality & Brand',
    costiMarginalitaAI: 'Costs & Margins',
    khaiLabel: 'KHAI - Company Know How AI',
    collapse: 'Collapse',

    // KPI labels
    oeeImpianto: 'Plant OEE',
    tassoScarti: 'Scrap Rate',
    tassoRemanufacturing: 'Remanufacturing Rate',
    carbonFootprint: 'Carbon Footprint (vs 2023)',
    materialiRiciclati: 'Recycled/Recyclable Materials',
    prodottiTakeBack: 'Take-Back Products (month)',
    wasteToLandfill: 'Waste-to-Landfill',
    energiaRinnovabile: 'Renewable Energy',
    co2Evitata: 'CO2e Avoided (take-back)',
    revenueContract: 'Contract Revenue',
    revenueRetail: 'Retail Revenue',
    revenueTailorMade: 'Tailor Made Revenue',
    margineLoredoMedio: 'Average Gross Margin',

    // Tab labels
    sostenibilitaTab: 'Sustainability',
    circolaritaTab: 'Circularity',

    // HomePage
    commandCenter: 'Command Center',
    commandCenterDesc: 'Real-time overview of Haworth Lifestyle operations',
    aiInsights: 'AI Insights & Alerts',
    aiSuggestedActions: 'AI Suggested Actions',
    factoryEventsCalendar: 'Events Calendar',
    vsYesterday: 'vs yesterday',
    openWorkOrder: 'Open work order',
    viewProcedure: 'View procedure',
    analyzeIssue: 'Analyze issue',
    maintenance: 'Maintenance',
    production: 'Production',
    shift: 'Shift',
    absence: 'Absence',

    // QualityPage
    qualityControl: 'Quality & Brand',
    qualityControlDesc: 'Quality control and brand consistency across all collections',
    scrapTrend: 'Defect Trend',
    scrapBreakdown: 'Defect Breakdown (Pareto)',
    showTop5: 'Show Top 5',
    viewAll: 'View All',
    qualityIncidents: 'Quality Incidents',
    id: 'ID',
    dateTime: 'Date/Time',
    lineAsset: 'Line / Collection',
    defectType: 'Defect Type',
    severity: 'Severity',
    status: 'Status',
    owner: 'Owner',
    qualityChecks: 'Quality Checks',
    checkName: 'Check Name',
    frequency: 'Frequency',
    lastCompleted: 'Last Completed',
    summary: 'Summary',
    evidence: 'Evidence',
    aiRootCauseHypothesis: 'AI Root Cause Hypothesis',
    incidentTimeline: 'Incident Timeline',
    topCostImpact: 'Top 5 total cost impact',
    costImpact: 'Cost Impact',
    count: 'Count',
    references: 'References',
    line: 'Line',
    target: 'Target',
    suggestedCorrectiveActions: 'Suggested Corrective Actions',

    // CostsPage
    costsOverview: 'Costs & Margins',
    costBreakdown: 'Cost Breakdown',
    topCostDrivers: 'Top Cost Drivers',
    unitCostBySKU: 'Unit Cost by Product',
    sku: 'SKU',
    productName: 'Product Name',
    unitsProduced: 'Units Produced',
    cogsUnit: 'COGS/Unit',
    scrapCost: 'Scrap Cost',
    trend: 'Trend',
    vsLastPeriod: 'vs last period',
    cogsComponents: 'COGS Components (per unit)',
    qualityImpact: 'Quality Impact',
    scrapRateLabel: 'Scrap Rate',
    scrapCostAllocation: 'Scrap Cost Allocation',
    aiSuggestions: 'AI Suggestions',
    viewQualityIncidents: 'View Quality incidents',
    checkMaintenanceSchedule: 'Check maintenance schedule',

    // KnowledgePage
    khaiTitle: 'KHAI - Company Know How AI',
    khaiDesc: 'AI access to procedures, standards and operational memory',
    knowledgeLibrary: 'Knowledge Library',
    askAI: 'Ask AI',
    playbooks: 'Playbooks',
    searchDocuments: 'Search documents, procedures, standards...',
    all: 'All',
    procedures: 'Procedures',
    workInstructions: 'Work Instructions',
    qualityStandards: 'Quality Standards',
    hrPolicies: 'HR & Policies',
    updated: 'Updated',
    aiKnowledgeAssistant: 'AI Knowledge Assistant',
    aiKnowledgeAssistantDesc: 'Ask questions in natural language about procedures and standards',
    suggestedQuestions: 'Suggested Questions',
    askPlaceholder: 'Ask about procedures, standards, or policies...',
    ask: 'Ask',
    linkedDocument: 'Linked document',

    // FactoryGPTChat
    welcomeMessage: 'Hi Ervino, what do you want to know about Haworth Lifestyle today?',
    chatPlaceholder: 'Ask me about production, sustainability, sales channels, or quality.',
    newChat: 'New chat',
    goToFactory: 'Go to Haworth Hub',
    typeMessage: 'Type a message...',
    askFactoryGPT: 'Ask FactoryGPT',

    // ModuleAIButtons
    investigateLabel: 'FactoryGPT Investigation',
    aiAnalysis: 'AI Analysis',
    followUpPlaceholder: 'Ask a follow-up question...',

    // FactoryOverviewPage
    newChatLabel: 'New chat',
    searchChats: 'Search chats...',
    recentChats: 'Recent Chats',
    prodVsPlan: 'Produced vs Planned',
    scrap: 'Scrap',
    threshold: 'threshold',
    requestAgent: 'Request an Agent',
    requestAgentDesc: 'Describe the process and what you want to achieve with the AI agent.',
    processSummary: 'Process Summary',
    processSummaryPlaceholder: 'Briefly describe the process...',
    whatToAchieve: 'What would you like the AI agent to achieve?',
    whatToAchievePlaceholder: 'Describe what you want the agent to do...',
    howDoneToday: 'How is it done today?',
    notDone: 'Not done',
    inExcel: 'In Excel',
    other: 'Other',
    specifyHow: 'Specify how...',
    submitRequest: 'Submit Request',
    requestSubmitted: 'Request submitted!',
    wellGetBack: "We'll get back to you soon.",
    descProduzione: 'OEE, scrap and production lines',
    descSostenibilita: 'Carbon footprint, take-back & materials',
    descCanali: 'Contract, Retail, Tailor Made',
    descQualita: 'Quality standards & brand',
    descCosti: 'COGS and margins by channel',
    descKnowledge: 'Documentation & procedures',

    // Calendar
    sun: 'Sun', mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat',
    january: 'January', february: 'February', march: 'March', april: 'April',
    may: 'May', june: 'June', july: 'July', august: 'August',
    september: 'September', october: 'October', november: 'November', december: 'December',
  },
} as const;

export type TranslationKey = keyof typeof translations['it'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('it');

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
