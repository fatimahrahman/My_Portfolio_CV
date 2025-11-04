// Use the official @google/genai client in browser
import { GoogleGenAI } from "@google/genai";
import { PortfolioData } from '../types';

export const enhanceCVSummary = async (data: PortfolioData, focus: string): Promise<string> => {
    // Vite exposes env vars prefixed with VITE_
    const apiKey = import.meta?.env?.VITE_GEMINI_API_KEY || (globalThis as any)?.VITE_GEMINI_API_KEY;

    // If no API key, fall back to a simple deterministic tailoring so UX still works
    if (!apiKey) {
        const base = data.summary.introduction;
        return `${base} This summary is tailored for ${focus} roles by emphasizing the most relevant skills and achievements.`;
    }

    const ai = new GoogleGenAI({ apiKey });

    const relevantSkills = data.skills.map(s => s.name).join(', ');
    const relevantExperience = data.experience
        .map(e => `${e.title} at ${e.company}: ${e.description.join(' ')}`)
        .join('\n');

    const prompt = `
        You are an expert resume writer and career coach for senior technology roles. Your task is to craft a compelling, professional summary for a portfolio, specifically tailored for a '${focus}' position.

        Analyze the candidate's information provided below:
        - Current Summary: "${data.summary.introduction}"
        - Key Skills: ${relevantSkills}
        - Professional Experience: ${relevantExperience}

        Rewrite the summary to be concise, highly impactful, and strategically highlight the most relevant skills and experiences for the '${focus}' role. 
        The tone must be professional, confident, and action-oriented.
        Focus on achievements and quantifiable results where possible based on the context provided.
        Return ONLY the rewritten summary as a single paragraph of text. Do not include any introductory phrases like "Here is the rewritten summary:", markdown formatting, or quotation marks.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: { temperature: 0.7, topP: 0.95 }
        });
        return (response.text || '').trim();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to enhance summary with AI.");
    }
};
