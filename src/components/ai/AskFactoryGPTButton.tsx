import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AskFactoryGPTModal } from './AskFactoryGPTModal';

interface AskFactoryGPTButtonProps {
  context?: string;
}

export const AskFactoryGPTButton = ({ context }: AskFactoryGPTButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 shadow-lg gap-2 bg-primary hover:bg-primary/90"
        size="lg"
      >
        <Sparkles className="w-5 h-5" />
        Ask FactoryGPT
      </Button>

      <AskFactoryGPTModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};
