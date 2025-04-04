
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChartIcon } from '@/components/ui/line-chart-icon';

const ServiceManagerDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Service Manager Dashboard</h1>
        <p className="text-muted-foreground">Overview of hotel services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">8 premium services</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Service Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">16</div>
            <p className="text-xs text-muted-foreground mt-1">4 pending approval</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$3,200</div>
            <p className="text-xs text-muted-foreground mt-1">↑ 8% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Service Usage Trend</CardTitle>
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
            <CardTitle className="text-base">Customer Feedback</CardTitle>
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

export default ServiceManagerDashboard;
