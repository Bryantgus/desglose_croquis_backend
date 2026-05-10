"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarOrden = exports.createOrden = void 0;
const zod_1 = require("zod");
exports.createOrden = zod_1.z.object({
    cliente: zod_1.z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    estado: zod_1.z.string().refine((val) => ["Pendiente", "En Proceso", "Completado"].includes(val), {
        message: "Estado no válido"
    }),
    descripcion: zod_1.z.string().optional(),
    asignadoA: zod_1.z.string().optional()
});
exports.editarOrden = zod_1.z.object({
    cliente: zod_1.z.string().min(3, "El nombre debe tener al menos 3 caracteres").optional(),
    estado: zod_1.z.string().refine((val) => ["Pendiente", "En Proceso", "Completado"].includes(val), {
        message: "Estado no válido"
    }).optional(),
    descripcion: zod_1.z.string().optional(),
    asignadoA: zod_1.z.string().optional()
});
