import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../config/db";
import { catchAsync } from "../middleware/catchAsync";

const createOrden = z.object({
  cliente: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  estado: z.string().refine((val) => ["Pendiente", "Procesando", "Completado"].includes(val), {
    message: "Estado no válido"
  }),
  descripcion: z.string().optional(),
  asignadoA: z.string().optional()
});

const editarOrden = z.object({
  cliente: z.string().min(3, "El nombre debe tener al menos 3 caracteres").optional(),
  estado: z.string().refine((val) => ["Pendiente", "Procesando", "Completado"].includes(val), {
    message: "Estado no válido"
  }).optional(),
  descripcion: z.string().optional(),
  asignadoA: z.string().optional()
})

export class OrdenController {
  static create = catchAsync(async (req: Request, res: Response) => {
    const validatedData = createOrden.parse(req.body);

    const nuevaOrden = await prisma.orden.create({
      data: {
        ...validatedData,
        fecha: new Date().toISOString(),
      },
    });

    res.status(201).json(nuevaOrden);
  });

  static getAll = async (req: Request, res: Response) => {
    const ordenes = await prisma.orden.findMany()
    res.status(200).json(ordenes);
  };

  static modify = async (req: Request, res: Response) => {
    const { id } = req.params
    console.log("ID recibido:", id);
    const validatedData = editarOrden.parse(req.body);

    const ordenModificada = await prisma.orden.update({
      where: {
        id: Number(id)
      },
      data: {
        ...validatedData
      }
    });

    res.status(201).json(ordenModificada);

  }
}