import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { generateBookStructure } from '../services/geminiService';
import { generateBookCover as generateCoverService } from '../services/coverService';
import en from '../locales/en.js';
import es from '../locales/es.js';

const translations: { [key: string]: { [key: string]: string } } = { en, es };

export type LanguageCode = 'en' | 'es' | 'fr' | 'de';

export interface BookState {
    topic: string;
    bookType: string;
    purpose: string;
    purposeDetail: string;
    audience: string;
    audienceDetail: string;
    tone: string;
    language: LanguageCode;
    structure: string;
    title: string;
    dedication: string;
    authorBio: string;
    quotes: string;
    coverSpecs: string;
    coverImageUrl: string;
}

interface BookContextType {
    bookState: BookState;
    setBookState: React.Dispatch<React.SetStateAction<BookState>>;
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    isGenerating: boolean;
    error: string | null;
    t: (key: string) => string;
    generateStructure: () => Promise<boolean>;
    generateCover: () => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBook = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBook must be used within a BookProvider');
    }
    return context;
};

const initialState: BookState = {
    topic: '',
    bookType: '',
    purpose: '',
    purposeDetail: '',
    audience: '',
    audienceDetail: '',
    tone: '',
    language: 'en',
    structure: '',
    title: '',
    dedication: '',
    authorBio: '',
    quotes: '',
    coverSpecs: '',
    coverImageUrl: '',
};

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [bookState, setBookState] = useState<BookState>(initialState);
    const [currentStep, setCurrentStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const t = useCallback((key: string): string => {
        // Fallback to English if a key is missing in the selected language
        return translations[bookState.language]?.[key] || translations['en']?.[key] || key;
    }, [bookState.language]);
    
    const generateStructure = async () => {
        setIsGenerating(true);
        setError(null);
        try {
            const structure = await generateBookStructure(bookState);
            const titleMatch = structure.match(/^#\s*(.*)/);
            const title = titleMatch ? titleMatch[1] : bookState.topic;
            setBookState(prev => ({ ...prev, structure, title }));
            return true;
        } catch (e) {
            const err = e as Error;
            setError(err.message);
            return false;
        } finally {
            setIsGenerating(false);
        }
    };

    const generateCover = async () => {
        setIsGenerating(true);
        setError(null);
        try {
            const imageUrl = await generateCoverService(bookState);
            setBookState(prev => ({ ...prev, coverImageUrl: imageUrl }));
        } catch (e) {
            const err = e as Error;
            setError(err.message);
        } finally {
            setIsGenerating(false);
        }
    };
    
    const value = useMemo(() => ({
        bookState,
        setBookState,
        currentStep,
        setCurrentStep,
        isGenerating,
        error,
        t,
        generateStructure,
        generateCover,
    }), [bookState, currentStep, isGenerating, error, t]);

    return (
        <BookContext.Provider value={value}>
            {children}
        </BookContext.Provider>
    );
};
