import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Eye,
  Copy,
  Trash2,
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  Star,
  MessageCircle,
  BarChart3,
  Filter,
} from "lucide-react";
import { Package } from "@shared/packages";

export default function ManagePackages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");

  // Mock packages data
  const packages: Package[] = [
    {
      id: "1",
      agentId: "agent-1",
      title: "Barcelona Cultural Heritage & Gastronomy Experience",
      description: "Immerse yourself in Barcelona's rich culture",
      shortDescription: "Explore Barcelona's architectural marvels",
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
      media: [],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 2,
      maxParticipants: 12,
      fitnessLevel: "low",
      languages: ["English", "Spanish"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 48 hours before",
        paymentTerms: "50% deposit required",
        refundPolicy: "Full refund for cancellations 48+ hours prior",
      },
      specialOffers: [],
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
      agentId: "agent-1",
      title: "Barcelona Food & Wine Walking Tour",
      description: "Taste authentic Catalan cuisine",
      shortDescription: "Culinary journey through Barcelona",
      price: 85,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 1, nights: 0 },
      destinations: ["Barcelona"],
      startLocation: "Plaza Cataluña",
      endLocation: "Gothic Quarter",
      category: "cultural",
      themes: ["Food & Wine"],
      difficulty: "easy",
      media: [],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 4,
      maxParticipants: 15,
      fitnessLevel: "low",
      languages: ["English", "Spanish"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 24 hours before",
        paymentTerms: "Full payment at booking",
        refundPolicy: "Full refund for cancellations 24+ hours prior",
      },
      specialOffers: [],
      status: "pending_review",
      createdAt: "2024-01-22",
      updatedAt: "2024-01-22",
      stats: {
        views: 45,
        inquiries: 3,
        bookings: 0,
        rating: 0,
        reviewCount: 0,
      },
    },
    {
      id: "3",
      agentId: "agent-1",
      title: "Montserrat Mountain & Monastery Day Trip",
      description: "Visit the sacred mountain of Catalonia",
      shortDescription: "Spiritual journey to Montserrat",
      price: 120,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 1, nights: 0 },
      destinations: ["Montserrat"],
      startLocation: "Barcelona",
      endLocation: "Barcelona",
      category: "cultural",
      themes: ["Spiritual", "Nature", "History"],
      difficulty: "moderate",
      media: [],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 6,
      maxParticipants: 20,
      fitnessLevel: "medium",
      languages: ["English", "Spanish"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 48 hours before",
        paymentTerms: "50% deposit required",
        refundPolicy: "Full refund for cancellations 48+ hours prior",
      },
      specialOffers: [],
      status: "draft",
      createdAt: "2024-01-25",
      updatedAt: "2024-01-25",
      stats: {
        views: 0,
        inquiries: 0,
        bookings: 0,
        rating: 0,
        reviewCount: 0,
      },
    },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      pending_review: "bg-yellow-100 text-yellow-800",
      draft: "bg-gray-100 text-gray-800",
      paused: "bg-blue-100 text-blue-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getOverallStats = () => {
    return packages.reduce(
      (acc, pkg) => ({
        totalViews: acc.totalViews + pkg.stats.views,
        totalInquiries: acc.totalInquiries + pkg.stats.inquiries,
        totalBookings: acc.totalBookings + pkg.stats.bookings,
        totalRevenue: acc.totalRevenue + pkg.stats.bookings * pkg.price,
      }),
      { totalViews: 0, totalInquiries: 0, totalBookings: 0, totalRevenue: 0 },
    );
  };

  const overallStats = getOverallStats();

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destinations.some((dest) =>
        dest.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesStatus = statusFilter === "all" || pkg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Packages</h1>
            <p className="text-muted-foreground">
              Manage your travel packages and track performance
            </p>
          </div>
          <Button asChild>
            <Link to="/agent/create-package">
              <Plus className="mr-2 h-4 w-4" />
              Create Package
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overallStats.totalViews}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all packages
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overallStats.totalInquiries}
              </div>
              <p className="text-xs text-muted-foreground">
                Customer inquiries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overallStats.totalBookings}
              </div>
              <p className="text-xs text-muted-foreground">Total bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(overallStats.totalRevenue, "USD")}
              </div>
              <p className="text-xs text-muted-foreground">Total revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="packages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="packages">All Packages</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="packages" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending_review">
                      Pending Review
                    </SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Last Updated</SelectItem>
                    <SelectItem value="created">Date Created</SelectItem>
                    <SelectItem value="views">Most Viewed</SelectItem>
                    <SelectItem value="bookings">Most Booked</SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Packages Table */}
            <Card>
              <CardHeader>
                <CardTitle>Package Management</CardTitle>
                <CardDescription>
                  {filteredPackages.length} of {packages.length} packages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Package</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPackages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell>
                          <div>
                            <Link
                              to={`/package/${pkg.id}`}
                              className="font-medium hover:text-primary"
                            >
                              {pkg.title}
                            </Link>
                            <div className="text-sm text-muted-foreground">
                              {pkg.destinations.join(" • ")} •{" "}
                              {pkg.duration.days}D/{pkg.duration.nights}N
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {formatPrice(pkg.price, pkg.currency)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {pkg.priceType.replace("_", " ")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getStatusColor(pkg.status)}
                            variant="secondary"
                          >
                            {pkg.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {pkg.stats.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                {pkg.stats.inquiries}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {pkg.stats.bookings}
                              </span>
                            </div>
                            {pkg.stats.rating > 0 && (
                              <div className="flex items-center gap-1 text-sm">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {pkg.stats.rating} ({pkg.stats.reviewCount})
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(pkg.updatedAt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/package/${pkg.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Package
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Package Analytics</CardTitle>
                <CardDescription>
                  Performance insights for your packages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Analytics dashboard coming soon...</p>
                    <p className="text-sm">
                      Detailed insights into package performance and customer
                      engagement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle>Customer Inquiries</CardTitle>
                <CardDescription>
                  Manage customer inquiries and communications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Inquiry management coming soon...</p>
                    <p className="text-sm">
                      View and respond to customer inquiries about your packages
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
