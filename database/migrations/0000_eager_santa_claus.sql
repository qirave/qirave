CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"parentId" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"canSale" boolean DEFAULT true,
	"canPurchase" boolean DEFAULT true,
	"name" varchar(255) NOT NULL,
	"description" text,
	"image" varchar(255) DEFAULT '/imgs/product.bmp',
	"price" real NOT NULL,
	"cost" real DEFAULT 0 NOT NULL,
	"status" varchar(8) DEFAULT 'active' NOT NULL,
	"supplier" varchar(255),
	"sku" varchar(50),
	"barcode" varchar(50),
	"tags" varchar(255) DEFAULT '',
	"invoicingPolicy" varchar(8) DEFAULT 'ordered quantities' NOT NULL,
	"saleUnitOfMesure" varchar(50) DEFAULT 'unit' NOT NULL,
	"purchaseUnitOfMesure" varchar(50) DEFAULT 'unit' NOT NULL,
	"categoryId" integer,
	"taxId" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "products_sku_unique" UNIQUE("sku"),
	CONSTRAINT "products_barcode_unique" UNIQUE("barcode")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variants" (
	"id" serial PRIMARY KEY NOT NULL,
	"productId" bigint NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variantRestrictions" (
	"id" serial PRIMARY KEY NOT NULL,
	"productId" bigint NOT NULL,
	"variantId" bigint NOT NULL,
	"allowedValueId" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variantValues" (
	"id" serial PRIMARY KEY NOT NULL,
	"variantId" bigint NOT NULL,
	"value" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stockMoves" (
	"id" bigint PRIMARY KEY NOT NULL,
	"productId" bigint NOT NULL,
	"quantity" real NOT NULL,
	"sourceRouteId" bigint NOT NULL,
	"destinationRouteId" bigint NOT NULL,
	"status" varchar(8) DEFAULT 'pending' NOT NULL,
	"date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stockQuant" (
	"productId" bigint NOT NULL,
	"routeId" bigint NOT NULL,
	"quantityAvailable" real DEFAULT 0,
	"quantityOnHand" real DEFAULT 0,
	"quantityOutgoing" real DEFAULT 0,
	"quantityForecasted" real DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stockRoutes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"active" boolean DEFAULT true,
	"routeType" varchar(10) DEFAULT 'initial' NOT NULL,
	"parentRouteId" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stockRules" (
	"productId" bigint NOT NULL,
	"routeId" bigint NOT NULL,
	"minQuantity" real DEFAULT 0,
	"maxQuantity" real DEFAULT 0,
	"ruleType" varchar(8) DEFAULT 'reorder' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "suppliers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"contactPerson" varchar(255),
	"phone" varchar(20),
	"email" varchar(255),
	"address" text,
	"city" varchar(100),
	"state" varchar(100),
	"country" varchar(100),
	"postalCode" varchar(20),
	"isActive" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "suppliers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "taxes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(50),
	"on" varchar(8)[] DEFAULT '{"sales","purchase"}' NOT NULL,
	"calculation" varchar(8) DEFAULT 'excluded' NOT NULL,
	"description" text,
	"rate" real NOT NULL,
	"type" varchar(10) DEFAULT 'percentage' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_categories_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_taxId_taxes_id_fk" FOREIGN KEY ("taxId") REFERENCES "public"."taxes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variants" ADD CONSTRAINT "variants_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variantRestrictions" ADD CONSTRAINT "variantRestrictions_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variantRestrictions" ADD CONSTRAINT "variantRestrictions_variantId_variants_id_fk" FOREIGN KEY ("variantId") REFERENCES "public"."variants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variantRestrictions" ADD CONSTRAINT "variantRestrictions_allowedValueId_variantValues_id_fk" FOREIGN KEY ("allowedValueId") REFERENCES "public"."variantValues"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variantValues" ADD CONSTRAINT "variantValues_variantId_variants_id_fk" FOREIGN KEY ("variantId") REFERENCES "public"."variants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stockMoves" ADD CONSTRAINT "stockMoves_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stockMoves" ADD CONSTRAINT "stockMoves_sourceRouteId_stockRoutes_id_fk" FOREIGN KEY ("sourceRouteId") REFERENCES "public"."stockRoutes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stockMoves" ADD CONSTRAINT "stockMoves_destinationRouteId_stockRoutes_id_fk" FOREIGN KEY ("destinationRouteId") REFERENCES "public"."stockRoutes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stockQuant" ADD CONSTRAINT "stockQuant_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stockQuant" ADD CONSTRAINT "stockQuant_routeId_stockRoutes_id_fk" FOREIGN KEY ("routeId") REFERENCES "public"."stockRoutes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stockRoutes" ADD CONSTRAINT "stockRoutes_parentRouteId_stockRoutes_id_fk" FOREIGN KEY ("parentRouteId") REFERENCES "public"."stockRoutes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stockRules" ADD CONSTRAINT "stockRules_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stockRules" ADD CONSTRAINT "stockRules_routeId_stockRoutes_id_fk" FOREIGN KEY ("routeId") REFERENCES "public"."stockRoutes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
