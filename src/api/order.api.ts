import api from "./auth.api.js";

// ============================================================
// TYPES
// ============================================================

export interface OrderItem {
  courseId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface OrderStudent {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Order {
  _id: string;

  orderNumber: string;

  studentId: string | OrderStudent;

  items: OrderItem[];

  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  currency: string;

  status:
    | "Pending"
    | "Processing"
    | "Completed"
    | "Cancelled"
    | "Failed"
    | "Refunded";

  paymentStatus:
    | "Pending"
    | "Processing"
    | "Paid"
    | "Failed"
    | "Refunded"
    | "PartiallyRefunded";

  paymentId?: string;

  promoCode?: string;

  paidAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  refundedAt?: string;

  notes?: string;

  itemCount?: number;

  createdAt: string;
  updatedAt: string;
}

// ============================================================
// CREATE ORDER
// ============================================================

export interface CreateOrderPayload {
  courseIds: string[];

  promoCode?: string;

  discount?: number;

  tax?: number;

  notes?: string;
}

export interface CreateOrderResponse {
  success: boolean;

  message: string;

  data: Order;
}

// ============================================================
// GET ORDERS
// ============================================================

export interface OrdersPagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface OrdersResponse {
  orders: Order[];

  pagination: OrdersPagination;
}

export interface GetOrdersResponse {
  success: boolean;

  data: OrdersResponse;
}

export interface GetOrderResponse {
  success: boolean;

  data: Order;
}

// ============================================================
// CREATE ORDER
// POST /api/v1/orders
// ============================================================

export const createOrder = async (
  payload: CreateOrderPayload
): Promise<Order> => {
  const response =
    await api.post<CreateOrderResponse>(
      "/orders",
      payload
    );

  return response.data.data;
};

// ============================================================
// GET MY ORDERS
// GET /api/v1/orders/my
// ============================================================

export const getMyOrders = async (
  page = 1,
  limit = 10,
  status?: string,
  paymentStatus?: string
): Promise<OrdersResponse> => {
  const params: Record<
    string,
    string | number
  > = {
    page,
    limit,
  };

  if (status) {
    params.status = status;
  }

  if (paymentStatus) {
    params.paymentStatus = paymentStatus;
  }

  const response =
    await api.get<GetOrdersResponse>(
      "/orders/my",
      {
        params,
      }
    );

  return response.data.data;
};

// ============================================================
// GET SINGLE ORDER
// GET /api/v1/orders/:id
// ============================================================

export const getOrderById = async (
  orderId: string
): Promise<Order> => {
  const response =
    await api.get<GetOrderResponse>(
      `/orders/${orderId}`
    );

  return response.data.data;
};

// ============================================================
// DEFAULT EXPORT
// ============================================================

const orderApi = {
  createOrder,
  getMyOrders,
  getOrderById,
};

export default orderApi;