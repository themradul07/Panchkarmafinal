import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterState {
  clinics: string[];
  specializations: string[];
  experienceRange: [number, number];
  minRating: number;
}

interface TherapistFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const clinicOptions = [
  "Ayur Wellness Center",
  "Panchakarma Healing Hub",
  "Vedic Health Clinic",
  "Natural Therapy Center",
  "Holistic Ayurveda Clinic"
];

const specializationOptions = [
  "Vamana",
  "Basti", 
  "Nasya",
  "Raktamokshana",
  "Stress Management",
  "Detoxification",
  "Pain Management",
  "Digestive Health",
  "Mental Wellness",
  "Skin Care"
];

export function TherapistFilters({ filters, onFiltersChange, onClearFilters }: TherapistFiltersProps) {
  const handleClinicChange = (clinic: string, checked: boolean) => {
    const updatedClinics = checked
      ? [...filters.clinics, clinic]
      : filters.clinics.filter(c => c !== clinic);
    
    onFiltersChange({ ...filters, clinics: updatedClinics });
  };

  const handleSpecializationChange = (specialization: string, checked: boolean) => {
    const updatedSpecs = checked
      ? [...filters.specializations, specialization]
      : filters.specializations.filter(s => s !== specialization);
    
    onFiltersChange({ ...filters, specializations: updatedSpecs });
  };

  const handleExperienceChange = (value: number[]) => {
    onFiltersChange({ ...filters, experienceRange: [value[0], value[1]] });
  };

  const handleRatingChange = (value: string) => {
    onFiltersChange({ ...filters, minRating: parseInt(value) });
  };

  const hasActiveFilters = filters.clinics.length > 0 || 
                          filters.specializations.length > 0 || 
                          filters.experienceRange[0] > 0 || 
                          filters.experienceRange[1] < 30 ||
                          filters.minRating > 0;

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Clinic Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Clinic</Label>
          <div className="space-y-2">
            {clinicOptions.map((clinic) => (
              <div key={clinic} className="flex items-center space-x-2">
                <Checkbox
                  id={`clinic-${clinic}`}
                  checked={filters.clinics.includes(clinic)}
                  onCheckedChange={(checked) => 
                    handleClinicChange(clinic, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`clinic-${clinic}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {clinic}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Specialization Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Specialization</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {specializationOptions.map((spec) => (
              <div key={spec} className="flex items-center space-x-2">
                <Checkbox
                  id={`spec-${spec}`}
                  checked={filters.specializations.includes(spec)}
                  onCheckedChange={(checked) => 
                    handleSpecializationChange(spec, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`spec-${spec}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {spec}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Experience: {filters.experienceRange[0]} - {filters.experienceRange[1]} years
          </Label>
          <Slider
            value={filters.experienceRange}
            onValueChange={handleExperienceChange}
            max={30}
            min={0}
            step={1}
            className="w-full"
          />
        </div>

        {/* Rating Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
          <Select value={filters.minRating.toString()} onValueChange={handleRatingChange}>
            <SelectTrigger>
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any rating</SelectItem>
              <SelectItem value="3">3+ stars</SelectItem>
              <SelectItem value="4">4+ stars</SelectItem>
              <SelectItem value="5">5 stars only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}