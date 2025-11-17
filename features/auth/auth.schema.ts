import {z} from "zod";

export const loginSchema = z.object ({
    phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 characters"),
    otpnumber: z
    .string()
    .min(1, "OTP number is required")
    .min(4, "OTP number must be at least 4 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;