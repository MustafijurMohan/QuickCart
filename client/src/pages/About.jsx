import { Heart, Award, Truck, Users, ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import Reveal from "../animation/Reveal";
const About = () => {

    const values = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Customer First",
      description: "We prioritize your satisfaction above all else.",
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      title: "Quality Products",
      description: "We offer carefully curated, top-quality items.",
    },
    {
      icon: <Truck className="w-6 h-6 text-blue-500" />,
      title: "Fast Delivery",
      description: "Quick shipping and easy returns.",
    },
    {
      icon: <Users className="w-6 h-6 text-green-500" />,
      title: "Community Support",
      description: "We empower and support local communities.",
    },
  ];


  return (
    <>
      {/* <div className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-gray-700 text-lg mb-8">
            Welcome to <span className="font-semibold">YourBrand</span>, your go-to
            destination for trendy and high-quality fashion. Our mission is to bring you
            the latest styles at affordable prices while providing exceptional customer service.
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
            <img
              src="/images/about.jpg"
              alt="Our Store"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="text-left">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2021, YourBrand was born from a passion for fashion and
                creativity. We curate collections that reflect the latest trends and timeless
                designs, ensuring there’s something for everyone.
              </p>
              <p className="text-gray-600">
                We believe fashion is a form of self-expression, and our goal is to empower
                individuals to look and feel their best, no matter the occasion.
              </p>
            </div>
          </div>
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4">Why Shop With Us?</h2>
            <ul className="text-gray-700 space-y-2">
              <li>✔️ Affordable and stylish clothing</li>
              <li>✔️ Fast and reliable shipping</li>
              <li>✔️ Excellent customer support</li>
              <li>✔️ Easy returns and secure checkout</li>
            </ul>
          </div>
        </div>
      </div> */}



          <div className="bg-white text-gray-800">
      {/* Hero */}
      <Reveal>
      <section className="text-center py-16 bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="max-w-xl mx-auto text-gray-600">
          We’re more than a store — we help you discover meaningful products that enrich your life.
        </p>
      </section>
    </Reveal>

      {/* Story */}
      <Reveal>
      <section className="py-12 px-4 max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-3">
            Started in 2019, we set out to make great products accessible and enjoyable to find.
          </p>
          <p className="text-gray-600">
            Now, we’re proud to serve a growing community of happy customers worldwide.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop"
          alt="Team working"
          className="w-full rounded-lg shadow"
        />
      </section>
      </Reveal>

      {/* Values */}
      <Reveal>
      <section className="py-12 px-4 bg-gray-50">
        <h2 className="text-center text-2xl font-semibold mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 max-w-6xl mx-auto">
          {values.map((val, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
              <div className="mb-3">{val.icon}</div>
              <h3 className="font-semibold mb-2">{val.title}</h3>
              <p className="text-sm text-gray-600">{val.description}</p>
            </div>
          ))}
        </div>
      </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
      <section className="text-center py-16 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
        <p className="text-gray-600 mb-6">Find products you love with a team you can trust.</p>
        <Link to='/shop' className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
          Start Shopping
        </Link>
      </section>
      </Reveal>
    </div>
    </>
  )
}

export default About