import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../middleware/catchAsync";
import { createItemOrden, updateItemOrden } from "./zodValidation/ItemOrdenValidation";


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
    console.log(nuevaOrden);
    

    res.status(201).json({ message: 'Mamageuvo Creado Correctamente' });
  });

  static getAllByTipoPerfil = async (req: Request, res: Response) => {
    const { ordenId } = req.params;

    const validarOrdenExists = await prisma.orden.findUnique({
      where: { id: Number(ordenId) }
    });

    if (!validarOrdenExists) {
      return res.status(400).json({ message: 'No existe una orden con ese Id' });
    }

    const itemsOrden = await prisma.itemOrden.findMany({
      where: { ordenId: Number(ordenId) }
    });

    const itemsPerPerfil = itemsOrden
      .sort((a: any, b: any) => a.id - b.id)
      .reduce((acc: any[], item: any) => {
        if (!acc[item.tipoPerfil]) {
          acc[item.tipoPerfil] = [];
        }
        acc[item.tipoPerfil].push(item);
        return acc;
      }, {} as Record<string, typeof itemsOrden>);
    console.log(itemsPerPerfil);

    res.status(200).json(itemsPerPerfil);
  };

  static modify = async (req: Request, res: Response) => {
    const { itemOrdenId, ordenId } = req.params

    const validarOrdenExists = await prisma.orden.findUnique({
      where: { id: Number(ordenId) }
    })
    if (!validarOrdenExists) {
      return res.status(400).json({ message: 'No existe una orden con ese Id' })
    }

    const validarItemOrdenExists = await prisma.itemOrden.findUnique({
      where: { id: Number(itemOrdenId) }
    })
    if (!validarItemOrdenExists) {
      return res.status(400).json({ message: 'No existe una orden con ese Id' })
    }

    const validatedData = updateItemOrden.parse(req.body);

    const ordenModificada = await prisma.itemOrden.update({
      where: {
        id: Number(itemOrdenId)
      },
      data: {
        ...validatedData
      }
    });

    res.status(201).json(ordenModificada);
  }

  static delete = async (req: Request, res: Response) => {
    const { itemOrdenId, ordenId } = req.params

    const validarOrdenExists = await prisma.orden.findUnique({
      where: { id: Number(ordenId) }
    })
    if (!validarOrdenExists) {
      return res.status(400).json({ message: 'No existe una orden con ese Id' })
    }

    const validarItemOrdenExists = await prisma.itemOrden.findUnique({
      where: { id: Number(itemOrdenId) }
    })
    if (!validarItemOrdenExists) {
      return res.status(400).json({ message: 'No existe una orden con ese Id' })
    }

    await prisma.itemOrden.delete({
      where: {
        id: Number(itemOrdenId)
      }
    });
    res.status(204).json({ message: 'Orden Eliminada Correctamente' });
  }
}

