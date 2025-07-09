import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, MessageCircle, Phone, Mail, Globe, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import agentsData from "./BrowseAgents";
import packagesData from "./BrowsePackages";

export default function AgentPublicProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  // Import or define the agents array as in BrowseAgents
  const agents = [
    {
      id: "1",
      name: "Sofia Rodriguez",
      location: "Barcelona, Spain",
      rating: 4.9,
      reviewCount: 127,
      specialties: ["Cultural Tours", "Food & Wine", "Architecture"],
      profileImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=400&h=400&fit=crop&crop=face",
      verified: true,
      responseTime: "2 hours",
      priceRange: "$150-300/day",
      completedTrips: 89,
      description: "Local Barcelona expert with 8+ years of experience. Specializes in cultural tours and culinary experiences.",
      experienceYears: 8,
      phone: "+34 600123456",
      email: "sofia@barcelonaexperts.com",
      website: "barcelonaexperts.com",
      facebook: "https://www.facebook.com/sofia.barcelona",
      instagram: "https://www.instagram.com/sofia.barcelona",
      linkedin: "https://www.linkedin.com/in/sofia-rodriguez-barcelona/",
    },
    {
      id: "2",
      name: "Kenji Tanaka",
      location: "Tokyo, Japan",
      rating: 5.0,
      reviewCount: 89,
      specialties: [
        "Traditional Culture",
        "Modern Cities",
        "Cherry Blossom Tours",
      ],
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      verified: true,
      responseTime: "1 hour",
      priceRange: "$200-400/day",
      completedTrips: 156,
      description: "Tokyo native with a passion for sharing both traditional and modern sides of Japan. Expert in cherry blossom tours.",
      experienceYears: 10,
      phone: "+81 9012345678",
      email: "kenji@tokyotours.jp",
      website: "tokyotours.jp",
      facebook: "https://www.facebook.com/kenji.tokyo",
      instagram: "https://www.instagram.com/kenji.tokyo",
      linkedin: "https://www.linkedin.com/in/kenji-tanaka-tokyo/",
    },
    {
      id: "3",
      name: "Maria Santos",
      location: "Rio de Janeiro, Brazil",
      rating: 4.8,
      reviewCount: 156,
      specialties: ["Adventure", "Nature", "Beaches"],
      profileImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      verified: true,
      responseTime: "3 hours",
      priceRange: "$100-250/day",
      completedTrips: 73,
      description: "Adventure and nature guide in Rio. Loves showing travelers the best beaches and hidden gems.",
      experienceYears: 7,
      phone: "+55 21987654321",
      email: "maria@riotravel.com",
      website: "riotravel.com",
      facebook: "https://www.facebook.com/maria.rio",
      instagram: "https://www.instagram.com/maria.rio",
      linkedin: "https://www.linkedin.com/in/maria-santos-rio/",
    },
    {
      id: "4",
      name: "Ahmed Hassan",
      location: "Cairo, Egypt",
      rating: 4.7,
      reviewCount: 203,
      specialties: ["Historical Sites", "Desert Safari", "Cultural Heritage"],
      verified: true,
      responseTime: "4 hours",
      priceRange: "$80-200/day",
      completedTrips: 94,
      description: "Egyptologist and desert safari expert. Deep knowledge of Cairo’s history and culture.",
      experienceYears: 12,
      phone: "+20 1001234567",
      email: "ahmed@egyptadventures.com",
      website: "egyptadventures.com",
      facebook: "https://www.facebook.com/ahmed.cairo",
      instagram: "https://www.instagram.com/ahmed.cairo",
      linkedin: "https://www.linkedin.com/in/ahmed-hassan-cairo/",
    },
    {
      id: "5",
      name: "Emma Thompson",
      location: "London, UK",
      rating: 4.9,
      reviewCount: 178,
      specialties: ["City Tours", "Museums", "Royal Heritage"],
      profileImage: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop&crop=face",
      verified: true,
      responseTime: "1 hour",
      priceRange: "$180-350/day",
      completedTrips: 112,
      description: "Londoner with a love for history, museums, and royal heritage. Offers immersive city tours.",
      experienceYears: 9,
      phone: "+44 7700123456",
      email: "emma@londonheritage.co.uk",
      website: "londonheritage.co.uk",
      facebook: "https://www.facebook.com/emma.london",
      instagram: "https://www.instagram.com/emma.london",
      linkedin: "https://www.linkedin.com/in/emma-thompson-london/",
    },
    {
      id: "6",
      name: "Raj Patel",
      location: "Mumbai, India",
      rating: 4.8,
      reviewCount: 145,
      specialties: ["Spiritual Tours", "Street Food", "Bollywood"],
      profileImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=400&fit=crop&crop=face",
      verified: true,
      responseTime: "2 hours",
      priceRange: "$60-150/day",
      completedTrips: 87,
      description: "Mumbai local specializing in spiritual tours, Bollywood, and street food adventures.",
      experienceYears: 6,
      phone: "+91 9812345678",
      email: "raj@mumbaiexpert.com",
      website: "mumbaiexpert.com",
      facebook: "https://www.facebook.com/raj.mumbai",
      instagram: "https://www.instagram.com/raj.mumbai",
      linkedin: "https://www.linkedin.com/in/raj-patel-mumbai/",
    },
    {
      id: "7",
      name: "Kerala Dreams",
      location: "Kochi, Kerala",
      rating: 4.9,
      reviewCount: 890,
      specialties: ["Backwater Tours", "Ayurveda Retreats", "Cultural Heritage", "Beach Holidays", "Wildlife Safaris"],
      profileImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop&crop=face",
      verified: true,
      responseTime: "2 hours",
      priceRange: "₹10,000-₹50,000",
      completedTrips: 200,
      description: "Discover the magic of God's Own Country with our curated Kerala experiences. From backwaters to Ayurveda, we bring you authentic Kerala hospitality and unforgettable journeys.",
      experienceYears: 6,
      phone: "+91 9876543210",
      email: "hello@keraladreams.com",
      website: "www.keraladreams.com",
      facebook: "https://facebook.com/keraladreams",
      instagram: "https://instagram.com/keraladreams",
      linkedin: "https://linkedin.com/company/keraladreams"
    },
  ];
  const agent = agents.find((a) => a.id === id);
  // Import or define the packages array as in BrowsePackages
  const allPackages = [
    {
      id: "1",
      agentId: "1",
      title: "Barcelona Cultural Heritage & Gastronomy Experience",
      description: "Immerse yourself in Barcelona's rich culture and culinary traditions with this carefully curated 7-day experience.",
      location: "Barcelona, Spain",
      days: 7,
      nights: 6,
      price: 1250,
      rating: 4.8,
      category: "Cultural",
    },
    {
      id: "2",
      agentId: "2",
      title: "Tokyo Modern & Traditional Discovery",
      description: "From serene temples to bustling tech districts, discover all facets of Tokyo.",
      location: "Tokyo, Japan",
      days: 10,
      nights: 9,
      price: 2100,
      rating: 4.9,
      category: "Cultural",
    },
    {
      id: "3",
      agentId: "3",
      title: "Rio Adventure & Nature Escape",
      description: "Explore Rio's best beaches and adventure spots with a local expert.",
      location: "Rio de Janeiro, Brazil",
      days: 5,
      nights: 4,
      price: 900,
      rating: 4.7,
      category: "Adventure",
    },
    {
      id: "4",
      agentId: "4",
      title: "Cairo Historical Wonders",
      description: "Discover the pyramids, museums, and desert safaris in Cairo.",
      location: "Cairo, Egypt",
      days: 6,
      nights: 5,
      price: 1100,
      rating: 4.6,
      category: "Cultural",
    },
    {
      id: "5",
      agentId: "5",
      title: "London Royal Heritage & Modern Culture",
      description: "From royal palaces to modern galleries, discover London's rich heritage.",
      location: "London, UK",
      days: 6,
      nights: 5,
      price: 1450,
      rating: 4.8,
      category: "Cultural",
    },
    {
      id: "6",
      agentId: "6",
      title: "Mumbai Bollywood & Street Food Adventure",
      description: "Experience Bollywood studios and taste authentic Mumbai street food.",
      location: "Mumbai, India",
      days: 5,
      nights: 4,
      price: 850,
      rating: 4.7,
      category: "Cultural",
    },
  ];
  const packages = allPackages.filter((pkg) => pkg.agentId === id);
  // For demo, show empty packages or filter if you have agentId in packages
  const [showContact, setShowContact] = useState(false);
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

  // Helper to mask phone/email
  function maskPhone(phone) {
    if (!phone) return '';
    return phone.slice(0, 3) + ' xxxx ' + phone.slice(-4);
  }
  function maskEmail(email) {
    if (!email) return '';
    const [name, domain] = email.split('@');
    if (!name || !domain) return email;
    return name.slice(0, 3) + 'xxxx' + name.slice(-1) + '@' + domain.slice(0, 2) + 'xxxx' + domain.slice(-2);
  }
  // Handler for protected contact actions
  function handleProtectedAction(action) {
    if (!user) {
      alert('You need to login to get contact details.');
      return;
    }
    action();
  }
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-8 max-w-5xl">
        {/* Back to Dashboard/Home Button */}
        <button
          className="mb-6 flex items-center gap-2 text-sm text-primary hover:underline focus:outline-none"
          onClick={() => {
            if (user && user.role === 'agent' && user.id === id) {
              navigate('/agent/dashboard');
            } else {
              navigate('/');
            }
          }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {user && user.role === 'agent' && user.id === id ? 'Back to Dashboard' : 'Back to Home'}
        </button>

        {/* Agent Not Found */}
        {!agent ? (
          <div className="flex flex-col items-center justify-center py-24">
            <h2 className="text-2xl font-bold mb-2">Agent Not Found</h2>
            <p className="text-muted-foreground mb-4">The agent you are looking for does not exist or the link is incorrect.</p>
            <Button onClick={() => navigate('/browse-agents')}>Browse Agents</Button>
          </div>
        ) : (
          <>
            {/* Agent Profile Card + Get in Touch */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              {/* Agent Profile Card */}
              <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col gap-2">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-2">
                  {/* Avatar */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={agent?.profileImage} alt={agent?.name} />
                      <AvatarFallback>
                        {agent?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-3xl font-bold leading-tight">{agent?.name}</h1>
                      {agent?.verified && (
                        <Badge variant="secondary" className="flex items-center gap-1 text-xs bg-green-100 text-green-700 border-green-200">
                          <CheckCircle className="h-4 w-4 text-green-500" /> Verified Agent
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2 max-w-2xl text-base">{agent?.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {agent?.rating} ({agent?.reviewCount} trips)
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {agent?.experienceYears} years experience
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {agent?.location}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span className="font-medium">{user ? agent?.phone : maskPhone(agent?.phone)}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span className="font-medium">{user ? agent?.email : maskEmail(agent?.email)}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        <a href={`https://${agent?.website}`} target="_blank" rel="noopener noreferrer" className="underline font-medium">
                          {agent?.website}
                        </a>
                      </span>
                    </div>
                    {/* Social Media Links */}
                    <div className="flex gap-3 mt-2">
                      <a href={agent?.facebook || "#"} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <svg width="22" height="22" fill="currentColor" className="text-blue-600 hover:text-blue-800"><path d="M13.5 8.5V7.25c0-.414.336-.75.75-.75h1.5V4.5h-2.25A2.25 2.25 0 0 0 11.25 6.75V8.5H9.75V11h1.5v6h2.25v-6h1.5l.25-2.5h-1.75z"/></svg>
                      </a>
                      <a href={agent?.instagram || "#"} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <svg width="22" height="22" fill="currentColor" className="text-pink-500 hover:text-pink-700"><circle cx="11" cy="11" r="4"/><path d="M17.5 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/><rect x="3" y="3" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                      </a>
                      <a href={agent?.linkedin || "#"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg width="22" height="22" fill="currentColor" className="text-blue-800 hover:text-blue-900"><path d="M6.94 8.5H4.5v9h2.44v-9zm-1.22-1.5a1.41 1.41 0 1 1 0-2.82 1.41 1.41 0 0 1 0 2.82zM17.5 17.5h-2.44v-4.5c0-1.07-.02-2.44-1.5-2.44-1.5 0-1.73 1.17-1.73 2.36v4.58H9.39v-9h2.34v1.23h.03c.33-.62 1.13-1.27 2.33-1.27 2.5 0 2.96 1.65 2.96 3.8v5.24z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Get in Touch Box */}
              <div className="w-full lg:w-80 bg-blue-50 rounded-xl p-6 flex flex-col gap-4 items-center justify-center border border-blue-100">
                <h3 className="font-semibold text-lg mb-2">Get in Touch</h3>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white" size="lg" onClick={() => handleProtectedAction(() => window.open(`https://wa.me/${agent?.phone.replace(/[^\d]/g, "")}`, '_blank'))}>
                  WhatsApp
                </Button>
                <Button variant="outline" size="lg" className="w-full" onClick={() => handleProtectedAction(() => window.open(`mailto:${agent?.email}`))}>
                  Email
                </Button>
                <Button variant="outline" size="lg" className="w-full" onClick={() => handleProtectedAction(() => window.open(`tel:${agent?.phone.replace(/[^\d+]/g, "")}`))}>
                  Call
                </Button>
              </div>
            </div>

            {/* Ready to Start Your Journey Section */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-100">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">Ready to Start Your Journey?</h2>
                <p className="text-muted-foreground mb-4">Choose how you'd like to connect with <span className="font-semibold">{agent?.name}</span>.</p>
                <div className="flex flex-col sm:flex-row gap-4 mb-2">
                  <Button className="flex-1 w-full bg-green-500 hover:bg-green-600 text-white text-base py-6" size="lg" onClick={() => handleProtectedAction(() => window.open(`https://wa.me/${agent?.phone.replace(/[^\d]/g, "")}`, '_blank'))}>
                    WhatsApp Chat
                    <span className="block text-xs font-normal">Instant Response</span>
                  </Button>
                  <Button className="flex-1 w-full text-base py-6" size="lg" variant="outline" onClick={() => handleProtectedAction(() => window.open(`mailto:${agent?.email}?subject=Travel Inquiry&body=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20travel%20services.`))}>
                    Send Email
                    <span className="block text-xs font-normal">Detailed Inquiry</span>
                  </Button>
                  <Button className="flex-1 w-full text-base py-6" size="lg" variant="outline" onClick={() => handleProtectedAction(() => window.open(`tel:${agent?.phone.replace(/[^\d+]/g, "")}`))}>
                    Call Now
                    <span className="block text-xs font-normal text-purple-600">Direct Contact</span>
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2">Response time: Usually within {agent?.responseTime}</div>
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {agent?.specialties.map((spec, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs px-3 py-1 rounded-full bg-gray-100 border-gray-200 text-gray-700">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Travel Packages */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Travel Packages</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="border rounded-lg p-4 bg-white flex flex-col justify-between shadow-sm">
                    <div>
                      <Badge variant="secondary" className="mb-2">{pkg.category}</Badge>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{pkg.title}</h3>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{pkg.rating}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{pkg.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        {pkg.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span>{pkg.days} days, {pkg.nights} nights</span>
                        <span>₹{pkg.price.toLocaleString()} per person</span>
                      </div>
                    </div>
                    <Button
                      className="mt-2 w-full"
                      size="sm"
                      variant="default"
                      onClick={() => {
                        if (!user) {
                          navigate('/sign-in');
                          return;
                        }
                        window.open(`mailto:${agent?.email}?subject=Inquiry about ${encodeURIComponent(pkg.title)}&body=Hello,%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg.title)}.%20Please%20send%20me%20more%20details.`, '_blank');
                      }}
                    >
                      Inquire Now
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
} 