import { FaReact, FaAngular } from "react-icons/fa/index.js";
import { SiVuedotjs } from "react-icons/si/index.js";
import { MdMoreHoriz } from "react-icons/md/index.js";
import { Button } from "flowbite-react";
import { Link } from "@remix-run/react";

export const Categories: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2 [&>button]:font-semibold [&>button]:border-none">
      <Button color="light" size="lg" className="focus:ring-0" as={Link} to={"/react"} prefetch="intent">
        <FaReact className="text-xl mr-2" />
        React
      </Button>
      <Button color="light" size="lg" className="focus:ring-0" as={Link} to={"/vue"} prefetch="intent">
        <SiVuedotjs className="text-xl mr-2" />
        Vue
      </Button>
      <Button color="light" size="lg" className="focus:ring-0" as={Link} to={"/angular"} prefetch="intent">
        <FaAngular className="text-xl mr-2" />
        Angular
      </Button>
      <Button color="light" size="lg" className="focus:ring-0" as={Link} to={"/jobs"} prefetch="intent">
        <MdMoreHoriz className="text-xl mr-2" />
        Others
      </Button>
    </div>
  );
};
