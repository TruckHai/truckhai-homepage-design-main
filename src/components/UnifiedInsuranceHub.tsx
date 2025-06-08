import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

// Enhanced SVG Icons with better design
const ShieldProtectIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>
);

const TruckDeliveryIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 17h12l-4-4V9a4 4 0 00-8 0v4l-4 4zM2 17h6"/>
    <circle cx="7" cy="19" r="2"/>
    <circle cx="17" cy="19" r="2"/>
  </svg>
);

const PackageSecureIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1v6m6-6v6"/>
  </svg>
);

const TeamUsersIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"/>
  </svg>
);

const DocumentCheckIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
  </svg>
);

const PhoneCallIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);

const EmailIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);

const CheckVerifiedIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);

const ArrowForwardIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
  </svg>
);

const SparkleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.5 2L8.7 5.6 5 6.4l3.7.8L9.5 11l.8-3.2L14 7l-3.7-.8L9.5 2zm6.9 8.5L15.9 12l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5L13.4 14l1.5-.5.5-1.5z"/>
  </svg>
);

type UserSegment = 'broker' | 'fleet' | 'corporate';

interface InsuranceProduct {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: React.ComponentType<any>;
  price?: string;
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
}

const UnifiedInsuranceHub = () => {
  const navigate = useNavigate();
  const [selectedSegment, setSelectedSegment] = useState<UserSegment>('broker');

  const insuranceProducts: Record<UserSegment, InsuranceProduct[]> = {
    broker: [
      {
        id: 'broker-transit',
        title: 'Smart Transit Protection',
        description: 'AI-powered cargo protection with instant claim processing and real-time tracking',
        benefits: [
          'Real-time cargo damage & theft protection',
          'Auto-activated on dispatch',
          'Instant claim initiation (under 48 hrs)'
        ],
        icon: PackageSecureIcon,
        price: 'Starting ₹199',
        ctaText: 'Get Instant Quote',
        ctaLink: '/broker-insurance',
        popular: true
      },
      {
        id: 'broker-liability',
        title: 'Professional Shield',
        description: 'Complete liability coverage for modern brokerage operations',
        benefits: [
          'Errors & omissions coverage',
          '24/7 legal support hotline',
          'Client transaction protection'
        ],
        icon: ShieldProtectIcon,
        price: 'Starting ₹5,000/year',
        ctaText: 'Learn More',
        ctaLink: '/broker-insurance'
      },
      {
        id: 'broker-vehicle',
        title: 'Fleet + Driver Care',
        description: 'Comprehensive vehicle and driver insurance in one package',
        benefits: [
          'Full truck protection & third-party cover',
          'Driver accident & health protection',
          'Emergency roadside assistance'
        ],
        icon: TruckDeliveryIcon,
        price: 'Starting ₹8,500',
        ctaText: 'Get Quote',
        ctaLink: '/broker-insurance'
      }
    ],
    fleet: [
      {
        id: 'fleet-multi',
        title: 'Fleet Power Package',
        description: 'Bulk coverage designed for growing fleets with smart pricing',
        benefits: [
          'Up to 30% discount on bulk policies',
          'Centralized claim management dashboard',
          'Fleet-wide accident coverage'
        ],
        icon: TruckDeliveryIcon,
        price: 'Starting ₹15,000/truck',
        ctaText: 'Get Fleet Quote',
        ctaLink: '/fleet-insurance',
        popular: true
      },
      {
        id: 'fleet-driver',
        title: 'Driver Wellness Plan',
        description: 'Complete health and safety coverage for your drivers',
        benefits: [
          'Medical emergency coverage',
          'Accident compensation fund',
          'Family health benefits included'
        ],
        icon: TeamUsersIcon,
        price: 'Starting ₹2,500/driver',
        ctaText: 'Enroll Drivers',
        ctaLink: '/fleet-insurance'
      },
      {
        id: 'fleet-cargo',
        title: 'Smart Cargo Shield',
        description: 'GPS-integrated cargo protection with predictive analytics',
        benefits: [
          'Real-time cargo monitoring',
          'Route deviation instant alerts',
          'AI-powered damage assessment'
        ],
        icon: PackageSecureIcon,
        price: 'Starting ₹299/trip',
        ctaText: 'Activate Now',
        ctaLink: '/fleet-insurance'
      }
    ],
    corporate: [
      {
        id: 'corporate-bulk',
        title: 'Enterprise Cargo Hub',
        description: 'Enterprise-grade coverage for high-volume corporate shipments',
        benefits: [
          'Volume-based pricing tiers',
          'Multi-route coverage options',
          'Dedicated account manager'
        ],
        icon: PackageSecureIcon,
        price: 'Custom pricing',
        ctaText: 'Request Demo',
        ctaLink: '/corporate-insurance',
        popular: true
      },
      {
        id: 'corporate-compliance',
        title: 'Compliance Guardian',
        description: 'Legal protection suite for corporate logistics contracts',
        benefits: [
          'Contract breach protection',
          'Regulatory compliance coverage',
          'Legal dispute resolution'
        ],
        icon: DocumentCheckIcon,
        price: 'Starting ₹25,000/year',
        ctaText: 'Get Started',
        ctaLink: '/corporate-insurance'
      },
      {
        id: 'corporate-comprehensive',
        title: 'Supply Chain Fortress',
        description: 'Complete supply chain risk management and protection',
        benefits: [
          'End-to-end supply chain coverage',
          'Business interruption protection',
          '24/7 enterprise support center'
        ],
        icon: ShieldProtectIcon,
        price: 'Custom enterprise pricing',
        ctaText: 'Schedule Demo',
        ctaLink: '/corporate-insurance'
      }
    ]
  };

  // ... keep existing code (faqData)
  const faqData: Record<UserSegment, Array<{ question: string; answer: string }>> = {
    broker: [
      {
        question: 'How quickly can I get insurance coverage?',
        answer: 'Coverage can be activated instantly for verified brokers. For new registrations, approval takes 2-4 hours.'
      },
      {
        question: 'What documents do I need for claims?',
        answer: 'You need the delivery receipt, invoice, photos of damage (if any), and the incident report filed through our app.'
      },
      {
        question: 'Can I get coverage for international shipments?',
        answer: 'Yes, we provide coverage for cross-border shipments to neighboring countries with additional documentation.'
      }
    ],
    fleet: [
      {
        question: 'Do you offer discounts for large fleets?',
        answer: 'Yes, we offer tiered discounts starting from 10% for 5+ vehicles, up to 30% for fleets with 50+ vehicles.'
      },
      {
        question: 'Is driver training covered in the insurance?',
        answer: 'Safety training is included in our premium plans, with certified courses for defensive driving and cargo handling.'
      },
      {
        question: 'What happens if a driver leaves my company?',
        answer: 'You can easily transfer or cancel individual driver policies through your fleet management dashboard.'
      }
    ],
    corporate: [
      {
        question: 'Can you integrate with our ERP system?',
        answer: 'Yes, we provide API integration with major ERP systems including SAP, Oracle, and custom enterprise solutions.'
      },
      {
        question: 'What compliance standards do you meet?',
        answer: 'We are ISO 27001 certified and comply with all Indian logistics insurance regulations and international standards.'
      },
      {
        question: 'Do you provide dedicated support for enterprises?',
        answer: 'Enterprise clients get a dedicated account manager, 24/7 support, and priority claim processing.'
      }
    ]
  };

  const segmentLabels = {
    broker: { icon: '🚛', label: 'Freight Broker', color: 'bg-blue-500' },
    fleet: { icon: '🚚', label: 'Fleet Owner', color: 'bg-green-500' },
    corporate: { icon: '🏢', label: 'Enterprise', color: 'bg-purple-500' }
  };

  const handleProductCTA = (product: InsuranceProduct) => {
    navigate(product.ctaLink);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="pt-16">
        {/* Enhanced Header */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
            <div className="text-center mb-8 lg:mb-16">
              <div className="flex items-center justify-center mb-6">
                <SparkleIcon className="w-8 h-8 text-red-500 mr-3" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent">
                  TruckHai Insurance Hub
                </h1>
                <SparkleIcon className="w-8 h-8 text-red-500 ml-3" />
              </div>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
                Smart insurance solutions powered by technology for modern logistics
              </p>
              <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckVerifiedIcon className="w-4 h-4 text-green-500 mr-2" />
                  <span>Instant Activation</span>
                </div>
                <div className="flex items-center">
                  <CheckVerifiedIcon className="w-4 h-4 text-green-500 mr-2" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center">
                  <CheckVerifiedIcon className="w-4 h-4 text-green-500 mr-2" />
                  <span>Smart Claims</span>
                </div>
              </div>
            </div>

            {/* Enhanced Segmented Toggle */}
            <div className="flex justify-center px-4">
              <div className="bg-gray-100 rounded-2xl p-2 flex w-full max-w-2xl shadow-inner">
                {(Object.keys(segmentLabels) as UserSegment[]).map((segment) => (
                  <button
                    key={segment}
                    onClick={() => setSelectedSegment(segment)}
                    className={`flex-1 px-6 sm:px-8 py-4 lg:py-5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                      selectedSegment === segment
                        ? `${segmentLabels[segment].color} text-white shadow-lg transform scale-105`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <span className="mr-2 text-lg">{segmentLabels[segment].icon}</span>
                    <span className="hidden sm:inline">{segmentLabels[segment].label}</span>
                    <span className="sm:hidden">{segmentLabels[segment].label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Product Cards Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16 lg:mb-20">
            {insuranceProducts[selectedSegment].map((product, index) => {
              const Icon = product.icon;
              return (
                <Card 
                  key={product.id} 
                  className={`bg-white hover:shadow-2xl transition-all duration-500 border-0 shadow-lg transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden ${
                    selectedSegment === 'broker' ? 'animate-fade-in' : ''
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {product.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl">
                      <SparkleIcon className="w-3 h-3 inline mr-1" />
                      POPULAR
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-6 px-6 sm:px-8 pt-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl mb-3 font-bold leading-tight text-gray-900">{product.title}</CardTitle>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{product.description}</p>
                    {product.price && (
                      <div className="mt-4">
                        <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 text-sm sm:text-base font-semibold border-0">
                          {product.price}
                        </Badge>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-6 px-6 sm:px-8 pb-8">
                    <ul className="space-y-4">
                      {product.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start space-x-3">
                          <CheckVerifiedIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={() => handleProductCTA(product)}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white group py-4 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {product.ctaText}
                      <ArrowForwardIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Enhanced Quick Quote Section */}
          <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-0 shadow-xl mb-12 sm:mb-16 lg:mb-20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            <CardContent className="p-8 sm:p-12 lg:p-16 text-center">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
                  ⚡ Instant Route Quotes
                </h3>
                <p className="text-blue-700 mb-8 text-lg sm:text-xl leading-relaxed">
                  Get AI-powered insurance quotes for popular routes in seconds
                </p>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">FROM</p>
                      <p className="font-bold text-gray-900 text-lg">🏙️ Delhi</p>
                    </div>
                    <div className="flex-1 relative mx-4">
                      <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2">
                        <TruckDeliveryIcon className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">TO</p>
                      <p className="font-bold text-gray-900 text-lg">🌊 Mumbai</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <p className="text-green-800 font-semibold text-xl sm:text-2xl">Starting at ₹119 only</p>
                    <p className="text-green-600 text-sm mt-1">Instant activation • Zero paperwork</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced FAQ Section */}
          <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="pb-8 px-6 sm:px-8 lg:px-12 bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="text-3xl sm:text-4xl text-center font-bold leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                💡 Frequently Asked Questions
              </CardTitle>
              <p className="text-center text-gray-600 mt-4 text-lg">
                Everything you need to know about {segmentLabels[selectedSegment].label} insurance
              </p>
            </CardHeader>
            <CardContent className="px-6 sm:px-8 lg:px-12 pb-8">
              <Accordion type="single" collapsible className="w-full">
                {faqData[selectedSegment].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 last:border-b-0">
                    <AccordionTrigger className="text-left py-6 hover:no-underline group">
                      <span className="font-semibold text-gray-900 text-base sm:text-lg leading-tight pr-4 group-hover:text-red-600 transition-colors">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-6 leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Enhanced Contact Support */}
          <div className="text-center mt-12 sm:mt-16 lg:mt-20 px-4">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                🤝 Need Expert Guidance?
              </h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Our insurance specialists are here to help you choose the perfect protection plan
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
                <Button 
                  variant="outline" 
                  className="border-2 border-red-500 text-red-600 hover:bg-red-50 hover:border-red-600 px-8 py-4 min-h-[56px] font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <PhoneCallIcon className="w-5 h-5 mr-3" />
                  Schedule Callback
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-600 px-8 py-4 min-h-[56px] font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <EmailIcon className="w-5 h-5 mr-3" />
                  Email Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UnifiedInsuranceHub;
