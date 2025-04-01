
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, Users, Calendar, Share2, LineChart, BarChart, PieChart,
  Instagram, Facebook, Twitter, Mail, Globe, Award, DollarSign, Target
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MarketingManagerDashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState("month");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Marketing Manager Dashboard</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-2">
          <Button 
            variant={selectedDateRange === "week" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedDateRange("week")}
          >
            Weekly
          </Button>
          <Button 
            variant={selectedDateRange === "month" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedDateRange("month")}
          >
            Monthly
          </Button>
          <Button 
            variant={selectedDateRange === "quarter" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedDateRange("quarter")}
          >
            Quarterly
          </Button>
          <Button 
            variant={selectedDateRange === "year" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedDateRange("year")}
          >
            Yearly
          </Button>
        </div>
        <Button>
          <Share2 className="h-4 w-4 mr-2" />
          Export Reports
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Website Traffic</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4K</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Campaigns</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Next launch: Sep 15</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Social Engagement</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7K</div>
            <p className="text-xs text-muted-foreground">+24% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Active Marketing Campaigns</CardTitle>
                    <Button>
                      <Calendar className="h-4 w-4 mr-2" />
                      New Campaign
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Summer Getaway</TableCell>
                        <TableCell>Google, Facebook</TableCell>
                        <TableCell>Jul 01, 2023</TableCell>
                        <TableCell>Aug 31, 2023</TableCell>
                        <TableCell>$5,000</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fall Promotion</TableCell>
                        <TableCell>Instagram, TikTok</TableCell>
                        <TableCell>Sep 15, 2023</TableCell>
                        <TableCell>Nov 15, 2023</TableCell>
                        <TableCell>$7,500</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                            Scheduled
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Spa Package</TableCell>
                        <TableCell>Email, Website</TableCell>
                        <TableCell>Aug 15, 2023</TableCell>
                        <TableCell>Ongoing</TableCell>
                        <TableCell>$3,000</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Holiday Special</TableCell>
                        <TableCell>All Channels</TableCell>
                        <TableCell>Dec 01, 2023</TableCell>
                        <TableCell>Dec 31, 2023</TableCell>
                        <TableCell>$10,000</TableCell>
                        <TableCell>
                          <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100 border-none">
                            Draft
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Current active campaigns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Summer Getaway</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full w-3/4"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Budget Spent: $3,750/$5,000</span>
                    <span>ROI: 220%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Spa Package</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-[45%]"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Budget Spent: $1,350/$3,000</span>
                    <span>ROI: 180%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Weekday Special</span>
                    <span className="text-sm font-medium">100%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-amber-500 rounded-full w-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Budget Spent: $2,500/$2,500</span>
                    <span>ROI: 150%</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t mt-4">
                  <h3 className="font-medium text-sm mb-2">Campaign Goals Tracker</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bookings: 145/200</span>
                      <span className="text-sm">72.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Revenue: $87K/$120K</span>
                      <span className="text-sm">72.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Leads: 520/500</span>
                      <span className="text-sm text-green-600">104%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Traffic Analytics</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <LineChart className="h-4 w-4 mr-2" />
                      Line
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart className="h-4 w-4 mr-2" />
                      Bar
                    </Button>
                  </div>
                </div>
                <CardDescription>Website traffic and booking conversion trends</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <LineChart className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Traffic Analytics Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Top referring channels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center border-2 border-dashed rounded-lg mb-4">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Traffic Sources Chart Placeholder</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Organic Search</span>
                    </div>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Direct Traffic</span>
                    </div>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm">Social Media</span>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm">Referral</span>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                      <span className="text-sm">Other</span>
                    </div>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>Website visitor to booking journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Website Visitors</span>
                    <span className="text-sm font-medium">12,450</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="border-l-2 border-dashed h-6 border-gray-300"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Room Page Views</span>
                    <span className="text-sm font-medium">7,860 (63%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-[63%]"></div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="border-l-2 border-dashed h-6 border-gray-300"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Booking Engine Visits</span>
                    <span className="text-sm font-medium">2,240 (18%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-[18%]"></div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="border-l-2 border-dashed h-6 border-gray-300"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Completed Bookings</span>
                    <span className="text-sm font-medium">398 (3.2%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full w-[3.2%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Landing Pages</CardTitle>
                <CardDescription>Pages with highest traffic and conversion</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Conv. Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">/special-offers</TableCell>
                      <TableCell>2,456</TableCell>
                      <TableCell className="text-green-600">4.8%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">/suites</TableCell>
                      <TableCell>1,845</TableCell>
                      <TableCell className="text-green-600">3.9%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">/spa-packages</TableCell>
                      <TableCell>1,532</TableCell>
                      <TableCell className="text-green-600">3.5%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">/deluxe-rooms</TableCell>
                      <TableCell>1,274</TableCell>
                      <TableCell className="text-green-600">2.8%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">/homepage</TableCell>
                      <TableCell>3,658</TableCell>
                      <TableCell className="text-amber-600">1.9%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>Upcoming content schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between mb-4">
                  <Button variant="outline" size="sm">Today</Button>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">August 2023</Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2 bg-blue-50">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-800">Today, 11:00 AM</span>
                  </div>
                  <h3 className="font-medium">Summer Poolside Instagram Post</h3>
                  <div className="flex justify-between">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                      Instagram
                    </Badge>
                    <Button variant="ghost" size="sm">Preview</Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Tomorrow, 9:00 AM</span>
                  </div>
                  <h3 className="font-medium">Weekend Getaway Email Campaign</h3>
                  <div className="flex justify-between">
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                      Email
                    </Badge>
                    <Button variant="ghost" size="sm">Preview</Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Aug 12, 3:00 PM</span>
                  </div>
                  <h3 className="font-medium">Chef's Special Menu Reveal</h3>
                  <div className="flex justify-between">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
                      Facebook
                    </Badge>
                    <Button variant="ghost" size="sm">Preview</Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Aug 15, 10:00 AM</span>
                  </div>
                  <h3 className="font-medium">Spa Wellness Blog Post</h3>
                  <div className="flex justify-between">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                      Blog
                    </Badge>
                    <Button variant="ghost" size="sm">Preview</Button>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Content
                </Button>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Content Performance</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Content</SelectItem>
                      <SelectItem value="blog">Blog Posts</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="email">Email Campaigns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>Engagement metrics by content type</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Content Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Published</TableHead>
                      <TableHead>Views/Opens</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>Conversions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">10 Reasons to Book a Summer Stay</TableCell>
                      <TableCell>
                        <Badge variant="outline">Blog</Badge>
                      </TableCell>
                      <TableCell>Jul 5, 2023</TableCell>
                      <TableCell>4,256</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>8.5%</span>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                      </TableCell>
                      <TableCell>12</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Exclusive Weekend Offer</TableCell>
                      <TableCell>
                        <Badge variant="outline">Email</Badge>
                      </TableCell>
                      <TableCell>Jul 12, 2023</TableCell>
                      <TableCell>8,742</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>22.4%</span>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                      </TableCell>
                      <TableCell>64</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sunset by the Pool</TableCell>
                      <TableCell>
                        <Badge variant="outline">Instagram</Badge>
                      </TableCell>
                      <TableCell>Jul 18, 2023</TableCell>
                      <TableCell>3,845</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>5.2%</span>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                      </TableCell>
                      <TableCell>8</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Chef's Signature Dishes</TableCell>
                      <TableCell>
                        <Badge variant="outline">Facebook</Badge>
                      </TableCell>
                      <TableCell>Jul 22, 2023</TableCell>
                      <TableCell>2,156</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>4.8%</span>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                      </TableCell>
                      <TableCell>6</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Summer Family Package</TableCell>
                      <TableCell>
                        <Badge variant="outline">Email</Badge>
                      </TableCell>
                      <TableCell>Jul 25, 2023</TableCell>
                      <TableCell>7,854</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>18.7%</span>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                      </TableCell>
                      <TableCell>45</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="social">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Metrics</CardTitle>
                <CardDescription>Performance across platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <span className="font-medium">Instagram</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Followers</p>
                      <p className="font-medium">12.4K</p>
                      <p className="text-xs text-green-600">+5.2%</p>
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Engagement</p>
                      <p className="font-medium">3.8%</p>
                      <p className="text-xs text-green-600">+0.5%</p>
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Reach</p>
                      <p className="font-medium">28.5K</p>
                      <p className="text-xs text-green-600">+12%</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Facebook</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Followers</p>
                      <p className="font-medium">24.8K</p>
                      <p className="text-xs text-green-600">+2.8%</p>
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Engagement</p>
                      <p className="font-medium">2.1%</p>
                      <p className="text-xs text-red-600">-0.3%</p>
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Reach</p>
                      <p className="font-medium">42.3K</p>
                      <p className="text-xs text-green-600">+8.5%</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Twitter className="h-5 w-5 text-blue-400" />
                    <span className="font-medium">Twitter</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Followers</p>
                      <p className="font-medium">8.6K</p>
                      <p className="text-xs text-green-600">+3.4%</p>
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Engagement</p>
                      <p className="font-medium">1.9%</p>
                      <p className="text-xs text-green-600">+0.2%</p>
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Reach</p>
                      <p className="font-medium">15.2K</p>
                      <p className="text-xs text-green-600">+5.7%</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Manage Social Accounts
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
                <CardDescription>Highest engagement content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <img src="https://placehold.co/600x400/e5e7eb/a3a3a3?text=Post+Image" alt="Post preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-pink-600" />
                        <span className="text-sm font-medium">Instagram</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Posted 5 days ago</span>
                    </div>
                    <p className="text-sm">Experience the perfect sunset from our rooftop infinity pool 🌅 #LuxuryStay #SummerVibes</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>4,256 likes</span>
                      <span>328 comments</span>
                      <span>98 shares</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <img src="https://placehold.co/600x400/e5e7eb/a3a3a3?text=Post+Image" alt="Post preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Facebook className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Facebook</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Posted 10 days ago</span>
                    </div>
                    <p className="text-sm">Our chef's new summer menu is now available! Come taste the freshest seasonal ingredients in our award-winning restaurant.</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>2,845 likes</span>
                      <span>156 comments</span>
                      <span>76 shares</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Content Schedule</CardTitle>
                <CardDescription>Upcoming social media posts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between mb-4">
                  <Input placeholder="Search scheduled content..." className="max-w-xs" />
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Post
                  </Button>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Today, 4:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-pink-600" />
                    <h3 className="font-medium">Summer Cocktail Feature</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Beat the heat with our signature summer cocktails! Our mixologists have crafted refreshing...
                  </p>
                  <div className="flex justify-between">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                      Scheduled
                    </Badge>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Tomorrow, 11:00 AM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    <h3 className="font-medium">Family Package Announcement</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Planning a family getaway? Our new all-inclusive family package includes...
                  </p>
                  <div className="flex justify-between">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                      Scheduled
                    </Badge>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                
                <div className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Aug 12, 3:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-blue-400" />
                    <h3 className="font-medium">Weekend Events Roundup</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Join us this weekend for live music, wine tasting, and more! Check out our full event calendar...
                  </p>
                  <div className="flex justify-between">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                      Scheduled
                    </Badge>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="budget">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Budget Overview</CardTitle>
                <CardDescription>Fiscal Year 2023</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Total Budget</p>
                      <p className="text-xl font-bold">$250,000</p>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Details</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Budget Spent</span>
                    <span className="text-sm font-medium">45% ($112,500)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-[45%]"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Year Progress: 58%</span>
                    <span className="text-green-600">Under budget</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Budget Allocation</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Digital Advertising</span>
                      <span>$95,000 (38%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-purple-500 rounded-full w-[38%]"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Content Marketing</span>
                      <span>$75,000 (30%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full w-[30%]"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Social Media</span>
                      <span>$50,000 (20%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full w-[20%]"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Events & Partnerships</span>
                      <span>$30,000 (12%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-amber-500 rounded-full w-[12%]"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Campaign ROI Analysis</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by ROI" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Campaigns</SelectItem>
                      <SelectItem value="high">High ROI (&gt;200%)</SelectItem>
                      <SelectItem value="medium">Medium ROI (100-200%)</SelectItem>
                      <SelectItem value="low">Low ROI (&lt;100%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>Return on investment by campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>ROI</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Summer Getaway</TableCell>
                      <TableCell>$5,000</TableCell>
                      <TableCell>$3,750</TableCell>
                      <TableCell>$12,000</TableCell>
                      <TableCell className="font-medium text-green-600">320%</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Spa Package</TableCell>
                      <TableCell>$3,000</TableCell>
                      <TableCell>$1,350</TableCell>
                      <TableCell>$2,700</TableCell>
                      <TableCell className="font-medium text-green-600">200%</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Weekday Special</TableCell>
                      <TableCell>$2,500</TableCell>
                      <TableCell>$2,500</TableCell>
                      <TableCell>$3,750</TableCell>
                      <TableCell className="font-medium text-amber-600">150%</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                          Completed
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Wedding Packages</TableCell>
                      <TableCell>$4,500</TableCell>
                      <TableCell>$2,250</TableCell>
                      <TableCell>$5,625</TableCell>
                      <TableCell className="font-medium text-green-600">250%</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Business Conference</TableCell>
                      <TableCell>$2,000</TableCell>
                      <TableCell>$1,800</TableCell>
                      <TableCell>$1,260</TableCell>
                      <TableCell className="font-medium text-red-600">70%</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">
                          Underperforming
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Missing components used in layout
const ChevronLeft = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
};

const ChevronRight = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
};

export default MarketingManagerDashboard;
