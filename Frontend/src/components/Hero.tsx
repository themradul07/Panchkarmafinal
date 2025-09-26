import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Leaf, Star } from "lucide-react";
import heroImage from "@/assets/ayurveda-hero-bg.jpg";
import logo from "../assets/logo.png";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
    <div 
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${heroImage})` }}
>
  {/* Smooth bottom fade */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-gray-950/40"></div>
</div>

      {/* Content */}
      <div className="relative container mx-auto px-4 z-10 -mt-8 md:-mt-16">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          {/* Logo and Brand */}
         <div className="flex items-center justify-center mt-0">
            <img 
              src={logo} 
              alt="AyurSutra - Panchakarma Wellness Center" 
              className="h-40 md:h-56 lg:h-72 w-auto" // Increased size for all breakpoints
            />
          </div>
          
          {/* Tagline */}
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 fade-in-up">
            Reviving Wellness through Panchakarma
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed fade-in-up opacity-90">
            Experience the ancient wisdom of Panchakarma - a holistic approach to detoxification, 
            rejuvenation, and healing. Our authentic therapies restore balance to your body, 
            mind, and spirit through time-tested Ayurvedic practices.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 mb-8 fade-in-up">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-accent text-accent" />
              <span className="text-sm">5000+ Patients Healed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-accent text-accent" />
              <span className="text-sm">25+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-accent text-accent" />
              <span className="text-sm">100% Natural Therapies</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 fade-in-up">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent-light text-accent-foreground font-semibold px-8 py-4 text-lg group wellness-glow"
              onClick={() => navigate('/login')}
            >
              Go To Dashboard
            </Button>
              <a href="#contact">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent-light text-accent-foreground font-semibold px-8 py-4 text-lg group wellness-glow"
                >
                  Ask for Help
                </Button>
              </a>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <Leaf className="h-16 w-16 text-accent float-animation" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <Leaf className="h-12 w-12 text-accent float-animation" style={{ animationDelay: "2s" }} />
      </div>
    </section>
  );
};

export default Hero;


