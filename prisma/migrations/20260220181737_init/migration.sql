-- CreateTable
CREATE TABLE "Orden" (
    "id" SERIAL NOT NULL,
    "cliente" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Orden_pkey" PRIMARY KEY ("id")
);
