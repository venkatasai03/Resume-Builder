import {
  FileText,
  UserPlus,
  LayoutDashboard,
  Eye,
  Download,
  Database,
  Headset,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  BookText,
  BriefcaseBusiness,
  GitBranch,
  MessageCircleDashed,
} from "lucide-react";

export const navItems = [
  { name: "Features", link: "#features" },
  { name: "Templates", link: "#templates" },
  { name: "FAQ", link: "#faq" },
  { name: "Contact", link: "#contact" },
];

export const features = [
  {
    title: "Professional Resume Generation",
    description: "Generate polished, job-ready resumes with minimal effort.",
    icon: <FileText />,
  },
  {
    title: "User Registration & Authentication",
    description:
      "Secure login and registration to manage your resumes anytime.",
    icon: <UserPlus />,
  },
  {
    title: "Intuitive Dashboard",
    description: "Easily manage resume sections with a clean, modern UI.",
    icon: <LayoutDashboard />,
  },
  {
    title: "Live Resume Preview",
    description: "See real-time changes as you edit your resume content.",
    icon: <Eye />,
  },
  {
    title: "PDF Download Support",
    description: "Download high-quality, professional resumes in PDF format.",
    icon: <Download />,
  },
  {
    title: "Built on MERN Stack",
    description: "Fast and scalable with MongoDB, Express, React, and Node.",
    icon: <Database />,
  },
  {
    title: "24/7 Support",
    description: "We're always available to help — AI and human support.",
    icon: <Headset />,
  },
  {
    title: "Job-Ready Assurance",
    description: "We ensure your resume meets the latest hiring standards.",
    icon: <CheckCircle />,
  },
];

export const templates = [
  {
    title: "Classic Template",
    description:
      "Traditional single-column format optimized for readability—best for academic, legal, or government jobs.",
    link: "/classic.jpg",
  },
  {
    title: "Compact Template",
    description:
      "Visually engaging with stylish fonts and layout—perfect for designers, marketers, and creative professionals.",
    link: "/compact.jpg",
  },
  {
    title: "Modern Template",
    description:
      "A clean, minimal layout with bold headings and subtle colors—ideal for corporate, tech, or finance roles.",
    link: "/modern.jpg",
  },
];

export const faqs = [
  {
    title: "Is the resume builder free to use?",
    description:
      "Yes! You can build and download your resume for free. No credit card required.",
    icon: <HelpCircle />,
  },
  {
    title: "Will my data be secure?",
    description:
      "We take privacy seriously. Your data is encrypted and never shared with third parties.",
    icon: <ShieldCheck />,
  },
  {
    title: "Can I download my resume as a PDF?",
    description:
      "Absolutely. You can export your resume anytime in a professional PDF format.",
    icon: <Download />,
  },
  {
    title: "Are the resume templates ATS-friendly?",
    description:
      "Yes, all our templates are designed to be Applicant Tracking System (ATS) compatible.",
    icon: <FileText />,
  },
];

export const socialMedia = [
  {
    id: 1,
    link: "https://github.com/AbhijyYdv547",
    title: "Github",
    icon: <GitBranch />,
  },
  {
    id: 2,
    link: "https://x.com/YadavAbhij50732",
    title: "Twitter",
    icon: <MessageCircleDashed />,
  },
  {
    id: 3,
    link: "https://www.linkedin.com/in/abj-ydv",
    title: "Linkedin",
    icon: <BriefcaseBusiness />,
  },
  {
    id: 4,
    link: "https://dev.to/abhijay_yadav_712e10ab036",
    title: "Dev.to",
    icon: <BookText />,
  },
];
