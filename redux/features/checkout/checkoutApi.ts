import {
  createCheckoutSession as createSessionAction,
  getOrder as getOrderAction,
  GetOrderType,
  verifyPayment as verifyPaymentAction,
} from "@/app/[locale]/checkout/actions";
import {
  CreateCheckoutInput,
  ServerActionError,
  ServerActionSuccess,
} from "@/lib/types";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: fakeBaseQuery<ServerActionError>(),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    // 1. CREATE CHECKOUT SESSION (Stripe)
    createCheckoutSession: builder.mutation<
      ServerActionSuccess<{ url?: string; orderId?: string }>,
      CreateCheckoutInput
    >({
      queryFn: async (input) => {
        const res = await createSessionAction(input);
        return res.success
          ? {
              data: res as ServerActionSuccess<{
                url?: string;
                orderId?: string;
              }>,
            }
          : { error: res as ServerActionError };
      },
      invalidatesTags: ["Order"],
    }),

    // 2. VERIFY PAYMENT
    verifyPayment: builder.mutation<
      ServerActionSuccess<{ success: boolean }>,
      { sessionId: string; orderId: string }
    >({
      queryFn: async ({ sessionId, orderId }) => {
        const res = await verifyPaymentAction(sessionId, orderId);
        return res.success
          ? { data: res as ServerActionSuccess<{ success: boolean }> }
          : { error: res as ServerActionError };
      },
      invalidatesTags: ["Order"],
    }),

    // 3. GET ORDER DETAILS
    getOrder: builder.query<GetOrderType["order"], string>({
      queryFn: async (orderId) => {
        const res = await getOrderAction(orderId);
        if (res.success && res.order) {
          return { data: res.order };
        }

        return { error: res as ServerActionError };
      },
      providesTags: (result, error, orderId) => [
        { type: "Order", id: orderId },
      ],
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useVerifyPaymentMutation,
  useGetOrderQuery,
} = checkoutApi;
