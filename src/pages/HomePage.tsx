import { KPICard } from '@/components/dashboard/KPICard';
import { AIInsightsWidget } from '@/components/dashboard/AIInsightsWidget';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import { SuggestedActionsWidget } from '@/components/dashboard/SuggestedActionsWidget';
import { kpiData, aiInsights, calendarEvents, suggestedActions } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="module-header">{t('commandCenter')}</h1>
        <p className="text-muted-foreground -mt-4">
          {t('commandCenterDesc')}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <AIInsightsWidget insights={aiInsights} />
          <SuggestedActionsWidget actions={suggestedActions} />
        </div>
        <div>
          <CalendarWidget events={calendarEvents} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
