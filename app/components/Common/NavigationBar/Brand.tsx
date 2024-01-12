import { Link } from "@remix-run/react";
import { NavbarBrand } from "flowbite-react";

export const Brand: React.FC = () => {
  return (
    <NavbarBrand as={Link} href="#">
      <span className="text-3xl text-blue-600 font-bold ">#</span>
      <span className="font-bold text-xl ml-2">JobHunt.Dev</span>
    </NavbarBrand>
  );
};
