import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Calendar, 
  CreditCard, 
  MapPin, 
  Shield,
  Star,
  Gift,
  Clock,
  Archive,
  Trash2,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';

interface NotificationCenterProps {
  notifications: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: string;
    read: boolean;
  }>;
  onMarkRead: (id: string) => void;
}

type NotificationState = 'unread' | 'read' | 'archived';

export function NotificationCenter({ notifications, onMarkRead }: NotificationCenterProps) {
  const [notificationSettings, setNotificationSettings] = React.useState({
    booking: true,
    safety: true,
    promotions: false,
    system: true,
    sound: true
  });

  // Extended notifications with more examples
  const allNotifications = [
    ...notifications,
    {
      id: '3',
      type: 'safety_update',
      message: 'Safety status updated for your area - all clear',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true
    },
    {
      id: '4',
      type: 'promotion',
      message: 'Special offer: 20% off on beach resort bookings this weekend!',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      read: false
    },
    {
      id: '5',
      type: 'training_completion',
      message: 'Congratulations! You completed the Hospitality Excellence course',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      read: true
    },
    {
      id: '6',
      type: 'payment_received',
      message: 'Payment of ₹1,200 received for Sunset Cruise booking',
      timestamp: new Date(Date.now() - 18000000).toISOString(),
      read: true
    },
    {
      id: '7',
      type: 'emergency_resolved',
      message: 'Emergency situation resolved. Thank you for your cooperation.',
      timestamp: new Date(Date.now() - 21600000).toISOString(),
      read: false
    },
    {
      id: '8',
      type: 'review_received',
      message: 'New 5-star review received from Alex Johnson',
      timestamp: new Date(Date.now() - 25200000).toISOString(),
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_confirmation':
      case 'booking_reminder':
        return Calendar;
      case 'payment_received':
      case 'payment_pending':
        return CreditCard;
      case 'safety_alert':
      case 'safety_update':
      case 'emergency_resolved':
        return Shield;
      case 'location_update':
        return MapPin;
      case 'promotion':
      case 'reward_earned':
        return Gift;
      case 'training_completion':
        return CheckCircle;
      case 'review_received':
        return Star;
      case 'system_maintenance':
        return Settings;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking_confirmation':
        return 'text-green-600 bg-green-100';
      case 'safety_alert':
      case 'emergency_resolved':
        return 'text-red-600 bg-red-100';
      case 'payment_received':
      case 'reward_earned':
        return 'text-blue-600 bg-blue-100';
      case 'promotion':
        return 'text-purple-600 bg-purple-100';
      case 'training_completion':
        return 'text-green-600 bg-green-100';
      case 'review_received':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityLevel = (type: string) => {
    switch (type) {
      case 'safety_alert':
      case 'emergency_resolved':
        return 'high';
      case 'booking_confirmation':
      case 'payment_received':
        return 'medium';
      case 'promotion':
      case 'review_received':
        return 'low';
      default:
        return 'medium';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hr ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const markAllAsRead = () => {
    allNotifications.forEach(notification => {
      if (!notification.read) {
        onMarkRead(notification.id);
      }
    });
  };

  const unreadCount = allNotifications.filter(n => !n.read).length;
  const highPriorityUnread = allNotifications.filter(n => !n.read && getPriorityLevel(n.type) === 'high').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive">{unreadCount}</Badge>
                )}
              </CardTitle>
              <CardDescription>
                Stay updated with your tourism activities
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* High Priority Alerts */}
      {highPriorityUnread > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            You have {highPriorityUnread} high priority notification{highPriorityUnread > 1 ? 's' : ''} requiring attention.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            All ({allNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="safety">
            Safety
          </TabsTrigger>
          <TabsTrigger value="bookings">
            Bookings
          </TabsTrigger>
          <TabsTrigger value="settings">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {allNotifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const colorClass = getNotificationColor(notification.type);
            const priority = getPriorityLevel(notification.type);
            
            return (
              <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                          <p className={`${!notification.read ? 'font-medium' : ''}`}>
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimestamp(notification.timestamp)}</span>
                          <Badge variant="outline" className="text-xs">
                            {notification.type.replace('_', ' ')}
                          </Badge>
                          {priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">
                              High Priority
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      {!notification.read && (
                        <Button 
                          onClick={() => onMarkRead(notification.id)}
                          variant="ghost" 
                          size="sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Archive className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {allNotifications
            .filter(n => !n.read)
            .map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const colorClass = getNotificationColor(notification.type);
              const priority = getPriorityLevel(notification.type);
              
              return (
                <Card key={notification.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <p className="font-medium">{notification.message}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimestamp(notification.timestamp)}</span>
                            {priority === 'high' && (
                              <Badge variant="destructive" className="text-xs">
                                High Priority
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => onMarkRead(notification.id)}
                        size="sm"
                      >
                        Mark Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          {allNotifications
            .filter(n => n.type.includes('safety') || n.type.includes('emergency'))
            .map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const colorClass = getNotificationColor(notification.type);
              
              return (
                <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-red-500' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className={`${!notification.read ? 'font-medium' : ''}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimestamp(notification.timestamp)}</span>
                          <Badge variant="destructive" className="text-xs">
                            Safety Alert
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          {allNotifications
            .filter(n => n.type.includes('booking') || n.type.includes('payment'))
            .map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const colorClass = getNotificationColor(notification.type);
              
              return (
                <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-green-500' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className={`${!notification.read ? 'font-medium' : ''}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimestamp(notification.timestamp)}</span>
                          <Badge variant="outline" className="text-xs">
                            {notification.type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose which notifications you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Booking Updates</p>
                    <p className="text-sm text-muted-foreground">Confirmations, reminders, and changes</p>
                  </div>
                  <Button
                    variant={notificationSettings.booking ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotificationSettings({...notificationSettings, booking: !notificationSettings.booking})}
                  >
                    {notificationSettings.booking ? 'On' : 'Off'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Safety Alerts</p>
                    <p className="text-sm text-muted-foreground">Emergency notifications and safety updates</p>
                  </div>
                  <Button
                    variant={notificationSettings.safety ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotificationSettings({...notificationSettings, safety: !notificationSettings.safety})}
                  >
                    {notificationSettings.safety ? 'On' : 'Off'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotions & Offers</p>
                    <p className="text-sm text-muted-foreground">Special deals and marketing messages</p>
                  </div>
                  <Button
                    variant={notificationSettings.promotions ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotificationSettings({...notificationSettings, promotions: !notificationSettings.promotions})}
                  >
                    {notificationSettings.promotions ? 'On' : 'Off'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Updates</p>
                    <p className="text-sm text-muted-foreground">App updates and maintenance notices</p>
                  </div>
                  <Button
                    variant={notificationSettings.system ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotificationSettings({...notificationSettings, system: !notificationSettings.system})}
                  >
                    {notificationSettings.system ? 'On' : 'Off'}
                  </Button>
                </div>
              </div>
              
              <hr />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sound Notifications</p>
                  <p className="text-sm text-muted-foreground">Play sound for new notifications</p>
                </div>
                <Button
                  variant={notificationSettings.sound ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNotificationSettings({...notificationSettings, sound: !notificationSettings.sound})}
                >
                  {notificationSettings.sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  {notificationSettings.sound ? 'On' : 'Off'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Safety and emergency notifications cannot be disabled for your security.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}