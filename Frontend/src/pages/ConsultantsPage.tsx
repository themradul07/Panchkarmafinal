import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button"; // Make sure you have a Button component

const consultants = [
  { name: "Dr. Aarya Sharma", role: "Therapist", experience: "10 yrs" },
  { name: "Dr. Rohit Verma", role: "Ayurveda Specialist", experience: "8 yrs" },
  { name: "Dr. Neha Singh", role: "Therapist", experience: "12 yrs" },
  { name: "Dr. Aman Patel", role: "Ayurveda Consultant", experience: "9 yrs" },
];

const ConsultantsPage = () => {
  const handleBookNow = (consultantName: string) => {
    // Here you can navigate to a booking page or open a modal
    alert(`Booking appointment with ${consultantName}`);
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-foreground mb-12">
        Our Expert Consultants
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {consultants.map((consultant, index) => (
          <Card
            key={index}
            className="p-6 text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white rounded-xl flex flex-col justify-between"
          >
            <CardContent className="p-0 flex flex-col items-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{consultant.name}</h3>
              <p className="text-sm text-muted-foreground">{consultant.role}</p>
              <p className="text-sm text-muted-foreground mb-4">{consultant.experience} Experience</p>
              <Button
                onClick={() => handleBookNow(consultant.name)}
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

export default ConsultantsPage;
