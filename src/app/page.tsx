'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Award, 
  Users, 
  BookOpen, 
  Building2, 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Shield, 
  Zap,
  Globe,
  BarChart3,
  FileText,
  Clock,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Digital Certificates',
      description: 'Issue and manage digital certificates with blockchain verification',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Learner Management',
      description: 'Track learner progress and manage enrollments across courses',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Course Management',
      description: 'Create and manage courses with automated certificate generation',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'Organization Portal',
      description: 'Dedicated portals for organizations to manage their learners',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Analytics & Reports',
      description: 'Comprehensive analytics and reporting for all stakeholders',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with compliance standards',
      color: 'from-red-500 to-red-600'
    }
  ]

  const stats = [
    { label: 'Active Learners', value: '10,000+', icon: <Users className="h-5 w-5" /> },
    { label: 'Courses Available', value: '500+', icon: <BookOpen className="h-5 w-5" /> },
    { label: 'Certificates Issued', value: '50,000+', icon: <Award className="h-5 w-5" /> },
    { label: 'Organizations', value: '200+', icon: <Building2 className="h-5 w-5" /> }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Learning Director',
      company: 'TechCorp Inc',
      content: 'Sharon Decet has revolutionized our certificate management process. The platform is intuitive and our learners love the digital certificates.',
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'HR Manager',
      company: 'Enterprise Solutions',
      content: 'The analytics and reporting features give us incredible insights into our learning programs. Highly recommended!',
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Training Coordinator',
      company: 'StartupCo',
      content: 'Setting up courses and managing learners has never been easier. The platform handles everything seamlessly.',
      avatar: 'ER'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sharon Decet</h1>
                <p className="text-xs text-gray-500">Certificate Management</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                Menu
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2 text-sm">
                <Star className="h-4 w-4 mr-2" />
                Trusted by 200+ Organizations
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Digital Certificate
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Management Made Simple
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your certificate issuance process with our comprehensive platform. 
              Manage learners, courses, and organizations all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signin">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <FileText className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg mx-auto mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Certificates
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to create, 
              manage, and track digital certificates efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of organizations already using Sharon Decet
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations already using Sharon Decet to manage their certificates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600">
              <FileText className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sharon Decet</h3>
                  <p className="text-sm text-gray-400">Certificate Management</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The leading platform for digital certificate management, trusted by organizations worldwide.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Globe className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Sharon Decet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
