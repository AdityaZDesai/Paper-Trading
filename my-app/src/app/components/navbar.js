'use client';

import Link from 'next/link';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  //returning the navbar component,
  return (
    <nav>
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center pt-8 pb-4" >
        {/* Left: Logo and Brand */}
        <div className="flex items-center space-x-2v mb-4 md:mb-0">
          {/* Logo (Replace with actual logo image or SVG) */}
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-xl">A</span> {/* Placeholder for logo */}
          </div>
          {/* Brand name */}
          <span className="text-black font-bold text-lg">MAC</span>
        </div>
        {/* Right: Navigation Links */}
        <div className="flex flex-wrap space-x-4 text-black text-lg font-semibold">
          <Link href="/" className="hover:text-gray-500">
            Dashboard
          </Link>
          <Link href="/buy" className="hover:text-gray-500">
            Buy
          </Link>
        </div>
      </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>


      {/* Mobile menu */}
      
    </nav>
  );
}

export default Navbar;