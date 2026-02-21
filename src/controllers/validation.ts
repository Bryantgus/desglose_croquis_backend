import { z } from "zod";

export const createOrden = z.object({
  cliente: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  estado: z.string().refine((val) => ["Pendiente", "Procesando", "Completado"].includes(val), {
    message: "Estado no válido"
  }),
  descripcion: z.string().optional(),
  asignadoA: z.string().optional()
});

export const editarOrden = z.object({
  cliente: z.string().min(3, "El nombre debe tener al menos 3 caracteres").optional(),
  estado: z.string().refine((val) => ["Pendiente", "Procesando", "Completado"].includes(val), {
    message: "Estado no válido"
  }).optional(),
  descripcion: z.string().optional(),
  asignadoA: z.string().optional()
})