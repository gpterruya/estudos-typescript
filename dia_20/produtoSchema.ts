import { z } from "zod";

export const produtoSchema = z.object({
  nome: z.string().min(1),
  preco: z.number().min(0),
});

export type Produto = z.infer<typeof produtoSchema>;