import { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, TrendingDown, Sparkles, ChevronRight, X } from 'lucide-react';
import { productionLines, oeeChartData } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ModuleAIButtons } from '@/components/ai/ModuleAIButtons';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductionPage = () => {
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const line = productionLines.find(l => l.id === selectedLine);
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="module-header">{t('productionPerformance')}</h1>
        <p className="text-muted-foreground -mt-4">
          {t('productionPerformanceDesc')}
        </p>
      </div>
      <ModuleAIButtons moduleName="Produzione" />

      {/* OEE Trend Chart */}
      <div className="bg-card rounded-lg border p-5">
        <h3 className="widget-title">{t('oeeTrendToday')}</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={oeeChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[60, 100]} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="oee" name={t('oee')} stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
              <Line type="monotone" dataKey="availability" name={t('availability')} stroke="hsl(var(--chart-2))" strokeWidth={2} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="performance" name={t('performance')} stroke="hsl(var(--chart-3))" strokeWidth={2} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="quality" name={t('quality')} stroke="hsl(var(--chart-4))" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* OEE Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border p-5 text-center">
          <p className="text-sm text-muted-foreground mb-1">{t('availability')}</p>
          <p className="text-3xl font-bold text-chart-2">86.3%</p>
          <p className="text-xs text-muted-foreground mt-1">{t('target')}: 90%</p>
        </div>
        <div className="bg-card rounded-lg border p-5 text-center">
          <p className="text-sm text-muted-foreground mb-1">{t('performance')}</p>
          <p className="text-3xl font-bold text-chart-3">93.8%</p>
          <p className="text-xs text-muted-foreground mt-1">{t('target')}: 95%</p>
        </div>
        <div className="bg-card rounded-lg border p-5 text-center">
          <p className="text-sm text-muted-foreground mb-1">{t('quality')}</p>
          <p className="text-3xl font-bold text-chart-4">97.3%</p>
          <p className="text-xs text-muted-foreground mt-1">{t('target')}: 99%</p>
        </div>
      </div>

      {/* Production Lines Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="widget-title mb-0">{t('productionLinesOverview')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="bg-muted/50">
                <th>{t('line')}</th>
                <th>{t('oee')}</th>
                <th>{t('piecesProduced')}</th>
                <th>{t('scrapRate')}</th>
                <th>{t('topDowntimeReason')}</th>
                <th>{t('aiComment')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productionLines.map((line) => (
                <tr key={line.id} className="cursor-pointer" onClick={() => setSelectedLine(line.id)}>
                  <td className="font-medium">{line.name}</td>
                  <td>
                    <span className={cn('font-semibold',
                      line.oee >= 85 && 'text-success',
                      line.oee >= 75 && line.oee < 85 && 'text-warning',
                      line.oee < 75 && 'text-critical'
                    )}>{line.oee}%</span>
                  </td>
                  <td>{line.piecesProduced.toLocaleString()}</td>
                  <td>
                    <span className={cn(
                      line.scrapRate <= 2 && 'text-success',
                      line.scrapRate > 2 && line.scrapRate <= 3 && 'text-warning',
                      line.scrapRate > 3 && 'text-critical'
                    )}>{line.scrapRate}%</span>
                  </td>
                  <td className="text-muted-foreground">{line.topDowntimeReason}</td>
                  <td className="max-w-[200px]">
                    <div className="flex items-start gap-1.5">
                      <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground line-clamp-2">{line.aiComment}</span>
                    </div>
                  </td>
                  <td><ChevronRight className="w-4 h-4 text-muted-foreground" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drill-down Modal */}
      {selectedLine && line && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setSelectedLine(null)} />
          <div className="relative w-full max-w-2xl bg-card rounded-xl shadow-2xl p-6 animate-fade-in m-4">
            <button onClick={() => setSelectedLine(null)} className="absolute right-4 top-4 p-2 rounded-lg hover:bg-muted transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">{line.name} - {t('performanceAnalysis')}</h2>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{line.oee}%</p>
                <p className="text-xs text-muted-foreground">{t('oee')}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">{line.availability}%</p>
                <p className="text-xs text-muted-foreground">{t('availability')}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">{line.performance}%</p>
                <p className="text-xs text-muted-foreground">{t('performance')}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">{line.quality}%</p>
                <p className="text-xs text-muted-foreground">{t('quality')}</p>
              </div>
            </div>
            <div className="ai-insight-card mb-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">{t('aiRootCauseAnalysis')}</h4>
                  <p className="text-sm text-muted-foreground">{line.aiComment}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>{t('primaryIssue')}:</strong> {line.topDowntimeReason}
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">{t('suggestedCorrectiveActions')}</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <span>🔧</span> {t('openMaintenanceWO')}
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <span>📋</span> {t('viewRelatedProcedure')}
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <span>💬</span> {t('askFactoryGPTMore')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionPage;
