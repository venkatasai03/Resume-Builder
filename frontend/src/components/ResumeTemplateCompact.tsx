import { Resume } from "@/types/ResumeTypes";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { flexDirection: "row", fontSize: 11, fontFamily: "Helvetica" },
    sidebar: {
        width: "30%",
        backgroundColor: "#0d3b66",
        color: "white",
        padding: 20,
    },
    main: { width: "70%", padding: 25, backgroundColor: "#f9f9f9" },
    name: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#0d3b66",
        marginTop: 12,
        marginBottom: 6,
    },
    listItem: { marginBottom: 4 },
});

export const ResumeTemplateCompact = ({ resume }:{resume:Resume}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Sidebar */}
            <View style={styles.sidebar}>
                <Text style={styles.name}>{resume.name}</Text>
                <Text>{resume.email}</Text>
                <Text>{resume.phone}</Text>
                <Text>{resume.linkedin}</Text>

                
                <Text style={styles.sectionTitle}>Skills</Text>
                {resume.skills.map((skill, i) => (
                    <Text key={i} style={styles.listItem}>• {skill}</Text>
                ))}
            </View>

            {/* Main */}
            <View style={styles.main}>
                {resume.summary && (
                    <>
                        <Text style={styles.sectionTitle}>Summary</Text>
                        <Text>{resume.summary}</Text>
                    </>
                )}

                <Text style={styles.sectionTitle}>Experience</Text>
                {resume.experience.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                        <Text style={{ fontWeight: "bold" }}>{exp.jobTitle} - {exp.company}</Text>
                        <Text style={{ fontSize: 9, color: "#555" ,marginBottom:4}}>
                            {exp.startDate} - {exp.endDate} {exp.location ? `| ${exp.location}` : ""}
                        </Text>
                        {exp.responsibilities.map((res, idx) => (
                            <Text key={idx} style={styles.listItem}>• {res}</Text>
                        ))}
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Education</Text>
                {resume.education.map((edu, i) => (
                    <Text key={i} style={styles.listItem}>
                        {edu.degree}, {edu.institution} ({edu.graduationYear})
                    </Text>
                ))}

                <Text style={styles.sectionTitle}>Projects</Text>
                {resume.projects.map((proj, i) => (
                    <View key={i} style={{marginBottom:6}}>
                        <Text style={{ fontWeight: "bold" }}>{proj.name}</Text>
                        <Text style={{marginBottom:4}}>{proj.description}</Text>
                        <Text style={{ fontSize: 9, color: "#555" }}>
                            Tech: {proj.technologies.join(", ")}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default ResumeTemplateCompact;
