import { useState } from 'react';
import { ClipboardList, Play, Pause, CheckCircle, Clock, AlertTriangle, Package, User, Calendar, BarChart3, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductionOrder {
  id: string; orderNumber: string; product: string; quantity: number; completed: number;
  status: 'in_progress' | 'stopped' | 'completed' | 'pending'; line: string; operator: string;
  startTime: string; estimatedEnd: string;
}

const mockOrders: ProductionOrder[] = [
  { id: '1', orderNumber: 'ORD-2024-0156', product: 'Componente A-500', quantity: 1000, completed: 756, status: 'in_progress', line: 'Linea 1', operator: 'Marco Rossi', startTime: '06:00', estimatedEnd: '14:30' },
  { id: '2', orderNumber: 'ORD-2024-0157', product: 'Assemblato B-200', quantity: 500, completed: 500, status: 'completed', line: 'Linea 2', operator: 'Laura Bianchi', startTime: '05:30', estimatedEnd: '12:00' },
  { id: '3', orderNumber: 'ORD-2024-0158', product: 'Modulo C-150', quantity: 750, completed: 234, status: 'stopped', line: 'Linea 2', operator: 'Giuseppe Verdi', startTime: '08:00', estimatedEnd: '16:00' },
  { id: '4', orderNumber: 'ORD-2024-0159', product: 'Componente D-300', quantity: 1200, completed: 0, status: 'pending', line: 'Linea 3', operator: 'Anna Neri', startTime: '14:00', estimatedEnd: '22:00' },
];

const MESLightPage = () => {
  const [orders] = useState<ProductionOrder[]>(mockOrders);
  const { t } = useLanguage();

  const statusConfig = {
    in_progress: { label: t('inProgress'), color: 'bg-primary text-primary-foreground', icon: Play },
    stopped: { label: t('stopped'), color: 'bg-destructive text-destructive-foreground', icon: Pause },
    completed: { label: t('completed'), color: 'bg-success text-success-foreground', icon: CheckCircle },
    pending: { label: t('pending'), color: 'bg-muted text-muted-foreground', icon: Clock },
  };

  const stats = {
    total: orders.length,
    inProgress: orders.filter(o => o.status === 'in_progress').length,
    stopped: orders.filter(o => o.status === 'stopped').length,
    completed: orders.filter(o => o.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3"><ClipboardList className="w-7 h-7 text-primary" />{t('mesTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('mesDesc')}</p>
        </div>
        <Button variant="outline" className="gap-2"><RefreshCw className="w-4 h-4" />{t('refresh')}</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Package className="w-5 h-5 text-primary" /></div><div><p className="text-2xl font-bold">{stats.total}</p><p className="text-sm text-muted-foreground">{t('totalOrders')}</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Play className="w-5 h-5 text-primary" /></div><div><p className="text-2xl font-bold">{stats.inProgress}</p><p className="text-sm text-muted-foreground">{t('inProgress')}</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-destructive" /></div><div><p className="text-2xl font-bold">{stats.stopped}</p><p className="text-sm text-muted-foreground">{t('stopped')}</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-success" /></div><div><p className="text-2xl font-bold">{stats.completed}</p><p className="text-sm text-muted-foreground">{t('completed')}</p></div></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5" />{t('productionOrders')}</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;
              const progress = (order.completed / order.quantity) * 100;
              return (
                <div key={order.id} className="p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div><div className="flex items-center gap-2 mb-1"><span className="font-semibold">{order.orderNumber}</span><Badge className={statusConfig[order.status].color}><StatusIcon className="w-3 h-3 mr-1" />{statusConfig[order.status].label}</Badge></div><p className="text-lg font-medium">{order.product}</p></div>
                    <div className="text-right"><p className="text-2xl font-bold">{order.completed} / {order.quantity}</p><p className="text-sm text-muted-foreground">{t('producedPieces')}</p></div>
                  </div>
                  <Progress value={progress} className="h-2 mb-3" />
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Package className="w-4 h-4" />{order.line}</span>
                    <span className="flex items-center gap-1"><User className="w-4 h-4" />{order.operator}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{order.startTime} - {order.estimatedEnd}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MESLightPage;
