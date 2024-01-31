import { Employer, User } from "@prisma/client";
import { Form, Link } from "@remix-run/react";
import { Button } from "flowbite-react";
import { LOGIN, SIGNUP } from "~/const/routes";

interface NavButtonsProps {
  user: User | Employer | null;
}

export const NavButtons: React.FC<NavButtonsProps> = ({
  user,
}: NavButtonsProps) => {
  return (
    <>
      <div className="flex justify-center gap-2 sm:order-last w-full mt-4 md:w-auto md:m-0">
        {user ? (
          <>
            <div className="flex justify-center items-center">
              <Button color="gray" pill>
                {user.firstName}
              </Button>
            </div>
            <Form method="post" action="/logout">
              <Button color="blue" pill type="submit">
                Log out
              </Button>
            </Form>
          </>
        ) : (
          <>
            <Button as={Link} to={LOGIN} color="gray" pill prefetch="intent">
              Log In
            </Button>
            <Button
              as={Link}
              to={SIGNUP}
              color="blue"
              pill
              prefetch="intent"
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </>
  );
};
