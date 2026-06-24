import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Reveal from "../animation/Reveal"


const CartTotal = () => {

    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext)

return (
    <>
    <Reveal>
        <div className="w-full">
            <div className="text-2xl text-gray-600">
                <p>CART TOTAL</p>
            </div>
            <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between">
                    <p>Subtitle</p>
                    <p>{currency}{getCartAmount()}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>{currency}{delivery_fee}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <b>Total</b>
                    <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
                </div>
                <hr />
            </div>
        </div>
        </Reveal>
    </>
  )
}

export default CartTotal