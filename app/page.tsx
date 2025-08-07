'use client'
import { useState } from "react";
import { resumes as fakeResumes} from "@/constants";
import ResumeCard from "@/components/ResumeCard";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import UploadDialog from "@/components/UploadDialog";
export default function Home() {
    const [loading, setLoading] = useState(false);
    const [resumes , setResumes] = useState<Resume[]>(fakeResumes)

    const [openDialog , setOpenDialog] = useState(false)





  return (
    <main className="bg-warm-beige min-h-screen ">
              <NavBar setOpenDialog={setOpenDialog} />

      <section className="flex flex-col items-center gap-8 pt-12 max-sm:mx-2 mx-15 pb-5">
      <div className="flex flex-col items-center gap-8 max-w-4xl text-center max-sm:gap-4">
        <h1 >Track Your Applications & Resume Ratings</h1>
        {!loading && resumes.length === 0 ? (
            <h2 >No resumes found. Please add a resume to get started.</h2>
          ) : (
          <h2>Review your submissions and check AI-powered feedback.</h2>
          )}

           {!loading && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loading && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 mt-10">
            <Link href="/upload" className="primary-button w-fit text-2xl font-semibold">Upload Resume</Link>
          </div>
        )}

      </div>
      </section>
    <UploadDialog open={openDialog} onOpenChange={setOpenDialog} />

      
    </main>
  );
}
