export interface KPI {
  id: string;
  label: string;
  value: number;
  unit: string;
  target?: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  status: 'good' | 'warning' | 'critical';
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  module: 'production' | 'maintenance' | 'knowledge';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'maintenance' | 'production' | 'shift' | 'absence';
  details?: string;
}

export interface SuggestedAction {
  id: string;
  title: string;
  description: string;
  actionType: 'maintenance' | 'procedure' | 'analysis';
  priority: 'high' | 'medium' | 'low';
  aiReason: string;
}

export interface ProductionLine {
  id: string;
  name: string;
  piecesProduced: number;
  scrapRate: number;
  topDowntimeReason: string;
  aiComment: string;
  oee: number;
  availability: number;
  performance: number;
  quality: number;
}

export interface WorkOrder {
  id: string;
  asset: string;
  type: 'preventive' | 'corrective';
  priority: 'high' | 'medium' | 'low';
  scheduledDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: string;
  description: string;
  safetyNotes: string[];
  spareParts: string[];
  steps: string[];
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'procedures' | 'work-instructions' | 'quality-standards' | 'hr-policies';
  tags: string[];
  lastUpdated: string;
  excerpt: string;
}

export interface Playbook {
  id: string;
  title: string;
  description: string;
  steps: PlaybookStep[];
}

export interface PlaybookStep {
  id: string;
  title: string;
  completed: boolean;
  linkedDocumentId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  references?: string[];
}

export interface FilterState {
  plant: string;
  line: string;
  timeRange: 'today' | 'week' | 'month';
}

// ============ COSTS MODULE TYPES ============

export interface CostKPI {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  isNegativeTrendGood?: boolean;
}

export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface CostDriver {
  id: string;
  description: string;
  impact: number;
  impactType: 'positive' | 'negative';
  category: 'scrap' | 'labor' | 'energy' | 'materials' | 'downtime';
}

export interface SKUCost {
  id: string;
  sku: string;
  name: string;
  unitsProduced: number;
  cogsPerUnit: number;
  scrapCostAllocation: number;
  trendVsPrevious: number;
  materialsPerUnit: number;
  laborPerUnit: number;
  energyPerUnit: number;
  overheadPerUnit: number;
  scrapPerUnit: number;
  scrapRate: number;
}

// ============ QUALITY MODULE TYPES ============

export interface QualityKPI {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  isNegativeTrendGood?: boolean;
}

export interface ScrapReason {
  id: string;
  reason: string;
  count: number;
  percentage: number;
  costImpact: number;
}

export interface QualityIncident {
  id: string;
  datetime: string;
  line: string;
  asset: string;
  sku: string;
  defectType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  owner: string;
  summary: string;
  evidence: string[];
  aiRootCauses: string[];
  correctiveActions: {
    id: string;
    title: string;
    type: 'procedure' | 'maintenance' | 'checklist';
    linkedId?: string;
  }[];
  timeline: {
    stage: string;
    date: string;
    completed: boolean;
  }[];
}

export interface QualityCheck {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'per-shift';
  line: string;
  status: 'completed' | 'pending' | 'overdue';
  lastCompleted: string;
}
