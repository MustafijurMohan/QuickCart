import CartTotal from "../components/CartTotal"
import stripe from '../assets/stripe_logo.png'
import paypal from '../assets/paypal.png'
import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { useNavigate } from 'react-router'
import axios from "axios"
import { toast } from "react-toastify"
import Reveal from "../animation/Reveal"


const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const {url, token, delivery_fee, products, cartItems, setCartItems, getCartAmount} = useContext(ShopContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: ''
  })

  const {firstName, lastName, email, street, city, state, zip, country, phone} = formData

  // On Change Handler
  const onChangeHandler = (e) => {
    const {name, value} = e.target
    
    setFormData((prev) => ({
      ...prev, [name]:value
    }))
  }


  // On Submit Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {

      const orderItems = []

      for(const items in cartItems) {
        for(const item in cartItems[items]) {
          if(cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product['_id'] === items))
            if(itemInfo) {
              itemInfo.size = item,
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const res = await axios.post(url + '/cash', orderData, {headers: {token}})
          if (res.data.success) {
            setCartItems({})
            navigate('/orders')
            toast.success(res.data.message)
          } else {
            toast.error(res.data.message)
          } 
          break;

        case 'stripe':
          const resStripe = await axios.post(url + '/stripe', orderData, {headers: {token}})
          if (resStripe.data.success) {
            const {session_url} = resStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(resStripe.data.message)
          }
          break;
      
        default:
          break;
      }



    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className="flex flex-col justify-between sm:flex-row gap-4 pt-5 min-h-[80vh] border-t">
        {/* Left Side */}
        <Reveal>
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl text-gray-600 my-6">
            <p>DELIVERY INFORMATION</p>
          </div>

          <div className="flex gap-3">
            <input onChange={onChangeHandler} name="firstName" value={firstName} type="text" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="First Name" required/>
            <input onChange={onChangeHandler} name="lastName" value={lastName} type="text" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="Last Name" required/>
          </div>
          <input onChange={onChangeHandler} name="email" value={email} type="email" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="Email Address" required />
          <input onChange={onChangeHandler} name="street" value={street} type="text" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="Street" />
          <div className="flex gap-3">
            <input onChange={onChangeHandler} name="city" value={city} type="text" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="City" required/>
            <input onChange={onChangeHandler} name="state" value={state} type="text" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="State" required/>
          </div>
          <div className="flex gap-3">
            <input onChange={onChangeHandler} name="zip" value={zip} type="number" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="Zip" required/>
            <input onChange={onChangeHandler} name="country" value={country} type="text" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="Country" required/>
          </div>
            <input onChange={onChangeHandler} name="phone" value={phone} type="number" className="border border-gray-300 rounded px-3.5 py-1.5 w-full" placeholder="Phone" required/>
        </div>
      </Reveal>
        {/* Right Side */}



        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <Reveal><CartTotal/></Reveal>
          </div>

          {/* Payment Method */}
          <Reveal>
          <div className="mt-12">
            <p className="text-xl sm:text-2xl text-gray-600">PAYMENT METHOD</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 px-3 py-2 border cursor-pointer">
                <p className={`min-h-3.5 w-3.5 rounded-full border ${method === 'stripe'? 'bg-green-400': ''}`}></p>
                <img className="h-5 mx-4" src={stripe} alt="" />
              </div>
              <div onClick={() => setMethod('paypal')} className="flex items-center gap-3 px-3 py-2 border cursor-pointer">
                <p className={`min-h-3.5 w-3.5 rounded-full border ${method === 'paypal'? 'bg-green-400': ''}`}></p>
                <img className="h-5 mx-4" src={paypal} alt="" />
              </div>
              <div onClick={() => setMethod('cod')} className="flex items-center gap-3 px-3 py-2 border cursor-pointer">
                <p className={`min-h-3.5 w-3.5 rounded-full border ${method === 'cod'? 'bg-green-400': ''}`}></p>
                <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              </div>
            </div>

            <div className="text-end w-full mt-8">
              <button type="submit" className="bg-black text-white px-16 py-3 text-sm cursor-pointer">PLACE ORDER</button>
            </div>

          </div>
          </Reveal>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder