/*
  Warnings:

  - The primary key for the `Comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Comments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `authorId` on the `Comments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `postId` on the `Comments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - The primary key for the `Posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `authorId` on the `Posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `password` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_authorId_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_pkey",
ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "authorId" DROP NOT NULL,
ALTER COLUMN "authorId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "postId" DROP NOT NULL,
ALTER COLUMN "postId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6),
ADD CONSTRAINT "Comments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_pkey",
ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "authorId" DROP NOT NULL,
ALTER COLUMN "authorId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6),
ADD CONSTRAINT "Posts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
