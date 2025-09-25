import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TherapistCard } from "@/components/TherapistCard";
import { TherapistSearch } from "@/components/TherapistSearch";
import { TherapistFilters } from "@/components/TherapistFilters";
import { therapistsData, Therapist } from "@/data/therapists";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FilterState {
  clinics: string[];
  specializations: string[];
  experienceRange: [number, number];
  minRating: number;
}

const ITEMS_PER_PAGE = 6;

export default function TherapistListing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    clinics: [],
    specializations: [],
    experienceRange: [0, 30],
    minRating: 0
  });

  // Filter and sort therapists
  const filteredAndSortedTherapists = useMemo(() => {
    let filtered = therapistsData.filter((therapist) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          therapist.name.toLowerCase().includes(query) ||
          therapist.designation.toLowerCase().includes(query) ||
          therapist.clinic.toLowerCase().includes(query) ||
          therapist.specializations.some(spec => 
            spec.toLowerCase().includes(query)
          );
        if (!matchesSearch) return false;
      }

      // Clinic filter
      if (filters.clinics.length > 0 && !filters.clinics.includes(therapist.clinic)) {
        return false;
      }

      // Specialization filter
      if (filters.specializations.length > 0) {
        const hasMatchingSpec = therapist.specializations.some(spec =>
          filters.specializations.includes(spec)
        );
        if (!hasMatchingSpec) return false;
      }

      // Experience range filter
      if (therapist.experience < filters.experienceRange[0] || 
          therapist.experience > filters.experienceRange[1]) {
        return false;
      }

      // Rating filter
      if (therapist.rating < filters.minRating) {
        return false;
      }

      return true;
    });

    // Sort
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return b.experience - a.experience;
        case "reviews":
          return b.totalReviews - a.totalReviews;
        case "name":
          return a.name.localeCompare(b.name);
        case "fee":
          return a.consultationFee - b.consultationFee;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTherapists.length / ITEMS_PER_PAGE);
  const paginatedTherapists = filteredAndSortedTherapists.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewProfile = (id: string) => {
    navigate(`/therapists/${id}`);
  };

  const handleClearFilters = () => {
    setFilters({
      clinics: [],
      specializations: [],
      experienceRange: [0, 30],
      minRating: 0
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Reset page when filters change
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <>
    <Navbar />
    
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Panchakarma Therapist</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Connect with experienced Ayurveda specialists and certified Panchakarma therapists 
              across top wellness clinics for authentic healing experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <TherapistSearch
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onToggleFilters={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
            totalResults={filteredAndSortedTherapists.length}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-64 w-full">
              <TherapistFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          )}

          {/* Therapist Cards */}
          <div className="flex-1">
            {paginatedTherapists.length > 0 ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {paginatedTherapists.map((therapist) => (
                    <TherapistCard
                      key={therapist.id}
                      therapist={therapist}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-10"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <svg
                    className="mx-auto h-12 w-12 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium">No therapists found</h3>
                  <p className="text-sm">Try adjusting your search criteria or filters</p>
                </div>
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}