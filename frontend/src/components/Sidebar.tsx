import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconGitBranch,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";



export function ResizableSide() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [open, setOpen] = useState(false);
  const links = [
    {
      label: "Dashboard",
      func: () => navigate("/dashboard"),
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
    {
      label: "Profile",
      func: () => navigate("/dashboard/profile"),
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
    {
      label: "Resume",
      func: () => navigate("/dashboard/resumes"),
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
    {
      label: "Github Scorer",
      func: () => navigate("/dashboard/scorer"),
      icon: <IconGitBranch className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
    {
      label: "Logout",
      func: logout,
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
  ];
  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border md:flex-row border-neutral-700 bg-neutral-800",
          "h-screen",
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((item, idx) => (
                  <SidebarLink
                    key={idx}
                    link={item}
                    className="cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <div
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <img src="/logo.svg" alt="" className="h-4 w-4" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white"
      >
        Resume Builder
      </motion.span>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white flex items-center justify-center">
        <img src="/logo-black.svg" alt="" className="h-5 w-4 text-black"/>
      </div>
    </a>
  );
};
