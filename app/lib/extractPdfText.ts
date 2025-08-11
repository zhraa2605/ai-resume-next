import pdfParse from "pdf-parse";

export async function extractPdfTextNode(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return data.text;
}
