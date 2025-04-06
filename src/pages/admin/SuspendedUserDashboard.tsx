
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const SuspendedUserDashboard = () => {
  const { t } = useLanguage();
  
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
        <h1 className="text-2xl font-bold">{t('admin.suspendedUsers.title')}</h1>
      </div>
      
      <p className="text-muted-foreground mb-6">
        {t('admin.suspendedUsers.description')}
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.suspendedUsers.cardTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          {suspendedUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.suspendedUsers.table.name')}</TableHead>
                  <TableHead>{t('admin.suspendedUsers.table.email')}</TableHead>
                  <TableHead>{t('admin.suspendedUsers.table.role')}</TableHead>
                  <TableHead>{t('admin.suspendedUsers.table.department')}</TableHead>
                  <TableHead>{t('admin.suspendedUsers.table.date')}</TableHead>
                  <TableHead>{t('admin.suspendedUsers.table.reason')}</TableHead>
                  <TableHead className="text-right">{t('admin.suspendedUsers.table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suspendedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{t(`admin.roles.${user.role}`)}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.suspensionDate}</TableCell>
                    <TableCell>{user.reason}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">{t('admin.suspendedUsers.actions.reactivate')}</Button>
                        <Button variant="outline" size="sm">{t('admin.suspendedUsers.actions.details')}</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {t('admin.suspendedUsers.noUsers')}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuspendedUserDashboard;
