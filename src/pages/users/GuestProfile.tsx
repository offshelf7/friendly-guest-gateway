
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

// Mock data for demo purposes
const mockGuest = {
  id: "1",
  name: "Hasset Molla",
  email: "hasset_molla@email.com",
  phone: "+251 911 22 33 44",
  address: "123 Street Name, City",
  country: "Ethiopia",
  passportNumber: "******7890",
  image: "/lovable-uploads/307f8b15-1f94-4371-b68b-9e4373acba91.png",
  status: "Active Guest",
  role: "Guest (VIP)",
  preferences: {
    roomType: "Suite",
    bedType: "King",
    floor: "High floor",
    view: "Ocean view",
    smoking: "Non-smoking",
    special: "Extra pillows"
  },
  currentBooking: {
    roomNumber: "504",
    roomType: "Deluxe Suite",
    status: "In Progress",
    checkIn: "Sept 15, 2023",
    checkOut: "Sept 20, 2023"
  },
  bookingHistory: [
    {
      id: "BK-1234",
      room: "301",
      checkIn: "Aug 10, 2023",
      checkOut: "Aug 15, 2023",
      totalCost: "$1,200",
      status: "Completed"
    },
    {
      id: "BK-1235",
      room: "405",
      checkIn: "Jul 22, 2023",
      checkOut: "Jul 25, 2023",
      totalCost: "$750",
      status: "Completed"
    }
  ],
  notes: [
    {
      date: "Sept 15, 2023",
      text: "VIP guest - Prefers room service breakfast between 7-8 AM",
      department: "Front Desk"
    },
    {
      date: "Sept 14, 2023",
      text: "Allergic to feather pillows - Replaced with hypoallergenic",
      department: "Housekeeping"
    }
  ]
};

const GuestProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [guest] = useState(mockGuest); // In a real app, fetch based on ID
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [department, setDepartment] = useState("Front Desk");

  const handleAddNote = () => {
    // In a real app, save to database
    console.log("Adding note:", { text: noteText, department });
    setShowAddNoteDialog(false);
    setNoteText("");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Guest Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Guest Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={guest.image} alt={guest.name} />
              <AvatarFallback>{guest.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold mb-1">{guest.name}</h2>
            <p className="text-muted-foreground mb-3">{guest.role}</p>
            <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full mb-4">
              {guest.status}
            </div>
            <div className="flex w-full gap-2 mt-2">
              <Button className="flex-1" variant="default">Edit Profile</Button>
              <Button className="flex-1" variant="outline">Check-out</Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-muted-foreground w-6 mr-3">📞</span>
                <span>{guest.phone}</span>
              </div>
              <div className="flex items-start">
                <span className="text-muted-foreground w-6 mr-3">📧</span>
                <span>{guest.email}</span>
              </div>
              <div className="flex items-start">
                <span className="text-muted-foreground w-6 mr-3">📍</span>
                <span>{guest.address}</span>
              </div>
              <div className="flex items-start">
                <span className="text-muted-foreground w-6 mr-3">🌍</span>
                <span>{guest.country}</span>
              </div>
              <div className="flex items-start">
                <span className="text-muted-foreground w-6 mr-3">🪪</span>
                <span>Passport: {guest.passportNumber}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Booking */}
        <Card className="md:col-span-3">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Current Booking</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="py-2 px-4 text-left">Room Number</th>
                    <th className="py-2 px-4 text-left">Room Type</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Check-In</th>
                    <th className="py-2 px-4 text-left">Check-Out</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4">{guest.currentBooking.roomNumber}</td>
                    <td className="py-2 px-4">{guest.currentBooking.roomType}</td>
                    <td className="py-2 px-4">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        {guest.currentBooking.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">{guest.currentBooking.checkIn}</td>
                    <td className="py-2 px-4">{guest.currentBooking.checkOut}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Guest Preferences */}
        <Card className="md:col-span-3">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Guest Preferences</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col bg-slate-50 p-4 rounded-md">
                <span className="text-blue-500 mb-2">🏨 Room Type</span>
                <span>{guest.preferences.roomType}</span>
              </div>
              <div className="flex flex-col bg-slate-50 p-4 rounded-md">
                <span className="text-blue-500 mb-2">🛏️ Bed Type</span>
                <span>{guest.preferences.bedType}</span>
              </div>
              <div className="flex flex-col bg-slate-50 p-4 rounded-md">
                <span className="text-blue-500 mb-2">📊 Floor</span>
                <span>{guest.preferences.floor}</span>
              </div>
              <div className="flex flex-col bg-slate-50 p-4 rounded-md">
                <span className="text-blue-500 mb-2">👁️ View</span>
                <span>{guest.preferences.view}</span>
              </div>
              <div className="flex flex-col bg-slate-50 p-4 rounded-md">
                <span className="text-blue-500 mb-2">🚭 Smoking</span>
                <span>{guest.preferences.smoking}</span>
              </div>
              <div className="flex flex-col bg-slate-50 p-4 rounded-md">
                <span className="text-blue-500 mb-2">⭐ Special</span>
                <span>{guest.preferences.special}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking History */}
        <Card className="md:col-span-3">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Booking History</h3>
            <div className="border rounded-md overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="py-2 px-4 text-left">Booking ID</th>
                    <th className="py-2 px-4 text-left">Room</th>
                    <th className="py-2 px-4 text-left">Check-In</th>
                    <th className="py-2 px-4 text-left">Check-Out</th>
                    <th className="py-2 px-4 text-left">Total Cost</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {guest.bookingHistory.map((booking) => (
                    <tr key={booking.id}>
                      <td className="py-2 px-4">{booking.id}</td>
                      <td className="py-2 px-4">{booking.room}</td>
                      <td className="py-2 px-4">{booking.checkIn}</td>
                      <td className="py-2 px-4">{booking.checkOut}</td>
                      <td className="py-2 px-4">{booking.totalCost}</td>
                      <td className="py-2 px-4">
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Staff Notes */}
        <Card className="md:col-span-3">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Staff Notes</h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center" 
                onClick={() => setShowAddNoteDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Note
              </Button>
            </div>
            
            <div className="space-y-4">
              {guest.notes.map((note, index) => (
                <div key={index} className="border p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{note.date}</span>
                    <span className="text-sm font-medium">{note.department}</span>
                  </div>
                  <p>{note.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Delete Profile Button */}
        <div className="md:col-span-3 flex justify-end">
          <Button variant="destructive" className="flex items-center">
            Delete Profile
          </Button>
        </div>
      </div>

      {/* Add Note Dialog */}
      <Dialog open={showAddNoteDialog} onOpenChange={setShowAddNoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Staff Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="note" className="text-sm font-medium">Note</label>
              <textarea 
                id="note" 
                rows={4} 
                className="w-full p-2 border rounded-md" 
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter note details here..."
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium">Department</label>
              <select 
                id="department" 
                className="w-full p-2 border rounded-md" 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="Front Desk">Front Desk</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Concierge">Concierge</option>
                <option value="Dining">Dining</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddNote}>Add Note</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestProfile;
