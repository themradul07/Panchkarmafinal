import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to begin your journey to wellness? Contact us today to schedule your consultation 
            and discover how Panchakarma can transform your health.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-card">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl text-foreground">Send us a Message</CardTitle>
              <p className="text-muted-foreground">We'll get back to you within 24 hours</p>
            </CardHeader>
            
            <CardContent className="p-0">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <Input 
                      placeholder="Enter your first name"
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <Input 
                      placeholder="Enter your last name"
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input 
                    type="email"
                    placeholder="Enter your email"
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <Input 
                    type="tel"
                    placeholder="Enter your phone number"
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    How can we help you?
                  </label>
                  <Textarea 
                    placeholder="Tell us about your health concerns or which therapy you're interested in..."
                    className="bg-background border-border focus:border-primary min-h-[120px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground font-semibold py-4 wellness-glow"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact Cards */}
            <div className="grid gap-6">
              <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-card card-hover">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Visit Our Center</h3>
                      <p className="text-muted-foreground">123 Wellness Street, Ayurveda District, Mumbai 400001</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-card card-hover">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Call Us</h3>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-card card-hover">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email Us</h3>
                      <p className="text-muted-foreground">info@ayursutra.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-card card-hover">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Opening Hours</h3>
                      <p className="text-muted-foreground">Mon-Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-4">
              {/* <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 flex items-center justify-center space-x-2"
                size="lg"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp Us</span>
              </Button> */}
              
              <Button 
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold py-4"
                size="lg"
              >
                Book Consultation Call
              </Button>
            </div>

            {/* Map Placeholder */}
            <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-0 shadow-card">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-foreground font-medium">Interactive Map</p>
                    <p className="text-muted-foreground text-sm">Click to view directions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;