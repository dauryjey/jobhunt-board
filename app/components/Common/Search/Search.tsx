import { Form } from "@remix-run/react";
import { TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa/index.js";

export const Search: React.FC = () => {
  return (
      <Form className="flex justify-center items-center w-full pt-2 sm:w-auto sm:pt-0" method="get" action="/search" >
        <TextInput
          name="q"
          id="q"
          type="text"
          icon={FaSearch}
          placeholder="Search"
          className="min-w-[30vw] [&>input]:bg-white"
        />
      </Form>
  );
};
