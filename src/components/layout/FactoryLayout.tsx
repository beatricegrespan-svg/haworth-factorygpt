import { ReactNode } from 'react';
import { FactorySidebar } from './FactorySidebar';
import { TopBar } from './TopBar';
import { FilterProvider } from '@/contexts/FilterContext';
import { useNavigate } from 'react-router-dom';

interface FactoryLayoutProps {
  children: ReactNode;
}

export const FactoryLayout = ({ children }: FactoryLayoutProps) => {
  const navigate = useNavigate();

  const handleBackToChat = () => {
    navigate('/');
  };

  return (
    <FilterProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <FactorySidebar onBackToChat={handleBackToChat} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-auto bg-background p-6">
            {children}
          </main>
        </div>
      </div>
    </FilterProvider>
  );
};
