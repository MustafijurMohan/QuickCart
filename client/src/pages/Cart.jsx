
import { useContext, useEffect, useState } from "react"
import { FiTrash2 } from "react-icons/fi"
import { ShopContext } from "../context/ShopContext"
import CartTotal from "../components/CartTotal"
import { useNavigate } from 'react-router'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <p>YOUR CART</p>
      </div>

      {cartData.length === 0 ? (
        // ---- Empty State ----
        <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
          <div className="text-6xl">🛒</div>
          <h2 className="text-xl font-medium text-gray-700">Your cart is empty</h2>
          <p className="text-gray-400 text-sm max-w-xs">
            You haven't added anything to your cart yet. Browse our shop and pick something you like!
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="mt-2 px-8 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition cursor-pointer rounded-sm"
          >
            Go to Shop
          </button>
        </div>
      ) : (
        // ---- Cart Items + Checkout ----
        <>
          <div>
            {cartData.map((item, i) => {
              const productData = products.find((product) => product._id === item['_id'])
              return (
                <div
                  key={i}
                  className="border-t border-b py-4 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img className="w-16 sm:w-20" src={productData['image'][0]} alt="" />
                    <div>
                      <p className="text-xs sm:text-lg font-medium">{productData['name']}</p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>{currency}{productData['price']}</p>
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item['size']}</p>
                      </div>
                    </div>
                  </div>
                  <input
                    onChange={(e) =>
                      e.target.value === '' || e.target.value === '0'
                        ? null
                        : updateQuantity(item['_id'], item['size'], Number(e.target.value))
                    }
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                    type="number"
                    min={1}
                    defaultValue={item['quantity']}
                  />
                  <button
                    onClick={() => updateQuantity(item['_id'], item['size'], 0)}
                    className="cursor-pointer"
                  >
                    <FiTrash2 size={26} />
                  </button>
                </div>
              )
            })}
          </div>

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate('/place-order')}
                  className="py-2 px-8 my-8 bg-black text-white cursor-pointer"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart

