import { PrismaClient } from "@prisma/client";

import { singleton } from "./singleton.server";

// Avoid unnecessary connects to the db using a Singleton.
export const db = singleton(
  "prisma",
  () => new PrismaClient()
);