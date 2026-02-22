import { 
  KPI, 
  AIInsight, 
  CalendarEvent, 
  SuggestedAction, 
  ProductionLine, 
  WorkOrder, 
  KnowledgeDocument, 
  Playbook 
} from '@/types/factory';

export const kpiData: KPI[] = [
  {
    id: '1',
    label: 'OEE',
    value: 78.5,
    unit: '%',
    trend: 'down',
    trendValue: -2.3,
    status: 'warning'
  },
  {
    id: '2',
    label: 'Pieces per Hour',
    value: 1247,
    unit: 'pcs/h',
    trend: 'up',
    trendValue: 3.1,
    status: 'good'
  },
  {
    id: '3',
    label: 'Scrap Rate',
    value: 2.8,
    unit: '%',
    trend: 'down',
    trendValue: -0.4,
    status: 'good'
  },
  {
    id: '4',
    label: 'Downtime Cost',
    value: 12450,
    unit: '€',
    trend: 'up',
    trendValue: 1850,
    status: 'critical'
  }
];

export const aiInsights: AIInsight[] = [
  {
    id: '1',
    title: 'OEE Drop Detected',
    description: 'OEE dropped 2.3% due to micro-stoppages on Line 2. The conveyor belt sensor triggered 12 false positives between 06:00-08:00.',
    severity: 'warning',
    timestamp: '2 hours ago',
    module: 'production'
  },
  {
    id: '2',
    title: 'Maintenance Alert',
    description: 'Predictive analysis indicates hydraulic pump on Press #3 may fail within 72 hours. Recommend scheduling preventive maintenance.',
    severity: 'critical',
    timestamp: '4 hours ago',
    module: 'maintenance'
  },
  {
    id: '3',
    title: 'Quality Trend',
    description: 'Scrap rate improved 0.4% after implementing new inspection procedure on Line 1. Consider extending to other lines.',
    severity: 'info',
    timestamp: '6 hours ago',
    module: 'production'
  }
];

export const calendarEvents: CalendarEvent[] = [
  { id: '1', title: 'Preventive Maintenance - Press #3', date: '2025-01-16', type: 'maintenance' },
  { id: '2', title: 'Line 2 Changeover', date: '2025-01-17', type: 'production' },
  { id: '3', title: 'Night Shift Training', date: '2025-01-18', type: 'shift' },
  { id: '4', title: 'Quality Audit', date: '2025-01-20', type: 'production' },
  { id: '5', title: 'Conveyor Belt Replacement', date: '2025-01-21', type: 'maintenance' },
  { id: '6', title: 'Team Lead Absence', date: '2025-01-22', type: 'absence' },
  { id: '7', title: 'Monthly Safety Review', date: '2025-01-24', type: 'shift' },
  { id: '8', title: 'Sensor Calibration', date: '2025-01-25', type: 'maintenance' },
];

export const suggestedActions: SuggestedAction[] = [
  {
    id: '1',
    title: 'Schedule Hydraulic Pump Maintenance',
    description: 'Press #3 hydraulic system showing early warning signs',
    actionType: 'maintenance',
    priority: 'high',
    aiReason: 'Vibration analysis indicates 73% probability of failure within 72 hours'
  },
  {
    id: '2',
    title: 'Review Conveyor Sensor Settings',
    description: 'Reduce micro-stoppages on Line 2',
    actionType: 'procedure',
    priority: 'medium',
    aiReason: 'Current sensitivity causing 12 false positives per shift'
  },
  {
    id: '3',
    title: 'Analyze Quality Deviation Batch #4521',
    description: 'Scrap spike detected in morning production',
    actionType: 'analysis',
    priority: 'medium',
    aiReason: 'Scrap rate 1.2% above baseline during 06:00-09:00 window'
  }
];

export const productionLines: ProductionLine[] = [
  {
    id: '1',
    name: 'Line 1',
    piecesProduced: 4521,
    scrapRate: 1.8,
    topDowntimeReason: 'Planned changeover',
    aiComment: 'Operating within target parameters. Quality metrics improved after procedure update.',
    oee: 85.2,
    availability: 92.1,
    performance: 94.5,
    quality: 97.8
  },
  {
    id: '2',
    name: 'Line 2',
    piecesProduced: 3845,
    scrapRate: 3.2,
    topDowntimeReason: 'Micro-stoppages',
    aiComment: 'Conveyor sensor causing frequent stops. Recommend recalibration.',
    oee: 71.8,
    availability: 78.4,
    performance: 95.2,
    quality: 96.1
  },
  {
    id: '3',
    name: 'Line 3',
    piecesProduced: 5102,
    scrapRate: 2.1,
    topDowntimeReason: 'Material shortage',
    aiComment: 'High output but supply chain delay at 14:00 caused 45min stop.',
    oee: 79.5,
    availability: 88.3,
    performance: 91.8,
    quality: 98.1
  }
];

export const oeeChartData = [
  { time: '06:00', oee: 82, availability: 90, performance: 93, quality: 98 },
  { time: '08:00', oee: 78, availability: 85, performance: 94, quality: 97 },
  { time: '10:00', oee: 75, availability: 82, performance: 95, quality: 96 },
  { time: '12:00', oee: 80, availability: 88, performance: 93, quality: 97 },
  { time: '14:00', oee: 72, availability: 78, performance: 95, quality: 97 },
  { time: '16:00', oee: 79, availability: 86, performance: 94, quality: 97 },
  { time: '18:00', oee: 81, availability: 89, performance: 93, quality: 98 },
];

export const workOrders: WorkOrder[] = [
  {
    id: 'WO-2024-0156',
    asset: 'Press #3 - Hydraulic System',
    type: 'preventive',
    priority: 'high',
    scheduledDate: '2025-01-16',
    status: 'pending',
    estimatedTime: '4 hours',
    description: 'Replace hydraulic pump seals and check pressure levels. Vibration analysis indicated early wear patterns.',
    safetyNotes: [
      'Lock out/tag out required',
      'Wear safety glasses and gloves',
      'Ensure hydraulic pressure is released before work'
    ],
    spareParts: [
      'Hydraulic pump seal kit (SKU: HP-SEAL-003)',
      'O-rings set (SKU: OR-HYD-012)',
      'Hydraulic fluid 5L (SKU: HF-ISO-46)'
    ],
    steps: [
      'Isolate power and engage LOTO procedure',
      'Release hydraulic pressure via relief valve',
      'Drain hydraulic fluid into containment',
      'Remove pump housing cover',
      'Inspect and replace worn seals',
      'Install new O-rings',
      'Reassemble and refill with fresh fluid',
      'Test under low pressure',
      'Run full pressure test cycle'
    ]
  },
  {
    id: 'WO-2024-0157',
    asset: 'Conveyor Belt - Line 2',
    type: 'corrective',
    priority: 'medium',
    scheduledDate: '2025-01-17',
    status: 'pending',
    estimatedTime: '2 hours',
    description: 'Recalibrate proximity sensors causing false micro-stoppages.',
    safetyNotes: [
      'Wear safety vest when working near moving parts',
      'Coordinate with production for line stoppage'
    ],
    spareParts: [
      'Proximity sensor (if needed, SKU: PS-IND-024)'
    ],
    steps: [
      'Stop conveyor and engage safety lock',
      'Access sensor housing',
      'Check sensor alignment',
      'Adjust sensitivity settings',
      'Test with sample products',
      'Document new settings'
    ]
  },
  {
    id: 'WO-2024-0158',
    asset: 'Packaging Unit A',
    type: 'preventive',
    priority: 'low',
    scheduledDate: '2025-01-21',
    status: 'pending',
    estimatedTime: '1.5 hours',
    description: 'Monthly lubrication and belt tension check.',
    safetyNotes: [
      'Standard PPE required'
    ],
    spareParts: [
      'Lubricant spray (SKU: LUB-FOOD-01)'
    ],
    steps: [
      'Visual inspection of all belts',
      'Check and adjust tension',
      'Lubricate bearing points',
      'Clean sensors',
      'Update maintenance log'
    ]
  },
  {
    id: 'WO-2024-0155',
    asset: 'Robot Arm - Cell 4',
    type: 'corrective',
    priority: 'high',
    scheduledDate: '2025-01-15',
    status: 'completed',
    estimatedTime: '3 hours',
    description: 'Replaced faulty servo motor after positioning errors.',
    safetyNotes: [
      'Robot must be in safe mode',
      'Keep clear of movement envelope'
    ],
    spareParts: [
      'Servo motor (SKU: SM-ROB-007)'
    ],
    steps: [
      'Put robot in safe mode',
      'Disconnect power',
      'Remove faulty servo',
      'Install replacement',
      'Recalibrate positioning',
      'Run test program'
    ]
  }
];

export const knowledgeDocuments: KnowledgeDocument[] = [
  {
    id: '1',
    title: 'Press Machine Standard Operating Procedure',
    category: 'procedures',
    tags: ['press', 'safety', 'operation'],
    lastUpdated: '2025-01-10',
    excerpt: 'Complete guide for operating hydraulic press machines including startup, operation, and shutdown procedures.'
  },
  {
    id: '2',
    title: 'Conveyor Belt Maintenance Guide',
    category: 'work-instructions',
    tags: ['conveyor', 'maintenance', 'preventive'],
    lastUpdated: '2025-01-08',
    excerpt: 'Step-by-step instructions for regular maintenance of conveyor systems including belt tension and sensor calibration.'
  },
  {
    id: '3',
    title: 'Quality Control Standards - ISO 9001',
    category: 'quality-standards',
    tags: ['quality', 'ISO', 'compliance'],
    lastUpdated: '2024-12-15',
    excerpt: 'Quality management standards and inspection criteria for all production lines.'
  },
  {
    id: '4',
    title: 'Shift Handover Protocol',
    category: 'hr-policies',
    tags: ['shift', 'handover', 'communication'],
    lastUpdated: '2025-01-05',
    excerpt: 'Guidelines for effective shift handover including required documentation and communication protocols.'
  },
  {
    id: '5',
    title: 'Lock Out Tag Out (LOTO) Procedure',
    category: 'procedures',
    tags: ['safety', 'LOTO', 'maintenance'],
    lastUpdated: '2024-11-20',
    excerpt: 'Mandatory safety procedure for isolating energy sources during maintenance activities.'
  },
  {
    id: '6',
    title: 'Sensor Calibration Guidelines',
    category: 'work-instructions',
    tags: ['sensors', 'calibration', 'quality'],
    lastUpdated: '2025-01-12',
    excerpt: 'Technical guide for calibrating proximity, temperature, and pressure sensors across production equipment.'
  }
];

export const playbooks: Playbook[] = [
  {
    id: '1',
    title: 'Changeover Procedure',
    description: 'Standard procedure for product changeover on production lines',
    steps: [
      { id: '1', title: 'Complete current production batch', completed: false },
      { id: '2', title: 'Clear line of current product', completed: false },
      { id: '3', title: 'Update line settings per product spec', completed: false, linkedDocumentId: '1' },
      { id: '4', title: 'Replace tooling/dies if required', completed: false },
      { id: '5', title: 'Run test pieces and verify quality', completed: false, linkedDocumentId: '3' },
      { id: '6', title: 'Confirm with quality control', completed: false },
      { id: '7', title: 'Resume production', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Line Restart After Downtime',
    description: 'Procedure for safely restarting production after unplanned downtime',
    steps: [
      { id: '1', title: 'Identify and resolve root cause', completed: false },
      { id: '2', title: 'Complete safety inspection', completed: false, linkedDocumentId: '5' },
      { id: '3', title: 'Check all guards and sensors', completed: false },
      { id: '4', title: 'Run equipment in manual mode', completed: false },
      { id: '5', title: 'Verify first piece quality', completed: false, linkedDocumentId: '3' },
      { id: '6', title: 'Switch to automatic mode', completed: false },
      { id: '7', title: 'Monitor for 15 minutes', completed: false }
    ]
  },
  {
    id: '3',
    title: 'Handling Quality Deviation',
    description: 'Response procedure when quality issues are detected',
    steps: [
      { id: '1', title: 'Stop affected production', completed: false },
      { id: '2', title: 'Quarantine suspect products', completed: false },
      { id: '3', title: 'Notify quality supervisor', completed: false },
      { id: '4', title: 'Document deviation details', completed: false, linkedDocumentId: '3' },
      { id: '5', title: 'Perform root cause analysis', completed: false },
      { id: '6', title: 'Implement corrective action', completed: false },
      { id: '7', title: 'Verify correction effectiveness', completed: false },
      { id: '8', title: 'Resume production with monitoring', completed: false }
    ]
  }
];

export const preloadedQuestions = [
  "Why did OEE drop yesterday?",
  "What maintenance should I do this week to avoid downtime?",
  "Show me the procedure for replacing sensor X",
  "What is the cost impact of today's scrap?",
  "Which line has the best performance this month?",
  "What are the safety requirements for Press #3 maintenance?"
];
