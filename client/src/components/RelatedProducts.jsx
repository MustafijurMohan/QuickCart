import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import ProductItem from "./ProductItem"


const RelatedProducts = ({category, subCategory}) => {

    const {products} = useContext(ShopContext)
    const [related, setRelated] = useState([])


    useEffect(() => {
        if(products.length > 0) {
            let productCopy = products.slice()

            productCopy = productCopy.filter((item) => category === item.category)
            productCopy = productCopy.filter((item) => subCategory === item.subCategory)

            setRelated(productCopy.slice(0, 5))
        }
        
        
    }, [products])
    


  return (
    <>
        <div className="my-10">
            <div className="text-center py-8">
                <p className="text-4xl text-gray-600">Related Products</p>
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    related.map((item, i) => (
                        <ProductItem key={i} id={item['_id']} image={item['image']} name={item['name']} price={item['price']} />
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default RelatedProducts