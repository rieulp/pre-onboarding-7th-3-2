import { useQuery } from "@tanstack/react-query";
import { getUsers } from "lib/api/users";

function useUsers() {
  const { data, isLoading, isError } = useQuery(["users"], () => getUsers(), {
    staleTime: 360000,
  });
  return { users: data, isLoading, isError };
}

export default useUsers;
