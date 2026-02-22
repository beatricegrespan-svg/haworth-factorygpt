import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ChatLayout } from "@/components/layout/ChatLayout";
import { FactoryLayout } from "@/components/layout/FactoryLayout";
import ChatPage from "@/pages/ChatPage";
import QualityPage from "@/pages/QualityPage";
import KnowledgePage from "@/pages/KnowledgePage";
import CostsPage from "@/pages/CostsPage";
import CircularityPage from "@/pages/CircularityPage";
import SustainabilityPage from "@/pages/SustainabilityPage";
import ChannelsPage from "@/pages/ChannelsPage";
import FactoryOverviewPage from "@/pages/FactoryOverviewPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Chat-first interface */}
            <Route path="/" element={
              <ChatLayout>
                <ChatPage />
              </ChatLayout>
            } />
            
            {/* Factory Overview - hub page without sidebar */}
            <Route path="/factory" element={<FactoryOverviewPage />} />
            
            {/* Factory modules with factory layout */}
            <Route path="/circularity" element={
              <FactoryLayout>
                <CircularityPage />
              </FactoryLayout>
            } />
            <Route path="/sustainability" element={
              <FactoryLayout>
                <SustainabilityPage />
              </FactoryLayout>
            } />
            <Route path="/channels" element={
              <FactoryLayout>
                <ChannelsPage />
              </FactoryLayout>
            } />
            <Route path="/quality" element={
              <FactoryLayout>
                <QualityPage />
              </FactoryLayout>
            } />
            <Route path="/costs" element={
              <FactoryLayout>
                <CostsPage />
              </FactoryLayout>
            } />
            <Route path="/knowledge" element={
              <FactoryLayout>
                <KnowledgePage />
              </FactoryLayout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;