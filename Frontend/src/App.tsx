import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookTherapyPage from "./pages/BookTherapyPage";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import ConsultantsPage from "./pages/ConsultantsPage";
import TherapistListing from "./pages/TherapistListing";
import TherapistProfile from "./pages/TherapistProfile";
import TherapistDashboard from "./pages/TherapistDashboard";
import BookingPage from "./pages/BookingPage";
import Dashboard from "./pages/Admin/Dashboard";
import Therapist from "./pages/Admin/Therapist";
import Feedback from "./pages/Admin/Feedback";
import Settings from "./pages/Admin/Settings";
import PatientDashoard from "./pages/PatientDashboard";

const queryClient = new QueryClient();

const App = () => (


  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Index />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Patient Routes */}
          <Route path="/dashboard" element={<PatientDashoard />} />
          <Route path="/consultants" element={<ConsultantsPage />} />
          <Route path="/book-therapy" element={<BookTherapyPage />} />
          <Route path="/therapists" element={<TherapistListing />} />
          <Route path="/therapists/:id" element={<TherapistProfile />} />
          <Route path="/therapists/:id/book" element={<BookingPage />} />

          {/* Therapists Routeds */}
          <Route path="/therapist-dashboard" element={<TherapistDashboard />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/therapists" element={<Therapist />} />
          <Route path="/admin/feedback" element={<Feedback />} />
          <Route path="/admin/settings" element={<Settings />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
