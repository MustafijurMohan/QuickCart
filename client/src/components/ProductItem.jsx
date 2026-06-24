import { useContext } from "react"
import { Link } from "react-router"
import { ShopContext } from "../context/ShopContext"
import Reveal from "../animation/Reveal"


const ProductItem = ({id, image, name, price}) => {
  const {currency} = useContext(ShopContext)
  return (
    <>
        <Reveal>
          <Link className="text-gray-700" to={`/product/${id}`}>
            <div className="overflow-hidden">
                <img className="hover:scale-110 transition ease-in-out" src={image[0]} alt="" />
            </div>
            <p className="pt-3 pb-1 text-sm">{name}</p>
            <p className="text-sm font-medium">{currency}{price}</p>
          </Link>
        </Reveal>
    </>
  )
}

export default ProductItem