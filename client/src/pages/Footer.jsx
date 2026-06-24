import { Link } from "react-router"
import logo from '../assets/logo.svg'
import Reveal from "../animation/Reveal"


const Footer = () => {
  return (
    <>
     <footer className=" text-gray-600 py-12 ">
      <Reveal>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand / About */}
        <div>
          {/* <h2 className="text-2xl font-bold mb-4">YourBrand</h2> */}
          <Link to='/'><img src={logo} className='w-36' alt="" /></Link>
          <p className="text-gray-400">
            Stylish, affordable, and quality fashion. Shop the latest trends with us.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-gray-400">
            <li><p>FAQ</p></li>
            <li><p>Returns</p></li>
            <li><p>Shipping</p></li>
            <li><p>Order Tracking</p></li>
          </ul>
        </div>
       
      </div>
      </Reveal>

      {/* Footer Bottom */}
      <Reveal>
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </Reveal>
    </footer>
    </>
  )
}

export default Footer