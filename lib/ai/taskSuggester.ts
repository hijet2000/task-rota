// FIX: Implement task suggestion logic using Gemini API.
import { GoogleGenAI, Type } from "@google/genai";

export interface SuggestedTask {
    title: string;
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    labels: string[];
}

// FIX: Initialize GoogleGenAI with a named apiKey parameter as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const suggestTasksForTemplate = async (templateName: string): Promise<SuggestedTask[]> => {
    const prompt = `
        You are an expert project manager.
        Generate a list of 5 to 7 common tasks for a new project template called "${templateName}".
        For each task, provide a title, a priority ('Low', 'Medium', 'High', or 'Urgent'), and a list of relevant labels.
        Return the list as a JSON array.
    `;
    
    try {
        // FIX: Use ai.models.generateContent with the correct model and config as per guidelines.
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: {
                                type: Type.STRING,
                                description: "The title of the task."
                            },
                            priority: {
                                type: Type.STRING,
                                description: "The priority of the task, can be 'Low', 'Medium', 'High', or 'Urgent'."
                            },
                            labels: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.STRING,
                                },
                                description: "A list of relevant labels for the task."
                            }
                        },
                        required: ["title", "priority", "labels"]
                    },
                },
            },
        });

        // FIX: Extract text directly from response object as per guidelines.
        const jsonStr = response.text.trim();
        const suggestions: SuggestedTask[] = JSON.parse(jsonStr);
        return suggestions;

    } catch (error) {
        console.error("Error generating task suggestions:", error);
        // Fallback to mock data on error
        return [
            { title: 'Task suggestion 1', priority: 'Medium', labels: ['example'] },
            { title: 'Task suggestion 2', priority: 'High', labels: ['example', 'critical'] },
        ];
    }
};
