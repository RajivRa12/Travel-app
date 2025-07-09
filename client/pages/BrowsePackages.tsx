import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PackageCard from "@/components/common/PackageCard";
import PackageFilters from "@/components/common/PackageFilters";
import { Search, Grid3X3, List, MapPin } from "lucide-react";
import { Package, PackageFilter } from "@shared/packages";
import { useTranslation } from "react-i18next";

export default function BrowsePackages() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [filters, setFilters] = useState<PackageFilter>({});

  // Mock data for packages
  const packages: Package[] = [
    {
      id: "1",
      agentId: "agent-1",
      title: "Barcelona Cultural Heritage & Gastronomy Experience",
      description:
        "Immerse yourself in Barcelona's rich culture and culinary traditions",
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
      themes: ["Food & Wine", "Architecture", "History"],
      difficulty: "easy",
      media: [
        {
          id: "1",
          type: "image",
          url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop",
          caption: "Barcelona skyline",
        },
      ],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 2,
      maxParticipants: 12,
      fitnessLevel: "low",
      languages: ["English", "Spanish", "Catalan"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 48 hours before",
        paymentTerms: "50% deposit required",
        refundPolicy: "Full refund for cancellations 48+ hours prior",
      },
      specialOffers: [
        {
          id: "1",
          title: "Early Bird Discount",
          description: "20% off for bookings made 30 days in advance",
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
    },
    {
      id: "2",
      agentId: "agent-2",
      title: "Tokyo Modern & Traditional Discovery",
      description:
        "Experience the perfect blend of ancient traditions and cutting-edge modernity",
      shortDescription:
        "From serene temples to bustling tech districts, discover all facets of Tokyo.",
      price: 2100,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 10, nights: 9 },
      destinations: ["Tokyo", "Nikko", "Kamakura"],
      startLocation: "Narita Airport",
      endLocation: "Narita Airport",
      category: "cultural",
      themes: ["Traditional Culture", "Modern Cities", "Technology"],
      difficulty: "moderate",
      media: [
        {
          id: "2",
          type: "image",
          url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
          caption: "Tokyo at night",
        },
      ],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 1,
      maxParticipants: 8,
      fitnessLevel: "medium",
      languages: ["English", "Japanese"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 72 hours before",
        paymentTerms: "30% deposit required",
        refundPolicy: "Full refund for cancellations 72+ hours prior",
      },
      specialOffers: [],
      status: "active",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      publishedAt: "2024-01-18",
      stats: {
        views: 489,
        inquiries: 35,
        bookings: 8,
        rating: 4.9,
        reviewCount: 12,
      },
    },
    {
      id: "3",
      agentId: "agent-3",
      title: "Brazilian Adventure: Rio to Amazon",
      description: "Experience Brazil's vibrant culture and pristine nature",
      shortDescription:
        "From Rio's beaches to Amazon rainforest, discover Brazil's natural wonders.",
      price: 1800,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 12, nights: 11 },
      destinations: ["Rio de Janeiro", "Manaus", "Amazon Rainforest"],
      startLocation: "Rio de Janeiro Airport",
      endLocation: "Manaus Airport",
      category: "adventure",
      themes: ["Nature", "Wildlife", "Beaches", "Culture"],
      difficulty: "challenging",
      media: [
        {
          id: "3",
          type: "image",
          url: "https://images.unsplash.com/photo-1544356260-b9b1b9e31e7c?w=800&h=600&fit=crop",
          caption: "Amazon rainforest",
        },
      ],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 4,
      maxParticipants: 16,
      fitnessLevel: "high",
      languages: ["English", "Portuguese"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 14 days before",
        paymentTerms: "40% deposit required",
        refundPolicy: "Partial refund for cancellations 14+ days prior",
      },
      specialOffers: [],
      status: "active",
      createdAt: "2024-01-08",
      updatedAt: "2024-01-16",
      publishedAt: "2024-01-16",
      stats: {
        views: 267,
        inquiries: 19,
        bookings: 5,
        rating: 4.7,
        reviewCount: 8,
      },
    },
    {
      id: "4",
      agentId: "agent-4",
      title: "Egyptian Mysteries: Cairo & Luxor Explorer",
      description:
        "Uncover the secrets of ancient Egypt with expert archaeologists",
      shortDescription:
        "Visit pyramids, temples, and tombs with professional archaeological guides.",
      price: 1650,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 8, nights: 7 },
      destinations: ["Cairo", "Luxor", "Valley of Kings"],
      startLocation: "Cairo Airport",
      endLocation: "Cairo Airport",
      category: "cultural",
      themes: ["History", "Architecture", "Archaeology"],
      difficulty: "moderate",
      media: [
        {
          id: "4",
          type: "image",
          url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=600&fit=crop",
          caption: "Great Pyramid of Giza",
        },
      ],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 6,
      maxParticipants: 20,
      fitnessLevel: "medium",
      languages: ["English", "Arabic"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 7 days before",
        paymentTerms: "50% deposit required",
        refundPolicy: "Full refund for cancellations 7+ days prior",
      },
      specialOffers: [],
      status: "active",
      createdAt: "2024-01-12",
      updatedAt: "2024-01-19",
      publishedAt: "2024-01-19",
      stats: {
        views: 412,
        inquiries: 31,
        bookings: 9,
        rating: 4.6,
        reviewCount: 11,
      },
    },
    {
      id: "5",
      agentId: "agent-5",
      title: "London Royal Heritage & Modern Culture",
      description:
        "Experience London's royal history and contemporary cultural scene",
      shortDescription:
        "From royal palaces to modern galleries, discover London's rich heritage.",
      price: 1450,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 6, nights: 5 },
      destinations: ["London", "Windsor", "Greenwich"],
      startLocation: "Heathrow Airport",
      endLocation: "Heathrow Airport",
      category: "cultural",
      themes: ["Royal Heritage", "Museums", "Art"],
      difficulty: "easy",
      media: [
        {
          id: "5",
          type: "image",
          url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
          caption: "London skyline",
        },
      ],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 2,
      maxParticipants: 15,
      fitnessLevel: "low",
      languages: ["English"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 48 hours before",
        paymentTerms: "30% deposit required",
        refundPolicy: "Full refund for cancellations 48+ hours prior",
      },
      specialOffers: [],
      status: "active",
      createdAt: "2024-01-14",
      updatedAt: "2024-01-21",
      publishedAt: "2024-01-21",
      stats: {
        views: 356,
        inquiries: 24,
        bookings: 7,
        rating: 4.8,
        reviewCount: 9,
      },
    },
    {
      id: "6",
      agentId: "agent-6",
      title: "Mumbai Bollywood & Street Food Adventure",
      description:
        "Dive into Mumbai's film industry and incredible street food culture",
      shortDescription:
        "Experience Bollywood studios and taste authentic Mumbai street food.",
      price: 850,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 5, nights: 4 },
      destinations: ["Mumbai", "Film City"],
      startLocation: "Mumbai Airport",
      endLocation: "Mumbai Airport",
      category: "cultural",
      themes: ["Bollywood", "Street Food", "Local Culture"],
      difficulty: "easy",
      media: [
        {
          id: "6",
          type: "image",
          url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop",
          caption: "Mumbai street scene",
        },
      ],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 3,
      maxParticipants: 12,
      fitnessLevel: "low",
      languages: ["English", "Hindi", "Marathi"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 24 hours before",
        paymentTerms: "25% deposit required",
        refundPolicy: "Full refund for cancellations 24+ hours prior",
      },
      specialOffers: [],
      status: "active",
      createdAt: "2024-01-16",
      updatedAt: "2024-01-22",
      publishedAt: "2024-01-22",
      stats: {
        views: 198,
        inquiries: 16,
        bookings: 4,
        rating: 4.7,
        reviewCount: 6,
      },
    },
    {
      id: "7",
      agentId: "agent-7",
      title: "Paris Art & Romance Getaway",
      description: "Experience the art, food, and romance of Paris with guided tours and exclusive experiences.",
      shortDescription: "Louvre, Eiffel Tower, Seine cruise, and more.",
      price: 2200,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 7, nights: 6 },
      destinations: ["Paris", "Versailles"],
      startLocation: "Charles de Gaulle Airport",
      endLocation: "Charles de Gaulle Airport",
      category: "cultural",
      themes: ["Art", "Romance", "Food & Wine"],
      difficulty: "easy",
      media: [
        { id: "7", type: "image", url: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop", caption: "Eiffel Tower at sunset" },
      ],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 2,
      maxParticipants: 10,
      fitnessLevel: "low",
      languages: ["English", "French"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 7 days before",
        paymentTerms: "50% deposit required",
        refundPolicy: "Full refund for cancellations 7+ days prior",
      },
      specialOffers: [],
      status: "active",
      createdAt: "2024-01-18",
      updatedAt: "2024-01-22",
      publishedAt: "2024-01-22",
      stats: { views: 210, inquiries: 12, bookings: 5, rating: 4.8, reviewCount: 7 },
    },
    {
      id: "8",
      agentId: "agent-8",
      title: "Moroccan Desert Adventure",
      description: "Camel trekking, Berber camps, and the magic of the Sahara.",
      shortDescription: "Sahara dunes, Marrakech, and Atlas Mountains.",
      price: 1750,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 8, nights: 7 },
      destinations: ["Marrakech", "Sahara Desert", "Atlas Mountains"],
      startLocation: "Marrakech Airport",
      endLocation: "Marrakech Airport",
      category: "adventure",
      themes: ["Desert", "Culture", "Adventure"],
      difficulty: "moderate",
      media: [
        { id: "8", type: "image", url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=600&fit=crop", caption: "Sahara Desert camp" },
      ],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 4,
      maxParticipants: 16,
      fitnessLevel: "medium",
      languages: ["English", "French", "Arabic"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 10 days before",
        paymentTerms: "40% deposit required",
        refundPolicy: "Partial refund for cancellations 10+ days prior",
      },
      specialOffers: [],
      status: "active",
      createdAt: "2024-01-20",
      updatedAt: "2024-01-23",
      publishedAt: "2024-01-23",
      stats: { views: 180, inquiries: 10, bookings: 4, rating: 4.7, reviewCount: 6 },
    },
    {
      id: "9",
      agentId: "agent-9",
      title: "Bali Wellness & Yoga Retreat",
      description: "Rejuvenate your mind and body in Bali’s tranquil settings with daily yoga and spa treatments.",
      shortDescription: "Yoga, meditation, spa, and healthy cuisine.",
      price: 1600,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 10, nights: 9 },
      destinations: ["Ubud", "Seminyak", "Canggu"],
      startLocation: "Ngurah Rai Airport",
      endLocation: "Ngurah Rai Airport",
      category: "relaxation",
      themes: ["Wellness", "Yoga", "Nature"],
      difficulty: "easy",
      media: [
        { id: "9", type: "image", url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop", caption: "Bali yoga retreat" },
      ],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 6,
      maxParticipants: 20,
      fitnessLevel: "low",
      languages: ["English", "Indonesian"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 5 days before",
        paymentTerms: "30% deposit required",
        refundPolicy: "Full refund for cancellations 5+ days prior",
      },
      specialOffers: [],
      status: "active",
      createdAt: "2024-01-22",
      updatedAt: "2024-01-25",
      publishedAt: "2024-01-25",
      stats: { views: 150, inquiries: 8, bookings: 3, rating: 4.9, reviewCount: 5 },
    },
    {
      id: "10",
      agentId: "agent-10",
      title: "New Zealand Adventure Explorer",
      description: "Hiking, bungee jumping, and breathtaking landscapes across New Zealand’s North and South Islands.",
      shortDescription: "Queenstown, Rotorua, Milford Sound, and more.",
      price: 3200,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 14, nights: 13 },
      destinations: ["Auckland", "Queenstown", "Rotorua", "Milford Sound"],
      startLocation: "Auckland Airport",
      endLocation: "Queenstown Airport",
      category: "adventure",
      themes: ["Adventure", "Nature", "Hiking"],
      difficulty: "challenging",
      media: [
        { id: "10", type: "image", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop", caption: "Milford Sound, New Zealand" },
      ],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 4,
      maxParticipants: 12,
      fitnessLevel: "high",
      languages: ["English"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 14 days before",
        paymentTerms: "50% deposit required",
        refundPolicy: "Partial refund for cancellations 14+ days prior",
      },
      specialOffers: [],
      status: "active",
      createdAt: "2024-01-24",
      updatedAt: "2024-01-28",
      publishedAt: "2024-01-28",
      stats: { views: 120, inquiries: 6, bookings: 2, rating: 4.8, reviewCount: 4 },
    },
    {
      id: "11",
      agentId: "agent-11",
      title: "Canadian Rockies Road Trip",
      description: "Drive through the stunning Canadian Rockies, visit Banff, Jasper, and Lake Louise.",
      shortDescription: "Banff, Jasper, Lake Louise, Icefields Parkway.",
      price: 2500,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 9, nights: 8 },
      destinations: ["Banff", "Jasper", "Lake Louise"],
      startLocation: "Calgary Airport",
      endLocation: "Calgary Airport",
      category: "adventure",
      themes: ["Road Trip", "Nature", "Mountains"],
      difficulty: "moderate",
      media: [
        { id: "11", type: "image", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop", caption: "Lake Louise, Canada" },
      ],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 2,
      maxParticipants: 8,
      fitnessLevel: "medium",
      languages: ["English", "French"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 10 days before",
        paymentTerms: "40% deposit required",
        refundPolicy: "Full refund for cancellations 10+ days prior",
      },
      specialOffers: [],
      status: "active",
      createdAt: "2024-01-26",
      updatedAt: "2024-01-29",
      publishedAt: "2024-01-29",
      stats: { views: 100, inquiries: 5, bookings: 2, rating: 4.7, reviewCount: 3 },
    },
    {
      id: "12",
      agentId: "agent-12",
      title: "South African Safari & Cape Town",
      description: "Wildlife safaris in Kruger, wine tasting in Stellenbosch, and Cape Town’s vibrant culture.",
      shortDescription: "Kruger Park, Cape Town, Stellenbosch, Table Mountain.",
      price: 3400,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 12, nights: 11 },
      destinations: ["Kruger Park", "Cape Town", "Stellenbosch", "Table Mountain"],
      startLocation: "Johannesburg Airport",
      endLocation: "Cape Town Airport",
      category: "adventure",
      themes: ["Safari", "Wine", "Culture"],
      difficulty: "moderate",
      media: [
        { id: "12", type: "image", url: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=800&h=600&fit=crop", caption: "Safari in South Africa" },
      ],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 4,
      maxParticipants: 14,
      fitnessLevel: "medium",
      languages: ["English", "Afrikaans"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 15 days before",
        paymentTerms: "50% deposit required",
        refundPolicy: "Partial refund for cancellations 15+ days prior",
      },
      specialOffers: [],
      status: "active",
      createdAt: "2024-01-28",
      updatedAt: "2024-01-31",
      publishedAt: "2024-01-31",
      stats: { views: 90, inquiries: 4, bookings: 1, rating: 4.9, reviewCount: 2 },
    },
  ];

  // Filtering logic
  const filteredPackages = packages.filter((pkg) => {
    // Destinations
    if (filters.destinations && filters.destinations.length > 0) {
      const match = filters.destinations.some((dest) =>
        pkg.destinations.includes(dest)
      );
      if (!match) return false;
    }
    // Category
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.includes(pkg.category)) return false;
    }
    // Price Range
    if (filters.priceRange && filters.priceRange.length === 2) {
      if (pkg.price < filters.priceRange[0] || pkg.price > filters.priceRange[1]) return false;
    }
    // Duration
    if (filters.duration && filters.duration.length === 2) {
      const days = pkg.duration.days;
      if (days < filters.duration[0] || days > filters.duration[1]) return false;
    }
    // Difficulty
    if (filters.difficulty && filters.difficulty.length > 0) {
      if (!filters.difficulty.includes(pkg.difficulty)) return false;
    }
    // Minimum Rating
    if (filters.minRating && pkg.stats.rating < filters.minRating) return false;
    // Themes (advanced)
    if (filters.themes && filters.themes.length > 0) {
      const match = filters.themes.some((theme) =>
        pkg.themes.includes(theme)
      );
      if (!match) return false;
    }
    // Languages (advanced)
    if (filters.languages && filters.languages.length > 0) {
      const match = filters.languages.some((lang) =>
        pkg.languages.includes(lang)
      );
      if (!match) return false;
    }
    return true;
  });

  // Pagination logic (use filteredPackages)
  const [page, setPage] = useState(1);
  const packagesPerPage = 4;
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);
  const paginatedPackages = filteredPackages.slice((page - 1) * packagesPerPage, page * packagesPerPage);

  const handleFiltersChange = (newFilters: PackageFilter) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const getActiveFiltersCount = () => {
    return Object.keys(filters).filter((key) => {
      const value = filters[key as keyof PackageFilter];
      return Array.isArray(value) ? value.length > 0 : value !== undefined;
    }).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("Travel Packages")}</h1>
          <p className="text-muted-foreground">
            {t("Discover curated travel experiences from expert local agents")}
          </p>
        </div>

        {/* Search and Quick Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search packages, destinations, or themes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="duration-short">
                    Duration: Short to Long
                  </SelectItem>
                  <SelectItem value="duration-long">
                    Duration: Long to Short
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick filter badges */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {filters.destinations?.map((dest) => (
                <Badge key={dest} variant="secondary">
                  <MapPin className="h-3 w-3 mr-1" />
                  {dest}
                </Badge>
              ))}
              {filters.category?.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
              {filters.priceRange && (
                <Badge variant="secondary">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-6 px-2 text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 w-full border-t pt-6 lg:border-t-0 lg:pt-0">
            <PackageFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3 w-full">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-muted-foreground">
                  Showing {packages.length} packages
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results grid */}
            <div
              className={`space-y-6 ${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 space-y-0"
                  : ""
              }`}
              style={{ minWidth: 0 }}
            >
              {paginatedPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  variant={viewMode}
                  showAgent={true}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={page === i + 1 ? "default" : "outline"}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
