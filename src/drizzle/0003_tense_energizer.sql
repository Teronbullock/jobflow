ALTER TABLE "companies" RENAME TO "company";--> statement-breakpoint
ALTER TABLE "crew_members" RENAME TO "crew_member";--> statement-breakpoint
ALTER TABLE "company" DROP CONSTRAINT "companies_user_id_unique";--> statement-breakpoint
ALTER TABLE "company" DROP CONSTRAINT "companies_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "crew_member" DROP CONSTRAINT "crew_members_company_id_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_assignTo_crew_members_id_fk";
--> statement-breakpoint
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_company_id_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "company_id" uuid;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crew_member" ADD CONSTRAINT "crew_member_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_assignTo_crew_member_id_fk" FOREIGN KEY ("assignTo") REFERENCES "public"."crew_member"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN "user_id";