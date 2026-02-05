CREATE TABLE "activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"strava_id" bigint NOT NULL,
	"user_id" integer NOT NULL,
	"type" varchar(50),
	"name" varchar(512),
	"distance" real,
	"moving_time" integer,
	"elapsed_time" integer,
	"total_elevation_gain" real,
	"start_date" timestamp,
	"average_speed" real,
	"max_speed" real,
	"average_heartrate" real,
	"max_heartrate" real,
	"sport_type" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "activities_strava_id_unique" UNIQUE("strava_id")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"strava_id" bigint NOT NULL,
	"username" varchar(255),
	"firstname" varchar(255),
	"lastname" varchar(255),
	"avatar_url" varchar(512),
	"access_token" varchar(512),
	"refresh_token" varchar(512),
	"token_expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_strava_id_unique" UNIQUE("strava_id")
);
--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;