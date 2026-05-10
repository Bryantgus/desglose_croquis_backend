"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const globalErrorHandler = (error, req, res, next) => {
    console.error("LOG DE ERROR:", error);
    // Si el error es de Zod (Validación)
    if (error instanceof zod_1.z.ZodError) {
        return res.status(400).json({
            mensaje: "Error de validación",
            detalles: error.format(),
        });
    }
    // Si el error es de Prisma (Base de datos)
    if (error.code && error.clientVersion) {
        return res.status(500).json({
            mensaje: "Error en la base de datos",
            codigo: error.code,
        });
    }
    // Error genérico
    res.status(500).json({
        mensaje: "Ocurrió un error interno",
        error: error.message || "Error desconocido",
    });
};
exports.globalErrorHandler = globalErrorHandler;
