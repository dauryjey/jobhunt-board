import { TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa/index.js";

export const Search: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full pt-2 sm:w-auto sm:pt-0">
      <TextInput
        id="search"
        type="text"
        icon={FaSearch}
        placeholder="Search"
        className="min-w-[30vw]"
      />
    </div>
  );
};
