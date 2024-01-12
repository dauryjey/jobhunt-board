import { Navbar } from "flowbite-react";
import { Brand } from "./Brand";

interface NavigationBarProps {
  children?: React.ReactNode;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ children }: NavigationBarProps) => {  
  return (
    <>
      <Navbar fluid rounded>
        <Brand />
        {children}
      </Navbar>
    </>
  );
};
