import { useEffect, useState } from "react";
import ResumeList from "../components/ResumeList";
import axios from "axios";
import { Resume } from "@/types/ResumeTypes";
import { useAuthToken } from "@/hooks/useAuthToken";
import { toast } from "@/hooks/use-toast";

const ResumeShow = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id)); 
  };
  const { getToken } = useAuthToken();
  
  useEffect(() => {
    try{
      const token = getToken();
      if (!token) return;

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/resumes", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setResumes(res.data);
        })
    } catch (e: unknown) {
      console.log(e);
      toast({
        title: "Failed to show Resume. Please try again.",
        variant: "destructive",
      });
    }},[]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black flex flex-col items-center p-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-6 mb-8 text-center">
        📜 Your Resumes
      </h2>

      <div className="w-full max-w-6xl">
        {resumes.length > 0 ? (
          <ResumeList
            resumes={resumes}
            onDelete={handleDelete}
          />
        ) : (
          <p className="text-gray-500 dark:text-gray-300">Loading or no resumes found.</p>
        )}
      </div>
    </div>
  );
};

export default ResumeShow;
