// SECURITY FIX: The Gemini SDK is no longer imported on the client to prevent API key exposure.

export class ApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export interface SuggestedTask {
    title: string;
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    labels: string[];
}


/**
 * SECURITY FIX & ARCHITECTURAL REFACTOR: This function now simulates calling a backend endpoint.
 * Making calls to the Gemini API directly from the client is a major security risk
 * as it would expose the API key. In a production application, this logic must exist
 * on a secure backend server. The frontend calls an endpoint on that server,
 * which then makes the authenticated request to the Gemini API.
 * 
 * This function will now simulate a failed API call to the backend and throw an error.
 */
export const suggestTasksForTemplate = async (templateName: string): Promise<SuggestedTask[]> => {
    console.log(`[AI Service] Calling backend endpoint: POST /api/ai/suggest with templateName: "${templateName}"`);

    try {
        // In a real app, this would be a fetch call:
        // const response = await fetch('/api/ai/suggest', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ templateName }),
        // });
        // if (!response.ok) {
        //     throw new Error(`API request failed with status ${response.status}`);
        // }
        // return await response.json();
        
        // --- MOCK IMPLEMENTATION ---
        // To simulate a non-existent backend, we'll throw an error.
        // This represents a network error or a 5xx response from the server.
        throw new Error("Simulated network error: Failed to fetch.");

    } catch (error) {
        console.error(
            "AI feature failed: Could not connect to the backend service. " +
            "This is expected in a development environment without a running backend proxy.",
            error
        );
        throw new ApiError("The AI suggestion service is currently unavailable. Please try again later or contact support.");
    }
};
