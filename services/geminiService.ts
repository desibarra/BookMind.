// FIX: Implement geminiService to generate book structure using Gemini API
import { GoogleGenAI } from "@google/genai";
import type { BookState } from '../contexts/BookContext';

// FIX: Initialize GoogleGenAI with API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBookStructure = async (bookState: BookState): Promise<string> => {
    // FIX: Use gemini-2.5-flash model for this text generation task
    const model = 'gemini-2.5-flash';

    const prompt = `
        Generate a detailed book structure in Markdown format for a '${bookState.bookType}' book on the topic of "${bookState.topic}".
        The main purpose of the book is to "${bookState.purpose}". ${bookState.purposeDetail ? `Specifically, ${bookState.purposeDetail}.` : ''}
        The target audience is ${bookState.audience}. ${bookState.audienceDetail ? `More details on the audience: ${bookState.audienceDetail}.` : ''}
        The tone of the book should be ${bookState.tone}.
        The book will be written in ${bookState.language}.

        Please provide a comprehensive structure including a book title, chapters, and brief descriptions for what each chapter should cover.
        The output MUST be in Markdown format.
        Start with the book title as a main heading (e.g., # Book Title).
        Follow with chapters as level 2 headings (e.g., ## Chapter 1: Introduction) and sub-sections as level 3 headings if necessary.
    `;

    try {
        // FIX: Use ai.models.generateContent to generate the book structure
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        
        // FIX: Return the text from the response
        return response.text;
    } catch (error) {
        console.error("Error generating book structure:", error);
        throw new Error("Failed to generate book structure using Gemini API.");
    }
};
