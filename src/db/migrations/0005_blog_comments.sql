CREATE TABLE "blog_comments" (
  "id" text PRIMARY KEY,
  "post_slug" text NOT NULL,
  "locale" text,
  "user_id" text NOT NULL,
  "display_name" text NOT NULL,
  "content" text NOT NULL,
  "approved" boolean NOT NULL DEFAULT true,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now(),
  CONSTRAINT "blog_comments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX "blog_comments_post_slug_idx" ON "blog_comments" USING btree ("post_slug");
--> statement-breakpoint
CREATE INDEX "blog_comments_user_id_idx" ON "blog_comments" USING btree ("user_id");
