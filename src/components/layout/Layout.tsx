import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { AskFactoryGPTModal } from '@/components/ai/AskFactoryGPTModal';
import { FilterProvider } from '@/contexts/FilterContext';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  return (
    <FilterProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar onAskFactoryGPT={() => setIsAIModalOpen(true)} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-auto bg-background p-6">
            {children}
          </main>
        </div>
        <AskFactoryGPTModal 
          isOpen={isAIModalOpen} 
          onClose={() => setIsAIModalOpen(false)} 
        />
      </div>
    </FilterProvider>
  );
};
