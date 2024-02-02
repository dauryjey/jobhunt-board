import { useNavigate } from "@remix-run/react";
import { IoIosRefresh } from "react-icons/io/index.js";

export const GenericError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center h-screen">
      <section className="flex flex-col justify-center items-center gap-4">
        <h1 className="font-semibold text-2xl text-center">It seems something went wrong. Please try again</h1>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="text-3xl hover:text-blue-600"
        >
          <IoIosRefresh />
        </button>
      </section>
    </main>
  );
};
