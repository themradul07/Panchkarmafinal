import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, X } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Therapy {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  duration: string;
  color: string;
}

interface TherapyBookingModalProps {
  therapy: Therapy | null;
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: () => void;
}

const TherapyBookingModal = ({ therapy, isOpen, onClose, onBookAppointment }: TherapyBookingModalProps) => {
  if (!therapy) return null;

  const IconComponent = therapy.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        {/* Header with gradient background */}
        <div className={`bg-gradient-to-br ${therapy.color} p-6 relative`}>
          <DialogHeader>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                <IconComponent className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-foreground mb-1">
                  {therapy.title}
                </DialogTitle>
                <p className="text-primary font-medium text-lg">{therapy.subtitle}</p>
              </div>
            </div>
          </DialogHeader>
          
          {/* Book Appointment Button - Top Right */}
          <Button
            onClick={onBookAppointment}
            className="absolute top-4 right-4 bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground font-medium shadow-lg"
            size="lg"
          >
            Book Appointment
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Duration Badge */}
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Badge variant="outline" className="text-sm">
              {therapy.duration}
            </Badge>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">About This Therapy</h3>
            <p className="text-muted-foreground leading-relaxed text-base">
              {therapy.description}
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Key Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {therapy.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onBookAppointment}
              className="flex-1 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground font-medium"
              size="lg"
            >
              Book This Therapy Now
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-muted-foreground/20 hover:bg-muted"
              size="lg"
            >
              Browse Other Therapies
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TherapyBookingModal;