import { Link } from "@remix-run/react";
import { NavbarBrand } from "flowbite-react";
import { HOME } from "~/const/routes";

export const Brand: React.FC = () => {
  return (
    <NavbarBrand as={Link} to={HOME} prefetch="intent">
      <span className="text-3xl text-blue-600 font-bold ">#</span>
      <span className="font-bold text-xl ml-2">JobHunt.Dev</span>
    </NavbarBrand>
  );
};
