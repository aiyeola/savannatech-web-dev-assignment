import { useMemo, useState, useCallback } from "react";
import { useGetUsers } from "@/api";
import { useNavigate } from "react-router";
import { ROUTES } from "@/lib/routes";
import { User, UserTableData } from "@/types";
import UserTable from "@/components/UserTable";
import UserTablePagination from "@/components/UserTablePagination";

export default function Home() {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(0);
  const [pageSize] = useState<number>(10);
  const { data, isLoading } = useGetUsers(page, pageSize);

  const users = useMemo<UserTableData[]>(() => {
    if (!data?.users) return [];
    return data.users.map((user: User) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      address: `${user.street}, ${user.state}, ${user.city}, ${user.zipcode}`,
    }));
  }, [data?.users]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleUserClick = useCallback(
    (userId: string) => {
      navigate(ROUTES.USER_POSTS(userId));
    },
    [navigate]
  );

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pt-8">
      <h1 className="text-3xl font-semibold mb-8 text-gray-900">Users</h1>

      <UserTable
        users={users}
        isLoading={isLoading}
        onUserClick={handleUserClick}
      />

      <UserTablePagination
        currentPage={data?.pageNumber || 0}
        totalPages={data?.totalPages || 0}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
