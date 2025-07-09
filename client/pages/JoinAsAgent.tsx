import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Plane,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  Users,
  CheckCircle,
  MapPin,
  Globe,
  Star,
  Award,
} from "lucide-react";

export default function JoinAsAgent() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Business Info
    companyName: "",
    businessType: "",
    yearsExperience: "",
    specialties: [] as string[],
    locations: [] as string[],
    languages: [] as string[],
    description: "",

    // Agreement
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const specialtyOptions = [
    "Cultural Tours",
    "Adventure Travel",
    "Food & Wine",
    "Family Travel",
    "Honeymoon Packages",
    "Business Travel",
    "Luxury Travel",
    "Budget Travel",
    "Wildlife Safari",
    "Beach Destinations",
    "Mountain Adventures",
    "City Breaks",
    "Historical Sites",
    "Photography Tours",
    "Wellness Retreats",
    "Group Tours",
  ];

  const locationOptions = [
    "Europe",
    "Asia",
    "Americas",
    "Africa",
    "Oceania",
    "Spain",
    "France",
    "Italy",
    "Japan",
    "Thailand",
    "Brazil",
    "Egypt",
    "UK",
    "India",
  ];

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Japanese",
    "Mandarin",
    "Arabic",
    "Hindi",
    "Russian",
    "Dutch",
  ];

  const businessTypes = [
    "Independent Agent",
    "Travel Agency",
    "Tour Operator",
    "Destination Management Company",
    "Online Travel Business",
    "Freelance Guide",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Agent registration:", formData);
      setIsLoading(false);
      // Redirect to verification or welcome page
      navigate("/agent/welcome");
    }, 1000);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleArrayItem = (field: string, item: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    const newArray = currentArray.includes(item)
      ? currentArray.filter((i) => i !== item)
      : [...currentArray, item];
    updateFormData(field, newArray);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword
        );
      case 2:
        return (
          formData.companyName &&
          formData.businessType &&
          formData.yearsExperience &&
          formData.specialties.length > 0 &&
          formData.locations.length > 0
        );
      case 3:
        return formData.agreeTerms;
      default:
        return false;
    }
  };

  const benefits = [
    {
      icon: Users,
      title: "100K+ Customers",
      description: "Access to our large customer base",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Promote your services worldwide",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Protected payment processing",
    },
    {
      icon: Star,
      title: "Professional Tools",
      description: "Package creation and management tools",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`h-1 w-24 mx-2 ${
                        step < currentStep ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Personal Info</span>
              <span>Business Details</span>
              <span>Verification</span>
            </div>
          </div>

          {/* Main Card */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Plane className="h-12 w-12 text-primary" />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-accent"></div>
                </div>
              </div>
              <CardTitle className="text-2xl">Join as Travel Agent</CardTitle>
              <CardDescription>
                {currentStep === 1 &&
                  "Let's start with your personal information"}
                {currentStep === 2 && "Tell us about your travel business"}
                {currentStep === 3 && "Review and complete your registration"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) =>
                            updateFormData("firstName", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) =>
                            updateFormData("lastName", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          updateFormData("email", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) =>
                          updateFormData("phone", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) =>
                            updateFormData("password", e.target.value)
                          }
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            updateFormData("confirmPassword", e.target.value)
                          }
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {formData.password &&
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                          <p className="text-sm text-red-600">
                            Passwords do not match
                          </p>
                        )}
                    </div>
                  </div>
                )}

                {/* Step 2: Business Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">
                          Company/Business Name
                        </Label>
                        <Input
                          id="companyName"
                          placeholder="Your Travel Agency"
                          value={formData.companyName}
                          onChange={(e) =>
                            updateFormData("companyName", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type</Label>
                        <Select
                          value={formData.businessType}
                          onValueChange={(value) =>
                            updateFormData("businessType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {businessTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsExperience">
                        Years of Experience
                      </Label>
                      <Select
                        value={formData.yearsExperience}
                        onValueChange={(value) =>
                          updateFormData("yearsExperience", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="2-5">2-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="11-15">11-15 years</SelectItem>
                          <SelectItem value="15+">15+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Specialties (select at least 1)</Label>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                        {specialtyOptions.map((specialty) => (
                          <div
                            key={specialty}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={specialty}
                              checked={formData.specialties.includes(specialty)}
                              onCheckedChange={() =>
                                toggleArrayItem("specialties", specialty)
                              }
                            />
                            <Label htmlFor={specialty} className="text-sm">
                              {specialty}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {formData.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {formData.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label>Locations/Destinations (select at least 1)</Label>
                      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                        {locationOptions.map((location) => (
                          <div
                            key={location}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={location}
                              checked={formData.locations.includes(location)}
                              onCheckedChange={() =>
                                toggleArrayItem("locations", location)
                              }
                            />
                            <Label htmlFor={location} className="text-sm">
                              {location}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Business Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Tell us about your travel business and what makes you unique..."
                        value={formData.description}
                        onChange={(e) =>
                          updateFormData("description", e.target.value)
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Terms */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="font-semibold mb-3">
                        Registration Summary
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Name:</strong> {formData.firstName}{" "}
                          {formData.lastName}
                        </div>
                        <div>
                          <strong>Email:</strong> {formData.email}
                        </div>
                        <div>
                          <strong>Company:</strong> {formData.companyName}
                        </div>
                        <div>
                          <strong>Business Type:</strong>{" "}
                          {formData.businessType}
                        </div>
                        <div>
                          <strong>Experience:</strong>{" "}
                          {formData.yearsExperience}
                        </div>
                        <div>
                          <strong>Specialties:</strong>{" "}
                          {formData.specialties.join(", ")}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) =>
                            updateFormData("agreeTerms", checked)
                          }
                        />
                        <Label
                          htmlFor="agreeTerms"
                          className="text-sm leading-relaxed"
                        >
                          I agree to the{" "}
                          <Link
                            to="/terms"
                            className="text-primary hover:underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy"
                            className="text-primary hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeMarketing"
                          checked={formData.agreeMarketing}
                          onCheckedChange={(checked) =>
                            updateFormData("agreeMarketing", checked)
                          }
                        />
                        <Label
                          htmlFor="agreeMarketing"
                          className="text-sm leading-relaxed"
                        >
                          I would like to receive marketing communications and
                          updates about new features
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  )}

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className={currentStep === 1 ? "ml-auto" : ""}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!isStepValid() || isLoading}
                      className="ml-auto"
                    >
                      {isLoading
                        ? "Creating Account..."
                        : "Complete Registration"}
                    </Button>
                  )}
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an agent account?{" "}
                  <Link
                    to="/agent/sign-in"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-center mb-6">
              Why Join Wanderly?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="text-center p-4">
                    <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium text-sm">{benefit.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
