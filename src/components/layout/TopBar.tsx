import { Building2, GitBranch, Calendar, SlidersHorizontal } from 'lucide-react';
import { useFilters } from '@/contexts/FilterContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'it' as const, label: 'Italiano', flag: '🇮🇹' },
  { code: 'en' as const, label: 'English', flag: '🇬🇧' },
];

export const TopBar = () => {
  const { filters, updateFilter } = useFilters();
  const { language, setLanguage, t } = useLanguage();

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {/* Plant Selector */}
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <Select 
            value={filters.plant} 
            onValueChange={(value) => updateFilter('plant', value)}
          >
            <SelectTrigger className="w-[130px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Plant A">Plant A</SelectItem>
              <SelectItem value="Plant B">Plant B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Line Selector */}
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-muted-foreground" />
          <Select 
            value={filters.line} 
            onValueChange={(value) => updateFilter('line', value)}
          >
            <SelectTrigger className="w-[130px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Lines">{t('allLines')}</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Retail">Retail</SelectItem>
              <SelectItem value="Tailor Made">Tailor Made</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Time Range */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <Select 
            value={filters.timeRange} 
            onValueChange={(value) => updateFilter('timeRange', value as 'today' | 'week' | 'month')}
          >
            <SelectTrigger className="w-[130px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">{t('today')}</SelectItem>
              <SelectItem value="week">{t('thisWeek')}</SelectItem>
              <SelectItem value="month">{t('thisMonth')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 text-base">
              <span className="text-xl">{currentLang.flag}</span>
              <span className="text-sm">{currentLang.label}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={language === lang.code ? 'bg-accent' : ''}
              >
                <span className="text-xl mr-2">{lang.flag}</span>
                <span>{lang.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Filters Button */}
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          {t('filters')}
        </Button>
      </div>
    </header>
  );
};
