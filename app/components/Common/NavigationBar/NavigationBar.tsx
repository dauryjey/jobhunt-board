import { Link } from "@remix-run/react";
import { Navbar, NavbarBrand } from "flowbite-react";
import { Search } from "../Search/Search";

interface NavigationBarProps {
  children?: React.ReactNode;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ children }: NavigationBarProps) => {  
  return (
    <>
      <Navbar fluid rounded>
        <NavbarBrand as={Link} href="#">
          <span className="text-3xl text-blue-600 font-bold ">#</span>
          <span className="font-bold text-xl ml-2">JobHunt.Dev</span>
        </NavbarBrand>
        <Search />
        <div className="flex justify-center gap-2 sm:order-last w-full mt-4 md:w-auto md:m-0">
          { children }
        </div>
      </Navbar>
    </>
  );
};
