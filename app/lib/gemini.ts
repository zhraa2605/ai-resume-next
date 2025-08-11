import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getResumeFeedback({
  pdfText,
  jobTitle,
  jobDescription,
  AIResponseFormat
}: {
  pdfText: string;
  jobTitle: string;
  jobDescription?: string;
  AIResponseFormat: string;
}) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are an expert in ATS (Applicant Tracking System) and resume analysis.
Please analyze and rate this resume and suggest how to improve it.
The rating can be low if the resume is bad.
Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
If available, use the job description for the job user is applying to to give more detailed feedback.
If provided, take the job description into consideration.
The job title is: ${jobTitle}
The job description is: ${jobDescription || "N/A"}
Resume text:
${pdfText}
Provide the feedback using the following format: ${AIResponseFormat}
Return the analysis as a JSON object, without any other text and without the backticks.
Do not include any other text or comments.
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  try {
    return JSON.parse(responseText);
    console.log("generated feedback")
  } catch (err) {
    console.error("Failed to parse Gemini JSON:", responseText);
    throw new Error("Gemini returned invalid JSON");
  }
}
