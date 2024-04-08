import multer from "multer";
import multerS3 from "multer-s3";
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// AWS S3 클라이언트 설정
const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_TOKEN,
    secretAccessKey: process.env.AWS_SECRETE,
  },
});

// Multer 설정
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "weblog-project", // S3 버킷명
    key: function (req, file, cb) {
      cb(null, "profile/" + file.originalname); // 파일 경로 지정
    },
  }),
});

// 파일을 AWS S3에 업로드하는 함수
async function uploadS3(fileBuffer, fileName) {
  const params = {
    Bucket: "weblog-project", // S3 버킷명
    Key: `profile/${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg", // 파일 타입에 따라 변경 가능
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
}

// POST 요청 핸들러
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ error: "파일이 없습니다" });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadS3(buffer, file.name);
    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
