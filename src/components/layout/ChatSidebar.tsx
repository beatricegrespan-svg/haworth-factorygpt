import { NavLink, useLocation } from 'react-router-dom';
import { 
  Factory, 
  Plus,
  Search,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
}

// Mock chat history
const recentChats: ChatHistory[] = [
  { id: '1', title: 'Analisi OEE Linea 2', timestamp: '2 ore fa' },
  { id: '2', title: 'Manutenzione preventiva', timestamp: 'Ieri' },
  { id: '3', title: 'Report qualità settimanale', timestamp: '3 giorni fa' },
];

interface ChatSidebarProps {
  onNewChat: () => void;
  onNavigateToFactory: () => void;
}

export const ChatSidebar = ({ onNewChat, onNavigateToFactory }: ChatSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const isOnChatPage = location.pathname === '/';
  const isOnFactoryPage = location.pathname !== '/';

  return (
    <aside 
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-72"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-lg text-sidebar-accent-foreground">
            FactoryGPT
          </span>
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-sidebar-border text-sidebar-foreground font-medium transition-all hover:bg-sidebar-accent",
            collapsed && "justify-center"
          )}
        >
          <Plus className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Nuova chat</span>}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 pb-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
            <Search className="w-4 h-4 text-sidebar-muted" />
            <input
              type="text"
              placeholder="Cerca chat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-sidebar-foreground placeholder:text-sidebar-muted focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-4 overflow-y-auto">
        {/* Go to Factory */}
        <div>
          <button
            onClick={onNavigateToFactory}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-medium transition-all hover:opacity-90",
              collapsed && "justify-center"
            )}
          >
            <Factory className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>🏭 Portami alla Factory</span>}
          </button>
        </div>

        {/* Recent Chats */}
        {!collapsed && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-sidebar-muted uppercase tracking-wider px-3 mb-2">
              Chat Recenti
            </p>
            {recentChats
              .filter(chat => 
                searchQuery === '' || 
                chat.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((chat) => (
                <button
                  key={chat.id}
                  className="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-left group"
                >
                  <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0 text-sidebar-muted" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{chat.title}</p>
                    <p className="text-xs text-sidebar-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {chat.timestamp}
                    </p>
                  </div>
                </button>
              ))}
          </div>
        )}

        {collapsed && (
          <button
            className="w-full flex justify-center py-2.5 rounded-lg text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            title="Cerca chat"
          >
            <Search className="w-5 h-5" />
          </button>
        )}
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
              <span className="text-sm">Comprimi</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
