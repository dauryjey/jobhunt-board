import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { authenticator } from "utils/auth.server";
import { NavigationBar } from "~/components/Common/NavigationBar/NavigationBar";
import { JOBS_DASHBOARD_PAGE1 } from "~/const/routes";

export const meta: MetaFunction = () => {
  return [
    { title: "Authentication" },
    { name: "description", content: "Auth page" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: JOBS_DASHBOARD_PAGE1,
  });

  return user;
};

export default function Authentication() {
  return (
    <>
      <header className="p-4 mb-4">
        <NavigationBar />
      </header>
      <main className="flex flex-col justify-center items-center">
        <Outlet />
      </main>
    </>
  );
}
