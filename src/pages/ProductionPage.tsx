import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModuleAIButtons } from '@/components/ai/ModuleAIButtons';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, Cell, ReferenceLine } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { AskFactoryGPTButton } from '@/components/ai/AskFactoryGPTButton';

const productionKPIs = [
  { label: 'OEE Impianto', value: 78.5, unit: '%', target: 85, trend: 'down' as const, trendValue: -2.3, status: 'warning' },
  { label: 'Tasso Scarti', value: 2.8, unit: '%', target: 2.0, trend: 'down' as const, trendValue: -0.4, status: 'warning' },
  { label: 'Pezzi Prodotti (oggi)', value: 4850, unit: 'unità', target: 5200, trend: 'up' as const, trendValue: 120, status: 'warning' },
  { label: 'On-Time Delivery', value: 94.2, unit: '%', target: 95, trend: 'up' as const, trendValue: 1.1, status: 'warning' },
];

const oeeTrendData = [
  { time: '06:00', oee: 82 },
  { time: '08:00', oee: 74 },
  { time: '10:00', oee: 76 },
  { time: '12:00', oee: 80 },
  { time: '14:00', oee: 77 },
  { time: '16:00', oee: 79 },
  { time: '18:00', oee: 81 },
];

const oeeByLine = [
  { line: 'Sedute Contract', oee: 74.1 },
  { line: 'Tavoli & Superfici', oee: 81.2 },
  { line: 'Retail Standard', oee: 83.5 },
  { line: 'Tailor Made', oee: 76.8 },
];

const productionLines = [
  { linea: 'Sedute Contract', oee: 74.1, pezzi: 1820, scarti: 2.9, motivoFermo: 'Micro-fermate sensore', commentoAI: 'Ricalibrazione sensore raccomandata' },
  { linea: 'Tavoli & Superfici', oee: 81.2, pezzi: 1240, scarti: 1.8, motivoFermo: 'Attesa materiali', commentoAI: 'Ottimizzare flusso magazzino' },
  { linea: 'Retail Standard', oee: 83.5, pezzi: 1490, scarti: 1.8, motivoFermo: 'Setup changeover', commentoAI: 'Vicino al target' },
  { linea: 'Tailor Made', oee: 76.8, pezzi: 300, scarti: 3.6, motivoFermo: 'Setup personalizzazioni', commentoAI: 'Raggruppare ordini simili' },
];

const ProductionPage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="module-header mb-1">{t('produzioneAI')}</h1>
        <p className="text-muted-foreground text-sm">OEE, scarti e performance delle linee di produzione Haworth Lifestyle</p>
      </div>
      <ModuleAIButtons moduleName="Produzione" />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {productionKPIs.map((kpi) => (
          <Card key={kpi.label} className="kpi-card">
            <span className="kpi-label">{kpi.label}</span>
            <div className="kpi-value mt-1">
              {kpi.unit === 'unità' ? kpi.value.toLocaleString() : kpi.value}
              {kpi.unit === '%' ? '%' : kpi.unit === 'unità' ? '' : ` ${kpi.unit}`}
            </div>
            <p className="text-xs text-muted-foreground">Target: {kpi.target.toLocaleString()}{kpi.unit === '%' ? '%' : ` ${kpi.unit}`}</p>
            <div className="flex items-center gap-1 mt-1 text-sm">
              {kpi.trend === 'down' ? (
                <TrendingDown className={`w-4 h-4 ${kpi.label === 'Tasso Scarti' ? 'text-emerald-500' : 'text-amber-500'}`} />
              ) : (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              )}
              <span className={kpi.label === 'Tasso Scarti' && kpi.trend === 'down' ? 'text-emerald-500' : kpi.trend === 'up' ? 'text-emerald-500' : 'text-amber-500'}>
                {kpi.trendValue > 0 ? '+' : ''}{kpi.trendValue}{kpi.unit === '%' ? 'pp' : ''}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OEE Trend */}
        <Card>
          <CardHeader><CardTitle className="text-lg">OEE Trend Oggi</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={oeeTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                  <YAxis domain={[60, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <ReferenceLine y={85} stroke="hsl(var(--primary))" strokeDasharray="5 5" label="Target 85%" />
                  <Line type="monotone" dataKey="oee" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ fill: 'hsl(38, 92%, 50%)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* OEE by Line */}
        <Card>
          <CardHeader><CardTitle className="text-lg">OEE per Linea</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={oeeByLine}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="line" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <ReferenceLine y={85} stroke="hsl(var(--primary))" strokeDasharray="5 5" label="Target 85%" />
                  <Bar dataKey="oee" radius={[4, 4, 0, 0]}>
                    {oeeByLine.map((entry, index) => (
                      <Cell key={index} fill={entry.oee >= 85 ? 'hsl(142, 71%, 45%)' : 'hsl(38, 92%, 50%)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production Lines Table */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Panoramica Linee di Produzione</CardTitle></CardHeader>
        <CardContent>
          <table className="data-table">
            <thead>
              <tr><th>Linea</th><th>OEE</th><th>Pezzi Prodotti</th><th>Tasso Scarti</th><th>Motivo Principale Fermo</th><th>Commento AI</th></tr>
            </thead>
            <tbody>
              {productionLines.map((line, i) => (
                <tr key={i}>
                  <td className="font-medium">{line.linea}</td>
                  <td>
                    <Badge className={line.oee >= 85 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}>
                      {line.oee}% {line.oee < 85 ? '⚠️' : '✓'}
                    </Badge>
                  </td>
                  <td>{line.pezzi.toLocaleString()}</td>
                  <td>
                    <Badge className={line.scarti <= 2.0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}>
                      {line.scarti}% {line.scarti <= 2.0 ? '✓' : '⚠️'}
                    </Badge>
                  </td>
                  <td className="text-sm">{line.motivoFermo}</td>
                  <td className="text-sm text-muted-foreground">{line.commentoAI}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* AI Root Cause Analysis */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h4 className="font-semibold">AI Root Cause Analysis</h4>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Problema Principale:</strong> Micro-fermate Linea Sedute Contract (sensore prossimità nastro assemblaggio imbottitura — 8 falsi positivi tra 06:00 e 08:00)</p>
            <div>
              <strong className="text-foreground">Azioni Correttive Suggerite:</strong>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>Ricalibra sensore con parametri aggiornati (tempo stimato: 45 min)</li>
                <li>Raggruppa ordini Tailor Made con configurazioni simili per ridurre changeover</li>
              </ol>
            </div>
            <p><strong className="text-foreground">Impatto stimato se risolto:</strong> OEE → 82.7% | Scarti → 2.2%</p>
          </div>
          <div className="mt-4">
            <AskFactoryGPTButton question="Qual è l'OEE attuale per linea di produzione? Dove si concentrano le perdite?" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionPage;
