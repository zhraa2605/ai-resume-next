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
import { Label } from "@/components/ui/label";
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

const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Description is required"),
  file: z
    .any()
    .refine((file) => file?.length === 1, "File is required"),
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
    setFile(file);
  };

  const onSubmit = (values: any) => {
    console.log("Submitted values:", values);
    // Handle upload logic here
    onOpenChange(false); // close dialog after submit
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
                    <Input placeholder="e.g. OpenAI" {...field} />
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
                    <Input placeholder="e.g. AI Researcher" {...field} />
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
