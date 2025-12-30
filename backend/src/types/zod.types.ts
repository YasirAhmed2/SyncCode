import { z } from "zod";

/* ===========================
   SIGNUP VALIDATION
=========================== */
export const signupSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
});

/* ===========================
   LOGIN VALIDATION
=========================== */
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password required")
});

/* ===========================
   FORGOT PASSWORD
=========================== */
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email")
});

/* ===========================
   RESET PASSWORD
=========================== */
export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
});


export const verifyEmailSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6)
});


