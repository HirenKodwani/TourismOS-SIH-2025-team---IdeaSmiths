import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Star, 
  Calendar, 
  DollarSign,
  PlusCircle,
  Edit3,
  Eye,
  MessageSquare,
  GraduationCap,
  Shield,
  CheckCircle,
  BarChart3,
  Camera
} from 'lucide-react';

interface BusinessPortalProps {
  user: {
    id: string;
    type: string;
    name: string;
    verified: boolean;
  };
}

export function BusinessPortal({ user }: BusinessPortalProps) {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [newListing, setNewListing] = useState({
    name: '',
    type: 'hotel',
    description: '',
    price: '',
    amenities: ''
  });

  const businessStats = {
    revenue: 245000,
    bookings: 156,
    rating: 4.7,
    occupancy: 78,
    growth: 12.5
  };

  const recentBookings = [
    { id: 'B001', guest: 'Alex Johnson', dates: '15-17 Dec', amount: 7000, status: 'confirmed' },
    { id: 'B002', guest: 'Sarah Chen', dates: '18-20 Dec', amount: 5600, status: 'checked_in' },
    { id: 'B003', guest: 'Mike Wilson', dates: '20-22 Dec', amount: 6300, status: 'pending' }
  ];

  const listings = [
    {
      id: 'L001',
      name: 'Deluxe Beach View Room',
      type: 'Accommodation',
      price: 3500,
      status: 'active',
      bookings: 45,
      rating: 4.8
    },
    {
      id: 'L002',
      name: 'Garden Villa Suite',
      type: 'Accommodation',
      price: 5500,
      status: 'active',
      bookings: 23,
      rating: 4.9
    },
    {
      id: 'L003',
      name: 'Budget Room',
      type: 'Accommodation',
      price: 2200,
      status: 'inactive',
      bookings: 12,
      rating: 4.3
    }
  ];

  const reviews = [
    {
      id: 'R001',
      guest: 'Alex Johnson',
      rating: 5,
      comment: 'Amazing stay! Beautiful views and excellent service.',
      date: '2 days ago',
      response: null
    },
    {
      id: 'R002',
      guest: 'Sarah Chen',
      rating: 4,
      comment: 'Great location but room could use some updates.',
      date: '5 days ago',
      response: 'Thank you for your feedback. We are working on renovations.'
    },
    {
      id: 'R003',
      guest: 'Mike Wilson',
      rating: 5,
      comment: 'Perfect for a relaxing vacation. Will definitely come back!',
      date: '1 week ago',
      response: null
    }
  ];

  const staffMembers = [
    { id: 'S001', name: 'Maria Garcia', role: 'Front Desk Manager', training_progress: 85, certified: true },
    { id: 'S002', name: 'Raj Patel', role: 'Housekeeping', training_progress: 60, certified: false },
    { id: 'S003', name: 'Lisa Wong', role: 'Concierge', training_progress: 100, certified: true }
  ];

  const handleAddListing = () => {
    if (newListing.name && newListing.price) {
      alert('New listing added successfully!');
      setNewListing({ name: '', type: 'hotel', description: '', price: '', amenities: '' });
    }
  };

  const respondToReview = (reviewId: string) => {
    const response = prompt('Enter your response:');
    if (response) {
      alert('Response posted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Business Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl mb-2">{user.name}</h1>
              <p className="opacity-90">Business Dashboard</p>
            </div>
            <div className="text-right">
              <Badge className="bg-white/20 text-white border-white/30">
                {user.verified ? 'Verified Business' : 'Pending Verification'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">₹{businessStats.revenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Monthly Revenue</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{businessStats.bookings}</div>
                <div className="text-sm text-muted-foreground">Total Bookings</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold">{businessStats.rating}</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{businessStats.occupancy}%</div>
                <div className="text-sm text-muted-foreground">Occupancy Rate</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">+{businessStats.growth}%</div>
                <div className="text-sm text-muted-foreground">Growth</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest reservations from guests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <p className="font-medium">{booking.guest}</p>
                      <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm">{booking.dates}</p>
                      <Badge variant={
                        booking.status === 'confirmed' ? 'default' : 
                        booking.status === 'checked_in' ? 'secondary' : 'outline'
                      }>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{booking.amount}</p>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Revenue Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Revenue analytics chart would display here</p>
                  <p className="text-sm">Showing monthly trends and forecasts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings" className="space-y-6">
          {/* Add New Listing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Add New Listing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Listing Name</Label>
                  <Input
                    value={newListing.name}
                    onChange={(e) => setNewListing({...newListing, name: e.target.value})}
                    placeholder="e.g., Deluxe Ocean View Suite"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price per Night</Label>
                  <Input
                    type="number"
                    value={newListing.price}
                    onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                    placeholder="Enter amount in ₹"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newListing.description}
                  onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                  placeholder="Describe your accommodation..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Amenities (comma separated)</Label>
                <Input
                  value={newListing.amenities}
                  onChange={(e) => setNewListing({...newListing, amenities: e.target.value})}
                  placeholder="WiFi, AC, TV, Beach Access..."
                />
              </div>
              
              <Button onClick={handleAddListing}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Listing
              </Button>
            </CardContent>
          </Card>

          {/* Current Listings */}
          <Card>
            <CardHeader>
              <CardTitle>Your Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div key={listing.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                      
                      <div className="md:col-span-2">
                        <h3 className="font-medium">{listing.name}</h3>
                        <p className="text-sm text-muted-foreground">{listing.type}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-sm">{listing.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{listing.bookings} bookings</span>
                          <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                            {listing.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <div className="text-lg font-medium">₹{listing.price}/night</div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        {review.guest.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{review.guest}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  
                  <p className="text-muted-foreground">{review.comment}</p>
                  
                  {review.response ? (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm"><strong>Your response:</strong> {review.response}</p>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => respondToReview(review.id)}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Respond
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Staff Training & Management
              </CardTitle>
              <CardDescription>
                Monitor your team's training progress and certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffMembers.map((staff) => (
                  <div key={staff.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{staff.name}</h3>
                        <p className="text-sm text-muted-foreground">{staff.role}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {staff.certified && (
                          <Badge variant="default">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Certified
                          </Badge>
                        )}
                        <Badge variant="outline">ID: {staff.id}</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Training Progress</span>
                        <span>{staff.training_progress}%</span>
                      </div>
                      <Progress value={staff.training_progress} className="w-full" />
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">
                        View Progress
                      </Button>
                      <Button size="sm" variant="outline">
                        Assign Training
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Alert className="mt-6">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  All staff members must complete safety and hospitality training modules. Certifications are blockchain-verified.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}