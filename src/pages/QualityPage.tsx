import { useState } from 'react';
import { ModuleAIButtons } from '@/components/ai/ModuleAIButtons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2, Clock, Search, FileText, Wrench, ClipboardCheck, Sparkles, ChevronRight, Circle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, Cell, ReferenceLine } from 'recharts';
import { qualityKPIs, scrapReasons, scrapTrendData, qualityIncidents, qualityChecks, qualityQuestions } from '@/data/qualityData';
import { QualityIncident, QualityCheck } from '@/types/factory';
import { useLanguage } from '@/contexts/LanguageContext';

const QualityPage = () => {
  const [selectedIncident, setSelectedIncident] = useState<QualityIncident | null>(null);
  const [lineFilter, setLineFilter] = useState<string>('all');
  const [showAllReasons, setShowAllReasons] = useState(false);
  const { t } = useLanguage();

  const formatCurrency = (value: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable', isNegativeTrendGood?: boolean) => {
    if (trend === 'stable') return <Minus className="w-4 h-4 text-muted-foreground" />;
    if (trend === 'up') return isNegativeTrendGood ? <TrendingUp className="w-4 h-4 text-destructive" /> : <TrendingUp className="w-4 h-4 text-success" />;
    return isNegativeTrendGood ? <TrendingDown className="w-4 h-4 text-success" /> : <TrendingDown className="w-4 h-4 text-destructive" />;
  };

  const getSeverityBadge = (severity: string) => {
    const styles = { low: 'bg-muted text-muted-foreground', medium: 'bg-warning/10 text-warning', high: 'bg-orange-100 text-orange-700', critical: 'bg-destructive/10 text-destructive' };
    return <Badge className={styles[severity as keyof typeof styles]}>{severity}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const styles = { open: 'bg-destructive/10 text-destructive', investigating: 'bg-warning/10 text-warning', resolved: 'bg-success/10 text-success' };
    const icons = { open: <AlertTriangle className="w-3 h-3" />, investigating: <Search className="w-3 h-3" />, resolved: <CheckCircle2 className="w-3 h-3" /> };
    return <Badge className={`${styles[status as keyof typeof styles]} flex items-center gap-1`}>{icons[status as keyof typeof icons]}{status}</Badge>;
  };

  const getCheckStatusBadge = (status: QualityCheck['status']) => {
    const styles = { completed: 'status-good', pending: 'status-warning', overdue: 'status-critical' };
    return <span className={`status-badge ${styles[status]}`}>{status}</span>;
  };

  const filteredChecks = lineFilter === 'all' ? qualityChecks : qualityChecks.filter(c => c.line === lineFilter || c.line === 'All');
  const displayedReasons = showAllReasons ? scrapReasons : scrapReasons.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="module-header mb-0">{t('qualityControl')}</h1>
      <ModuleAIButtons moduleName="Qualità" />

      {/* Quality KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {qualityKPIs.map((kpi) => (
          <Card key={kpi.id} className="kpi-card">
            <span className="kpi-label">{kpi.label}</span>
            <div className="kpi-value mt-1">{kpi.unit === '€' ? formatCurrency(kpi.value) : `${kpi.value}${kpi.unit}`}</div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              {getTrendIcon(kpi.trend, kpi.isNegativeTrendGood)}
              <span className={kpi.trend === 'stable' ? 'text-muted-foreground' : (kpi.trend === 'up' && kpi.isNegativeTrendGood) || (kpi.trend === 'down' && !kpi.isNegativeTrendGood) ? 'text-destructive' : 'text-success'}>
                {kpi.trendValue > 0 ? '+' : ''}{kpi.trendValue}{kpi.unit === '€' ? '€' : kpi.unit === '%' ? 'pp' : ''}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">{t('scrapTrend')}</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scrapTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 4]} tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <ReferenceLine y={2.5} stroke="hsl(var(--warning))" strokeDasharray="5 5" label={t('target')} />
                  <Line type="monotone" dataKey="scrap" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ fill: 'hsl(var(--destructive))' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{t('scrapBreakdown')}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowAllReasons(!showAllReasons)}>{showAllReasons ? t('showTop5') : t('viewAll')}</Button>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displayedReasons} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="reason" width={130} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value: number, name: string) => [name === 'count' ? `${value} units` : formatCurrency(value), name === 'count' ? t('count') : t('costImpact')]} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('topCostImpact')}:</span>
                <span className="font-semibold">{formatCurrency(scrapReasons.slice(0, 5).reduce((sum, r) => sum + r.costImpact, 0))}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quality Incidents Table */}
      <Card>
        <CardHeader><CardTitle className="text-lg">{t('qualityIncidents')}</CardTitle></CardHeader>
        <CardContent>
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('id')}</th><th>{t('dateTime')}</th><th>{t('lineAsset')}</th><th>SKU</th><th>{t('defectType')}</th><th>{t('severity')}</th><th>{t('status')}</th><th>{t('owner')}</th><th></th>
              </tr>
            </thead>
            <tbody>
              {qualityIncidents.map((incident) => (
                <tr key={incident.id} className="cursor-pointer" onClick={() => setSelectedIncident(incident)}>
                  <td className="font-medium">{incident.id}</td>
                  <td className="text-sm">{incident.datetime}</td>
                  <td><div><div className="font-medium">{incident.line}</div><div className="text-xs text-muted-foreground">{incident.asset}</div></div></td>
                  <td>{incident.sku}</td><td>{incident.defectType}</td><td>{getSeverityBadge(incident.severity)}</td><td>{getStatusBadge(incident.status)}</td><td>{incident.owner}</td>
                  <td><ChevronRight className="w-4 h-4 text-muted-foreground" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Quality Checks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{t('qualityChecks')}</CardTitle>
          <Select value={lineFilter} onValueChange={setLineFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allLines')}</SelectItem>
              <SelectItem value="Linea Sedute Contract">Sedute Contract</SelectItem>
              <SelectItem value="Linea Tailor Made">Tailor Made</SelectItem>
              <SelectItem value="Linea Retail">Retail</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <table className="data-table">
            <thead><tr><th>{t('checkName')}</th><th>{t('frequency')}</th><th>{t('line')}</th><th>{t('status')}</th><th>{t('lastCompleted')}</th></tr></thead>
            <tbody>
              {filteredChecks.map((check) => (
                <tr key={check.id}>
                  <td className="font-medium">{check.name}</td><td className="capitalize">{check.frequency}</td><td>{check.line}</td><td>{getCheckStatusBadge(check.status)}</td><td className="text-sm text-muted-foreground">{check.lastCompleted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Incident Detail Sheet */}
      <Sheet open={!!selectedIncident} onOpenChange={() => setSelectedIncident(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader><SheetTitle className="flex items-center gap-2"><AlertTriangle className="w-5 h-5" />{selectedIncident?.id}</SheetTitle></SheetHeader>
          {selectedIncident && (
            <div className="space-y-6 mt-6">
              <div>
                <h4 className="font-medium mb-2">{t('summary')}</h4>
                <p className="text-sm text-muted-foreground">{selectedIncident.summary}</p>
                <div className="flex gap-2 mt-3">{getSeverityBadge(selectedIncident.severity)}{getStatusBadge(selectedIncident.status)}</div>
              </div>
              <div>
                <h4 className="font-medium mb-2">{t('evidence')}</h4>
                <ul className="space-y-1">{selectedIncident.evidence.map((e, i) => (<li key={i} className="text-sm flex items-start gap-2"><Circle className="w-2 h-2 mt-1.5 fill-current text-muted-foreground" />{e}</li>))}</ul>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-primary bg-primary/5">
                <div className="flex items-center gap-2 mb-3"><Sparkles className="w-4 h-4 text-primary" /><h4 className="font-medium">{t('aiRootCauseHypothesis')}</h4></div>
                <ol className="space-y-2">{selectedIncident.aiRootCauses.map((cause, i) => (<li key={i} className="text-sm flex items-start gap-2"><span className="font-medium text-primary">{i + 1}.</span>{cause}</li>))}</ol>
              </div>
              <div>
                <h4 className="font-medium mb-3">{t('suggestedCorrectiveActions')}</h4>
                <div className="space-y-2">
                  {selectedIncident.correctiveActions.map((action) => (
                    <Button key={action.id} variant="outline" className="w-full justify-start">
                      {action.type === 'procedure' && <FileText className="w-4 h-4 mr-2" />}
                      {action.type === 'maintenance' && <Wrench className="w-4 h-4 mr-2" />}
                      {action.type === 'checklist' && <ClipboardCheck className="w-4 h-4 mr-2" />}
                      {action.title}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">{t('incidentTimeline')}</h4>
                <div className="space-y-3">
                  {selectedIncident.timeline.map((stage, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${stage.completed ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {stage.completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${!stage.completed && 'text-muted-foreground'}`}>{stage.stage}</p>
                        {stage.date && <p className="text-xs text-muted-foreground">{stage.date}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default QualityPage;
