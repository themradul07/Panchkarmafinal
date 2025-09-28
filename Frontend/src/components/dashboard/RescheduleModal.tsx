import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/use-toast';
import { format } from 'date-fns';
import { Edit } from 'lucide-react';

interface Session {
  id: number;
  therapy: string;
  date: string;
  time: string;
  therapist: string;
}

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedSession: Session) => void;
  session?: Session;
  isNew?: boolean;
}

export const RescheduleModal = ({ isOpen, onClose, onSubmit, session, isNew = false }: RescheduleModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(session ? new Date(session.date) : new Date());
  const [selectedTime, setSelectedTime] = useState<string>(session?.time || '10:00 AM');
  const [therapist, setTherapist] = useState<string>(session?.therapist || '');
  const { toast } = useToast();

  // Mock time slots (10 AM - 6 PM, 30 min intervals)
  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM',
    '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'
  ];

  // Mock therapists
  const therapists = ['Dr. Priya Sharma', 'Dr. Raj Kumar', 'Dr. Meera Patel'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !therapist) {
      toast({
        title: 'Incomplete form',
        description: 'Please select date, time, and therapist.',
        variant: 'destructive',
      });
      return;
    }

    const updatedSession: Session = {
      id: session?.id || Date.now(),
      therapy: session?.therapy || 'New Session',
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      therapist,
    };

    onSubmit(updatedSession);
    toast({
      title: isNew ? 'Session scheduled!' : 'Session rescheduled!',
      description: `Your ${isNew ? 'new' : 'updated'} session is confirmed.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Schedule New Session' : 'Reschedule Session'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mt-2"
                disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // Next 30 days
              />
            </div>

            <div>
              <Label htmlFor="time">Select Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger id="time" className="mt-2">
                  <SelectValue placeholder="Choose time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="therapist">Select Therapist</Label>
              <Select value={therapist} onValueChange={setTherapist}>
                <SelectTrigger id="therapist" className="mt-2">
                  <SelectValue placeholder="Choose therapist" />
                </SelectTrigger>
                <SelectContent>
                  {therapists.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!isNew && (
              <Input
                value={session?.therapy}
                readOnly
                className="bg-muted"
                placeholder="Therapy"
              />
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{isNew ? 'Schedule' : 'Reschedule'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
