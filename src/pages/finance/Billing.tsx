
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Download, Filter, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Billing = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Billing Management</h1>
          <p className="text-muted-foreground">Manage guest billing and charges</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Charge
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by guest name, room, or invoice number..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="shrink-0">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="py-3 px-4 text-left">Invoice #</th>
                  <th className="py-3 px-4 text-left">Guest</th>
                  <th className="py-3 px-4 text-left">Room</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3 px-4">INV-2023-001</td>
                  <td className="py-3 px-4">John Smith</td>
                  <td className="py-3 px-4">203</td>
                  <td className="py-3 px-4">2023-09-15</td>
                  <td className="py-3 px-4">$345.00</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Paid
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">INV-2023-002</td>
                  <td className="py-3 px-4">Emma Wilson</td>
                  <td className="py-3 px-4">305</td>
                  <td className="py-3 px-4">2023-09-16</td>
                  <td className="py-3 px-4">$512.50</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                      Pending
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
