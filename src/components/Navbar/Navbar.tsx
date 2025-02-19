import SearchBox from "../searchbox/SearchBox";
import NavbarLogo from "./NavbarLogo";
import RestItems from "./RestItems";

export default function Navbar() {
  return (
    <div
      className=" shadow-blue-950 flex items-center justify-between
      rounded-md bg-gradient-to-r from-black via-gray-900 to-black 
      p-6 shadow-lg mx-2 my-2"
    >
      {/* 1->Text+logo+text moto🚴mart....bi cycle will come from top and take place */}
      <div>
        <NavbarLogo />
      </div>
      <div>
        <SearchBox />
      </div>
      <div>
        <RestItems />
      </div>
    </div>
  );
}
