import { QualityKPI, ScrapReason, QualityIncident, QualityCheck } from '@/types/factory';

export const qualityKPIs: QualityKPI[] = [
  {
    id: '1',
    label: 'First Pass Quality Rate',
    value: 96.8,
    unit: '%',
    trend: 'up',
    trendValue: 0.4,
    isNegativeTrendGood: false
  },
  {
    id: '2',
    label: 'Tasso Difetti (ppm)',
    value: 320,
    unit: 'ppm',
    trend: 'down',
    trendValue: -45,
    isNegativeTrendGood: true
  },
  {
    id: '3',
    label: 'On-Time Delivery Contract',
    value: 94.2,
    unit: '%',
    trend: 'up',
    trendValue: 1.1,
    isNegativeTrendGood: false
  },
  {
    id: '4',
    label: 'Customer Satisfaction Score',
    value: 4.6,
    unit: '/5',
    trend: 'up',
    trendValue: 0.1,
    isNegativeTrendGood: false
  }
];

export const scrapReasons: ScrapReason[] = [
  { id: '1', reason: 'Difetto tessuto - macchia', count: 42, percentage: 28.4, costImpact: 1890 },
  { id: '2', reason: 'Dimensioni fuori tolleranza', count: 35, percentage: 23.6, costImpact: 1575 },
  { id: '3', reason: 'Verniciatura non uniforme', count: 28, percentage: 18.9, costImpact: 1260 },
  { id: '4', reason: 'Assemblaggio difettoso', count: 22, percentage: 14.9, costImpact: 990 },
  { id: '5', reason: 'Imbottitura non conforme', count: 12, percentage: 8.1, costImpact: 540 },
  { id: '6', reason: 'Difetto materiale riciclato', count: 9, percentage: 6.1, costImpact: 405 }
];

export const scrapTrendData = [
  { date: 'Gen 10', scrap: 2.4, target: 2.5 },
  { date: 'Gen 11', scrap: 2.6, target: 2.5 },
  { date: 'Gen 12', scrap: 3.1, target: 2.5 },
  { date: 'Gen 13', scrap: 2.9, target: 2.5 },
  { date: 'Gen 14', scrap: 2.7, target: 2.5 },
  { date: 'Gen 15', scrap: 2.5, target: 2.5 },
  { date: 'Gen 16', scrap: 2.3, target: 2.5 }
];

export const qualityIncidents: QualityIncident[] = [
  {
    id: 'QI-001',
    datetime: '2025-01-16 08:45',
    line: 'Linea Sedute Contract',
    asset: 'Stazione Assemblaggio',
    sku: 'FRN-FERN-C',
    defectType: 'Difetto tessuto - macchia',
    severity: 'medium',
    status: 'resolved',
    owner: 'Maria Santos',
    summary: 'Lotto di 12 sedute con macchie visibili sul tessuto. Causa identificata: lotto tessuto fornitore non conforme.',
    evidence: [
      'Lotto tessuto: #T-2025-0142',
      'Turno: Mattina (06:00-14:00)',
      'Fornitore: TextilPro SpA',
      'Ispezione visiva confermata'
    ],
    aiRootCauses: [
      'Lotto tessuto fornitore con variazione colore (confermato)',
      'Controllo incoming non ha rilevato difetto su campione'
    ],
    correctiveActions: [
      { id: '1', title: 'Sostituire lotto tessuto e notificare fornitore', type: 'procedure' },
      { id: '2', title: 'Aggiornare procedura ispezione incoming tessuti', type: 'checklist' }
    ],
    timeline: [
      { stage: 'Rilevamento', date: '2025-01-16 08:45', completed: true },
      { stage: 'Contenimento', date: '2025-01-16 09:15', completed: true },
      { stage: 'Analisi Causa', date: '2025-01-16 11:00', completed: true },
      { stage: 'Azione Correttiva', date: '2025-01-16 14:00', completed: true },
      { stage: 'Verifica', date: '2025-01-16 16:00', completed: true }
    ]
  },
  {
    id: 'QI-002',
    datetime: '2025-01-15 14:20',
    line: 'Linea Tailor Made',
    asset: 'Stazione Taglio',
    sku: 'FRN-VERY-TM',
    defectType: 'Dimensioni fuori tolleranza',
    severity: 'high',
    status: 'investigating',
    owner: 'Paolo Verdi',
    summary: '8 sedute Tailor Made con dimensioni fuori specifica. Personalizzazione richiede ricalibrazione macchina taglio.',
    evidence: [
      'Ordine: TM-2025-0087',
      'Turno: Pomeriggio (14:00-22:00)',
      'Macchina: CNC Taglio #2',
      'Tolleranza superata di 3mm su altezza schienale'
    ],
    aiRootCauses: [
      'Parametri CNC non aggiornati per specifica Tailor Made (82% confidenza)',
      'Usura utensile taglio (45% confidenza)'
    ],
    correctiveActions: [
      { id: '1', title: 'Ricalibrazione CNC per specifiche Tailor Made', type: 'maintenance' },
      { id: '2', title: 'Verifica usura utensili', type: 'maintenance' },
      { id: '3', title: 'Aggiornare checklist pre-setup Tailor Made', type: 'checklist' }
    ],
    timeline: [
      { stage: 'Rilevamento', date: '2025-01-15 14:20', completed: true },
      { stage: 'Contenimento', date: '2025-01-15 15:00', completed: true },
      { stage: 'Analisi Causa', date: '', completed: false },
      { stage: 'Azione Correttiva', date: '', completed: false },
      { stage: 'Verifica', date: '', completed: false }
    ]
  },
  {
    id: 'QI-003',
    datetime: '2025-01-15 10:30',
    line: 'Linea Retail',
    asset: 'Stazione Verniciatura',
    sku: 'FRN-LOUNGE-R',
    defectType: 'Verniciatura non uniforme',
    severity: 'low',
    status: 'open',
    owner: 'Ahmed Hassan',
    summary: '5 poltrone con verniciatura non uniforme sulla struttura. Difetto estetico minore ma impatta brand consistency.',
    evidence: [
      'Lotto: #R-2025-0298',
      'Turno: Mattina (06:00-14:00)',
      'Cabina verniciatura: #3',
      'Rilevato da QC finale'
    ],
    aiRootCauses: [
      'Temperatura cabina fuori range (68% confidenza)',
      'Viscosità vernice non ottimale (52% confidenza)',
      'Ugello parzialmente ostruito (40% confidenza)'
    ],
    correctiveActions: [
      { id: '1', title: 'Controllo e pulizia ugelli cabina #3', type: 'maintenance' },
      { id: '2', title: 'Verifica parametri temperatura e viscosità', type: 'procedure' },
      { id: '3', title: 'Rilavorazione poltrone impattate', type: 'procedure' }
    ],
    timeline: [
      { stage: 'Rilevamento', date: '2025-01-15 10:30', completed: true },
      { stage: 'Contenimento', date: '2025-01-15 11:00', completed: true },
      { stage: 'Analisi Causa', date: '', completed: false },
      { stage: 'Azione Correttiva', date: '', completed: false },
      { stage: 'Verifica', date: '', completed: false }
    ]
  }
];

export const qualityChecks: QualityCheck[] = [
  { id: '1', name: 'Ispezione Materiali Incoming', frequency: 'daily', line: 'All', status: 'completed', lastCompleted: '2025-01-16 07:00' },
  { id: '2', name: 'Controllo Dimensionale In-Process', frequency: 'per-shift', line: 'Linea Sedute Contract', status: 'completed', lastCompleted: '2025-01-16 08:30' },
  { id: '3', name: 'Controllo Dimensionale In-Process', frequency: 'per-shift', line: 'Linea Tailor Made', status: 'pending', lastCompleted: '2025-01-15 22:30' },
  { id: '4', name: 'Controllo Dimensionale In-Process', frequency: 'per-shift', line: 'Linea Retail', status: 'completed', lastCompleted: '2025-01-16 09:00' },
  { id: '5', name: 'Ispezione Finale Prodotto', frequency: 'per-shift', line: 'All', status: 'completed', lastCompleted: '2025-01-16 10:00' },
  { id: '6', name: 'Verifica Calibrazione', frequency: 'weekly', line: 'All', status: 'overdue', lastCompleted: '2025-01-08 14:00' },
  { id: '7', name: 'Review Brand Consistency', frequency: 'daily', line: 'All', status: 'completed', lastCompleted: '2025-01-16 06:30' }
];

export const qualityQuestions = [
  "Quali sono i principali difetti questa settimana?",
  "Qual è l'impatto della qualità sui costi?",
  "Come possiamo migliorare il First Pass Quality Rate?",
  "Mostrami la procedura per il controllo tessuti incoming",
  "Qual è lo stato degli incidenti qualità aperti?"
];