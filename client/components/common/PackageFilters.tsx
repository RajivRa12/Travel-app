import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { PackageFilter } from "@shared/packages";

interface PackageFiltersProps {
  filters: PackageFilter;
  onFiltersChange: (filters: PackageFilter) => void;
  onClearFilters: () => void;
}

export default function PackageFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: PackageFiltersProps) {
  const [openSections, setOpenSections] = useState({
    destinations: true,
    category: true,
    price: true,
    duration: false,
    difficulty: false,
    advanced: false,
  });

  const destinations = [
    "Europe",
    "Asia",
    "Americas",
    "Africa",
    "Oceania",
    "Barcelona",
    "Tokyo",
    "Paris",
    "London",
    "New York",
    "Dubai",
    "Singapore",
    "Bali",
    "Thailand",
    "Italy",
  ];

  const categories = [
    { id: "adventure", label: "Adventure", count: 45 },
    { id: "cultural", label: "Cultural", count: 38 },
    { id: "relaxation", label: "Relaxation", count: 29 },
    { id: "family", label: "Family", count: 52 },
    { id: "honeymoon", label: "Honeymoon", count: 21 },
    { id: "business", label: "Business", count: 8 },
    { id: "group", label: "Group", count: 33 },
    { id: "solo", label: "Solo", count: 18 },
  ];

  const themes = [
    "Food & Wine",
    "Wildlife",
    "Architecture",
    "Beach",
    "Mountains",
    "Desert",
    "History",
    "Art & Museums",
    "Shopping",
    "Nightlife",
    "Photography",
    "Wellness",
  ];

  const difficulties = [
    { id: "easy", label: "Easy", count: 67 },
    { id: "moderate", label: "Moderate", count: 89 },
    { id: "challenging", label: "Challenging", count: 23 },
  ];

  const languages = [
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

  const updateFilters = (key: keyof PackageFilter, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleArrayFilter = (key: keyof PackageFilter, value: string) => {
    const currentArray = (filters[key] as string[]) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];

    updateFilters(key, newArray.length > 0 ? newArray : undefined);
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.destinations?.length) count++;
    if (filters.category?.length) count++;
    if (filters.themes?.length) count++;
    if (filters.priceRange) count++;
    if (filters.duration) count++;
    if (filters.difficulty?.length) count++;
    if (filters.minRating) count++;
    if (filters.languages?.length) count++;
    return count;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
            )}
          </div>
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-auto p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Destinations */}
        <Collapsible
          open={openSections.destinations}
          onOpenChange={() => toggleSection("destinations")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="text-sm font-medium">Destinations</Label>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.destinations ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            <div className="max-h-40 overflow-y-auto space-y-2">
              {destinations.map((destination) => (
                <div key={destination} className="flex items-center space-x-2">
                  <Checkbox
                    id={destination}
                    checked={filters.destinations?.includes(destination)}
                    onCheckedChange={() =>
                      toggleArrayFilter("destinations", destination)
                    }
                  />
                  <Label
                    htmlFor={destination}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {destination}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Category */}
        <Collapsible
          open={openSections.category}
          onOpenChange={() => toggleSection("category")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="text-sm font-medium">Category</Label>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.category ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={filters.category?.includes(category.id)}
                    onCheckedChange={() =>
                      toggleArrayFilter("category", category.id)
                    }
                  />
                  <Label
                    htmlFor={category.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category.label}
                  </Label>
                </div>
                <span className="text-xs text-muted-foreground">
                  {category.count}
                </span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Price Range */}
        <Collapsible
          open={openSections.price}
          onOpenChange={() => toggleSection("price")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="text-sm font-medium">Price Range</Label>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.price ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="flex justify-between text-sm">
              <span>${filters.priceRange?.[0] || 0}</span>
              <span>${filters.priceRange?.[1] || 10000}</span>
            </div>
            <Slider
              value={filters.priceRange || [0, 10000]}
              onValueChange={(value) => updateFilters("priceRange", value)}
              max={10000}
              min={0}
              step={100}
              className="w-full"
            />
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Duration */}
        <Collapsible
          open={openSections.duration}
          onOpenChange={() => toggleSection("duration")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="text-sm font-medium">Duration (Days)</Label>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.duration ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="flex justify-between text-sm">
              <span>{filters.duration?.[0] || 1} days</span>
              <span>{filters.duration?.[1] || 30} days</span>
            </div>
            <Slider
              value={filters.duration || [1, 30]}
              onValueChange={(value) => updateFilters("duration", value)}
              max={30}
              min={1}
              step={1}
              className="w-full"
            />
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Difficulty */}
        <Collapsible
          open={openSections.difficulty}
          onOpenChange={() => toggleSection("difficulty")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="text-sm font-medium">Difficulty</Label>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.difficulty ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {difficulties.map((difficulty) => (
              <div
                key={difficulty.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={difficulty.id}
                    checked={filters.difficulty?.includes(difficulty.id)}
                    onCheckedChange={() =>
                      toggleArrayFilter("difficulty", difficulty.id)
                    }
                  />
                  <Label
                    htmlFor={difficulty.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {difficulty.label}
                  </Label>
                </div>
                <span className="text-xs text-muted-foreground">
                  {difficulty.count}
                </span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Minimum Rating */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Minimum Rating: {filters.minRating?.[0]?.toFixed(1) || 1.0}★
          </Label>
          <Slider
            value={filters.minRating || [1.0]}
            onValueChange={(value) => updateFilters("minRating", value[0])}
            max={5}
            min={1}
            step={0.1}
            className="w-full"
          />
        </div>

        <Separator />

        {/* Advanced Filters */}
        <Collapsible
          open={openSections.advanced}
          onOpenChange={() => toggleSection("advanced")}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="text-sm font-medium">Advanced Filters</Label>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.advanced ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-3">
            {/* Themes */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Themes</Label>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {themes.map((theme) => (
                  <div key={theme} className="flex items-center space-x-2">
                    <Checkbox
                      id={theme}
                      checked={filters.themes?.includes(theme)}
                      onCheckedChange={() => toggleArrayFilter("themes", theme)}
                    />
                    <Label
                      htmlFor={theme}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {theme}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Languages
              </Label>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {languages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={filters.languages?.includes(language)}
                      onCheckedChange={() =>
                        toggleArrayFilter("languages", language)
                      }
                    />
                    <Label
                      htmlFor={language}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {language}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium mb-1 block">
                  Start Date
                </Label>
                <Input
                  type="date"
                  value={filters.startDate || ""}
                  onChange={(e) => updateFilters("startDate", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1 block">
                  End Date
                </Label>
                <Input
                  type="date"
                  value={filters.endDate || ""}
                  onChange={(e) => updateFilters("endDate", e.target.value)}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
