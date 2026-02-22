import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModuleAIButtons } from '@/components/ai/ModuleAIButtons';
import { TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell, ReferenceLine, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

const supplierKPIs = [
  { label: 'ESG Score Medio Panel', value: 68, unit: '/100', target: 75, status: 'warning' },
  { label: 'Fornitori Certificati', value: 71, unit: '%', target: 85, status: 'warning' },
  { label: 'Concentrazione Top 3', value: 61, unit: '%', target: 60, status: 'warning' },
  { label: 'OTD Media Fornitori', value: 92.4, unit: '%', target: 95, status: 'warning' },
];

const esgBySupplier = [
  { name: 'FM-01 Ferramenta Alpine', esg: 88 },
  { name: 'UP-03 Imbottiture Brianza', esg: 82 },
  { name: 'PK-05 Packaging Eco', esg: 79 },
  { name: 'MT-06 Metalli Brescia', esg: 74 },
  { name: 'FN-07 Finiture Veneto', esg: 71 },
  { name: 'WD-02 Legnami Veneto', esg: 61 },
  { name: 'AC-08 Accessori Como', esg: 55 },
  { name: 'TM-04 Tessutificio Nord', esg: 42 },
];

const spendDistribution = [
  { name: 'WD-02 Legnami Veneto', value: 22, fill: 'hsl(38, 92%, 50%)' },
  { name: 'TM-04 Tessutificio Nord', value: 18, fill: 'hsl(0, 72%, 51%)' },
  { name: 'FM-01 Ferramenta Alpine', value: 15, fill: 'hsl(142, 71%, 45%)' },
  { name: 'UP-03 Imbottiture Brianza', value: 12, fill: 'hsl(210, 100%, 50%)' },
  { name: 'MT-06 Metalli Brescia', value: 11, fill: 'hsl(175, 60%, 45%)' },
  { name: 'FN-07 Finiture Veneto', value: 9, fill: 'hsl(270, 60%, 55%)' },
  { name: 'PK-05 Packaging Eco', value: 7, fill: 'hsl(280, 65%, 60%)' },
  { name: 'AC-08 Accessori Como', value: 6, fill: 'hsl(30, 8%, 40%)' },
];

const radarData = [
  { dimension: 'ESG Score', 'FM-01': 88, 'UP-03': 82, 'WD-02': 61, 'TM-04': 42 },
  { dimension: 'Qualità', 'FM-01': 91, 'UP-03': 87, 'WD-02': 78, 'TM-04': 65 },
  { dimension: 'Affidabilità', 'FM-01': 95, 'UP-03': 92, 'WD-02': 85, 'TM-04': 72 },
  { dimension: 'Tracciabilità', 'FM-01': 90, 'UP-03': 85, 'WD-02': 70, 'TM-04': 48 },
  { dimension: 'Certificazioni', 'FM-01': 92, 'UP-03': 88, 'WD-02': 65, 'TM-04': 30 },
  { dimension: 'Artigianalità', 'FM-01': 85, 'UP-03': 80, 'WD-02': 75, 'TM-04': 60 },
];

interface Supplier {
  codice: string;
  nome: string;
  categoria: string;
  spesa: string;
  esg: number;
  cert: string;
  otd: number;
  tracciabilita: string;
  rischio: string;
  azioneAI: string;
  detail: {
    origine: string;
    sede: string;
    esgBreakdown: { env: number; social: number; gov: number };
    certMancanti: string[];
    tassoDifetti: string;
    leadTime: string;
    impattoStrategico: string[];
    azioneRaccomandata: string;
  };
}

const suppliers: Supplier[] = [
  { codice: 'WD-02', nome: 'Legnami Veneto', categoria: 'Legno', spesa: '22%', esg: 61, cert: 'FSC scaduto ⚠️', otd: 94, tracciabilita: 'Media', rischio: 'Alto', azioneAI: 'Rinnovo FSC urgente',
    detail: { origine: 'Italia', sede: 'Treviso (IT)', esgBreakdown: { env: 58, social: 65, gov: 60 }, certMancanti: ['FSC (in rinnovo)'], tassoDifetti: '1.8%', leadTime: '14 gg', impattoStrategico: ['Principale fornitore legno, alta concentrazione (22%)', 'FSC scaduto Gen 2025, rinnovo in corso'], azioneRaccomandata: 'Sollecitare rinnovo FSC. Diversificare con secondo fornitore legno per ridurre concentrazione.' } },
  { codice: 'TM-04', nome: 'Tessutificio Nord', categoria: 'Tessuti TM', spesa: '18%', esg: 42, cert: 'Nessuna ⚠️', otd: 88, tracciabilita: 'Bassa', rischio: 'Critico', azioneAI: 'Sostituzione Q2',
    detail: { origine: 'Italia / Turchia mix', sede: 'Prato (IT)', esgBreakdown: { env: 35, social: 48, gov: 44 }, certMancanti: ['Oeko-Tex Standard 100', 'ISO 14001', 'SA8000'], tassoDifetti: '3.6%', leadTime: '18 gg', impattoStrategico: ['Principale driver gap carbon Tailor Made (+4.2 kg CO2e/unità)', 'Circolarità TM a 58.4% vs target 75% principalmente a causa di questo fornitore', '3 fornitori Oeko-Tex certificati in shortlist'], azioneRaccomandata: 'Avviare RFQ con fornitori alternativi Oeko-Tex entro fine mese. Stimato: circolarità TM → 73.1%, carbon footprint → -22%.' } },
  { codice: 'FM-01', nome: 'Ferramenta Alpine', categoria: 'Metallo', spesa: '15%', esg: 88, cert: 'ISO 14001, SA8000', otd: 97, tracciabilita: 'Alta', rischio: 'Basso', azioneAI: '—',
    detail: { origine: 'Italia', sede: 'Bolzano (IT)', esgBreakdown: { env: 90, social: 85, gov: 88 }, certMancanti: [], tassoDifetti: '0.8%', leadTime: '10 gg', impattoStrategico: ['Fornitore benchmark del panel', 'Nessuna criticità identificata'], azioneRaccomandata: 'Nessuna azione necessaria. Fornitore di riferimento.' } },
  { codice: 'UP-03', nome: 'Imbottiture Brianza', categoria: 'Imbottitura', spesa: '12%', esg: 82, cert: 'Oeko-Tex, ISO 45001', otd: 95, tracciabilita: 'Alta', rischio: 'Basso', azioneAI: '—',
    detail: { origine: 'Italia', sede: 'Monza (IT)', esgBreakdown: { env: 80, social: 85, gov: 82 }, certMancanti: [], tassoDifetti: '1.2%', leadTime: '8 gg', impattoStrategico: ['Performance solida, nessuna criticità'], azioneRaccomandata: 'Nessuna azione necessaria.' } },
  { codice: 'MT-06', nome: 'Metalli Brescia', categoria: 'Componenti', spesa: '11%', esg: 74, cert: 'ISO 9001', otd: 93, tracciabilita: 'Media', rischio: 'Medio', azioneAI: 'Audit ESG',
    detail: { origine: 'Italia', sede: 'Brescia (IT)', esgBreakdown: { env: 70, social: 75, gov: 78 }, certMancanti: ['ISO 14001'], tassoDifetti: '1.5%', leadTime: '12 gg', impattoStrategico: ['ESG sotto target, audit raccomandato'], azioneRaccomandata: 'Pianificare audit ESG entro Q2 2025.' } },
  { codice: 'FN-07', nome: 'Finiture Veneto', categoria: 'Verniciature', spesa: '9%', esg: 71, cert: 'ISO 14001', otd: 91, tracciabilita: 'Media', rischio: 'Medio', azioneAI: 'Audit ESG',
    detail: { origine: 'Italia', sede: 'Vicenza (IT)', esgBreakdown: { env: 72, social: 68, gov: 73 }, certMancanti: ['SA8000'], tassoDifetti: '2.1%', leadTime: '11 gg', impattoStrategico: ['OTD sotto target, monitorare'], azioneRaccomandata: 'Pianificare audit ESG entro Q2 2025.' } },
  { codice: 'PK-05', nome: 'Packaging Eco', categoria: 'Packaging', spesa: '7%', esg: 79, cert: 'FSC, Seedling', otd: 96, tracciabilita: 'Alta', rischio: 'Basso', azioneAI: '—',
    detail: { origine: 'Italia', sede: 'Milano (IT)', esgBreakdown: { env: 82, social: 75, gov: 80 }, certMancanti: [], tassoDifetti: '0.5%', leadTime: '7 gg', impattoStrategico: ['Performance eccellente'], azioneRaccomandata: 'Nessuna azione necessaria.' } },
  { codice: 'AC-08', nome: 'Accessori Como', categoria: 'Accessori', spesa: '6%', esg: 55, cert: 'Nessuna ⚠️', otd: 89, tracciabilita: 'Bassa', rischio: 'Alto', azioneAI: 'RFQ alternativa',
    detail: { origine: 'Italia / Cina mix', sede: 'Como (IT)', esgBreakdown: { env: 50, social: 55, gov: 60 }, certMancanti: ['ISO 14001', 'SA8000'], tassoDifetti: '2.8%', leadTime: '20 gg', impattoStrategico: ['Nessuna certificazione, OTD basso', 'Lead time più alto del panel'], azioneRaccomandata: 'Avviare RFQ per fornitore alternativo certificato.' } },
];

const SuppliersPage = () => {
  const { t } = useLanguage();
  const [expandedSupplier, setExpandedSupplier] = useState<string | null>(null);

  const toggleExpand = (codice: string) => {
    setExpandedSupplier(expandedSupplier === codice ? null : codice);
  };

  const getRiskBadge = (rischio: string) => {
    const styles: Record<string, string> = {
      'Critico': 'bg-red-500/10 text-red-600',
      'Alto': 'bg-amber-500/10 text-amber-600',
      'Medio': 'bg-yellow-500/10 text-yellow-600',
      'Basso': 'bg-emerald-500/10 text-emerald-600',
    };
    return <Badge className={styles[rischio] || ''}>{rischio}</Badge>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="module-header mb-1">{t('ratingFornitoriAI')}</h1>
        <p className="text-muted-foreground text-sm">Analisi ESG, rischio concentrazione e certificazioni del panel fornitori Haworth Lifestyle</p>
      </div>
      <ModuleAIButtons moduleName="Fornitori" />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {supplierKPIs.map((kpi) => (
          <Card key={kpi.label} className="kpi-card">
            <span className="kpi-label">{kpi.label}</span>
            <div className="kpi-value mt-1">{kpi.value}{kpi.unit}</div>
            <p className="text-xs text-muted-foreground">Target: {kpi.target}{kpi.unit}</p>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <TrendingDown className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500">sotto target</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ESG Score per Fornitore */}
        <Card>
          <CardHeader><CardTitle className="text-lg">ESG Score per Fornitore</CardTitle></CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={esgBySupplier} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={180} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <ReferenceLine x={75} stroke="hsl(var(--primary))" strokeDasharray="5 5" label="Target 75" />
                  <Bar dataKey="esg" radius={[0, 4, 4, 0]}>
                    {esgBySupplier.map((entry, index) => (
                      <Cell key={index} fill={entry.esg >= 75 ? 'hsl(142, 71%, 45%)' : 'hsl(38, 92%, 50%)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribuzione Spesa */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Distribuzione Spesa per Fornitore</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={spendDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" nameKey="name">
                      {spendDistribution.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1.5 overflow-y-auto max-h-48">
                {spendDistribution.map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.fill }} />
                      <span className="truncate max-w-[140px]">{s.name}</span>
                    </div>
                    <span className="font-medium">{s.value}%{s.value > 20 ? ' ⚠️' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spider Chart */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Spider Chart — Top 4 Fornitori</CardTitle></CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="FM-01" dataKey="FM-01" stroke="hsl(142, 71%, 45%)" fill="hsl(142, 71%, 45%)" fillOpacity={0.15} />
                <Radar name="UP-03" dataKey="UP-03" stroke="hsl(210, 100%, 50%)" fill="hsl(210, 100%, 50%)" fillOpacity={0.15} />
                <Radar name="WD-02" dataKey="WD-02" stroke="hsl(38, 92%, 50%)" fill="hsl(38, 92%, 50%)" fillOpacity={0.15} />
                <Radar name="TM-04" dataKey="TM-04" stroke="hsl(0, 72%, 51%)" fill="hsl(0, 72%, 51%)" fillOpacity={0.15} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Table */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Panel Fornitori — Rating Completo</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Fornitore</th><th>Categoria</th><th>% Spesa</th><th>ESG</th><th>Cert.</th><th>OTD</th><th>{t('tracciabilita')}</th><th>{t('rischioFornitore')}</th><th>{t('azioneAI')}</th><th></th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((s) => (
                  <>
                    <tr key={s.codice} className="cursor-pointer hover:bg-muted/50" onClick={() => toggleExpand(s.codice)}>
                      <td className="font-medium">{s.codice} {s.nome}</td>
                      <td className="text-sm">{s.categoria}</td>
                      <td className="font-medium">{s.spesa}</td>
                      <td>
                        <Badge className={s.esg >= 75 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}>
                          {s.esg}/100 {s.esg >= 75 ? '✓' : '⚠️'}
                        </Badge>
                      </td>
                      <td className="text-xs">{s.cert}</td>
                      <td>
                        <Badge className={s.otd >= 95 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}>
                          {s.otd}%{s.otd < 95 ? ' ⚠️' : ' ✓'}
                        </Badge>
                      </td>
                      <td className="text-sm">{s.tracciabilita}</td>
                      <td>{getRiskBadge(s.rischio)}</td>
                      <td className="text-xs text-primary font-medium">{s.azioneAI}</td>
                      <td>{expandedSupplier === s.codice ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</td>
                    </tr>
                    {expandedSupplier === s.codice && (
                      <tr key={`${s.codice}-detail`}>
                        <td colSpan={10} className="bg-muted/30 p-4">
                          <div className="space-y-3 text-sm">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div><span className="text-muted-foreground">Sede:</span> <span className="font-medium">{s.detail.sede}</span></div>
                              <div><span className="text-muted-foreground">Origine:</span> <span className="font-medium">{s.detail.origine}</span></div>
                              <div><span className="text-muted-foreground">Tasso Difetti:</span> <span className="font-medium">{s.detail.tassoDifetti}</span></div>
                              <div><span className="text-muted-foreground">Lead Time:</span> <span className="font-medium">{s.detail.leadTime}</span></div>
                            </div>
                            <div>
                              <p className="font-semibold mb-1">ESG Breakdown:</p>
                              <div className="flex gap-4">
                                <span>Environmental: <strong>{s.detail.esgBreakdown.env}/100</strong></span>
                                <span>Social: <strong>{s.detail.esgBreakdown.social}/100</strong></span>
                                <span>Governance: <strong>{s.detail.esgBreakdown.gov}/100</strong></span>
                              </div>
                            </div>
                            {s.detail.certMancanti.length > 0 && (
                              <div>
                                <p className="font-semibold mb-1">Certificazioni Mancanti:</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {s.detail.certMancanti.map((c, i) => (
                                    <Badge key={i} variant="outline" className="text-amber-600 border-amber-300">{c}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div>
                              <p className="font-semibold mb-1">Impatto Strategico:</p>
                              <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                                {s.detail.impattoStrategico.map((imp, i) => (
                                  <li key={i}>{imp}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="p-3 rounded-lg bg-primary/5 border-l-4 border-primary">
                              <p className="font-semibold text-primary mb-1">Azione Raccomandata (AI):</p>
                              <p className="text-muted-foreground">{s.detail.azioneRaccomandata}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuppliersPage;
