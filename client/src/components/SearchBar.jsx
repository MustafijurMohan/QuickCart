import { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { useLocation } from "react-router";
import { ShopContext } from "../context/ShopContext";

const SearchBar = () => {

    const {showSearch, setShowSearch, search, setSearch} = useContext(ShopContext)
    const [visible, setVisible] = useState(false)
    const location = useLocation()



    useEffect(() => {
        if(location.pathname.includes('/shop')) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])
    


  return showSearch && visible ? (
    <>
        <div className="border-t border-b bg-gray-50 text-center">
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 my-5 w-3/4 sm:w-1/2 rounded-full">
                <input onChange={(e) => setSearch(e.target.value)} value={search} className="flex-1 outline-none bg-inherit" type="text" placeholder="Search" />
                <CiSearch className="size-6" />
            </div>
            <RxCross2 onClick={() => setShowSearch(false)} className="size-6 inline cursor-pointer ml-10" />
        </div>
    </>
  ) : null
}

export default SearchBar