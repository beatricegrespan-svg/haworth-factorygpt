import { FactoryGPTChat } from '@/components/chat/FactoryGPTChat';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const navigate = useNavigate();

  return (
    <FactoryGPTChat 
      onNavigateToFactory={() => navigate('/factory')} 
    />
  );
};

export default ChatPage;
