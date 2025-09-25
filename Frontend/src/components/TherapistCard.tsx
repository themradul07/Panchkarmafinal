import { Star, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TherapistCardProps {
  therapist: {
    id: string;
    name: string;
    designation: string;
    experience: number;
    clinic: string;
    specializations: string[];
    rating: number;
    totalReviews: number;
    image: string;
    location: string;
  };
  onViewProfile: (id: string) => void;
}

export function TherapistCard({ therapist, onViewProfile }: TherapistCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-rating text-rating"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <Card className="group overflow-hidden bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Therapist Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={therapist.image}
                alt={therapist.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-primary/10"
              />
              <div className="absolute -bottom-1 -right-1 bg-ayurvedic text-ayurvedic-foreground text-xs px-2 py-1 rounded-full font-medium">
                {therapist.experience}y
              </div>
            </div>
          </div>

          {/* Therapist Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {therapist.name}
                </h3>
                <p className="text-muted-foreground text-sm font-medium">
                  {therapist.designation}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {renderStars(therapist.rating)}
                <span className="text-sm text-muted-foreground ml-1">
                  ({therapist.totalReviews})
                </span>
              </div>
            </div>

            {/* Clinic & Location */}
            <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{therapist.clinic} • {therapist.location}</span>
            </div>

            {/* Specializations */}
            <div className="flex flex-wrap gap-1 mb-4">
              {therapist.specializations.slice(0, 3).map((spec) => (
                <Badge key={spec} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
              {therapist.specializations.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{therapist.specializations.length - 3}
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={() => onViewProfile(therapist.id)}
                variant="default"
                size="sm"
                className="flex-1 sm:flex-initial"
              >
                View Profile
              </Button>
              <Button
                variant="default"
                size="sm"
                className="flex-1 sm:flex-initial"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}