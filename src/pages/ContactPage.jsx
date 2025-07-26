"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["123 Music Street", "Harmony City, MC 12345"],
      color: "text-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["Sales: (555) 123-4567", "Support: (555) 123-4568"],
      color: "text-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@musicstore.com", "support@musicstore.com"],
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9:00 AM - 7:00 PM", "Sat-Sun: 10:00 AM - 6:00 PM"],
      color: "text-orange-600",
    },
  ]

  const subjects = [
    "General Inquiry",
    "Product Question",
    "Order Status",
    "Technical Support",
    "Return/Exchange",
    "Bulk Orders",
    "Partnership",
    "Other",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                Whether you're a beginner looking for your first instrument or a professional seeking expert advice, our
                team is here to help you make the right choice.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <info.icon className={`h-8 w-8 ${info.color} mb-3`} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive Map</p>
                  <p className="text-sm text-gray-400">123 Music Street, Harmony City</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Please describe how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-md font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>Response Time:</strong> We typically respond to all inquiries within 24 hours during business
                days. For urgent matters, please call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer instrument rentals?</h3>
                <p className="text-gray-600">
                  Yes, we offer rental programs for most instruments with flexible terms and purchase options.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What's your return policy?</h3>
                <p className="text-gray-600">
                  We offer a 30-day return policy for unused items in original packaging with receipt.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you provide instrument repairs?</h3>
                <p className="text-gray-600">
                  Yes, we have certified technicians who can repair and maintain most musical instruments.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer music lessons?</h3>
                <p className="text-gray-600">
                  We partner with local music teachers and can connect you with qualified instructors.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and offer financing options for larger purchases.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you ship internationally?</h3>
                <p className="text-gray-600">
                  Currently, we ship within the US and Canada. International shipping is available for select items.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
