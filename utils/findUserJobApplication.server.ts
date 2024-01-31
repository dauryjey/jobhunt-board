import { Application } from "@prisma/client";
import { db } from "./db.server";

interface findUserJobApplicationProps {
  jobId?: string;
  userId: string;
}

export const findUserJobApplication = async ({
  jobId,
  userId,
}: findUserJobApplicationProps): Promise<Application | false> => {

  const jobApplication = await db.application.findFirst({
    where: {
      jobId,
      userId
    },
  });
  
  if (jobApplication) {
    return jobApplication
  }

  return false
};
