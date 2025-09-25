import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Wind, Flame, Mountain, Waves, Sparkles } from "lucide-react";
import { useState } from "react";
import TherapyBookingModal from "./TherapistBookingModal";
import { useToast } from "@/hooks/use-toast";

const Therapies = () => {
  const { toast } = useToast();
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const therapies = [
    // your therapy objects here...
     {
    icon: Droplets, // You can choose a relevant icon
    title: "Vamana",
    subtitle: "Therapeutic Emesis",
    description: "Induced vomiting to eliminate excess Kapha toxins, mainly for respiratory issues, obesity, and skin problems.",
    benefits: ["Eliminates Kapha Toxins", "Respiratory Relief", "Skin Health"],
    duration: "1-2 days",
    color: "from-blue-500/20 to-blue-300/20"
  },
  {
    icon: Flame,
    title: "Virechana",
    subtitle: "Purgation Therapy",
    description: "Using herbal laxatives to remove Pitta toxins, helpful for liver disorders, digestive issues, and skin diseases.",
    benefits: ["Detox Liver & Pitta", "Digestive Health", "Clear Skin"],
    duration: "1-3 days",
    color: "from-red-500/20 to-orange-400/20"
  },
  {
    icon: Waves,
    title: "Basti",
    subtitle: "Medicated Enema Therapy",
    description: "Cleanses the colon and balances Vata dosha, used for back pain, constipation, and neurological issues.",
    benefits: ["Colon Cleansing", "Balances Vata", "Back & Neurological Health"],
    duration: "3-7 days",
    color: "from-green-500/20 to-teal-400/20"
  },
  {
    icon: Wind,
    title: "Nasya",
    subtitle: "Nasal Therapy",
    description: "Nasal administration of oils or powders to cleanse the head region, sinuses, and respiratory tract; good for sinus, migraine, and mental clarity.",
    benefits: ["Sinus & Respiratory Health", "Mental Clarity", "Migraine Relief"],
    duration: "Daily (up to 7 days)",
    color: "from-indigo-500/20 to-purple-400/20"
  },
  {
    icon: Sparkles,
    title: "Raktamokshana",
    subtitle: "Bloodletting Therapy",
    description: "Removes toxins from the blood, used for skin disorders, hypertension, and inflammatory conditions.",
    benefits: ["Blood Detox", "Skin Health", "Reduces Inflammation"],
    duration: "1-2 days",
    color: "from-red-400/20 to-pink-300/20"
  }
  ];

  // Handlers
  const handleBookTherapy = (therapy) => {
    setSelectedTherapy(therapy);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTherapy(null);
  };

  const handleBookAppointment = () => {
    if (!selectedTherapy) return;
    toast({
      title: "Appointment Request Sent!",
      description: `We'll contact you soon to confirm your ${selectedTherapy.title} therapy appointment.`,
    });
    handleCloseModal();
  };

  return (
    <section id="therapies" className="section-padding bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Authentic Therapies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the healing power of traditional Ayurvedic therapies, each carefully designed 
            to address specific health concerns and promote overall well-being.
          </p>
        </div>

        {/* Therapies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapies.map((therapy, index) => {
            const IconComponent = therapy.icon;
            return (
              <Card key={index} className={`group card-hover border-0 shadow-card bg-gradient-to-br ${therapy.color} backdrop-blur-sm overflow-hidden relative`}>
                <CardHeader className="relative">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                      {therapy.duration}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground mb-2">{therapy.title}</CardTitle>
                  <p className="text-primary font-medium">{therapy.subtitle}</p>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-muted-foreground mb-6 leading-relaxed">{therapy.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Key Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {therapy.benefits.map((benefit, idx) => (
                        <span key={idx} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">{benefit}</span>
                      ))}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleBookTherapy(therapy)}
                    className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground font-medium group-hover:shadow-lg transition-all duration-300"
                  >
                    Book This Therapy
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">Not sure which therapy is right for you?</p>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4"
          >
            Get Personalized Consultation
          </Button>
        </div>
      </div>

      {/* Therapy Booking Modal */}
      <TherapyBookingModal
        therapy={selectedTherapy}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBookAppointment={handleBookAppointment}
      />
    </section>
  );
};

export default Therapies;