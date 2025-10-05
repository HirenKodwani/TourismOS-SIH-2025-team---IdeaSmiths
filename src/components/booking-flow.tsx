import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Search, 
  Star, 
  MapPin, 
  Calendar as CalendarIcon, 
  Users, 
  Shield, 
  CheckCircle, 
  CreditCard,
  Clock,
  Bed,
  Camera,
  Wifi,
  Car,
  Coffee,
  ArrowRight
} from 'lucide-react';

interface BookingFlowProps {
  user: {
    id: string;
    type: string;
    name: string;
    verified: boolean;
  };
  onNavigate: (view: string) => void;
}

type BookingState = 'searching' | 'selected' | 'payment_pending' | 'confirmed';

export function BookingFlow({ user, onNavigate }: BookingFlowProps) {
  const [bookingState, setBookingState] = useState<BookingState>('searching');
  const [searchLocation, setSearchLocation] = useState('Goa, India');
  const [selectedDates, setSelectedDates] = useState<Date | undefined>(new Date());
  const [guests, setGuests] = useState('2');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [paymentProgress, setPaymentProgress] = useState(0);

  const accommodations = [
    {
      id: 'acc1',
      name: 'Grand Palace Resort',
      type: 'Resort',
      location: 'Calangute Beach, Goa',
      rating: 4.8,
      price: 3500,
      safety_score: 9.2,
      amenities: ['WiFi', 'Pool', 'Spa', 'Beach Access'],
      description: 'Luxury beachfront resort with world-class amenities',
      ai_recommendation: 'Highest safety score in the area',
      verified_business: true
    },
    {
      id: 'acc2',
      name: 'Cozy Beach House',
      type: 'Villa',
      location: 'Anjuna Beach, Goa',
      rating: 4.6,
      price: 2800,
      safety_score: 8.9,
      amenities: ['WiFi', 'Kitchen', 'Garden', 'Parking'],
      description: 'Charming villa perfect for families',
      ai_recommendation: 'Great value for money',
      verified_business: true
    },
    {
      id: 'acc3',
      name: 'Boutique Hotel Central',
      type: 'Hotel',
      location: 'Panaji, Goa',
      rating: 4.4,
      price: 2200,
      safety_score: 8.5,
      amenities: ['WiFi', 'Restaurant', 'Concierge', 'AC'],
      description: 'Modern hotel in the heart of the city',
      ai_recommendation: 'Perfect for business travelers',
      verified_business: false
    }
  ];

  const experiences = [
    {
      id: 'exp1',
      name: 'Spice Plantation Tour',
      type: 'Cultural',
      duration: '4 hours',
      rating: 4.7,
      price: 800,
      safety_score: 9.0,
      description: 'Discover the secrets of Goan spices with expert guides'
    },
    {
      id: 'exp2',
      name: 'Sunset Dolphin Cruise',
      type: 'Adventure',
      duration: '3 hours',
      rating: 4.9,
      price: 1200,
      safety_score: 8.8,
      description: 'Magical sunset cruise with dolphin watching'
    },
    {
      id: 'exp3',
      name: 'Portuguese Heritage Walk',
      type: 'Historical',
      duration: '2 hours',
      rating: 4.5,
      price: 500,
      safety_score: 9.5,
      description: 'Explore Goan colonial architecture and history'
    }
  ];

  const handleBooking = (item: any, type: string) => {
    setSelectedBooking({ ...item, booking_type: type });
    setBookingState('selected');
  };

  const proceedToPayment = () => {
    setBookingState('payment_pending');
    
    // Simulate payment process
    const interval = setInterval(() => {
      setPaymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBookingState('confirmed');
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  const renderAmenityIcon = (amenity: string) => {
    const icons: { [key: string]: any } = {
      'WiFi': Wifi,
      'Pool': '🏊',
      'Spa': '🧘',
      'Beach Access': '🏖️',
      'Kitchen': '🍳',
      'Garden': '🌿',
      'Parking': Car,
      'Restaurant': Coffee,
      'Concierge': '🛎️',
      'AC': '❄️'
    };
    
    const Icon = icons[amenity];
    if (typeof Icon === 'string') {
      return <span className="text-lg">{Icon}</span>;
    }
    return Icon ? <Icon className="w-4 h-4" /> : <span className="text-xs">•</span>;
  };

  if (bookingState === 'confirmed') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
            <h2 className="text-2xl mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-6">
              Your {selectedBooking.booking_type} booking has been confirmed.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-2">{selectedBooking.name}</h3>
              <div className="text-sm space-y-1">
                <p>Booking ID: TOS-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                <p>Date: {selectedDates?.toLocaleDateString()}</p>
                <p>Total: ₹{selectedBooking.price}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={() => setBookingState('searching')} variant="outline" className="flex-1">
                Book Another
              </Button>
              <Button onClick={() => onNavigate('wallet')} className="flex-1">
                View Receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (bookingState === 'payment_pending') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Processing Payment</CardTitle>
            <CardDescription>Please wait while we process your booking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Payment Progress</span>
                <span>{paymentProgress}%</span>
              </div>
              <Progress value={paymentProgress} className="w-full" />
            </div>
            
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your payment is secured with blockchain technology and protected by TourismOS.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (bookingState === 'selected' && selectedBooking) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button onClick={() => setBookingState('searching')} variant="outline" className="mb-4">
          ← Back to Search
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl mb-2">{selectedBooking.name}</h1>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {selectedBooking.location || 'Goa, India'}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                        {selectedBooking.rating}
                      </div>
                      <Badge variant={selectedBooking.safety_score > 9 ? "default" : "secondary"}>
                        Safety: {selectedBooking.safety_score}/10
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{selectedBooking.description}</p>
                  
                  {selectedBooking.amenities && (
                    <div>
                      <h3 className="font-medium mb-2">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedBooking.amenities.map((amenity: string) => (
                          <div key={amenity} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded">
                            {renderAmenityIcon(amenity)}
                            <span className="text-xs">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedBooking.ai_recommendation && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>AI Recommendation:</strong> {selectedBooking.ai_recommendation}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Date</span>
                    <span>{selectedDates?.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests</span>
                    <span>{guests} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span>{selectedBooking.duration || '1 night'}</span>
                  </div>
                </div>
                
                <hr />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Price</span>
                    <span>₹{selectedBooking.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>₹{Math.round(selectedBooking.price * 0.1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>₹{Math.round(selectedBooking.price * 0.12)}</span>
                  </div>
                </div>
                
                <hr />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>₹{Math.round(selectedBooking.price * 1.22)}</span>
                </div>
                
                <Button onClick={proceedToPayment} className="w-full">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </Button>
                
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Secure payment powered by blockchain. Free cancellation up to 24 hours.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Find Your Perfect Stay & Experience
          </CardTitle>
          <CardDescription>
            AI-powered recommendations with safety-first approach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Enter destination"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Check-in Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  className="pl-10"
                  value={selectedDates?.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDates(new Date(e.target.value))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Guests</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                  <SelectItem value="5+">5+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Tabs defaultValue="accommodations">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="accommodations">
            <Bed className="w-4 h-4 mr-2" />
            Accommodations
          </TabsTrigger>
          <TabsTrigger value="experiences">
            <Camera className="w-4 h-4 mr-2" />
            Experiences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accommodations" className="space-y-4">
          {accommodations.map((acc) => (
            <Card key={acc.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-medium">{acc.name}</h3>
                        {acc.verified_business && (
                          <Badge variant="default" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{acc.type} • {acc.location}</p>
                    </div>
                    
                    <p className="text-sm">{acc.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {acc.amenities.slice(0, 4).map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                          {renderAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </div>
                      ))}
                      {acc.amenities.length > 4 && (
                        <span className="text-xs text-muted-foreground">+{acc.amenities.length - 4} more</span>
                      )}
                    </div>
                    
                    <Alert className="py-2">
                      <Shield className="h-3 w-3" />
                      <AlertDescription className="text-xs">
                        {acc.ai_recommendation}
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <div className="space-y-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{acc.rating}</span>
                    </div>
                    
                    <Badge variant={acc.safety_score > 9 ? "default" : "secondary"}>
                      Safety: {acc.safety_score}/10
                    </Badge>
                    
                    <div>
                      <div className="text-2xl font-medium">₹{acc.price}</div>
                      <div className="text-sm text-muted-foreground">per night</div>
                    </div>
                    
                    <Button onClick={() => handleBooking(acc, 'accommodation')} className="w-full">
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="experiences" className="space-y-4">
          {experiences.map((exp) => (
            <Card key={exp.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <h3 className="text-lg font-medium">{exp.name}</h3>
                      <p className="text-sm text-muted-foreground">{exp.type} • {exp.duration}</p>
                    </div>
                    
                    <p className="text-sm">{exp.description}</p>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                      <Badge variant="outline">
                        Safety: {exp.safety_score}/10
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{exp.rating}</span>
                    </div>
                    
                    <div>
                      <div className="text-2xl font-medium">₹{exp.price}</div>
                      <div className="text-sm text-muted-foreground">per person</div>
                    </div>
                    
                    <Button onClick={() => handleBooking(exp, 'experience')} className="w-full">
                      Book Experience
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}