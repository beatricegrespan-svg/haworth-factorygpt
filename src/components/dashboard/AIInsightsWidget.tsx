import { AlertCircle, AlertTriangle, Info, Sparkles } from 'lucide-react';
import { AIInsight } from '@/types/factory';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface AIInsightsWidgetProps {
  insights: AIInsight[];
}

export const AIInsightsWidget = ({ insights }: AIInsightsWidgetProps) => {
  const { t } = useLanguage();

  const getIcon = (severity: AIInsight['severity']) => {
    switch (severity) {
      case 'critical': return <AlertCircle className="w-5 h-5 text-critical" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-warning" />;
      default: return <Info className="w-5 h-5 text-info" />;
    }
  };

  return (
    <div className="bg-card rounded-lg border p-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="widget-title mb-0">{t('aiInsights')}</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.id} className={cn('ai-insight-card', insight.severity === 'critical' && 'border-critical', insight.severity === 'warning' && 'border-warning', insight.severity === 'info' && 'border-info')}>
            <div className="flex items-start gap-3">
              {getIcon(insight.severity)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1"><h4 className="font-medium text-sm">{insight.title}</h4><span className="text-xs text-muted-foreground">{insight.timestamp}</span></div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
