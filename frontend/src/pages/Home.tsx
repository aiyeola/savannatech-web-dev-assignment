import { Loader } from "@/components/ui/loader";
import { useGetUsers } from "@/api";

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
  const { data, isLoading } = useGetUsers(0, 10);
  console.log("data: ", data);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {data?.users?.map((user: User) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
