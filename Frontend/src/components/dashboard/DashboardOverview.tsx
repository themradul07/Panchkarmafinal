import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  TrendingUp, 
  FileText, 
  Bell, 
  Leaf, 
  Clock,
  CheckCircle2,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-wellness-light/50 to-mint/30 rounded-lg p-6 border border-wellness-light">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary mb-2">Welcome back, John</h1>
            <p className="text-muted-foreground">Continue your healing journey with Panchkarma</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Session */}
        <Card className="border-wellness-light/50 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Session</CardTitle>
            <Calendar className="w-4 h-4 text-wellness" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Tomorrow</div>
            <p className="text-xs text-muted-foreground mt-1">
              Abhyanga Massage - 10:00 AM
            </p>
            <Badge variant="secondary" className="mt-2 text-xs bg-wellness-light text-wellness">
              <Clock className="w-3 h-3 mr-1" />
              1 day remaining
            </Badge>
          </CardContent>
        </Card>

        {/* Current Progress */}
        <Card className="border-wellness-light/50 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Progress</CardTitle>
            <TrendingUp className="w-4 h-4 text-wellness" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">78%</div>
            <div className="mt-2">
              <Progress value={78} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              7 of 9 sessions completed
            </p>
          </CardContent>
        </Card>

        {/* Last Report */}
        <Card className="border-wellness-light/50 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Latest Report</CardTitle>
            <FileText className="w-4 h-4 text-wellness" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3 days ago</div>
            <p className="text-xs text-muted-foreground mt-1">
              Progress Assessment Report
            </p>
            <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-wellness hover:text-wellness/80">
              View Report <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Trends */}
        <Card className="border-wellness-light/50">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <TrendingUp className="w-5 h-5 mr-2" />
              Progress Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Energy Levels</span>
                <div className="flex items-center">
                  <Progress value={85} className="w-20 h-2 mr-2" />
                  <span className="text-sm font-medium text-wellness">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sleep Quality</span>
                <div className="flex items-center">
                  <Progress value={72} className="w-20 h-2 mr-2" />
                  <span className="text-sm font-medium text-wellness">72%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Stress Levels</span>
                <div className="flex items-center">
                  <Progress value={35} className="w-20 h-2 mr-2" />
                  <span className="text-sm font-medium text-wellness">35%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="border-wellness-light/50">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <Bell className="w-5 h-5 mr-2" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-wellness-light/20 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-wellness mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Session Reminder</p>
                  <p className="text-xs text-muted-foreground">
                    Abhyanga Massage tomorrow at 10:00 AM
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-accent/20 rounded-lg">
                <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Daily Tip</p>
                  <p className="text-xs text-muted-foreground">
                    Start your day with warm water and lemon for better digestion
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Tip Highlight */}
      <Card className="border-accent/30 bg-gradient-to-r from-accent/10 to-sage/10">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary">Today's Wellness Tip</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Practice deep breathing for 5 minutes after meals to improve digestion and promote calmness.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};