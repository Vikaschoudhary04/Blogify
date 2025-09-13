import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className=" dark:bg-gray-800 bg-gradient-to-r from-slate-900 via-gray-900 to-black text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-sm leading-6 text-gray-400">
              Building modern solutions with love, dedication, and creativity.  
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-white transition" to="/">
                  Features
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" to="/">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" to="/">
                  Careers
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" to="/">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-white transition" to="/">
                  Account
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" to="/">
                  Help
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" to="/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" to="/">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
              Legals
            </h3>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-white transition" to="/">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" to="/">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 dark:bg-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Vikas Choudhary. All Rights Reserved.
          </p>

          <div className="flex space-x-4 text-gray-400">
            <a href="#" className="hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
