
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  BarChart,
  PieChart,
  LineChart
} from "lucide-react";
import { 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart as RechartsLineChart, 
  Pie, 
  PieChart as RechartsPieChart, 
  Sector,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis, 
  YAxis,
  BarChart as RechartsBarChart,
  Bar
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data fetching function for revenue data
const fetchRevenueData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { month: 'Jan', revenue: 8400, costs: 5600, profit: 2800 },
        { month: 'Feb', revenue: 9200, costs: 6100, profit: 3100 },
        { month: 'Mar', revenue: 8900, costs: 5900, profit: 3000 },
        { month: 'Apr', revenue: 9600, costs: 6300, profit: 3300 },
        { month: 'May', revenue: 10200, costs: 6800, profit: 3400 },
        { month: 'Jun', revenue: 11500, costs: 7200, profit: 4300 },
        { month: 'Jul', revenue: 12800, costs: 7900, profit: 4900 },
        { month: 'Aug', revenue: 14200, costs: 8400, profit: 5800 },
        { month: 'Sep', revenue: 13100, costs: 8100, profit: 5000 },
        { month: 'Oct', revenue: 12400, costs: 7600, profit: 4800 },
        { month: 'Nov', revenue: 11800, costs: 7400, profit: 4400 },
        { month: 'Dec', revenue: 13500, costs: 8200, profit: 5300 }
      ]);
    }, 500);
  });
};

// Mock data fetching function for guest data
const fetchGuestData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { month: 'Jan', guests: 124 },
        { month: 'Feb', guests: 142 },
        { month: 'Mar', guests: 156 },
        { month: 'Apr', guests: 168 },
        { month: 'May', guests: 182 },
        { month: 'Jun', guests: 214 },
        { month: 'Jul', guests: 246 },
        { month: 'Aug', guests: 268 },
        { month: 'Sep', guests: 232 },
        { month: 'Oct', guests: 198 },
        { month: 'Nov', guests: 186 },
        { month: 'Dec', guests: 220 }
      ]);
    }, 500);
  });
};

// Mock data fetching function for occupancy data
const fetchOccupancyData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Standard', value: 40 },
        { name: 'Deluxe', value: 30 },
        { name: 'Suite', value: 20 },
        { name: 'Presidential', value: 10 }
      ]);
    }, 500);
  });
};

// Mock data fetching function for revenue by service
const fetchRevenueByServiceData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Rooms', value: 65 },
        { name: 'Restaurant', value: 15 },
        { name: 'Spa', value: 10 },
        { name: 'Events', value: 5 },
        { name: 'Other', value: 5 }
      ]);
    }, 500);
  });
};

const COLORS = ['#8B5CF6', '#0EA5E9', '#10B981', '#F59E0B', '#6366F1'];

// Function to download chart data as CSV
const downloadCSV = (data: any[], filename: string) => {
  // Get the headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV string with headers
  let csvContent = headers.join(',') + '\n';
  
  // Add rows
  data.forEach(item => {
    const row = headers.map(header => {
      // Handle values that might need quotes
      const value = item[header];
      const valueStr = typeof value === 'string' ? `"${value}"` : value;
      return valueStr;
    }).join(',');
    csvContent += row + '\n';
  });
  
  // Create a download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const AdminReports = () => {
  const [timeRange, setTimeRange] = useState('yearly');
  
  // Fetch revenue data
  const { data: revenueData = [], isLoading: isLoadingRevenue } = useQuery({
    queryKey: ['revenueData', timeRange],
    queryFn: fetchRevenueData
  });
  
  // Fetch guest data
  const { data: guestData = [], isLoading: isLoadingGuests } = useQuery({
    queryKey: ['guestData', timeRange],
    queryFn: fetchGuestData
  });
  
  // Fetch occupancy data
  const { data: occupancyData = [], isLoading: isLoadingOccupancy } = useQuery({
    queryKey: ['occupancyData'],
    queryFn: fetchOccupancyData
  });
  
  // Fetch revenue by service data
  const { data: revenueByServiceData = [], isLoading: isLoadingRevenueByService } = useQuery({
    queryKey: ['revenueByServiceData'],
    queryFn: fetchRevenueByServiceData
  });

  // Calculate total values for summary cards
  const totalRevenue = revenueData.reduce((sum: number, item: any) => sum + item.revenue, 0);
  const totalProfit = revenueData.reduce((sum: number, item: any) => sum + item.profit, 0);
  const totalGuests = guestData.reduce((sum: number, item: any) => sum + item.guests, 0);
  
  // Render active shape for interactive pie chart
  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-midAngle * Math.PI / 180);
    const cos = Math.cos(-midAngle * Math.PI / 180);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name}: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  
  // State for active pie slice
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Financial Reports</h1>
        
        <div className="flex items-center space-x-4">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">for the current year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{((totalProfit/totalRevenue)*100).toFixed(1)}% margin</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGuests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">for the current year</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList>
          <TabsTrigger value="revenue">Revenue & Costs</TabsTrigger>
          <TabsTrigger value="guests">Guest Trends</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="services">Revenue by Service</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Revenue & Costs</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => downloadCSV(revenueData, 'revenue-costs-data')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <CardDescription>Monthly breakdown of revenue, costs, and profit</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingRevenue ? (
                <div className="flex justify-center items-center h-[400px]">Loading...</div>
              ) : (
                <ChartContainer
                  className="h-[400px]"
                  config={{
                    revenue: {
                      label: 'Revenue',
                      theme: {
                        light: '#8B5CF6',
                        dark: '#8B5CF6',
                      },
                    },
                    costs: {
                      label: 'Costs',
                      theme: {
                        light: '#0EA5E9',
                        dark: '#0EA5E9',
                      },
                    },
                    profit: {
                      label: 'Profit',
                      theme: {
                        light: '#10B981',
                        dark: '#10B981',
                      },
                    },
                  }}
                >
                  <RechartsBarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="font-medium">{payload[0].payload.month}</div>
                                <div className="text-right font-medium"></div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-muted-foreground">Revenue</div>
                                <div className="text-right font-medium">${payload[0].value}</div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-muted-foreground">Costs</div>
                                <div className="text-right font-medium">${payload[1].value}</div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-muted-foreground">Profit</div>
                                <div className="text-right font-medium">${payload[2].value}</div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
                    <Bar dataKey="costs" fill="var(--color-costs)" name="Costs" />
                    <Bar dataKey="profit" fill="var(--color-profit)" name="Profit" />
                  </RechartsBarChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guests">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Guest Trends</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => downloadCSV(guestData, 'guest-trends-data')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <CardDescription>Monthly guest count</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingGuests ? (
                <div className="flex justify-center items-center h-[400px]">Loading...</div>
              ) : (
                <ChartContainer
                  className="h-[400px]"
                  config={{
                    guests: {
                      label: 'Guests',
                      theme: {
                        light: '#0EA5E9',
                        dark: '#0EA5E9',
                      },
                    },
                  }}
                >
                  <RechartsLineChart data={guestData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="guests" 
                      stroke="var(--color-guests)" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                    />
                  </RechartsLineChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="occupancy">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Room Occupancy</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => downloadCSV(occupancyData, 'occupancy-data')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <CardDescription>Occupancy by room type (%)</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingOccupancy ? (
                <div className="flex justify-center items-center h-[400px]">Loading...</div>
              ) : (
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={occupancyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                      >
                        {occupancyData.map((entry: any, index: number) => (
                          <Sector
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Revenue by Service Type</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => downloadCSV(revenueByServiceData, 'revenue-by-service-data')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <CardDescription>Percentage of revenue by service type</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingRevenueByService ? (
                <div className="flex justify-center items-center h-[400px]">Loading...</div>
              ) : (
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={revenueByServiceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {revenueByServiceData.map((entry: any, index: number) => (
                          <Sector
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReports;
