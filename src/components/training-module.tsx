import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  GraduationCap, 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  Star, 
  Award, 
  BookOpen,
  Users,
  Shield,
  Languages,
  Trophy,
  Download,
  Calendar,
  Target
} from 'lucide-react';

interface TrainingModuleProps {
  user: {
    id: string;
    type: string;
    name: string;
    verified: boolean;
  };
}

type CourseProgress = 'incomplete' | 'in_progress' | 'completed';

export function TrainingModule({ user }: TrainingModuleProps) {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState(0);

  const userProfile = {
    totalCourses: 12,
    completedCourses: 8,
    certificationsEarned: 5,
    totalHours: 45,
    currentLevel: 'Intermediate',
    points: 1250
  };

  const availableCourses = [
    {
      id: 'C001',
      title: 'Hospitality Excellence Fundamentals',
      category: 'Hospitality',
      duration: '4 hours',
      level: 'Beginner',
      language: 'English',
      rating: 4.8,
      progress: 100,
      status: 'completed' as CourseProgress,
      modules: 6,
      description: 'Master the basics of exceptional guest service',
      skills: ['Customer Service', 'Communication', 'Problem Solving'],
      certificate_available: true
    },
    {
      id: 'C002',
      title: 'Emergency Response & Safety Protocols',
      category: 'Safety',
      duration: '3 hours',
      level: 'Intermediate',
      language: 'English',
      rating: 4.9,
      progress: 60,
      status: 'in_progress' as CourseProgress,
      modules: 5,
      description: 'Critical safety procedures for tourism professionals',
      skills: ['Emergency Response', 'First Aid', 'Risk Assessment'],
      certificate_available: false
    },
    {
      id: 'C003',
      title: 'Cultural Sensitivity & Local Customs',
      category: 'Cultural',
      duration: '2.5 hours',
      level: 'Beginner',
      language: 'Hindi',
      rating: 4.6,
      progress: 0,
      status: 'incomplete' as CourseProgress,
      modules: 4,
      description: 'Understanding and respecting diverse cultures',
      skills: ['Cultural Awareness', 'Communication', 'Respect'],
      certificate_available: false
    },
    {
      id: 'C004',
      title: 'Digital Tourism Tools & Technology',
      category: 'Technology',
      duration: '5 hours',
      level: 'Advanced',
      language: 'English',
      rating: 4.7,
      progress: 0,
      status: 'incomplete' as CourseProgress,
      modules: 8,
      description: 'Modern digital tools for tourism professionals',
      skills: ['Digital Literacy', 'Apps & Platforms', 'Data Management'],
      certificate_available: false
    },
    {
      id: 'C005',
      title: 'Sustainable Tourism Practices',
      category: 'Environment',
      duration: '3.5 hours',
      level: 'Intermediate',
      language: 'English',
      rating: 4.8,
      progress: 100,
      status: 'completed' as CourseProgress,
      modules: 6,
      description: 'Promoting eco-friendly tourism practices',
      skills: ['Environmental Awareness', 'Sustainability', 'Conservation'],
      certificate_available: true
    }
  ];

  const certificates = [
    {
      id: 'CERT001',
      title: 'Hospitality Excellence Certificate',
      issuer: 'Tourism Ministry of India',
      date: '2024-11-15',
      blockchain_hash: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      verified: true
    },
    {
      id: 'CERT002',
      title: 'Sustainable Tourism Advocate',
      issuer: 'Green Tourism Board',
      date: '2024-12-01',
      blockchain_hash: 'bc1qzx3lkfghmnjpoiuytresdfghjklqwertyuiop',
      verified: true
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Priya Singh', points: 2150, avatar: 'PS' },
    { rank: 2, name: 'Raj Kumar', points: 1980, avatar: 'RK' },
    { rank: 3, name: 'Maria Garcia', points: 1750, avatar: 'MG' },
    { rank: 4, name: user.name, points: userProfile.points, avatar: user.name.split(' ').map(n => n[0]).join('') },
    { rank: 5, name: 'Lisa Wong', points: 1150, avatar: 'LW' }
  ];

  const startCourse = (course: any) => {
    setSelectedCourse(course);
    setCurrentModule(0);
  };

  const nextModule = () => {
    if (selectedCourse && currentModule < selectedCourse.modules - 1) {
      setCurrentModule(prev => prev + 1);
    } else {
      // Course completed
      const updatedCourse = {...selectedCourse, progress: 100, status: 'completed', certificate_available: true};
      alert(`Congratulations! You've completed ${selectedCourse.title}. Certificate available for download.`);
      setSelectedCourse(null);
    }
  };

  const getStatusColor = (status: CourseProgress) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in_progress': return 'text-blue-600 bg-blue-50';
      case 'incomplete': return 'text-gray-600 bg-gray-50';
    }
  };

  const downloadCertificate = (cert: any) => {
    alert(`Downloading certificate: ${cert.title}\nBlockchain Hash: ${cert.blockchain_hash}`);
  };

  if (selectedCourse) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button onClick={() => setSelectedCourse(null)} variant="outline" className="mb-4">
          ← Back to Courses
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedCourse.title}</CardTitle>
                <CardDescription>
                  Module {currentModule + 1} of {selectedCourse.modules}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(selectedCourse.status)}>
                {selectedCourse.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            <Progress value={(currentModule + 1) / selectedCourse.modules * 100} className="w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PlayCircle className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl mb-2">Module {currentModule + 1}: Introduction</h3>
                <p className="text-muted-foreground mb-4">
                  {currentModule === 0 && 'Course overview and learning objectives'}
                  {currentModule === 1 && 'Core principles and best practices'}
                  {currentModule === 2 && 'Practical applications and examples'}
                  {currentModule === 3 && 'Advanced techniques and strategies'}
                  {currentModule === 4 && 'Real-world case studies'}
                  {currentModule === 5 && 'Assessment and certification'}
                </p>
                <Button onClick={nextModule}>
                  {currentModule < selectedCourse.modules - 1 ? 'Next Module' : 'Complete Course'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Understand key concepts and principles</li>
                    <li>• Apply knowledge in real-world scenarios</li>
                    <li>• Develop practical skills and competencies</li>
                    <li>• Pass the final assessment with 80% or higher</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills You'll Gain</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.skills.map((skill: string) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Progress Overview */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userProfile.points}</div>
              <div className="text-sm opacity-90">Total Points</div>
            </div>
            <div className="text-center">
              <GraduationCap className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userProfile.completedCourses}</div>
              <div className="text-sm opacity-90">Courses Completed</div>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userProfile.certificationsEarned}</div>
              <div className="text-sm opacity-90">Certifications</div>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userProfile.totalHours}h</div>
              <div className="text-sm opacity-90">Learning Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="courses">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Available Courses</TabsTrigger>
          <TabsTrigger value="certificates">My Certificates</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4">
            {availableCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-purple-600" />
                    </div>
                    
                    <div className="md:col-span-2 space-y-3">
                      <div>
                        <h3 className="text-lg font-medium">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {course.duration}
                        </Badge>
                        <Badge variant="outline">
                          <Target className="w-3 h-3 mr-1" />
                          {course.level}
                        </Badge>
                        <Badge variant="outline">
                          <Languages className="w-3 h-3 mr-1" />
                          {course.language}
                        </Badge>
                        <Badge variant="outline">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {course.modules} modules
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {course.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      {course.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="w-full" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3 text-right">
                      <div className="flex items-center justify-end">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span>{course.rating}</span>
                      </div>
                      
                      <Badge className={getStatusColor(course.status)} variant="secondary">
                        {course.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      
                      {course.status === 'completed' && course.certificate_available ? (
                        <Button variant="outline" className="w-full" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Certificate
                        </Button>
                      ) : course.status === 'in_progress' ? (
                        <Button onClick={() => startCourse(course)} className="w-full">
                          Continue
                        </Button>
                      ) : (
                        <Button onClick={() => startCourse(course)} className="w-full">
                          Start Course
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          {certificates.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg mb-2">No Certificates Yet</h3>
                <p className="text-muted-foreground">Complete courses to earn blockchain-verified certificates</p>
              </CardContent>
            </Card>
          ) : (
            certificates.map((cert) => (
              <Card key={cert.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-gold-100 to-yellow-100 rounded-lg flex items-center justify-center">
                        <Award className="w-8 h-8 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{cert.title}</h3>
                        <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{cert.date}</span>
                          {cert.verified && (
                            <Badge variant="default" className="text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Blockchain Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Button onClick={() => downloadCertificate(cert)}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Hash: {cert.blockchain_hash.slice(0, 12)}...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Top Learners This Month
              </CardTitle>
              <CardDescription>
                Compete with other tourism professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((person) => (
                  <div key={person.rank} className="flex items-center justify-between p-4 border rounded">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        person.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                        person.rank === 2 ? 'bg-gray-100 text-gray-800' :
                        person.rank === 3 ? 'bg-orange-100 text-orange-800' :
                        person.name === user.name ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {person.rank <= 3 ? (
                          <Trophy className="w-4 h-4" />
                        ) : (
                          person.rank
                        )}
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {person.avatar}
                      </div>
                      <div>
                        <p className={`font-medium ${person.name === user.name ? 'text-blue-600' : ''}`}>
                          {person.name}
                          {person.name === user.name && ' (You)'}
                        </p>
                        <p className="text-sm text-muted-foreground">Rank #{person.rank}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{person.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}