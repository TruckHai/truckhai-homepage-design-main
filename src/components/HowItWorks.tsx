
import { FileText, Users, CheckCircle, Clock, MapPin, Shield } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Post a Requirement",
      description: "Share route, cargo type, and dispatch timeline."
    },
    {
      number: "02", 
      icon: Users,
      title: "Broker Bidding",
      description: "Verified brokers bid live in a transparent exchange."
    },
    {
      number: "03",
      icon: CheckCircle,
      title: "Verified Delivery",
      description: "Track with live GPS and receive instant delivery proof."
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Instant Booking",
      description: "Book verified trucks in just a few clicks"
    },
    {
      icon: MapPin,
      title: "Live Tracking", 
      description: "Stay updated with real-time location updates"
    },
    {
      icon: Shield,
      title: "Multi-Level Verification",
      description: "Trucks, routes, and drivers — all verified"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-sf-pro text-truck-black mb-4">
            How TruckHai Makes Freight Effortless
          </h2>
          <p className="text-xl text-gray-600 font-poppins max-w-2xl mx-auto">
            Redesigned to clearly explain TruckHai's 3-step process in a timeline-style layout
          </p>
        </div>
        
        {/* Part A: 3-Step Timeline */}
        <div className="relative max-w-6xl mx-auto mb-20">
          {/* Connection Line */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-0.5 bg-gradient-to-r from-truck-red/20 via-truck-red/40 to-truck-red/20 hidden md:block"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="text-center relative group animate-fade-in"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {/* Step Number Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-truck-red text-white rounded-full flex items-center justify-center text-sm font-bold z-10 shadow-lg">
                  {step.number}
                </div>
                
                {/* Icon Container */}
                <div className="relative mb-6 pt-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <step.icon className="w-12 h-12 text-truck-red" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-semibold font-sf-pro text-truck-black mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-poppins text-lg">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Part B: Supporting Feature Band */}
        <div className="bg-truck-gray/50 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold font-sf-pro text-truck-black mb-2">
              Why TruckHai Is Built for Speed and Trust
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-truck-red" />
                </div>
                <h4 className="text-lg font-semibold font-sf-pro text-truck-black mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 font-poppins">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
