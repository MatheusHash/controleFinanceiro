// src/schemas/categorySchema.ts
import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome é muito longo"),
  type: z.enum(["despesa", "receita"], {
    message: "Selecione um tipo válido",
  }),
  description: z.string().max(255, "A descrição é muito longa").optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
