import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  MapPin,
  Star,
  Calendar,
  Users,
  Clock,
  Heart,
  Share2,
  Download,
  Camera,
  CheckCircle,
  X,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Shield,
  Award,
  Plane,
  Utensils,
  Bed,
  Car,
  Info,
} from "lucide-react";
import { Package } from "@shared/packages";

export default function PackageDetail() {
  const { id } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  // Mock package data - in real app, fetch by ID
  const pkg: Package = {
    id: "1",
    agentId: "agent-1",
    title: "Barcelona Cultural Heritage & Gastronomy Experience",
    description:
      "Immerse yourself in the vibrant culture and culinary traditions of Barcelona with this carefully curated 7-day experience. Led by local experts, you'll discover hidden gems, taste authentic Catalan cuisine, and explore architectural marvels that define this Mediterranean jewel. From the Gothic Quarter's narrow medieval streets to Gaudí's modernist masterpieces, every moment is designed to give you an authentic taste of Barcelona's soul.",
    shortDescription:
      "Explore Barcelona's architectural marvels and taste authentic Catalan cuisine with local experts.",
    price: 1250,
    currency: "USD",
    priceType: "per_person",
    originalPrice: 1450,
    duration: { days: 7, nights: 6 },
    destinations: ["Barcelona", "Girona", "Montserrat"],
    startLocation: "Barcelona Airport",
    endLocation: "Barcelona Airport",
    category: "cultural",
    themes: ["Food & Wine", "Architecture", "History", "Local Culture"],
    difficulty: "easy",
    media: [
      {
        id: "1",
        type: "image",
        url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=800&fit=crop",
        caption: "Barcelona skyline with Sagrada Familia",
      },
      {
        id: "2",
        type: "image",
        url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop",
        caption: "Park Güell colorful mosaics",
      },
      {
        id: "3",
        type: "image",
        url: "https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=1200&h=800&fit=crop",
        caption: "Traditional Catalan cuisine",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Gothic Quarter Discovery",
        description:
          "Welcome to Barcelona! Check into your hotel and begin with a walking tour of the Gothic Quarter.",
        activities: [
          "Airport pickup and hotel check-in",
          "Walking tour of Barrio Gótico",
          "Visit Cathedral of Barcelona",
          "Traditional tapas dinner",
        ],
        accommodation: "Hotel Casa Fuster (4-star)",
        meals: ["Dinner"],
        transportation: "Private transfer from airport",
        location: {
          name: "Gothic Quarter, Barcelona",
          coordinates: [41.3851, 2.1734],
        },
      },
      {
        day: 2,
        title: "Gaudí's Architectural Masterpieces",
        description:
          "Explore the iconic works of Antoni Gaudí, including Sagrada Familia and Park Güell.",
        activities: [
          "Sagrada Familia guided tour",
          "Casa Batlló visit",
          "Lunch at local restaurant",
          "Park Güell exploration",
          "Casa Milà (La Pedrera) tour",
        ],
        accommodation: "Hotel Casa Fuster (4-star)",
        meals: ["Breakfast", "Lunch"],
        transportation: "Private minibus",
        location: {
          name: "Eixample & Gràcia, Barcelona",
          coordinates: [41.4036, 2.1744],
        },
      },
      {
        day: 3,
        title: "Culinary Journey & Boqueria Market",
        description:
          "Dive deep into Catalan cuisine with market visits and cooking class.",
        activities: [
          "La Boqueria Market tour",
          "Cooking class with local chef",
          "Wine tasting session",
          "Visit to Santa Caterina Market",
          "Dinner at Michelin-recommended restaurant",
        ],
        accommodation: "Hotel Casa Fuster (4-star)",
        meals: ["Breakfast", "Lunch", "Dinner"],
        transportation: "Walking & metro",
        location: {
          name: "El Raval & Born, Barcelona",
          coordinates: [41.3818, 2.1713],
        },
      },
    ],
    inclusions: [
      {
        id: "1",
        category: "accommodation",
        item: "6 nights in 4-star hotel",
        description: "Double occupancy in central Barcelona",
      },
      {
        id: "2",
        category: "meals",
        item: "Daily breakfast",
        description: "Continental breakfast at hotel",
      },
      {
        id: "3",
        category: "meals",
        item: "4 lunches & 3 dinners",
        description: "At selected local restaurants",
      },
      {
        id: "4",
        category: "transportation",
        item: "Airport transfers",
        description: "Private transfers both ways",
      },
      {
        id: "5",
        category: "guide",
        item: "Professional local guide",
        description: "English-speaking guide for all tours",
      },
      {
        id: "6",
        category: "activities",
        item: "All entrance fees",
        description: "Museums, monuments, and attractions",
      },
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities",
      "Drinks not mentioned",
    ],
    minParticipants: 2,
    maxParticipants: 12,
    ageRequirements: { min: 16 },
    fitnessLevel: "low",
    languages: ["English", "Spanish", "Catalan"],
    availabilityCalendar: [],
    bookingPolicy: {
      cancellationPolicy:
        "Free cancellation up to 48 hours before departure. 50% refund for cancellations 24-48 hours prior.",
      paymentTerms:
        "50% deposit required at booking, remainder due 30 days before departure.",
      refundPolicy:
        "Full refund for cancellations 48+ hours prior to departure.",
    },
    specialOffers: [
      {
        id: "1",
        title: "Early Bird Discount",
        description: "Book 30 days in advance and save 20%",
        discountType: "percentage",
        discountValue: 20,
        validFrom: "2024-01-01",
        validTo: "2024-12-31",
        usedCount: 0,
      },
    ],
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    publishedAt: "2024-01-20",
    stats: {
      views: 324,
      inquiries: 28,
      bookings: 12,
      rating: 4.8,
      reviewCount: 15,
    },
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      accommodation: Bed,
      meals: Utensils,
      transportation: Car,
      activities: Camera,
      guide: Users,
      other: Info,
    };
    return icons[category as keyof typeof icons] || Info;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="grid lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              {pkg.media[activeImageIndex] ? (
                <img
                  src={pkg.media[activeImageIndex].url}
                  alt={pkg.media[activeImageIndex].caption}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {pkg.media.slice(1, 3).map((media, index) => (
              <div
                key={media.id}
                className="aspect-[4/3] rounded-lg overflow-hidden bg-muted cursor-pointer"
                onClick={() => setActiveImageIndex(index + 1)}
              >
                <img
                  src={media.url}
                  alt={media.caption}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
            {pkg.media.length > 3 && (
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted/80 flex items-center justify-center cursor-pointer">
                <div className="text-center">
                  <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    +{pkg.media.length - 3} more
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="capitalize">
                  {pkg.category}
                </Badge>
                <Badge variant="outline">{pkg.difficulty}</Badge>
                {pkg.specialOffers.length > 0 && (
                  <Badge variant="destructive">Special Offer</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-4">{pkg.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{pkg.destinations.join(" • ")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {pkg.duration.days} days, {pkg.duration.nights} nights
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>
                    {pkg.minParticipants}-{pkg.maxParticipants} people
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>
                    {pkg.stats.rating} ({pkg.stats.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {pkg.themes.map((theme) => (
                  <Badge key={theme} variant="outline" className="text-xs">
                    {theme}
                  </Badge>
                ))}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {pkg.description}
              </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="itinerary" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">What's Included</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="itinerary" className="space-y-6">
                {pkg.itinerary.map((day) => (
                  <Card key={day.day}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          {day.day}
                        </div>
                        {day.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{day.description}</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Activities</h4>
                          <ul className="space-y-1">
                            {day.activities.map((activity, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium mb-1 flex items-center gap-1">
                              <Bed className="h-4 w-4" />
                              Accommodation
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {day.accommodation}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-medium mb-1 flex items-center gap-1">
                              <Utensils className="h-4 w-4" />
                              Meals
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {day.meals.join(", ")}
                            </p>
                          </div>

                          {day.transportation && (
                            <div>
                              <h4 className="font-medium mb-1 flex items-center gap-1">
                                <Car className="h-4 w-4" />
                                Transportation
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {day.transportation}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="inclusions" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        What's Included
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {pkg.inclusions.map((inclusion) => {
                          const Icon = getCategoryIcon(inclusion.category);
                          return (
                            <div key={inclusion.id} className="flex gap-3">
                              <Icon className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                              <div>
                                <p className="font-medium">{inclusion.item}</p>
                                {inclusion.description && (
                                  <p className="text-sm text-muted-foreground">
                                    {inclusion.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <X className="h-5 w-5 text-red-500" />
                        Not Included
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {pkg.exclusions.map((exclusion, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{exclusion}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements & Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Group Size</h4>
                        <p className="text-sm text-muted-foreground">
                          {pkg.minParticipants} - {pkg.maxParticipants}{" "}
                          participants
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Fitness Level</h4>
                        <Badge variant="outline" className="capitalize">
                          {pkg.fitnessLevel}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Languages</h4>
                        <p className="text-sm text-muted-foreground">
                          {pkg.languages.join(", ")}
                        </p>
                      </div>
                      {pkg.ageRequirements && (
                        <div>
                          <h4 className="font-medium mb-1">Age Requirements</h4>
                          <p className="text-sm text-muted-foreground">
                            {pkg.ageRequirements.min
                              ? `Minimum age: ${pkg.ageRequirements.min}`
                              : "No age restrictions"}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Policy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Cancellation</h4>
                        <p className="text-sm text-muted-foreground">
                          {pkg.bookingPolicy.cancellationPolicy}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Payment</h4>
                        <p className="text-sm text-muted-foreground">
                          {pkg.bookingPolicy.paymentTerms}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Refund Policy</h4>
                        <p className="text-sm text-muted-foreground">
                          {pkg.bookingPolicy.refundPolicy}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Customer reviews coming soon...</p>
                      <p className="text-sm">
                        See what other travelers say about this experience
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="sticky top-4 z-10 space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  {pkg.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(pkg.originalPrice, pkg.currency)}
                    </span>
                  )}
                  <div className="text-3xl font-bold text-primary">
                    {formatPrice(pkg.price, pkg.currency)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {pkg.priceType.replace("_", " ")}
                  </div>
                  {pkg.specialOffers.length > 0 && (
                    <Badge variant="destructive" className="mt-2">
                      Save {pkg.specialOffers[0].discountValue}% - Early Bird
                    </Badge>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <Dialog
                    open={showInquiryDialog}
                    onOpenChange={setShowInquiryDialog}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg">
                        Send Inquiry
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send Inquiry</DialogTitle>
                        <DialogDescription>
                          Get in touch with the travel agent for more
                          information about this package.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your name" />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="travelers">Travelers</Label>
                            <Input
                              id="travelers"
                              type="number"
                              placeholder="2"
                              min="1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="date">Preferred Date</Label>
                            <Input id="date" type="date" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Tell us about your travel preferences..."
                            rows={4}
                          />
                        </div>
                        <Button className="w-full">Send Inquiry</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button onClick={() => alert("Booking coming soon!")}>Book Now</Button>

                  <div className="flex gap-2">
                    <Button
                      variant={isSaved ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setIsSaved(!isSaved)}
                    >
                      <Heart
                        className={`h-4 w-4 mr-1 ${
                          isSaved
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        const url = `${window.location.origin}/package/${pkg.id}`;
                        if (navigator.share) {
                          navigator.share({ title: pkg.title, url });
                        } else {
                          navigator.clipboard.writeText(url);
                          alert("Link copied to clipboard!");
                        }
                      }}
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.print()}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="text-xs text-muted-foreground text-center">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Secure booking with payment protection
                </div>
              </CardContent>
            </Card>

            {/* Agent Info */}
            <Card>
              <CardHeader>
                <CardTitle>Your Travel Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt="Sofia Rodriguez" />
                    <AvatarFallback>SR</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Sofia Rodriguez</h3>
                    <p className="text-sm text-muted-foreground">
                      Barcelona Local Expert
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.9 (127 reviews)</span>
                      <Award className="h-3 w-3 text-primary ml-2" />
                      <span className="text-xs text-primary">Verified</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Local Barcelona expert with 8+ years of experience.
                  Specializes in cultural tours and culinary experiences.
                </p>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      const user = localStorage.getItem("user");
                      if (!user) {
                        alert("Please log in to message this agent.");
                        return;
                      }
                      navigate(`/chat/agent/${pkg.agentId}`);
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Agent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      window.open("tel:+34600123456"); // Replace with real agent phone if available
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Agent
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
