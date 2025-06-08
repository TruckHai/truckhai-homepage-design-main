
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Logistics Manager",
      company: "ABC Manufacturing",
      quote: "Truck Hai has revolutionized our freight operations. The verification process gives us complete peace of mind.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Transport Coordinator", 
      company: "Green Agro Foods",
      quote: "Real-time tracking and instant booking have made our supply chain incredibly efficient. Highly recommended!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Fleet Owner",
      company: "Patel Transport",
      quote: "As a transporter, Truck Hai has helped me find more loads and grow my business significantly.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5
    }
  ];

  return (
    <section className="py-20 glass-effect">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-sf-pro text-truck-black mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 font-poppins max-w-2xl mx-auto">
            Trusted by thousands of businesses across India
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 rounded-2xl shadow-lg bg-white border-0 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-gray-700 font-poppins mb-6 text-lg leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold font-sf-pro text-truck-black">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 font-poppins">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
