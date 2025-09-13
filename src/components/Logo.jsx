import { motion } from 'motion/react';
import logo from '../assets/logo.png';


const Logo = () => {
  return (
    <motion.div 
    whileHover={{scale:1.1, transition:{
      duration:0.4
    }}}
    className='flex items-center'>
      <img 
      className='h-12 w-auto sm:h-14 md:h-16 lg:h-20 xl:h-20 object-contain'
      src={logo} alt="Logo" />
    </motion.div>
  )
}

export default Logo
