import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChartIcon } from '@/components/ui/line-chart-icon';

const OperationalManagerDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Operational Dashboard</h1>
        <p className="text-muted-foreground">Overview of hotel operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">120</div>
            <p className="text-xs text-muted-foreground mt-1">10 suites, 40 deluxe, 70 standard</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">85</div>
            <p className="text-xs text-muted-foreground mt-1">71% Occupancy Rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$14,500</div>
            <p className="text-xs text-muted-foreground mt-1">↑ 12% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Room Occupancy Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <LineChartIcon className="h-16 w-16 mx-auto text-slate-300" />
              <p className="mt-4 text-sm text-muted-foreground">Chart visualization coming soon</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Guest Satisfaction</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <LineChartIcon className="h-16 w-16 mx-auto text-slate-300" />
              <p className="mt-4 text-sm text-muted-foreground">Chart visualization coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OperationalManagerDashboard;
