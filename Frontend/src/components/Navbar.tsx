import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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

  const isLandingPage = location.pathname === "/";
  const showSimplifiedNav = isLandingPage || location.pathname === "/login" || location.pathname === "/signup";
  const isPatientDashboard = location.pathname === "/dashboard";
  const isConsultantsPage = location.pathname === "/consultants";
  const isTherapistsPage = location.pathname === "/therapists";

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
    if (isLandingPage) {
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

  const handleLogoutClick = () => {
    handleLogout();
  };

  const navItems = (isConsultantsPage || isTherapistsPage) ? [
    { name: "My Dashboard", href: "/dashboard", type: "nav" },
  ] : isPatientDashboard ? [
    { name: "Book Consultation", href: "/consultants", type: "nav" },
    { name: "Our Therapists", href: "/therapists", type: "nav" },
  ] : showSimplifiedNav ? [
    { name: "Home", href: "/", type: "link" },
    { name: "About Us", href: "#about", type: "scroll" },
    { name: "Our Therapies", href: "#therapies", type: "scroll" },
    { name: "Testimonials", href: "#testimonials", type: "scroll" },
    { name: "Contact", href: "#contact", type: "scroll" },
  ] : [
    { name: "Home", href: "/", type: "link" },
    { name: "Consultation", href: "/consultants", type: "nav" },
    { name: "Therapists", href: "/therapists", type: "nav" },
    { name: "Testimonials", href: "#testimonials", type: "scroll" },
    { name: "Contact", href: "#contact", type: "scroll" },
    { name: "Dashboard", href: "/dashboard", type: "nav" },
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
  className="h-10 w-auto"
/>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center ${(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? 'space-x-12' : 'space-x-8'}`}>
            {navItems.map((item) => {
              if (item.type === "scroll") {
                return (
                  <Button
                    key={item.name}
                    variant="outline"
                    size={(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? "lg" : "default"}
                    className={(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? "font-bold font-serif" : ""}
                    onClick={() => handleScroll(item.href.replace('#', ''))}
                  >
                    {item.name}
                  </Button>
                );
              } else if (item.type === "nav") {
                return (
                  <Button
                    key={item.name}
                    variant="outline"
                    size={(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? "lg" : "default"}
                    className={(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? "font-bold font-serif" : ""}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.name}
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    size={(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? "lg" : "default"}
                    className={(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? "font-bold font-serif justify-start" : "justify-start"}
                    onClick={() => navigate(item.href)}
                  >
                    {item.name}
                  </Button>
                );
              }
            })}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {showSimplifiedNav ? (
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
          <div className={`md:hidden py-4 ${(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? 'space-y-6' : 'space-y-4'} border-t border-border animate-in slide-in-from-top-2 duration-300`}>
            {navItems.map((item) => {
              if (item.type === "scroll") {
                return (
                  <Button
                    key={item.name}
                    variant="outline"
                    size={(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? "lg" : "default"}
                    className={`w-full justify-start ${(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? 'font-bold font-serif' : ''}`}
                    onClick={() => { setIsOpen(false); handleScroll(item.href.replace('#', '')); }}
                  >
                    {item.name}
                  </Button>
                );
              } else if (item.type === "nav") {
                return (
                  <Button
                    key={item.name}
                    variant="outline"
                    size={(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? "lg" : "default"}
                    className={`w-full justify-start ${(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? 'font-bold font-serif' : ''}`}
                    onClick={() => { setIsOpen(false); handleNavClick(item.href); }}
                  >
                    {item.name}
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    size={(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? "lg" : "default"}
                    className={`w-full justify-start ${(isPatientDashboard || isConsultantsPage || isTherapistsPage) ? 'font-bold font-serif' : ''}`}
                    onClick={() => { setIsOpen(false); navigate(item.href); }}
                  >
                    {item.name}
                  </Button>
                );
              }
            })}
            <div className="flex flex-col space-y-2 pt-4">
              {showSimplifiedNav ? (
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
