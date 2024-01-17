import { Employer, User } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { authenticator } from "utils/auth.server";
import { NavButtons } from "~/components/Common/NavigationBar/NavButtons";
import { NavigationBar } from "~/components/Common/NavigationBar/NavigationBar";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user: User | Employer | null = await authenticator.isAuthenticated(
    request
  );

  if (user?.role === "employer") {
    return typedjson({ user });
  }

  return redirect("/jobs");
};

export default function EmployerIndex() {
  const { user } = useTypedLoaderData<typeof loader>();

  return (
    <>
      <header className="p-4 mb-4">
        <NavigationBar>
          <NavButtons user={user} />
        </NavigationBar>
      </header>
      <Outlet />
    </>
  );
}
