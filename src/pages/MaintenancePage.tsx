import { useState } from 'react';
import { ChevronLeft, ChevronRight, Wrench, AlertTriangle, Clock, CheckCircle, X, Shield, Package, Sparkles } from 'lucide-react';
import { workOrders } from '@/data/mockData';
import { WorkOrder } from '@/types/factory';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ModuleAIButtons } from '@/components/ai/ModuleAIButtons';
import { useLanguage } from '@/contexts/LanguageContext';

const MaintenancePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 16));
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const { t } = useLanguage();
  
  const DAYS = [t('sun'), t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat')];
  const MONTHS = [t('january'), t('february'), t('march'), t('april'), t('may'), t('june'), 
                  t('july'), t('august'), t('september'), t('october'), t('november'), t('december')];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  
  const getWorkOrdersForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return workOrders.filter(wo => wo.scheduledDate === dateStr);
  };

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const today = new Date();
  const isToday = (day: number) => today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="module-header">{t('maintenanceTitle')}</h1>
        <p className="text-muted-foreground -mt-4">{t('maintenanceDesc')}</p>
      </div>
      <ModuleAIButtons moduleName="Manutenzione" />

      {/* Calendar */}
      <div className="bg-card rounded-lg border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="widget-title mb-0">{t('maintenanceCalendar')}</h3>
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="p-1 rounded hover:bg-muted transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-sm font-medium min-w-[120px] text-center">{MONTHS[month]} {year}</span>
            <button onClick={nextMonth} className="p-1 rounded hover:bg-muted transition-colors"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS.map(day => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (day === null) return <div key={`empty-${index}`} className="aspect-square" />;
            const dayWorkOrders = getWorkOrdersForDay(day);
            return (
              <div key={day} className={cn('calendar-day min-h-[60px] flex flex-col items-center', isToday(day) && 'calendar-day-today', dayWorkOrders.length > 0 && 'bg-warning/10')}>
                <span className={cn('text-sm', isToday(day) && 'font-semibold text-primary')}>{day}</span>
                {dayWorkOrders.length > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <Wrench className="w-3 h-3 text-warning" />
                    <span className="text-xs text-muted-foreground">{dayWorkOrders.length}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Work Orders List */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="p-5 border-b flex items-center justify-between">
          <h3 className="widget-title mb-0">{t('workOrders')}</h3>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">{t('prioritizedByAI')}</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="bg-muted/50">
                <th>{t('id')}</th>
                <th>{t('asset')}</th>
                <th>{t('type')}</th>
                <th>{t('priority')}</th>
                <th>{t('scheduled')}</th>
                <th>{t('status')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((wo) => (
                <tr key={wo.id} className="cursor-pointer" onClick={() => setSelectedWorkOrder(wo)}>
                  <td className="font-mono text-sm">{wo.id}</td>
                  <td className="font-medium">{wo.asset}</td>
                  <td><span className={cn('status-badge', wo.type === 'preventive' && 'bg-info/10 text-info', wo.type === 'corrective' && 'bg-warning/10 text-warning')}>{wo.type}</span></td>
                  <td><span className={cn('status-badge', wo.priority === 'high' && 'status-critical', wo.priority === 'medium' && 'status-warning', wo.priority === 'low' && 'bg-muted text-muted-foreground')}>{wo.priority}</span></td>
                  <td className="text-muted-foreground">{wo.scheduledDate}</td>
                  <td><span className={cn('status-badge', wo.status === 'completed' && 'status-good', wo.status === 'in-progress' && 'bg-info/10 text-info', wo.status === 'pending' && 'bg-muted text-muted-foreground')}>{wo.status}</span></td>
                  <td><Button variant="ghost" size="sm">{t('view')}</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Work Order Detail Modal */}
      {selectedWorkOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setSelectedWorkOrder(null)} />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-xl shadow-2xl p-6 animate-fade-in m-4">
            <button onClick={() => setSelectedWorkOrder(null)} className="absolute right-4 top-4 p-2 rounded-lg hover:bg-muted transition-colors"><X className="w-5 h-5" /></button>
            <div className="flex items-start gap-3 mb-6">
              <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center shrink-0',
                selectedWorkOrder.priority === 'high' && 'bg-critical/10 text-critical',
                selectedWorkOrder.priority === 'medium' && 'bg-warning/10 text-warning',
                selectedWorkOrder.priority === 'low' && 'bg-muted text-muted-foreground'
              )}><Wrench className="w-6 h-6" /></div>
              <div>
                <p className="text-sm text-muted-foreground font-mono">{selectedWorkOrder.id}</p>
                <h2 className="text-xl font-semibold">{selectedWorkOrder.asset}</h2>
                <div className="flex gap-2 mt-2">
                  <span className={cn('status-badge', selectedWorkOrder.type === 'preventive' && 'bg-info/10 text-info', selectedWorkOrder.type === 'corrective' && 'bg-warning/10 text-warning')}>{selectedWorkOrder.type}</span>
                  <span className={cn('status-badge', selectedWorkOrder.priority === 'high' && 'status-critical', selectedWorkOrder.priority === 'medium' && 'status-warning', selectedWorkOrder.priority === 'low' && 'bg-muted text-muted-foreground')}>{selectedWorkOrder.priority} {t('priority').toLowerCase()}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm"><Clock className="w-4 h-4 text-muted-foreground" /><span>{t('estTime')}: {selectedWorkOrder.estimatedTime}</span></div>
              <div className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-muted-foreground" /><span>{t('status')}: {selectedWorkOrder.status}</span></div>
            </div>
            <p className="text-muted-foreground mb-6">{selectedWorkOrder.description}</p>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3"><Shield className="w-5 h-5 text-critical" /><h4 className="font-semibold">{t('safetyNotes')}</h4></div>
              <ul className="space-y-2">{selectedWorkOrder.safetyNotes.map((note, i) => (<li key={i} className="flex items-start gap-2 text-sm"><AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" /><span>{note}</span></li>))}</ul>
            </div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3"><Package className="w-5 h-5 text-info" /><h4 className="font-semibold">{t('sparePartsRequired')}</h4></div>
              <ul className="space-y-1">{selectedWorkOrder.spareParts.map((part, i) => (<li key={i} className="text-sm text-muted-foreground">• {part}</li>))}</ul>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-3">{t('procedureSteps')}</h4>
              <ol className="space-y-2">{selectedWorkOrder.steps.map((step, i) => (<li key={i} className="flex items-start gap-3 text-sm"><span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-medium">{i + 1}</span><span className="pt-0.5">{step}</span></li>))}</ol>
            </div>
            <div className="border-t pt-4">
              <Button className="w-full gap-2"><Sparkles className="w-4 h-4" />{t('askFactoryGPTAboutTask')}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenancePage;
