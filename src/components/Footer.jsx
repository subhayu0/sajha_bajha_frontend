import { Music, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  const footerSections = [
    {
      title: "Shop",
      links: [
        "Guitars",
        "Pianos & Keyboards",
        "Drums & Percussion",
        "Wind Instruments",
        "String Instruments",
        "Audio Equipment",
      ],
    },
    {
      title: "Customer Service",
      links: ["Contact Us", "Shipping Info", "Returns & Exchanges", "Size Guide", "FAQ", "Track Your Order"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Blog", "Partnerships", "Affiliate Program"],
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Music className="h-8 w-8 text-purple-400 mr-2" />
              <span className="text-2xl font-bold">SajhaBaja</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your trusted partner in music for over a decade. We provide premium musical instruments and expert
              guidance to help you create beautiful music.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">123 Music Street, Harmony City, MC 12345</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">info@musicstore.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-gray-800 p-2 rounded-md hover:bg-purple-600 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay in Tune</h3>
              <p className="text-gray-400 text-sm">Subscribe to get special offers, new arrivals, and music tips.</p>
            </div>
            <div className="flex max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
              <button className="bg-purple-600 px-6 py-2 rounded-r-md hover:bg-purple-700 transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 MusicStore. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
