
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

interface ApiErrorResponse {
  message?: string;
  error?: string;
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

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL as string | undefined
)?.replace(/\/+$/, "");

// Change this if your backend uses a different route.
const SUBADMINS_ENDPOINT =
  import.meta.env.VITE_ADMIN_SUBADMINS_ENDPOINT ||
  "/users/sub-admins";

const getApiBaseUrl = (): string => {
  if (!API_BASE_URL) {
    throw new Error(
      "VITE_API_BASE_URL is missing. Configure your backend URL in .env.",
    );
  }

  return API_BASE_URL;
};

const request = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(
    `${getApiBaseUrl()}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`,
    {
      ...options,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...options.headers,
      },
    },
  );

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const errorBody = body as ApiErrorResponse | null;

    throw new Error(
      errorBody?.message ??
        errorBody?.error ??
        `Request failed with status ${response.status}.`,
    );
  }

  return body as T;
};

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
    const result = await request<
      ListResponse | SubAdminAccount[]
    >(SUBADMINS_ENDPOINT);

    return extractAccounts(result);
  },

  async create(
    payload: CreateSubAdminPayload,
  ): Promise<SubAdminAccount> {
    const result = await request<CreateResponse>(
      SUBADMINS_ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

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
