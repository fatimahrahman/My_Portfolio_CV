
export interface PersonalInfo {
    name: string;
    title: string;
    contact: {
        email: string;
        phone?: string;
        location?: string;
        linkedin: string;
        github?: string;
        website?: string;
    };
}

export interface Summary {
    introduction: string;
    body: string[];
}

export interface Skill {
    name: string;
    category: string;
    relevance: string[];
}

export interface Experience {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string[];
    technologies: string[];
    relevance: string[];
}

export interface Project {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    relevance: string[];
}

export interface Education {
    degree: string;
    institution: string;
    period: string;
    details?: string;
}

export interface PortfolioData {
    personal: PersonalInfo;
    summary: Summary;
    skills: Skill[];
    experience: Experience[];
    projects: Project[];
    education: Education[];
}
