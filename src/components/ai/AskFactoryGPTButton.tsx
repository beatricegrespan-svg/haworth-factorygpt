import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AskFactoryGPTModal } from './AskFactoryGPTModal';

interface AskFactoryGPTButtonProps {
  context?: string;
  question?: string;
}

export const AskFactoryGPTButton = ({ context, question }: AskFactoryGPTButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="gap-2 bg-primary hover:bg-primary/90"
        size="sm"
      >
        <Sparkles className="w-4 h-4" />
        Ask FactoryGPT
      </Button>

      <AskFactoryGPTModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};