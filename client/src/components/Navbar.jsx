import { Link, NavLink, useNavigate } from 'react-router'
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { IoMdMenu, IoIosArrowForward } from "react-icons/io";
import logo from '../assets/logo.svg'
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

  const {setShowSearch, token, setToken, admin, setAdmin, getCartCount} = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()


  // Logout Function
  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    setToken('')
    setAdmin(false)
  }

  

  return (
    <>
        <nav className='flex justify-between items-center py-8 font-medium sticky top-0 z-20 bg-white shadow-1xl mb-2'>
            <Link to='/'><img src={logo} className='w-36' alt="" /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
              <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
              </NavLink >
              <NavLink to='/shop' className='flex flex-col items-center gap-1'>
                <p>SHOP</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
              </NavLink>
              <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
              </NavLink>
              <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
              </NavLink>
              {
                admin &&
                <NavLink to='/admin' target='black' className='flex flex-col items-center gap-1 px-2 py-1 border border-indigo-500 rounded-full '>
                  <p>Admin Panel</p>
                </NavLink> 
              }
            </ul>


          <div className='flex items-center gap-5'>
            <CiSearch onClick={() => setShowSearch(true)} className='size-6 cursor-pointer' />
            <div className='group relative'>
              <CgProfile onClick={() => token ? null : navigate('/login')} className='size-6 cursor-pointer' />

              {
                token && 
                <div className='hidden group-hover:block absolute dropdown-menu right-0 pt-5 z-10'>
                  <div className='flex flex-col gap-2 py-3 px-5 w-36 bg-slate-100 text-gray-500 rounded'>
                    <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Order</p>
                    <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                  </div>
              </div>
              }

            </div>
            <Link to='/cart' className='relative'>
              <IoCartOutline className='size-6 cursor-pointer' />
              <p className='absolute right-[-4px] bottom-[-1px] w-4 leading-4 bg-black text-white text-center text-[10px] aspect-square rounded-full'>{getCartCount()}</p>
            </Link>
              <IoMdMenu onClick={() => setVisible(true)} className='size-6 cursor-pointer sm:hidden' />
          </div>          
        
          {/* Sidebar menu for small Screen */}
          <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white ${visible ? 'w-full' : 'w-0'} `}>
            <div onClick={() => setVisible(false)} className='flex flex-col text-gray-600 cursor-pointer z-50'>
              <div className='flex items-center gap-4 p-3'>
                <IoIosArrowForward className='size-5 ' />
                <p>Back</p>
              </div>

              <NavLink to='/' className='py-3 pl-6 border'>HOME</NavLink>
              <NavLink to='/shop' className='py-3 pl-6 border'>SHOP</NavLink>
              <NavLink to='/about' className='py-3 pl-6 border'>ABOUT</NavLink>
              <NavLink to='/contact' className='py-3 pl-6 border'>CONTACT</NavLink>
            </div>
          </div>

        </nav>
    </>
  )
}

export default Navbar