-- CreateTable
CREATE TABLE "training_plans" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "raceDate" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,
    "description" TEXT,
    "weeks" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "nutrition_data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateKey" TEXT NOT NULL,
    "totalCalories" INTEGER,
    "totalProtein" REAL,
    "totalCarbs" REAL,
    "totalFats" REAL,
    "meals" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "grocery_lists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weekId" TEXT NOT NULL,
    "categories" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_data_dateKey_key" ON "nutrition_data"("dateKey");

-- CreateIndex
CREATE UNIQUE INDEX "grocery_lists_weekId_key" ON "grocery_lists"("weekId");
