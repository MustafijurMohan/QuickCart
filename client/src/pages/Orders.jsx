import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
  const { url, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const navigate = useNavigate()

  const loadOrderData = async () => {
    try {
      if (!token) return null

      const res = await axios.get(url + '/user-order', { headers: { token } })
      if (res.data.success) {
        const allOrderItems = []
        res.data.orderData.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrderItems.push(item)
          })
        })
        setOrderData(allOrderItems.reverse())
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className="border-t pt-16">
      <div className="text-xl sm:text-2xl text-gray-600 mb-6">
        <p>MY ORDERS</p>
      </div>

      {orderData.length === 0 ? (
        // ---- Empty State ----
        <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
          <div className="text-6xl">🛍️</div>
          <h2 className="text-xl font-medium text-gray-700">No orders yet</h2>
          <p className="text-gray-400 text-sm max-w-xs">
            Looks like you haven't placed any orders yet. Start shopping and find something you love!
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="mt-2 px-8 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition cursor-pointer rounded-sm"
          >
            Go to Shop
          </button>
        </div>
      ) : (
        // ---- Order List ----
        <div>
          {orderData.map((item, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 text-gray-700 border-t border-b"
            >
              <div className="flex items-start gap-6 text-sm">
                <img src={item['image'][0]} className="w-15 sm:w-20" alt="" />
                <div>
                  <p className="sm:text-base font-medium">{item['name']}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>Price: {currency}{item['price']}</p>
                    <p>Quantity: {item['quantity']}</p>
                    <p>Size: {item['size']}</p>
                  </div>
                  <p className="mt-1">
                    Date: <span className="text-gray-400">{new Date(item['date']).toLocaleDateString()}</span>
                  </p>
                  <p className="mt-1">
                    Payment: <span className="text-gray-400">{item['paymentMethod']}</span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex gap-3 items-center">
                  <p className="min-w-2 h-2 bg-green-500 rounded-full"></p>
                  <p className="text-sm sm:text-base">{item['status']}</p>
                </div>
                <button className="px-4 py-2 border rounded-sm font-medium text-sm cursor-pointer">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders