import { NavLink, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Home,
  Leaf,
  BarChart3,
  Factory,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FactorySidebarProps {
  onBackToChat: () => void;
}

export const FactorySidebar = ({ onBackToChat }: FactorySidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/production', label: t('produzioneAI'), icon: Factory },
    { path: '/sustainability', label: t('sostenibilitaCircolaritaAI'), icon: Leaf },
    { path: '/channels', label: t('canaliSinergieAI'), icon: BarChart3 },
    { path: '/suppliers', label: t('ratingFornitoriAI'), icon: Star },
    { path: '/costs', label: t('costiMarginalitaAI'), icon: DollarSign },
    { path: '/knowledge', label: t('khaiLabel'), icon: BookOpen },
  ];

  return (
    <aside 
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
          <Leaf className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-lg text-sidebar-accent-foreground">
            Haworth
          </span>
        )}
      </div>

      {/* Back to Chat */}
      <div className="p-3 space-y-2">
        <button
          onClick={onBackToChat}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-sidebar-border text-sidebar-foreground font-medium transition-all hover:bg-sidebar-accent",
            collapsed && "justify-center"
          )}
        >
          <Sparkles className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>{t('factoryGPTChat')}</span>}
        </button>
        
        <NavLink
          to="/factory"
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-sidebar-border text-sidebar-foreground font-medium transition-all hover:bg-sidebar-accent",
            collapsed && "justify-center",
            location.pathname === '/factory' && "bg-sidebar-accent"
          )}
        >
          <Home className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>{t('factoryHub')}</span>}
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "nav-item",
                isActive && "nav-item-active",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">{t('collapse')}</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
