export interface PackageMedia {
  id: string;
  type: "image" | "video" | "document";
  url: string;
  caption?: string;
  thumbnail?: string;
}

export interface PackageItinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation?: string;
  meals: string[];
  transportation?: string;
  location: {
    name: string;
    coordinates?: [number, number];
  };
}

export interface PackageInclusion {
  id: string;
  category:
    | "accommodation"
    | "meals"
    | "transportation"
    | "activities"
    | "guide"
    | "other";
  item: string;
  description?: string;
}

export interface PackageSpecialOffer {
  id: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  validFrom: string;
  validTo: string;
  couponCode?: string;
  maxUses?: number;
  usedCount: number;
}

export interface Package {
  id: string;
  agentId: string;
  title: string;
  description: string;
  shortDescription: string;

  // Pricing
  price: number;
  currency: string;
  priceType: "per_person" | "per_group" | "per_couple";
  originalPrice?: number; // For showing discounts

  // Duration & Destinations
  duration: {
    days: number;
    nights: number;
  };
  destinations: string[];
  startLocation: string;
  endLocation: string;

  // Categories & Themes
  category:
    | "adventure"
    | "cultural"
    | "relaxation"
    | "family"
    | "honeymoon"
    | "business"
    | "group"
    | "solo";
  themes: string[];
  difficulty: "easy" | "moderate" | "challenging";

  // Content
  media: PackageMedia[];
  itinerary: PackageItinerary[];
  inclusions: PackageInclusion[];
  exclusions: string[];

  // Requirements & Info
  minParticipants: number;
  maxParticipants: number;
  ageRequirements?: {
    min?: number;
    max?: number;
  };
  fitnessLevel: "low" | "medium" | "high";
  languages: string[];

  // Booking & Availability
  availabilityCalendar: {
    date: string;
    available: boolean;
    price?: number;
  }[];
  bookingPolicy: {
    cancellationPolicy: string;
    paymentTerms: string;
    refundPolicy: string;
  };

  // Special Offers
  specialOffers: PackageSpecialOffer[];

  // Status & Metadata
  status: "draft" | "pending_review" | "active" | "paused" | "rejected";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;

  // Admin fields
  adminNotes?: string;
  rejectionReason?: string;
  moderatedBy?: string;
  moderatedAt?: string;

  // Statistics
  stats: {
    views: number;
    inquiries: number;
    bookings: number;
    rating: number;
    reviewCount: number;
  };
}

export interface PackageFilter {
  destinations?: string[];
  category?: string[];
  themes?: string[];
  priceRange?: [number, number];
  duration?: [number, number];
  difficulty?: string[];
  startDate?: string;
  endDate?: string;
  minRating?: number;
  languages?: string[];
}

export interface PackageInquiry {
  id: string;
  packageId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  message: string;
  preferredDates?: {
    startDate: string;
    endDate: string;
  };
  participantCount: number;
  status: "pending" | "responded" | "booked" | "declined";
  createdAt: string;
  agentResponse?: string;
  respondedAt?: string;
}

export interface PackageBooking {
  id: string;
  packageId: string;
  customerId: string;
  agentId: string;

  // Booking details
  startDate: string;
  endDate: string;
  participantCount: number;
  participants: {
    name: string;
    age: number;
    passportNumber?: string;
  }[];

  // Pricing
  basePrice: number;
  discountApplied?: number;
  totalPrice: number;
  currency: string;

  // Payment
  paymentStatus: "pending" | "partial" | "completed" | "refunded";
  paymentMethod: string;
  paymentSchedule: {
    dueDate: string;
    amount: number;
    status: "pending" | "completed";
  }[];

  // Status
  bookingStatus: "confirmed" | "pending" | "cancelled" | "completed";
  cancellationReason?: string;

  // Communication
  specialRequests?: string;
  agentNotes?: string;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface CreatePackageRequest {
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  priceType: "per_person" | "per_group" | "per_couple";
  duration: { days: number; nights: number };
  destinations: string[];
  startLocation: string;
  endLocation: string;
  category: string;
  themes: string[];
  difficulty: string;
  minParticipants: number;
  maxParticipants: number;
  fitnessLevel: string;
  languages: string[];
  inclusions: Omit<PackageInclusion, "id">[];
  exclusions: string[];
  itinerary: PackageItinerary[];
  bookingPolicy: {
    cancellationPolicy: string;
    paymentTerms: string;
    refundPolicy: string;
  };
}

export interface UpdatePackageRequest extends Partial<CreatePackageRequest> {
  id: string;
}

export interface PackageAnalytics {
  packageId: string;
  period: {
    startDate: string;
    endDate: string;
  };
  metrics: {
    views: number;
    inquiries: number;
    conversions: number;
    revenue: number;
    avgRating: number;
    topSources: { source: string; count: number }[];
  };
  trends: {
    date: string;
    views: number;
    inquiries: number;
    bookings: number;
  }[];
}
