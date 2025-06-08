import { Package, Truck, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const InsurancePreview = () => {
  const navigate = useNavigate();

  const insuranceCards = [
    {
      icon: Package,
      title: "In-Transit Goods Insurance",
      benefits: [
        "Real-time cargo damage & theft protection",
        "Auto-activated on dispatch", 
        "Instant claim initiation (under 48 hrs)"
      ]
    },
    {
      icon: Truck,
      title: "Vehicle + Driver Insurance",
      benefits: [
        "Full truck protection & third-party cover",
        "Driver accident protection",
        "Roadside & repair add-on options"
      ]
    }
  ];

  const handleCardClick = () => {
    navigate('/insurance');
  };

  const handleLearnMoreClick = (e) => {
    e.stopPropagation();
    navigate('/insurance');
  };

  const handleSettingsClick = (e) => {
    e.stopPropagation();
    navigate('/insurance');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-truck-gray/30 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-sf-pro text-truck-black mb-4">
            Insurance That Moves With You
          </h2>
          <p className="text-xl text-gray-600 font-poppins max-w-3xl mx-auto">
            Instant insurance options for goods in transit and commercial vehicles, 
            all integrated within your booking flow.
          </p>
        </div>

        {/* Single CTA to Unified Hub */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={handleCardClick}
            className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Explore Insurance Hub
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Insurance Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {insuranceCards.map((card, index) => (
            <div 
              key={index}
              onClick={handleCardClick}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 cursor-pointer"
            >
              {/* Icon Header */}
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center mr-4">
                  <card.icon className="w-8 h-8 text-truck-red" />
                </div>
                <h3 className="text-xl font-bold font-sf-pro text-truck-black">
                  {card.title}
                </h3>
              </div>

              {/* Benefits List */}
              <div className="space-y-3 mb-6">
                {card.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-truck-red rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 font-poppins">{benefit}</p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                variant="ghost" 
                onClick={handleLearnMoreClick}
                className="w-full text-truck-red hover:text-truck-red hover:bg-red-50 border border-truck-red/20 hover:border-truck-red/40 group"
              >
                Learn More 
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* Optional Banner CTA */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 text-center shadow-sm max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mr-4">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
            </div>
            <h4 className="text-lg font-semibold font-sf-pro text-truck-black">
              Want auto-coverage for every load?
            </h4>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSettingsClick}
            className="border-truck-red text-truck-red hover:bg-truck-red hover:text-white group"
          >
            Enable Insurance Defaults in Settings
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InsurancePreview;
