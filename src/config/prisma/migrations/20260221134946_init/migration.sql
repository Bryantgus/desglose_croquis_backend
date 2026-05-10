-- CreateTable
CREATE TABLE "ItemOrden" (
    "id" SERIAL NOT NULL,
    "etiqueta" TEXT NOT NULL,
    "ancho" TEXT NOT NULL,
    "alto" TEXT NOT NULL,
    "colorPerfil" TEXT NOT NULL,
    "tipoCristal" TEXT NOT NULL,
    "vias" INTEGER NOT NULL,
    "ordenId" INTEGER NOT NULL,

    CONSTRAINT "ItemOrden_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemOrden" ADD CONSTRAINT "ItemOrden_ordenId_fkey" FOREIGN KEY ("ordenId") REFERENCES "Orden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
