import * as yup from 'yup';

export const farmerCreateSchema = yup.object({
  farmerName: yup.string().required(),
  identifier: yup
    .string()
    .when(([identifier], schema) => {
      if (identifier.length <= 11) return schema.length(11);
      return schema.length(14);
    })
    .required(),
});

export type FarmerCreateSchema = yup.InferType<typeof farmerCreateSchema>;
