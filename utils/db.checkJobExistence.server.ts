import { Params } from "@remix-run/react";
import { db } from "./db.server";

export const checkJobExistence = async (params: Params) => {
  if (!params) {
    return false
  }
  
  const { jobId } = params;

  if (!jobId) {
    return false;
  }

  const job = await db.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    return false;
  }

  return { job };
};
