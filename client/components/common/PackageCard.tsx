import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";
import { Package } from "@shared/packages";

interface PackageCardProps {
  package: Package;
  showAgent?: boolean;
  variant?: "grid" | "list";
}

export default function PackageCard({
  package: pkg,
  showAgent = true,
  variant = "grid",
}: PackageCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      adventure: "bg-orange-100 text-orange-800",
      cultural: "bg-purple-100 text-purple-800",
      relaxation: "bg-blue-100 text-blue-800",
      family: "bg-green-100 text-green-800",
      honeymoon: "bg-pink-100 text-pink-800",
      business: "bg-gray-100 text-gray-800",
      group: "bg-yellow-100 text-yellow-800",
      solo: "bg-indigo-100 text-indigo-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const handleShare = () => {
    const url = `${window.location.origin}/package/${pkg.id}`;
    if (navigator.share) {
      navigator.share({
        title: pkg.title,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  if (variant === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-80 relative">
            <div className="aspect-[4/3] md:h-48 bg-muted relative overflow-hidden">
              {pkg.media.length > 0 && pkg.media[0].type === "image" ? (
                <img
                  src={pkg.media[0].url}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                </div>
              )}

              {/* Media count indicator */}
              {pkg.media.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  <Camera className="h-3 w-3" />
                  {pkg.media.length}
                </div>
              )}

              {/* Favorite button */}
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
              </button>

              {/* Special offer badge */}
              {pkg.specialOffers.length > 0 && (
                <div className="absolute top-2 left-2">
                  <Badge variant="destructive" className="text-xs">
                    Special Offer
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getCategoryColor(pkg.category)}>
                    {pkg.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {pkg.difficulty}
                  </Badge>
                </div>

                <Link to={`/package/${pkg.id}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                    {pkg.title}
                  </h3>
                </Link>

                <p className="text-muted-foreground mb-3 line-clamp-2">
                  {pkg.shortDescription}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{pkg.destinations.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {pkg.duration.days}D/{pkg.duration.nights}N
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>
                      {pkg.minParticipants}-{pkg.maxParticipants} people
                    </span>
                  </div>
                </div>

                {showAgent && (
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="Agent" />
                      <AvatarFallback>AG</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Travel Agent Name</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">
                          {pkg.stats.rating} ({pkg.stats.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-right ml-6">
                <div className="mb-2">
                  {pkg.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(pkg.originalPrice, pkg.currency)}
                    </span>
                  )}
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(pkg.price, pkg.currency)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {pkg.priceType.replace("_", " ")}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <Link to={`/package/${pkg.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="relative">
        {/* Image */}
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          {pkg.media.length > 0 && pkg.media[0].type === "image" ? (
            <img
              src={pkg.media[0].url}
              alt={pkg.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Camera className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          {/* Media count indicator */}
          {pkg.media.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
              <Camera className="h-3 w-3" />
              {pkg.media.length}
            </div>
          )}

          {/* Favorite button */}
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>

          {/* Special offer badge */}
          {pkg.specialOffers.length > 0 && (
            <div className="absolute top-2 left-2">
              <Badge variant="destructive" className="text-xs">
                Special Offer
              </Badge>
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge className={getCategoryColor(pkg.category)} variant="secondary">
            {pkg.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {pkg.difficulty}
          </Badge>
        </div>

        <Link to={`/package/${pkg.id}`}>
          <h3 className="font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
            {pkg.title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {pkg.shortDescription}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{pkg.destinations.join(", ")}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                {pkg.duration.days}D/{pkg.duration.nights}N
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>
                {pkg.minParticipants}-{pkg.maxParticipants}
              </span>
            </div>
          </div>
        </div>

        {showAgent && (
          <div className="flex items-center gap-3 mb-4 pb-3 border-b">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Agent" />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Travel Agent Name</p>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {pkg.stats.rating} ({pkg.stats.reviewCount})
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Price and actions */}
        <div className="flex items-center justify-between">
          <div>
            {pkg.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(pkg.originalPrice, pkg.currency)}
              </span>
            )}
            <div className="text-lg font-bold text-primary">
              {formatPrice(pkg.price, pkg.currency)}
            </div>
            <div className="text-xs text-muted-foreground">
              {pkg.priceType.replace("_", " ")}
            </div>
          </div>

          <div className="flex gap-1">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button size="sm" asChild>
              <Link to={`/package/${pkg.id}`}>View</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
