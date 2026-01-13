import { authClient } from "./auth-client";

export type ApiResponse = {
  status: "success" | "error";
  message: string;
};

export type Session = typeof authClient.$Infer.Session;
export type HomeParams = Promise<{ locale: string }>;