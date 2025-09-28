import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Bell, 
  Lightbulb, 
  MessageSquare, 
  LogOut,
  Leaf,
  Edit
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "sessions", label: "My Sessions", icon: Calendar },
  { id: "reports", label: "My Reports", icon: FileText },
  { id: "progress", label: "Progress Tracker", icon: TrendingUp },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "tips", label: "Tips & Guidance", icon: Lightbulb },
  { id: "chats", label: "Chats", icon: MessageSquare },
  { id: "update", label: "Update Profile", icon: Edit },
];

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <div className="fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border shadow-sm overflow-y-auto">
      <div className="p-6">
        {/* Welcome Message */}
        <div className="mb-8 p-4 bg-wellness-light/30 rounded-lg border border-wellness-light">
          <div className="flex items-center space-x-2 mb-2">
            <Leaf className="w-5 h-5 text-wellness" />
            <span className="text-sm font-medium text-wellness">Welcome to Wellness</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Your journey to healing begins here
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left py-3 h-auto",
                  isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium">{item.label}</span>
              </Button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-left py-3 h-auto text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};