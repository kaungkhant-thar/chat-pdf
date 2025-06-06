CREATE TABLE "documents" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "documents_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"fileName" varchar NOT NULL,
	"fileSize" integer NOT NULL,
	"fileKey" varchar NOT NULL,
	"createdAt" date DEFAULT now()
);
