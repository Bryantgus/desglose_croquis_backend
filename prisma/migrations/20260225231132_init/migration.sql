-- DropForeignKey
ALTER TABLE "ItemOrden" DROP CONSTRAINT "ItemOrden_ordenId_fkey";

-- AddForeignKey
ALTER TABLE "ItemOrden" ADD CONSTRAINT "ItemOrden_ordenId_fkey" FOREIGN KEY ("ordenId") REFERENCES "Orden"("id") ON DELETE CASCADE ON UPDATE CASCADE;
