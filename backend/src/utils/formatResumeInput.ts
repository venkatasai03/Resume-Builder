interface Experience{
    jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Education{
    degree: string,
    institution: string,
    graduationYear:string
}
interface Project{
    name: string,
    description: string,
    technologies:string[]
}

interface FormatResumeProps{
    experience:Experience[],
    education:Education[],
    projects:Project[]
}


export const formatResumeInput = ({experience,education,projects}:FormatResumeProps)=>{
    const formattedExperience = Array.isArray(experience) && experience.length > 0
      ? experience
        .filter((exp) => exp.jobTitle && exp.company) 
        .map((exp) => ({
          jobTitle: exp.jobTitle.trim(),
          company: exp.company.trim(),
          location: exp.location?.trim() || "N/A",
          startDate: exp.startDate,
          endDate: exp.endDate,
          responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities : [],
        }))
      : [];

   const formattedEducation = education?.length
      ? education.map((edu) => ({
        degree: edu.degree,
        institution: edu.institution,
        graduationYear: edu.graduationYear,
      }))
      : [];


  const formattedProjects = projects?.length
      ? projects.map((proj) => ({
        name: proj.name,
        description: proj.description,
        technologies: proj.technologies,
      }))
      : [];

    return{
        formattedExperience,
        formattedEducation,
        formattedProjects
    }  
}