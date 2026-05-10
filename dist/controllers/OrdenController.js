"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenController = void 0;
const db_1 = require("../config/db");
const catchAsync_1 = require("../middleware/catchAsync");
const OrdenValidation_1 = require("./zodValidation/OrdenValidation");
class OrdenController {
}
exports.OrdenController = OrdenController;
_a = OrdenController;
OrdenController.create = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const validatedData = OrdenValidation_1.createOrden.parse(req.body);
    const nuevaOrden = await db_1.prisma.orden.create({
        data: {
            ...validatedData,
            fecha: new Date().toISOString(),
        },
    });
    res.status(201).json(nuevaOrden);
});
OrdenController.getAll = async (req, res) => {
    const ordenes = await db_1.prisma.orden.findMany();
    res.status(200).json(ordenes);
};
OrdenController.modify = async (req, res) => {
    const { id } = req.params;
    const validatedData = OrdenValidation_1.editarOrden.parse(req.body);
    const ordenModificada = await db_1.prisma.orden.update({
        where: {
            id: Number(id)
        },
        data: {
            ...validatedData
        }
    });
    res.status(201).json(ordenModificada);
};
OrdenController.delete = async (req, res) => {
    const { id } = req.params;
    await db_1.prisma.orden.delete({
        where: {
            id: Number(id)
        }
    });
    res.status(204).json({ message: 'Orden Eliminada Correctamente' });
};
