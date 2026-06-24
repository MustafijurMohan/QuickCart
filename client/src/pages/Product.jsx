import { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router'
import { ShopContext } from '../context/ShopContext'
import { FaStar, FaStarHalf} from "react-icons/fa";
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';
import axios from 'axios';
import Reveal from '../animation/Reveal';

const Product = () => {

  const {productId} = useParams()
  const {products, url, token, currency, cartItems, setCartItems} = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  // fetch the products id
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item['image'][0])
        return null
      }
    })
  }

  
      // Add to Cart Implement
    const addToCart = async (itemId, size) => {
        try {
            if(!size) {
                toast.error('Product size requried!')
                return null
            }
            if(!token) {
                toast.error('Unauthorized User Login Please!')
                return null
            }
            let cartData = structuredClone(cartItems)
        
              if (cartData[itemId]) {
                  if (cartData[itemId][size]) {
                      cartData[itemId][size] += 1
                  } else {
                      cartData[itemId][size] = 1
                  }
                  
              } else {
                  cartData[itemId] = {}
                  cartData[itemId][size] = 1
              }
              setCartItems(cartData)

            const res = await axios.post(url + '/add-cart', {itemId, size}, {headers: {token}})
            if(res.data.success) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])
  
  return productData ? (
    <>
      <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* Product Data */}
        <div className='flex flex-col gap-12 sm:gap-12 sm:flex-row'>
          {/* Product image */}
          <Reveal>
          <div className='flex flex-1 flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item, i) => (
                  <img onClick={() => setImage(item)} src={item} key={i} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                ))
              }
            </div>
            <div className='w-full sm:w-[80%]'>
              <img src={image} className='w-full h-auto ' alt="" />
            </div>
          </div>
          </Reveal>
          {/* Product Info */}

        <Reveal>
          <div className='flex-1'>
            <h1 className='text-2xl font-medium mt-2' >{productData['name']}</h1>
              <div className='flex items-center gap-2 mt-2'>
                <FaStar className='size-3 text-[#ff542e]' />
                <FaStar className='size-3 text-[#ff542e]'/>
                <FaStar className='size-3 text-[#ff542e]'/>
                <FaStar className='size-3 text-[#ff542e]'/>
                <FaStarHalf className='size-3 text-[#ff542e]'/>
                <p className='pl-2'>(122)</p>
              </div>
              <p className='text-3xl font-medium mt-5'>{currency}{productData['price']}</p>
              <p className='text-gray-500 mt-5 md:w-4/5'>{productData['description']}</p>
              <div className="flex flex-col gap-4 my-8">
                <p>Select Size</p>
                <div className='flex gap-2'>
                  {
                    productData.sizes.map((item, i) => (
                      <button onClick={() => setSize(item)} key={i} className={`px-3 py-2 bg-gray-100 cursor-pointer border ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
                    ))
                  }
                </div>
              </div>
              <button onClick={() => addToCart(productData['_id'], size)} type="submit" className='px-8 py-3 text-sm bg-black text-white cursor-pointer active:bg-gray-700'>ADD TO CART</button>
              <hr className='mt-8 sm:w-3/4' />
              <div className="flex flex-col gap-1 text-sm text-gray-500 mt-5">
                <p>100% Original product.</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
          </div>
          </Reveal>
        </div>

        {/* Related Product */}
        <RelatedProducts category={productData['category']} subCategory={productData['subCategory']} />
      </div>
    </>
  ) : <div className='opacity-0'></div>
}

export default Product