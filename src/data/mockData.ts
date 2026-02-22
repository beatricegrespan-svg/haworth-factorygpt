import { 
  KPI, 
  AIInsight, 
  CalendarEvent, 
  SuggestedAction, 
  KnowledgeDocument, 
  Playbook 
} from '@/types/factory';

export const kpiData: KPI[] = [
  {
    id: '1',
    label: 'OEE',
    value: 78.5,
    unit: '%',
    target: 85,
    trend: 'down',
    trendValue: -2.3,
    status: 'warning'
  },
  {
    id: '2',
    label: 'Tasso Scarti',
    value: 2.8,
    unit: '%',
    target: 2.0,
    trend: 'down',
    trendValue: -0.4,
    status: 'warning'
  },
  {
    id: '3',
    label: 'Carbon Footprint (vs 2023)',
    value: -8.3,
    unit: '%',
    target: -20,
    trend: 'down',
    trendValue: -1.2,
    status: 'warning'
  },
  {
    id: '4',
    label: 'Tasso Remanufacturing',
    value: 72,
    unit: '%',
    target: 70,
    trend: 'up',
    trendValue: 3.5,
    status: 'good'
  }
];

export const aiInsights: AIInsight[] = [
  {
    id: '1',
    title: 'OEE sotto target sulla Linea Sedute',
    description: 'OEE sceso al 74.1% sulla linea sedute Contract (-2.3% vs ieri) per micro-fermate al nastro di assemblaggio imbottitura. Azione raccomandata: ricalibrazione sensore prossimità.',
    severity: 'warning',
    timestamp: '2 ore fa',
    module: 'production'
  },
  {
    id: '2',
    title: 'Obiettivo Carbon Footprint a Rischio',
    description: 'A -8.3% vs target -20% entro fine anno. Il principale driver è la supply chain Tailor Made (Scope 3). Sostituire 1 fornitore tessuti porterebbe al -22%, superando il target.',
    severity: 'warning',
    timestamp: '4 ore fa',
    module: 'maintenance'
  },
  {
    id: '3',
    title: 'Sinergia Canali Rilevata',
    description: 'Clienti Contract che acquistano Tailor Made hanno LTV 2.3x superiore. Suggerito cross-selling mirato su 23 account chiave per +€18,000 margine/mese.',
    severity: 'info',
    timestamp: '1 giorno fa',
    module: 'knowledge'
  }
];

export const calendarEvents: CalendarEvent[] = [
  { id: '1', title: 'Audit Circolarità Q1', date: '2025-01-16', type: 'production' },
  { id: '2', title: 'Review Take-Back Mensile', date: '2025-01-17', type: 'production' },
  { id: '3', title: 'Training Sostenibilità Team', date: '2025-01-18', type: 'shift' },
  { id: '4', title: 'Meeting Canali Contract', date: '2025-01-20', type: 'production' },
  { id: '5', title: 'Certificazione Oeko-Tex', date: '2025-01-21', type: 'production' },
  { id: '6', title: 'Fiera Retail Milano', date: '2025-01-22', type: 'shift' },
  { id: '7', title: 'Review Carbon Footprint', date: '2025-01-24', type: 'production' },
  { id: '8', title: 'Campagna Take-Back Launch', date: '2025-01-25', type: 'production' },
];

export const suggestedActions: SuggestedAction[] = [
  {
    id: '1',
    title: 'Ricalibra Sensore Linea Sedute Contract',
    description: 'Micro-fermate al nastro assemblaggio causano OEE 74.1% (target 85%)',
    actionType: 'maintenance',
    priority: 'high',
    aiReason: 'Stimato recupero +4.2% OEE. Impatto produzione: +85 unità/giorno'
  },
  {
    id: '2',
    title: 'Sostituisci Fornitore Tessuti Tailor Made',
    description: 'Fornitore attuale non certificato pesa 14% delle emissioni Scope 3 totali',
    actionType: 'procedure',
    priority: 'high',
    aiReason: 'Alternativa Oeko-Tex disponibile. Riduzione stimata: -19.9 ton CO2e/anno, carbon footprint al -22%'
  },
  {
    id: '3',
    title: 'Cross-Selling Tailor Made su Account Contract',
    description: '23 account chiave con alta propensione all\'acquisto Tailor Made identificati',
    actionType: 'analysis',
    priority: 'medium',
    aiReason: 'LTV medio 2.3x superiore. Stima impatto: +€18,000 margine/mese'
  }
];

export const knowledgeDocuments: KnowledgeDocument[] = [
  {
    id: '1',
    title: 'Procedura Standard Circolarità Materiali',
    category: 'procedures',
    tags: ['circolarità', 'materiali', 'riciclo'],
    lastUpdated: '2025-01-10',
    excerpt: 'Guida completa per la selezione e certificazione dei materiali riciclati nelle collezioni Haworth Lifestyle.'
  },
  {
    id: '2',
    title: 'Manuale Programma Take-Back',
    category: 'work-instructions',
    tags: ['take-back', 'remanufacturing', 'economia circolare'],
    lastUpdated: '2025-01-08',
    excerpt: 'Istruzioni per la gestione dei prodotti rientrati: valutazione, remanufacturing e smaltimento certificato.'
  },
  {
    id: '3',
    title: 'Standard Qualità Collezioni - ISO 9001',
    category: 'quality-standards',
    tags: ['qualità', 'ISO', 'brand'],
    lastUpdated: '2024-12-15',
    excerpt: 'Standard qualitativi e criteri di ispezione per tutte le collezioni Contract, Retail e Tailor Made.'
  },
  {
    id: '4',
    title: 'Protocollo Carbon Footprint',
    category: 'procedures',
    tags: ['sostenibilità', 'carbon footprint', 'emissioni'],
    lastUpdated: '2025-01-05',
    excerpt: 'Metodologia di calcolo e reporting del carbon footprint per prodotto e per canale.'
  },
  {
    id: '5',
    title: 'Certificazioni Fornitori Oeko-Tex',
    category: 'procedures',
    tags: ['fornitori', 'certificazione', 'tessuti'],
    lastUpdated: '2024-11-20',
    excerpt: 'Requisiti e processo di certificazione per fornitori tessuti e materiali.'
  },
  {
    id: '6',
    title: 'Guida Cross-Selling Canali',
    category: 'work-instructions',
    tags: ['canali', 'cross-selling', 'tailor made'],
    lastUpdated: '2025-01-12',
    excerpt: 'Strategie e procedure per il cross-selling tra canali Contract, Retail e Tailor Made.'
  }
];

export const playbooks: Playbook[] = [
  {
    id: '1',
    title: 'Procedura Take-Back Prodotto',
    description: 'Procedura standard per la gestione di un prodotto rientrato con il programma take-back',
    steps: [
      { id: '1', title: 'Verificare idoneità prodotto al take-back', completed: false },
      { id: '2', title: 'Registrare rientro nel sistema', completed: false },
      { id: '3', title: 'Valutazione condizioni prodotto', completed: false, linkedDocumentId: '2' },
      { id: '4', title: 'Classificare: remanufacturing / ricambi / riciclo', completed: false },
      { id: '5', title: 'Avviare processo di remanufacturing se idoneo', completed: false, linkedDocumentId: '1' },
      { id: '6', title: 'Controllo qualità post-remanufacturing', completed: false, linkedDocumentId: '3' },
      { id: '7', title: 'Inserimento in catalogo Outlet', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Onboarding Fornitore Certificato',
    description: 'Procedura per certificare e attivare un nuovo fornitore di materiali riciclati',
    steps: [
      { id: '1', title: 'Richiesta documentazione certificazioni', completed: false },
      { id: '2', title: 'Verifica certificazione Oeko-Tex', completed: false, linkedDocumentId: '5' },
      { id: '3', title: 'Campionatura e test materiali', completed: false },
      { id: '4', title: 'Valutazione carbon footprint supply chain', completed: false, linkedDocumentId: '4' },
      { id: '5', title: 'Approvazione qualità', completed: false, linkedDocumentId: '3' },
      { id: '6', title: 'Inserimento in catalogo materiali certificati', completed: false },
      { id: '7', title: 'Ordine pilota e monitoraggio', completed: false }
    ]
  },
  {
    id: '3',
    title: 'Gestione Deviazione Qualità',
    description: 'Risposta quando vengono rilevati problemi di qualità su una collezione',
    steps: [
      { id: '1', title: 'Bloccare produzione collezione impattata', completed: false },
      { id: '2', title: 'Quarantena prodotti sospetti', completed: false },
      { id: '3', title: 'Notificare quality supervisor', completed: false },
      { id: '4', title: 'Documentare deviazione', completed: false, linkedDocumentId: '3' },
      { id: '5', title: 'Root cause analysis', completed: false },
      { id: '6', title: 'Implementare azione correttiva', completed: false },
      { id: '7', title: 'Verificare efficacia correzione', completed: false },
      { id: '8', title: 'Riprendere produzione con monitoraggio', completed: false }
    ]
  }
];

export const preloadedQuestions = [
  "Qual è l'OEE attuale per linea di produzione?",
  "Come possiamo ridurre il carbon footprint del Tailor Made?",
  "Qual è il margine lordo per canale questa settimana?",
  "Quanti prodotti sono rientrati con il take-back questo mese?",
  "Quali clienti Contract hanno potenziale Tailor Made?",
  "Qual è lo stato degli obiettivi di circolarità?"
];
