import * as Yup from 'yup';

export const envSchema = Yup.object({
  API_URL: Yup.string().required(),
  MODE: Yup.string()
    .oneOf(['production', 'development'] as const)
    .default('development'),
});

export const env = envSchema.validateSync({
  API_URL: process.env.PUBLIC_API_BASE_URL,
  MODE: process.env.MODE,
});
