import { authenticator } from "utils/auth.server";
import { Button } from "flowbite-react";
import { Form, Link, Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";

import { NavigationBar } from "~/components/Common/NavigationBar/NavigationBar";
import { Search } from "~/components/Common/Search/Search";
import { typedjson, useTypedLoaderData } from "remix-typedjson";

export const meta: MetaFunction = () => {
  return [
    { title: "Job Board for Devs" },
    { name: "description", content: "App for developers to look for work" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);

  return typedjson({ user });
};

export default function Home() {
  const { user } = useTypedLoaderData<typeof loader>();

  return (
    <>
      <header className="border-b p-4">
        <NavigationBar>
          <Search />
          <div className="flex justify-center gap-2 sm:order-last w-full mt-4 md:w-auto md:m-0">
            {user ? (
              <>
                <div className="flex justify-center items-center">
                  <p className="font-medium">{user.fname}</p>
                </div>
                <Form method="post" action="/logout">
                  <Button color="blue" pill type="submit">
                    Log out
                  </Button>
                </Form>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" color="gray" pill>
                  Log In
                </Button>
                <Button as={Link} to="/signup/user" color="blue" pill>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </NavigationBar>
      </header>
      <Outlet />
    </>
  );
}
