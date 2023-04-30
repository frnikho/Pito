-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('Company', 'Customer');

-- CreateEnum
CREATE TYPE "AuthMethod" AS ENUM ('NATIVE', 'GOOGLE', 'GITHUB');

-- CreateEnum
CREATE TYPE "WorkingTimeStatus" AS ENUM ('Active', 'Suspend', 'End');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('Picture', 'Document', 'Other');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "picture" TEXT,
    "address" TEXT,
    "city" TEXT,
    "ahr" INTEGER,
    "crn" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "authMethod" "AuthMethod" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "key" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "history" JSONB DEFAULT '[]',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamPolicy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "teamId" TEXT NOT NULL,
    "history" JSONB DEFAULT '[]',

    CONSTRAINT "TeamPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkspaceLabel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" JSONB DEFAULT '{}',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "history" JSONB DEFAULT '[]',
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkspaceLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkspaceStoryStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "history" JSONB DEFAULT '[]',
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkspaceStoryStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkingTime" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "status" "WorkingTimeStatus" NOT NULL,
    "starting" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "ending" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userStoryId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "history" JSONB DEFAULT '[]',
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkingTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP(3),
    "points" INTEGER,
    "priority" INTEGER,
    "parentId" TEXT,
    "epicId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "workspaceId" TEXT NOT NULL,
    "history" JSONB DEFAULT '[]',
    "userId" TEXT NOT NULL,
    "workspaceStoryStatusId" TEXT NOT NULL,
    "sprintId" TEXT,

    CONSTRAINT "UserStory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Epic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP(3),
    "done" BOOLEAN NOT NULL DEFAULT false,
    "points" INTEGER,
    "priority" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "workspaceId" TEXT NOT NULL,
    "history" JSONB DEFAULT '[]',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Epic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sprint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "starting" TIMESTAMP(3),
    "ending" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "history" JSONB DEFAULT '[]',
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Sprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "filetype" "FileType" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "history" JSONB DEFAULT '[]',
    "userStoryId" TEXT,
    "epicId" TEXT,
    "DirectoryId" TEXT,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "history" JSONB,
    "userId" TEXT NOT NULL,
    "relatedTo" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "history" JSONB,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Directory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "libraryId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "history" JSONB,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Directory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" JSONB NOT NULL DEFAULT '{}',
    "directoryId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "history" JSONB,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CustomerType" NOT NULL DEFAULT 'Company',
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_assignedTo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_members" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserStoryToWorkspaceLabel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EpicToWorkspaceLabel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_id_key" ON "Workspace"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamPolicy_id_key" ON "TeamPolicy"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceLabel_id_key" ON "WorkspaceLabel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceStoryStatus_id_key" ON "WorkspaceStoryStatus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkingTime_id_key" ON "WorkingTime"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserStory_id_key" ON "UserStory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Epic_id_key" ON "Epic"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sprint_id_key" ON "Sprint"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_id_key" ON "Attachment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Library_id_key" ON "Library"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Directory_id_key" ON "Directory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Document_id_key" ON "Document"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_assignedTo_AB_unique" ON "_assignedTo"("A", "B");

-- CreateIndex
CREATE INDEX "_assignedTo_B_index" ON "_assignedTo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_members_AB_unique" ON "_members"("A", "B");

-- CreateIndex
CREATE INDEX "_members_B_index" ON "_members"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserStoryToWorkspaceLabel_AB_unique" ON "_UserStoryToWorkspaceLabel"("A", "B");

-- CreateIndex
CREATE INDEX "_UserStoryToWorkspaceLabel_B_index" ON "_UserStoryToWorkspaceLabel"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EpicToWorkspaceLabel_AB_unique" ON "_EpicToWorkspaceLabel"("A", "B");

-- CreateIndex
CREATE INDEX "_EpicToWorkspaceLabel_B_index" ON "_EpicToWorkspaceLabel"("B");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPolicy" ADD CONSTRAINT "TeamPolicy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPolicy" ADD CONSTRAINT "TeamPolicy_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceLabel" ADD CONSTRAINT "WorkspaceLabel_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceLabel" ADD CONSTRAINT "WorkspaceLabel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceStoryStatus" ADD CONSTRAINT "WorkspaceStoryStatus_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceStoryStatus" ADD CONSTRAINT "WorkspaceStoryStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingTime" ADD CONSTRAINT "WorkingTime_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingTime" ADD CONSTRAINT "WorkingTime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingTime" ADD CONSTRAINT "WorkingTime_userStoryId_fkey" FOREIGN KEY ("userStoryId") REFERENCES "UserStory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStory" ADD CONSTRAINT "UserStory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "UserStory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStory" ADD CONSTRAINT "UserStory_epicId_fkey" FOREIGN KEY ("epicId") REFERENCES "Epic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStory" ADD CONSTRAINT "UserStory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStory" ADD CONSTRAINT "UserStory_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStory" ADD CONSTRAINT "UserStory_workspaceStoryStatusId_fkey" FOREIGN KEY ("workspaceStoryStatusId") REFERENCES "WorkspaceStoryStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStory" ADD CONSTRAINT "UserStory_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "Sprint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Epic" ADD CONSTRAINT "Epic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Epic" ADD CONSTRAINT "Epic_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_userStoryId_fkey" FOREIGN KEY ("userStoryId") REFERENCES "UserStory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_epicId_fkey" FOREIGN KEY ("epicId") REFERENCES "Epic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_DirectoryId_fkey" FOREIGN KEY ("DirectoryId") REFERENCES "Directory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Directory" ADD CONSTRAINT "Directory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_directoryId_fkey" FOREIGN KEY ("directoryId") REFERENCES "Directory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_assignedTo" ADD CONSTRAINT "_assignedTo_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_assignedTo" ADD CONSTRAINT "_assignedTo_B_fkey" FOREIGN KEY ("B") REFERENCES "UserStory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_members" ADD CONSTRAINT "_members_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_members" ADD CONSTRAINT "_members_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserStoryToWorkspaceLabel" ADD CONSTRAINT "_UserStoryToWorkspaceLabel_A_fkey" FOREIGN KEY ("A") REFERENCES "UserStory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserStoryToWorkspaceLabel" ADD CONSTRAINT "_UserStoryToWorkspaceLabel_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkspaceLabel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EpicToWorkspaceLabel" ADD CONSTRAINT "_EpicToWorkspaceLabel_A_fkey" FOREIGN KEY ("A") REFERENCES "Epic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EpicToWorkspaceLabel" ADD CONSTRAINT "_EpicToWorkspaceLabel_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkspaceLabel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
