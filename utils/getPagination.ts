import { redirect } from "remix-typedjson";
import { db } from "utils/db.server";

interface getPaginationProps {
  request: Request;
  tableToCount: string;
  pageSize: number;
  redirectTo: string;
  currentPageDefault?: number
}

export const getPagination = async ({
  request,
  tableToCount,
  pageSize,
  redirectTo,
  currentPageDefault
}: getPaginationProps) => {
  const url = new URL(request.url);
  const currentPage = url.searchParams.get("page") || currentPageDefault;

  if (!currentPage) {
    throw redirect(redirectTo);
  }

  const totalRecords = await db[tableToCount].count();

  let parsedCurrentPage: number = 0

  typeof currentPage === "string" ? parsedCurrentPage = Number.parseInt(currentPage): parsedCurrentPage = currentPage

  console.log(currentPage)

  const totalPages = Math.ceil(totalRecords / pageSize);

  const skip = (parsedCurrentPage - 1) * pageSize;

  return { skip, take: pageSize, currentPage: parsedCurrentPage, totalPages };
};
