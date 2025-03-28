
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for demo purposes
const mockGuests = [
  {
    id: "1",
    name: "Hasset Molla",
    email: "hasset_molla@email.com",
    status: "Active",
    checkIn: "Sept 15, 2023",
    checkOut: "Sept 20, 2023",
    room: "504",
    image: "/lovable-uploads/307f8b15-1f94-4371-b68b-9e4373acba91.png",
  },
  {
    id: "2",
    name: "John Smith",
    email: "john.smith@example.com",
    status: "Checked Out",
    checkIn: "Sept 10, 2023",
    checkOut: "Sept 15, 2023",
    room: "302",
    image: null,
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    status: "Reserved",
    checkIn: "Sept 25, 2023",
    checkOut: "Sept 30, 2023",
    room: "201",
    image: null,
  }
];

const AdminGuests = () => {
  const navigate = useNavigate();
  const [guests] = useState(mockGuests);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Guest Management</h1>
        <Button>Add New Guest</Button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search guests..."
          className="w-full md:w-1/3 p-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check-In</TableHead>
                <TableHead>Check-Out</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={guest.image || ""} alt={guest.name} />
                        <AvatarFallback>{guest.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{guest.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      guest.status === "Active" ? "bg-green-500 text-white" : 
                      guest.status === "Reserved" ? "bg-blue-500 text-white" : 
                      "bg-gray-500 text-white"
                    }`}>
                      {guest.status}
                    </span>
                  </TableCell>
                  <TableCell>{guest.checkIn}</TableCell>
                  <TableCell>{guest.checkOut}</TableCell>
                  <TableCell>{guest.room}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/admin/guests/${guest.id}`)}
                    >
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default AdminGuests;
