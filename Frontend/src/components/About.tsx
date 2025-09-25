import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();

  const handleScheduleClick = () => {
    navigate("/consultants"); 
  };
  const stats = [
    { icon: Users, number: "5000+", label: "Patients Healed", color: "text-primary" },
    { icon: Heart, number: "98%", label: "Success Rate", color: "text-accent" },
    { icon: Award, number: "25+", label: "Years Experience", color: "text-primary-light" },
    { icon: Leaf, number: "15+", label: "Authentic Therapies", color: "text-accent-light" },
  ];

  const benefits = [
    {
      title: "Complete Detoxification",
      description: "Remove toxins and purify your body through authentic Panchakarma treatments"
    },
    {
      title: "Natural Rejuvenation", 
      description: "Restore vitality and energy with time-tested Ayurvedic healing methods"
    },
    {
      title: "Mind-Body Balance",
      description: "Achieve harmony between physical health and mental well-being"
    },
    {
      title: "Personalized Care",
      description: "Customized treatment plans based on your unique constitution and needs"
    }
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            The Healing Power of <span className="text-primary">Panchakarma</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Panchakarma is the cornerstone of Ayurvedic medicine - a comprehensive detoxification 
            and rejuvenation program that cleanses the body of toxins while restoring natural balance and vitality.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center p-6 card-hover bg-gradient-to-br from-card to-secondary/50 border-0 shadow-soft">
                <CardContent className="p-0">
                  <IconComponent className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <h3 className="text-3xl font-bold text-foreground mb-2">{stat.number}</h3>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 card-hover bg-gradient-to-br from-card to-secondary/30 border-0 shadow-card">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Begin Your Healing Journey?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our expert practitioners are here to guide you through personalized Panchakarma treatments 
              tailored to your unique needs and constitution.
            </p>
            <button
      onClick={handleScheduleClick}
      className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-300 wellness-glow"
    >
      Schedule Consultation
    </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;