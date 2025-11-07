import { GoogleGenAI } from "@google/genai";
import type { BookState } from "../contexts/BookContext";

// FIX: Initialize GoogleGenAI with a named apiKey parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateBookStructure = async (bookState: BookState): Promise<string> => {
    const {
        topic,
        bookType,
        purpose,
        purposeDetail,
        audience,
        audienceDetail,
        tone,
        language
    } = bookState;

    const langMap: { [key: string]: string } = {
        en: 'English',
        es: 'Spanish',
        fr: 'French',
        de: 'German'
    };

    const prompt = `
        You are an expert book author and structure designer. Your task is to generate a detailed book structure or table of contents in Markdown format.

        Book Details:
        - Topic: ${topic}
        - Book Type: ${bookType}
        - Main Purpose: ${purpose}. ${purposeDetail}
        - Target Audience: ${audience}. ${audienceDetail}
        - Tone: ${tone}
        - Language: ${langMap[language]}

        Based on these details, create a comprehensive book structure. It should include:
        1. A compelling book title as a main heading (H1). The title should be extracted from this H1.
        2. A list of chapters with descriptive titles (H2).
        3. For each chapter, provide a brief summary or a list of key points to be covered.
        4. The structure should be logical and flow well from one chapter to the next.

        Format the entire output as Markdown.
        
        Example Output:
        # Book Title
        
        ## Chapter 1: Introduction
        - Brief overview of the topic.
        - What the reader will learn.
        
        ## Chapter 2: Core Concepts
        - Key point 1
        - Key point 2
        
        ... and so on.
    `;

    try {
        // FIX: Use ai.models.generateContent for text generation.
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.7,
                topP: 0.9,
            }
        });
        
        // FIX: Access the generated text directly from the .text property.
        return response.text.trim();
    } catch (error) {
        console.error("Error generating book structure:", error);
        throw new Error("Failed to generate book structure. Please try again.");
    }
};
