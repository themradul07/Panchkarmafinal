import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const therapists = [
  { name: "Dr. Priya Mehta", role: "Yoga Therapist", experience: "7 yrs" },
  { name: "Dr. Karan Joshi", role: "Massage Therapist", experience: "11 yrs" },
  { name: "Dr. Sneha Gupta", role: "Acupressure Specialist", experience: "6 yrs" },
  { name: "Dr. Vikram Singh", role: "Reiki Healer", experience: "9 yrs" },
];

const TherapistsPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('token')));

  // Listen for login/logout events to update state
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

  const handleBookNow = (therapistName: string) => {
    // Here you can navigate to a booking page or open a modal
    alert(`Booking appointment with ${therapistName}`);
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      {isLoggedIn && (
        <div className="flex justify-center items-center mb-8 space-x-6">
          <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
            My Dashboard
          </Button>
          <Button variant="outline" size="lg" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
      <h2 className="text-3xl font-bold text-center text-foreground mb-12">
        Our Expert Therapists
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {therapists.map((therapist, index) => (
          <Card
            key={index}
            className="p-6 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white rounded-xl flex flex-col justify-between"
          >
            <CardContent className="p-0 flex flex-col items-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{therapist.name}</h3>
              <p className="text-sm text-muted-foreground">{therapist.role}</p>
              <p className="text-sm text-muted-foreground mb-4">{therapist.experience} Experience</p>
              <Button
                onClick={() => handleBookNow(therapist.name)}
                className="bg-primary text-white hover:bg-primary/90 w-full"
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TherapistsPage;
