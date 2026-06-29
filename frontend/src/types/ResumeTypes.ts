export interface Experience {
    jobTitle: string;
    company: string;
    location?: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
}

export interface Education {
    degree: string,
    institution: string,
    graduationYear: string
}
export interface Project {
    name: string,
    description: string,
    technologies: string[]
}

export interface Resume {
    id: string;          
  userId: string;
    template:string,
    name: string,
    email: string,
    phone: string,
    linkedin: string,
    experience: Experience[],
    skills: string[],
    education: Education[],
    projects: Project[]
    summary?: string,
}