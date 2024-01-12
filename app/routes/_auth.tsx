import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Navbar } from "flowbite-react";
import { authenticator } from "utils/auth.server";
import { Brand } from "~/components/Common/NavigationBar/Brand";

export const meta: MetaFunction = () => {
  return [
    { title: "Authentication" },
    { name: "description", content: "Auth page" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  return user;
};

export default function Authentication() {
  return (
    <>
      <header>
        <Navbar fluid rounded>
          <Brand />
        </Navbar>
      </header>
      <main className="flex flex-col justify-center items-center mt-4">
        <Outlet />
      </main>
    </>
  );
}
