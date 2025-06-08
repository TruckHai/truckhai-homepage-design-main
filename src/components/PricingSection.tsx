
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star } from "lucide-react";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: "₹0",
      yearlyPrice: "₹0",
      bestFor: "New brokers",
      popular: false,
      features: [
        "Pay-per-load pricing",
        "Standard bids",
        "3 RFQs per day",
        "Basic support",
        "Standard tracking"
      ],
      cta: "Get Started"
    },
    {
      name: "Pro",
      price: "₹999",
      yearlyPrice: "₹9,990",
      bestFor: "Growing teams",
      popular: true,
      features: [
        "Unlimited bids",
        "Analytics dashboard",
        "Early RFQ access",
        "Priority support",
        "Advanced tracking",
        "Custom reports"
      ],
      cta: "Subscribe Now"
    },
    {
      name: "Enterprise",
      price: "Custom",
      yearlyPrice: "Custom",
      bestFor: "High-volume fleets",
      popular: false,
      features: [
        "Dedicated support",
        "API access",
        "White-label bidding tools",
        "Custom integrations",
        "Advanced analytics",
        "SLA guarantee"
      ],
      cta: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-truck-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-sf-pro text-truck-black mb-4">
            Transparent Pricing for Every Freight Need
          </h2>
          
          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center justify-center mt-8 mb-12">
            <span className={`text-lg font-medium ${!isYearly ? 'text-truck-black' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`mx-4 relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                isYearly ? 'bg-truck-red' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium ${isYearly ? 'text-truck-black' : 'text-gray-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="ml-2 text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
                Save 17%
              </span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-2 border-truck-red bg-white' 
                  : 'border border-gray-200 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-truck-red text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-truck-black mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-truck-black mb-2">
                    {isYearly ? plan.yearlyPrice : plan.price}
                    {plan.price !== "Custom" && (
                      <span className="text-lg font-normal text-gray-500">
                        {isYearly ? "/year" : "/month"}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 font-medium">
                    {plan.bestFor}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-truck-red hover:bg-truck-red/90 text-white'
                      : 'border-2 border-truck-red text-truck-red hover:bg-truck-red hover:text-white'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
