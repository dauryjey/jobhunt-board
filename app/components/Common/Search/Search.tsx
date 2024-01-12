import { Form } from "@remix-run/react";
import { TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa/index.js";

interface SearchProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Search: React.FC<SearchProps> = ({ handleSubmit, handleChange }: SearchProps) => {
  return (
    <div>
      <Form className="flex justify-center items-center w-full pt-2 sm:w-auto sm:pt-0" method="get" onSubmit={handleSubmit}>
        <TextInput
          id="search"
          type="text"
          icon={FaSearch}
          placeholder="Search"
          className="min-w-[30vw]"
          onChange={handleChange}
        />
      </Form>
    </div>
  );
};
