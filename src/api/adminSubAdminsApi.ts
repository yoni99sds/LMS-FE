
import API from "./auth.api";

export interface CreateSubAdminPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "SubAdmin";
  permissions: string[];
}

export interface SubAdminAccount {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  permissions: string[];
  isActive?: boolean;
  status?: string;
  createdAt?: string;
}

interface ListResponse {
  data?:
    | SubAdminAccount[]
    | {
        users?: SubAdminAccount[];
        subAdmins?: SubAdminAccount[];
      };
  users?: SubAdminAccount[];
  subAdmins?: SubAdminAccount[];
}

interface CreateResponse {
  data?: SubAdminAccount;
  user?: SubAdminAccount;
  subAdmin?: SubAdminAccount;
  message?: string;
}

const SUBADMINS_ENDPOINT =
  import.meta.env.VITE_ADMIN_SUBADMINS_ENDPOINT ||
  "/users/sub-admins";

const extractAccounts = (
  result: ListResponse | SubAdminAccount[],
): SubAdminAccount[] => {
  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result.data)) {
    return result.data;
  }

  if (result.data && !Array.isArray(result.data)) {
    return result.data.subAdmins ?? result.data.users ?? [];
  }

  return result.subAdmins ?? result.users ?? [];
};

export const adminSubAdminsApi = {
  async list(): Promise<SubAdminAccount[]> {
    const response = await API.get<
      ListResponse | SubAdminAccount[]
    >(SUBADMINS_ENDPOINT);

    return extractAccounts(response.data);
  },

  async create(
    payload: CreateSubAdminPayload,
  ): Promise<SubAdminAccount> {
    const response = await API.post<CreateResponse>(
      SUBADMINS_ENDPOINT,
      payload,
    );

    const result = response.data;

    const account =
      result.subAdmin ?? result.user ?? result.data;

    if (!account) {
      throw new Error(
        result.message ??
          "The server did not return the created account.",
      );
    }

    return account;
  },
};
