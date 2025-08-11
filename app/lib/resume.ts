import { databases, storage } from "./appwrite";
import { convertPdfToImage } from "./pdfToImg";
import { ID } from "appwrite";


async function UploadResume(values: { file: File; companyName: string; jobTitle: string }) {
  try {
    // 1. Convert PDF to image
    const imgResult = await convertPdfToImage(values.file);
    if (!imgResult.file) {
      throw new Error("Failed to create image from PDF");
    }

    console.log("image converted")

    // 2. Upload the image to Appwrite Storage
    const imgUpload = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
      ID.unique(),
      imgResult.file
    );

    const imagePath = imgUpload.$id;

    // 3. Save to resumeImgs (resumeItls) collection
    const resumeImageDoc = await databases.createDocument(
process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_RESUMES_COLLECTION_ID, 
      ID.unique(),
      {
        companyName: values.companyName,
        jobTitle: values.jobTitle,
        imagePath,
      }
    );

    console.log("Resume image saved:", resumeImageDoc);
    return resumeImageDoc;
  } catch (error) {
    console.error("Error saving resume image:", error);
    throw error;
  }
}
