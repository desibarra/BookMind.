import { GoogleGenAI } from "@google/genai";
import type { BookState } from "../contexts/BookContext";

// FIX: Initialize GoogleGenAI with a named apiKey parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateBookCover = async (bookState: BookState): Promise<string> => {
    const { topic, bookType, coverSpecs, title } = bookState;

    const prompt = `
        Design a professional and compelling book cover.
        
        - Book Title: "${title || topic}"
        - Book Type / Genre: ${bookType}
        - Core Topic: ${topic}
        - Specific Design Instructions: ${coverSpecs || 'The design should be modern, clean, and eye-catching.'}

        Create an image that would be suitable for a bestseller. Avoid putting any text on the image. The style should be visually striking and relevant to the topic.
    `;

    try {
        // FIX: Use ai.models.generateImages for image generation.
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                aspectRatio: '3:4', // Common book cover aspect ratio
                outputMimeType: 'image/png'
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            // FIX: Access the generated image bytes correctly.
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/png;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating book cover:", error);
        throw new Error("Failed to generate book cover. Please try again.");
    }
};
