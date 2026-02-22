import { useState } from 'react';
import { ChevronLeft, ChevronRight, Wrench, Factory, Users, UserX } from 'lucide-react';
import { CalendarEvent } from '@/types/factory';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface CalendarWidgetProps {
  events: CalendarEvent[];
}

export const CalendarWidget = ({ events }: CalendarWidgetProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 16));
  const { t } = useLanguage();

  const DAYS = [t('sun'), t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat')];
  const MONTHS = [t('january'), t('february'), t('march'), t('april'), t('may'), t('june'), t('july'), t('august'), t('september'), t('october'), t('november'), t('december')];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'maintenance': return <Wrench className="w-2.5 h-2.5" />;
      case 'production': return <Factory className="w-2.5 h-2.5" />;
      case 'shift': return <Users className="w-2.5 h-2.5" />;
      case 'absence': return <UserX className="w-2.5 h-2.5" />;
    }
  };

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'maintenance': return 'bg-warning/20 text-warning';
      case 'production': return 'bg-primary/20 text-primary';
      case 'shift': return 'bg-info/20 text-info';
      case 'absence': return 'bg-critical/20 text-critical';
    }
  };

  const today = new Date();
  const isToday = (day: number) => today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className="bg-card rounded-lg border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="widget-title mb-0">{t('factoryEventsCalendar')}</h3>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-1 rounded hover:bg-muted transition-colors"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-sm font-medium min-w-[120px] text-center">{MONTHS[month]} {year}</span>
          <button onClick={nextMonth} className="p-1 rounded hover:bg-muted transition-colors"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map(day => (<div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">{day}</div>))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) return <div key={`empty-${index}`} className="aspect-square" />;
          const dayEvents = getEventsForDay(day);
          return (
            <div key={day} className={cn('calendar-day flex flex-col items-center justify-start pt-1', isToday(day) && 'calendar-day-today', dayEvents.length > 0 && 'calendar-day-event')}>
              <span className={cn('text-sm', isToday(day) && 'font-semibold text-primary')}>{day}</span>
              {dayEvents.length > 0 && (
                <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                  {dayEvents.slice(0, 2).map((event) => (<span key={event.id} className={cn('w-4 h-4 rounded-full flex items-center justify-center', getEventColor(event.type))} title={event.title}>{getEventIcon(event.type)}</span>))}
                  {dayEvents.length > 2 && <span className="text-xs text-muted-foreground">+{dayEvents.length - 2}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
        <div className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded-full bg-warning/20 flex items-center justify-center"><Wrench className="w-2 h-2 text-warning" /></span><span className="text-muted-foreground">{t('maintenance')}</span></div>
        <div className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center"><Factory className="w-2 h-2 text-primary" /></span><span className="text-muted-foreground">{t('production')}</span></div>
        <div className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded-full bg-info/20 flex items-center justify-center"><Users className="w-2 h-2 text-info" /></span><span className="text-muted-foreground">{t('shift')}</span></div>
        <div className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded-full bg-critical/20 flex items-center justify-center"><UserX className="w-2 h-2 text-critical" /></span><span className="text-muted-foreground">{t('absence')}</span></div>
      </div>
    </div>
  );
};
