import { Employer, User } from "@prisma/client";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { authenticator } from "utils/auth.server";
import { MainContainer } from "~/components/Common/Container/MainContainer";
import { NavButtons } from "~/components/Common/NavigationBar/NavButtons";
import { NavContainer } from "~/components/Common/NavigationBar/NavContainer";
import { NavigationBar } from "~/components/Common/NavigationBar/NavigationBar";
import { JOBS_DASHBOARD_PAGE1 } from "~/const/routes";

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
    return typedjson({ user });
  }

  return redirect(JOBS_DASHBOARD_PAGE1);
};

export default function EmployerIndex() {
  const { user } = useTypedLoaderData<typeof loader>();

  return (
    <>
      <NavContainer>
        <NavigationBar>
          <NavButtons user={user} />
        </NavigationBar>
      </NavContainer>
      <MainContainer>
        <Outlet context={user}/>
      </MainContainer>
    </>
  );
}
