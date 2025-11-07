import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { generateBookStructure } from '../services/geminiService';
import { generateImage } from '../services/coverService';
import en from '../locales/en.js';
import es from '../locales/es.js';
import fr from '../locales/fr.js';
import de from '../locales/de.js';

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
    // Customization
    dedication: string;
    authorBio: string;
    quotes: string;
    coverSpecs: string;
    coverImageUrl: string;
}

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

interface BookContextType {
    bookState: BookState;
    setBookState: React.Dispatch<React.SetStateAction<BookState>>;
    isGenerating: boolean;
    error: string | null;
    generateStructure: () => Promise<boolean>;
    generateCover: () => Promise<void>;
    resetBook: () => void;
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    t: (key: string) => string;
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

const translations: Record<LanguageCode, Record<string, string>> = { en, es, fr, de };

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [bookState, setBookState] = useState<BookState>(initialState);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [language, setLanguage] = useState<LanguageCode>('en');

    const t = useCallback((key: string): string => {
        return translations[language]?.[key] || translations['en']?.[key] || key;
    }, [language]);
    
    useEffect(() => {
        setBookState(prev => ({...prev, language}));
    }, [language]);

    const resetBook = () => {
        setBookState(initialState);
        setCurrentStep(1);
        setError(null);
    };

    const generateStructure = async () => {
        setIsGenerating(true);
        setError(null);
        try {
            const structure = await generateBookStructure(bookState);
            const titleMatch = structure.match(/^#\s*(.*)/);
            const title = titleMatch ? titleMatch[1] : t('default_book_title');
            
            setBookState(prev => ({ ...prev, structure, title }));
            return true;
        } catch (e) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : t('error_generating_structure');
            setError(errorMessage);
            return false;
        } finally {
            setIsGenerating(false);
        }
    };
    
    const generateCover = async () => {
        setIsGenerating(true);
        setError(null);
        try {
            const coverPrompt = `A book cover for a ${bookState.bookType} book titled "${bookState.title || bookState.topic}" about ${bookState.topic}. The tone should be ${bookState.tone}. ${bookState.coverSpecs}`;
            const imageUrl = await generateImage(coverPrompt);
            setBookState(prev => ({ ...prev, coverImageUrl: imageUrl }));
        } catch (e) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : t('error_generating_cover');
            setError(errorMessage);
        } finally {
            setIsGenerating(false);
        }
    };


    return (
        <BookContext.Provider value={{ bookState, setBookState, isGenerating, error, generateStructure, generateCover, resetBook, currentStep, setCurrentStep, t, language, setLanguage }}>
            {children}
        </BookContext.Provider>
    );
};

export const useBook = (): BookContextType => {
    const context = useContext(BookContext);
    if (context === undefined) {
        throw new Error('useBook must be used within a BookProvider');
    }
    return context;
};
