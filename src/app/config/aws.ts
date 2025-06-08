import z from "zod";

const AwsEnvSchema = z.object({
  AWS_REGION: z.string().min(1, "AWS_REGION is required"),
  AWS_ACCESS_KEY_ID: z.string().min(1, "AWS_ACCESS_KEY_ID is required"),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, "AWS_SECRET_ACCESS_KEY is required"),
  AWS_S3_BUCKET_NAME: z.string().min(1, "AWS_S3_BUCKET_NAME is required"),
});

const parsed = AwsEnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Invalid AWS environment variables:");
  console.error(parsed.error.format());
  process.exit(1);
}

const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = parsed.data;

export const awsConfig = {
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  s3BucketName: process.env.AWS_S3_BUCKET_NAME,
};
