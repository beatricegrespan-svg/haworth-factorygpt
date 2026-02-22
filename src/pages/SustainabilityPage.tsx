import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleAIButtons } from '@/components/ai/ModuleAIButtons';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, Cell, ReferenceLine, PieChart, Pie } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { AskFactoryGPTButton } from '@/components/ai/AskFactoryGPTButton';

const sustainabilityKPIs = [
  { label: 'CO2e Totale (mese)', value: 142.3, unit: 'ton CO2e', trend: 'down' as const, trendValue: -8.3, status: 'warning' },
  { label: 'CO2e per Unità prodotta', value: 14.8, unit: 'kg CO2e', trend: 'down' as const, trendValue: -1.2, status: 'warning' },
  { label: 'Energia Rinnovabile', value: 61, unit: '%', trend: 'up' as const, trendValue: 5, status: 'warning' },
  { label: 'CO2e Evitata (take-back)', value: 2.8, unit: 'ton CO2e', trend: 'up' as const, trendValue: 0.4, status: 'good' },
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
  { name: 'Scope 2 (Energia)', value: 31.3, percentage: 22, fill: 'hsl(160, 60%, 45%)' },
  { name: 'Scope 3 (Supply Chain)', value: 85.4, percentage: 60, fill: 'hsl(30, 90%, 55%)' },
];

const SustainabilityPage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="module-header mb-1">{t('sostenibilitaAI')}</h1>
        <p className="text-muted-foreground text-sm">Carbon footprint, consumo energetico e progressione verso gli obiettivi di decarbonizzazione</p>
      </div>
      <ModuleAIButtons moduleName="Sostenibilità" />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {sustainabilityKPIs.map((kpi) => (
          <Card key={kpi.label} className="kpi-card">
            <span className="kpi-label">{kpi.label}</span>
            <div className="kpi-value mt-1">{kpi.value} {kpi.unit}</div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              {kpi.trend === 'down' ? <TrendingDown className="w-4 h-4 text-emerald-500" /> : <TrendingUp className="w-4 h-4 text-emerald-500" />}
              <span className="text-emerald-500">{kpi.trendValue > 0 ? '+' : ''}{kpi.trendValue}{kpi.unit === '%' ? 'pp' : '%'}</span>
            </div>
          </Card>
        ))}
      </div>

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
                <ReferenceLine y={80} stroke="hsl(var(--primary))" strokeDasharray="5 5" label="Target 2025: 80%" />
                <Line type="monotone" dataKey="value" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ fill: 'hsl(38, 92%, 50%)' }} />
              </LineChart>
            </ResponsiveContainer>
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
                  <ReferenceLine y={12} stroke="hsl(var(--primary))" strokeDasharray="5 5" label="Target" />
                  <Bar dataKey="co2e" radius={[4, 4, 0, 0]}>
                    {emissionsByChannel.map((entry, index) => (
                      <Cell key={index} fill={entry.co2e > 15 ? 'hsl(38, 92%, 50%)' : 'hsl(var(--primary))'} />
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

      {/* AI Insight */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h4 className="font-semibold">AI Insight — Sostenibilità</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Il 60% delle emissioni è Scope 3 (supply chain). Il fornitore di tessuti non certificati in Tailor Made contribuisce da solo al 14% delle emissioni totali. 
            Sostituirlo ridurrebbe le emissioni di 19.9 ton CO2e/anno, portando il progresso verso il target al -22% (superando l'obiettivo 2025).
          </p>
          <div className="mt-4">
            <AskFactoryGPTButton question="Qual è il carbon footprint medio per prodotto Contract vs Tailor Made?" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SustainabilityPage;