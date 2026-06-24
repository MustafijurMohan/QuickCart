
import { useContext, useEffect, useState } from 'react'
import parcel from '../assets/parcel_icon.svg'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ITEMS_PER_PAGE = 10

const Order = () => {
  const { url, token, currency } = useContext(ShopContext)
  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE)
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const fetchAllOrder = async () => {
    if (!token) return null
    try {
      const res = await axios.get(url + '/orders-list', { headers: { token } })
      if (res.data.success) {
        setOrders(res.data.data)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const res = await axios.post(
        url + '/update-status',
        { orderId, status: e.target.value },
        { headers: { token } }
      )
      if (res.data.success) {
        await fetchAllOrder()
        toast.success(res.data.message)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i)
      }
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  useEffect(() => {
    fetchAllOrder()
  }, [token])

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl sm:text-2xl text-gray-700">Admin Order Page</h3>
        {orders.length > 0 && (
          <p className="text-sm text-gray-400">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, orders.length)} of {orders.length} orders
          </p>
        )}
      </div>

      {/* Order List */}
      <div>
        {paginatedOrders.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No orders found.
          </div>
        ) : (
          paginatedOrders.map((order, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            >
              <img src={parcel} className="w-12" alt="" />

              <div>
                <div>
                  {order.items.map((item, i) => (
                    <p className="py-0.5" key={i}>
                      {item['name']} x {item['quantity']} <span>{item['size']}</span>,
                    </p>
                  ))}
                </div>
                <p className="mt-3 mb-2 font-medium">
                  {order['address']['firstName'] + ' ' + order['address']['lastName']}
                </p>
                <div>
                  <p>{order['address']['street'] + ', '}</p>
                  <p>
                    {order['address']['state'] + ', ' +
                      order['address']['city'] + ', ' +
                      order['address']['country'] + ', ' +
                      order['address']['zip']}
                  </p>
                </div>
                <p>{order['address']['phone']}</p>
              </div>

              <div>
                <p className="text-sm sm:text-[15px]">Items: {order['items'].length}</p>
                <p className="mt-3">Method: {order['paymentMethod']}</p>
                <p>Payment: {order['payment'] ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order['date']).toLocaleDateString()}</p>
              </div>

              <p className="text-sm sm:text-[15px]">{currency}{order['amount']}</p>

              <select
                onChange={(e) => statusHandler(e, order['_id'])}
                className="p-2 font-semibold"
                value={order['status']}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Paking">Paking</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-6 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            &#8249;
          </button>

          {getPageNumbers().map((page, i) =>
            page === '...' ? (
              <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm">
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 border rounded text-sm transition ${
                  currentPage === page
                    ? 'bg-black text-white border-black'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  )
}

export default Order