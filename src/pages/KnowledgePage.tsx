import { useState } from 'react';
import { Search, FileText, ClipboardList, Award, Users, Tag, ChevronRight, Send, Sparkles, CheckCircle, Circle, Link as LinkIcon } from 'lucide-react';
import { knowledgeDocuments, playbooks, preloadedQuestions } from '@/data/mockData';
import { KnowledgeDocument, Playbook, PlaybookStep } from '@/types/factory';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModuleAIButtons } from '@/components/ai/ModuleAIButtons';
import { useLanguage } from '@/contexts/LanguageContext';

const KnowledgePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<{content: string; references: string[]} | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [playbookSteps, setPlaybookSteps] = useState<Record<string, boolean>>({});
  const { t } = useLanguage();

  const categoryIcons = {
    'procedures': FileText,
    'work-instructions': ClipboardList,
    'quality-standards': Award,
    'hr-policies': Users
  };

  const categoryLabels: Record<string, string> = {
    'procedures': t('procedures'),
    'work-instructions': t('workInstructions'),
    'quality-standards': t('qualityStandards'),
    'hr-policies': t('hrPolicies')
  };

  const filteredDocuments = knowledgeDocuments.filter(doc => {
    const matchesSearch = searchQuery === '' || doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === null || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAskAI = () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setTimeout(() => {
      setAiAnswer({
        content: `Based on our operational knowledge base, here's what I found:\n\n${aiQuestion.toLowerCase().includes('sensor') 
          ? 'For sensor replacement procedures, you should follow the Sensor Calibration Guidelines document. The key steps are:\n\n1. **Isolate the equipment** using LOTO procedure\n2. **Document current settings** before removal\n3. **Install new sensor** according to manufacturer specs\n4. **Calibrate** using the standard calibration procedure\n5. **Test and verify** operation before returning to production\n\nMake sure to update the maintenance log after completion.'
          : aiQuestion.toLowerCase().includes('quality')
          ? 'Our Quality Control Standards (ISO 9001) document outlines the requirements for handling quality deviations:\n\n1. **Immediate containment** - Stop affected production and quarantine suspect products\n2. **Investigation** - Document all details and perform root cause analysis\n3. **Corrective action** - Implement fixes and verify effectiveness\n4. **Prevention** - Update procedures to prevent recurrence\n\nAll quality deviations must be logged in the QMS system within 24 hours.'
          : 'I found relevant information in our knowledge base. The documented procedures recommend following standard operating protocols and consulting with your supervisor for specific guidance. Would you like me to provide more specific information about a particular topic?'}`,
        references: ['Sensor Calibration Guidelines', 'LOTO Procedure', 'Quality Control Standards - ISO 9001']
      });
      setIsAiLoading(false);
    }, 1500);
  };

  const toggleStep = (playbookId: string, stepId: string) => {
    setPlaybookSteps(prev => ({ ...prev, [`${playbookId}-${stepId}`]: !prev[`${playbookId}-${stepId}`] }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="module-header">{t('khaiTitle')}</h1>
        <p className="text-muted-foreground -mt-4">{t('khaiDesc')}</p>
      </div>
      <ModuleAIButtons moduleName="KHAI" />

      <Tabs defaultValue="library" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="library">{t('knowledgeLibrary')}</TabsTrigger>
          <TabsTrigger value="ask-ai">{t('askAI')}</TabsTrigger>
          <TabsTrigger value="playbooks">{t('playbooks')}</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('searchDocuments')} className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedCategory(null)} className={cn('px-3 py-1.5 rounded-full text-sm font-medium transition-colors', selectedCategory === null ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80')}>{t('all')}</button>
            {(Object.keys(categoryLabels) as string[]).map(cat => {
              const Icon = categoryIcons[cat as keyof typeof categoryIcons];
              return (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={cn('px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5', selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80')}>
                  <Icon className="w-4 h-4" />{categoryLabels[cat]}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map(doc => {
              const Icon = categoryIcons[doc.category as keyof typeof categoryIcons];
              return (
                <div key={doc.id} className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-accent-foreground" /></div>
                    <div className="min-w-0"><h4 className="font-medium text-sm line-clamp-2">{doc.title}</h4><p className="text-xs text-muted-foreground mt-0.5">{t('updated')} {doc.lastUpdated}</p></div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{doc.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5">{doc.tags.map(tag => (<span key={tag} className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-0.5 rounded"><Tag className="w-3 h-3" />{tag}</span>))}</div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="ask-ai" className="space-y-6">
          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"><Sparkles className="w-5 h-5 text-primary-foreground" /></div>
              <div><h3 className="font-semibold">{t('aiKnowledgeAssistant')}</h3><p className="text-sm text-muted-foreground">{t('aiKnowledgeAssistantDesc')}</p></div>
            </div>
            {!aiAnswer && (
              <div className="mb-6">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">{t('suggestedQuestions')}</p>
                <div className="flex flex-wrap gap-2">{preloadedQuestions.slice(2, 6).map((q, i) => (<button key={i} onClick={() => setAiQuestion(q)} className="text-sm px-3 py-1.5 rounded-full border hover:bg-muted transition-colors">{q}</button>))}</div>
              </div>
            )}
            {aiAnswer && (
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm whitespace-pre-wrap">{aiAnswer.content.split('**').map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}</p>
                    <div className="mt-4 pt-3 border-t">
                      <p className="text-xs text-muted-foreground mb-2">{t('references')}:</p>
                      <div className="flex flex-wrap gap-2">{aiAnswer.references.map((ref, i) => (<span key={i} className="inline-flex items-center gap-1 text-xs bg-accent px-2 py-1 rounded"><FileText className="w-3 h-3" />{ref}</span>))}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <input type="text" value={aiQuestion} onChange={(e) => setAiQuestion(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAskAI()} placeholder={t('askPlaceholder')} className="flex-1 px-4 py-2.5 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <Button onClick={handleAskAI} disabled={isAiLoading || !aiQuestion.trim()}>{isAiLoading ? <span className="animate-pulse">...</span> : <><Send className="w-4 h-4 mr-2" />{t('ask')}</>}</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="playbooks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {playbooks.map(playbook => (
              <div key={playbook.id} className="bg-card rounded-lg border overflow-hidden">
                <div className="p-5 border-b"><h3 className="font-semibold text-lg">{playbook.title}</h3><p className="text-sm text-muted-foreground mt-1">{playbook.description}</p></div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {playbook.steps.map((step) => {
                      const isCompleted = playbookSteps[`${playbook.id}-${step.id}`];
                      return (
                        <li key={step.id} className="flex items-start gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => toggleStep(playbook.id, step.id)}>
                          {isCompleted ? <CheckCircle className="w-5 h-5 text-success shrink-0" /> : <Circle className="w-5 h-5 text-muted-foreground shrink-0" />}
                          <div className="flex-1 min-w-0">
                            <span className={cn('text-sm', isCompleted && 'line-through text-muted-foreground')}>{step.title}</span>
                            {step.linkedDocumentId && <span className="ml-2 inline-flex items-center gap-1 text-xs text-primary"><LinkIcon className="w-3 h-3" />{t('linkedDocument')}</span>}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgePage;
