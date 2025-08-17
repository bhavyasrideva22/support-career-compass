import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Brain, Target, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate("/assessment");
  };

  return (
    <div className="min-h-screen bg-assessment-gradient">
      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold text-foreground mb-6 animate-slide-in">
            Is Support Operations Coordination Your Next Career Move?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            An AI-driven adaptive readiness and fit evaluation to help you discover if Support Operations Coordination aligns with your skills, interests, and career goals.
          </p>
          <Button 
            onClick={handleStartAssessment}
            variant="hero" 
            size="lg" 
            className="text-lg px-8 py-3"
          >
            Start Assessment
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Comprehensive Career Assessment
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <Brain className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Psychometric Analysis</CardTitle>
                <CardDescription>
                  Evaluate personality compatibility, motivation, and cognitive style using proven frameworks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <Target className="h-10 w-10 text-accent mb-2" />
                <CardTitle>Technical Assessment</CardTitle>
                <CardDescription>
                  Test logical reasoning, domain knowledge, and familiarity with support operations tools
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-success mb-2" />
                <CardTitle>WISCAR Framework</CardTitle>
                <CardDescription>
                  Holistic readiness assessment across Will, Interest, Skill, Cognitive ability, Ability to learn, and Real-world alignment
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="px-6 py-16 bg-card">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            What You'll Discover
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Confidence Score</h3>
                  <p className="text-muted-foreground">Overall readiness rating for Support Operations Coordinator role</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Personalized Insights</h3>
                  <p className="text-muted-foreground">Detailed analysis of your strengths and improvement areas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Career Recommendations</h3>
                  <p className="text-muted-foreground">Specific next steps and alternative career paths</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Learning Path</h3>
                  <p className="text-muted-foreground">Customized skill development recommendations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Role Matches</h3>
                  <p className="text-muted-foreground">Compatible career opportunities based on your profile</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Skill Gap Analysis</h3>
                  <p className="text-muted-foreground">Identify areas for professional development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Overview Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            About Support Operations Coordination
          </h2>
          
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                Role Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Support Operations Coordinators ensure smooth functioning of support teams by managing workflows, 
                tracking KPIs, liaising between departments, and optimizing operational processes using tools like 
                CRM, ticketing, and reporting software.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Responsibilities</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Workflow management and optimization</li>
                    <li>• KPI tracking and reporting</li>
                    <li>• Cross-departmental coordination</li>
                    <li>• Process improvement initiatives</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Essential Skills</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Strong organizational abilities</li>
                    <li>• Analytical and problem-solving mindset</li>
                    <li>• Communication and collaboration</li>
                    <li>• CRM and ticketing system proficiency</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 text-center bg-primary/5">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Explore Your Career Fit?
          </h2>
          <p className="text-muted-foreground mb-8">
            Take our comprehensive 20-30 minute assessment to get personalized insights 
            about your readiness for Support Operations Coordination.
          </p>
          <Button 
            onClick={handleStartAssessment}
            variant="hero" 
            size="lg"
            className="text-lg px-12 py-3"
          >
            Begin Your Assessment
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;