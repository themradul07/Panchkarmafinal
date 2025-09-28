import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useState } from 'react';

export const FeedbackView = () => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Feedback submitted:', { rating, feedback });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Patient Feedback</h1>
        <p className="text-muted-foreground">Share your experience with our services</p>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Star className="w-12 h-12 text-wellness mx-auto" />
              <h2 className="text-2xl font-bold text-primary">Thank you!</h2>
              <p className="text-muted-foreground">Your feedback has been submitted successfully.</p>
              <Button onClick={() => setSubmitted(false)} className="bg-wellness">
                Submit Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary mb-2">Patient Feedback</h1>
      <p className="text-muted-foreground">Share your experience with our services</p>

      <Card>
        <CardHeader>
          <CardTitle>Rate Your Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`w-8 h-8 rounded-full transition-colors ${
                    star <= rating ? 'bg-wellness text-wellness-foreground' : 'bg-muted'
                  }`}
                >
                  <Star className="w-4 h-4 mx-auto" fill={star <= rating ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
            <div>
              <label className="text-sm font-medium">Additional Comments</label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience..."
                className="mt-2"
                rows={4}
              />
            </div>
            <Button type="submit" className="bg-wellness" disabled={rating === 0}>
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Feedbacks (Mock) */}
      <Card>
        <CardHeader>
          <CardTitle>Your Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground italic">
            No recent feedback submitted. Your first one will appear here!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
