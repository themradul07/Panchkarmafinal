import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">Panchkarma</span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Home
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Therapies
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Contact
            </Button>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                JP
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-sm text-foreground">John Patient</span>
          </div>
        </div>
      </div>
    </nav>
  );
};