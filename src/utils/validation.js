import { z } from "zod";

export const User = z.object({
  email: z.string().email("Некорректный email"),
  password: z
    .string()
    .min(8, "Пароль должен иметь длину не менее 8 символов")
    .regex(/^(?=.*[0-9])/, "Пароль должен содержать цифру")
    .regex(/^(?=.*[a-z])/, "Пароль должен содержать прописную букву")
    .regex(/^(?=.*[A-Z])/, "Пароль должен содержать заглавную букву"),
});

export const Note = z.object({
  name: z.string().trim().min(1, "Название должно содержать хотя бы 1 символ"),
});
