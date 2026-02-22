import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Factory, 
  Wrench, 
  BookOpen, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  ChevronDown,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { path: string; label: string }[];
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { 
    path: '/production', 
    label: 'Production', 
    icon: Factory,
    children: [
      { path: '/production', label: 'Overview' },
      { path: '/production/quality', label: 'Quality' }
    ]
  },
  { path: '/maintenance', label: 'Maintenance', icon: Wrench },
  { path: '/costs', label: 'Costs', icon: DollarSign },
  { path: '/knowledge', label: 'Operational Knowledge', icon: BookOpen },
];

interface SidebarProps {
  onAskFactoryGPT: () => void;
}

export const Sidebar = ({ onAskFactoryGPT }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(['Production']);
  const location = useLocation();

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => 
      prev.includes(label) 
        ? prev.filter(m => m !== label)
        : [...prev, label]
    );
  };

  const isItemActive = (item: NavItem) => {
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    return location.pathname === item.path;
  };

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
          <Factory className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-lg text-sidebar-accent-foreground">
            FactoryGPT
          </span>
        )}
      </div>

      {/* Ask FactoryGPT CTA */}
      <div className="p-3">
        <button
          onClick={onAskFactoryGPT}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-medium transition-all hover:opacity-90",
            collapsed && "justify-center"
          )}
        >
          <Sparkles className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Ask FactoryGPT</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = isItemActive(item);
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openMenus.includes(item.label);

          if (hasChildren && !collapsed) {
            return (
              <Collapsible 
                key={item.path} 
                open={isOpen} 
                onOpenChange={() => toggleMenu(item.label)}
              >
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      "nav-item w-full justify-between",
                      isActive && "nav-item-active"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform",
                      isOpen && "rotate-180"
                    )} />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children!.map((child) => {
                      const isChildActive = location.pathname === child.path;
                      return (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                            isChildActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          )}
                        >
                          {child.label === 'Quality' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Factory className="w-4 h-4" />
                          )}
                          {child.label}
                        </NavLink>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          }

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
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
