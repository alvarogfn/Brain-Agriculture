import z from 'zod';

export const harvestCreateBodySchema = z.object({
  crops: z.array(z.number()),
  farmId: z.number(),
  name: z.string(),
  year: z.string().length(4),
});
