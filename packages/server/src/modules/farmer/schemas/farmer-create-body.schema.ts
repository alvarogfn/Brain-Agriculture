import z from 'zod';

export const farmerCreateBodySchema = z.object({
  documentId: z
    .union([z.string().length(11), z.string().length(14)])
    .transform((value) => value.replaceAll(/\D+/g, '')),
  name: z.string().nonempty(),
});
