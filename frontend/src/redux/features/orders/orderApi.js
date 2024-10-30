import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    // Fetch orders by email
    getOrdersByEmail: builder.query({
      query: (email) => ({
        url: `/${email}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    // Fetch order by ID
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `order/${orderId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    // Fetch all orders
    getAllOrders: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    // Fetch all orders by seller
    getAllOrdersBySeller: builder.query({
      query: (sellerId) => ({
        url: `/seller/${sellerId}`, // Assuming your API has a specific endpoint for fetching seller orders
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-order-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/delete-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

// Export the hooks
export const {
  useGetOrdersByEmailQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useGetAllOrdersBySellerQuery, // Export the new hook
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;

export default orderApi;
