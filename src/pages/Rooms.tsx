
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/MockAuthContext'; // Import from MockAuthContext
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarIcon, Wifi, Coffee, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Room } from '@/types/roomTypes';
import { useRooms } from '@/hooks/useRooms';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/home/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Rooms = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
  const [guestsCount, setGuestsCount] = useState(2);
  
  // Use TanStack Query to fetch rooms
  const { data: rooms = [], isLoading, error, refetch } = useRooms();

  const handleBookNow = (room: Room) => {
    if (!user) {
      toast({
        title: t('rooms.authRequired'),
        description: t('rooms.loginRequired'),
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast({
        title: t('rooms.invalidDates'),
        description: t('rooms.selectDates'),
        variant: "destructive"
      });
      return;
    }

    navigate(`/booking/${room.id}`, {
      state: {
        room,
        checkInDate,
        checkOutDate,
        guestsCount
      }
    });
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-24 px-4 bg-slate-50">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">{t('rooms.title')}</h1>
          
          {/* Search and Filter Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('rooms.checkIn')}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkInDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkInDate ? format(checkInDate, "PPP") : <span>{t('rooms.pickDate')}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                      initialFocus
                      disabled={(date) => date < new Date() || (checkOutDate ? date >= checkOutDate : false)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('rooms.checkOut')}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkOutDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, "PPP") : <span>{t('rooms.pickDate')}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      initialFocus
                      disabled={(date) => checkInDate ? date <= checkInDate : date <= new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('rooms.guests')}</label>
                <Input
                  type="number"
                  min={1}
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  className="w-full" 
                  onClick={() => refetch()}
                >
                  {t('rooms.searchAvailability')}
                </Button>
              </div>
            </div>
            
            {calculateNights() > 0 && (
              <div className="mt-4 text-sm text-slate-600">
                {t('rooms.searching')} {calculateNights()} {calculateNights() > 1 ? t('rooms.nights') : t('rooms.night')} • {guestsCount} {guestsCount > 1 ? t('rooms.guestsPlural') : t('rooms.guest')}
              </div>
            )}
          </div>
          
          {/* Room listing section */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-6 w-1/4" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex justify-between items-center pt-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-10 w-1/3" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2 text-red-500">{t('rooms.errorLoading')}</h3>
              <p className="text-slate-600 mb-4">{t('rooms.errorDescription')}</p>
              <Button onClick={() => refetch()}>{t('rooms.tryAgain')}</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <Card key={room.id} className="overflow-hidden border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden bg-slate-200">
                    {room.image_url ? (
                      <img 
                        src={room.image_url} 
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={`https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=60`} 
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{room.name}</h3>
                      <div className="text-lg font-bold text-blue-600">${room.price_per_night}{t('rooms.pricePerNight')}</div>
                    </div>
                    
                    <p className="text-slate-600 mb-4 line-clamp-2">{room.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.has_wifi && (
                        <div className="flex items-center text-sm bg-slate-100 px-2 py-1 rounded">
                          <Wifi className="w-4 h-4 mr-1" />
                          <span>{t('amenities.wifi')}</span>
                        </div>
                      )}
                      {room.has_breakfast && (
                        <div className="flex items-center text-sm bg-slate-100 px-2 py-1 rounded">
                          <Coffee className="w-4 h-4 mr-1" />
                          <span>{t('amenities.breakfast')}</span>
                        </div>
                      )}
                      {room.amenities?.slice(0, 3).map((amenity) => (
                        <div key={amenity.id} className="flex items-center text-sm bg-slate-100 px-2 py-1 rounded">
                          <Check className="w-4 h-4 mr-1" />
                          <span>{amenity.amenity_name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-slate-500">
                        <span className="font-medium">{t('rooms.capacity')}</span> {room.capacity} {room.capacity > 1 ? t('rooms.guestsPlural') : t('rooms.guest')}
                      </div>
                      <Button onClick={() => handleBookNow(room)}>
                        {t('rooms.bookNow')}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {!isLoading && !error && rooms.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{t('rooms.noRooms')}</h3>
              <p className="text-slate-600 mb-4">{t('rooms.tryDifferentDates')}</p>
              <Button onClick={() => refetch()}>{t('rooms.refreshResults')}</Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Rooms;
