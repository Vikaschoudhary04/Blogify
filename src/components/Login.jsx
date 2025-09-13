import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import image from "../assets/image.png";
import { easeIn, easeOut, motion } from "motion/react";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[border-l-black] mt-20">
      
      <motion.div
      initial={{y:-300, opacity:0}}
      animate={{y:-100, opacity:1}}
      transition={{duration:1, delay:0.3}}
      
      className="hidden md:flex w-1/2 items-center justify-center p-6 mt-25">
        <motion.img
        initial={{ x: 0 }}
        whileHover={{x:100, opacity:0.8, transition:{
          duration:0.6,
          ease:easeOut
          
        }}}
        animate={{ x: 0, transition: { duration: 0.5, ease: "easeOut" } }}
        
          src={image}
          alt="Login Illustration"
          className="max-h-[80vh] w-auto object-contain rounded-lg"
        />
      </motion.div>

      <motion.div
      initial={{x:400, opacity:0}}
      animate={{x:1, opacity:1}}
      transition={{duration:1, delay:0.2}}
      whileHover={{scale:0.95, y:-50, transition:{
        duration:0.4
        
      }}}
      className="flex w-full md:w-1/2 justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mt-5 shadow-lg rounded-xl p-6 sm:p-8 bg-white/10 backdrop-blur-md">
          <div className="flex justify-center mb-4">
            <span className="inline-block w-20 sm:w-24">
              <Logo />
            </span>
          </div>
          <motion.h2
          initial={{y:-30, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{duration:0.6, delay:0.7}}
          className="text-center text-2xl sm:text-3xl font-bold text-white">
            Welcome back!
          </motion.h2>
          <p className="mt-2 text-center text-sm sm:text-base text-white">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-white hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
          {error && (
            <p className="mt-3 text-center text-red-600 text-sm">{error}</p>
          )}
          <form onSubmit={handleSubmit(login)} className="mt-6">
            <div className="space-y-5">
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
