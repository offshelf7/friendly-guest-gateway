import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const FinanceReports = () => {
  const [timeFrame, setTimeFrame] = useState('month');
  
  // Calculate date ranges based on the selected time frame
  const today = new Date();
  const startDate = timeFrame === 'month' 
    ? startOfMonth(today) 
    : timeFrame === '3months'
    ? subMonths(today, 3)
    : subMonths(today, 12);
  
  // Format dates for query
  const startDateStr = format(startDate, 'yyyy-MM-dd');
  const endDateStr = format(today, 'yyyy-MM-dd');
  
  // Query for revenue data
  const { data: revenueData, isLoading } = useQuery({
    queryKey: ['revenueData', startDateStr, endDateStr],
    queryFn: async () => {
      // Fetch completed bookings within date range
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('id, total_price, created_at, status')
        .gte('created_at', startDateStr)
        .lte('created_at', endDateStr)
        .in('status', ['completed', 'confirmed', 'checked_in']);
      
      if (error) throw error;
      
      // Calculate total revenue
      const totalRevenue = bookings.reduce((sum, booking) => sum + parseFloat(booking.total_price.toString()), 0);
      
      // Group bookings by month for chart data
      const monthlyData = bookings.reduce((acc, booking) => {
        const month = format(new Date(booking.created_at), 'MMM');
        
        if (!acc[month]) {
          acc[month] = { month, revenue: 0, bookings: 0 };
        }
        
        acc[month].revenue += parseFloat(booking.total_price.toString());
        acc[month].bookings += 1;
        
        return acc;
      }, {});
      
      // Convert to array and sort by month
      const chartData = Object.values(monthlyData);
      
      // Calculate previous period for comparison
      const previousStart = subMonths(startDate, timeFrame === 'month' ? 1 : timeFrame === '3months' ? 3 : 12);
      const previousEnd = subMonths(today, 1);
      
      const { data: previousBookings, error: previousError } = await supabase
        .from('bookings')
        .select('total_price')
        .gte('created_at', format(previousStart, 'yyyy-MM-dd'))
        .lte('created_at', format(previousEnd, 'yyyy-MM-dd'))
        .in('status', ['completed', 'confirmed', 'checked_in']);
      
      if (previousError) throw previousError;
      
      const previousRevenue = previousBookings.reduce((sum, booking) => sum + parseFloat(booking.total_price.toString()), 0);
      
      // Calculate revenue change percentage
      const revenueChange = previousRevenue !== 0 
        ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 
        : 100;
      
      return {
        totalRevenue,
        bookingsCount: bookings.length,
        chartData,
        revenueChange
      };
    }
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Financial Reports</h1>
        <div className="flex items-center gap-2">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Range
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${isLoading ? '...' : revenueData?.totalRevenue.toFixed(2)}
            </div>
            {!isLoading && (
              <div className="flex items-center pt-1 text-xs">
                {revenueData?.revenueChange > 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500">
                      {Math.abs(revenueData?.revenueChange).toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                    <span className="text-red-500">
                      {Math.abs(revenueData?.revenueChange).toFixed(1)}%
                    </span>
                  </>
                )}
                <span className="text-muted-foreground ml-1">vs. previous period</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Bookings
            </CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? '...' : revenueData?.bookingsCount}
            </div>
            <p className="text-xs text-muted-foreground">
              Total bookings in period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${isLoading ? '...' : (revenueData?.bookingsCount ? (revenueData?.totalRevenue / revenueData?.bookingsCount).toFixed(2) : '0.00')}
            </div>
            <p className="text-xs text-muted-foreground">
              Per booking
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Occupancy Rate
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              78%
            </div>
            <p className="text-xs text-muted-foreground">
              Average for period
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {!isLoading && revenueData?.chartData && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData.chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${parseFloat(value.toString()).toFixed(2)}`, 'Revenue']} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#6366f1" />
                  <Bar dataKey="bookings" name="Bookings" fill="#93c5fd" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="revenue">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="profit">Profit & Loss</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Detailed revenue analysis by category</p>
              <Separator className="my-4" />
              <p className="text-center text-muted-foreground">Revenue details will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Detailed expense analysis by category</p>
              <Separator className="my-4" />
              <p className="text-center text-muted-foreground">Expense details will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Summary of financial performance</p>
              <Separator className="my-4" />
              <p className="text-center text-muted-foreground">Profit & loss details will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceReports;
