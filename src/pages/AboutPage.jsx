import { Music, Users, Award, Heart } from "lucide-react"

const AboutPage = () => {
  const values = [
    {
      icon: Music,
      title: "Passion for Music",
      description: "We're musicians ourselves, passionate about helping others find their perfect instrument.",
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building a community of musicians who support and inspire each other.",
    },
    {
      icon: Award,
      title: "Quality First",
      description: "Only the finest instruments from trusted brands make it to our store.",
    },
    {
      icon: Heart,
      title: "Customer Care",
      description: "Your musical journey matters to us. We're here to support you every step of the way.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Professional violinist with 20+ years of experience",
    },
    {
      name: "Mike Chen",
      role: "Head of Product",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Guitar specialist and former music store owner",
    },
    {
      name: "Emma Williams",
      role: "Customer Experience",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Piano teacher and customer service expert",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About SajhaBaja</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            For over a decade, we've been helping musicians of all levels find their perfect instrument. Our passion for
            music drives everything we do.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  SajhaBaja was born from a simple belief: every musician deserves access to high-quality instruments
                  that inspire creativity and passion. Founded in 2010 by professional musician Sarah Johnson, we
                  started as a small local shop with a big dream.
                </p>
                <p>
                  Today, we've grown into one of the most trusted online musical instrument retailers, serving thousands
                  of musicians worldwide. Our commitment to quality, customer service, and the music community remains
                  at the heart of everything we do.
                </p>
                <p>
                  Whether you're taking your first lesson or performing on the world's biggest stages, we're here to
                  support your musical journey with expert advice, premium instruments, and unmatched service.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Musical instruments"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide our decisions and shape our commitment to the music community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <value.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      {/* Statistics Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-lg">Years in Business</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-lg">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg">Instruments Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
