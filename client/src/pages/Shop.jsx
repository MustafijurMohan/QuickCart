
import { useContext, useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import Reveal from "../animation/Reveal";

const PRODUCTS_PER_PAGE = 12;

const Shop = () => {
  const { products, showSearch, search } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filterProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filterProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
    setCurrentPage(1); // reset to page 1 on filter change
  };

  const sortProducts = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
    setCurrentPage(1); // reset to page 1 on sort change
  };

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        if (currentPage > 3) pages.push("...");
        for (
          let i = Math.max(2, currentPage - 1);
          i <= Math.min(totalPages - 1, currentPage + 1);
          i++
        ) {
          pages.push(i);
        }
        if (currentPage < totalPages - 2) pages.push("...");
        pages.push(totalPages);
      }
      return pages;
    };

    return (
      <div className="flex items-center justify-center gap-1 mt-8 flex-wrap">
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
    );
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, showSearch, search, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        {/* Left side filter */}
        <div className="min-w-60">
          <Reveal>
            <p
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 text-xl my-2 cursor-pointer"
            >
              FILTER
              <IoIosArrowForward
                className={`sm:hidden ${showFilter ? "rotate-90" : ""}`}
              />
            </p>
          </Reveal>

          <Reveal>
            <div
              className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${
                showFilter ? "" : "hidden"
              }`}
            >
              <p className="text-sm mb-3 font-medium">CATEGORIES</p>
              <div className="flex flex-col gap-2 text-sm text-gray-700">
                {["Men", "Women", "Kids"].map((cat) => (
                  <p key={cat} className="flex gap-2">
                    <input
                      className="w-3"
                      value={cat}
                      type="checkbox"
                      onChange={toggleCategory}
                    />
                    {cat}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div
              className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${
                showFilter ? "" : "hidden"
              }`}
            >
              <p className="text-sm mb-3 font-medium">TYPE</p>
              <div className="flex flex-col gap-2 text-sm text-gray-700">
                {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                  <p key={sub} className="flex gap-2">
                    <input
                      className="w-3"
                      value={sub}
                      type="checkbox"
                      onChange={toggleSubCategory}
                    />
                    {sub}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <h1>All Products</h1>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border-2 border-gray-300 text-sm px-3 outline-none"
            >
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {paginatedProducts.map((item, i) => (
              <ProductItem
                key={i}
                id={item["_id"]}
                image={item["image"]}
                name={item["name"]}
                price={item["price"]}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination />

          {/* Product count info */}
          {filterProducts.length > 0 && (
            <p className="text-center text-sm text-gray-400 mt-3">
              Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
              {Math.min(currentPage * PRODUCTS_PER_PAGE, filterProducts.length)}{" "}
              of {filterProducts.length} products
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;