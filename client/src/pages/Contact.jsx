import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle,
  Headphones,
  Globe,
  Users,
  ShoppingCart,
  CreditCard
} from 'lucide-react';
import Reveal from '../animation/Reveal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subtitle: "Mon-Fri, 9AM-6PM EST",
      action: "tel:+15551234567"
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Email Us",
      details: "support@yourstore.com",
      subtitle: "We reply within 24 hours",
      action: "mailto:support@yourstore.com"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-purple-600" />,
      title: "Live Chat",
      details: "Available Now",
      subtitle: "Get instant help",
      action: "#"
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-600" />,
      title: "Visit Us",
      details: "123 Commerce Street",
      subtitle: "New York, NY 10001",
      action: "#"
    }
  ];

  const departments = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-blue-500" />,
      title: "Order Support",
      description: "Questions about your orders, shipping, or returns",
      email: "orders@yourstore.com",
      hours: "24/7 Available"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-green-500" />,
      title: "Billing & Payments",
      description: "Payment issues, refunds, and billing inquiries",
      email: "billing@yourstore.com",
      hours: "Mon-Fri, 9AM-6PM"
    },
    {
      icon: <Headphones className="w-8 h-8 text-purple-500" />,
      title: "Technical Support",
      description: "Website issues, account problems, and technical help",
      email: "tech@yourstore.com",
      hours: "Mon-Fri, 8AM-8PM"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "General Inquiries",
      description: "Business partnerships, press, and general questions",
      email: "info@yourstore.com",
      hours: "Mon-Fri, 9AM-5PM"
    }
  ];

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days."
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day return policy for all unused items in original packaging."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping costs vary by location."
    },
    {
      question: "How can I track my order?",
      answer: "You'll receive a tracking number via email once your order ships. You can also track orders in your account."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <Reveal>
      <section className="relative overflow-hidden  text-black">
        <div className="absolute inset-0 bg-gray-100"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              We're Here to Help
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-black">
              Have questions? Need support? Our friendly team is ready to assist you 
              with anything you need, anytime you need it.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Global Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>

      {/* Quick Contact Cards */}
      <Reveal>
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.action}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex sm:flex-col items-start space-x-4">
                <div className="flex-shrink-0 p-3 items-center bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                  <p className="text-gray-800 font-medium">{info.details}</p>
                  <p className="text-sm text-gray-500">{info.subtitle}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </Reveal>

      {/* Main Content */}
      <Reveal>
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name 
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address 
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject 
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="What's this about?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="orders">Order Support</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="technical">Technical Support</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message 
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-black text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Business Hours
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Support</span>
                    <span className="font-medium text-green-600">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                Our Location
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium">YourStore Headquarters</p>
                <p className="text-gray-600">123 Commerce Street</p>
                <p className="text-gray-600">Suite 400</p>
                <p className="text-gray-600">New York, NY 10001</p>
                <p className="text-gray-600">United States</p>
              </div>
              <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
                Get Directions →
              </button>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      {/* Departments Section */}
      <Reveal>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contact the Right Department
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get faster help by reaching out to the department that specializes in your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="mb-4">
                  {dept.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {dept.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {dept.description}
                </p>
                <div className="space-y-2">
                  <a 
                    href={`mailto:${dept.email}`}
                    className="block text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    {dept.email}
                  </a>
                  <p className="text-xs text-gray-500">{dept.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>

      {/* FAQ Section */}
      <Reveal>
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Quick answers to common questions. Can't find what you're looking for? Contact us!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <div className="ml-4 flex-shrink-0">
                    <div className="w-6 h-6 text-gray-400 group-open:rotate-180 transition-transform">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>
      </Reveal>
    </div>
  );
}


export default Contact