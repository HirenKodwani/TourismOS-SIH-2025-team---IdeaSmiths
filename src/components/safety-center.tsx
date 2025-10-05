import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  Phone, 
  MapPin, 
  AlertTriangle, 
  Shield, 
  Clock, 
  CheckCircle, 
  Users,
  Navigation,
  Zap,
  Radio,
  Eye,
  Activity
} from 'lucide-react';

interface SafetyCenterProps {
  user: {
    id: string;
    type: string;
    name: string;
    verified: boolean;
  };
}

type SafetyState = 'idle' | 'alert_sent' | 'responding' | 'help_arrived' | 'incident_closed';

export function SafetyCenter({ user }: SafetyCenterProps) {
  const [safetyState, setSafetyState] = useState<SafetyState>('idle');
  const [emergencyTimer, setEmergencyTimer] = useState(0);
  const [currentLocation] = useState({ lat: 15.2993, lng: 74.1240, name: 'Calangute Beach, Goa' });
  const [nearbyIncidents, setNearbyIncidents] = useState([
    {
      id: 1,
      type: 'Weather Alert',
      severity: 'medium',
      distance: '2.1 km',
      description: 'Heavy rainfall warning',
      status: 'active',
      time: '15 min ago'
    },
    {
      id: 2,
      type: 'Traffic Advisory',
      severity: 'low',
      distance: '0.8 km',
      description: 'Road construction ahead',
      status: 'ongoing',
      time: '1 hour ago'
    }
  ]);

  // Emergency timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (safetyState === 'alert_sent' || safetyState === 'responding') {
      interval = setInterval(() => {
        setEmergencyTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [safetyState]);

  // Auto-progress emergency states for demo
  useEffect(() => {
    if (safetyState === 'alert_sent') {
      const timeout = setTimeout(() => {
        setSafetyState('responding');
      }, 5000);
      return () => clearTimeout(timeout);
    } else if (safetyState === 'responding') {
      const timeout = setTimeout(() => {
        setSafetyState('help_arrived');
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [safetyState]);

  const handlePanicButton = () => {
    setSafetyState('alert_sent');
    setEmergencyTimer(0);
    
    // Simulate sending location and alert
    alert(`Emergency alert sent!\nLocation: ${currentLocation.name}\nResponse team dispatched.`);
  };

  const cancelEmergency = () => {
    setSafetyState('idle');
    setEmergencyTimer(0);
  };

  const markIncidentClosed = () => {
    setSafetyState('incident_closed');
    setTimeout(() => {
      setSafetyState('idle');
      setEmergencyTimer(0);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStateColor = (state: SafetyState) => {
    switch (state) {
      case 'idle': return 'text-green-600 bg-green-50';
      case 'alert_sent': return 'text-red-600 bg-red-50';
      case 'responding': return 'text-orange-600 bg-orange-50';
      case 'help_arrived': return 'text-blue-600 bg-blue-50';
      case 'incident_closed': return 'text-green-600 bg-green-50';
    }
  };

  const getStateDescription = (state: SafetyState) => {
    switch (state) {
      case 'idle': return 'All systems operational. You are safe.';
      case 'alert_sent': return 'Emergency alert sent. Help is on the way.';
      case 'responding': return 'Response team dispatched. ETA: 8 minutes.';
      case 'help_arrived': return 'Help has arrived at your location.';
      case 'incident_closed': return 'Incident resolved successfully.';
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Status */}
      <Card className={`border-l-4 ${safetyState === 'idle' ? 'border-l-green-500' : 'border-l-red-500'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Emergency Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={getStateColor(safetyState)} variant="secondary">
              {safetyState.replace('_', ' ').toUpperCase()}
            </Badge>
            {safetyState !== 'idle' && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(emergencyTimer)}</span>
              </div>
            )}
          </div>
          
          <p className="text-muted-foreground">{getStateDescription(safetyState)}</p>
          
          {safetyState === 'responding' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Response Progress</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="w-full" />
            </div>
          )}
          
          <div className="flex space-x-3">
            {safetyState === 'idle' ? (
              <Button 
                onClick={handlePanicButton}
                className="bg-red-600 hover:bg-red-700 text-white flex-1"
              >
                <Zap className="w-4 h-4 mr-2" />
                EMERGENCY - PANIC BUTTON
              </Button>
            ) : safetyState === 'help_arrived' ? (
              <Button onClick={markIncidentClosed} className="bg-green-600 hover:bg-green-700 flex-1">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Resolved
              </Button>
            ) : (
              <Button onClick={cancelEmergency} variant="outline" className="flex-1">
                Cancel Emergency
              </Button>
            )}
            
            <Button variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Call 112
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Live Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Live Location Tracking
          </CardTitle>
          <CardDescription>
            Your location is continuously monitored for safety
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Current Location</span>
              <Badge variant="outline">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{currentLocation.name}</p>
            <p className="text-xs text-muted-foreground">
              Lat: {currentLocation.lat}, Lng: {currentLocation.lng}
            </p>
          </div>
          
          <Alert>
            <Navigation className="h-4 w-4" />
            <AlertDescription>
              Location sharing is enabled for emergency response. You can disable this in privacy settings.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View on Map
            </Button>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Share Location
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Nearby Incidents & Alerts
          </CardTitle>
          <CardDescription>
            Stay informed about safety conditions in your area
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {nearbyIncidents.map((incident) => (
            <div key={incident.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant={incident.severity === 'high' ? 'destructive' : incident.severity === 'medium' ? 'default' : 'secondary'}>
                    {incident.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{incident.distance} away</span>
                </div>
                <span className="text-xs text-muted-foreground">{incident.time}</span>
              </div>
              <p className="text-sm">{incident.description}</p>
            </div>
          ))}
          
          <Button variant="outline" className="w-full">
            View All Incidents
          </Button>
        </CardContent>
      </Card>

      {/* Safe Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Nearby Safe Areas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'Goa Police Station', distance: '0.5 km', type: 'Police' },
            { name: 'District Hospital', distance: '1.2 km', type: 'Medical' },
            { name: 'Tourist Help Center', distance: '0.8 km', type: 'Tourist Aid' }
          ].map((place, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">{place.name}</p>
                <p className="text-sm text-muted-foreground">{place.type}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">{place.distance}</p>
                <Button size="sm" variant="outline">
                  Navigate
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="flex-col h-16">
              <Phone className="w-5 h-5 mb-1" />
              <span className="text-xs">Police: 100</span>
            </Button>
            <Button variant="outline" className="flex-col h-16">
              <Phone className="w-5 h-5 mb-1" />
              <span className="text-xs">Medical: 108</span>
            </Button>
            <Button variant="outline" className="flex-col h-16">
              <Phone className="w-5 h-5 mb-1" />
              <span className="text-xs">Tourist: 1363</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Safety Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Safety Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• Always inform someone about your travel plans</li>
            <li>• Keep your digital ID updated and easily accessible</li>
            <li>• Stay in well-lit and populated areas at night</li>
            <li>• Carry emergency contact numbers</li>
            <li>• Trust your instincts - if something feels wrong, seek help</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}