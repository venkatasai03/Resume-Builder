import { Resume } from "@/types/ResumeTypes";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "Helvetica",
        fontSize: 11,
        lineHeight: 1.4,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4,
    },
    contact: {
        fontSize: 10,
        color: "#555",
        marginBottom: 12,
    },
    section: {
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 6,
        borderBottom: "1 solid #000",
        paddingBottom: 2,
    },
    listItem: {
        marginBottom: 3,
    },
    jobTitle: {
        fontWeight: "bold",
        fontSize: 11,
    },
    date: {
        fontSize: 9,
        color: "#555",
    },
});

const ResumeTemplateModern = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <Text style={styles.name}>{resume.name}</Text>
            <Text style={styles.contact}>
                {resume.email} | {resume.phone} | {resume.linkedin}
            </Text>

            {/* Summary */}
            {resume.summary && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <Text>{resume.summary}</Text>
                </View>
            )}

            {/* Skills */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <Text>{resume.skills.join(", ")}</Text>
            </View>

            {/* Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {resume.experience.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                        <Text style={styles.jobTitle}>
                            {exp.jobTitle} - {exp.company}
                        </Text>
                        <Text style={styles.date}>
                            {exp.startDate} - {exp.endDate}
                        </Text>
                        {exp.responsibilities.map((res, idx) => (
                            <Text key={idx} style={styles.listItem}>• {res}</Text>
                        ))}
                    </View>
                ))}
            </View>

            {/* Education */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resume.education.map((edu, i) => (
                    <Text key={i}>
                        {edu.degree}, {edu.institution} ({edu.graduationYear})
                    </Text>
                ))}
            </View>

            {/* Projects */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {resume.projects.map((proj, i) => (
                    <View key={i} style={{ marginBottom: 6 }}>
                        <Text style={styles.jobTitle}>{proj.name}</Text>
                        <Text>
                            {proj.description}
                        </Text>
                        <Text style={{ fontSize: 9 }}>
                            Tech: {proj.technologies.join(", ")}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default ResumeTemplateModern;
