import { CostKPI, CostBreakdown, CostDriver, SKUCost } from '@/types/factory';

export const costKPIs: CostKPI[] = [
  {
    id: '1',
    label: 'COGS per Unit',
    value: 12.45,
    unit: '€/unit',
    trend: 'up',
    trendValue: 0.32,
    isNegativeTrendGood: true
  },
  {
    id: '2',
    label: 'Total COGS',
    value: 167850,
    unit: '€',
    trend: 'up',
    trendValue: 3.2,
    isNegativeTrendGood: true
  },
  {
    id: '3',
    label: 'Scrap Cost',
    value: 4725,
    unit: '€',
    trend: 'up',
    trendValue: 12.5,
    isNegativeTrendGood: true
  },
  {
    id: '4',
    label: 'Scrap % of Production Cost',
    value: 2.8,
    unit: '%',
    trend: 'down',
    trendValue: -0.4,
    isNegativeTrendGood: true
  }
];

export const costBreakdown: CostBreakdown[] = [
  { category: 'Materials', amount: 75330, percentage: 44.9, color: 'hsl(30, 8%, 40%)' },
  { category: 'Labor', amount: 45200, percentage: 26.9, color: 'hsl(210, 100%, 50%)' },
  { category: 'Energy', amount: 22100, percentage: 13.2, color: 'hsl(38, 92%, 50%)' },
  { category: 'Overhead', amount: 20495, percentage: 12.2, color: 'hsl(280, 65%, 60%)' },
  { category: 'Scrap/Rework', amount: 4725, percentage: 2.8, color: 'hsl(0, 72%, 51%)' }
];

export const costDrivers: CostDriver[] = [
  {
    id: '1',
    description: 'Scrap increase on Line 2 (+€850 vs last week)',
    impact: 850,
    impactType: 'negative',
    category: 'scrap'
  },
  {
    id: '2',
    description: 'Long changeover times (+2.5 labor hours)',
    impact: 125,
    impactType: 'negative',
    category: 'labor'
  },
  {
    id: '3',
    description: 'Energy spike during peak hours (14:00-16:00)',
    impact: 340,
    impactType: 'negative',
    category: 'energy'
  },
  {
    id: '4',
    description: 'Material price increase (raw aluminum +3%)',
    impact: 1200,
    impactType: 'negative',
    category: 'materials'
  },
  {
    id: '5',
    description: 'Unplanned downtime on Press #3 (45 min)',
    impact: 520,
    impactType: 'negative',
    category: 'downtime'
  }
];

export const skuCosts: SKUCost[] = [
  {
    id: '1',
    sku: 'SKU-A100',
    name: 'Premium Frame Assembly',
    unitsProduced: 2450,
    cogsPerUnit: 14.80,
    scrapCostAllocation: 1250,
    trendVsPrevious: 2.1,
    materialsPerUnit: 6.50,
    laborPerUnit: 3.80,
    energyPerUnit: 1.90,
    overheadPerUnit: 1.85,
    scrapPerUnit: 0.75,
    scrapRate: 3.2
  },
  {
    id: '2',
    sku: 'SKU-B200',
    name: 'Standard Lens Module',
    unitsProduced: 4200,
    cogsPerUnit: 11.20,
    scrapCostAllocation: 980,
    trendVsPrevious: -1.5,
    materialsPerUnit: 5.10,
    laborPerUnit: 2.90,
    energyPerUnit: 1.40,
    overheadPerUnit: 1.50,
    scrapPerUnit: 0.30,
    scrapRate: 1.8
  },
  {
    id: '3',
    sku: 'SKU-C300',
    name: 'Precision Housing Unit',
    unitsProduced: 3100,
    cogsPerUnit: 13.45,
    scrapCostAllocation: 1420,
    trendVsPrevious: 4.3,
    materialsPerUnit: 5.80,
    laborPerUnit: 3.50,
    energyPerUnit: 1.65,
    overheadPerUnit: 1.70,
    scrapPerUnit: 0.80,
    scrapRate: 3.8
  },
  {
    id: '4',
    sku: 'SKU-D400',
    name: 'Compact Sensor Array',
    unitsProduced: 1850,
    cogsPerUnit: 18.90,
    scrapCostAllocation: 650,
    trendVsPrevious: 0.8,
    materialsPerUnit: 9.20,
    laborPerUnit: 4.50,
    energyPerUnit: 2.10,
    overheadPerUnit: 2.30,
    scrapPerUnit: 0.80,
    scrapRate: 2.1
  },
  {
    id: '5',
    sku: 'SKU-E500',
    name: 'Economy Cover Plate',
    unitsProduced: 5800,
    cogsPerUnit: 6.85,
    scrapCostAllocation: 425,
    trendVsPrevious: -0.5,
    materialsPerUnit: 3.20,
    laborPerUnit: 1.80,
    energyPerUnit: 0.85,
    overheadPerUnit: 0.85,
    scrapPerUnit: 0.15,
    scrapRate: 1.2
  }
];

export const costsQuestions = [
  "What is driving COGS up this week?",
  "How much did scrap cost us today?",
  "Which SKU has the highest unit cost and why?",
  "What's the cost breakdown by line?",
  "How can we reduce scrap costs?"
];
