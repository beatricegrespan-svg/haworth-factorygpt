import { useState } from 'react';
import { ClipboardList, Play, Pause, CheckCircle, Clock, AlertTriangle, User, Package, RefreshCw, Cog } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ModuleAIButtons } from '@/components/ai/ModuleAIButtons';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductionOrder {
  id: string; orderNumber: string; product: string; quantity: number; completed: number;
  status: 'ongoing' | 'blocked' | 'done' | 'todo'; line: string; operator: string;
  phase: string; workstation: string; workstationStatus: 'running' | 'stopped' | 'idle';
  startTime: string; estimatedEnd: string; blockReason?: string;
}

const mockOrders: ProductionOrder[] = [
  { id: '1', orderNumber: 'ORD-2024-0156', product: 'Componente A-500', quantity: 1000, completed: 756, status: 'ongoing', line: 'Linea 1', operator: 'Marco Rossi', phase: 'Assemblaggio', workstation: 'WS-01', workstationStatus: 'running', startTime: '06:00', estimatedEnd: '14:30' },
  { id: '2', orderNumber: 'ORD-2024-0157', product: 'Assemblato B-200', quantity: 500, completed: 500, status: 'done', line: 'Linea 2', operator: 'Laura Bianchi', phase: 'Collaudo', workstation: 'WS-04', workstationStatus: 'idle', startTime: '05:30', estimatedEnd: '12:00' },
  { id: '3', orderNumber: 'ORD-2024-0158', product: 'Modulo C-150', quantity: 750, completed: 234, status: 'blocked', line: 'Linea 2', operator: 'Giuseppe Verdi', phase: 'Lavorazione CNC', workstation: 'WS-03', workstationStatus: 'stopped', startTime: '08:00', estimatedEnd: '16:00', blockReason: 'Sensore prossimità in errore' },
  { id: '4', orderNumber: 'ORD-2024-0159', product: 'Componente D-300', quantity: 1200, completed: 0, status: 'todo', line: 'Linea 3', operator: 'Anna Neri', phase: 'Preparazione', workstation: 'WS-05', workstationStatus: 'idle', startTime: '14:00', estimatedEnd: '22:00' },
  { id: '5', orderNumber: 'ORD-2024-0160', product: 'Componente E-100', quantity: 800, completed: 412, status: 'ongoing', line: 'Linea 3', operator: 'Luca Ferrara', phase: 'Saldatura', workstation: 'WS-06', workstationStatus: 'running', startTime: '07:00', estimatedEnd: '15:00' },
  { id: '6', orderNumber: 'ORD-2024-0161', product: 'Assemblato F-400', quantity: 300, completed: 300, status: 'done', line: 'Linea 1', operator: 'Sara Colombo', phase: 'Imballaggio', workstation: 'WS-02', workstationStatus: 'idle', startTime: '04:00', estimatedEnd: '10:00' },
];

const wsStatusConfig = {
  running: { label: 'Running', color: 'text-success' },
  stopped: { label: 'Stopped', color: 'text-destructive' },
  idle: { label: 'Idle', color: 'text-muted-foreground' },
};

const PianoProduzionePage = () => {
  const [orders] = useState<ProductionOrder[]>(mockOrders);
  const { t } = useLanguage();

  const statusConfig = {
    todo: { label: t('toDo'), color: 'bg-muted text-muted-foreground', icon: Clock, columnColor: 'border-muted-foreground/30' },
    ongoing: { label: t('ongoing'), color: 'bg-primary text-primary-foreground', icon: Play, columnColor: 'border-primary' },
    blocked: { label: t('blocked'), color: 'bg-destructive text-destructive-foreground', icon: AlertTriangle, columnColor: 'border-destructive' },
    done: { label: t('doneToday'), color: 'bg-success text-success-foreground', icon: CheckCircle, columnColor: 'border-success' },
  };

  const columns: { status: ProductionOrder['status']; orders: ProductionOrder[] }[] = [
    { status: 'todo', orders: orders.filter(o => o.status === 'todo') },
    { status: 'ongoing', orders: orders.filter(o => o.status === 'ongoing') },
    { status: 'blocked', orders: orders.filter(o => o.status === 'blocked') },
    { status: 'done', orders: orders.filter(o => o.status === 'done') },
  ];

  const stoppedWorkstations = orders.filter(o => o.workstationStatus === 'stopped');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3"><ClipboardList className="w-7 h-7 text-primary" />{t('pianoProduzione')}</h1>
          <p className="text-muted-foreground mt-1">{t('pianoProduzioneDesc')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2"><RefreshCw className="w-4 h-4" />{t('refresh')}</Button>
        </div>
      </div>
      <ModuleAIButtons moduleName="Piano Produzione" />

      <div className="grid grid-cols-4 gap-4">
        {columns.map(({ status, orders: colOrders }) => {
          const config = statusConfig[status];
          const StatusIcon = config.icon;
          return (
            <Card key={status}><CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", status === 'todo' && 'bg-muted', status === 'ongoing' && 'bg-primary/10', status === 'blocked' && 'bg-destructive/10', status === 'done' && 'bg-success/10')}>
                  <StatusIcon className={cn("w-5 h-5", status === 'todo' && 'text-muted-foreground', status === 'ongoing' && 'text-primary', status === 'blocked' && 'text-destructive', status === 'done' && 'text-success')} />
                </div>
                <div><p className="text-2xl font-bold">{colOrders.length}</p><p className="text-sm text-muted-foreground">{config.label}</p></div>
              </div>
            </CardContent></Card>
          );
        })}
      </div>

      {stoppedWorkstations.length > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
          <div><p className="font-medium text-sm">{t('stoppedWorkstations')}: {stoppedWorkstations.length}</p><p className="text-sm text-muted-foreground">{stoppedWorkstations.map(o => `${o.workstation} (${o.line})`).join(', ')}</p></div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {columns.map(({ status, orders: colOrders }) => {
          const config = statusConfig[status];
          const StatusIcon = config.icon;
          return (
            <div key={status} className="space-y-3">
              <div className={cn("flex items-center gap-2 pb-2 border-b-2", config.columnColor)}>
                <StatusIcon className="w-4 h-4" /><span className="font-semibold text-sm">{config.label}</span>
                <Badge variant="secondary" className="ml-auto text-xs">{colOrders.length}</Badge>
              </div>
              <div className="space-y-3">
                {colOrders.map((order) => {
                  const progress = (order.completed / order.quantity) * 100;
                  const wsStatus = wsStatusConfig[order.workstationStatus];
                  return (
                    <Card key={order.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between"><span className="text-xs font-mono text-muted-foreground">{order.orderNumber}</span><Badge className={config.color} variant="secondary">{config.label}</Badge></div>
                        <p className="font-medium text-sm">{order.product}</p>
                        <div><div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{t('progress')}</span><span className="font-medium">{order.completed}/{order.quantity}</span></div><Progress value={progress} className="h-1.5" /></div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Cog className="w-3.5 h-3.5" /><span>{order.phase}</span></div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><User className="w-3.5 h-3.5" /><span>{order.operator}</span></div>
                        <div className="flex items-center justify-between text-xs"><div className="flex items-center gap-1.5 text-muted-foreground"><Package className="w-3.5 h-3.5" /><span>{order.workstation} — {order.line}</span></div><span className={cn("font-medium", wsStatus.color)}>{wsStatus.label}</span></div>
                        {order.blockReason && <div className="flex items-start gap-1.5 text-xs p-2 rounded bg-destructive/10 text-destructive"><AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" /><span>{order.blockReason}</span></div>}
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="w-3.5 h-3.5" /><span>{order.startTime} — {order.estimatedEnd}</span></div>
                      </CardContent>
                    </Card>
                  );
                })}
                {colOrders.length === 0 && <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-lg">{t('noOrders')}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PianoProduzionePage;
