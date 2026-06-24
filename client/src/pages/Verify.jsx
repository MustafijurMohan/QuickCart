import axios from "axios"
import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { useNavigate, useSearchParams } from "react-router"
import { toast } from "react-toastify"


const Verify = () => {

    const {url, token, setCartItems} = useContext(ShopContext)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')


    const veriryPayment = async () => {
        try {
            if(!token) {
                return null
            }

            const res = await axios.post(url + '/verifyStripe', { success, orderId}, {headers: {token}})
            if (res.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        veriryPayment()
    }, [token])
    


  return (
    <div>Verify</div>
  )
}

export default Verify