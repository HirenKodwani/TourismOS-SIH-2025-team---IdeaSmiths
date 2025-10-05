import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  MapPin, 
  Calendar, 
  Thermometer, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Cloud,
  Sun,
  Clock,
  Star,
  Navigation,
  Phone,
  Camera,
  Coffee
} from 'lucide-react';

interface HomeDashboardProps {
  user: {
    id: string;
    type: string;
    name: string;
    verified: boolean;
  };
  onNavigate: (view: string) => void;
}

type SafetyStatus = 'safe' | 'warning' | 'emergency';
type DashboardState = 'normal' | 'alert' | 'incident_ongoing';

export function HomeDashboard({ user, onNavigate }: HomeDashboardProps) {
  const [safetyStatus, setSafetyStatus] = useState<SafetyStatus>('safe');
  const [dashboardState, setDashboardState] = useState<DashboardState>('normal');
  const [currentLocation, setCurrentLocation] = useState('Goa, India');
  const [weather, setWeather] = useState({ temp: 28, condition: 'Sunny', icon: Sun });

  // Mock location and weather data
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random safety status changes for demo
      const statuses: SafetyStatus[] = ['safe', 'warning', 'emergency'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      if (Math.random() < 0.1) { // 10% chance of status change
        setSafetyStatus(randomStatus);
        setDashboardState(randomStatus === 'emergency' ? 'incident_ongoing' : 'normal');
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getSafetyColor = (status: SafetyStatus) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'emergency': return 'text-red-600 bg-red-50';
    }
  };

  const getSafetyIcon = (status: SafetyStatus) => {
    switch (status) {
      case 'safe': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'emergency': return AlertTriangle;
    }
  };

  const recommendations = [
    {
      id: 1,
      title: 'Beach Resort Goa',
      type: 'accommodation',
      rating: 4.8,
      price: '₹3,500/night',
      safety_score: 9.2,
      image_query: 'beach resort goa'
    },
    {
      id: 2,
      title: 'Spice Plantation Tour',
      type: 'experience',
      rating: 4.6,
      price: '₹800/person',
      safety_score: 8.9,
      image_query: 'spice plantation tour'
    },
    {
      id: 3,
      title: 'Sunset Cruise',
      type: 'activity',
      rating: 4.7,
      price: '₹1,200/person',
      safety_score: 8.7,
      image_query: 'sunset cruise goa'
    }
  ];

  const quickActions = [
    {
      id: 'emergency',
      title: 'Emergency Help',
      icon: Phone,
      color: 'bg-red-600 hover:bg-red-700',
      action: () => onNavigate('safety')
    },
    {
      id: 'book',
      title: 'Book Now',
      icon: Calendar,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => onNavigate('booking')
    },
    {
      id: 'explore',
      title: 'Explore Nearby',
      icon: Navigation,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => alert('Opening nearby attractions map...')
    },
    {
      id: 'camera',
      title: 'AR Guide',
      icon: Camera,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => alert('AR camera guide launching...')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl mb-2">Welcome back, {user.name}!</h1>
        <p className="opacity-90">Ready for your next adventure in {currentLocation}?</p>
      </div>

      {/* Safety Status */}
      <Card className={`border-l-4 ${safetyStatus === 'safe' ? 'border-l-green-500' : safetyStatus === 'warning' ? 'border-l-yellow-500' : 'border-l-red-500'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(getSafetyIcon(safetyStatus), {
              className: `w-5 h-5 ${safetyStatus === 'safe' ? 'text-green-600' : safetyStatus === 'warning' ? 'text-yellow-600' : 'text-red-600'}`
            })}
            Safety Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Badge className={getSafetyColor(safetyStatus)} variant="secondary">
              {safetyStatus.toUpperCase()}
            </Badge>
            <span className="text-sm text-muted-foreground">Last updated: 2 min ago</span>
          </div>
          
          {safetyStatus === 'safe' && (
            <p className="text-sm">All systems green. Enjoy your trip!</p>
          )}
          
          {safetyStatus === 'warning' && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Weather alert: Heavy rainfall expected. Consider indoor activities.
              </AlertDescription>
            </Alert>
          )}
          
          {safetyStatus === 'emergency' && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                Emergency situation detected in your area. Please stay safe and contact authorities if needed.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Location & Weather */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Current Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg">{currentLocation}</p>
              <p className="text-sm text-muted-foreground">Updated 1 minute ago</p>
              <Button size="sm" variant="outline" onClick={() => alert('Opening full map...')}>
                View on Map
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <weather.icon className="w-5 h-5" />
              Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{weather.temp}°C</span>
                <span className="text-muted-foreground">{weather.condition}</span>
              </div>
              <p className="text-sm text-muted-foreground">Perfect weather for sightseeing!</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>
            AI-curated suggestions based on your preferences and safety scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                      <span className="text-xs ml-2 text-gray-500">Image: {rec.image_query}</span>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{rec.title}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{rec.type}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{rec.rating}</span>
                      </div>
                      <Badge variant="outline">Safety: {rec.safety_score}/10</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>{rec.price}</span>
                      <Button size="sm" onClick={() => onNavigate('booking')}>
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Fast access to essential services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                onClick={action.action}
                className={`${action.color} text-white h-20 flex-col space-y-2`}
                variant="default"
              >
                <action.icon className="w-6 h-6" />
                <span className="text-xs text-center">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm">Checked into Grand Palace Resort</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm">Booked Spice Plantation Tour</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <Badge variant="outline">Upcoming</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm">Digital ID verified</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <Badge variant="outline">Verified</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}