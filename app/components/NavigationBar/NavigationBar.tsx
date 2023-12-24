import { Link } from "@remix-run/react";
import { Navbar, NavbarBrand } from "flowbite-react";
import { MainButton } from "../Button/MainButton";
import { Search } from "../Search/Search";

export const NavigationBar: React.FC = () => {
  return (
    <>
      <Navbar fluid rounded>
        <NavbarBrand as={Link} href="#">
          <span className="text-3xl text-sky-700 font-bold ">#</span>
          <span className="font-bold text-xl ml-2">JobHunt.Dev</span>
        </NavbarBrand>
        <div className="sm:order-last">
          <MainButton text={"Sign Up"} />
        </div>
        <Search />
      </Navbar>
    </>
  );
};
