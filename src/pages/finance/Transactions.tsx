
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowDownUp, Download, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Transactions = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">View and manage financial transactions</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions..."
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
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="py-3 px-4 text-left">Transaction ID</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3 px-4">TRX-1001</td>
                  <td className="py-3 px-4">2023-09-15 14:30</td>
                  <td className="py-3 px-4">Room payment - John Smith</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center">
                      <ArrowDownUp className="mr-2 h-4 w-4 text-green-600" />
                      Credit
                    </span>
                  </td>
                  <td className="py-3 px-4 text-green-600">+$450.00</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">TRX-1002</td>
                  <td className="py-3 px-4">2023-09-16 10:15</td>
                  <td className="py-3 px-4">Room service - Emma Wilson</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center">
                      <ArrowDownUp className="mr-2 h-4 w-4 text-green-600" />
                      Credit
                    </span>
                  </td>
                  <td className="py-3 px-4 text-green-600">+$38.50</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">TRX-1003</td>
                  <td className="py-3 px-4">2023-09-16 16:45</td>
                  <td className="py-3 px-4">Supplier payment - Food supplies</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center">
                      <ArrowDownUp className="mr-2 h-4 w-4 text-red-600" />
                      Debit
                    </span>
                  </td>
                  <td className="py-3 px-4 text-red-600">-$1,250.00</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Completed
                    </span>
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

export default Transactions;
