import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Landing } from "@/pages/Landing";
import { AuthForm } from "@/components/AuthForm";
import { AdminAuthForm } from "@/components/AdminAuthForm";
import { Administrator } from "@/pages/Administrator";
import { GroupDetail } from "@/pages/GroupDetail";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const GroupDetailRoute = () => {
  const { groupId } = useParams();
  return <GroupDetail groupId={groupId || ""} />;
};

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem("isAdminAuthenticated") === "true";
  });

  // Check for admin authentication on mount
  useEffect(() => {
    const adminAuth = localStorage.getItem("isAdminAuthenticated");
    if (adminAuth === "true") {
      setIsAdminAuthenticated(true);
    }
  }, []);

  // Handle admin logout
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminUsername");
  };

  // If admin is authenticated, show admin panel
  if (isAdminAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/administrator" element={<Administrator />} />
          <Route path="*" element={<Administrator />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // If regular user is authenticated, show main app
  if (isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/group/:groupId" element={<GroupDetailRoute />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // Show authentication forms or landing page
  if (showAdminAuth) {
    return (
      <AdminAuthForm 
        onAuthSuccess={() => setIsAdminAuthenticated(true)} 
        onBack={() => setShowAdminAuth(false)} 
      />
    );
  }

  if (showAuth) {
    return <AuthForm onAuthSuccess={() => setShowAuth(false)} onBack={() => setShowAuth(false)} />;
  }

  return <Landing onGetStarted={() => setShowAuth(true)} onAdminAccess={() => setShowAdminAuth(true)} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
