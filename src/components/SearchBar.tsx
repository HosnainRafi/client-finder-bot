import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
}

interface SearchFilters {
  industry?: string;
  companySize?: string;
  location?: string;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleSearch = () => {
    onSearch(query, filters);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border">
      <div className="flex-1 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for companies, technologies, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} className="shrink-0">
          Search
        </Button>
      </div>
      
      <div className="flex gap-2 items-center">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select onValueChange={(value) => setFilters(prev => ({ ...prev, industry: value }))}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="retail">Retail</SelectItem>
            <SelectItem value="manufacturing">Manufacturing</SelectItem>
          </SelectContent>
        </Select>
        
        <Select onValueChange={(value) => setFilters(prev => ({ ...prev, companySize: value }))}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Company Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="startup">Startup (1-10)</SelectItem>
            <SelectItem value="small">Small (11-50)</SelectItem>
            <SelectItem value="medium">Medium (51-200)</SelectItem>
            <SelectItem value="large">Large (200+)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};