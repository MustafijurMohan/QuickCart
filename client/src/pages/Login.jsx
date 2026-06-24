
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router'
import Reveal from "../animation/Reveal"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai" // ✅ import eye icons

const Login = () => {
  const { url, token, setToken, setAdmin } = useContext(ShopContext)
  const [currentState, setCurrentState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false) // ✅ new state
  const navigate = useNavigate()

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setShowPassword(false) // ✅ reset eye toggle on form reset
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (currentState === 'Sign Up') {
        const res = await axios.post(url + '/register', { name, email, password })
        if (res.data.success) {
          toast.success(res.data.message)
          localStorage.setItem('token', res.data.token)
          setToken(res.data.token)
          if (res.data.data.isAdmin) {
            localStorage.setItem('admin', 'true')
            setAdmin(true)
          } else {
            localStorage.removeItem('admin')
            setAdmin(false)
          }
          resetForm()
        } else {
          toast.error(res.data.message)
        }
      } else {
        const res = await axios.post(url + '/login', { email, password })
        if (res.data.success) {
          toast.success(res.data.message)
          localStorage.setItem('token', res.data.token)
          setToken(res.data.token)
          if (res.data.data.isAdmin) {
            localStorage.setItem('admin', 'true')
            setAdmin(true)
          } else {
            localStorage.removeItem('admin')
            setAdmin(false)
          }
          resetForm()
        } else {
          toast.error(res.data.message)
        }
      }
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <>
      <Reveal>
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center gap-4 w-[90%] sm:max-w-96 m-auto mt-14 text-gray-800">
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular text-3xl">{currentState}</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>

          {currentState === 'Login' ? '' : (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-3 py-2 border border-gray-800 outline-none"
              placeholder="Name"
              
            />
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-3 py-2 border border-gray-800 outline-none"
            placeholder="Email"
            
          />

          {/* ✅ Password field with eye toggle */}
          <div className="w-full relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 border border-gray-800 outline-none pr-10"
              placeholder="Password"
          
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              {showPassword
                ? <AiOutlineEyeInvisible size={20} />
                : <AiOutlineEye size={20} />
              }
            </button>
          </div>

          <div className="flex justify-between w-full text-sm mt-[-8px]">
            <p className="cursor-pointer">Forget Password</p>
            {currentState === 'Login' ? (
              <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">Create Account</p>
            ) : (
              <p onClick={() => setCurrentState('Login')} className="cursor-pointer">Login Here</p>
            )}
          </div>

          <button
            className="px-8 py-2 mt-4 bg-black text-white font-light rounded-sm cursor-pointer"
            type="submit"
          >
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </Reveal>
    </>
  )
}

export default Login