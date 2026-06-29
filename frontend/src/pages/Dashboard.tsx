import { BackgroundBeams } from "@/components/ui/background-beams";
import { ResizableSide } from "@/components/Sidebar";

import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";



const Dashboard = () => {

  const { getToken } = useAuthToken();

  useEffect(() => {
    try {
      const token = getToken();
      if (!token) return;

    } catch (e: unknown) {
      console.log(e);
      toast({
        title: "The user is not Logged in",
        variant: "destructive",
      });
    }
  }, []);

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#262626]">
        <ResizableSide />

        <div className="flex-1 overflow-y-auto p-6">

            <Outlet />
            <Footer />

        </div>
      </div>

      <BackgroundBeams />
    </>
  );
};

export default Dashboard;
