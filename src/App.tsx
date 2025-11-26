import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import BookSessionPage from "./components/BookSessionPage";
import Index from "./pages/Index";   // ✅ use Index as the real Dashboard
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MySessions from "./components/MySessions";
import PaymentPage from "./components/PaymentPage";
import ExpertDashboard from "./pages/ExpertDashboard";

const queryClient = new QueryClient();

const App = () => {
const {user} = useAuth();


  return (

    <>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Toaster />
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
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />

          <Route
            path="/dashboard"
            element={ user?.userType === "expert"?
              <ProtectedRoute>
                <ExpertDashboard/>
              </ProtectedRoute> :
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
    </AuthProvider>
  </QueryClientProvider>

  </>
  )
  
};

export default App;
