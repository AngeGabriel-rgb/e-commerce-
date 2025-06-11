import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, { message: "L'email est requis" }).email({ message: "Email invalide" }),
  password: z
    .string()
    .min(1, { message: "Le mot de passe est requis" })
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
})

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Le nom est requis" })
      .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    email: z.string().min(1, { message: "L'email est requis" }).email({ message: "Email invalide" }),
    password: z
      .string()
      .min(1, { message: "Le mot de passe est requis" })
      .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
    confirmPassword: z.string().min(1, { message: "La confirmation du mot de passe est requise" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
