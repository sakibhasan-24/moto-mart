import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import NavbarLogo from "./NavbarLogo";
import RestItems from "./RestItems";
import CartIcon from "./CartIcon";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [cartCount, setCartCount] = useState(1);

  return (
    <nav
      className="shadow-blue-950 rounded-md bg-gradient-to-r from-black via-gray-900 to-black 
        p-6 shadow-lg mx-2 my-2 flex items-center justify-between lg:flex-row flex-wrap"
    >
      <div>
        <NavbarLogo />
      </div>

      {/* <div className="hidden md:block">
        <SearchBox />
      </div> */}

      <CartIcon />
      <div className="hidden lg:flex">
        <RestItems />
      </div>

      <button
        className="text-white text-2xl lg:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {isOpen && (
        <div className="absolute top-16 right-4 bg-gray-900 p-4 rounded-md shadow-lg lg:hidden">
          <RestItems />
        </div>
      )}
    </nav>
  );
}
