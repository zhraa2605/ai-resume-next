"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import FileUploader from "./UplaodFile";
import { extractPdfText } from "@/app/lib/extractPdfText";
import { getResumeFeedback } from "@/app/lib/gemini";

const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Description is required"),
  file: z.instanceof(File, { message: "File is required" })

});

type UploadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const UploadDialog = ({ open, onOpenChange }: UploadDialogProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      jobTitle: "",
      description: "",
      file: null,
    },
  });
    const [file, setFile] = useState<File | null>(null);
 const handleFileSelect = (file: File | null) => {
   form.setValue("file", file);  // update react-hook-form's value
    setFile(file);
  };

async function onSubmit(values: {
  file: File;
  companyName: string;
  jobTitle: string;
  jobDescription?: string;
}) {
  try {
    // 1. Extract text from the PDF file
    const pdfText = await extractPdfText(values.file);
    console.log("Extracted PDF text:", pdfText.slice(0, 200)); // preview first 200 chars

    // 2. Define your expected feedback format (adjust as needed)
    const AIResponseFormat = `{
      "rating": number,
      "strengths": string[],
      "weaknesses": string[],
      "suggestions": string[]
    }`;


    // 3. Send extracted text + job info to Gemini
    const feedback = await getResumeFeedback({
      pdfText,
      jobTitle: values.jobTitle,
      jobDescription: values.jobDescription || "",
      AIResponseFormat,
    });

    // 4. Log or process the feedback
    console.log("Gemini feedback:", feedback);


    // TODO: You can save feedback to your DB here or update UI

  } catch (error) {
    console.error("Error during resume analysis:", error);
  }finally {
    onOpenChange(false); // close dialog after submit
  }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Your Resume</DialogTitle>
          <DialogDescription>
            Fill in the details and attach your resume for review.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add a short summary or note..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume File</FormLabel>
                  <FormControl>
                    <FileUploader onFileSelect={handleFileSelect} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
              <Button type="submit" className=" w-full bg-peach-dark-200 text-warm-gray hover:bg-peach-dark rounded-4xl p-4">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
