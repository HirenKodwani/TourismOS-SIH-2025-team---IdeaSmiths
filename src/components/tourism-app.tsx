import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Shield, 
  MapPin, 
  Calendar, 
  Users, 
  Settings, 
  Bell, 
  Wallet, 
  GraduationCap,
  Building2,
  AlertTriangle,
  CheckCircle,
  QrCode,
  CreditCard,
  Phone,
  Monitor,
  ArrowLeft
} from 'lucide-react';

// Import feature components
import { DigitalIdentity } from './digital-identity';
import { HomeDashboard } from './home-dashboard';
import { BookingFlow } from './booking-flow';
import { SafetyCenter } from './safety-center';
import { BusinessPortal } from './business-portal';
import { TrainingModule } from './training-module';
import { GovernmentDashboard } from './government-dashboard';
import { WalletPayments } from './wallet-payments';
import { NotificationCenter } from './notification-center';

type UserType = 'tourist' | 'business' | 'government_official' | 'staff' | null;

type AppState = {
  currentUser: {
    id: string;
    type: UserType;
    name: string;
    verified: boolean;
  } | null;
  currentView: string;
  globalState: 'online' | 'offline' | 'maintenance_mode' | 'emergency_broadcast';
};

interface TourismAppProps {
  onBackToLanding: () => void;
}

export function TourismApp({ onBackToLanding }: TourismAppProps) {
  const [appState, setAppState] = useState<AppState>({
    currentUser: null,
    currentView: 'login',
    globalState: 'online'
  });

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'booking_confirmation',
      message: 'Your hotel booking at Grand Palace Resort has been confirmed',
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: '2',
      type: 'safety_alert',
      message: 'Weather alert: Heavy rainfall expected in your area',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false
    }
  ]);

  // User login simulation
  const handleLogin = (userType: UserType) => {
    const userProfiles = {
      tourist: { id: 'T001', name: 'Alex Johnson', verified: true },
      business: { id: 'B001', name: 'Grand Palace Resort', verified: true },
      government_official: { id: 'G001', name: 'Officer Smith', verified: true },
      staff: { id: 'S001', name: 'Maria Garcia', verified: true }
    };
    
    setAppState({
      ...appState,
      currentUser: {
        type: userType,
        ...userProfiles[userType!],
      },
      currentView: userType === 'tourist' ? 'home' : userType === 'business' ? 'business' : userType === 'government_official' ? 'government' : 'training'
    });
  };

  const handleLogout = () => {
    setAppState({
      ...appState,
      currentUser: null,
      currentView: 'login'
    });
  };

  const navigateTo = (view: string) => {
    setAppState({ ...appState, currentView: view });
  };

  // Emergency broadcast simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1 && appState.globalState === 'online') {
        setAppState(prev => ({ ...prev, globalState: 'emergency_broadcast' }));
        setTimeout(() => {
          setAppState(prev => ({ ...prev, globalState: 'online' }));
        }, 5000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [appState.globalState]);

  // Login Screen
  if (!appState.currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Button 
              variant="ghost" 
              onClick={onBackToLanding}
              className="absolute top-4 left-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Landing
            </Button>
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">TourismOS Demo</CardTitle>
            <CardDescription>
              Choose your user type to access the prototype
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => handleLogin('tourist')} 
              className="w-full justify-start"
              variant="outline"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Tourist
            </Button>
            <Button 
              onClick={() => handleLogin('business')} 
              className="w-full justify-start"
              variant="outline"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Business Owner
            </Button>
            <Button 
              onClick={() => handleLogin('government_official')} 
              className="w-full justify-start"
              variant="outline"
            >
              <Monitor className="w-4 h-4 mr-2" />
              Government Official
            </Button>
            <Button 
              onClick={() => handleLogin('staff')} 
              className="w-full justify-start"
              variant="outline"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Staff/Worker
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Emergency broadcast overlay
  const EmergencyOverlay = () => {
    if (appState.globalState !== 'emergency_broadcast') return null;
    
    return (
      <div className="fixed inset-0 bg-red-600 bg-opacity-90 z-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg max-w-md text-center">
          <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl mb-4">Emergency Broadcast</h2>
          <p className="mb-4">
            Severe weather warning in effect. Please stay indoors and follow official guidance.
          </p>
          <Button onClick={() => setAppState(prev => ({ ...prev, globalState: 'online' }))}>
            Acknowledged
          </Button>
        </div>
      </div>
    );
  };

  // Navigation for different user types
  const getNavigation = () => {
    const { type } = appState.currentUser!;
    
    const commonNav = (
      <div className="flex items-center space-x-2 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBackToLanding}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Landing
        </Button>
        <div className="flex items-center space-x-2">
          <Badge variant={appState.currentUser!.verified ? "default" : "destructive"}>
            {appState.currentUser!.verified ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
            {appState.currentUser!.verified ? 'Verified' : 'Unverified'}
          </Badge>
          <span>{appState.currentUser!.name}</span>
        </div>
        <div className="flex-1" />
        <Button variant="outline" size="sm" onClick={() => navigateTo('notifications')}>
          <Bell className="w-4 h-4" />
          {notifications.filter(n => !n.read).length > 0 && (
            <Badge variant="destructive" className="ml-1 text-xs">
              {notifications.filter(n => !n.read).length}
            </Badge>
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );

    if (type === 'tourist') {
      return (
        <div>
          {commonNav}
          <Tabs value={appState.currentView} onValueChange={navigateTo}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="identity">ID</TabsTrigger>
              <TabsTrigger value="booking">Book</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      );
    } else if (type === 'business') {
      return (
        <div>
          {commonNav}
          <Tabs value={appState.currentView} onValueChange={navigateTo}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="business">Dashboard</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="wallet">Payments</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      );
    } else if (type === 'government_official') {
      return (
        <div>
          {commonNav}
          <Tabs value={appState.currentView} onValueChange={navigateTo}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="government">Command Center</TabsTrigger>
              <TabsTrigger value="safety">Safety Response</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      );
    } else {
      return (
        <div>
          {commonNav}
          <Tabs value={appState.currentView} onValueChange={navigateTo}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="wallet">Rewards</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      );
    }
  };

  // Main content renderer
  const renderContent = () => {
    switch (appState.currentView) {
      case 'home':
        return <HomeDashboard user={appState.currentUser!} onNavigate={navigateTo} />;
      case 'identity':
        return <DigitalIdentity user={appState.currentUser!} />;
      case 'booking':
        return <BookingFlow user={appState.currentUser!} onNavigate={navigateTo} />;
      case 'safety':
        return <SafetyCenter user={appState.currentUser!} />;
      case 'business':
        return <BusinessPortal user={appState.currentUser!} />;
      case 'training':
        return <TrainingModule user={appState.currentUser!} />;
      case 'government':
        return <GovernmentDashboard user={appState.currentUser!} />;
      case 'wallet':
        return <WalletPayments user={appState.currentUser!} />;
      case 'notifications':
        return <NotificationCenter notifications={notifications} onMarkRead={(id) => {
          setNotifications(prev => prev.map(n => n.id === id ? {...n, read: true} : n));
        }} />;
      default:
        return <div>Unknown view</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EmergencyOverlay />
      
      {/* Global status bar */}
      {appState.globalState !== 'online' && (
        <Alert className="rounded-none border-x-0">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            System Status: {appState.globalState.replace('_', ' ').toUpperCase()}
          </AlertDescription>
        </Alert>
      )}

      <div className="container mx-auto p-4 max-w-6xl">
        {getNavigation()}
        <div className="mt-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}