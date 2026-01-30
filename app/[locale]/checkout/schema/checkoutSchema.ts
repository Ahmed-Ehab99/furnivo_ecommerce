import { z } from "zod";

export const deliveryAddressSchema = z.object({
  city: z.string().min(1, "schemaError.city"),
  streetName: z.string().min(1, "schemaError.streetName"),
  buildingName: z.string().min(1, "schemaError.buildingName"),
});

export type DeliveryAddressFormData = z.infer<typeof deliveryAddressSchema>;
