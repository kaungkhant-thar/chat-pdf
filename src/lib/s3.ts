"use server";
import { awsConfig } from "@/app/config/aws";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const generatePresignedUrl = async (
  fileName: string,
  fileType: string
) => {
  const s3Client = new S3Client(awsConfig);

  const fileKey = `${Date.now()}-${fileName}`;

  const putCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileKey,
    ContentType: fileType,
  });

  const presignedUrl = await getSignedUrl(s3Client, putCommand, {
    expiresIn: 60,
  });

  return { presignedUrl, fileKey };
};
