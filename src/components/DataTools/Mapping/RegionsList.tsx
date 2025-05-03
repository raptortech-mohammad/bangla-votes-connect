
import React from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export interface District {
  id: string;
  name: string;
  voterCount: number;
  supporters: number;
  coordinators: number;
}

interface RegionsListProps {
  districts: District[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const RegionsList: React.FC<RegionsListProps> = ({ 
  districts, 
  searchTerm, 
  setSearchTerm 
}) => {
  // Filter districts based on search term
  const filteredDistricts = searchTerm 
    ? districts.filter(district => 
        district.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : districts;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input 
            placeholder="Search regions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="max-h-64 overflow-y-auto border rounded-md divide-y">
          {filteredDistricts.length > 0 ? (
            filteredDistricts.map(district => (
              <div key={district.id} className="p-3 hover:bg-muted cursor-pointer">
                <div className="font-medium">{district.name}</div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                  <span>{district.supporters.toLocaleString()} supporters</span>
                  <span>{Math.round((district.supporters / district.voterCount) * 100)}%</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No regions found matching "{searchTerm}"
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionsList;
