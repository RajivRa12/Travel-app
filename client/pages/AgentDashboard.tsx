import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Calendar,
  Users,
  MapPin,
  Star,
  TrendingUp,
  Plus,
  Eye,
  MessageCircle,
  DollarSign,
  Clock,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export default function AgentDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [itineraries, setItineraries] = useState([]);
  const [form, setForm] = useState({
    title: "",
    destination: "",
    description: "",
    days: 1,
    nights: 0,
    price: 0,
    category: "",
  });
  const categories = [
    "Adventure",
    "Cultural",
    "Relaxation",
    "Family",
    "Honeymoon",
    "Business",
    "Group",
    "Solo",
  ];
  const handleFormChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateItinerary = () => {
    setItineraries((prev) => [...prev, form]);
    setShowItineraryModal(false);
    setForm({ title: "", destination: "", description: "", days: 1, nights: 0, price: 0, category: "" });
    toast({ title: "Itinerary Created", description: "Your new itinerary has been added." });
  };
  const stats = [
    {
      title: "Total Bookings",
      value: "127",
      change: "+12%",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Revenue This Month",
      value: "$15,420",
      change: "+18%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Active Itineraries",
      value: "23",
      change: "+5%",
      icon: MapPin,
      color: "text-purple-600",
    },
    {
      title: "Average Rating",
      value: "4.9",
      change: "+0.2",
      icon: Star,
      color: "text-yellow-600",
    },
  ];

  const recentBookings = [
    {
      id: "1",
      customer: "Sarah Johnson",
      destination: "Barcelona City Tour",
      date: "2024-03-15",
      status: "confirmed",
      amount: "$850",
    },
    {
      id: "2",
      customer: "Mike Chen",
      destination: "Mediterranean Coast",
      date: "2024-03-20",
      status: "pending",
      amount: "$1,200",
    },
    {
      id: "3",
      customer: "Emma Wilson",
      destination: "Gaudi Architecture Tour",
      date: "2024-03-25",
      status: "confirmed",
      amount: "$650",
    },
  ];

  const tabRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    description: ""
  });

  useEffect(() => {
    // Load agent profile from localStorage for demo
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        description: user.description || ""
      });
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && ["overview","itineraries","bookings","customers","profile"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };
  const handleProfileSave = () => {
    // Save to localStorage for demo
    const user = JSON.parse(localStorage.getItem("user")) || {};
    localStorage.setItem("user", JSON.stringify({ ...user, ...profile }));
    toast({ title: "Profile updated!", description: "Your profile changes have been saved." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showLogout={true} />

      <div ref={tabRef} className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("Agent Dashboard")}</h1>
            <p className="text-muted-foreground">
              Welcome back, Sofia! Here's your business overview.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold" onClick={() => {
              const user = JSON.parse(localStorage.getItem('user'));
              if (user && user.id) {
                navigate(`/agents/${user.id}`);
              } else {
                alert('Agent profile not found. Please log in again.');
              }
            }}>
              <Eye className="mr-2 h-4 w-4" />
              {(() => {
                const user = JSON.parse(localStorage.getItem('user'));
                return user && user.name ? `View ${user.name}'s Public Profile` : 'View Public Profile';
              })()}
            </Button>
            <Button className="w-full sm:w-auto" onClick={() => setShowItineraryModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Itinerary
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from
                    last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val)} className="space-y-6">
          <TabsList
            className="flex flex-wrap w-full gap-2 px-2 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm mb-8"
          >
            <TabsTrigger value="overview" className="flex-1 min-w-[100px] px-4 py-2 text-base">Overview</TabsTrigger>
            <TabsTrigger value="itineraries" className="flex-1 min-w-[100px] px-4 py-2 text-base">Itineraries</TabsTrigger>
            <TabsTrigger value="bookings" className="flex-1 min-w-[100px] px-4 py-2 text-base">Bookings</TabsTrigger>
            <TabsTrigger value="customers" className="flex-1 min-w-[100px] px-4 py-2 text-base">Customers</TabsTrigger>
            <TabsTrigger value="profile" className="flex-1 min-w-[100px] px-4 py-2 text-base">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Bookings */}
              <div className="lg:col-span-2 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>
                      Your latest customer bookings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{booking.customer}</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.destination}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {booking.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{booking.amount}</p>
                            <Badge
                              variant={
                                booking.status === "confirmed"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" onClick={() => {
                      setShowItineraryModal(true);
                      setTimeout(() => {
                        tabRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 0);
                    }}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Itinerary
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => {
                      setActiveTab("customers");
                      setTimeout(() => {
                        tabRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 0);
                    }}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message Customers
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => {
                      setActiveTab("analytics");
                      setTimeout(() => {
                        tabRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 0);
                    }}>
                      <BarChart className="mr-2 h-4 w-4" />
                      View Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => {
                      setActiveTab("profile");
                      setTimeout(() => {
                        tabRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 0);
                    }}>
                      <Users className="mr-2 h-4 w-4" />
                      Manage Profile
                    </Button>
                  </CardContent>
                </Card>

                {/* Profile Completion */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-base">
                      Profile Completion
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} />
                      <p className="text-xs text-muted-foreground">
                        Complete your profile to attract more customers
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itineraries">
            <Card>
              <CardHeader>
                <CardTitle>My Itineraries</CardTitle>
                <CardDescription>
                  Manage your travel itineraries and packages
                </CardDescription>
              </CardHeader>
              <CardContent>
                {itineraries.length === 0 ? (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No itineraries yet.</p>
                      <p className="text-sm">Create your first itinerary to get started!</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itineraries.map((itinerary, idx) => (
                      <Card key={idx} className="border shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold">{itinerary.title}</CardTitle>
                          <CardDescription>{itinerary.destination}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-2 text-sm text-muted-foreground">{itinerary.description}</p>
                          <div className="flex flex-wrap gap-2 text-xs mb-2">
                            <Badge variant="secondary">{itinerary.days} Days / {itinerary.nights} Nights</Badge>
                            <Badge variant="secondary">₹{itinerary.price} per person</Badge>
                            {itinerary.category && <Badge>{itinerary.category}</Badge>}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>
                  View and manage customer bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Booking management coming soon...</p>
                    <p className="text-sm">
                      Track all your customer bookings and payments
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>
                  Communicate with your customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Customer management coming soon...</p>
                    <p className="text-sm">
                      Manage inquiries, reviews, and communications
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your agent profile and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="max-w-lg mx-auto space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input
                      value={profile.name}
                      onChange={e => handleProfileChange("name", e.target.value)}
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input
                      value={profile.email}
                      onChange={e => handleProfileChange("email", e.target.value)}
                      placeholder="Email"
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input
                      value={profile.phone}
                      onChange={e => handleProfileChange("phone", e.target.value)}
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea
                      value={profile.description}
                      onChange={e => handleProfileChange("description", e.target.value)}
                      placeholder="Describe yourself as an agent..."
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="button" onClick={handleProfileSave}>Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />

      <Dialog open={showItineraryModal} onOpenChange={setShowItineraryModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Itinerary</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Package Title *</label>
              <Input
                placeholder="e.g., Manali Adventure Package"
                value={form.title}
                onChange={e => handleFormChange("title", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Destination *</label>
              <Input
                placeholder="e.g., Manali, Himachal Pradesh"
                value={form.destination}
                onChange={e => handleFormChange("destination", e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description *</label>
            <Textarea
              placeholder="Describe your travel package..."
              value={form.description}
              onChange={e => handleFormChange("description", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Duration (Days)</label>
              <Input
                type="number"
                min={1}
                value={form.days}
                onChange={e => handleFormChange("days", Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration (Nights)</label>
              <Input
                type="number"
                min={0}
                value={form.nights}
                onChange={e => handleFormChange("nights", Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price per Person (₹)</label>
              <Input
                type="number"
                min={0}
                value={form.price}
                onChange={e => handleFormChange("price", Number(e.target.value))}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select value={form.category} onValueChange={val => handleFormChange("category", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowItineraryModal(false)}>Cancel</Button>
            <Button onClick={handleCreateItinerary} disabled={!form.title || !form.destination || !form.description}>Create Itinerary</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// To hide the scrollbar, add the following to your client/global.css:
// .hide-scrollbar::-webkit-scrollbar { display: none; }
// .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
