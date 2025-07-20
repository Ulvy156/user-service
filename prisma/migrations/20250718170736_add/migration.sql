/*
  Warnings:

  - A unique constraint covering the columns `[employeeID]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_employeeID_key" ON "User"("employeeID");
