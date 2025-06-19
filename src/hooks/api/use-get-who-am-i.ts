import { useQuery } from "@tanstack/react-query";
import authorizedApi from "~/api/authorized-api";
import { QUERY_KEYS } from "~/query-keys/query-keys";

export type User = {
  id: number;
  updatedAt: string;
  lastLogin: string;
  isSuperuser: boolean;
  email: string;
  telephone: string;
  isStaff: boolean;
  isActive: boolean;
  dateJoined: string;
  image: string;
  ddi: string;
  name: string;
  telephoneValidated: boolean;
  telephoneValidatedOn: string;
  zukesePayId: number;
  isTester: boolean;
  forcePasswordChange: boolean;
};

const getWhoAmI = async () => {
  const response = await authorizedApi<{
    body: User;
  }>("users/whoami");

  return response.data;
};

export const useGetWhoAmI = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS.WHO_I_AM],
    queryFn: getWhoAmI,
  });
};
