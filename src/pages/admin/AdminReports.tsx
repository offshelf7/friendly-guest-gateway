
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { ArrowDownToLine, BarChart3, Calendar, DollarSign, TrendingUp, Users } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Mock data service for reports
const fetchReportData = async (reportType: string, period: string) => {
  console.log(`Fetching ${reportType} report data for period: ${period}`);
  
  // In a real app, this would fetch from Supabase
  // You could use: await supabase.from('analytics').select('*').eq('type', reportType)
  
  // For demo purposes, return mock data based on report type
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  
  switch(reportType) {
    case 'revenue':
      return generateRevenueData(period);
    case 'guests':
      return generateGuestData(period);
    case 'occupancy':
      return generateOccupancyData(period);
    case 'services':
      return generateServiceRevenueData(period);
    default:
      return [];
  }
};

// Mock data generators
const generateRevenueData = (period: string) => {
  const data = [];
  let days = period === 'year' ? 12 : period === 'month' ? 30 : 7;
  let labels = period === 'year' ? 
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] : 
    Array.from({ length: days }, (_, i) => i + 1);
  
  for (let i = 0; i < days; i++) {
    data.push({
      name: period === 'year' ? labels[i] : `Day ${labels[i]}`,
      roomRevenue: Math.floor(Math.random() * 10000) + 5000,
      foodRevenue: Math.floor(Math.random() * 3000) + 1000,
      spaRevenue: Math.floor(Math.random() * 2000) + 500,
    });
  }
  return data;
};

const generateGuestData = (period: string) => {
  const data = [];
  let days = period === 'year' ? 12 : period === 'month' ? 30 : 7;
  let labels = period === 'year' ? 
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] : 
    Array.from({ length: days }, (_, i) => i + 1);
  
  for (let i = 0; i < days; i++) {
    data.push({
      name: period === 'year' ? labels[i] : `Day ${labels[i]}`,
      newGuests: Math.floor(Math.random() * 50) + 10,
      returningGuests: Math.floor(Math.random() * 30) + 20,
    });
  }
  return data;
};

const generateOccupancyData = (period: string) => {
  const data = [];
  let days = period === 'year' ? 12 : period === 'month' ? 30 : 7;
  let labels = period === 'year' ? 
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] : 
    Array.from({ length: days }, (_, i) => i + 1);
  
  for (let i = 0; i < days; i++) {
    const occupancyRate = Math.floor(Math.random() * 40) + 60; // 60-100%
    data.push({
      name: period === 'year' ? labels[i] : `Day ${labels[i]}`,
      occupancyRate,
      revenue: occupancyRate * 100,
    });
  }
  return data;
};

const generateServiceRevenueData = (period: string) => {
  const services = [
    { name: 'Room Service', value: Math.floor(Math.random() * 5000) + 3000 },
    { name: 'Spa & Wellness', value: Math.floor(Math.random() * 4000) + 2000 },
    { name: 'Restaurant', value: Math.floor(Math.random() * 6000) + 4000 },
    { name: 'Bar & Lounge', value: Math.floor(Math.random() * 3000) + 2000 },
    { name: 'Conference', value: Math.floor(Math.random() * 2000) + 1000 },
  ];
  return services;
};

// COLORS for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ReportSection = ({ title, value, percentage, icon: Icon, trend = "up" }: { 
  title: string, 
  value: string, 
  percentage: string, 
  icon: React.ElementType, 
  trend?: "up" | "down" 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"} flex items-center`}>
          <TrendingUp className="mr-1 h-3 w-3" />
          {percentage}
        </p>
      </CardContent>
    </Card>
  );
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(value);
};

const exportToCSV = (data: any[], filename: string) => {
  if (!data || !data.length) return;
  
  const headers = Object.keys(data[0]).join(',');
  const csvRows = data.map(row => {
    return Object.values(row).join(',');
  });
  
  const csvContent = [headers, ...csvRows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const AdminReports = () => {
  const [activeTab, setActiveTab] = useState("revenue");
  const [periodFilter, setPeriodFilter] = useState("month");
  
  // Use TanStack Query to fetch report data
  const { data: reportData = [], isLoading, error } = useQuery({
    queryKey: ['reports', activeTab, periodFilter],
    queryFn: () => fetchReportData(activeTab, periodFilter)
  });
  
  // Calculate summary metrics for the revenue tab
  const totalRevenue = Array.isArray(reportData) ? reportData.reduce((sum, item) => {
    const roomRev = item.roomRevenue || 0;
    const foodRev = item.foodRevenue || 0;
    const spaRev = item.spaRevenue || 0;
    return sum + roomRev + foodRev + spaRev;
  }, 0) : 0;
  
  const roomRevenue = Array.isArray(reportData) ? reportData.reduce((sum, item) => sum + (item.roomRevenue || 0), 0) : 0;
  const foodRevenue = Array.isArray(reportData) ? reportData.reduce((sum, item) => sum + (item.foodRevenue || 0), 0) : 0;
  const spaRevenue = Array.isArray(reportData) ? reportData.reduce((sum, item) => sum + (item.spaRevenue || 0), 0) : 0;
  
  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
          <p className="text-muted-foreground">
            View insights and analytics about your hotel performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => exportToCSV(reportData as any[], `${activeTab}-report-${periodFilter}`)}
            disabled={isLoading || !Array.isArray(reportData) || reportData.length === 0}
          >
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="revenue" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="guests">Guest Trends</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="services">Service Revenue</TabsTrigger>
        </TabsList>
        
        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ReportSection 
              title="Total Revenue" 
              value={formatCurrency(totalRevenue)}
              percentage="+20.1% from last month"
              icon={DollarSign}
            />
            <ReportSection 
              title="Room Revenue" 
              value={formatCurrency(roomRevenue)}
              percentage="+12.5% from last month"
              icon={DollarSign}
            />
            <ReportSection 
              title="Food Revenue" 
              value={formatCurrency(foodRevenue)}
              percentage="+18.2% from last month"
              icon={DollarSign}
            />
            <ReportSection 
              title="Spa Revenue" 
              value={formatCurrency(spaRevenue)}
              percentage="+8.4% from last month"
              icon={DollarSign}
            />
          </div>
          
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-80">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center h-80 text-red-500">
                  Error loading revenue data
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart
                    data={reportData as any[]}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="roomRevenue" stackId="1" stroke="#8884d8" fill="#8884d8" name="Room Revenue" />
                    <Area type="monotone" dataKey="foodRevenue" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Food Revenue" />
                    <Area type="monotone" dataKey="spaRevenue" stackId="1" stroke="#ffc658" fill="#ffc658" name="Spa Revenue" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Guest Trends Tab */}
        <TabsContent value="guests" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ReportSection 
              title="Total Guests" 
              value={Array.isArray(reportData) ? reportData.reduce((sum, item) => 
                sum + (item.newGuests || 0) + (item.returningGuests || 0), 0).toString() : "0"}
              percentage="+15.3% from last month"
              icon={Users}
            />
            <ReportSection 
              title="New Guests" 
              value={Array.isArray(reportData) ? reportData.reduce((sum, item) => 
                sum + (item.newGuests || 0), 0).toString() : "0"}
              percentage="+18.7% from last month"
              icon={Users}
            />
            <ReportSection 
              title="Returning Guests" 
              value={Array.isArray(reportData) ? reportData.reduce((sum, item) => 
                sum + (item.returningGuests || 0), 0).toString() : "0"}
              percentage="+10.4% from last month"
              icon={Users}
            />
            <ReportSection 
              title="Average Stay" 
              value="3.2 days"
              percentage="+0.5 days from last month"
              icon={Calendar}
            />
          </div>
          
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Guest Trends</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-80">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center h-80 text-red-500">
                  Error loading guest data
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsBarChart
                    data={reportData as any[]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newGuests" fill="#8884d8" name="New Guests" />
                    <Bar dataKey="returningGuests" fill="#82ca9d" name="Returning Guests" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Occupancy Tab */}
        <TabsContent value="occupancy" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ReportSection 
              title="Average Occupancy" 
              value={`${Array.isArray(reportData) ? Math.round(
                reportData.reduce((sum, item) => sum + (item.occupancyRate || 0), 0) / 
                (reportData.length || 1)
              ) : 0}%`}
              percentage="+5.2% from last month"
              icon={BarChart3}
            />
            <ReportSection 
              title="Revenue Per Room" 
              value={formatCurrency(Array.isArray(reportData) ? 
                reportData.reduce((sum, item) => sum + (item.revenue || 0), 0) / 
                (reportData.length || 1) : 0)}
              percentage="+8.7% from last month"
              icon={DollarSign}
            />
            <ReportSection 
              title="Peak Occupancy" 
              value={`${Array.isArray(reportData) ? Math.max(
                ...reportData.map(item => item.occupancyRate || 0)
              ) : 0}%`}
              percentage="+3.1% from last month"
              icon={TrendingUp}
            />
            <ReportSection 
              title="Lowest Occupancy" 
              value={`${Array.isArray(reportData) ? Math.min(
                ...reportData.map(item => item.occupancyRate || 0)
              ) : 0}%`}
              percentage="+2.4% from last month"
              icon={TrendingUp}
              trend="down"
            />
          </div>
          
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Occupancy Rate</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-80">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center h-80 text-red-500">
                  Error loading occupancy data
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={reportData as any[]}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="occupancyRate" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }}
                      name="Occupancy Rate (%)"
                    />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue per Room ($)" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Revenue Distribution</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                {isLoading ? (
                  <div className="flex justify-center items-center h-80">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : error ? (
                  <div className="flex justify-center items-center h-80 text-red-500">
                    Error loading service data
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={reportData as any[]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {Array.isArray(reportData) && reportData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Service Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-80">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : error ? (
                  <div className="flex justify-center items-center h-80 text-red-500">
                    Error loading service data
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Array.isArray(reportData) && reportData.map((service, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{service.name}</span>
                          <span>{formatCurrency(service.value)}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full" 
                            style={{ 
                              width: `${(service.value / (reportData.reduce((max, s) => Math.max(max, s.value), 0) || 1)) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length] 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReports;
