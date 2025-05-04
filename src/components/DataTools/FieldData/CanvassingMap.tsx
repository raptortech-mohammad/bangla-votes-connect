
import React, { useState } from 'react';
import { ChartBar, Download, Filter, Map, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BangladeshMap from '../Mapping/BangladeshMap';

const CanvassingMap: React.FC = () => {
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);
  const [mapMode, setMapMode] = useState<string>("canvassing");
  
  // Mock canvassing data
  const canvassingData = [
    { district: 'Dhaka', households: 12500, contacted: 8750, supporters: 5320, volunteers: 145 },
    { district: 'Chittagong', households: 8700, contacted: 5400, supporters: 3100, volunteers: 78 },
    { district: 'Rajshahi', households: 5200, contacted: 3800, supporters: 2250, volunteers: 42 },
    { district: 'Khulna', households: 4800, contacted: 2900, supporters: 1750, volunteers: 37 },
    { district: 'Sylhet', households: 3700, contacted: 2200, supporters: 1400, volunteers: 28 },
  ];
  
  const handleDistrictHover = (districtId: string | null) => {
    setActiveDistrict(districtId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Select defaultValue={mapMode} onValueChange={setMapMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Map view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="canvassing">Canvassing Coverage</SelectItem>
              <SelectItem value="support">Support Levels</SelectItem>
              <SelectItem value="contacts">Contact Rate</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar with stats */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Canvassing Statistics</CardTitle>
            <CardDescription>Overall field operations data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Total Households</div>
                <div className="text-2xl font-bold">94,500</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">Households Contacted</div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">52,350</div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">55.4%</Badge>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '55.4%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">Identified Supporters</div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">28,790</div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">30.5%</Badge>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30.5%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">Active Volunteers</div>
                <div className="text-xl font-bold flex items-center gap-2">
                  425 <span className="text-sm font-normal text-green-600">↑ 15%</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2 flex items-center gap-1">
                  <Map className="h-4 w-4" /> Top Districts
                </h4>
                <div className="space-y-2">
                  {canvassingData.slice(0, 3).map(item => (
                    <div key={item.district} className="flex justify-between items-center text-sm">
                      <span>{item.district}</span>
                      <span>{Math.round(item.contacted / item.households * 100)}% contacted</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Map visualization */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Canvassing Map</CardTitle>
                <CardDescription>Geographic distribution of canvassing efforts</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  Volunteers
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ChartBar className="h-3.5 w-3.5" />
                  Analysis
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] bg-slate-100 rounded-md border relative overflow-hidden">
              <BangladeshMap
                activeDistrict={activeDistrict}
                setActiveDistrict={handleDistrictHover}
                mapMode={mapMode}
                onDistrictClick={() => {}}
                compareMode={false}
                selectedDistricts={[]}
              />
              
              {/* Info overlay for active district */}
              {activeDistrict && (
                <div className="absolute top-4 right-4 bg-white/95 p-4 rounded-lg shadow-lg border border-gray-200 max-w-xs">
                  {canvassingData.filter(d => d.district.toLowerCase() === activeDistrict).map(district => (
                    <div key={district.district}>
                      <h3 className="font-semibold text-lg text-gray-900">{district.district}</h3>
                      <div className="text-sm space-y-2 mt-2">
                        <p><span className="font-medium">Households:</span> {district.households.toLocaleString()}</p>
                        <p><span className="font-medium">Contacted:</span> {district.contacted.toLocaleString()} ({Math.round(district.contacted / district.households * 100)}%)</p>
                        <p><span className="font-medium">Supporters:</span> {district.supporters.toLocaleString()} ({Math.round(district.supporters / district.households * 100)}%)</p>
                        <p><span className="font-medium">Volunteers:</span> {district.volunteers}</p>
                        
                        <div className="mt-3 pt-2 border-t border-gray-200">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Contact Rate</span>
                            <span>{Math.round(district.contacted / district.households * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full bg-blue-500" 
                              style={{ width: `${Math.round(district.contacted / district.households * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {canvassingData.filter(d => d.district.toLowerCase() === activeDistrict).length === 0 && (
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{activeDistrict}</h3>
                      <p className="text-sm text-muted-foreground mt-1">No canvassing data available yet.</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-white/80 p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Map className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Canvassing coverage by district</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">High (&gt;70%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs">Medium (30-70%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs">Low (&lt;30%)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CanvassingMap;
