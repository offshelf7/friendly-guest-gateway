
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";

const SuspendedUserDashboard = () => {
  // Mock suspended users data
  const suspendedUsers = [
    {
      id: 1,
      name: "James Wilson",
      email: "james.wilson@hotel.com",
      role: "staff",
      department: "Food & Beverage",
      suspensionDate: "2023-09-15",
      reason: "Multiple login failures"
    },
    {
      id: 2,
      name: "Emily Brown",
      email: "emily.brown@hotel.com",
      role: "staff",
      department: "Housekeeping",
      suspensionDate: "2023-09-10",
      reason: "Account compromised"
    }
  ];
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <h1 className="text-2xl font-bold">Suspended Users</h1>
      </div>
      
      <p className="text-muted-foreground mb-6">
        The following user accounts have been suspended and require administrator attention.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Suspended Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          {suspendedUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Suspension Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suspendedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.suspensionDate}</TableCell>
                    <TableCell>{user.reason}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Reactivate</Button>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No suspended user accounts found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuspendedUserDashboard;
