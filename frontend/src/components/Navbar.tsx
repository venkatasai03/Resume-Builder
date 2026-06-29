"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { navItems } from "@/constants/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResizableNav() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full fixed z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton
              variant="primary"
              className="bg-slate-200 hover:bg-gray-50"
              onClick={() => navigate("/login")}
            >
              <img src={"/log-in.svg"} alt="" width={30} height={30} />
            </NavbarButton>
            <NavbarButton
              variant="primary"
              className="bg-slate-200 hover:bg-gray-50"
              href="https://github.com/AbhijyYdv547/ResumeBuilder"
            >
              <img src={"/git.svg"} alt="" width={30} height={30} />
            </NavbarButton>
            
            
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                href="https://github.com/AbhijyYdv547/ResumeBuilder"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="flex items-center justify-center gap-1 w-full"
              >
                <img src={"/git.svg"} alt="" width={30} height={30} />
                <span className="text-black">Github</span>
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
