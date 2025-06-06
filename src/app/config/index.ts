import z from "zod";

const EnvSchema = z.object({
  PINECONE_API_KEY: z.string().min(1, "PINECONE_API_KEY is required"),
  PINECONE_INDEZ_NAME: z.string().min(1, "PINECONE_INDEZ_NAME is required"),
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});
const parsed = EnvSchema.safeParse(process.env);
console.log({ parsed });
if (!parsed.success) {
  console.error("❌ Invalid Credentials variables:");
  console.error(parsed.error.format());
  process.exit(1);
}

export const config = parsed.data;
