import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "@/components/ui/loader";
import { UserTableData } from "@/types";

interface UserTableProps {
  users: UserTableData[];
  isLoading: boolean;
  onUserClick: (userId: string) => void;
}

const UserTable = memo<UserTableProps>(({ users, isLoading, onUserClick }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] px-6 py-4 font-medium">
              Full Name
            </TableHead>
            <TableHead className="px-6 py-4 font-medium">
              Email Address
            </TableHead>
            <TableHead className="px-6 py-4 font-medium">Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="relative min-h-[200px] h-full">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="h-[200px]">
                <div className="flex justify-center items-center h-full">
                  <Loader />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            users.map((user: UserTableData) => (
              <TableRow
                key={user.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                onClick={() => onUserClick(user.id)}
              >
                <TableCell className="font-medium px-6 py-4 text-gray-900">
                  {user.name}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-700">
                  {user.email}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600 text-sm">
                  {user.address}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
});

UserTable.displayName = "UserTable";

export default UserTable;