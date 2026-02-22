import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModuleAIButtons } from '@/components/ai/ModuleAIButtons';
import { TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

const channelKPIs = [
  { label: 'Revenue Contract', value: 142000, unit: '€', target: 130000, trend: '+3.2%', status: 'good' },
  { label: 'Revenue Retail', value: 67500, unit: '€', target: 65000, trend: '+1.8%', status: 'good' },
  { label: 'Revenue Tailor Made', value: 37200, unit: '€', target: 35000, trend: '+7.4%', status: 'good' },
  { label: 'Margine Lordo Medio', value: 42.6, unit: '%', target: 40, trend: '+1.1%', status: 'good' },
];

const revenueMix = [
  { name: 'Contract', value: 142000, percentage: 58, fill: 'hsl(210, 100%, 50%)' },
  { name: 'Retail', value: 67500, percentage: 27, fill: 'hsl(175, 60%, 45%)' },
  { name: 'Tailor Made', value: 37200, percentage: 15, fill: 'hsl(270, 60%, 55%)' },
];

const marginByChannel = [
  { channel: 'Contract', margin: 38.4, target: 36 },
  { channel: 'Retail', margin: 42.1, target: 40 },
  { channel: 'Tailor Made', margin: 51.2, target: 48 },
];

const tailorMadeTrend = [
  { month: 'Ago', revenue: 24100 },
  { month: 'Set', revenue: 26800 },
  { month: 'Ott', revenue: 29400 },
  { month: 'Nov', revenue: 31700 },
  { month: 'Dic', revenue: 34600 },
  { month: 'Gen', revenue: 37200 },
];

const crossSellAccounts = [
  { cliente: 'Studio Architettura Boffi', settore: 'Hospitality', revenueContract: '€48,200', ltvScore: 'Alto', propensione: '★★★★★' },
  { cliente: 'Generali Real Estate', settore: 'Uffici', revenueContract: '€92,500', ltvScore: 'Alto', propensione: '★★★★☆' },
  { cliente: 'Marriott Milano', settore: 'Hospitality', revenueContract: '€67,300', ltvScore: 'Medio-Alto', propensione: '★★★★☆' },
  { cliente: 'Politecnico di Milano', settore: 'Education', revenueContract: '€38,100', ltvScore: 'Medio', propensione: '★★★☆☆' },
  { cliente: 'WeWork Italia', settore: 'Coworking', revenueContract: '€55,800', ltvScore: 'Alto', propensione: '★★★★☆' },
];

const ChannelsPage = () => {
  const { t } = useLanguage();
  const formatCurrency = (value: number) => `€${(value / 1000).toFixed(1)}k`;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="module-header mb-1">{t('canaliSinergieAI')}</h1>
        <p className="text-muted-foreground text-sm">Performance e sinergie tra canali Contract, Retail e Tailor Made</p>
      </div>
      <ModuleAIButtons moduleName="Canali" />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {channelKPIs.map((kpi) => (
          <Card key={kpi.label} className="kpi-card">
            <span className="kpi-label">{kpi.label}</span>
            <div className="kpi-value mt-1">{kpi.unit === '€' ? `€${kpi.value.toLocaleString()}` : `${kpi.value}%`}</div>
            <p className="text-xs text-muted-foreground">Target: {kpi.unit === '€' ? `€${kpi.target.toLocaleString()}` : `${kpi.target}%`}</p>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-500">{kpi.trend}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Revenue Mix per Canale</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenueMix} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" nameKey="name">
                      {revenueMix.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `€${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {revenueMix.map((ch) => (
                  <div key={ch.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ch.fill }} />
                      <span>{ch.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">{ch.percentage}%</span>
                      <span className="font-medium">€{ch.value.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Margine Lordo per Canale vs Target</CardTitle></CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marginByChannel}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="channel" />
                  <YAxis domain={[0, 60]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Bar dataKey="margin" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Revenue Tailor Made Trend (6 mesi)</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tailorMadeTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value: number) => `€${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(270, 60%, 55%)" strokeWidth={2} dot={{ fill: 'hsl(270, 60%, 55%)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Top Account Contract — Potenziale Cross-Sell TM</CardTitle></CardHeader>
        <CardContent>
          <table className="data-table">
            <thead>
              <tr><th>Cliente</th><th>Settore</th><th>Revenue Contract (anno)</th><th>LTV Score</th><th>Propensione TM</th></tr>
            </thead>
            <tbody>
              {crossSellAccounts.map((account, i) => (
                <tr key={i}>
                  <td className="font-medium">{account.cliente}</td>
                  <td><Badge variant="outline">{account.settore}</Badge></td>
                  <td>{account.revenueContract}</td>
                  <td><Badge className={account.ltvScore === 'Alto' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}>{account.ltvScore}</Badge></td>
                  <td className="text-lg">{account.propensione}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelsPage;
