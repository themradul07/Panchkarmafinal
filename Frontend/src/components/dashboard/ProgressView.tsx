import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Calendar, Leaf } from "lucide-react";

export const ProgressView = () => {
  const milestones = [
    { id: 1, title: "Initial Assessment", date: "2025-01-08", completed: true, icon: Leaf },
    { id: 2, title: "First Week Progress", date: "2025-01-15", completed: true, icon: Target },
    { id: 3, title: "Mid-Treatment Evaluation", date: "2025-01-22", completed: false, icon: TrendingUp },
    { id: 4, title: "Final Assessment", date: "2025-01-30", completed: false, icon: Leaf },
  ];

  const healthMetrics = [
    { name: "Energy Levels", current: 85, previous: 65, target: 90 },
    { name: "Sleep Quality", current: 72, previous: 55, target: 85 },
    { name: "Stress Levels", current: 35, previous: 60, target: 25 },
    { name: "Digestive Health", current: 78, previous: 50, target: 85 },
    { name: "Mental Clarity", current: 80, previous: 45, target: 90 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Progress Tracker</h1>
        <p className="text-muted-foreground">Monitor your healing journey and recovery milestones</p>
      </div>

      {/* Overall Progress */}
      <Card className="border-wellness-light/50">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <TrendingUp className="w-5 h-5 mr-2" />
            Overall Treatment Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Treatment Completion</span>
              <span className="text-2xl font-bold text-primary">78%</span>
            </div>
            <Progress value={78} className="h-3" />
            <p className="text-sm text-muted-foreground">
              7 of 9 scheduled sessions completed • 2 sessions remaining
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Target className="w-5 h-5 mr-2" />
            Health Metrics Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {healthMetrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{metric.name}</span>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-muted-foreground">
                      {metric.previous}% → 
                    </span>
                    <span className="font-semibold text-wellness">
                      {metric.current}%
                    </span>
                    <span className="text-muted-foreground">
                      (Target: {metric.target}%)
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={metric.current} className="h-2" />
                  <div 
                    className="absolute top-0 h-2 w-0.5 bg-accent rounded-full"
                    style={{ left: `${metric.target}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>Target: {metric.target}%</span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recovery Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Leaf className="w-5 h-5 mr-2" />
            Recovery Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div key={milestone.id} className="flex items-center space-x-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${milestone.completed 
                      ? 'bg-wellness text-white' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${
                        milestone.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {milestone.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {milestone.date}
                      </div>
                    </div>
                    {milestone.completed && (
                      <p className="text-sm text-wellness mt-1">✓ Completed</p>
                    )}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="absolute left-5 mt-10 w-px h-8 bg-border" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};