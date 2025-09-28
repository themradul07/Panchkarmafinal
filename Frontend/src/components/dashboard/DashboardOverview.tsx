import { useState, useEffect } from "react";
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
  Lightbulb,
  Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import healthData, { HealthDataPoint } from "@/data/healthData";
import { HealthLogModal } from "./HealthLogModal";

export const DashboardOverview = () => {
  const [healthMetrics, setHealthMetrics] = useState<HealthDataPoint[]>(healthData);
  const [period, setPeriod] = useState(30);
  const [showLogModal, setShowLogModal] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    console.log('Fetching health logs...');
    // In real: fetch('/api/health-logs').then(res => setHealthMetrics(res.data));
  }, []);

  const filteredData = healthMetrics.slice(-period);

  const addHealthLog = (metrics: { energy: number; stress: number; digestion: number; sleep: number }) => {
    const today = new Date().toISOString().split('T')[0];
    const newLog: HealthDataPoint = {
      date: today,
      ...metrics,
    };
    setHealthMetrics(prev => [...prev, newLog]);
    // In real: POST '/api/health-logs'
    console.log('Logging health:', newLog);
  };

  const currentMetrics = filteredData[filteredData.length - 1] || { energy: 0, stress: 0, digestion: 0, sleep: 0 };

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

      <HealthLogModal
        isOpen={showLogModal}
        onClose={() => setShowLogModal(false)}
        onSubmit={addHealthLog}
      />

      {/* Summary Cards */}
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

      {/* Main Content Grid - Health Trends and Right Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Health Trends - Left Column (col-span-3) */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-wellness-light/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center text-primary">
                <TrendingUp className="w-5 h-5 mr-2" />
                Health Trends
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Select value={period.toString()} onValueChange={(value) => setPeriod(Number(value))}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => setShowLogModal(true)} size="sm" className="bg-wellness">
                  Log Health
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { key: 'energy', label: 'Energy', stroke: '#3B82F6' },
                  { key: 'stress', label: 'Stress', stroke: '#EF4444' },
                  { key: 'digestion', label: 'Digestion', stroke: '#10B981' },
                  { key: 'sleep', label: 'Sleep', stroke: '#8B5CF6' },
                ].map(({ key, label, stroke }) => (
                  <div key={key} className="text-center">
                    <div className="h-24">
                      <ResponsiveContainer width="100%" height={96}>
                        <LineChart data={filteredData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="date" hide />
                          <YAxis hide />
                          <Tooltip />
                          <Line type="monotone" dataKey={key as keyof HealthDataPoint} stroke={stroke} strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-muted-foreground">{label}</p>
                      <p className="text-lg font-bold text-primary">{currentMetrics[key as keyof HealthDataPoint] || 0}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panels - Upcoming Sessions & Tip (col-span-1) */}
        <div className="space-y-6">
          {/* Upcoming Sessions */}
          <Card className="border-wellness-light/50">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Calendar className="w-5 h-5 mr-2" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-wellness-light/10 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Abhyanga Massage</p>
                  <p className="text-xs text-muted-foreground">Tomorrow • 10:00 AM</p>
                  <p className="text-xs text-muted-foreground truncate">Dr. Priya Sharma</p>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-accent/10 rounded-lg">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Shirodhara</p>
                  <p className="text-xs text-muted-foreground">Jan 17 • 2:00 PM</p>
                  <p className="text-xs text-muted-foreground truncate">Dr. Raj Kumar</p>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  View All Sessions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Today's Wellness Tip */}
          <Card className="border-accent/30 bg-gradient-to-r from-accent/10 to-sage/10">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-accent-foreground" />
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
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <Button variant="outline" className="bg-wellness-light text-wellness hover:bg-wellness/20">
          <Leaf className="w-4 h-4 mr-2" />
          Log Health
        </Button>
        <Button variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/20">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Reports
        </Button>
        <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Session
        </Button>
      </div>
    </div>
  );
};
