// src/App.tsx
import React from "react";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import BookSessionPage from "./components/BookSessionPage";
import Index from "./pages/Index";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import MySessions from "./components/MySessions";
import PaymentPage from "./components/PaymentPage";
import ExpertLayout from "./components/ExpertLayout";
import DashboardIndex from "./pages/expert/Index";
import ProfilePage from "./pages/expert/Profile";
import SessionsPage from "./pages/expert/Sessions";
import AvailabilityPage from "./pages/expert/Availability";
import SkillsPage from "./pages/expert/Skills";

const queryClient = new QueryClient();

function LandingOrRedirect() {
  const { user } = useAuth();
  if (user?.userType === "expert") return <Navigate to="/dashboard" replace />;
  return <Index />;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* root will redirect experts to /dashboard */}
        <Route path="/" element={<LandingOrRedirect />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route path="/book-session/:coachName" element={<ProtectedRoute><BookSessionPage /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/my-sessions" element={<ProtectedRoute><MySessions /></ProtectedRoute>} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              {user?.userType === "expert" ? <ExpertLayout /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardIndex />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="sessions" element={<SessionsPage />} />
          <Route path="availability" element={<AvailabilityPage />} />
          <Route path="skills" element={<SkillsPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AppRoutes />
    </QueryClientProvider>
  );
}
