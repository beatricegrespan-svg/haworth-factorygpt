import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ChatLayout } from "@/components/layout/ChatLayout";
import { FactoryLayout } from "@/components/layout/FactoryLayout";
import ChatPage from "@/pages/ChatPage";
import ProductionPage from "@/pages/ProductionPage";
import QualityPage from "@/pages/QualityPage";
import MaintenancePage from "@/pages/MaintenancePage";
import KnowledgePage from "@/pages/KnowledgePage";
import CostsPage from "@/pages/CostsPage";
import PianoProduzionePage from "@/pages/PianoProduzionePage";
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
            <Route path="/production" element={
              <FactoryLayout>
                <ProductionPage />
              </FactoryLayout>
            } />
            <Route path="/production/piano" element={
              <FactoryLayout>
                <PianoProduzionePage />
              </FactoryLayout>
            } />
            <Route path="/quality" element={
              <FactoryLayout>
                <QualityPage />
              </FactoryLayout>
            } />
            <Route path="/maintenance" element={
              <FactoryLayout>
                <MaintenancePage />
              </FactoryLayout>
            } />
            <Route path="/knowledge" element={
              <FactoryLayout>
                <KnowledgePage />
              </FactoryLayout>
            } />
            <Route path="/costs" element={
              <FactoryLayout>
                <CostsPage />
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
