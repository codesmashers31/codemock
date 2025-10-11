import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import BookSessionPage from "./components/BookSessionPage";
import Index from "./pages/Index";   // ✅ use Index as the real Dashboard
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import MySessions from "./components/MySessions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* 👇 Redirect root to signin */}
            <Route path="/" element={<Navigate to="/signin" replace />} />

            {/* Public routes */}
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />

            {/* Protected routes */}
            <Route 
              path="/book-session/:coachName" 
              element={
                <ProtectedRoute>
                  <BookSessionPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Index />   {/* ✅ now this is your dashboard */}
                </ProtectedRoute>
              } 
            />
            <Route
  path="/my-sessions"
  element={
    <ProtectedRoute>
      <MySessions />
    </ProtectedRoute>
  }
/>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
