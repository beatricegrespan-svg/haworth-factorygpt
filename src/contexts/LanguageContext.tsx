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
    factoryHub: 'Factory Hub',
    produzioneAI: 'Produzione AI',
    pianoProdAI: 'Piano Produzione AI',
    manutenzioneAI: 'Manutenzione AI',
    qualitaAI: 'Qualità AI',
    costiAI: 'Costi AI',
    khaiLabel: 'KHAI - Know How Aziendale AI',
    collapse: 'Comprimi',

    // HomePage
    commandCenter: 'Centro di Comando',
    commandCenterDesc: 'Panoramica in tempo reale delle operazioni della fabbrica',
    aiInsights: 'Insight e Avvisi AI',
    aiSuggestedActions: 'Azioni Suggerite AI',
    factoryEventsCalendar: 'Calendario Eventi Fabbrica',
    vsYesterday: 'vs ieri',
    openWorkOrder: 'Apri ordine di lavoro',
    viewProcedure: 'Vedi procedura',
    analyzeIssue: 'Analizza problema',
    maintenance: 'Manutenzione',
    production: 'Produzione',
    shift: 'Turno',
    absence: 'Assenza',

    // ProductionPage
    productionPerformance: 'Performance Produzione',
    productionPerformanceDesc: 'Monitora OEE, efficienza e metriche di produzione su tutte le linee',
    oeeTrendToday: 'Trend OEE - Oggi',
    availability: 'Disponibilità',
    performance: 'Performance',
    quality: 'Qualità',
    target: 'Target',
    productionLinesOverview: 'Panoramica Linee di Produzione',
    line: 'Linea',
    oee: 'OEE',
    piecesProduced: 'Pezzi Prodotti',
    scrapRate: 'Tasso Scarti',
    topDowntimeReason: 'Motivo Principale Fermo',
    aiComment: 'Commento AI',
    performanceAnalysis: 'Analisi Performance',
    aiRootCauseAnalysis: 'Analisi Causa Radice AI',
    primaryIssue: 'Problema Principale',
    suggestedCorrectiveActions: 'Azioni Correttive Suggerite',
    openMaintenanceWO: 'Apri ordine di manutenzione',
    viewRelatedProcedure: 'Vedi procedura correlata',
    askFactoryGPTMore: 'Chiedi a FactoryGPT per dettagli',

    // QualityPage
    qualityControl: 'Controllo Qualità',
    scrapTrend: 'Trend Scarti',
    scrapBreakdown: 'Analisi Scarti (Pareto)',
    showTop5: 'Mostra Top 5',
    viewAll: 'Vedi Tutto',
    qualityIncidents: 'Incidenti Qualità',
    id: 'ID',
    dateTime: 'Data/Ora',
    lineAsset: 'Linea / Asset',
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

    // MaintenancePage
    maintenanceTitle: 'Manutenzione',
    maintenanceDesc: 'Pianifica, prioritizza ed esegui le attività di manutenzione',
    maintenanceCalendar: 'Calendario Manutenzione',
    workOrders: 'Ordini di Lavoro',
    prioritizedByAI: 'Prioritizzato da AI',
    asset: 'Asset',
    type: 'Tipo',
    priority: 'Priorità',
    scheduled: 'Programmato',
    view: 'Vedi',
    safetyNotes: 'Note di Sicurezza',
    sparePartsRequired: 'Ricambi Necessari',
    procedureSteps: 'Passi Procedura',
    askFactoryGPTAboutTask: 'Chiedi a FactoryGPT su questa attività',
    estTime: 'Tempo Stimato',

    // CostsPage
    costsOverview: 'Panoramica Costi',
    costBreakdown: 'Ripartizione Costi',
    topCostDrivers: 'Principali Fattori di Costo',
    unitCostBySKU: 'Costo Unitario per SKU',
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

    // PianoProduzionePage
    pianoProduzione: 'Piano Produzione',
    pianoProduzioneDesc: 'Visione in tempo reale degli ordini di produzione',
    refresh: 'Aggiorna',
    toDo: 'Da Fare',
    ongoing: 'In Corso',
    blocked: 'Bloccato',
    doneToday: 'Completato Oggi',
    progress: 'Avanzamento',
    stoppedWorkstations: 'Workstation ferme',
    noOrders: 'Nessun ordine',

    // MESLightPage
    mesTitle: 'Shopfloor Digitale (MES)',
    mesDesc: 'Tracciamento ordini di produzione in tempo reale',
    totalOrders: 'Ordini Totali',
    inProgress: 'In Corso',
    stopped: 'Fermo',
    completed: 'Completato',
    pending: 'In Attesa',
    productionOrders: 'Ordini di Produzione',
    producedPieces: 'pezzi prodotti',

    // FactoryGPTChat
    welcomeMessage: 'Ciao Davide, cosa vuoi sapere sulla fabbrica oggi?',
    chatPlaceholder: 'Chiedimi informazioni su produzione, manutenzione, qualità o costi.',
    newChat: 'Nuova chat',
    goToFactory: 'Portami alla Factory',
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
    descProduzione: 'Performance e Piano Produzione',
    descManutenzione: 'Fermi e interventi',
    descQualita: 'Controllo e scarti',
    descCosti: 'COGS e sprechi',
    descKnowledge: 'Documentazione',

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
    factoryHub: 'Factory Hub',
    produzioneAI: 'Production AI',
    pianoProdAI: 'Production Plan AI',
    manutenzioneAI: 'Maintenance AI',
    qualitaAI: 'Quality AI',
    costiAI: 'Costs AI',
    khaiLabel: 'KHAI - Company Know How AI',
    collapse: 'Collapse',

    // HomePage
    commandCenter: 'Command Center',
    commandCenterDesc: 'Real-time overview of your factory operations',
    aiInsights: 'AI Insights & Alerts',
    aiSuggestedActions: 'AI Suggested Actions',
    factoryEventsCalendar: 'Factory Events Calendar',
    vsYesterday: 'vs yesterday',
    openWorkOrder: 'Open work order',
    viewProcedure: 'View procedure',
    analyzeIssue: 'Analyze issue',
    maintenance: 'Maintenance',
    production: 'Production',
    shift: 'Shift',
    absence: 'Absence',

    // ProductionPage
    productionPerformance: 'Production Performance',
    productionPerformanceDesc: 'Monitor OEE, efficiency, and production metrics across all lines',
    oeeTrendToday: 'OEE Trend - Today',
    availability: 'Availability',
    performance: 'Performance',
    quality: 'Quality',
    target: 'Target',
    productionLinesOverview: 'Production Lines Overview',
    line: 'Line',
    oee: 'OEE',
    piecesProduced: 'Pieces Produced',
    scrapRate: 'Scrap Rate',
    topDowntimeReason: 'Top Downtime Reason',
    aiComment: 'AI Comment',
    performanceAnalysis: 'Performance Analysis',
    aiRootCauseAnalysis: 'AI Root Cause Analysis',
    primaryIssue: 'Primary Issue',
    suggestedCorrectiveActions: 'Suggested Corrective Actions',
    openMaintenanceWO: 'Open maintenance work order',
    viewRelatedProcedure: 'View related procedure',
    askFactoryGPTMore: 'Ask FactoryGPT for more details',

    // QualityPage
    qualityControl: 'Quality Control',
    scrapTrend: 'Scrap Trend',
    scrapBreakdown: 'Scrap Breakdown (Pareto)',
    showTop5: 'Show Top 5',
    viewAll: 'View All',
    qualityIncidents: 'Quality Incidents',
    id: 'ID',
    dateTime: 'Date/Time',
    lineAsset: 'Line / Asset',
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

    // MaintenancePage
    maintenanceTitle: 'Maintenance',
    maintenanceDesc: 'Plan, prioritize, and execute maintenance activities',
    maintenanceCalendar: 'Maintenance Calendar',
    workOrders: 'Work Orders',
    prioritizedByAI: 'Prioritized by AI',
    asset: 'Asset',
    type: 'Type',
    priority: 'Priority',
    scheduled: 'Scheduled',
    view: 'View',
    safetyNotes: 'Safety Notes',
    sparePartsRequired: 'Spare Parts Required',
    procedureSteps: 'Procedure Steps',
    askFactoryGPTAboutTask: 'Ask FactoryGPT about this task',
    estTime: 'Est. Time',

    // CostsPage
    costsOverview: 'Costs Overview',
    costBreakdown: 'Cost Breakdown',
    topCostDrivers: 'Top Cost Drivers',
    unitCostBySKU: 'Unit Cost by SKU',
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

    // PianoProduzionePage
    pianoProduzione: 'Production Plan',
    pianoProduzioneDesc: 'Real-time view of production orders',
    refresh: 'Refresh',
    toDo: 'To Do',
    ongoing: 'Ongoing',
    blocked: 'Blocked',
    doneToday: 'Done Today',
    progress: 'Progress',
    stoppedWorkstations: 'Stopped workstations',
    noOrders: 'No orders',

    // MESLightPage
    mesTitle: 'Digital Shopfloor (MES)',
    mesDesc: 'Real-time production order tracking',
    totalOrders: 'Total Orders',
    inProgress: 'In Progress',
    stopped: 'Stopped',
    completed: 'Completed',
    pending: 'Pending',
    productionOrders: 'Production Orders',
    producedPieces: 'pieces produced',

    // FactoryGPTChat
    welcomeMessage: 'Hi Davide, what do you want to know about the factory today?',
    chatPlaceholder: 'Ask me about production, maintenance, quality or costs.',
    newChat: 'New chat',
    goToFactory: 'Go to Factory',
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
    descProduzione: 'Performance & Production Plan',
    descManutenzione: 'Downtime & Interventions',
    descQualita: 'Control & Scrap',
    descCosti: 'COGS & Waste',
    descKnowledge: 'Documentation',

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
