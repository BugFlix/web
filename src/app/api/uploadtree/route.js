import multer from "multer";
import multerS3 from "multer-s3";
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// AWS S3 클라이언트 설정
const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_TOKEN,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRETE,
  },
});
const s3BucketUrl = "https://weblog-project.s3.ap-northeast-2.amazonaws.com/";
// Multer 설정
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "weblog-project", // S3 버킷명
    key: function (req, file, cb) {
      cb(null, `knowledgeTree/` + file.originalname); // 파일 경로 지정
    },
  }),
});

// 파일을 AWS S3에 업로드하는 함수
async function uploadS3(fileBuffer, fileName) {
  const params = {
    Bucket: "weblog-project", // S3 버킷명
    Key: `knowledgeTree/${fileName}`,
    Body: fileBuffer,
    ContentType: "application/json", // 파일 타입에 따라 변경 가능
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
}

// POST 요청 핸들러
export async function POST(request) {
  try {
    const jsonData = await request.json(); // JSON 데이터를 파싱하여 가져옴
    console.log(jsonData);
    const jsonString = JSON.stringify(jsonData); // JSON 데이터를 문자열로 변환
    const buffer = Buffer.from(jsonString, "utf-8"); // 버퍼로 변환
    const fileName = `${jsonData.name}.json`; // 파일명 설정 (예: 현재 시간을 파일명으로 사용)
    await uploadS3(buffer, fileName); // AWS S3에 업로드
    const fileUrl = s3BucketUrl + `knowledgeTree/${fileName}`; // 파일의 URL 생성
    return NextResponse.json({ success: true, fileName, fileUrl });
  } catch (error) {
    return NextResponse.json({ error }); // 오류 응답
  }
}
