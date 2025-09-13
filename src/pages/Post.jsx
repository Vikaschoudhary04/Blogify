import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/conf";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { motion } from "motion/react";


export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10">
      <Container>
        <div className="w-full flex flex-col gap-6 md:flex-row md:gap-8 mb-8 relative rounded-2xl bg-[#843618] shadow-xl overflow-hidden p-4 mt-20 ">
          <motion.div
          initial={{ scale: 1 }}
           whileHover={{scale:0.90}}
           transition={{ duration: 0.4 }}
          className="flex-1 flex justify-center max-w-md  hover:border hover:border-l-black rounded-lg">
            <img
           
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full max-w-3xl h-full object-cover rounded-xl shadow-lg"
            />
          </motion.div>

          <div className="w-full max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 ml-10">
            {post.title}
          </h1>
          <div className="prose prose-lg max-w-none text-white ml-10">
            {parse(post.content)}
          </div>
        </div>

          {isAuthor && (
            <div className="flex gap-3 mt-4 md:absolute md:right-6 md:bottom-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor className="mr-3 hover:bg-green-600 hover:text-white">
                  Edit
                </Button>
              </Link>
              <Button className="bg-red-700 hover:bg-red-800 hover:text-white" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        
      </Container>
    </div>
  ) : null;
}
