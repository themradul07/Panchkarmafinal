import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TherapistSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onToggleFilters: () => void;
  showFilters: boolean;
  totalResults: number;
}

export function TherapistSearch({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onToggleFilters,
  showFilters,
  totalResults
}: TherapistSearchProps) {
  return (
    <div className="bg-gradient-card p-6 rounded-lg shadow-card border border-border/50">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by therapist name, specialization, or clinic..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 h-11 bg-background/50 border-border/50 focus:border-primary"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="w-full lg:w-auto">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full lg:w-[200px] h-11">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="fee">Consultation Fee</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filters Toggle */}
        <Button
          variant="outline"
          onClick={onToggleFilters}
          className={`w-full lg:w-auto h-11 ${showFilters ? 'bg-primary/10 border-primary/20' : ''}`}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Results Count */}
      <div className="mt-4 text-sm text-muted-foreground">
        {totalResults > 0 ? (
          `Showing ${totalResults} therapist${totalResults !== 1 ? 's' : ''}`
        ) : (
          'No therapists found matching your criteria'
        )}
      </div>
    </div>
  );
}