import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../config/db";
import { catchAsync } from "../middleware/catchAsync";

const OrdenSchema = z.object({
  cliente: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  estado: z.string().refine((val) => ["Pendiente", "Procesando", "Completado"].includes(val), {
    message: "Estado no válido"
  }),
});

export class OrdenController {
  static create = catchAsync(async (req: Request, res: Response) => {
    const validatedData = OrdenSchema.parse(req.body);

    // 2. Guardar
    const nuevaOrden = await prisma.orden.create({
      data: {
        ...validatedData,
        fecha: new Date().toISOString(),
      },
    });

    res.status(201).json(nuevaOrden);
  });
}