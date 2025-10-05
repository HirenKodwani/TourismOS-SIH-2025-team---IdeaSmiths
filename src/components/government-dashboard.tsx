import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Monitor, 
  AlertTriangle, 
  Users, 
  MapPin, 
  TrendingUp, 
  Shield, 
  Activity,
  Phone,
  CheckCircle,
  Clock,
  BarChart3,
  DollarSign,
  Calendar,
  Eye,
  Radio,
  Navigation
} from 'lucide-react';

interface GovernmentDashboardProps {
  user: {
    id: string;
    type: string;
    name: string;
    verified: boolean;
  };
}

type MonitoringState = 'monitoring' | 'incident_response' | 'analysis';
type IncidentStatus = 'active' | 'responding' | 'resolved';

export function GovernmentDashboard({ user }: GovernmentDashboardProps) {
  const [monitoringState, setMonitoringState] = useState<MonitoringState>('monitoring');
  const [realTimeData, setRealTimeData] = useState({
    activeTourists: 12543,
    safetyIncidents: 3,
    responseTeams: 15,
    avgResponseTime: 8.5
  });

  const [incidents, setIncidents] = useState([
    {
      id: 'INC001',
      type: 'Medical Emergency',
      location: 'Calangute Beach, Goa',
      severity: 'high',
      status: 'responding' as IncidentStatus,
      reportedAt: new Date(Date.now() - 1800000).toISOString(),
      assignedTeam: 'Emergency Response Unit 1',
      touristsAffected: 1,
      eta: '5 min'
    },
    {
      id: 'INC002',
      type: 'Weather Alert',
      location: 'Anjuna Beach Area',
      severity: 'medium',
      status: 'active' as IncidentStatus,
      reportedAt: new Date(Date.now() - 3600000).toISOString(),
      assignedTeam: 'Weather Monitoring Team',
      touristsAffected: 45,
      eta: 'Ongoing'
    },
    {
      id: 'INC003',
      type: 'Traffic Disruption',
      location: 'Panaji City Center',
      severity: 'low',
      status: 'resolved' as IncidentStatus,
      reportedAt: new Date(Date.now() - 7200000).toISOString(),
      assignedTeam: 'Traffic Control Unit',
      touristsAffected: 12,
      eta: 'Completed'
    }
  ]);

  const economicMetrics = {
    monthlyRevenue: 45600000,
    touristArrivals: 28500,
    averageStay: 4.2,
    occupancyRate: 78,
    growthRate: 15.8
  };

  const touristFlow = [
    { area: 'Calangute Beach', current: 2340, capacity: 3000, safety: 'safe' },
    { area: 'Baga Beach', current: 1890, capacity: 2500, safety: 'safe' },
    { area: 'Anjuna Beach', current: 1120, capacity: 1500, safety: 'warning' },
    { area: 'Panaji Market', current: 890, capacity: 1200, safety: 'safe' },
    { area: 'Old Goa Churches', current: 560, capacity: 800, safety: 'safe' }
  ];

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        activeTourists: prev.activeTourists + Math.floor(Math.random() * 20) - 10,
        safetyIncidents: Math.max(0, prev.safetyIncidents + Math.floor(Math.random() * 3) - 1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const assignTeam = (incidentId: string) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === incidentId 
        ? { ...inc, status: 'responding' as IncidentStatus, assignedTeam: 'Emergency Response Unit ' + Math.ceil(Math.random() * 5) }
        : inc
    ));
    alert('Emergency team assigned and dispatched');
  };

  const resolveIncident = (incidentId: string) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === incidentId 
        ? { ...inc, status: 'resolved' as IncidentStatus, eta: 'Completed' }
        : inc
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: IncidentStatus) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-50';
      case 'responding': return 'text-blue-600 bg-blue-50';
      case 'resolved': return 'text-green-600 bg-green-50';
    }
  };

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case 'safe': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Command Center Header */}
      <Card className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl mb-2">Tourism Command Center</h1>
              <p className="opacity-90">Real-time monitoring and incident response</p>
            </div>
            <div className="text-right">
              <Badge className="bg-white/20 text-white border-white/30">
                <Activity className="w-3 h-3 mr-1" />
                System Online
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={monitoringState} onValueChange={(value) => setMonitoringState(value as MonitoringState)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
          <TabsTrigger value="incident_response">Incident Response</TabsTrigger>
          <TabsTrigger value="analysis">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-6">
          {/* Real-time Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{realTimeData.activeTourists.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Active Tourists</div>
                <Badge variant="outline" className="mt-1 text-xs">
                  <Activity className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{realTimeData.safetyIncidents}</div>
                <div className="text-sm text-muted-foreground">Active Incidents</div>
                <Badge variant="outline" className="mt-1 text-xs">
                  {realTimeData.safetyIncidents > 0 ? 'Attention' : 'All Clear'}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{realTimeData.responseTeams}</div>
                <div className="text-sm text-muted-foreground">Response Teams</div>
                <Badge variant="outline" className="mt-1 text-xs">Ready</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{realTimeData.avgResponseTime}min</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
                <Badge variant="outline" className="mt-1 text-xs">Target: {"<"}10min</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Tourist Flow Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Real-Time Tourist Flow
              </CardTitle>
              <CardDescription>
                Live monitoring of tourist density across key locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {touristFlow.map((area, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getSafetyColor(area.safety) === 'text-green-600' ? 'bg-green-500' : getSafetyColor(area.safety) === 'text-yellow-600' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                        <span className="font-medium">{area.area}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {area.current}/{area.capacity}
                        </Badge>
                        <Badge variant={area.safety === 'safe' ? 'default' : area.safety === 'warning' ? 'secondary' : 'destructive'} className="text-xs">
                          {area.safety.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={(area.current / area.capacity) * 100} className="w-full" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Capacity: {Math.round((area.current / area.capacity) * 100)}%
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Map
                </Button>
                <Button variant="outline" size="sm">
                  <Radio className="w-4 h-4 mr-2" />
                  Broadcast Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incident_response" className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {incidents.filter(inc => inc.status === 'active').length} active incidents require attention. 
              {incidents.filter(inc => inc.status === 'responding').length} teams currently responding.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {incidents.map((incident) => (
              <Card key={incident.id} className={`border-l-4 ${
                incident.severity === 'high' ? 'border-l-red-500' :
                incident.severity === 'medium' ? 'border-l-orange-500' : 'border-l-green-500'
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{incident.type}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(incident.severity)} variant="secondary">
                        {incident.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(incident.status)} variant="secondary">
                        {incident.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Incident ID: {incident.id} • Reported {new Date(incident.reportedAt).toLocaleTimeString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{incident.location}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tourists Affected</p>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{incident.touristsAffected}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">ETA / Status</p>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{incident.eta}</span>
                      </div>
                    </div>
                  </div>
                  
                  {incident.assignedTeam && (
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm"><strong>Assigned Team:</strong> {incident.assignedTeam}</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    {incident.status === 'active' && (
                      <Button onClick={() => assignTeam(incident.id)} size="sm">
                        <Shield className="w-4 h-4 mr-2" />
                        Assign Team
                      </Button>
                    )}
                    {incident.status === 'responding' && (
                      <Button onClick={() => resolveIncident(incident.id)} size="sm" variant="outline">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Resolved
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Navigation className="w-4 h-4 mr-2" />
                      Track Team
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Team
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Economic Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Economic Impact Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹{(economicMetrics.monthlyRevenue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{economicMetrics.touristArrivals.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Tourist Arrivals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{economicMetrics.averageStay}</div>
                  <div className="text-sm text-muted-foreground">Avg Stay (days)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{economicMetrics.occupancyRate}%</div>
                  <div className="text-sm text-muted-foreground">Occupancy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+{economicMetrics.growthRate}%</div>
                  <div className="text-sm text-muted-foreground">Growth Rate</div>
                </div>
              </div>
              
              <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Economic impact charts and trends</p>
                  <p className="text-sm">Revenue, tourist flows, and economic indicators</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Safety Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">98.7%</div>
                  <div className="text-sm text-muted-foreground mb-2">Safety Score</div>
                  <Progress value={98.7} className="w-full" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">6.2min</div>
                  <div className="text-sm text-muted-foreground mb-2">Avg Response Time</div>
                  <Progress value={85} className="w-full" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">99.1%</div>
                  <div className="text-sm text-muted-foreground mb-2">Incident Resolution</div>
                  <Progress value={99.1} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trends and Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trends & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Key Insight:</strong> Tourist arrivals increased by 15.8% this month. Beach areas showing highest demand.
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <Calendar className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Seasonal Pattern:</strong> Peak hours are 10 AM - 4 PM for beach areas. Consider additional safety patrols during these times.
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Safety Recommendation:</strong> Weather-related incidents are the most common. Enhanced weather monitoring recommended.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}