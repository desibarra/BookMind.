// FIX: Implement coverService to generate images using Gemini API
import { GoogleGenAI } from "@google/genai";

// FIX: Initialize GoogleGenAI with API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImage = async (prompt: string): Promise<string> => {
    // FIX: Use imagen-4.0-generate-001 model for high-quality image generation
    const model = 'imagen-4.0-generate-001';

    try {
        // FIX: Use ai.models.generateImages to generate the cover image
        const response = await ai.models.generateImages({
            model: model,
            prompt: prompt,
            config: {
                numberOfImages: 1,
                // FIX: Use an aspect ratio suitable for a book cover
                aspectRatio: '3:4',
                outputMimeType: 'image/png',
            },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0) {
            // FIX: Extract base64 image data and return as a data URL
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
            return imageUrl;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating cover image:", error);
        throw new Error("Failed to generate cover image using Gemini API.");
    }
};
