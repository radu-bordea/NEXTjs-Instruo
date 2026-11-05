/*
  Warnings:

  - A unique constraint covering the columns `[orgId,cui]` on the table `ClientCompany` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ClientCompany_orgId_cui_key" ON "ClientCompany"("orgId", "cui");
