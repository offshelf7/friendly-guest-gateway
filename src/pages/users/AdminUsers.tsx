
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash, UserPlus, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();
  
  // Mock user data
  const users = [
    {
      id: 1,
      name: "Jane Smith",
      email: "jane.smith@hotel.com",
      role: "admin",
      department: "Management",
      status: "active",
      lastLogin: "2023-09-20 09:45 AM"
    },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@hotel.com",
      role: "staff",
      department: "Front Desk",
      status: "active",
      lastLogin: "2023-09-21 08:30 AM"
    },
    {
      id: 3,
      name: "Robert Chen",
      email: "robert.chen@hotel.com",
      role: "general_manager",
      department: "Executive",
      status: "active",
      lastLogin: "2023-09-21 10:15 AM"
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "maria.garcia@hotel.com",
      role: "operational_manager",
      department: "Operations",
      status: "active",
      lastLogin: "2023-09-20 02:30 PM"
    },
    {
      id: 5,
      name: "Samuel Johnson",
      email: "samuel.johnson@hotel.com",
      role: "staff",
      department: "Housekeeping",
      status: "inactive",
      lastLogin: "2023-09-10 11:20 AM"
    }
  ];
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800">{t('admin.roles.admin')}</Badge>;
      case 'general_manager':
        return <Badge className="bg-purple-100 text-purple-800">{t('admin.roles.generalManager')}</Badge>;
      case 'operational_manager':
        return <Badge className="bg-blue-100 text-blue-800">{t('admin.roles.operationalManager')}</Badge>;
      case 'staff':
        return <Badge className="bg-green-100 text-green-800">{t('admin.roles.staff')}</Badge>;
      default:
        return <Badge>{t(`admin.roles.${role}`)}</Badge>;
    }
  };
  
  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <Badge className="bg-green-100 text-green-800">{t('admin.userStatus.active')}</Badge>
      : <Badge className="bg-gray-100 text-gray-800">{t('admin.userStatus.inactive')}</Badge>;
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{t('admin.users.title')}</h1>
          <p className="text-muted-foreground">{t('admin.users.subtitle')}</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          {t('admin.users.addUser')}
        </Button>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('admin.users.searchPlaceholder')}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          {t('admin.users.filter')}
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.users.table.name')}</TableHead>
                <TableHead>{t('admin.users.table.email')}</TableHead>
                <TableHead>{t('admin.users.table.role')}</TableHead>
                <TableHead>{t('admin.users.table.department')}</TableHead>
                <TableHead>{t('admin.users.table.status')}</TableHead>
                <TableHead>{t('admin.users.table.lastLogin')}</TableHead>
                <TableHead className="text-right">{t('admin.users.table.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{t(`admin.departments.${user.department.toLowerCase().replace(/\s+/g, '')}`)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" title={t('admin.users.actions.edit')}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title={t('admin.users.actions.delete')}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
