import * as Yup from 'yup';

export const envSchema = Yup.object({
  API_URL: Yup.string().required(),
  HOSTNAME: Yup.string().default('localhost'),
  MODE: Yup.string()
    .oneOf(['production', 'development'] as const)
    .default('development'),
  PORT: Yup.number().default(3030),
});

export const env = envSchema.validateSync({
  API_URL: import.meta.env.PUBLIC_API_URL,
  HOSTNAME: import.meta.env.PUBLIC_HOSTNAME,
  MODE: import.meta.env.PUBLIC_MODE,
  PORT: import.meta.env.PUBLIC_PORT,
});
