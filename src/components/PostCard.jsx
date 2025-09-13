import React from 'react'
import appwriteService from '../appwrite/conf'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'




function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <motion.div
        whileHover={{scale:0.9, transition:{
          duration:0.6,
          delay:0.1
        }}}
        className='w-full bg-[#914A30] dark:bg-gray-700 rounded-xl p-2'>
            <div className=' mb-2 rounded-lg overflow-hidden aspect-[16/18]  hover:border hover:border-l-black'>
               <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
               className='w-full h-full object-contain rounded-2xl shadow-md'/>
            </div>
             <h2 className='text-xl text-white font-bold text-center'>{title}</h2>
        </motion.div>

    </Link>
  )
}

export default PostCard
