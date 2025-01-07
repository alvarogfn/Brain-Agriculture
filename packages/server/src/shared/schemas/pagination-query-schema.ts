import z from 'zod';

export const paginationQuerySchema = z.object({
  page: z.preprocess(
    (arg) => (arg ? Number(arg) : undefined),
    z.number().int().positive().default(1),
  ),
  searchTerm: z.string().optional(),
  size: z.preprocess(
    (arg) => (arg ? Number(arg) : undefined),
    z.number().int().positive().default(10),
  ),
  sort: z
    .string()
    .transform((value) => value.split(',').map((item) => item.split('.')))
    .optional(),
});
