
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, HelpCircle, Phone, Mail, Clock } from "lucide-react";

const SupportSection = () => {
  return (
    <section id="support" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-sf-pro text-truck-black mb-4">
            Need Help or Have Questions?
          </h2>
          <p className="text-xl text-gray-600 font-poppins max-w-2xl mx-auto">
            We're here to help you succeed with comprehensive support options
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Live Chat Card */}
          <Card className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-truck-red/5 to-truck-red/10">
            <CardContent className="p-0 text-center">
              <div className="w-16 h-16 bg-truck-red rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-truck-black mb-4">
                Live Chat 💬
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Talk to support instantly
              </p>
              <Button
                className="bg-truck-red hover:bg-truck-red/90 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Start Chat
              </Button>
            </CardContent>
          </Card>

          {/* Help Center Card */}
          <Card className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-0 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-truck-black mb-4">
                Help Center ❓
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                FAQs, articles, how-to guides
              </p>
              <Button
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold"
              >
                Browse Help
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="p-6 rounded-2xl shadow-md border border-gray-200">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Phone className="w-6 h-6 text-truck-red mb-2" />
                  <p className="font-semibold text-truck-black">📞 +91 99999 99999</p>
                  <p className="text-sm text-gray-600">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Mon–Sat: 10am–7pm
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <Mail className="w-6 h-6 text-truck-red mb-2" />
                  <p className="font-semibold text-truck-black">✉️ support@truckhai.com</p>
                  <p className="text-sm text-gray-600">Response within 2 hours</p>
                </div>
                <div className="flex flex-col items-center">
                  <MessageCircle className="w-6 h-6 text-truck-red mb-2" />
                  <p className="font-semibold text-truck-black">Enterprise Support</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 border-truck-red text-truck-red hover:bg-truck-red hover:text-white"
                  >
                    Book a Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final CTA Banner */}
        <div className="text-center">
          <Card className="p-8 rounded-2xl shadow-lg bg-gradient-to-r from-truck-red to-truck-red/80 text-white max-w-2xl mx-auto">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-4">
                Want to see TruckHai in action?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Schedule a personalized demo and see how we can transform your freight operations
              </p>
              <Button
                className="bg-white text-truck-red hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold"
              >
                📍 Request a Live Demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
