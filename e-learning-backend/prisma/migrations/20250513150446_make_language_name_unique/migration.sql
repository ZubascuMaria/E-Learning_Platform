/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Languages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Languages_name_key" ON "Languages"("name");
