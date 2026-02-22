import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, Minus, DollarSign, AlertTriangle, Package, ArrowRight, Sparkles } from 'lucide-react';
import { ModuleAIButtons } from '@/components/ai/ModuleAIButtons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { costKPIs, costBreakdown, costDrivers, skuCosts, costsQuestions } from '@/data/costsData';
import { SKUCost } from '@/types/factory';
import { useLanguage } from '@/contexts/LanguageContext';

const CostsPage = () => {
  const [selectedSKU, setSelectedSKU] = useState<SKUCost | null>(null);
  const { t } = useLanguage();

  const formatCurrency = (value: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable', isNegativeTrendGood?: boolean) => {
    if (trend === 'stable') return <Minus className="w-4 h-4 text-muted-foreground" />;
    if (trend === 'up') return isNegativeTrendGood ? <TrendingUp className="w-4 h-4 text-destructive" /> : <TrendingUp className="w-4 h-4 text-success" />;
    return isNegativeTrendGood ? <TrendingDown className="w-4 h-4 text-success" /> : <TrendingDown className="w-4 h-4 text-destructive" />;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'scrap': return <AlertTriangle className="w-4 h-4" />;
      case 'labor': return <DollarSign className="w-4 h-4" />;
      case 'energy': return <TrendingUp className="w-4 h-4" />;
      case 'materials': return <Package className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const skuBreakdownData = selectedSKU ? [
    { name: 'Materials', value: selectedSKU.materialsPerUnit, color: 'hsl(30, 8%, 40%)' },
    { name: 'Labor', value: selectedSKU.laborPerUnit, color: 'hsl(210, 100%, 50%)' },
    { name: 'Energy', value: selectedSKU.energyPerUnit, color: 'hsl(38, 92%, 50%)' },
    { name: 'Overhead', value: selectedSKU.overheadPerUnit, color: 'hsl(280, 65%, 60%)' },
    { name: 'Scrap', value: selectedSKU.scrapPerUnit, color: 'hsl(0, 72%, 51%)' }
  ] : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="module-header mb-0">{t('costsOverview')}</h1>
      <ModuleAIButtons moduleName="Costi" />

      {/* Cost KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {costKPIs.map((kpi) => (
          <Card key={kpi.id} className="kpi-card">
            <div className="flex items-center justify-between mb-2">
              <span className="kpi-label">{kpi.label}</span>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="kpi-value">{kpi.unit === '€' || kpi.unit === '€/unit' ? `€${kpi.value.toLocaleString('de-DE')}` : `${kpi.value}${kpi.unit}`}</div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              {getTrendIcon(kpi.trend, kpi.isNegativeTrendGood)}
              <span className={kpi.trend === 'stable' ? 'text-muted-foreground' : (kpi.trend === 'up' && kpi.isNegativeTrendGood) || (kpi.trend === 'down' && !kpi.isNegativeTrendGood) ? 'text-destructive' : 'text-success'}>
                {kpi.trendValue > 0 ? '+' : ''}{kpi.trendValue}{kpi.label.includes('%') ? 'pp' : '%'}
              </span>
              <span className="text-muted-foreground">{t('vsLastPeriod')}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">{t('costBreakdown')}</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={costBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="amount" nameKey="category">{costBreakdown.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie><Tooltip formatter={(value: number) => formatCurrency(value)} /></PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {costBreakdown.map((item) => (
                  <div key={item.category} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} /><span>{item.category}</span></div>
                    <div className="flex items-center gap-3"><span className="text-muted-foreground">{item.percentage}%</span><span className="font-medium w-20 text-right">{formatCurrency(item.amount)}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">{t('topCostDrivers')}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {costDrivers.map((driver) => (
                <div key={driver.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className={`p-2 rounded-lg ${driver.impactType === 'negative' ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'}`}>{getCategoryIcon(driver.category)}</div>
                  <div className="flex-1"><p className="text-sm font-medium">{driver.description}</p><p className="text-xs text-muted-foreground capitalize">{driver.category}</p></div>
                  <span className={`font-semibold ${driver.impactType === 'negative' ? 'text-destructive' : 'text-success'}`}>{driver.impactType === 'negative' ? '+' : '-'}€{driver.impact}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SKU Cost Table */}
      <Card>
        <CardHeader><CardTitle className="text-lg">{t('unitCostBySKU')}</CardTitle></CardHeader>
        <CardContent>
          <table className="data-table">
            <thead><tr><th>{t('sku')}</th><th>{t('productName')}</th><th className="text-right">{t('unitsProduced')}</th><th className="text-right">{t('cogsUnit')}</th><th className="text-right">{t('scrapCost')}</th><th className="text-right">{t('trend')}</th><th></th></tr></thead>
            <tbody>
              {skuCosts.map((sku) => (
                <tr key={sku.id} className="cursor-pointer" onClick={() => setSelectedSKU(sku)}>
                  <td className="font-medium">{sku.sku}</td><td>{sku.name}</td><td className="text-right">{sku.unitsProduced.toLocaleString()}</td><td className="text-right font-medium">{formatCurrency(sku.cogsPerUnit)}</td><td className="text-right">{formatCurrency(sku.scrapCostAllocation)}</td>
                  <td className="text-right"><span className={`flex items-center justify-end gap-1 ${sku.trendVsPrevious > 0 ? 'text-destructive' : 'text-success'}`}>{sku.trendVsPrevious > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}{sku.trendVsPrevious > 0 ? '+' : ''}{sku.trendVsPrevious}%</span></td>
                  <td><ArrowRight className="w-4 h-4 text-muted-foreground" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* SKU Detail Modal */}
      <Dialog open={!!selectedSKU} onOpenChange={() => setSelectedSKU(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle className="flex items-center gap-2"><Package className="w-5 h-5" />{selectedSKU?.sku} - {selectedSKU?.name}</DialogTitle></DialogHeader>
          {selectedSKU && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">{t('cogsComponents')}</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skuBreakdownData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} /><XAxis type="number" tickFormatter={(v) => `€${v}`} /><YAxis type="category" dataKey="name" width={80} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} /><Bar dataKey="value" radius={[0, 4, 4, 0]}>{skuBreakdownData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">{t('qualityImpact')}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-sm text-muted-foreground">{t('scrapRateLabel')}</span><p className="text-xl font-semibold">{selectedSKU.scrapRate}%</p></div>
                  <div><span className="text-sm text-muted-foreground">{t('scrapCostAllocation')}</span><p className="text-xl font-semibold">{formatCurrency(selectedSKU.scrapCostAllocation)}</p></div>
                </div>
              </div>
              <div className="p-4 rounded-lg border-l-4 border-primary bg-primary/5">
                <div className="flex items-center gap-2 mb-3"><Sparkles className="w-4 h-4 text-primary" /><h4 className="font-medium">{t('aiSuggestions')}</h4></div>
                <ul className="space-y-2 text-sm">
                  {selectedSKU.scrapRate > 3 && <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-warning mt-0.5" /><span>High scrap rate ({selectedSKU.scrapRate}%) adding €{selectedSKU.scrapPerUnit.toFixed(2)}/unit. Review quality process.</span></li>}
                  {selectedSKU.trendVsPrevious > 2 && <li className="flex items-start gap-2"><TrendingUp className="w-4 h-4 text-destructive mt-0.5" /><span>Unit cost increased {selectedSKU.trendVsPrevious}% vs last period. Check material pricing and labor efficiency.</span></li>}
                  <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-primary mt-0.5" /><span><Button variant="link" className="h-auto p-0 text-primary">{t('viewQualityIncidents')}</Button> for this SKU</span></li>
                  <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-primary mt-0.5" /><span><Button variant="link" className="h-auto p-0 text-primary">{t('checkMaintenanceSchedule')}</Button> for related equipment</span></li>
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CostsPage;
