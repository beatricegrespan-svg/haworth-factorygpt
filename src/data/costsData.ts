import { CostKPI, CostBreakdown, CostDriver, SKUCost } from '@/types/factory';

export const costKPIs: CostKPI[] = [
  {
    id: '1',
    label: 'COGS per Unit',
    value: 285,
    unit: '€/unit',
    trend: 'up',
    trendValue: 1.8,
    isNegativeTrendGood: true
  },
  {
    id: '2',
    label: 'Total COGS',
    value: 168100,
    unit: '€',
    trend: 'up',
    trendValue: 2.1,
    isNegativeTrendGood: true
  },
  {
    id: '3',
    label: 'Scrap Cost',
    value: 13600,
    unit: '€',
    trend: 'down',
    trendValue: -3.2,
    isNegativeTrendGood: true
  },
  {
    id: '4',
    label: 'Margine Lordo Medio',
    value: 42.6,
    unit: '%',
    trend: 'up',
    trendValue: 1.1,
    isNegativeTrendGood: false
  }
];

export const costBreakdown: CostBreakdown[] = [
  { category: 'Materiali', amount: 89400, percentage: 53.2, color: 'hsl(30, 8%, 40%)' },
  { category: 'Manodopera', amount: 38200, percentage: 22.7, color: 'hsl(210, 100%, 50%)' },
  { category: 'Energia', amount: 14800, percentage: 8.8, color: 'hsl(38, 92%, 50%)' },
  { category: 'Logistica', amount: 12100, percentage: 7.2, color: 'hsl(280, 65%, 60%)' },
  { category: 'Scarti/Rilavorazioni', amount: 13600, percentage: 8.1, color: 'hsl(0, 72%, 51%)' }
];

export const costDrivers: CostDriver[] = [
  {
    id: '1',
    description: 'Materiali tessuti Tailor Made non certificati (+€1,200 vs standard)',
    impact: 1200,
    impactType: 'negative',
    category: 'materials'
  },
  {
    id: '2',
    description: 'Setup aggiuntivi Tailor Made (+3.5 ore manodopera)',
    impact: 420,
    impactType: 'negative',
    category: 'labor'
  },
  {
    id: '3',
    description: 'Logistica spedizioni parziali Tailor Made',
    impact: 340,
    impactType: 'negative',
    category: 'materials'
  },
  {
    id: '4',
    description: 'Verniciatura non uniforme (rilavorazione Retail)',
    impact: 650,
    impactType: 'negative',
    category: 'scrap'
  },
  {
    id: '5',
    description: 'Valore recuperato da remanufacturing take-back',
    impact: 8450,
    impactType: 'positive',
    category: 'materials'
  }
];

export const skuCosts: SKUCost[] = [
  {
    id: '1',
    sku: 'FRN-FERN-C',
    name: 'Haworth Fern Contract',
    unitsProduced: 1820,
    cogsPerUnit: 285,
    scrapCostAllocation: 1850,
    trendVsPrevious: 1.8,
    materialsPerUnit: 142,
    laborPerUnit: 68,
    energyPerUnit: 28,
    overheadPerUnit: 32,
    scrapPerUnit: 15,
    scrapRate: 2.9
  },
  {
    id: '2',
    sku: 'FRN-VERY-TM',
    name: 'Very Task Chair TM',
    unitsProduced: 300,
    cogsPerUnit: 420,
    scrapCostAllocation: 2100,
    trendVsPrevious: 2.4,
    materialsPerUnit: 210,
    laborPerUnit: 95,
    energyPerUnit: 38,
    overheadPerUnit: 52,
    scrapPerUnit: 25,
    scrapRate: 3.6
  },
  {
    id: '3',
    sku: 'FRN-WORK-STD',
    name: 'Workwall Standard',
    unitsProduced: 620,
    cogsPerUnit: 890,
    scrapCostAllocation: 3200,
    trendVsPrevious: 1.2,
    materialsPerUnit: 480,
    laborPerUnit: 185,
    energyPerUnit: 72,
    overheadPerUnit: 120,
    scrapPerUnit: 33,
    scrapRate: 1.8
  },
  {
    id: '4',
    sku: 'FRN-LOUNGE-R',
    name: 'Lounge Retail Collection',
    unitsProduced: 870,
    cogsPerUnit: 650,
    scrapCostAllocation: 2800,
    trendVsPrevious: 2.1,
    materialsPerUnit: 340,
    laborPerUnit: 142,
    energyPerUnit: 55,
    overheadPerUnit: 78,
    scrapPerUnit: 35,
    scrapRate: 1.8
  },
  {
    id: '5',
    sku: 'FRN-DIVIDER',
    name: 'Acoustic Dividers',
    unitsProduced: 1240,
    cogsPerUnit: 175,
    scrapCostAllocation: 1250,
    trendVsPrevious: -0.5,
    materialsPerUnit: 92,
    laborPerUnit: 38,
    energyPerUnit: 18,
    overheadPerUnit: 22,
    scrapPerUnit: 5,
    scrapRate: 1.8
  }
];

export const costsQuestions = [
  "Qual è il COGS per canale questa settimana?",
  "Quanto costano gli scarti nel Tailor Made?",
  "Quale prodotto ha il margine più alto?",
  "Come possiamo ridurre i costi logistica Tailor Made?",
  "Qual è l'impatto del remanufacturing sui costi?"
];
