import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Search,
  MessageCircle,
  Calendar,
  CreditCard,
  Plane,
  Shield,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Clock,
  Globe,
  Award,
  Heart,
  MapPin,
  Camera,
  FileText,
  Phone,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Browse & Search",
      description:
        "Explore our network of verified travel agents from around the world. Filter by destination, specialty, rating, and more.",
      icon: Search,
      details: [
        "Browse 10,000+ verified travel agents",
        "Filter by location, specialty, and rating",
        "Read authentic reviews from travelers",
        "Compare agent profiles and expertise",
      ],
    },
    {
      number: "02",
      title: "Connect & Discuss",
      description:
        "Contact your chosen agent to discuss your travel preferences, budget, and dream destinations.",
      icon: MessageCircle,
      details: [
        "Direct messaging with travel agents",
        "Share your travel preferences",
        "Discuss budget and requirements",
        "Get expert recommendations",
      ],
    },
    {
      number: "03",
      title: "Get Your Itinerary",
      description:
        "Receive a personalized travel itinerary crafted specifically for your needs, complete with day-by-day plans.",
      icon: Calendar,
      details: [
        "Customized day-by-day itineraries",
        "Local insights and hidden gems",
        "Accommodation recommendations",
        "Activity and dining suggestions",
      ],
    },
    {
      number: "04",
      title: "Book & Pay Securely",
      description:
        "Book your trip through our secure platform with full payment protection and customer support.",
      icon: CreditCard,
      details: [
        "Secure payment processing",
        "Payment protection guarantee",
        "Flexible payment options",
        "24/7 customer support",
      ],
    },
    {
      number: "05",
      title: "Travel & Enjoy",
      description:
        "Embark on your perfectly planned journey with ongoing support from your travel agent.",
      icon: Plane,
      details: [
        "Real-time support during travel",
        "Local contact information",
        "Emergency assistance",
        "Post-trip follow-up",
      ],
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Verified Agents",
      description:
        "All our travel agents are thoroughly vetted and verified for your peace of mind.",
    },
    {
      icon: Star,
      title: "Quality Guarantee",
      description:
        "We guarantee the quality of our services with a satisfaction guarantee.",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Access to local experts in 50+ countries worldwide.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support for your travel needs.",
    },
  ];

  const faqs = [
    {
      question: "How do I choose the right travel agent?",
      answer:
        "Look for agents with high ratings, relevant experience in your destination, and specialties that match your travel style. Read reviews and check their response time.",
    },
    {
      question: "What if I need to cancel my trip?",
      answer:
        "Cancellation policies vary by agent and package. All policies are clearly stated before booking, and our customer support team can help with any changes.",
    },
    {
      question: "Are the travel agents really local experts?",
      answer:
        "Yes! Our agents are either locals or have extensive experience living and working in their destinations. They provide insider knowledge you won't find in guidebooks.",
    },
    {
      question: "How does payment work?",
      answer:
        "All payments are processed securely through our platform. You can pay by credit card, bank transfer, or other secure methods. Payment protection is included.",
    },
    {
      question: "What if something goes wrong during my trip?",
      answer:
        "Your agent provides ongoing support during your trip. Plus, our 24/7 customer support team is always available for emergencies or urgent assistance.",
    },
  ];

  const agentBenefits = [
    {
      icon: Users,
      title: "Access to Customers",
      description:
        "Connect with travelers from around the world looking for your expertise.",
    },
    {
      icon: Award,
      title: "Professional Tools",
      description:
        "Use our platform to create stunning itineraries and manage bookings.",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Get paid securely and on time for every booking.",
    },
    {
      icon: Heart,
      title: "Build Your Brand",
      description:
        "Showcase your expertise and build a reputation in the travel industry.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=800&fit=crop"
            alt="Beautiful landscape representing travel journey"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/70"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 text-white">
          <Badge variant="secondary" className="mb-4">
            🌍 How Wanderly Works
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Your Perfect Trip in
            <span className="text-primary block">5 Simple Steps</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Connect with local travel experts who create personalized
            experiences just for you. From planning to traveling, we're with you
            every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link to="/browse-agents">
                Start Planning Your Trip
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link to="/join-as-agent">Become a Travel Agent</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-12 md:space-y-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 1;

              return (
                <div
                  key={index}
                  className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${isEven ? "md:grid-flow-col-dense" : ""}`}
                >
                  <div className={isEven ? "md:col-start-2" : ""}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                        {step.number}
                      </div>
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={isEven ? "md:col-start-1" : ""}>
                    <Card className="border-2 border-primary/20 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="aspect-square relative">
                          {index === 0 && (
                            <img
                              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=600&fit=crop"
                              alt="Browse and search travel agents"
                              className="w-full h-full object-cover"
                            />
                          )}
                          {index === 1 && (
                            <img
                              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop"
                              alt="Connect and discuss with travel expert"
                              className="w-full h-full object-cover"
                            />
                          )}
                          {index === 2 && (
                            <img
                              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=600&fit=crop"
                              alt="Get personalized travel itinerary"
                              className="w-full h-full object-cover"
                            />
                          )}
                          {index === 3 && (
                            <img
                              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=600&fit=crop"
                              alt="Secure booking and payment"
                              className="w-full h-full object-cover"
                            />
                          )}
                          {index === 4 && (
                            <img
                              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=600&fit=crop"
                              alt="Travel and enjoy your perfect trip"
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                              <Icon className="h-12 w-12 text-primary" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=800&fit=crop"
            alt="Travel planning background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative z-10 bg-muted/80 backdrop-blur-sm py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Wanderly?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're committed to making your travel experience extraordinary
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <CardTitle>{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* For Travel Agents */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                For Travel Agents
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Grow Your Travel Business
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join our network of professional travel agents and connect with
                customers worldwide. Use our platform to showcase your expertise
                and grow your business.
              </p>

              <div className="space-y-4 mb-8">
                {agentBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">{benefit.title}</h4>
                        <p className="text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button size="lg" asChild>
                <Link to="/join-as-agent">
                  Join as Travel Agent
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-6">
              {/* Agent Success Image */}
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop"
                  alt="Successful travel agent working with customers"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
                  <div className="text-white p-6">
                    <h4 className="text-xl font-bold mb-2">Join Our Success</h4>
                    <p className="text-white/90">
                      Start growing your travel business today
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">10K+</div>
                    <div className="text-sm text-muted-foreground">
                      Active Customers
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-muted-foreground">
                      Countries
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">4.9</div>
                    <div className="text-sm text-muted-foreground">
                      Average Rating
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm text-muted-foreground">
                      Success Rate
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/30 relative">
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about planning your trip with Wanderly
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3">{faq.question}</h4>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Button variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of travelers who trust Wanderly for their perfect
            trips. Your dream destination is waiting.
          </p>
          <Button size="lg" variant="secondary">
            <Link to="/browse-agents">
              Find Your Travel Agent
              <Plane className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
