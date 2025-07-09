import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Filter,
  Download,
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  Star,
  Flag,
  Clock,
  Shield,
} from "lucide-react";
import { Package } from "@shared/packages";

export default function AdminPackages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [reviewAction, setReviewAction] = useState<"approve" | "reject">(
    "approve",
  );
  const [reviewNotes, setReviewNotes] = useState("");

  // Mock packages data for admin review
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
      agentId: "agent-2",
      title: "Tokyo Adventure with Questionable Activities",
      description: "Some activities might not meet our guidelines",
      shortDescription: "Tokyo experience with mixed content",
      price: 2100,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 10, nights: 9 },
      destinations: ["Tokyo"],
      startLocation: "Narita Airport",
      endLocation: "Narita Airport",
      category: "cultural",
      themes: ["Culture", "Adventure"],
      difficulty: "moderate",
      media: [],
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
      status: "pending_review",
      createdAt: "2024-01-22",
      updatedAt: "2024-01-22",
      adminNotes: "Needs review for content compliance",
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
      agentId: "agent-3",
      title: "Brazilian Amazon Eco-Tourism",
      description: "Sustainable rainforest experience",
      shortDescription: "Eco-friendly Amazon adventure",
      price: 1800,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 12, nights: 11 },
      destinations: ["Manaus", "Amazon Rainforest"],
      startLocation: "Manaus Airport",
      endLocation: "Manaus Airport",
      category: "adventure",
      themes: ["Nature", "Wildlife", "Sustainability"],
      difficulty: "challenging",
      media: [],
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
      status: "pending_review",
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
    {
      id: "4",
      agentId: "agent-4",
      title: "European Wine Tour",
      description: "Premium wine tasting across Europe",
      shortDescription: "Luxury wine experience",
      price: 3500,
      currency: "USD",
      priceType: "per_person",
      duration: { days: 14, nights: 13 },
      destinations: ["France", "Italy", "Spain"],
      startLocation: "Paris",
      endLocation: "Barcelona",
      category: "cultural",
      themes: ["Food & Wine", "Luxury"],
      difficulty: "easy",
      media: [],
      itinerary: [],
      inclusions: [],
      exclusions: [],
      minParticipants: 8,
      maxParticipants: 24,
      fitnessLevel: "low",
      languages: ["English", "French", "Italian"],
      availabilityCalendar: [],
      bookingPolicy: {
        cancellationPolicy: "Free cancellation up to 30 days before",
        paymentTerms: "60% deposit required",
        refundPolicy: "Sliding scale refund policy",
      },
      specialOffers: [],
      status: "rejected",
      createdAt: "2024-01-18",
      updatedAt: "2024-01-20",
      adminNotes: "Pricing seems excessive for described services",
      rejectionReason: "Overpriced package with limited value proposition",
      moderatedBy: "admin-1",
      moderatedAt: "2024-01-20",
      stats: {
        views: 89,
        inquiries: 4,
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

  const getStatusIcon = (status: string) => {
    const icons = {
      active: CheckCircle,
      pending_review: Clock,
      draft: FileText,
      paused: AlertTriangle,
      rejected: XCircle,
    };
    return icons[status as keyof typeof icons] || Clock;
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

  const getAdminStats = () => {
    const totalPackages = packages.length;
    const pendingReview = packages.filter(
      (p) => p.status === "pending_review",
    ).length;
    const active = packages.filter((p) => p.status === "active").length;
    const rejected = packages.filter((p) => p.status === "rejected").length;

    return { totalPackages, pendingReview, active, rejected };
  };

  const adminStats = getAdminStats();

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destinations.some((dest) =>
        dest.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesStatus = statusFilter === "all" || pkg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePackageReview = (action: "approve" | "reject") => {
    if (!selectedPackage) return;

    console.log("Package review:", {
      packageId: selectedPackage.id,
      action,
      notes: reviewNotes,
    });

    // Here you would typically send the review to your API
    setReviewDialog(false);
    setSelectedPackage(null);
    setReviewNotes("");
  };

  const handlePackageAction = (pkg: Package, action: string) => {
    console.log("Package action:", { packageId: pkg.id, action });
    // Handle various package actions
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Package Management</h1>
            <p className="text-muted-foreground">
              Review and moderate travel packages on the platform
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Packages
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {adminStats.totalPackages}
              </div>
              <p className="text-xs text-muted-foreground">
                All packages on platform
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Review
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {adminStats.pendingReview}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting moderation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Packages
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {adminStats.active}
              </div>
              <p className="text-xs text-muted-foreground">Live on platform</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rejected Today
              </CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {adminStats.rejected}
              </div>
              <p className="text-xs text-muted-foreground">
                Content violations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="packages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="packages">All Packages</TabsTrigger>
            <TabsTrigger value="pending">
              Pending Review ({adminStats.pendingReview})
            </TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
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
                    <SelectItem value="flagged">Most Flagged</SelectItem>
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
                      <TableHead>Agent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPackages.map((pkg) => {
                      const StatusIcon = getStatusIcon(pkg.status);
                      return (
                        <TableRow key={pkg.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{pkg.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {pkg.destinations.join(" • ")} •{" "}
                                {pkg.duration.days}D/{pkg.duration.nights}N
                              </div>
                              {pkg.adminNotes && (
                                <div className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                                  <Flag className="h-3 w-3" />
                                  Admin Note
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">Agent #{pkg.agentId}</div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusColor(pkg.status)}
                              variant="secondary"
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {pkg.status.replace("_", " ")}
                            </Badge>
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
                            <div className="space-y-1">
                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {pkg.stats.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {pkg.stats.bookings}
                                </span>
                              </div>
                              {pkg.stats.rating > 0 && (
                                <div className="flex items-center gap-1 text-sm">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  {pkg.stats.rating}
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
                                <DropdownMenuItem
                                  onClick={() => {
                                    // View package details
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                {pkg.status === "pending_review" && (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedPackage(pkg);
                                        setReviewAction("approve");
                                        setReviewDialog(true);
                                      }}
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                      Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedPackage(pkg);
                                        setReviewAction("reject");
                                        setReviewDialog(true);
                                      }}
                                    >
                                      <XCircle className="mr-2 h-4 w-4 text-red-600" />
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {pkg.status === "active" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handlePackageAction(pkg, "pause")
                                    }
                                  >
                                    <AlertTriangle className="mr-2 h-4 w-4 text-yellow-600" />
                                    Pause Package
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    handlePackageAction(pkg, "flag")
                                  }
                                >
                                  <Flag className="mr-2 h-4 w-4" />
                                  Flag for Review
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Packages Pending Review
                </CardTitle>
                <CardDescription>
                  Review and moderate new package submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {packages
                    .filter((pkg) => pkg.status === "pending_review")
                    .map((pkg) => (
                      <div key={pkg.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold">{pkg.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {pkg.shortDescription}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span>Agent #{pkg.agentId}</span>
                              <span>{formatDate(pkg.createdAt)}</span>
                              <span>
                                {formatPrice(pkg.price, pkg.currency)}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedPackage(pkg);
                                setReviewAction("approve");
                                setReviewDialog(true);
                              }}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedPackage(pkg);
                                setReviewAction("reject");
                                setReviewDialog(true);
                              }}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                        {pkg.adminNotes && (
                          <div className="bg-orange-50 border border-orange-200 rounded p-3 text-sm">
                            <strong>Admin Note:</strong> {pkg.adminNotes}
                          </div>
                        )}
                      </div>
                    ))}

                  {packages.filter((pkg) => pkg.status === "pending_review")
                    .length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No packages pending review</p>
                      <p className="text-sm">All packages have been reviewed</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Package Analytics</CardTitle>
                <CardDescription>
                  Platform-wide package performance insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Analytics dashboard coming soon...</p>
                    <p className="text-sm">
                      Detailed insights into package performance and trends
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Package Reports</CardTitle>
                <CardDescription>
                  Generate reports for package management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Report generation coming soon...</p>
                    <p className="text-sm">
                      Export package data and moderation reports
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Review Dialog */}
        <Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {reviewAction === "approve" ? "Approve" : "Reject"} Package
              </DialogTitle>
              <DialogDescription>{selectedPackage?.title}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reviewNotes">
                  {reviewAction === "approve" ? "Approval" : "Rejection"} Notes
                </Label>
                <Textarea
                  id="reviewNotes"
                  placeholder={
                    reviewAction === "approve"
                      ? "Optional notes for approval..."
                      : "Please provide reason for rejection..."
                  }
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setReviewDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handlePackageReview(reviewAction)}
                  variant={
                    reviewAction === "approve" ? "default" : "destructive"
                  }
                >
                  {reviewAction === "approve" ? (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-2" />
                  )}
                  {reviewAction === "approve" ? "Approve" : "Reject"} Package
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </div>
  );
}
