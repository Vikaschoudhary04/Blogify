import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, } from "motion/react";
import ThemeToggle from "../Theme/ThemeToggle";



const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <motion.header
    initial={{y: -100, opacity:0.5}}
    animate={{y:0, opacity:1}}
    transition={{duration:0.9,}}
    className=" dark:bg-gray-800 fixed top-0 left-0 w-full z-50 py-2 shadow bg-[#843618] font-[sans-serif]">
      <Container>
        <nav className="flex items-center justify-between">
          
          <Link to="/">
            <Logo />
          </Link>
          

          <ul className="hidden md:flex ml-auto space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <motion.button
                    whileHover={{scale:1.1, y:5}}
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-6 py-2 text-white font-bold duration-200 hover:underline hover:cursor-pointer"
                    >
                      {item.name}
                    </motion.button>
                  </li>
                  
                )
            )}
                            <ThemeToggle/>

            {authStatus && <LogoutBtn />}
          </ul>
          {/* toggle button for mobile view */}
          <div className="md:hidden">
                   <ThemeToggle/>

          </div>


          <div className="md:hidden">
            <button
              onClick={() => setOpen(!isOpen)}
              className="p-2 text-white text-2xl focus:outline-none"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>

        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 150 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6 }}
              className="fixed top-0 left-0 h-screen w-64 bg-[#843618] dark:bg-gray-800 shadow-lg z-50 p-6 flex flex-col space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <Logo />
                <button
                
                  onClick={() => setOpen(false)}
                  className="text-white text-xl"
                >
                  ✕
                </button>
              </div>
              <ul className="flex flex-col space-y-4">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name}>
                        <motion.button
                        whileHover={{scale:1.1, y:10, transition:{
                          duration:0.6
                        }}}
                          onClick={() => {
                            navigate(item.slug);
                            setOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 rounded-lg text-white font-medium hover:bg-white/20"
                        >
                          {item.name}
                        </motion.button>
                      </li>
                    )
                )}

                {authStatus && (
                  <div onClick={() => setOpen(false)}>
                    <LogoutBtn />
                  </div>
                )}
              </ul>
            </motion.aside>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
};

export default Header;
