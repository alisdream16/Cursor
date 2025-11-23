-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('FREELANCER', 'ENTREPRENEUR', 'WORKER', 'EMPLOYER', 'INVESTOR');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'EMPLOYEE', 'MEMBER');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "IntegrationType" AS ENUM ('MICRO', 'YOUTUBE', 'FACEBOOK', 'INSTAGRAM', 'TWITTER', 'LINKEDIN');

-- CreateEnum
CREATE TYPE "IntegrationStatus" AS ENUM ('PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'REVOKED');

-- CreateEnum
CREATE TYPE "CompanyJoinRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CompanyVerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PermissionType" AS ENUM ('API_ACCESS', 'COMPANY_INFO_EDIT', 'REPORT_VIEW', 'REPORT_CREATE', 'TASK_ASSIGN', 'USER_MANAGE', 'FINANCIAL_VIEW');

-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('SILVER', 'GOLD', 'PLATINUM', 'PRIME');

-- CreateEnum
CREATE TYPE "AdvertisementStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CommissionStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TwoFactorMethod" AS ENUM ('TOTP', 'SMS', 'EMAIL');

-- CreateEnum
CREATE TYPE "KYCStatus" AS ENUM ('NOT_STARTED', 'PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "emailVerified" TIMESTAMP(3),
    "accountType" "AccountType",
    "password" TEXT,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorSecret" TEXT,
    "twoFactorMethod" "TwoFactorMethod",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "TwoFactorBackupCode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TwoFactorBackupCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KYCVerification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "KYCStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "documentType" TEXT,
    "documentNumber" TEXT,
    "documentImages" TEXT[],
    "verifiedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KYCVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "website" TEXT,
    "skills" TEXT[],
    "experience" INTEGER,
    "hourlyRate" DOUBLE PRECISION,
    "availability" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "industry" TEXT,
    "size" TEXT,
    "location" TEXT,
    "verificationStatus" "CompanyVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "verificationDocuments" JSONB,
    "verificationNotes" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyMember" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyJoinRequest" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "CompanyJoinRequestStatus" NOT NULL DEFAULT 'PENDING',
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyJoinRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyIntegration" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "integrationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Integration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT,
    "type" "IntegrationType" NOT NULL,
    "status" "IntegrationStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "integrationType" "IntegrationType" NOT NULL,
    "status" "IntegrationStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
    "requestData" JSONB,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreelancerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "bio" TEXT,
    "skills" TEXT[],
    "hourlyRate" DOUBLE PRECISION,
    "portfolio" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FreelancerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntrepreneurProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "expertise" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntrepreneurProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "investmentFocus" TEXT[],
    "portfolioSize" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Startup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "industry" TEXT,
    "stage" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entrepreneurId" TEXT NOT NULL,
    "entrepreneurProfileId" TEXT,

    CONSTRAINT "Startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StartupMember" (
    "id" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StartupMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPosting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'OPEN',
    "location" TEXT,
    "salary" TEXT,
    "requirements" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobPosting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coverLetter" TEXT,
    "resume" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "budget" INTEGER,
    "industry" TEXT,
    "timeline" TEXT,
    "requirements" TEXT,
    "status" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entrepreneurId" TEXT,
    "creatorId" TEXT NOT NULL,
    "startupId" TEXT,
    "companyId" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "priority" TEXT,
    "dueDate" TIMESTAMP(3),
    "projectId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskAssignment" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'DRAFT',
    "projectId" TEXT,
    "startupId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportAccess" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investment" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "investorId" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestmentRequest" (
    "id" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "equity" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestmentRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "ratedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBadge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "badgeName" TEXT NOT NULL,
    "description" TEXT,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "type" "PermissionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "grantedById" TEXT NOT NULL,
    "resourceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionShare" (
    "id" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "sharedWith" TEXT NOT NULL,
    "sharedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PermissionShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanySubscription" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "plan" "SubscriptionPlan" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanySubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advertisement" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "targetUrl" TEXT,
    "budget" DOUBLE PRECISION NOT NULL,
    "spent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "status" "AdvertisementStatus" NOT NULL DEFAULT 'DRAFT',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Advertisement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commission" (
    "id" TEXT NOT NULL,
    "freelancerId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "status" "CommissionStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Commission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIChat" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "messages" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIChat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "TwoFactorBackupCode_userId_idx" ON "TwoFactorBackupCode"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "KYCVerification_userId_key" ON "KYCVerification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "CompanyMember_userId_idx" ON "CompanyMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyMember_companyId_userId_key" ON "CompanyMember"("companyId", "userId");

-- CreateIndex
CREATE INDEX "CompanyJoinRequest_userId_idx" ON "CompanyJoinRequest"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyJoinRequest_companyId_userId_key" ON "CompanyJoinRequest"("companyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyIntegration_companyId_integrationId_key" ON "CompanyIntegration"("companyId", "integrationId");

-- CreateIndex
CREATE INDEX "Integration_userId_idx" ON "Integration"("userId");

-- CreateIndex
CREATE INDEX "Integration_companyId_idx" ON "Integration"("companyId");

-- CreateIndex
CREATE INDEX "IntegrationRequest_userId_idx" ON "IntegrationRequest"("userId");

-- CreateIndex
CREATE INDEX "IntegrationRequest_approvedById_idx" ON "IntegrationRequest"("approvedById");

-- CreateIndex
CREATE UNIQUE INDEX "FreelancerProfile_userId_key" ON "FreelancerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EntrepreneurProfile_userId_key" ON "EntrepreneurProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkerProfile_userId_key" ON "WorkerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployerProfile_userId_key" ON "EmployerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorProfile_userId_key" ON "InvestorProfile"("userId");

-- CreateIndex
CREATE INDEX "StartupMember_userId_idx" ON "StartupMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StartupMember_startupId_userId_key" ON "StartupMember"("startupId", "userId");

-- CreateIndex
CREATE INDEX "JobPosting_companyId_idx" ON "JobPosting"("companyId");

-- CreateIndex
CREATE INDEX "JobPosting_employerId_idx" ON "JobPosting"("employerId");

-- CreateIndex
CREATE INDEX "JobApplication_userId_idx" ON "JobApplication"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_jobId_userId_key" ON "JobApplication"("jobId", "userId");

-- CreateIndex
CREATE INDEX "Project_entrepreneurId_idx" ON "Project"("entrepreneurId");

-- CreateIndex
CREATE INDEX "Project_creatorId_idx" ON "Project"("creatorId");

-- CreateIndex
CREATE INDEX "Project_startupId_idx" ON "Project"("startupId");

-- CreateIndex
CREATE INDEX "Project_companyId_idx" ON "Project"("companyId");

-- CreateIndex
CREATE INDEX "Task_projectId_idx" ON "Task"("projectId");

-- CreateIndex
CREATE INDEX "Task_createdById_idx" ON "Task"("createdById");

-- CreateIndex
CREATE INDEX "TaskAssignment_userId_idx" ON "TaskAssignment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskAssignment_taskId_userId_key" ON "TaskAssignment"("taskId", "userId");

-- CreateIndex
CREATE INDEX "Report_projectId_idx" ON "Report"("projectId");

-- CreateIndex
CREATE INDEX "Report_startupId_idx" ON "Report"("startupId");

-- CreateIndex
CREATE INDEX "Report_createdById_idx" ON "Report"("createdById");

-- CreateIndex
CREATE INDEX "ReportAccess_userId_idx" ON "ReportAccess"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportAccess_reportId_userId_key" ON "ReportAccess"("reportId", "userId");

-- CreateIndex
CREATE INDEX "Investment_investorId_idx" ON "Investment"("investorId");

-- CreateIndex
CREATE INDEX "InvestmentRequest_startupId_idx" ON "InvestmentRequest"("startupId");

-- CreateIndex
CREATE INDEX "InvestmentRequest_investorId_idx" ON "InvestmentRequest"("investorId");

-- CreateIndex
CREATE INDEX "Rating_userId_idx" ON "Rating"("userId");

-- CreateIndex
CREATE INDEX "UserBadge_userId_idx" ON "UserBadge"("userId");

-- CreateIndex
CREATE INDEX "Permission_userId_idx" ON "Permission"("userId");

-- CreateIndex
CREATE INDEX "Permission_grantedById_idx" ON "Permission"("grantedById");

-- CreateIndex
CREATE INDEX "PermissionShare_sharedWith_idx" ON "PermissionShare"("sharedWith");

-- CreateIndex
CREATE INDEX "PermissionShare_sharedBy_idx" ON "PermissionShare"("sharedBy");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionShare_permissionId_sharedWith_key" ON "PermissionShare"("permissionId", "sharedWith");

-- CreateIndex
CREATE UNIQUE INDEX "CompanySubscription_companyId_key" ON "CompanySubscription"("companyId");

-- CreateIndex
CREATE INDEX "Advertisement_companyId_idx" ON "Advertisement"("companyId");

-- CreateIndex
CREATE INDEX "Commission_freelancerId_idx" ON "Commission"("freelancerId");

-- CreateIndex
CREATE INDEX "AIChat_userId_idx" ON "AIChat"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFactorBackupCode" ADD CONSTRAINT "TwoFactorBackupCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KYCVerification" ADD CONSTRAINT "KYCVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMember" ADD CONSTRAINT "CompanyMember_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMember" ADD CONSTRAINT "CompanyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyJoinRequest" ADD CONSTRAINT "CompanyJoinRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyJoinRequest" ADD CONSTRAINT "CompanyJoinRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyIntegration" ADD CONSTRAINT "CompanyIntegration_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyIntegration" ADD CONSTRAINT "CompanyIntegration_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationRequest" ADD CONSTRAINT "IntegrationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationRequest" ADD CONSTRAINT "IntegrationRequest_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreelancerProfile" ADD CONSTRAINT "FreelancerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntrepreneurProfile" ADD CONSTRAINT "EntrepreneurProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerProfile" ADD CONSTRAINT "WorkerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployerProfile" ADD CONSTRAINT "EmployerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorProfile" ADD CONSTRAINT "InvestorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Startup" ADD CONSTRAINT "Startup_entrepreneurId_fkey" FOREIGN KEY ("entrepreneurId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Startup" ADD CONSTRAINT "Startup_entrepreneurProfileId_fkey" FOREIGN KEY ("entrepreneurProfileId") REFERENCES "EntrepreneurProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StartupMember" ADD CONSTRAINT "StartupMember_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StartupMember" ADD CONSTRAINT "StartupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPosting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_entrepreneurId_fkey" FOREIGN KEY ("entrepreneurId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssignment" ADD CONSTRAINT "TaskAssignment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssignment" ADD CONSTRAINT "TaskAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportAccess" ADD CONSTRAINT "ReportAccess_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportAccess" ADD CONSTRAINT "ReportAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentRequest" ADD CONSTRAINT "InvestmentRequest_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentRequest" ADD CONSTRAINT "InvestmentRequest_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_grantedById_fkey" FOREIGN KEY ("grantedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionShare" ADD CONSTRAINT "PermissionShare_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionShare" ADD CONSTRAINT "PermissionShare_sharedWith_fkey" FOREIGN KEY ("sharedWith") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionShare" ADD CONSTRAINT "PermissionShare_sharedBy_fkey" FOREIGN KEY ("sharedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanySubscription" ADD CONSTRAINT "CompanySubscription_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertisement" ADD CONSTRAINT "Advertisement_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIChat" ADD CONSTRAINT "AIChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
