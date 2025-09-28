import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/use-toast';

interface HealthMetrics {
  energy: number;
  stress: number;
  digestion: number;
  sleep: number;
}

interface HealthLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (metrics: HealthMetrics) => void;
}

export const HealthLogModal = ({ isOpen, onClose, onSubmit }: HealthLogModalProps) => {
  const [metrics, setMetrics] = useState<HealthMetrics>({
    energy: 50,
    stress: 50,
    digestion: 50,
    sleep: 50,
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(metrics);
    toast({
      title: 'Health logged successfully!',
      description: 'Your health metrics have been updated.',
    });
    onClose();
    // Reset form
    setMetrics({ energy: 50, stress: 50, digestion: 50, sleep: 50 });
  };

  const updateMetric = (key: keyof HealthMetrics, value: number[]) => {
    setMetrics(prev => ({ ...prev, [key]: value[0] }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Log Your Daily Health</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <Label htmlFor="energy" className="text-sm font-medium">Energy Level (0-100)</Label>
                <Slider
                  id="energy"
                  value={[metrics.energy]}
                  onValueChange={(value) => updateMetric('energy', value)}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <div className="text-xs text-muted-foreground mt-1">{metrics.energy}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <Label htmlFor="stress" className="text-sm font-medium">Stress Level (0-100)</Label>
                <Slider
                  id="stress"
                  value={[metrics.stress]}
                  onValueChange={(value) => updateMetric('stress', value)}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <div className="text-xs text-muted-foreground mt-1">{metrics.stress}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <Label htmlFor="digestion" className="text-sm font-medium">Digestion Quality (0-100)</Label>
                <Slider
                  id="digestion"
                  value={[metrics.digestion]}
                  onValueChange={(value) => updateMetric('digestion', value)}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <div className="text-xs text-muted-foreground mt-1">{metrics.digestion}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <Label htmlFor="sleep" className="text-sm font-medium">Sleep Quality (0-100)</Label>
                <Slider
                  id="sleep"
                  value={[metrics.sleep]}
                  onValueChange={(value) => updateMetric('sleep', value)}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <div className="text-xs text-muted-foreground mt-1">{metrics.sleep}</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Log Health</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
