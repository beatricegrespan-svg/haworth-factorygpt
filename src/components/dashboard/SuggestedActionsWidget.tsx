import { Wrench, FileText, BarChart3, ChevronRight, Sparkles } from 'lucide-react';
import { SuggestedAction } from '@/types/factory';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface SuggestedActionsWidgetProps {
  actions: SuggestedAction[];
}

export const SuggestedActionsWidget = ({ actions }: SuggestedActionsWidgetProps) => {
  const { t } = useLanguage();

  const getIcon = (type: SuggestedAction['actionType']) => {
    switch (type) {
      case 'maintenance': return <Wrench className="w-5 h-5" />;
      case 'procedure': return <FileText className="w-5 h-5" />;
      case 'analysis': return <BarChart3 className="w-5 h-5" />;
    }
  };

  const getActionLabel = (type: SuggestedAction['actionType']) => {
    switch (type) {
      case 'maintenance': return t('openWorkOrder');
      case 'procedure': return t('viewProcedure');
      case 'analysis': return t('analyzeIssue');
    }
  };

  return (
    <div className="bg-card rounded-lg border p-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="widget-title mb-0">{t('aiSuggestedActions')}</h3>
      </div>
      <div className="space-y-3">
        {actions.map((action) => (
          <div key={action.id} className="action-card">
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', action.priority === 'high' && 'bg-critical/10 text-critical', action.priority === 'medium' && 'bg-warning/10 text-warning', action.priority === 'low' && 'bg-muted text-muted-foreground')}>{getIcon(action.actionType)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5"><h4 className="font-medium text-sm truncate">{action.title}</h4><span className={cn('status-badge shrink-0', action.priority === 'high' && 'status-critical', action.priority === 'medium' && 'status-warning', action.priority === 'low' && 'bg-muted text-muted-foreground')}>{action.priority}</span></div>
              <p className="text-xs text-muted-foreground line-clamp-1">{action.aiReason}</p>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0 gap-1">{getActionLabel(action.actionType)}<ChevronRight className="w-4 h-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};
