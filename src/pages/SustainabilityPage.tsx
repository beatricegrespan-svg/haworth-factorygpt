import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModuleAIButtons } from '@/components/ai/ModuleAIButtons';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, Cell, ReferenceLine, PieChart, Pie } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { AskFactoryGPTButton } from '@/components/ai/AskFactoryGPTButton';

// === SOSTENIBILITÀ DATA ===
const sustainabilityKPIs = [
  { label: 'Carbon Footprint (vs 2023)', value: -8.3, unit: '%', target: -20, trend: 'down' as const, trendValue: -1.2, status: 'warning' },
  { label: 'CO2e per Unità prodotta', value: 14.8, unit: 'kg CO2e', target: 12.0, trend: 'down' as const, trendValue: -1.2, status: 'warning' },
  { label: 'Energia Rinnovabile', value: 61, unit: '%', target: 80, trend: 'up' as const, trendValue: 5, status: 'warning' },
  { label: 'CO2e Evitata (take-back)', value: 2.8, unit: 'ton CO2e', target: 2.0, trend: 'up' as const, trendValue: 0.4, status: 'good' },
];

const carbonProgressionData = [
  { period: '2023 (base)', value: 100 },
  { period: 'Gen 2024', value: 97.1 },
  { period: 'Mar 2024', value: 95.8 },
  { period: 'Giu 2024', value: 94.2 },
  { period: 'Set 2024', value: 92.5 },
  { period: 'Gen 2025', value: 91.7 },
];

const emissionsByChannel = [
  { channel: 'Contract Standard', co2e: 12.4 },
  { channel: 'Retail', co2e: 14.1 },
  { channel: 'Tailor Made', co2e: 19.7 },
];

const scopeBreakdown = [
  { name: 'Scope 1 (Dirette)', value: 25.6, percentage: 18, fill: 'hsl(210, 100%, 50%)' },
  { name: 'Scope 2 (Energia)', value: 31.3, percentage: 22, fill: 'hsl(175, 60%, 45%)' },
  { name: 'Scope 3 (Supply Chain)', value: 85.4, percentage: 60, fill: 'hsl(30, 90%, 55%)' },
];

// === CIRCOLARITÀ DATA ===
const circularityKPIs = [
  { label: 'Materiali Riciclati/Riciclabili', value: 67.3, unit: '%', target: 75, trend: 'up' as const, trendValue: 2.1, status: 'warning' },
  { label: 'Tasso Remanufacturing', value: 72, unit: '%', target: 70, trend: 'up' as const, trendValue: 3.5, status: 'good' },
  { label: 'Prodotti Take-Back (mese)', value: 47, unit: 'unità', target: 40, trend: 'up' as const, trendValue: 12, status: 'good' },
  { label: 'Waste-to-Landfill', value: 4.2, unit: '%', target: 3.0, trend: 'down' as const, trendValue: -0.8, status: 'warning' },
];

const materialsByCategory = [
  { category: 'Sedute Contract', percentage: 74.2 },
  { category: 'Tavoli & Superfici', percentage: 71.8 },
  { category: 'Retail Standard', percentage: 69.5 },
  { category: 'Tailor Made', percentage: 58.4 },
  { category: 'Accessori & Soft', percentage: 48.1 },
];

const takeBackTrend = [
  { month: 'Ago', units: 28 },
  { month: 'Set', units: 31 },
  { month: 'Ott', units: 35 },
  { month: 'Nov', units: 39 },
  { month: 'Dic', units: 42 },
  { month: 'Gen', units: 47 },
];

const takeBackFlow = [
  { prodotto: 'Seduta Haworth Fern', canale: 'Contract', data: '15 Gen 2025', esito: 'Remanufactured ✓', valore: '€320' },
  { prodotto: 'Scrivania Workwall', canale: 'Contract', data: '14 Gen 2025', esito: 'Ricambi', valore: '€85' },
  { prodotto: 'Poltrona Lounge', canale: 'Retail', data: '13 Gen 2025', esito: 'Remanufactured ✓', valore: '€410' },
  { prodotto: 'Seduta Very', canale: 'Contract', data: '12 Gen 2025', esito: 'Riciclo Certificato', valore: '€45' },
  { prodotto: 'Pannelli Divisori (x4)', canale: 'Contract', data: '11 Gen 2025', esito: 'Remanufactured ✓', valore: '€280' },
];

const getBarColor = (percentage: number) => {
  if (percentage >= 75) return 'hsl(142, 71%, 45%)';
  return 'hsl(38, 92%, 50%)';
};

const SustainabilityPage = () => {
  const { t } = useLanguage();

  const renderKPICards = (kpis: typeof sustainabilityKPIs) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="kpi-card">
          <span className="kpi-label">{kpi.label}</span>
          <div className="kpi-value mt-1">{kpi.value}{kpi.unit === '%' ? '%' : ` ${kpi.unit}`}</div>
          <p className="text-xs text-muted-foreground">Target: {kpi.target}{kpi.unit === '%' ? '%' : ` ${kpi.unit}`}</p>
          <div className="flex items-center gap-1 mt-1 text-sm">
            {kpi.trend === 'down' ? <TrendingDown className="w-4 h-4 text-emerald-500" /> : <TrendingUp className="w-4 h-4 text-emerald-500" />}
            <span className="text-emerald-500">{kpi.trendValue > 0 ? '+' : ''}{kpi.trendValue}{kpi.unit === '%' ? 'pp' : '%'}</span>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="module-header mb-1">{t('sostenibilitaCircolaritaAI')}</h1>
        <p className="text-muted-foreground text-sm">Carbon footprint, decarbonizzazione e metriche di economia circolare</p>
      </div>
      <ModuleAIButtons moduleName="Sostenibilità" />

      <Tabs defaultValue="sostenibilita" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="sostenibilita">{t('sostenibilitaTab')}</TabsTrigger>
          <TabsTrigger value="circolarita">{t('circolaritaTab')}</TabsTrigger>
        </TabsList>

        {/* TAB 1 — Sostenibilità */}
        <TabsContent value="sostenibilita" className="space-y-6 mt-6">
          {renderKPICards(sustainabilityKPIs)}

          {/* Carbon Footprint Progression */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Progressione Carbon Footprint vs Target</CardTitle></CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={carbonProgressionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                    <YAxis domain={[70, 105]} tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <ReferenceLine y={80} stroke="hsl(0, 72%, 51%)" strokeDasharray="5 5" label="Target 2025: -20% (80%)" />
                    <Line type="monotone" dataKey="value" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ fill: 'hsl(38, 92%, 50%)' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>📍 Attuale: -8.3%</span>
                <span>🎯 Target: -20%</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Emissions by Channel */}
            <Card>
              <CardHeader><CardTitle className="text-lg">Emissioni per Canale (kg CO2e/unità)</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emissionsByChannel}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="channel" tick={{ fontSize: 11 }} />
                      <YAxis tickFormatter={(v) => `${v} kg`} />
                      <Tooltip formatter={(value: number) => `${value} kg CO2e`} />
                      <ReferenceLine y={12} stroke="hsl(var(--primary))" strokeDasharray="5 5" label="Target 12.0" />
                      <Bar dataKey="co2e" radius={[4, 4, 0, 0]}>
                        {emissionsByChannel.map((entry, index) => (
                          <Cell key={index} fill={entry.co2e <= 12 ? 'hsl(142, 71%, 45%)' : entry.co2e > 15 ? 'hsl(38, 92%, 50%)' : 'hsl(38, 92%, 50%)'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Scope Breakdown */}
            <Card>
              <CardHeader><CardTitle className="text-lg">Breakdown Emissioni Scope</CardTitle></CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  <div className="w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={scopeBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" nameKey="name">
                          {scopeBreakdown.map((entry, index) => (
                            <Cell key={index} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value} ton CO2e`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-3">
                    {scopeBreakdown.map((scope) => (
                      <div key={scope.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scope.fill }} />
                          <span>{scope.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground">{scope.percentage}%</span>
                          <span className="font-medium">{scope.value} ton</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insight — Sostenibilità */}
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">AI Insight — Sostenibilità</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Il 60% delle emissioni è Scope 3 (supply chain). Il fornitore tessuti non certificato Tailor Made contribuisce da solo al 14% delle emissioni totali. 
                Sostituirlo ridurrebbe le emissioni di 19.9 ton CO2e/anno, portando il progresso al -22% vs 2023 — superando il target annuale.
              </p>
              <div className="mt-4">
                <AskFactoryGPTButton question="Qual è il carbon footprint medio per prodotto Contract vs Tailor Made? Dove possiamo ridurre le emissioni?" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2 — Circolarità */}
        <TabsContent value="circolarita" className="space-y-6 mt-6">
          {renderKPICards(circularityKPIs)}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Materials by Category */}
            <Card>
              <CardHeader><CardTitle className="text-lg">% Materiali Riciclati per Categoria</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={materialsByCategory} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                      <YAxis type="category" dataKey="category" width={130} tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(value: number) => `${value}%`} />
                      <ReferenceLine x={75} stroke="hsl(var(--primary))" strokeDasharray="5 5" label="Target 75%" />
                      <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                        {materialsByCategory.map((entry, index) => (
                          <Cell key={index} fill={getBarColor(entry.percentage)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Take-Back Trend */}
            <Card>
              <CardHeader><CardTitle className="text-lg">Take-Back Trend (ultimi 6 mesi)</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={takeBackTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => `${value} unità`} />
                      <ReferenceLine y={40} stroke="hsl(142, 71%, 45%)" strokeDasharray="5 5" label="Target 40" />
                      <Line type="monotone" dataKey="units" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={{ fill: 'hsl(142, 71%, 45%)' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Take-Back Flow Table */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Flusso Prodotti Take-Back</CardTitle></CardHeader>
            <CardContent>
              <table className="data-table">
                <thead>
                  <tr><th>Prodotto</th><th>Canale</th><th>Data Rientro</th><th>Esito</th><th>Valore Recuperato</th></tr>
                </thead>
                <tbody>
                  {takeBackFlow.map((item, i) => (
                    <tr key={i}>
                      <td className="font-medium">{item.prodotto}</td>
                      <td><Badge variant="outline">{item.canale}</Badge></td>
                      <td className="text-sm">{item.data}</td>
                      <td><Badge className={item.esito.includes('✓') ? 'bg-emerald-500/10 text-emerald-600' : item.esito === 'Riciclo Certificato' ? 'bg-blue-500/10 text-blue-600' : 'bg-amber-500/10 text-amber-600'}>{item.esito}</Badge></td>
                      <td className="font-medium">{item.valore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* AI Insight — Circolarità */}
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">AI Insight — Circolarità</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Il catalogo materiali Tailor Made è il principale ostacolo al target 75% di circolarità (attuale: 58.4%). 
                Aggiornando i fornitori tessuti con alternative Oeko-Tex certificate, si stima un incremento al 73.1% entro Q2 2025, 
                con una riduzione aggiuntiva di 18 ton CO2e/anno. Azione raccomandata: avviare RFQ per 3 fornitori alternativi certificati entro fine mese.
              </p>
              <div className="mt-4">
                <AskFactoryGPTButton question="Quanti prodotti sono rientrati con il programma take-back questo mese? Qual è il tasso di remanufacturing?" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SustainabilityPage;
