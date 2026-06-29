
import { Resume } from '@/types/ResumeTypes';
import { PdfViewer } from './PdfViewer';
import { PDFViewer } from '@react-pdf/renderer';
import ResumeTemplateModern from './ResumeTemplateModern';
import ResumeTemplateClassic from './ResumeTemplateClassic';
import ResumeTemplateCompact from './ResumeTemplateCompact';



const ResumeList = ({ resumes, onDelete }: { resumes: Resume[], onDelete: (id: string) => void }) => {
    const renderTemplate = ({resume}:{resume:Resume}) => {
        switch (resume.template) {
            case "modern":
                return <ResumeTemplateModern resume={resume} />;
            case "compact":
                return <ResumeTemplateCompact resume={resume} />;
            default:
                return <ResumeTemplateClassic resume={resume} />;
        }
    }

    return (
        <div className="w-full max-w-5xl mt-8">
            {resumes.length > 0 ? (
                <div className="flex flex-wrap gap-4 ">
                    {resumes.map((resume) => {
                        return (
                            <div key={resume.id} className="shadow-lg bg-zinc-100 rounded-md">
                                <div className=" w-60 white p-6">
                                    <PDFViewer height="100%" width="100%" key={resume.id}>
                                        {renderTemplate({resume})}
                                    </PDFViewer>
                                    <div className="mt-6">
                                        <PdfViewer resume={resume} template={resume.template} onDelete={()=>onDelete(resume.id)} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-gray-500 mt-4">No resumes found.</p>
            )}
        </div>
)}

export default ResumeList