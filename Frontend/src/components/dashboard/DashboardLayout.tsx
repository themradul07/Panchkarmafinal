import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { SessionsView } from "@/components/dashboard/SessionsView";
import { ReportsView } from "@/components/dashboard/ReportsView";
import { ProgressView } from "@/components/dashboard/ProgressView";
import { NotificationsView } from "@/components/dashboard/NotificationsView";
import { TipsView } from "@/components/dashboard/TipsView";
import { ChatsView } from "@/components/dashboard/ChatsView";
import wellnessBg from "@/assets/wellness-bg.jpg";
import { ProfileSummary } from "./ProfileSummary";

export const DashboardLayout = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "sessions":
        return <SessionsView />;
      case "reports":
        return <ReportsView />;
      case "progress":
        return <ProgressView />;
      case "notifications":
        return <NotificationsView />;
      case "tips":
        return <TipsView />;
      case "chats":
        return <ChatsView />;
      case "update":
        return <ProfileSummary/>
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div 
        className="fixed inset-0 opacity-5 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${wellnessBg})` }}
      />
      
      <Navbar />
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {/* Main Content */}
      <main className="ml-64 pt-16 p-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="ml-64 mt-12 py-8 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Panchkarma – Your Journey to Healing.
          </p>
        </div>
      </footer>
    </div>
  );
};