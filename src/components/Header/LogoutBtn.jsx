import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { motion } from 'motion/react'



const LogoutBtn = () => {
    const dispatch = useDispatch();

    const logouthandler = ()=>{
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <motion.button
    whileHover={{scale:1.1, transition:{
      duration:0.5
    }}}
    whileTap={{scale:0.95, x:400, transition:{
      duration:1,
      delay:1
    }}}
    onClick={logouthandler} 
    className='text-white hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 hover:cursor-pointer'>
        Logout
    </motion.button>
  )
}

export default LogoutBtn
