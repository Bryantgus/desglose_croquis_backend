import { z } from 'zod';

const FRACCIONES_VALIDAS: string[] = [
  '1/16', '1/8', '3/16', '1/4', '5/16', '3/8',
  '7/16', '1/2', '9/16', '5/8', '11/16', '3/4',
  '13/16', '7/8', '15/16'
];

const COLORES_PERFIL = ['blanco', 'negro', 'roble'];
const TIPO_CRISTAL = ['natural liso', 'natural martillado', 'bronze liso', 'bronze martillado', 'azulado liso', 'azulado martillado']
const TIPO_PERFIL = ['p65', 'tradicional', 'p40', 'p92']

const validarMedida = (medida: string) => {
  if (/^\d+$/.test(medida)) return true;

  const partes = medida.split(' ');

  if (partes.length !== 2) return false;

  const [entero, fraccion] = partes;

  if (!/^\d+$/.test(entero)) return false;

  return FRACCIONES_VALIDAS.includes(fraccion);
}

export const createItemOrden = z.object({
  ancho: z.string().refine(validarMedida, {
    message: `Formato inválido. Use número entero (ej: "36") o entero + fracción (ej: "36 3/4")`
  }),
  alto: z.string().refine(validarMedida, {
    message: `Formato inválido. Use número entero (ej: "36") o entero + fracción (ej: "36 3/4")`
  }),
  colorPerfil: z.string().refine((val) => COLORES_PERFIL.includes(val), {
    message: `Color no válido. Debe ser uno de: ${COLORES_PERFIL.join(', ')}`
  }),
  tipoCristal: z.string().refine((val) => TIPO_CRISTAL.includes(val), {
    message: `Tipo de Cristal no valido. Debe ser uno de: ${TIPO_CRISTAL.join(', ')}`
  }),
  tipoPerfil: z.string().refine((val) => TIPO_PERFIL.includes(val), {
    message: `Tipo de Perfl no valido. Debe ser uno de: ${TIPO_PERFIL.join(', ')}`
  }),
  vias: z.number().int().min(1).max(4),
  etiqueta: z.string().max(20)

})

export const updateItemOrden = z.object({
  ancho: z.string().refine(validarMedida, {
    message: `Formato inválido. Use número entero (ej: "36") o entero + fracción (ej: "36 3/4")`
  }).optional(),
  alto: z.string().refine(validarMedida, {
    message: `Formato inválido. Use número entero (ej: "36") o entero + fracción (ej: "36 3/4")`
  }).optional(),
  colorPerfil: z.string().refine((val) => COLORES_PERFIL.includes(val), {
    message: `Color no válido. Debe ser uno de: ${COLORES_PERFIL.join(', ')}`
  }).optional(),
  tipoCristal: z.string().refine((val) => TIPO_CRISTAL.includes(val), {
    message: `Tipo de Cristal no valido. Debe ser uno de: ${TIPO_CRISTAL.join(', ')}`
  }).optional(),
  tipoPerfil: z.string().refine((val) => TIPO_PERFIL.includes(val), {
    message: `Tipo de Perfl no valido. Debe ser uno de: ${TIPO_PERFIL.join(', ')}`
  }).optional(),
  vias: z.number().int().min(1).max(4).optional(),
  etiqueta: z.string().max(20).optional()
})
