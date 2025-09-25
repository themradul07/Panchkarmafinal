import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      age: 34,
      condition: "Chronic Back Pain",
      rating: 5,
      text: "After years of chronic back pain, I was skeptical about Ayurvedic treatment. But AyurSutra's Panchakarma program completely transformed my life. The Kati Basti therapy provided immediate relief, and the holistic approach addressed the root cause. I'm now pain-free and more energetic than ever!",
      treatment: "21-day Panchakarma + Kati Basti",
      image: "PS"
    },
    {
      name: "Rajesh Kumar",
      age: 42,
      condition: "Stress & Insomnia",
      rating: 5,
      text: "The Shirodhara treatment at AyurSutra was like a reset button for my mind. Years of corporate stress and sleepless nights melted away. The practitioners are incredibly knowledgeable and the environment is so peaceful. I now sleep like a baby and feel mentally clear.",
      treatment: "Shirodhara + Abhyanga",
      image: "RK"
    },
    {
      name: "Meera Patel",
      age: 29,
      condition: "Digestive Issues",
      rating: 5,
      text: "I suffered from severe digestive problems for years. Western medicine provided temporary relief, but AyurSutra's personalized Panchakarma program got to the root of the issue. My digestion is now perfect, I have more energy, and my skin glows!",
      treatment: "14-day Detox Program",
      image: "MP"
    },
    {
      name: "Dr. Anjali Verma",
      age: 38,
      condition: "Preventive Wellness",
      rating: 5,
      text: "As a medical professional, I was amazed by the scientific approach and effectiveness of AyurSutra's treatments. Their combination of traditional wisdom and modern hygiene standards is exceptional. I now recommend them to my patients and visit annually for preventive care.",
      treatment: "Annual Panchakarma Retreat",
      image: "AV"
    },
    {
      name: "Vikram Singh",
      age: 45,
      condition: "Joint Pain & Arthritis",
      rating: 5,
      text: "Arthritis had limited my mobility significantly. AyurSutra's specialized treatment plan with Abhyanga and herbal medicines has given me my life back. I can now play with my grandchildren and enjoy my morning walks without pain.",
      treatment: "Joint Care Program",
      image: "VS"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Stories of <span className="text-primary">Transformation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real experiences from real people who found healing and wellness through our authentic Panchakarma treatments.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="relative p-8 md:p-12 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-elevated overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/20" />
            
            <CardContent className="p-0">
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Patient Info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {currentTestimonial.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">{currentTestimonial.name}</h4>
                    <p className="text-muted-foreground">Age {currentTestimonial.age} • {currentTestimonial.condition}</p>
                  </div>
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-full">
                  <span className="text-primary font-medium text-sm">{currentTestimonial.treatment}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="rounded-full w-12 h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary scale-125" 
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="rounded-full w-12 h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">98%</h3>
            <p className="text-muted-foreground">Patient Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">5000+</h3>
            <p className="text-muted-foreground">Successful Treatments</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">4.9/5</h3>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;