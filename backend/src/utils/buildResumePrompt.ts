interface BuildResumeProps{
    name:string,
    skills:string[],
    summary?:string,
}

export const buildResumePrompt = ({name, skills, summary}:BuildResumeProps) : string =>{
              
const skillList = Array.isArray(skills) ? skills.join(", ") : "relevant skills";

const sanitizedSummary = summary?.trim() || 
`Create a professional and concise resume summary (3-4 sentences) for a candidate named ${name}. 
They have experience and strengths in the following areas: ${skillList}. 
Focus on impact, personality, and career goals without repeating skills too much.`

    

return sanitizedSummary;
}