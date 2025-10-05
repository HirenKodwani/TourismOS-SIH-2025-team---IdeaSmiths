import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { 
  Shield, 
  Star, 
  AlertTriangle, 
  BarChart3, 
  Wallet, 
  ArrowRight, 
  PlayCircle,
  CheckCircle,
  Users,
  Globe,
  TrendingUp,
  MapPin,
  Phone,
  Camera,
  Heart,
  Navigation,
  Award,
  Sparkles
} from 'lucide-react';
import { TourismApp } from './components/tourism-app';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');
  const [activeDestination, setActiveDestination] = useState(0);

  // Cycling destination showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDestination((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (currentView === 'app') {
    return <TourismApp onBackToLanding={() => setCurrentView('landing')} />;
  }

  const destinations = [
    {
      name: "Taj Mahal, Agra",
      image: "https://images.unsplash.com/photo-1619947494583-29fc109e01d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHRhaiUyMG1haGFsJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NzMxMTcxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "World's most beautiful expression of love",
      colors: "from-amber-400 to-orange-600"
    },
    {
      name: "Rajasthan Palaces",
      image: "https://images.unsplash.com/photo-1757237367150-3c134720f075?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHJhamFzdGhhbiUyMHBhbGFjZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc1NzMxMTcyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Royal heritage and magnificent architecture",
      colors: "from-pink-400 to-red-600"
    },
    {
      name: "Kerala Backwaters",
      image: "https://images.unsplash.com/photo-1680599022555-57fb95b64b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGtlcmFsYSUyMGJhY2t3YXRlcnMlMjBib2F0fGVufDF8fHx8MTc1NzMxMTcyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Serene waters and tropical paradise",
      colors: "from-green-400 to-teal-600"
    },
    {
      name: "Sacred Temples",
      image: "https://images.unsplash.com/photo-1684024368201-c93cb97f0cf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHRlbXBsZSUyMHRyYWRpdGlvbmFsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1NzMxMTcyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Ancient spirituality and divine architecture",
      colors: "from-purple-400 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50" style={{ fontFamily: 'PT Sans, system-ui, sans-serif' }}>
      {/* Hero Section - Incredible India Style */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Dynamic Background with Indian Destinations */}
        <div className="absolute inset-0">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeDestination ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ImageWithFallback
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${dest.colors} opacity-70`} />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}
        </div>

        {/* Traditional Indian Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #F2945D 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, #7EC4CF 2px, transparent 2px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-6">
          {/* Navigation - Inspired by Incredible India */}
          <nav className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur opacity-30 animate-pulse" />
              </div>
              <div>
                <span className="text-white text-2xl font-bold tracking-wide drop-shadow-lg">TourismOS</span>
                <div className="text-white/80 text-sm tracking-widest">Incredible India, Digitally Enhanced</div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-white">
              <a href="#destinations" className="hover:text-orange-300 transition-colors font-medium text-lg">Explore</a>
              <a href="#features" className="hover:text-orange-300 transition-colors font-medium text-lg">Features</a>
              <a href="#experiences" className="hover:text-orange-300 transition-colors font-medium text-lg">Experiences</a>
              <button 
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-orange-600 transition-all duration-300 rounded-xl text-lg px-6 py-3 font-medium bg-transparent"
                onClick={() => setCurrentView('app')}
              >
                Live Demo
              </button>
            </div>
          </nav>

          {/* Hero Content - Incredible India Style */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
            {/* Main Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-6">
                {/* Destination indicator */}
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-5 h-5 text-orange-300" />
                  <span className="text-orange-200 text-lg font-medium">
                    {destinations[activeDestination].name}
                  </span>
                </div>

                <h1 className="text-white leading-tight drop-shadow-2xl">
                  <div className="text-6xl lg:text-7xl xl:text-8xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
                      INCREDIBLE
                    </span>
                  </div>
                  <div className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-4">
                    <span className="text-white drop-shadow-lg">INDIA</span>
                  </div>
                  <div className="text-2xl lg:text-3xl xl:text-4xl font-medium text-white/90">
                    Powered by <span className="text-orange-300 font-bold">TourismOS</span>
                  </div>
                </h1>

                <p className="text-white/90 text-xl lg:text-2xl leading-relaxed max-w-2xl drop-shadow-lg">
                  {destinations[activeDestination].description}
                </p>

                <p className="text-white/80 text-lg lg:text-xl leading-relaxed max-w-2xl">
                  Experience India like never before with AI-powered discovery, digital identity, and real-time safety - all in one revolutionary platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <button 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-xl font-bold px-10 py-6 rounded-2xl transform transition-all duration-300 hover:scale-105 shadow-2xl"
                  onClick={() => setCurrentView('app')}
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  Start Your Journey
                  <ArrowRight className="w-6 h-6 ml-3" />
                </button>
                <button 
                  className="inline-flex items-center justify-center border-3 border-white text-white hover:bg-white hover:text-orange-600 text-xl font-bold px-10 py-6 rounded-2xl transition-all duration-300 backdrop-blur-sm hover:shadow-2xl bg-transparent"
                  onClick={() => setCurrentView('app')}
                >
                  <PlayCircle className="w-6 h-6 mr-3" />
                  Watch Demo
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { value: "250M+", label: "Travelers" },
                  { value: "28", label: "States" },
                  { value: "1000+", label: "Destinations" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">{stat.value}</div>
                    <div className="text-white/80 text-sm lg:text-base">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Destination Showcase */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Main showcase card */}
                <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <ImageWithFallback
                    src={destinations[activeDestination].image}
                    alt={destinations[activeDestination].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Destination info overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">
                      {destinations[activeDestination].name}
                    </h3>
                    <p className="text-white/90 text-lg mb-4 drop-shadow">
                      {destinations[activeDestination].description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <button className="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30 font-medium px-3 py-1.5 rounded-md text-sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Explore
                      </button>
                      <button className="inline-flex items-center justify-center border border-white/50 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm font-medium px-3 py-1.5 rounded-md text-sm bg-transparent">
                        <Heart className="w-4 h-4 mr-2" />
                        Save
                      </button>
                    </div>
                  </div>

                  {/* Interactive elements */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-green-500/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Destination thumbnails */}
                <div className="flex space-x-3 mt-6 justify-center">
                  {destinations.map((dest, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveDestination(index)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                        index === activeDestination 
                          ? 'ring-4 ring-white/50 scale-110' 
                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <ImageWithFallback
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Pattern Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500"></div>
      </section>

      {/* Features Section - Indian Cultural Style */}
      <section id="features" className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 translate-x-20 translate-y-20"></div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-orange-200 to-red-200 rounded-full text-orange-800 font-medium mb-4">
              Revolutionary Features
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent mb-6">
              Experience India Like Never Before
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Discover the magic of India with cutting-edge technology, safety, and personalized experiences at your fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Digital Yatra Identity",
                desc: "Seamless, blockchain-secured digital identity for instant verification at temples, monuments, and experiences across India.",
                color: "from-blue-500 to-teal-500",
                bgPattern: "🕉️"
              },
              {
                icon: Star,
                title: "AI Temple & Heritage Guide",
                desc: "Personalized recommendations for sacred sites, cultural festivals, and hidden gems based on your spiritual and cultural interests.",
                color: "from-orange-500 to-red-500",
                bgPattern: "🏛️"
              },
              {
                icon: AlertTriangle,
                title: "Pilgrim Safety Network",
                desc: "Real-time safety updates for festivals, crowd management alerts, and emergency assistance during your spiritual journey.",
                color: "from-red-500 to-pink-500",
                bgPattern: "🛡️"
              },
              {
                icon: BarChart3,
                title: "Heritage Business Hub",
                desc: "Empower local artisans, hotels, and cultural centers with digital tools to showcase authentic Indian experiences.",
                color: "from-purple-500 to-indigo-500",
                bgPattern: "🏪"
              },
              {
                icon: Wallet,
                title: "Cultural Rewards Wallet",
                desc: "Earn karma points for cultural activities, support local communities, and unlock exclusive heritage experiences.",
                color: "from-green-500 to-emerald-500",
                bgPattern: "💰"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="group p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg bg-white rounded-3xl relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute top-4 right-4 text-6xl opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  {feature.bgPattern}
                </div>
                
                <CardContent className="p-0 relative">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.desc}
                  </p>
                  
                  {/* Decorative Border */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full`}></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cultural Call-to-Action */}
          <div className="text-center mt-16">
            <button 
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-xl font-bold px-12 py-6 rounded-2xl transform transition-all duration-300 hover:scale-105 shadow-xl"
              onClick={() => setCurrentView('app')}
            >
              <Navigation className="w-6 h-6 mr-3" />
              Explore All Features
              <Sparkles className="w-6 h-6 ml-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Cultural Experiences & Testimonials */}
      <section id="experiences" className="py-20 bg-white relative overflow-hidden">
        {/* Cultural Festival Background */}
        <div className="absolute inset-0 opacity-5">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1648402197949-fdefa634aa87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGN1bHR1cmFsJTIwZmVzdGl2YWwlMjBjb2xvcnN8ZW58MXx8fHwxNzU3MzExNzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Indian Cultural Festival"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Traveler Stories */}
            <div className="space-y-8">
              <div>
                <div className="inline-block px-6 py-2 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full text-orange-800 font-medium mb-4">
                  Traveler Stories
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                  Incredible Journeys, Real Stories
                </h2>
              </div>
              
              {[
                {
                  avatar: "🧘‍♀️",
                  text: "TourismOS made my spiritual journey through Varanasi absolutely magical. The AI guide knew exactly which ghats to visit and when.",
                  name: "Priya Sharma",
                  role: "Spiritual Seeker • Mumbai",
                  rating: 5
                },
                {
                  avatar: "🏛️",
                  text: "From Rajasthan's palaces to Kerala's backwaters, the safety features and cultural insights transformed our heritage tour completely.",
                  name: "James Wilson",
                  role: "Heritage Enthusiast • London",
                  rating: 5
                },
                {
                  avatar: "🎭",
                  text: "The festival calendar and crowd management alerts helped us experience Diwali in Delhi safely with our entire family.",
                  name: "Anita Patel",
                  role: "Cultural Explorer • Toronto",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="relative p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div className="flex-1">
                      <p className="text-gray-700 text-lg mb-4 leading-relaxed italic">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <p className="font-bold text-gray-800 text-lg">{testimonial.name}</p>
                        <p className="text-orange-600 font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full"></div>
                  <div className="absolute top-6 right-6 w-1 h-1 bg-red-400 rounded-full"></div>
                </div>
              ))}
            </div>

            {/* India by Numbers */}
            <div className="space-y-8">
              <div>
                <div className="inline-block px-6 py-2 bg-gradient-to-r from-green-200 to-teal-200 rounded-full text-green-800 font-medium mb-4">
                  India by Numbers
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                  A Nation of Endless Possibilities
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "250M+", label: "Annual Visitors", icon: Users, color: "from-blue-500 to-teal-500" },
                  { value: "28", label: "States & 8 UTs", icon: MapPin, color: "from-orange-500 to-red-500" },
                  { value: "40+", label: "UNESCO Sites", icon: Award, color: "from-purple-500 to-pink-500" },
                  { value: "1000+", label: "Languages", icon: Globe, color: "from-green-500 to-emerald-500" },
                  { value: "300+", label: "Festivals/Year", icon: Sparkles, color: "from-yellow-500 to-orange-500" },
                  { value: "5000+", label: "Years of History", icon: Star, color: "from-indigo-500 to-purple-500" }
                ].map((stat, index) => (
                  <div key={index} className="relative group">
                    <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                  </div>
                ))}
              </div>

              {/* Cultural Quote */}
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 text-8xl opacity-10">🕉️</div>
                <blockquote className="text-xl font-medium mb-4 relative">
                  "भारत की यात्रा केवल एक गंतव्य नहीं, यह एक अनुभव है।"
                </blockquote>
                <p className="text-orange-100 italic">
                  "A journey to India is not just a destination, it's an experience."
                </p>
                <div className="mt-4 text-orange-200 font-medium">
                  — Ancient Indian Wisdom
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Journey Steps */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20"></div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full text-purple-800 font-medium mb-4">
              Your Digital Yatra
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-6">
              From Dream to Destination
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Experience the seamless fusion of ancient Indian wisdom and cutting-edge technology for your perfect journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: "🪪", 
                title: "Digital Verification", 
                desc: "Create your Digital Yatra ID instantly. Seamless entry to temples, monuments, and cultural sites.",
                color: "from-blue-500 to-cyan-500",
                step: "01"
              },
              { 
                icon: "🧭", 
                title: "AI Cultural Guide", 
                desc: "Discover hidden gems, sacred sites, and local experiences tailored to your spiritual and cultural interests.",
                color: "from-orange-500 to-red-500",
                step: "02"
              },
              { 
                icon: "🛡️", 
                title: "Sacred Safety", 
                desc: "Travel with confidence using real-time safety updates, crowd management, and emergency assistance.",
                color: "from-green-500 to-emerald-500",
                step: "03"
              },
              { 
                icon: "🏆", 
                title: "Karmic Rewards", 
                desc: "Earn cultural karma points, support local communities, and unlock exclusive heritage experiences.",
                color: "from-purple-500 to-pink-500",
                step: "04"
              }
            ].map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10">
                  <span className="text-lg font-bold text-gray-600">{step.step}</span>
                </div>

                <div className="text-center bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-4 border border-gray-100 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center text-5xl mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 relative`}>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {step.desc}
                  </p>
                </div>

                {/* Connecting Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 z-0"></div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <button 
              className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-bold px-12 py-6 rounded-2xl transform transition-all duration-300 hover:scale-105 shadow-xl"
              onClick={() => setCurrentView('app')}
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Begin Your Digital Yatra
              <ArrowRight className="w-6 h-6 ml-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Grand CTA Section - Incredible India Style */}
      <section className="py-20 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-20 h-20 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Traditional Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 3px, transparent 3px),
                               radial-gradient(circle at 75% 75%, white 3px, transparent 3px)`,
              backgroundSize: '80px 80px'
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl mb-6">🕉️</div>
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              Ready for Your
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Incredible Journey?
              </span>
            </h2>
            <p className="text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-lg">
              Join millions of travelers discovering the magic of India with TourismOS - 
              where ancient wisdom meets modern technology.
            </p>
            <p className="text-xl text-orange-200 mb-12 italic">
              "आतिथ्य देवो भव:" - The guest is God
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                className="inline-flex items-center justify-center bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-600 text-2xl font-bold px-12 py-8 rounded-3xl transform transition-all duration-300 hover:scale-105 shadow-2xl"
                onClick={() => setCurrentView('app')}
              >
                <Heart className="w-8 h-8 mr-3 text-red-500" />
                Start Your Incredible Journey
                <ArrowRight className="w-8 h-8 ml-3" />
              </button>
              <button 
                className="inline-flex items-center justify-center border-3 border-white text-white hover:bg-white hover:text-orange-600 text-2xl font-bold px-12 py-8 rounded-3xl transition-all duration-300 backdrop-blur-sm hover:shadow-2xl bg-transparent"
                onClick={() => setCurrentView('app')}
              >
                <PlayCircle className="w-8 h-8 mr-3" />
                Watch Magic Unfold
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-white/80">
              <div className="text-center">
                <div className="text-3xl font-bold">4.9★</div>
                <div className="text-sm">User Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1M+</div>
                <div className="text-sm">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm">Secure</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Indian Heritage Style */}
      <footer className="bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 text-white relative overflow-hidden">
        {/* Decorative Top Border */}
        <div className="h-2 bg-gradient-to-r from-orange-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500"></div>
        
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur opacity-30"></div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">TourismOS</div>
                    <div className="text-orange-300 text-lg">Incredible India, Digitally Enhanced</div>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Bridging the gap between India's timeless heritage and modern technology. 
                  Experience the incredible diversity, safety, and spirituality of India like never before.
                </p>
                <div className="flex space-x-4">
                  {['🇮🇳', '🕉️', '🏛️', '🎭', '🛡️'].map((emoji, index) => (
                    <div key={index} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-orange-300">Explore India</h4>
                <div className="space-y-3">
                  {[
                    { name: "Sacred Sites", href: "#" },
                    { name: "Heritage Tours", href: "#" },
                    { name: "Cultural Festivals", href: "#" },
                    { name: "Adventure Experiences", href: "#" },
                    { name: "Wellness Retreats", href: "#" }
                  ].map((link, index) => (
                    <a key={index} href={link.href} className="block text-gray-300 hover:text-orange-300 transition-colors duration-300">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-orange-300">Support</h4>
                <div className="space-y-3">
                  {[
                    { name: "Help Center", href: "#" },
                    { name: "Safety Guidelines", href: "#" },
                    { name: "Cultural Etiquette", href: "#" },
                    { name: "Emergency Support", href: "#" },
                    { name: "Community Forum", href: "#" }
                  ].map((link, index) => (
                    <a key={index} href={link.href} className="block text-gray-300 hover:text-orange-300 transition-colors duration-300">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-white/20 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-400">
                    TourismOS © 2025 | Empowering Incredible India's Digital Tourism Revolution
                  </p>
                </div>
                <div className="flex items-center space-x-6 text-gray-400">
                  <a href="#" className="hover:text-orange-300 transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-orange-300 transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-orange-300 transition-colors" onClick={() => setCurrentView('app')}>Demo</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}