import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Leaf, Heart, Brain, Utensils, RefreshCw } from "lucide-react";

export const TipsView = () => {
  const categories = [
    { id: "diet", name: "Diet", icon: Utensils, color: "text-accent", count: 12 },
    { id: "lifestyle", name: "Lifestyle", icon: Heart, color: "text-wellness", count: 8 },
    { id: "meditation", name: "Meditation", icon: Brain, color: "text-primary", count: 6 },
  ];

  const featuredTip = {
    category: "Diet",
    title: "Morning Detox Ritual",
    content: "Start your day with warm water mixed with lemon juice and a pinch of turmeric. This simple Ayurvedic practice helps detoxify your liver, boost digestion, and enhance your immune system naturally.",
    benefits: ["Improves digestion", "Detoxifies liver", "Boosts immunity", "Enhances metabolism"]
  };

  const dailyTips = [
    {
      id: 1,
      category: "Lifestyle",
      title: "Oil Pulling Benefits",
      content: "Swish coconut or sesame oil in your mouth for 10-15 minutes each morning to improve oral health and remove toxins.",
      icon: Leaf
    },
    {
      id: 2,
      category: "Meditation",
      title: "Pranayama Practice",
      content: "Practice deep breathing exercises for 5-10 minutes daily to calm your mind and balance your doshas.",
      icon: Brain
    },
    {
      id: 3,
      category: "Diet",
      title: "Mindful Eating",
      content: "Eat in a calm environment without distractions, chew slowly, and focus on the taste and texture of your food.",
      icon: Utensils
    },
  ];

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId.toLowerCase());
    return category ? category.icon : Lightbulb;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId.toLowerCase());
    return category ? category.color : "text-primary";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Tips & Guidance</h1>
          <p className="text-muted-foreground">Discover Ayurvedic wisdom for your daily wellness journey</p>
        </div>
        <Button className="bg-wellness hover:bg-wellness/90">
          <RefreshCw className="w-4 h-4 mr-2" />
          Get New Tip
        </Button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.id} className="border-wellness-light/50 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-wellness-light/20 rounded-lg flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} tips available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Featured Tip */}
      <Card className="border-accent/30 bg-gradient-to-r from-accent/5 to-sage/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-primary">
              <Lightbulb className="w-5 h-5 mr-2" />
              Featured Tip of the Day
            </CardTitle>
            <Badge variant="secondary" className="bg-accent/20 text-accent">
              {featuredTip.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold text-primary mb-3">{featuredTip.title}</h3>
          <p className="text-muted-foreground mb-4">{featuredTip.content}</p>
          <div className="space-y-2">
            <h4 className="font-medium text-primary">Benefits:</h4>
            <div className="grid grid-cols-2 gap-2">
              {featuredTip.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Leaf className="w-4 h-4 text-wellness" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Tips Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Heart className="w-5 h-5 mr-2" />
            Daily Wellness Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div
                  key={tip.id}
                  className="p-4 bg-wellness-light/10 rounded-lg border border-wellness-light/30 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-wellness-light/20 rounded-lg flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${getCategoryColor(tip.category)}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {tip.category}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-primary mb-2">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.content}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Leaf className="w-5 h-5 mr-2" />
            Personalized for Your Dosha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Vata-Pitta Constitution</h3>
                <p className="text-sm text-muted-foreground">Based on your assessment</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              For your constitution, focus on grounding and cooling practices. Stick to regular meal times, 
              favor warm, cooked foods, and practice calming meditation techniques.
            </p>
            <Button variant="outline" size="sm">
              View Full Dosha Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};