import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";



export const ShopContext = createContext()

export const ShopProvider = ({children}) => {

    const currency = '$'
    const delivery_fee = 10
    const url = import.meta.env.VITE_BACKEND_URL
    const [products, setProducts] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const [search, setSearch] = useState('')

    const [token, setToken] = useState('')
    const [admin, setAdmin] = useState(false)

    const [cartItems, setCartItems] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    
    

    // Get All Products
    const getProductsData = async () => {
        try {
            
            const res = await axios.get(url +'/list-products')
            if (res.data.success) {
                setProducts(res.data.products)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } 
    }

    // Get Cart Data
    const getCartData = async (token) => {
        try {
            const res = await axios.get(url + '/get-cart', {headers: {token}})
            if (res.data.success) {
                setCartItems(res.data.cartData)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Cart Data Count
    const getCartCount = () => {
        let totalCount = 0
        for(const items in cartItems) {
            for(const item in cartItems[items]) {
                if(cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item]
                }
            }
        }
        return totalCount
    }

    // Cart Quantity Update
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)
        
        try {
            await axios.post(url + '/update-cart', {itemId, size, quantity}, {headers: {token}})
        } catch (error) {
            toast.error(error.message)
        }
    }

    // get Cart Amount
    const getCartAmount = () => {
        let totalAmount = 0
        
        for(const items in cartItems) {
            let itemInfo = products.find((product) => product['_id'] === items)
                if(itemInfo) {
                    for(const item in cartItems[items]) {
                        if(cartItems[items][item] > 0) {
                            totalAmount += itemInfo.price * cartItems[items][item]
                        }
                    }
                }
        }
        return totalAmount
    }


    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedAdminStatus = localStorage.getItem('admin')

        if (!token && storedToken) {
            setToken(storedToken)
            getCartData(storedToken)
        }
        if(storedAdminStatus === 'true') {
            setAdmin(true)
        } else {
            setAdmin(false)
        }
        
        
    }, [token, setToken])
    



    const value = {
        products, currency, delivery_fee, url, token, setToken, admin, setAdmin,
        showSearch, setShowSearch, search, setSearch, cartItems, setCartItems,
        getCartCount, updateQuantity, getCartAmount,
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}