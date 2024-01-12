import { Navbar } from "flowbite-react";
import { Search } from "../Search/Search";
import { Brand } from "./Brand";

interface NavigationBarProps {
  children?: React.ReactNode;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ children }: NavigationBarProps) => {  
  return (
    <>
      <Navbar fluid rounded>
        <Brand />
        <Search />
        <div className="flex justify-center gap-2 sm:order-last w-full mt-4 md:w-auto md:m-0">
          { children }
        </div>
      </Navbar>
    </>
  );
};
