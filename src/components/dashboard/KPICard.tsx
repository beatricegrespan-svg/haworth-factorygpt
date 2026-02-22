import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { KPI } from '@/types/factory';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface KPICardProps {
  kpi: KPI;
}

export const KPICard = ({ kpi }: KPICardProps) => {
  const { t } = useLanguage();

  const formatValue = (value: number, unit: string) => {
    if (unit === '€') return `€${value.toLocaleString()}`;
    return `${value.toLocaleString()}${unit === '%' ? '%' : ''}`;
  };

  const formatTrend = (trend: number, unit: string) => {
    const sign = trend > 0 ? '+' : '';
    if (unit === '€') return `${sign}€${Math.abs(trend).toLocaleString()}`;
    return `${sign}${trend}${unit === '%' ? '%' : ''}`;
  };

  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between mb-2">
        <span className="kpi-label">{kpi.label}</span>
        <span className={cn('status-badge', kpi.status === 'good' && 'status-good', kpi.status === 'warning' && 'status-warning', kpi.status === 'critical' && 'status-critical')}>{kpi.status}</span>
      </div>
      <div className="kpi-value mb-2">
        {formatValue(kpi.value, kpi.unit)}
        {kpi.unit !== '%' && kpi.unit !== '€' && <span className="text-lg font-normal text-muted-foreground ml-1">{kpi.unit}</span>}
      </div>
      <div className={cn('flex items-center gap-1 text-sm font-medium',
        kpi.trend === 'up' && kpi.label !== 'Downtime Cost' && kpi.label !== 'Scrap Rate' ? 'kpi-trend-up' 
        : kpi.trend === 'down' && (kpi.label === 'Downtime Cost' || kpi.label === 'Scrap Rate') ? 'kpi-trend-up'
        : kpi.trend === 'up' && (kpi.label === 'Downtime Cost' || kpi.label === 'Scrap Rate') ? 'kpi-trend-down'
        : kpi.trend === 'down' ? 'kpi-trend-down' : 'text-muted-foreground'
      )}>
        {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : kpi.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
        <span>{formatTrend(kpi.trendValue, kpi.unit)} {t('vsYesterday')}</span>
      </div>
    </div>
  );
};
