import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(1, "schemaError.firstName"),
  lastName: z.string().min(1, "schemaError.lastName"),
  email: z.string().email("schemaError.email"),
  password: z.string().min(6, "schemaError.signUpPassword"),
  marketingConsent: z.boolean().optional(),
});

export const signinSchema = z.object({
  email: z.string().email("schemaError.email"),
  password: z.string().min(1, "schemaError.signInPassword"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type SigninFormData = z.infer<typeof signinSchema>;
