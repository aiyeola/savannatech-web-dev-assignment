import { useMemo, useState } from "react";
import { Loader } from "@/components/ui/loader";
import { useGetUsers } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router";
import { ROUTES } from "@/lib/routes";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  user_id: string;
  street: string;
  state: string;
  city: string;
  zipcode: string;
}

export default function Home() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [pageSize] = useState(4);
  const { data, isLoading } = useGetUsers(page, pageSize);

  const users = useMemo(() => {
    if (!data) return [];
    return data?.users.map((user: User) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      address: `${user.street}, ${user.state}, ${user.city}, ${user.zipcode}`,
    }));
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen">
      <p className="text-3xl font-semibold">Users</p>

      <div className="overflow-hidden rounded-md border mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Full Name</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <div className="flex justify-center mx-auto items-center w-full py-10">
                <Loader />
              </div>
            ) : (
              users.map((user: Record<string, string>) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(ROUTES.USER_POSTS(user.id))}
                >
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination className="justify-end mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(data?.pageNumber - 1)}
              aria-disabled={data?.pageNumber === 0}
            />
          </PaginationItem>
          {data?.totalPages > 7 ? (
            <>
              {/* First page */}
              <PaginationItem>
                <PaginationLink
                  onClick={() => setPage(0)}
                  isActive={data?.pageNumber === 0}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {/* Ellipsis before */}
              {data?.pageNumber > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {/* Middle pages */}
              {(() => {
                // Calculate start and end for middle pages, avoiding duplication
                let start = Math.max(1, data?.pageNumber - 1);
                let end = Math.min(data?.totalPages - 2, data?.pageNumber + 1);
                // Ensure we always show 3 pages if possible
                if (data?.pageNumber <= 2) {
                  end = 3;
                  start = 1;
                } else if (data?.pageNumber >= data?.totalPages - 3) {
                  end = data?.totalPages - 2;
                  start = data?.totalPages - 4;
                }
                // Clamp values
                start = Math.max(1, start);
                end = Math.min(data?.totalPages - 2, end);

                return Array.from({ length: end - start + 1 }, (_, idx) => {
                  const page = start + idx;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setPage(page)}
                        isActive={page === data?.pageNumber}
                      >
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                });
              })()}
              {/* Ellipsis after */}
              {data?.pageNumber < data?.totalPages - 4 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {/* Last page */}
              <PaginationItem>
                <PaginationLink
                  onClick={() => setPage(data?.totalPages - 1)}
                  isActive={data?.pageNumber === data?.totalPages - 1}
                >
                  {data?.totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          ) : (
            Array.from({ length: data?.totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setPage(i)}
                  isActive={i === data?.pageNumber}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(data?.pageNumber + 1)}
              aria-disabled={data?.pageNumber === data?.totalPages - 1}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
