import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  MapPin,
  Star,
  Users,
  Globe,
  Calendar,
  Shield,
  Heart,
  Plane,
  Camera,
  Award,
  Clock,
  CheckCircle,
  Search,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();
  const features = [
    {
      icon: Search,
      title: "Find Expert Agents",
      description:
        "Connect with verified local travel agents who know their destinations inside out.",
    },
    {
      icon: Calendar,
      title: "Custom Itineraries",
      description:
        "Get personalized day-by-day travel plans crafted specifically for your preferences.",
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description:
        "Book with confidence through our secure platform with full payment protection.",
    },
    {
      icon: Heart,
      title: "Unforgettable Experiences",
      description:
        "Access hidden gems and authentic experiences only locals know about.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Travel Agents" },
    { number: "50+", label: "Countries" },
    { number: "100K+", label: "Happy Travelers" },
    { number: "4.9", label: "Average Rating" },
  ];

  const topAgents = [
    {
      name: "Sofia Rodriguez",
      location: "Barcelona, Spain",
      rating: 4.9,
      reviews: 127,
      specialties: ["Cultural Tours", "Food & Wine"],
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Kenji Tanaka",
      location: "Tokyo, Japan",
      rating: 5.0,
      reviews: 89,
      specialties: ["Traditional Culture", "Modern Cities"],
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Maria Santos",
      location: "Rio de Janeiro, Brazil",
      rating: 4.8,
      reviews: 156,
      specialties: ["Adventure", "Nature"],
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Browse & Connect",
      description:
        "Search for travel agents by destination, specialty, or rating. Read reviews and compare profiles.",
    },
    {
      step: "2",
      title: "Get Your Itinerary",
      description:
        "Work with your chosen agent to create a personalized travel plan that fits your style and budget.",
    },
    {
      step: "3",
      title: "Book & Travel",
      description:
        "Securely book your trip through our platform and enjoy your perfectly planned adventure.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🌍 {t("Trusted by 100K+ travelers worldwide")}
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
                  {t("Your Perfect Trip")}
                  <span className="text-primary block">{t("Starts Here")}</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                  {t("Connect with local travel experts who craft personalized itineraries just for you. Discover hidden gems and create unforgettable memories.")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button
                  size="lg"
                  className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 touch-manipulation"
                  asChild
                >
                  <Link to="/browse-agents">
                    {t("Find Travel Agents")}
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 touch-manipulation"
                  asChild
                >
                  <Link to="/join-as-agent">{t("Become an Agent")}</Link>
                </Button>
              </div>

              {/* Agent & Admin Access */}
              <div className="flex flex-col xs:flex-row gap-2 md:gap-3 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 touch-manipulation"
                  asChild
                >
                  <Link to="/agent/sign-in">Sign In as Agent</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 touch-manipulation"
                  asChild
                >
                  <Link to="/admin/sign-in">Admin Access</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 pt-6 w-full max-w-xs sm:max-w-none mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary">
                      {stat.number}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="border-2 border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-8 w-8 text-primary" />
                        <div>
                          <div className="font-semibold">Local Experts</div>
                          <div className="text-sm text-muted-foreground">
                            Insider knowledge
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Star className="h-8 w-8 text-accent" />
                        <div>
                          <div className="font-semibold">4.9��� Rating</div>
                          <div className="text-sm text-muted-foreground">
                            Verified reviews
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4 pt-8">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-8 w-8 text-green-500" />
                        <div>
                          <div className="font-semibold">Secure</div>
                          <div className="text-sm text-muted-foreground">
                            Protected payments
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-accent/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Globe className="h-8 w-8 text-accent" />
                        <div>
                          <div className="font-semibold">50+ Countries</div>
                          <div className="text-sm text-muted-foreground">
                            Global network
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t("How Wanderly Works")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("Three simple steps to your perfect trip")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t("Why Choose Wanderly")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("Experience the difference of expert-crafted travel")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Agents */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                {t("Featured Travel Agents")}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t("Meet some of our top-rated travel experts")}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/browse-agents">View All Agents</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {topAgents.map((agent, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={agent.image} alt={agent.name} />
                      <AvatarFallback>
                        {agent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{agent.name}</h3>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {agent.location}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{agent.rating}</span>
                        </div>
                        <span className="text-muted-foreground">
                          ({agent.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t("Ready to Start Your Journey?")}
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            {t("Join thousands of travelers who trust Wanderly for their perfect trips. Your adventure is just a click away.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8"
              asChild
            >
              <Link to="/browse-agents">
                {t("Start Exploring")}
                <Plane className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link to="/join-as-agent">{t("Become an Agent")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
