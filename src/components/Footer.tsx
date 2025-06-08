
import { Truck, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string, external = false) => {
    if (external) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-truck-gray py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* SECTION 1: Brand + Social Links */}
          <div>
            <div className="flex items-center mb-4 cursor-pointer" onClick={() => handleNavigation('/')}>
              <img 
                src="/lovable-uploads/0f33fd90-daca-4dae-a603-17b84d56547d.png" 
                alt="Truck Hai Logo" 
                className="h-8 w-auto mr-2"
              />
            </div>
            <p className="text-gray-600 font-poppins mb-4">
              India's most trusted tech-driven freight booking platform.
            </p>
            <div className="flex space-x-4">
              <Facebook 
                className="w-5 h-5 text-gray-400 hover:text-truck-red cursor-pointer transition-colors" 
                onClick={() => handleNavigation('https://facebook.com/TruckHaiOfficial', true)}
              />
              <Twitter 
                className="w-5 h-5 text-gray-400 hover:text-truck-red cursor-pointer transition-colors"
                onClick={() => handleNavigation('https://twitter.com/TruckHaiOfficial', true)}
              />
              <Linkedin 
                className="w-5 h-5 text-gray-400 hover:text-truck-red cursor-pointer transition-colors"
                onClick={() => handleNavigation('https://linkedin.com/company/TruckHai', true)}
              />
              <Instagram 
                className="w-5 h-5 text-gray-400 hover:text-truck-red cursor-pointer transition-colors"
                onClick={() => handleNavigation('https://instagram.com/TruckHai', true)}
              />
            </div>
          </div>
          
          {/* SECTION 2: Services */}
          <div>
            <h3 className="text-lg font-semibold font-sf-pro text-truck-black mb-4">Services</h3>
            <ul className="space-y-2 font-poppins">
              <li>
                <a 
                  onClick={() => handleNavigation('/insurance')} 
                  className="text-gray-600 hover:text-truck-red transition-colors cursor-pointer"
                >
                  Insurance
                </a>
              </li>
              <li>
                <a 
                  onClick={() => handleNavigation('/broker/dashboard')} 
                  className="text-gray-600 hover:text-truck-red transition-colors cursor-pointer"
                >
                  Broker Dashboard
                </a>
              </li>
              <li>
                <a 
                  onClick={() => handleNavigation('/fleet/dashboard')} 
                  className="text-gray-600 hover:text-truck-red transition-colors cursor-pointer"
                >
                  Fleet Dashboard
                </a>
              </li>
              <li>
                <a 
                  onClick={() => handleNavigation('/corporate/dashboard')} 
                  className="text-gray-600 hover:text-truck-red transition-colors cursor-pointer"
                >
                  Corporate Dashboard
                </a>
              </li>
            </ul>
          </div>
          
          {/* SECTION 3: Platform */}
          <div>
            <h3 className="text-lg font-semibold font-sf-pro text-truck-black mb-4">Platform</h3>
            <ul className="space-y-2 font-poppins">
              <li>
                <a 
                  onClick={() => handleNavigation('/post-loads')} 
                  className="text-gray-600 hover:text-truck-red transition-colors cursor-pointer"
                >
                  Post Loads
                </a>
              </li>
              <li>
                <a 
                  onClick={() => handleNavigation('/hire-trucks')} 
                  className="text-gray-600 hover:text-truck-red transition-colors cursor-pointer"
                >
                  Hire Trucks
                </a>
              </li>
              <li>
                <a 
                  onClick={() => handleNavigation('/post-truck')} 
                  className="text-gray-600 hover:text-truck-red transition-colors cursor-pointer"
                >
                  Post Truck
                </a>
              </li>
              <li>
                <a 
                  onClick={() => handleNavigation('/bidding')} 
                  className="text-gray-600 hover:text-truck-red transition-colors cursor-pointer"
                >
                  Live Bidding
                </a>
              </li>
            </ul>
          </div>
          
          {/* SECTION 4: Support */}
          <div>
            <h3 className="text-lg font-semibold font-sf-pro text-truck-black mb-4">Support</h3>
            <ul className="space-y-2 font-poppins">
              <li>
                <span className="text-gray-600">Help Center</span>
              </li>
              <li>
                <span className="text-gray-600">FAQ</span>
              </li>
              <li>
                <span className="text-gray-600">Terms of Service</span>
              </li>
              <li>
                <span className="text-gray-600">Privacy Policy</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* BOTTOM LINE */}
        <div className="border-t border-gray-300 mt-12 pt-8 text-center">
          <p className="text-gray-600 font-poppins">
            © 2025 TruckHai Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
