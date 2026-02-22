import { QualityKPI, ScrapReason, QualityIncident, QualityCheck } from '@/types/factory';

export const qualityKPIs: QualityKPI[] = [
  {
    id: '1',
    label: 'Scrap Rate',
    value: 2.8,
    unit: '%',
    trend: 'down',
    trendValue: -0.4,
    isNegativeTrendGood: true
  },
  {
    id: '2',
    label: 'Scrap Quantity',
    value: 378,
    unit: 'units',
    trend: 'down',
    trendValue: -12,
    isNegativeTrendGood: true
  },
  {
    id: '3',
    label: 'Rework Rate',
    value: 1.2,
    unit: '%',
    trend: 'up',
    trendValue: 0.2,
    isNegativeTrendGood: true
  },
  {
    id: '4',
    label: 'First Pass Yield',
    value: 96.0,
    unit: '%',
    trend: 'up',
    trendValue: 0.6,
    isNegativeTrendGood: false
  },
  {
    id: '5',
    label: 'COPQ',
    value: 5890,
    unit: '€',
    trend: 'down',
    trendValue: -320,
    isNegativeTrendGood: true
  }
];

export const scrapReasons: ScrapReason[] = [
  { id: '1', reason: 'Surface Defect', count: 98, percentage: 25.9, costImpact: 1225 },
  { id: '2', reason: 'Assembly Misalignment', count: 82, percentage: 21.7, costImpact: 1025 },
  { id: '3', reason: 'Lens Fitting Issue', count: 71, percentage: 18.8, costImpact: 888 },
  { id: '4', reason: 'Dimensional Mismatch', count: 65, percentage: 17.2, costImpact: 812 },
  { id: '5', reason: 'Packaging Defect', count: 38, percentage: 10.0, costImpact: 475 },
  { id: '6', reason: 'Material Contamination', count: 24, percentage: 6.4, costImpact: 300 }
];

export const scrapTrendData = [
  { date: 'Jan 10', scrap: 2.4, target: 2.5 },
  { date: 'Jan 11', scrap: 2.6, target: 2.5 },
  { date: 'Jan 12', scrap: 3.1, target: 2.5 },
  { date: 'Jan 13', scrap: 2.9, target: 2.5 },
  { date: 'Jan 14', scrap: 2.7, target: 2.5 },
  { date: 'Jan 15', scrap: 2.8, target: 2.5 },
  { date: 'Jan 16', scrap: 2.8, target: 2.5 }
];

export const qualityIncidents: QualityIncident[] = [
  {
    id: 'QI-2025-0042',
    datetime: '2025-01-16 08:45',
    line: 'Line 2',
    asset: 'Assembly Station B',
    sku: 'SKU-C300',
    defectType: 'Assembly Misalignment',
    severity: 'high',
    status: 'investigating',
    owner: 'Maria Santos',
    summary: 'Batch of 35 units showed consistent misalignment in housing assembly. Detected during in-process inspection.',
    evidence: [
      'Affected batch: #B-4521-C300',
      'Shift: Morning (06:00-14:00)',
      'Machine: Assembly Station B',
      'Operator notes: Noticed alignment drift after tool change'
    ],
    aiRootCauses: [
      'Tool calibration drift detected (78% confidence)',
      'Fixture wear on positioning pins (65% confidence)',
      'Temperature variation affecting tolerances (42% confidence)'
    ],
    correctiveActions: [
      { id: '1', title: 'View alignment calibration procedure', type: 'procedure', linkedId: '6' },
      { id: '2', title: 'Open maintenance WO for fixture inspection', type: 'maintenance' },
      { id: '3', title: 'Update pre-shift calibration checklist', type: 'checklist' }
    ],
    timeline: [
      { stage: 'Detection', date: '2025-01-16 08:45', completed: true },
      { stage: 'Containment', date: '2025-01-16 09:15', completed: true },
      { stage: 'Root Cause Analysis', date: '2025-01-16 10:00', completed: false },
      { stage: 'Corrective Action', date: '', completed: false },
      { stage: 'Verification', date: '', completed: false }
    ]
  },
  {
    id: 'QI-2025-0041',
    datetime: '2025-01-15 14:20',
    line: 'Line 1',
    asset: 'Finishing Station',
    sku: 'SKU-A100',
    defectType: 'Surface Defect',
    severity: 'medium',
    status: 'resolved',
    owner: 'Paolo Verdi',
    summary: '18 units with visible scratches on surface finish. Root cause identified as contaminated cleaning solution.',
    evidence: [
      'Affected batch: #B-4498-A100',
      'Shift: Afternoon (14:00-22:00)',
      'Machine: Finishing Station',
      'Lab analysis confirmed cleaning solution contamination'
    ],
    aiRootCauses: [
      'Cleaning solution contamination (confirmed)',
      'Filter replacement overdue by 2 days'
    ],
    correctiveActions: [
      { id: '1', title: 'Replace cleaning solution and filters', type: 'maintenance', linkedId: 'WO-2024-0155' },
      { id: '2', title: 'Update filter replacement schedule', type: 'checklist' }
    ],
    timeline: [
      { stage: 'Detection', date: '2025-01-15 14:20', completed: true },
      { stage: 'Containment', date: '2025-01-15 14:45', completed: true },
      { stage: 'Root Cause Analysis', date: '2025-01-15 16:00', completed: true },
      { stage: 'Corrective Action', date: '2025-01-15 17:30', completed: true },
      { stage: 'Verification', date: '2025-01-16 06:00', completed: true }
    ]
  },
  {
    id: 'QI-2025-0040',
    datetime: '2025-01-15 10:30',
    line: 'Line 3',
    asset: 'Lens Assembly',
    sku: 'SKU-B200',
    defectType: 'Lens Fitting Issue',
    severity: 'critical',
    status: 'open',
    owner: 'Ahmed Hassan',
    summary: 'Lens not seating properly in 12 units. Customer-facing defect requiring immediate attention.',
    evidence: [
      'Affected batch: #B-4512-B200',
      'Shift: Morning (06:00-14:00)',
      'Machine: Lens Assembly Unit 3',
      'First reported by final QC inspection'
    ],
    aiRootCauses: [
      'Lens supplier dimensional variance (72% confidence)',
      'Assembly pressure setting drift (58% confidence)',
      'Operator technique variation (35% confidence)'
    ],
    correctiveActions: [
      { id: '1', title: 'Review lens receiving inspection procedure', type: 'procedure', linkedId: '3' },
      { id: '2', title: 'Contact supplier quality team', type: 'procedure' },
      { id: '3', title: 'Calibrate assembly pressure settings', type: 'maintenance' }
    ],
    timeline: [
      { stage: 'Detection', date: '2025-01-15 10:30', completed: true },
      { stage: 'Containment', date: '2025-01-15 11:00', completed: true },
      { stage: 'Root Cause Analysis', date: '', completed: false },
      { stage: 'Corrective Action', date: '', completed: false },
      { stage: 'Verification', date: '', completed: false }
    ]
  }
];

export const qualityChecks: QualityCheck[] = [
  { id: '1', name: 'Incoming Material Inspection', frequency: 'daily', line: 'All', status: 'completed', lastCompleted: '2025-01-16 07:00' },
  { id: '2', name: 'In-Process Dimensional Check', frequency: 'per-shift', line: 'Line 1', status: 'completed', lastCompleted: '2025-01-16 08:30' },
  { id: '3', name: 'In-Process Dimensional Check', frequency: 'per-shift', line: 'Line 2', status: 'pending', lastCompleted: '2025-01-15 22:30' },
  { id: '4', name: 'In-Process Dimensional Check', frequency: 'per-shift', line: 'Line 3', status: 'completed', lastCompleted: '2025-01-16 09:00' },
  { id: '5', name: 'Final Product Inspection', frequency: 'per-shift', line: 'All', status: 'completed', lastCompleted: '2025-01-16 10:00' },
  { id: '6', name: 'Calibration Verification', frequency: 'weekly', line: 'All', status: 'overdue', lastCompleted: '2025-01-08 14:00' },
  { id: '7', name: 'SPC Chart Review', frequency: 'daily', line: 'All', status: 'completed', lastCompleted: '2025-01-16 06:30' }
];

export const qualityQuestions = [
  "What are the top scrap causes this week?",
  "Why did scrap increase on Line 2?",
  "Which corrective action would reduce COPQ fastest?",
  "Show me the procedure for preventing assembly misalignment",
  "What's the status of open quality incidents?"
];
