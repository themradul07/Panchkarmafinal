import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf } from "lucide-react";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  // Real auth: check for token in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem('token'));
  });

  const isHomePage = location.pathname === "/";

  // Listen for login/logout events to update navbar
  useEffect(() => {
    const updateLoginState = () => setIsLoggedIn(Boolean(localStorage.getItem('token')));
    window.addEventListener('userLogin', updateLoginState);
    window.addEventListener('userLogout', updateLoginState);
    return () => {
      window.removeEventListener('userLogin', updateLoginState);
      window.removeEventListener('userLogout', updateLoginState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('userLogout'));
    navigate('/');
  };

  const handleNavClick = (href: string) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate(href);
    }
  };

  const handleScroll = (section: string) => {
    const elementId = section.toLowerCase();
    if (isHomePage) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Consultation", href: "/consultants" },
    { name: "Therapists", href: "/therapists" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
    { name: "Dashboard", href: "/dashboard" },

  ];
return (
    <nav className="sticky top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
  src={logo} 
  alt="AyurSutra Logo" 
  className="h-28 w-auto"
/>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.name === "Testimonials" || item.name === "Contact") {
                return (
                  <button
                    key={item.name}
                    onClick={() => handleScroll(item.name)}
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </button>
                );
              } else if (item.name === "Consultation" || item.name === "Therapists" || item.name === "Dashboard") {
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </button>
                );
              } else {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </a>
                );
              }
            })}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isHomePage ? (
              <Button size="lg" onClick={() => navigate("/signup")}>
                Book Your Appointment
              </Button>
            ) : (
              isLoggedIn ? (
                <Button size="lg" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button size="lg" onClick={() => navigate("/signup")}>
                  Book Your Appointment
                </Button>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border animate-in slide-in-from-top-2 duration-300">
            {navItems.map((item) => {
              if (item.name === "Testimonials" || item.name === "Contact") {
                return (
                  <button
                    key={item.name}
                    onClick={() => { setIsOpen(false); handleScroll(item.name); }}
                    className="block text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  >
                    {item.name}
                  </button>
                );
              } else if (item.name === "Consultation" || item.name === "Therapists" || item.name === "Dashboard") {
                return (
                  <button
                    key={item.name}
                    onClick={() => { setIsOpen(false); handleNavClick(item.href); }}
                    className="block text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  >
                    {item.name}
                  </button>
                );
              } else {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                );
              }
            })}
            <div className="flex flex-col space-y-2 pt-4">
              {isHomePage ? (
                <Button
                  size="default"
                  className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground"
                  onClick={() => navigate("/signup")}
                >
                  Book Your Appointment
                </Button>
              ) : (
                <>
                  {isLoggedIn ? (
                    <Button variant="outline" size="default" onClick={handleLogout}>
                      Logout
                    </Button>
                  ) : (
                    <Button variant="outline" size="default" onClick={() => navigate("/signup")}>Login</Button>
                  )}
                  <Button
                    size="default"
                    className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground"
                    onClick={() => navigate("/therapists")}
                  >
                    Book Appointment
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
