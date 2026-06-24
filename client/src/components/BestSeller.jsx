import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import ProductItem from "./ProductItem"



const BestSeller = () => {
    const {products} = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter(item => item.bestseller)
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])



  return (
    <>
        <div className="my-10">
            <div className="text-center py-8">
                <p className="text-4xl text-gray-600">Best Seller</p>
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
            </div>

            {/* Rendering Products */}
            <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    bestSeller.map((item, i) => (
                        
                        <ProductItem key={i} id={item['_id']} image={item['image']} name={item['name']} price={item['price']} />
                        
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default BestSeller