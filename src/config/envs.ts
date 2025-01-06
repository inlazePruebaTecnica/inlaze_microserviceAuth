import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  JWT_SECRET: string;
  PORT: number;
}

// Definir el esquema de validación para las variables de entorno
const envsSchema = joi
  .object({
    JWT_SECRET: joi.string().required(),
    PORT: joi.number().required(),
  })
  .unknown(true);

// Validar las variables de entorno
const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Validación de la configuración con error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  jwtSecret: envVars.JWT_SECRET,
  port: envVars.PORT,
};
