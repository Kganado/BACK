-- CreateEnum
CREATE TYPE "UserRol" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "UserRol" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "initialWeight" DOUBLE PRECISION NOT NULL,
    "genero" BOOLEAN NOT NULL,
    "codigo_animal" TEXT NOT NULL,
    "isAlive" BOOLEAN NOT NULL DEFAULT true,
    "precio_de_compra_moneda_funcional" DOUBLE PRECISION DEFAULT 0,
    "precio_de_venta_moneda_funcional" DOUBLE PRECISION DEFAULT 0,
    "tratamiento_diferenciado" TEXT,
    "precio_de_compra_moneda_local" DOUBLE PRECISION DEFAULT 0,
    "precio_de_venta_moneda_local" DOUBLE PRECISION DEFAULT 0,
    "razon_de_baja" TEXT,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "speciesId" INTEGER NOT NULL,
    "locationId_location" INTEGER NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeightHistory" (
    "id_weight_history" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL DEFAULT 'Ninguna',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ageMonths" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "animalId" INTEGER NOT NULL,

    CONSTRAINT "WeightHistory_pkey" PRIMARY KEY ("id_weight_history")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "percentage" DOUBLE PRECISION,
    "userId" TEXT NOT NULL,
    "animalId" INTEGER NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PregnancyHistory" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "time" INTEGER DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "animalId" INTEGER NOT NULL,

    CONSTRAINT "PregnancyHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pregnancy" (
    "id" SERIAL NOT NULL,
    "isPregnant" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "animalId" INTEGER NOT NULL,

    CONSTRAINT "Pregnancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Origin" (
    "id_origin" SERIAL NOT NULL,
    "female" TEXT,
    "male" TEXT,
    "animalId" INTEGER NOT NULL,
    "locationId_location" INTEGER NOT NULL,

    CONSTRAINT "Origin_pkey" PRIMARY KEY ("id_origin")
);

-- CreateTable
CREATE TABLE "Location" (
    "id_location" SERIAL NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id_location")
);

-- CreateTable
CREATE TABLE "Species" (
    "id" SERIAL NOT NULL,
    "species" TEXT NOT NULL,
    "tiempo_de_gestacion" TEXT NOT NULL,
    "peso_medio_hembra" TEXT,
    "peso_medio_macho" TEXT,
    "precio_por_kilo_promedio" DOUBLE PRECISION,
    "kilos_vendidos" DOUBLE PRECISION,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fertility" (
    "id" SERIAL NOT NULL,
    "fertilityStatus" BOOLEAN NOT NULL DEFAULT false,
    "fertilityReason" TEXT DEFAULT 'Muy joven',
    "animalId" INTEGER NOT NULL,

    CONSTRAINT "Fertility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatingHistory" (
    "id" SERIAL NOT NULL,
    "matingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" BOOLEAN NOT NULL DEFAULT true,
    "animalId" INTEGER NOT NULL,

    CONSTRAINT "MatingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Litters" (
    "id" SERIAL NOT NULL,
    "alive" INTEGER DEFAULT 0,
    "dead" INTEGER DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "animalId" INTEGER NOT NULL,

    CONSTRAINT "Litters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExchangeRate" (
    "id" SERIAL NOT NULL,
    "de_dolar_a_colones" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExchangeRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Pregnancy_animalId_key" ON "Pregnancy"("animalId");

-- CreateIndex
CREATE UNIQUE INDEX "Fertility_animalId_key" ON "Fertility"("animalId");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_locationId_location_fkey" FOREIGN KEY ("locationId_location") REFERENCES "Location"("id_location") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightHistory" ADD CONSTRAINT "WeightHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightHistory" ADD CONSTRAINT "WeightHistory_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PregnancyHistory" ADD CONSTRAINT "PregnancyHistory_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregnancy" ADD CONSTRAINT "Pregnancy_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Origin" ADD CONSTRAINT "Origin_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Origin" ADD CONSTRAINT "Origin_locationId_location_fkey" FOREIGN KEY ("locationId_location") REFERENCES "Location"("id_location") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fertility" ADD CONSTRAINT "Fertility_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatingHistory" ADD CONSTRAINT "MatingHistory_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Litters" ADD CONSTRAINT "Litters_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
