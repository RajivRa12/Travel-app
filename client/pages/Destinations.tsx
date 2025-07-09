import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Search,
  MapPin,
  Star,
  Users,
  Calendar,
  Plane,
  Camera,
  Mountain,
  Waves,
  Building,
  TreePine,
  Landmark,
  ArrowRight,
} from "lucide-react";

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const destinations = [
    {
      id: "1",
      name: "Barcelona, Spain",
      country: "Spain",
      continent: "Europe",
      image:
        "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop",
      description:
        "Vibrant city known for Gaudí's architecture, beautiful beaches, and rich culture.",
      highlights: [
        "Sagrada Familia",
        "Park Güell",
        "Las Ramblas",
        "Gothic Quarter",
      ],
      agentCount: 45,
      packageCount: 127,
      rating: 4.8,
      category: "Cultural",
      icon: Building,
      bestTime: "Apr-Jun, Sep-Nov",
      priceRange: "$150-400/day",
    },
    {
      id: "2",
      name: "Tokyo, Japan",
      country: "Japan",
      continent: "Asia",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      description:
        "Modern metropolis blending traditional culture with cutting-edge technology.",
      highlights: [
        "Shibuya Crossing",
        "Senso-ji Temple",
        "Tsukiji Market",
        "Mount Fuji",
      ],
      agentCount: 38,
      packageCount: 89,
      rating: 4.9,
      category: "Urban",
      icon: Building,
      bestTime: "Mar-May, Sep-Nov",
      priceRange: "$200-500/day",
    },
    {
      id: "3",
      name: "Rio de Janeiro, Brazil",
      country: "Brazil",
      continent: "South America",
      image:
        "https://images.unsplash.com/photo-1544356260-b9b1b9e31e7c?w=800&h=600&fit=crop",
      description:
        "Stunning beaches, vibrant culture, and breathtaking natural landscapes.",
      highlights: [
        "Christ the Redeemer",
        "Copacabana Beach",
        "Sugarloaf Mountain",
        "Carnival",
      ],
      agentCount: 29,
      packageCount: 67,
      rating: 4.7,
      category: "Beach",
      icon: Waves,
      bestTime: "Apr-Jun, Aug-Oct",
      priceRange: "$100-300/day",
    },
    {
      id: "4",
      name: "Santorini, Greece",
      country: "Greece",
      continent: "Europe",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop",
      description:
        "Iconic white buildings, stunning sunsets, and crystal-clear waters.",
      highlights: ["Oia Sunset", "Blue Domes", "Red Beach", "Wine Tasting"],
      agentCount: 32,
      packageCount: 78,
      rating: 4.9,
      category: "Romance",
      icon: Waves,
      bestTime: "Apr-Jun, Sep-Oct",
      priceRange: "$180-450/day",
    },
    {
      id: "5",
      name: "Bali, Indonesia",
      country: "Indonesia",
      continent: "Asia",
      image:
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
      description:
        "Tropical paradise with ancient temples, lush rice terraces, and pristine beaches.",
      highlights: [
        "Ubud Rice Terraces",
        "Tanah Lot Temple",
        "Seminyak Beach",
        "Mount Batur",
      ],
      agentCount: 41,
      packageCount: 156,
      rating: 4.8,
      category: "Tropical",
      icon: TreePine,
      bestTime: "Apr-Oct",
      priceRange: "$80-250/day",
    },
    {
      id: "6",
      name: "Machu Picchu, Peru",
      country: "Peru",
      continent: "South America",
      image:
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop",
      description: "Ancient Incan citadel high in the Andes Mountains.",
      highlights: [
        "Machu Picchu Ruins",
        "Huayna Picchu",
        "Inca Trail",
        "Sacred Valley",
      ],
      agentCount: 23,
      packageCount: 45,
      rating: 4.9,
      category: "Adventure",
      icon: Mountain,
      bestTime: "May-Sep",
      priceRange: "$120-350/day",
    },
    {
      id: "7",
      name: "Paris, France",
      country: "France",
      continent: "Europe",
      image:
        "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
      description: "The City of Light, famous for art, fashion, and romance.",
      highlights: [
        "Eiffel Tower",
        "Louvre Museum",
        "Notre-Dame",
        "Champs-Élysées",
      ],
      agentCount: 52,
      packageCount: 198,
      rating: 4.7,
      category: "Cultural",
      icon: Landmark,
      bestTime: "Apr-Jun, Sep-Oct",
      priceRange: "$200-500/day",
    },
    {
      id: "8",
      name: "Dubai, UAE",
      country: "United Arab Emirates",
      continent: "Asia",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
      description:
        "Ultra-modern city with luxury shopping, ultramodern architecture, and nightlife.",
      highlights: [
        "Burj Khalifa",
        "Dubai Mall",
        "Palm Jumeirah",
        "Desert Safari",
      ],
      agentCount: 35,
      packageCount: 112,
      rating: 4.6,
      category: "Luxury",
      icon: Building,
      bestTime: "Nov-Mar",
      priceRange: "$250-600/day",
    },
  ];

  const continents = [
    "all",
    "Europe",
    "Asia",
    "South America",
    "North America",
    "Africa",
    "Oceania",
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent =
      selectedContinent === "all" || dest.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      Cultural: "bg-purple-100 text-purple-800",
      Urban: "bg-blue-100 text-blue-800",
      Beach: "bg-cyan-100 text-cyan-800",
      Romance: "bg-pink-100 text-pink-800",
      Tropical: "bg-green-100 text-green-800",
      Adventure: "bg-orange-100 text-orange-800",
      Luxury: "bg-yellow-100 text-yellow-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Top Travel Destinations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing destinations around the world with expert local
            guides
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select
                value={selectedContinent}
                onValueChange={setSelectedContinent}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Continent" />
                </SelectTrigger>
                <SelectContent>
                  {continents.map((continent) => (
                    <SelectItem key={continent} value={continent}>
                      {continent === "all" ? "All Continents" : continent}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="agents">Most Agents</SelectItem>
                  <SelectItem value="name">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-center text-muted-foreground">
            Showing {filteredDestinations.length} destinations
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredDestinations.map((destination) => {
            const Icon = destination.icon;
            return (
              <Card
                key={destination.id}
                className="overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge
                      className={getCategoryColor(destination.category)}
                      variant="secondary"
                    >
                      {destination.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg mb-1">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {destination.description}
                    </p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {destination.rating}
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        {destination.priceRange}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{destination.agentCount} agents</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{destination.packageCount} packages</span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <strong>Best time:</strong> {destination.bestTime}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1" asChild>
                      <Link
                        to={`/browse-agents?destination=${encodeURIComponent(destination.name)}`}
                      >
                        View Agents
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      asChild
                    >
                      <Link
                        to={`/packages?destination=${encodeURIComponent(destination.name)}`}
                      >
                        Packages
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-3">
                    <div className="text-xs text-muted-foreground mb-2">
                      Popular attractions:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights
                        .slice(0, 2)
                        .map((highlight, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      {destination.highlights.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{destination.highlights.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Can't Find Your Dream Destination?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our travel agents cover destinations worldwide. Browse our agent
            network or let us help you find the perfect expert for your dream
            trip.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/browse-agents">
                Browse All Agents
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/packages">View All Packages</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
