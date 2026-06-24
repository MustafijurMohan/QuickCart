
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import { FiTrash2 } from "react-icons/fi"
import { toast } from "react-toastify"
import { DeleteList } from "../helper/DeleteAlert"

const ITEMS_PER_PAGE = 10

const List = () => {
  const { url, token, currency } = useContext(ShopContext)
  const [list, setList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE)
  const paginatedList = list.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const fetchList = async () => {
    try {
      const res = await axios.get(url + '/list-products')
      if (res.data.success) {
        setList(res.data.products)
      } else {
        toast(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteProduct = async (productId) => {
    try {
      const res = await axios.delete(url + '/remove-products/' + productId, { headers: { token } })
      if (res.data.success) {
        // If deleting the last item on current page, go back one page
        const remainingItems = list.length - 1
        const newTotalPages = Math.ceil(remainingItems / ITEMS_PER_PAGE)
        if (currentPage > newTotalPages) {
          setCurrentPage((prev) => Math.max(prev - 1, 1))
        }
        fetchList()
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
      if (currentPage > 3) pages.push("...")
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i)
      }
      if (currentPage < totalPages - 2) pages.push("...")
      pages.push(totalPages)
    }
    return pages
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <p className="text-2xl text-gray-600">Admin Product List</p>
        <p className="text-sm text-gray-400">
          {list.length > 0
            ? `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, list.length)} of ${list.length} products`
            : "No products found"}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {/* List Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border bg-gray-100 px-1 py-1 text-gray-600 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Product Rows */}
        {paginatedList.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No products available.
          </div>
        ) : (
          paginatedList.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 border px-1 py-1 text-gray-600 text-sm"
            >
              <img src={item['image'][0]} className="w-12" alt="" />
              <p>{item['name']}</p>
              <p>{item['category']}</p>
              <p>{currency}{item['price']}</p>
              <button
                onClick={() => DeleteList(item['_id'], deleteProduct)}
                className="cursor-pointer"
              >
                <FiTrash2 size={26} />
              </button>
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
            page === "..." ? (
              <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm">
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 border rounded text-sm transition ${
                  currentPage === page
                    ? "bg-black text-white border-black"
                    : "border-gray-300 hover:bg-gray-100"
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

export default List