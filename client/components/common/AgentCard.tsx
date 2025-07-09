import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, MessageCircle, Calendar } from "lucide-react";

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviewCount: number;
    specialties: string[];
    profileImage?: string;
    verified: boolean;
    responseTime: string;
    priceRange: string;
    completedTrips: number;
  };
}

export default function AgentCard({ agent }: AgentCardProps) {
  const navigate = useNavigate();
  const handleMessageClick = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please log in to message this agent.");
      return;
    }
    navigate(`/chat/agent/${agent.id}`);
  };
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <CardContent className="p-0">
        {/* Header with avatar and basic info */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarImage src={agent.profileImage} alt={agent.name} />
                <AvatarFallback>
                  {agent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {agent.verified && (
                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg truncate">{agent.name}</h3>
                {agent.verified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground flex items-center gap-1 mb-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{agent.location}</span>
              </p>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{agent.rating}</span>
                  <span className="text-muted-foreground">
                    ({agent.reviewCount})
                  </span>
                </div>
                <div className="text-muted-foreground">
                  {agent.completedTrips} trips
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {agent.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {agent.specialties.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{agent.specialties.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Stats and actions */}
        <div className="bg-muted/30 px-4 md:px-6 py-4">
          <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
              <span className="truncate">Responds in {agent.responseTime}</span>
            </div>
            <div className="font-medium text-foreground text-xs md:text-sm">
              {agent.priceRange}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1 h-9 md:h-10 text-xs md:text-sm touch-manipulation"
              size="sm"
              asChild
            >
              <Link to={`/agents/${agent.id}`}>View Profile</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 md:h-10 w-9 md:w-10 p-0 touch-manipulation"
              aria-label="Message agent"
              onClick={handleMessageClick}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
