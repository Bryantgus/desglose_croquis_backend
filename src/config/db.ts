// src/config/db.ts
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

// Usamos un Pool de pg para gestionar múltiples consultas de forma eficiente
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Exportamos una única instancia de Prisma
export const prisma = new PrismaClient({ adapter }); 