
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChartIcon } from '@/components/ui/line-chart-icon';
import { Wrench, AlertTriangle, CheckCircle } from 'lucide-react';

const MaintenanceManagerDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Maintenance Dashboard</h1>
        <p className="text-muted-foreground">Overview of maintenance operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <div className="text-3xl font-bold">14</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">3 high priority</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Wrench className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-3xl font-bold">8</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">2 assigned to team A</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-3xl font-bold">12</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">↑ 4 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Maintenance Requests by Area</CardTitle>
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
            <CardTitle className="text-base">Resolution Time Trend</CardTitle>
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

export default MaintenanceManagerDashboard;
