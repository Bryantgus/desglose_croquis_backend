"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemOrdenController = void 0;
const db_1 = require("../config/db");
const catchAsync_1 = require("../middleware/catchAsync");
const ItemOrdenValidation_1 = require("./zodValidation/ItemOrdenValidation");
class ItemOrdenController {
}
exports.ItemOrdenController = ItemOrdenController;
_a = ItemOrdenController;
ItemOrdenController.create = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const validatedData = ItemOrdenValidation_1.createItemOrden.parse(req.body);
    const { ordenId } = req.params;
    const validarOrdenExists = await db_1.prisma.orden.findUnique({
        where: { id: Number(ordenId) }
    });
    if (!validarOrdenExists) {
        return res.status(400).json({ message: 'No existe una orden con ese Id' });
    }
    const nuevaOrden = await db_1.prisma.itemOrden.create({
        data: {
            ordenId: Number(ordenId),
            ...validatedData
        }
    });
    console.log(nuevaOrden);
    res.status(201).json({ message: 'Mamageuvo Creado Correctamente' });
});
ItemOrdenController.getAllByTipoPerfil = async (req, res) => {
    const { ordenId } = req.params;
    const validarOrdenExists = await db_1.prisma.orden.findUnique({
        where: { id: Number(ordenId) }
    });
    if (!validarOrdenExists) {
        return res.status(400).json({ message: 'No existe una orden con ese Id' });
    }
    const itemsOrden = await db_1.prisma.itemOrden.findMany({
        where: { ordenId: Number(ordenId) }
    });
    const itemsPerPerfil = itemsOrden
        .sort((a, b) => a.id - b.id)
        .reduce((acc, item) => {
        if (!acc[item.tipoPerfil]) {
            acc[item.tipoPerfil] = [];
        }
        acc[item.tipoPerfil].push(item);
        return acc;
    }, {});
    console.log(itemsPerPerfil);
    res.status(200).json(itemsPerPerfil);
};
ItemOrdenController.modify = async (req, res) => {
    const { itemOrdenId, ordenId } = req.params;
    const validarOrdenExists = await db_1.prisma.orden.findUnique({
        where: { id: Number(ordenId) }
    });
    if (!validarOrdenExists) {
        return res.status(400).json({ message: 'No existe una orden con ese Id' });
    }
    const validarItemOrdenExists = await db_1.prisma.itemOrden.findUnique({
        where: { id: Number(itemOrdenId) }
    });
    if (!validarItemOrdenExists) {
        return res.status(400).json({ message: 'No existe una orden con ese Id' });
    }
    const validatedData = ItemOrdenValidation_1.updateItemOrden.parse(req.body);
    const ordenModificada = await db_1.prisma.itemOrden.update({
        where: {
            id: Number(itemOrdenId)
        },
        data: {
            ...validatedData
        }
    });
    res.status(201).json(ordenModificada);
};
ItemOrdenController.delete = async (req, res) => {
    const { itemOrdenId, ordenId } = req.params;
    const validarOrdenExists = await db_1.prisma.orden.findUnique({
        where: { id: Number(ordenId) }
    });
    if (!validarOrdenExists) {
        return res.status(400).json({ message: 'No existe una orden con ese Id' });
    }
    const validarItemOrdenExists = await db_1.prisma.itemOrden.findUnique({
        where: { id: Number(itemOrdenId) }
    });
    if (!validarItemOrdenExists) {
        return res.status(400).json({ message: 'No existe una orden con ese Id' });
    }
    await db_1.prisma.itemOrden.delete({
        where: {
            id: Number(itemOrdenId)
        }
    });
    res.status(204).json({ message: 'Orden Eliminada Correctamente' });
};
