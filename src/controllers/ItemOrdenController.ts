import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../middleware/catchAsync";
import { createItemOrden } from "./zodValidation/ItemOrdenValidation";


export class ItemOrdenController {

  static create = catchAsync(async (req: Request, res: Response) => {
    const validatedData = createItemOrden.parse(req.body);
    const { ordenId } = req.params
    const validarOrdenExists = await prisma.orden.findUnique({
      where: { id: Number(ordenId) }
    })

    if (!validarOrdenExists) {
      return res.status(400).json({ message: 'No existe una orden con ese Id' })
    }

    const nuevaOrden = await prisma.itemOrden.create({
      data: {
        ordenId: Number(ordenId),
        ...validatedData
      }
    });

    res.status(201).json({ message: 'Desglose Creado Correctamente' });
  });

  static getAll = async (req: Request, res: Response) => {
    const itemsOrden = await prisma.itemOrden.findMany()
    res.status(200).json(itemsOrden);
  };

  // static modify = async (req: Request, res: Response) => {
  //   const { id } = req.params
  //   const validatedData = editarOrden.parse(req.body);

  //   const ordenModificada = await prisma.orden.update({
  //     where: {
  //       id: Number(id)
  //     },
  //     data: {
  //       ...validatedData
  //     }
  //   });

  //   res.status(201).json(ordenModificada);

  // }

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params
    await prisma.orden.delete({
      where: {
        id: Number(id)
      }
    });
    res.status(204).json({ message: 'Orden Eliminada Correctamente' });
  }
}

