/*
  Warnings:

  - Added the required column `tipoPerfil` to the `ItemOrden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemOrden" ADD COLUMN     "tipoPerfil" TEXT NOT NULL;
