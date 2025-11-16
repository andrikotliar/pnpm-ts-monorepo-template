import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(4001),
});

const getEnvironmentVariables = () => {
  const parsedEnv = envSchema.safeParse(process.env);
  if (!parsedEnv.success) {
    console.error('❌ Invalid environment variables:', parsedEnv.error.format());
    throw new Error('Invalid environment variables');
  }
  return parsedEnv.data;
};

export const envConfig = getEnvironmentVariables();
