import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Calendar, ArrowLeft, Phone, Mail, Globe } from "lucide-react";
import { therapistsData, Therapist } from "@/data/therapists";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TherapistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState<Therapist | null>(null);

  useEffect(() => {
    if (id) {
      const foundTherapist = therapistsData.find(t => t.id === id);
      setTherapist(foundTherapist || null);
    }
  }, [id]);

  if (!therapist) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Therapist Not Found</h2>
            <p className="text-muted-foreground mb-6">The therapist you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/therapists")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Therapists
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-primary-foreground py-8">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/therapists")}
              className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Therapists
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Therapist Profile</h1>
              <p className="text-lg opacity-90">Detailed information about our certified Ayurveda specialist</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <div className="text-center">
                    <img
                      src={therapist.image}
                      alt={therapist.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary/10 mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-2">{therapist.name}</h2>
                    <p className="text-muted-foreground mb-4">{therapist.designation}</p>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex">
                        {renderStars(therapist.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {therapist.rating} ({therapist.totalReviews} reviews)
                      </span>
                    </div>

                    {/* Experience Badge */}
                    <Badge variant="secondary" className="mb-4">
                      {therapist.experience} Years Experience
                    </Badge>

                    {/* Clinic & Location */}
                    <div className="space-y-2 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{therapist.clinic}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>{therapist.location}</span>
                      </div>
                    </div>

                    {/* Consultation Fee */}
                    <div className="bg-primary/5 p-4 rounded-lg mb-6">
                      <p className="text-sm text-muted-foreground mb-1">Consultation Fee</p>
                      <p className="text-2xl font-bold text-primary">₹{therapist.consultationFee}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => navigate(`/therapists/${therapist.id}/book`)}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Session
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Therapist
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio */}
              <Card>
                <CardHeader>
                  <CardTitle>About {therapist.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{therapist.bio}</p>
                </CardContent>
              </Card>

              {/* Specializations */}
              <Card>
                <CardHeader>
                  <CardTitle>Specializations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {therapist.specializations.map((spec) => (
                      <Badge key={spec} variant="default">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle>Education & Qualifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {therapist.education.map((edu, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">{edu}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardHeader>
                  <CardTitle>Languages Spoken</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {therapist.languages.map((lang) => (
                      <Badge key={lang} variant="outline">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Patient Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(therapist.rating)}
                      </div>
                      <span className="text-lg font-semibold">{therapist.rating}</span>
                    </div>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="text-muted-foreground">
                      Based on {therapist.totalReviews} reviews
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TherapistProfile;
