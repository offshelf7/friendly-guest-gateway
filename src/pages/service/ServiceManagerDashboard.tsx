
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  BarChart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ServiceManagerDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Service Manager Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage hotel services and guest requests</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Open Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              4 high priority
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 min</div>
            <p className="text-xs text-green-600">
              2 min faster than target
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Service Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-green-600">
              +0.2 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Staff Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8/10</div>
            <p className="text-xs text-muted-foreground">
              2 on break
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Requests</TabsTrigger>
          <TabsTrigger value="staff">Staff Status</TabsTrigger>
          <TabsTrigger value="reports">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Current Service Requests</CardTitle>
              <Button>Assign Tasks</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Requested At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">REQ-3921</TableCell>
                    <TableCell>301</TableCell>
                    <TableCell>Room Cleaning</TableCell>
                    <TableCell>10:30 AM (45 min ago)</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800">High</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">REQ-3920</TableCell>
                    <TableCell>214</TableCell>
                    <TableCell>Extra Towels</TableCell>
                    <TableCell>10:45 AM (30 min ago)</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">Assigned</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">REQ-3919</TableCell>
                    <TableCell>512</TableCell>
                    <TableCell>Maintenance - AC</TableCell>
                    <TableCell>10:15 AM (60 min ago)</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800">High</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Details</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Service Staff Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Current Task</TableHead>
                    <TableHead>Completed Today</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Maria Rodriguez</TableCell>
                    <TableCell>Housekeeping</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        Available
                      </div>
                    </TableCell>
                    <TableCell>None</TableCell>
                    <TableCell>7 tasks</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Assign</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">John Smith</TableCell>
                    <TableCell>Maintenance</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                        Busy
                      </div>
                    </TableCell>
                    <TableCell>Room 512 - AC repair</TableCell>
                    <TableCell>3 tasks</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" disabled>Assign</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sarah Johnson</TableCell>
                    <TableCell>Room Service</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                        Break
                      </div>
                    </TableCell>
                    <TableCell>None</TableCell>
                    <TableCell>5 tasks</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" disabled>Assign</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart className="h-16 w-16 mx-auto text-slate-300" />
                  <p className="mt-4">Performance charts coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceManagerDashboard;
