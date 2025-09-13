import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/conf";
import { Container, PostCard } from "../components";
import { motion } from "motion/react";


function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getAllPost().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="w-full flex flex-col md:flex-row gap-6 mt-25">
          <div className="flex-1 mt-[30px]">
            <motion.h1
            initial={{y:-30, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{
              duration:0.6
            }}
            className="text-4xl font-bold mb-4 text-white font-mono">
              Best Blog Platforms: <span>Find Your Choice in 15 Minutes</span>
            </motion.h1>
            <motion.p
            initial={{y:30, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{
              duration:0.6,
              delay:0.5
              
            }}
            className="text-white text-lg mb-6 font-[sans-serif]">
              Explore a variety of blogging platforms to share your thoughts,
              ideas, and stories with the world. Whether you are a professional
              writer or just starting, find the perfect platform to showcase
              your content and reach a larger audience in just 15 minutes.
            </motion.p>
          </div>
          <motion.div 
          initial={{y:-50, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{duration:0.7}}
          whileHover={{scale:0.9, transition:{
            duration:0.5
          }}}
          className="flex-1 w-full bg-white p-4 rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://media.istockphoto.com/id/1164102275/photo/laptops-on-the-desk.jpg?s=2048x2048&w=is&k=20&c=em8dpQ-_dHafe5IdgyTiTEVxW1RDmDHUehY-u05cC8c="
              alt="Blogging Platforms"
            />
          </motion.div>
        </div>

        {/* Posts Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="p-2">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-xl font-semibold text-gray-500">
              No posts yet. Login and create the first one 🚀
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
