import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import NavbarLogo from "./NavbarLogo";
import CartIcon from "./CartIcon";
import RestItems from "./RestItems";
import MegaMenu from "./MegaMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        <nav
          className=" px-4 py-4 rounded-md shadow-lg flex items-center justify-between flex-wrap lg:flex-row"
          style={{ background: "var(--primary-gradient)" }}
        >
          <NavbarLogo />
          <CartIcon />

          <div className="hidden lg:flex">
            <RestItems />
          </div>

          <div className="flex items-center gap-4">
            <button
              className="font-semibold text-lg hover:text-gray-300"
              onClick={() => setMegaOpen(true)}
            >
              Categories
            </button>

            <button
              className="text-white text-2xl lg:hidden focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {isOpen && (
            <div className="absolute top-16 right-4 bg-gray-900 p-4 rounded-md shadow-lg lg:hidden">
              <RestItems />
            </div>
          )}
        </nav>
      </div>

      {/* Mega menu modal (below navbar) */}
      <MegaMenu isOpen={megaOpen} onClose={() => setMegaOpen(false)} />

      <div className="pt-24" />
    </>
  );
}
