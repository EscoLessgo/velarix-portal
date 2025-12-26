import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarLayout from "./pages/SidebarLayout";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // TEMPORARY FOR TESTING: Always show loader
    // TODO: Comment out the line below when done testing
    setShowLoader(true);

    // PRODUCTION CODE (uncomment when ready):
    // Check if user has seen the loader within the last 30 minutes
    // const loaderTimestamp = localStorage.getItem('velarix-loader-timestamp');
    // const now = Date.now();
    // const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
    // 
    // if (!loaderTimestamp || (now - parseInt(loaderTimestamp)) > thirtyMinutes) {
    //   setShowLoader(true);
    // } else {
    //   setIsReady(true);
    // }
  }, []);

  const handleLoaderComplete = () => {
    // Store the current timestamp instead of just a flag
    localStorage.setItem('velarix-loader-timestamp', Date.now().toString());
    setShowLoader(false);
    setIsReady(true);
  };

  if (showLoader) {
    return <LoadingScreen onComplete={handleLoaderComplete} />;
  }

  if (!isReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SidebarLayout />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
