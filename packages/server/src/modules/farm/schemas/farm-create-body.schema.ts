import z from 'zod';

export const farmCreateBodySchema = z.object({
  arableArea: z.number(),
  farmCity: z.string(),
  farmName: z.string(),
  farmOwner: z.number(),
  farmState: z.string().length(2),
  totalArea: z.number(),
  vegetationArea: z.number(),
});
