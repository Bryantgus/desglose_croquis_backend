"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemOrden = exports.createItemOrden = void 0;
const zod_1 = require("zod");
const FRACCIONES_VALIDAS = [
    '1/16', '1/8', '3/16', '1/4', '5/16', '3/8',
    '7/16', '1/2', '9/16', '5/8', '11/16', '3/4',
    '13/16', '7/8', '15/16'
];
const COLORES_PERFIL = ['blanco', 'negro', 'roble'];
const TIPO_CRISTAL = ['natural liso', 'natural martillado', 'bronze liso', 'bronze martillado', 'azul liso', 'azul martillado'];
const TIPO_PERFIL = ['p65', 'tradicional', 'p40', 'p92'];
const validarMedida = (medida) => {
    if (/^\d+$/.test(medida))
        return true;
    const partes = medida.split(' ');
    if (partes.length !== 2)
        return false;
    const [entero, fraccion] = partes;
    if (!/^\d+$/.test(entero))
        return false;
    return FRACCIONES_VALIDAS.includes(fraccion);
};
exports.createItemOrden = zod_1.z.object({
    ancho: zod_1.z.string().refine(validarMedida, {
        message: `Formato inválido. Use número entero (ej: "36") o entero + fracción (ej: "36 3/4")`
    }),
    alto: zod_1.z.string().refine(validarMedida, {
        message: `Formato inválido. Use número entero (ej: "36") o entero + fracción (ej: "36 3/4")`
    }),
    colorPerfil: zod_1.z.string().refine((val) => COLORES_PERFIL.includes(val), {
        message: `Color no válido. Debe ser uno de: ${COLORES_PERFIL.join(', ')}`
    }),
    tipoCristal: zod_1.z.string().refine((val) => TIPO_CRISTAL.includes(val), {
        message: `Tipo de Cristal no valido. Debe ser uno de: ${TIPO_CRISTAL.join(', ')}`
    }),
    tipoPerfil: zod_1.z.string().refine((val) => TIPO_PERFIL.includes(val), {
        message: `Tipo de Perfl no valido. Debe ser uno de: ${TIPO_PERFIL.join(', ')}`
    }),
    vias: zod_1.z.number().int().min(1).max(4),
    etiqueta: zod_1.z.string().max(20)
});
exports.updateItemOrden = zod_1.z.object({
    ancho: zod_1.z.string().refine(validarMedida, {
        message: `Formato inválido. Use número entero (ej: "36") o entero + fracción (ej: "36 3/4")`
    }).optional(),
    alto: zod_1.z.string().refine(validarMedida, {
        message: `Formato inválido. Use número entero (ej: "36") o entero + fracción (ej: "36 3/4")`
    }).optional(),
    colorPerfil: zod_1.z.string().refine((val) => COLORES_PERFIL.includes(val), {
        message: `Color no válido. Debe ser uno de: ${COLORES_PERFIL.join(', ')}`
    }).optional(),
    tipoCristal: zod_1.z.string().refine((val) => TIPO_CRISTAL.includes(val), {
        message: `Tipo de Cristal no valido. Debe ser uno de: ${TIPO_CRISTAL.join(', ')}`
    }).optional(),
    tipoPerfil: zod_1.z.string().refine((val) => TIPO_PERFIL.includes(val), {
        message: `Tipo de Perfl no valido. Debe ser uno de: ${TIPO_PERFIL.join(', ')}`
    }).optional(),
    vias: zod_1.z.number().int().min(1).max(4).optional(),
    etiqueta: zod_1.z.string().max(20).optional()
});
