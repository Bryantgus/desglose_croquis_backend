"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// src/config/db.ts
const client_1 = require("./generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = __importDefault(require("pg"));
require("dotenv/config");
const connectionString = process.env.DATABASE_URL;
// Usamos un Pool de pg para gestionar múltiples consultas de forma eficiente
const pool = new pg_1.default.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
// Exportamos una única instancia de Prisma
exports.prisma = new client_1.PrismaClient({ adapter });
