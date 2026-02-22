import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModuleAIButtons } from '@/components/ai/ModuleAIButtons';
import { TrendingUp, TrendingDown, Sparkles, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LineChart, Line, ReferenceLine, Cell } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { AskFactoryGPTButton } from '@/components/ai/AskFactoryGPTButton';

const circularityKPIs = [
  { label: 'Materiali Riciclati/Riciclabili', value: 67.3, unit: '%', trend: 'up' as const, trendValue: 2.1, status: 'warning' },
  { label: 'Tasso Remanufacturing', value: 72, unit: '%', trend: 'up' as const, trendValue: 3.5, status: 'good' },
  { label: 'Prodotti Take-Back (mese)', value: 47, unit: 'unità', trend: 'up' as const, trendValue: 12, status: 'good' },
  { label: 'Waste-to-Landfill', value: 4.2, unit: '%', trend: 'down' as const, trendValue: -0.8, status: 'good' },
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
  { prodotto: 'Seduta Haworth Fern', canale: 'Contract', data: '15 Gen 2025', stato: 'Remanufactured ✓', valore: '€320' },
  { prodotto: 'Scrivania Workwall', canale: 'Contract', data: '14 Gen 2025', stato: 'Ricambi', valore: '€85' },
  { prodotto: 'Poltrona Lounge', canale: 'Retail', data: '13 Gen 2025', stato: 'Remanufactured ✓', valore: '€410' },
  { prodotto: 'Seduta Very', canale: 'Contract', data: '12 Gen 2025', stato: 'Riciclo Certificato', valore: '€45' },
  { prodotto: 'Pannelli Divisori (x4)', canale: 'Contract', data: '11 Gen 2025', stato: 'Remanufactured ✓', valore: '€280' },
];

const getBarColor = (percentage: number) => {
  if (percentage >= 75) return 'hsl(var(--primary))';
  if (percentage >= 60) return 'hsl(38, 92%, 50%)';
  return 'hsl(0, 72%, 51%)';
};

const CircularityPage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="module-header mb-1">{t('circolaritaAI')}</h1>
        <p className="text-muted-foreground text-sm">Monitora materiali riciclati, programmi take-back e metriche di economia circolare</p>
      </div>
      <ModuleAIButtons moduleName="Circolarità" />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {circularityKPIs.map((kpi) => (
          <Card key={kpi.label} className="kpi-card">
            <span className="kpi-label">{kpi.label}</span>
            <div className="kpi-value mt-1">{kpi.value}{kpi.unit === '%' ? '%' : ` ${kpi.unit}`}</div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <TrendingDown className="w-4 h-4 text-emerald-500" />}
              <span className="text-emerald-500">{kpi.trendValue > 0 ? '+' : ''}{kpi.trendValue}{kpi.unit === '%' ? 'pp' : '%'}</span>
            </div>
          </Card>
        ))}
      </div>

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
                  <Line type="monotone" dataKey="units" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Take-Back Flow Table */}
      <Card>
        <CardHeader><CardTitle className="text-lg">{t('flussoTakeBack')}</CardTitle></CardHeader>
        <CardContent>
          <table className="data-table">
            <thead>
              <tr><th>Prodotto</th><th>Canale</th><th>Data Rientro</th><th>Stato</th><th>Valore Recuperato</th></tr>
            </thead>
            <tbody>
              {takeBackFlow.map((item, i) => (
                <tr key={i}>
                  <td className="font-medium">{item.prodotto}</td>
                  <td><Badge variant="outline">{item.canale}</Badge></td>
                  <td className="text-sm">{item.data}</td>
                  <td><Badge className={item.stato.includes('✓') ? 'bg-emerald-500/10 text-emerald-600' : item.stato === 'Riciclo Certificato' ? 'bg-blue-500/10 text-blue-600' : 'bg-amber-500/10 text-amber-600'}>{item.stato}</Badge></td>
                  <td className="font-medium">{item.valore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* AI Insight */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h4 className="font-semibold">AI Insight — Circolarità</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Il catalogo materiali Tailor Made è il principale ostacolo al raggiungimento del target 75% di circolarità. 
            Aggiornando i fornitori tessuti con alternative Oeko-Tex certificate, si stima un incremento al 73.1% entro Q2 2025, 
            con una riduzione di 18 ton CO2e/anno.
          </p>
          <div className="mt-4">
            <AskFactoryGPTButton question="Qual è la percentuale di materiali riciclati nella collezione corrente?" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CircularityPage;