import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/conf";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getAllPost([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    }, [])
    
  return (
    <div className='w-full py-8 my-20'>
        <Container>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts