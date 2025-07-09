import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Plus,
  X,
  Upload,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Save,
  Eye,
  ArrowLeft,
  Info,
  Camera,
  Trash2,
} from "lucide-react";
import { CreatePackageRequest } from "@shared/packages";

export default function CreatePackage() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("basic");

  const [formData, setFormData] = useState<CreatePackageRequest>({
    title: "",
    description: "",
    shortDescription: "",
    price: 0,
    currency: "USD",
    priceType: "per_person",
    duration: { days: 1, nights: 0 },
    destinations: [],
    startLocation: "",
    endLocation: "",
    category: "",
    themes: [],
    difficulty: "easy",
    minParticipants: 1,
    maxParticipants: 10,
    fitnessLevel: "low",
    languages: [],
    inclusions: [],
    exclusions: [],
    itinerary: [],
    bookingPolicy: {
      cancellationPolicy: "",
      paymentTerms: "",
      refundPolicy: "",
    },
  });

  const [newDestination, setNewDestination] = useState("");
  const [newTheme, setNewTheme] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [newItineraryDay, setNewItineraryDay] = useState({
    day: 1,
    title: "",
    description: "",
    activities: [],
    accommodation: "",
    meals: [],
    transportation: "",
    location: {
      name: "",
      coordinates: undefined as [number, number] | undefined,
    },
  });

  const categories = [
    "adventure",
    "cultural",
    "relaxation",
    "family",
    "honeymoon",
    "business",
    "group",
    "solo",
  ];

  const popularThemes = [
    "Food & Wine",
    "Architecture",
    "History",
    "Nature",
    "Wildlife",
    "Beach",
    "Mountains",
    "Desert",
    "Art & Museums",
    "Shopping",
    "Nightlife",
    "Photography",
    "Wellness",
    "Spiritual",
  ];

  const popularLanguages = [
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
  ];

  const inclusionCategories = [
    { id: "accommodation", label: "Accommodation", icon: "🏨" },
    { id: "meals", label: "Meals", icon: "🍽️" },
    { id: "transportation", label: "Transportation", icon: "🚌" },
    { id: "activities", label: "Activities", icon: "🎯" },
    { id: "guide", label: "Guide", icon: "👥" },
    { id: "other", label: "Other", icon: "📋" },
  ];

  const updateFormData = (field: keyof CreatePackageRequest, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addToArray = (field: keyof CreatePackageRequest, value: string) => {
    if (value.trim()) {
      const currentArray = (formData[field] as string[]) || [];
      if (!currentArray.includes(value.trim())) {
        updateFormData(field, [...currentArray, value.trim()]);
      }
    }
  };

  const removeFromArray = (
    field: keyof CreatePackageRequest,
    value: string,
  ) => {
    const currentArray = (formData[field] as string[]) || [];
    updateFormData(
      field,
      currentArray.filter((item) => item !== value),
    );
  };

  const addInclusion = (
    category: string,
    item: string,
    description: string,
  ) => {
    if (item.trim()) {
      const newInclusion = {
        category: category as any,
        item: item.trim(),
        description: description.trim() || undefined,
      };
      updateFormData("inclusions", [...formData.inclusions, newInclusion]);
    }
  };

  const removeInclusion = (index: number) => {
    const newInclusions = formData.inclusions.filter((_, i) => i !== index);
    updateFormData("inclusions", newInclusions);
  };

  const addItineraryDay = () => {
    if (newItineraryDay.title.trim() && newItineraryDay.description.trim()) {
      updateFormData("itinerary", [
        ...formData.itinerary,
        { ...newItineraryDay },
      ]);
      setNewItineraryDay({
        day: formData.itinerary.length + 2,
        title: "",
        description: "",
        activities: [],
        accommodation: "",
        meals: [],
        transportation: "",
        location: { name: "", coordinates: undefined },
      });
    }
  };

  const removeItineraryDay = (index: number) => {
    const newItinerary = formData.itinerary.filter((_, i) => i !== index);
    updateFormData("itinerary", newItinerary);
  };

  const handleSubmit = (saveAsDraft = false) => {
    console.log("Saving package:", {
      ...formData,
      status: saveAsDraft ? "draft" : "pending_review",
    });
    // Here you would typically send the data to your API
    navigate("/agent/packages");
  };

  const isFormValid = () => {
    return (
      formData.title.trim() &&
      formData.description.trim() &&
      formData.shortDescription.trim() &&
      formData.price > 0 &&
      formData.destinations.length > 0 &&
      formData.category &&
      formData.startLocation.trim() &&
      formData.endLocation.trim()
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/agent/packages")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Packages
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create New Package</h1>
            <p className="text-muted-foreground">
              Build a compelling travel experience for your customers
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Package Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                        currentTab === "basic"
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setCurrentTab("basic")}
                    >
                      <div className="w-6 h-6 rounded-full border flex items-center justify-center text-xs">
                        1
                      </div>
                      <span className="text-sm">Basic Info</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                        currentTab === "details"
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setCurrentTab("details")}
                    >
                      <div className="w-6 h-6 rounded-full border flex items-center justify-center text-xs">
                        2
                      </div>
                      <span className="text-sm">Details</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                        currentTab === "itinerary"
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setCurrentTab("itinerary")}
                    >
                      <div className="w-6 h-6 rounded-full border flex items-center justify-center text-xs">
                        3
                      </div>
                      <span className="text-sm">Itinerary</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                        currentTab === "policies"
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setCurrentTab("policies")}
                    >
                      <div className="w-6 h-6 rounded-full border flex items-center justify-center text-xs">
                        4
                      </div>
                      <span className="text-sm">Policies</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <Tabs
              value={currentTab}
              onValueChange={setCurrentTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
              </TabsList>

              {/* Basic Information */}
              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Package Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="title">Package Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Barcelona Cultural Heritage Experience"
                          value={formData.title}
                          onChange={(e) =>
                            updateFormData("title", e.target.value)
                          }
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="shortDescription">
                          Short Description *
                        </Label>
                        <Textarea
                          id="shortDescription"
                          placeholder="Brief, compelling description (2-3 sentences)"
                          value={formData.shortDescription}
                          onChange={(e) =>
                            updateFormData("shortDescription", e.target.value)
                          }
                          rows={2}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="description">Full Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Detailed description of the experience, what makes it special, and what customers can expect..."
                          value={formData.description}
                          onChange={(e) =>
                            updateFormData("description", e.target.value)
                          }
                          rows={6}
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            updateFormData("category", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() +
                                  category.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="difficulty">Difficulty Level</Label>
                        <Select
                          value={formData.difficulty}
                          onValueChange={(value) =>
                            updateFormData("difficulty", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="challenging">
                              Challenging
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="price">Price *</Label>
                        <div className="flex gap-2">
                          <Input
                            id="price"
                            type="number"
                            placeholder="0"
                            value={formData.price || ""}
                            onChange={(e) =>
                              updateFormData("price", Number(e.target.value))
                            }
                          />
                          <Select
                            value={formData.currency}
                            onValueChange={(value) =>
                              updateFormData("currency", value)
                            }
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="priceType">Price Type</Label>
                        <Select
                          value={formData.priceType}
                          onValueChange={(value) =>
                            updateFormData("priceType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="per_person">
                              Per Person
                            </SelectItem>
                            <SelectItem value="per_group">Per Group</SelectItem>
                            <SelectItem value="per_couple">
                              Per Couple
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Input
                              placeholder="Days"
                              type="number"
                              value={formData.duration.days || ""}
                              onChange={(e) =>
                                updateFormData("duration", {
                                  ...formData.duration,
                                  days: Number(e.target.value),
                                })
                              }
                            />
                          </div>
                          <div className="flex-1">
                            <Input
                              placeholder="Nights"
                              type="number"
                              value={formData.duration.nights || ""}
                              onChange={(e) =>
                                updateFormData("duration", {
                                  ...formData.duration,
                                  nights: Number(e.target.value),
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="participants">Participants</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Min"
                            type="number"
                            value={formData.minParticipants || ""}
                            onChange={(e) =>
                              updateFormData(
                                "minParticipants",
                                Number(e.target.value),
                              )
                            }
                          />
                          <Input
                            placeholder="Max"
                            type="number"
                            value={formData.maxParticipants || ""}
                            onChange={(e) =>
                              updateFormData(
                                "maxParticipants",
                                Number(e.target.value),
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Details */}
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Package Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Destinations */}
                    <div>
                      <Label htmlFor="destinations">Destinations *</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add destination"
                          value={newDestination}
                          onChange={(e) => setNewDestination(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addToArray("destinations", newDestination);
                              setNewDestination("");
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            addToArray("destinations", newDestination);
                            setNewDestination("");
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.destinations.map((dest) => (
                          <Badge
                            key={dest}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {dest}
                            <button
                              onClick={() =>
                                removeFromArray("destinations", dest)
                              }
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Locations */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startLocation">Start Location *</Label>
                        <Input
                          id="startLocation"
                          placeholder="e.g., Barcelona Airport"
                          value={formData.startLocation}
                          onChange={(e) =>
                            updateFormData("startLocation", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="endLocation">End Location *</Label>
                        <Input
                          id="endLocation"
                          placeholder="e.g., Barcelona Airport"
                          value={formData.endLocation}
                          onChange={(e) =>
                            updateFormData("endLocation", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {/* Themes */}
                    <div>
                      <Label>Themes & Interests</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {popularThemes.map((theme) => (
                          <div
                            key={theme}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={theme}
                              checked={formData.themes.includes(theme)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  addToArray("themes", theme);
                                } else {
                                  removeFromArray("themes", theme);
                                }
                              }}
                            />
                            <Label htmlFor={theme} className="text-sm">
                              {theme}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <Label>Languages Available</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {popularLanguages.map((language) => (
                          <div
                            key={language}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={language}
                              checked={formData.languages.includes(language)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  addToArray("languages", language);
                                } else {
                                  removeFromArray("languages", language);
                                }
                              }}
                            />
                            <Label htmlFor={language} className="text-sm">
                              {language}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fitness Level */}
                    <div>
                      <Label htmlFor="fitnessLevel">
                        Fitness Level Required
                      </Label>
                      <Select
                        value={formData.fitnessLevel}
                        onValueChange={(value) =>
                          updateFormData("fitnessLevel", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">
                            Low - Minimal walking required
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium - Moderate walking/activity
                          </SelectItem>
                          <SelectItem value="high">
                            High - Significant physical activity
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Inclusions & Exclusions */}
                <Card>
                  <CardHeader>
                    <CardTitle>What's Included & Excluded</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Inclusions</Label>
                      <div className="space-y-4 mt-2">
                        {inclusionCategories.map((category) => (
                          <div
                            key={category.id}
                            className="border rounded-lg p-4"
                          >
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <span>{category.icon}</span>
                              {category.label}
                            </h4>
                            <div className="space-y-2">
                              {formData.inclusions
                                .filter((inc) => inc.category === category.id)
                                .map((inclusion, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between bg-muted p-2 rounded"
                                  >
                                    <div>
                                      <div className="font-medium">
                                        {inclusion.item}
                                      </div>
                                      {inclusion.description && (
                                        <div className="text-sm text-muted-foreground">
                                          {inclusion.description}
                                        </div>
                                      )}
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        removeInclusion(
                                          formData.inclusions.indexOf(
                                            inclusion,
                                          ),
                                        )
                                      }
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Add inclusion..."
                                  id={`inclusion-${category.id}`}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => {
                                    const input = document.getElementById(
                                      `inclusion-${category.id}`,
                                    ) as HTMLInputElement;
                                    if (input?.value) {
                                      addInclusion(
                                        category.id,
                                        input.value,
                                        "",
                                      );
                                      input.value = "";
                                    }
                                  }}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="exclusions">Exclusions</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add exclusion"
                          value={newExclusion}
                          onChange={(e) => setNewExclusion(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addToArray("exclusions", newExclusion);
                              setNewExclusion("");
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            addToArray("exclusions", newExclusion);
                            setNewExclusion("");
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {formData.exclusions.map((exclusion, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-muted p-2 rounded"
                          >
                            <span>{exclusion}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                removeFromArray("exclusions", exclusion)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Itinerary */}
              <TabsContent value="itinerary" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Day-by-Day Itinerary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Existing itinerary days */}
                    {formData.itinerary.map((day, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm flex items-center justify-center">
                              {day.day}
                            </span>
                            {day.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItineraryDay(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-muted-foreground mb-2">
                          {day.description}
                        </p>
                        <div className="text-sm text-muted-foreground">
                          <div>
                            <strong>Activities:</strong>{" "}
                            {day.activities.join(", ") || "None specified"}
                          </div>
                          {day.accommodation && (
                            <div>
                              <strong>Accommodation:</strong>{" "}
                              {day.accommodation}
                            </div>
                          )}
                          {day.meals.length > 0 && (
                            <div>
                              <strong>Meals:</strong> {day.meals.join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Add new day form */}
                    <div className="border-2 border-dashed border-muted rounded-lg p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-muted text-muted-foreground rounded-full text-sm flex items-center justify-center">
                          {newItineraryDay.day}
                        </span>
                        Add Day {newItineraryDay.day}
                      </h4>
                      <div className="space-y-4">
                        <Input
                          placeholder="Day title (e.g., Arrival & Gothic Quarter Discovery)"
                          value={newItineraryDay.title}
                          onChange={(e) =>
                            setNewItineraryDay({
                              ...newItineraryDay,
                              title: e.target.value,
                            })
                          }
                        />
                        <Textarea
                          placeholder="Day description..."
                          value={newItineraryDay.description}
                          onChange={(e) =>
                            setNewItineraryDay({
                              ...newItineraryDay,
                              description: e.target.value,
                            })
                          }
                          rows={3}
                        />
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Accommodation"
                            value={newItineraryDay.accommodation}
                            onChange={(e) =>
                              setNewItineraryDay({
                                ...newItineraryDay,
                                accommodation: e.target.value,
                              })
                            }
                          />
                          <Input
                            placeholder="Transportation"
                            value={newItineraryDay.transportation}
                            onChange={(e) =>
                              setNewItineraryDay({
                                ...newItineraryDay,
                                transportation: e.target.value,
                              })
                            }
                          />
                        </div>
                        <Button
                          onClick={addItineraryDay}
                          disabled={
                            !newItineraryDay.title ||
                            !newItineraryDay.description
                          }
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Day
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Policies */}
              <TabsContent value="policies" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Policies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="cancellationPolicy">
                        Cancellation Policy
                      </Label>
                      <Textarea
                        id="cancellationPolicy"
                        placeholder="e.g., Free cancellation up to 48 hours before departure. 50% refund for cancellations 24-48 hours prior."
                        value={formData.bookingPolicy.cancellationPolicy}
                        onChange={(e) =>
                          updateFormData("bookingPolicy", {
                            ...formData.bookingPolicy,
                            cancellationPolicy: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="paymentTerms">Payment Terms</Label>
                      <Textarea
                        id="paymentTerms"
                        placeholder="e.g., 50% deposit required at booking, remainder due 30 days before departure."
                        value={formData.bookingPolicy.paymentTerms}
                        onChange={(e) =>
                          updateFormData("bookingPolicy", {
                            ...formData.bookingPolicy,
                            paymentTerms: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="refundPolicy">Refund Policy</Label>
                      <Textarea
                        id="refundPolicy"
                        placeholder="e.g., Full refund for cancellations 48+ hours prior to departure."
                        value={formData.bookingPolicy.refundPolicy}
                        onChange={(e) =>
                          updateFormData("bookingPolicy", {
                            ...formData.bookingPolicy,
                            refundPolicy: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-8 border-t">
              <div className="text-sm text-muted-foreground">
                {isFormValid() ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <Info className="h-4 w-4" />
                    Package is ready to submit
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    Please complete all required fields
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => handleSubmit(true)}>
                  <Save className="mr-2 h-4 w-4" />
                  Save as Draft
                </Button>
                <Button
                  onClick={() => handleSubmit(false)}
                  disabled={!isFormValid()}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Submit for Review
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
