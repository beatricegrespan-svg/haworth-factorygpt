import { ReactNode } from 'react';
import { ChatSidebar } from './ChatSidebar';
import { useNavigate } from 'react-router-dom';

interface ChatLayoutProps {
  children: ReactNode;
}

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  const navigate = useNavigate();

  const handleNewChat = () => {
    // Reset to home with fresh chat
    window.location.href = '/';
  };

  const handleNavigateToFactory = () => {
    navigate('/factory');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatSidebar 
        onNewChat={handleNewChat}
        onNavigateToFactory={handleNavigateToFactory}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-hidden bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};
