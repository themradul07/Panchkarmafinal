import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { therapistsData, Therapist } from "@/data/therapists";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Mail, Phone, MapPin, Star } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "sonner";

const stripePromise = loadStripe("your-publishable-key-here"); // Replace with your Stripe publishable key


const BookingForm = ({ therapist }: { therapist: Therapist }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    patientAge: "",
    therapyType: "",
    medicalConditions: "",
    therapyDate: "",
    therapyTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const availableTimeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { patientName, patientEmail, patientPhone, therapyType, therapyDate, therapyTime } = formData;

    if (!patientName.trim()) return "Patient name is required";
    if (!patientEmail.trim() || !/\S+@\S+\.\S+/.test(patientEmail)) return "Valid email is required";
    if (!patientPhone.trim()) return "Phone number is required";
    if (!therapyType) return "Please select a therapy type";
    if (!therapyDate) return "Please select a therapy date";
    if (!therapyTime) return "Please select a therapy time";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      return;
    }

    setLoading(true);
    // Simulate payment with test card (no backend)
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found.");
      setLoading(false);
      return;
    }
    // This is a mock, in real use you need a PaymentIntent from backend
    // Here we just simulate success for demo
    // After payment, send booking details to backend
    const bookingPayload = {
      ...formData,
      therapistId: therapist.id,
      consultationFee: therapist.consultationFee,
      status: "confirmed"
    };
    try {
      await axios.post("https://panchkarmafinal-xd1o.onrender.com/api/bookings", bookingPayload);
      setLoading(false);
      setSuccess(true);
      toast.success("Booking & payment successful!");
      setTimeout(() => {
        navigate("/therapists");
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError("Booking saved failed. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="text-green-600 text-4xl mb-4">✓</div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">Booking Confirmed!</h3>
          <p className="text-green-700">Your session has been successfully booked. You will receive a confirmation email shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Therapist Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <img
              src={therapist.image}
              alt={therapist.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg">{therapist.name}</h3>
              <p className="text-sm text-muted-foreground">{therapist.designation}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{therapist.clinic}, {therapist.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{therapist.rating} ({therapist.totalReviews} reviews)</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold text-primary">₹{therapist.consultationFee}</p>
            <p className="text-sm text-muted-foreground">Consultation Fee</p>
          </div>
        </CardContent>
      </Card>

      {/* Booking Form */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Patient Name *
                </Label>
                <Input
                  id="patientName"
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange("patientName", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="patientEmail" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="patientEmail"
                  type="email"
                  value={formData.patientEmail}
                  onChange={(e) => handleInputChange("patientEmail", e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="patientPhone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </Label>
                <Input
                  id="patientPhone"
                  type="tel"
                  value={formData.patientPhone}
                  onChange={(e) => handleInputChange("patientPhone", e.target.value)}
                  placeholder="+91 9876543210"
                  required
                />
              </div>
              <div>
                <Label htmlFor="patientAge">Age</Label>
                <Input
                  id="patientAge"
                  type="number"
                  value={formData.patientAge}
                  onChange={(e) => handleInputChange("patientAge", e.target.value)}
                  placeholder="Your age"
                  min="1"
                  max="120"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="therapyType" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Therapy Type *
              </Label>
              <Select value={formData.therapyType} onValueChange={(value) => handleInputChange("therapyType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select therapy type" />
                </SelectTrigger>
                <SelectContent>
                  {therapist.specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="medicalConditions">Medical Conditions (Optional)</Label>
              <Textarea
                id="medicalConditions"
                value={formData.medicalConditions}
                onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                placeholder="Please describe any relevant medical conditions or concerns..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="therapyDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Preferred Date *
                </Label>
                <Input
                  id="therapyDate"
                  type="date"
                  value={formData.therapyDate}
                  onChange={(e) => handleInputChange("therapyDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div>
                <Label htmlFor="therapyTime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Preferred Time *
                </Label>
                <Select value={formData.therapyTime} onValueChange={(value) => handleInputChange("therapyTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Payment Section */}
            <div className="border-t pt-6">
              <Label className="text-base font-semibold mb-4 block">Payment Information</Label>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving Booking...
                </div>
              ) : (
                `Complete Booking - ₹${therapist.consultationFee}`
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};


const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const therapist = therapistsData.find((t) => t.id === id);

  if (!therapist) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Therapist not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Book a Session with {therapist.name}</h1>
          <Elements stripe={stripePromise}>
            <BookingForm therapist={therapist} />
          </Elements>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;