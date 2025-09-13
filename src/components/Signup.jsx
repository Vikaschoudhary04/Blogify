import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Logo, Input } from "./index";
import { login } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import image from "../assets/image.png";
import { easeOut, motion } from "motion/react";


function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#843618] dark:bg-gray-900 my-8">
      <motion.div 
      initial={{y:-300, opacity:0}}
      animate={{y:-100, opacity:1}}
      transition={{duration:1, delay:0.3}}
      className="hidden md:flex md:w-1/2 items-center justify-center p-6">
        <motion.img
        initial={{ x: 0 }}
        whileHover={{x:100, opacity:0.8, transition:{
          duration:0.6,
          ease:easeOut
          
        }}}
        animate={{ x: 0, transition: { duration: 0.5, ease: "easeOut" } }}
          src={image}
          alt="Signup Illustration"
          className="max-h-[80vh] w-auto object-contain rounded-lg"
        />
      </motion.div>
      <motion.div
      initial={{x:500, opacity:0}}
      animate={{x:0, opacity:1}}
      transition={{
        duration:1
      }}
      whileHover={{scale:0.95, transition:{
        duration:0.5
      }}}
      className="flex w-full md:w-1/2 items-center justify-center px-4 sm:px-6 lg:px-8 py-10 mt-5">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl p-6 sm:p-8 border border-white/30">
          <div className="flex justify-center mb-4">
            <span className="inline-block w-20 sm:w-24">
              <Logo />
            </span>
          </div>
          <motion.h2
          initial={{y:-20, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{duration:0.5, delay:1}}
          className="text-center text-2xl sm:text-3xl font-bold text-white">
            Sign up to create account
          </motion.h2>
          <p className="mt-2 text-center text-sm sm:text-base text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline font-medium">
              Login
            </Link>
          </p>
          <p className="text-center text-gray-200 mt-2 text-sm">
            Join our blogging community and start sharing your voice with the world 🌍
          </p>
          {error && (
            <p className="mt-3 text-center text-red-600 text-sm">{error}</p>
          )}
          <form onSubmit={handleSubmit(create)} className="mt-6">
            <div className="space-y-5">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                {...register("name", { required: true })}
              />
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
                {...register("password", { required: true })}
              />
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-400" />
            <span className="px-2 text-sm text-gray-200">or</span>
            <hr className="flex-1 border-gray-400" />
          </div>
          <div>
            <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition hover:cursor-pointer">
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.94 0 6.6 1.7 8.11 3.13l5.92-5.92C34.07 3.42 29.39 1.5 24 1.5 14.92 1.5 7.24 7.44 4.47 15.69l6.92 5.38C12.89 15.28 18.02 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.14 24.5c0-1.59-.14-3.15-.39-4.64H24v8.79h12.4c-.54 2.91-2.12 5.36-4.5 7.02l7.04 5.49c4.12-3.8 6.5-9.39 6.5-15.66z"
                />
              </svg>
              Continue with Google
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-gray-200">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="underline">
              Terms
            </Link>{" "}
            &{" "}
            <Link to="/privacy" className="underline">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
