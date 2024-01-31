import { type MetaFunction } from "@remix-run/node";
import { redirect } from "remix-typedjson";
import { JOBS_DASHBOARD } from "~/const/routes";

export const meta: MetaFunction = () => {
  return [
    { title: "Job Board for Devs" },
    { name: "description", content: "App for developers to look for work" },
  ];
};

export const loader = async () => {
  return redirect(JOBS_DASHBOARD);
};
