import { authenticator } from "utils/auth.server";
import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { NavigationBar } from "~/components/Common/NavigationBar/NavigationBar";
import { Search } from "~/components/Common/Search/Search";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { Employer, User } from "@prisma/client";
import { NavButtons } from "~/components/Common/NavigationBar/NavButtons";
import { NavContainer } from "~/components/Common/NavigationBar/NavContainer";
import { MainContainer } from "~/components/Common/Container/MainContainer";

export const meta: MetaFunction = () => {
  return [
    { title: "Job Board for Devs" },
    { name: "description", content: "App for developers to look for work" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user: User | Employer | null = await authenticator.isAuthenticated(
    request
  );

  if (user?.role === "employer") {
    return redirect("/dashboard");
  }

  return typedjson({ user });
};

export default function Home() {
  const { user } = useTypedLoaderData<typeof loader>();

  return (
    <>
      <NavContainer>
        <NavigationBar>
          <Search />
          <NavButtons user={user} />
        </NavigationBar>
      </NavContainer>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}
