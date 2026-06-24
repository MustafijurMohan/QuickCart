import { NavLink, Outlet, useNavigate } from 'react-router'
import men from '../assets/banner_mens.png'
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useEffect } from 'react';

const Admin = () => {

  const {admin} = useContext(ShopContext)
  const navigate = useNavigate()

  if(!admin) {
    navigate('/')
  }


  return (
    <>
      <img src={men} alt="banner" className='border-b w-full' />
      <div className="flex bg-gray-50 pb-4">
        <div className='w-[18%] min-h-screen border-r-1'>
          <div className='flex flex-col gap-4 pt-16 pl-[20%] text-gray-600'>
            <NavLink to='/admin/add' className='flex items-center hover:bg-[#ffebf5] gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l'>
              <IoIosAddCircleOutline className='size-6'/>
              <p className='hidden md:block'>Add Items</p>
            </NavLink>
            <NavLink to='/admin/list' className='flex items-center hover:bg-[#ffebf5] gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l'>
              <CiViewList className='size-6'/>
              <p className='hidden md:block'>List</p>
            </NavLink>
            <NavLink to='/admin/order' className='flex items-center hover:bg-[#ffebf5] gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l'>
              <CiViewList className='size-6'/>
              <p className='hidden md:block'>Order</p>
            </NavLink>
          </div>
        </div>
        <div className="flex-1 pl-16 pt-8">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default Admin