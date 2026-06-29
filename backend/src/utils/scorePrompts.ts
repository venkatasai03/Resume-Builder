interface ScoreProps {
    profileData: {
        name: string;
        bio: string;
        followers: number;
        following: number;
        publicRepos: number;
        createdAt: string;
        lastUpdated: string;
        totalStars: number;
        languages: Set<unknown>;

    }
}

export const genScorePrompt = ({ profileData }: ScoreProps): string => {
    const languages = Array.from(profileData.languages).join(", ");

    const scorePrompt = `
        You are an experienced open-source and developer profile evaluator.

        Evaluate the following GitHub profile based on these three criteria:

        1. **Enthusiasm** - Activity level, consistency, and passion for development.
        2. **Open Source Involvement (OSS)** - Contributions to public repositories, collaboration, and community interaction.
        3. **Code/Project Quality** - Thoughtfulness of projects, documentation, repo structure, and meaningful content.

        Profile Details:
        - Name: ${profileData.name}
        - Bio: ${profileData.bio}
        - Followers: ${profileData.followers}
        - Following: ${profileData.following}
        - Public Repositories: ${profileData.publicRepos}
        - Total Stars Across Repositories: ${profileData.totalStars}
        - Languages Used: ${languages}
        - GitHub Account Created On: ${profileData.createdAt}
        - Last Active On: ${profileData.lastUpdated}

        Give a single score from **0 to 10**, factoring in all the above categories. 
        **Only return the number. Do not include any text or explanation.**`;

    return scorePrompt;
}



export const genAdvicePrompt = ({ profileData }: ScoreProps): string => {
    const languages = Array.from(profileData.languages).join(", ");

    const result = 
        `You are an expert GitHub profile reviewer and career mentor for software developers.

        Carefully analyze the following GitHub profile details and provide constructive feedback on how to improve it:

        - Name: ${profileData.name}
        - Bio: ${profileData.bio}
        - Followers: ${profileData.followers}
        - Following: ${profileData.following}
        - Public Repositories: ${profileData.publicRepos}
        - Total Stars Across Repos: ${profileData.totalStars}
        - Programming Languages Used: ${languages}
        - Account Created On: ${profileData.createdAt}
        - Last GitHub Activity: ${profileData.lastUpdated}

        Based on the data above, give exactly **30 words** of actionable advice focusing on areas such as code quality, contribution activity, project diversity, visibility, or community engagement. Be direct and helpful.`

    return result;
}
