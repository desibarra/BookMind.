import React from 'react';
import { useBook } from '../contexts/BookContext';
import type { LanguageCode } from '../contexts/BookContext';

const languages: { code: LanguageCode; flag: string }[] = [
    { code: 'en', flag: '🇺🇸' },
    { code: 'es', flag: '🇪🇸' },
    { code: 'fr', flag: '🇫🇷' },
    { code: 'de', flag: '🇩🇪' },
];

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useBook();

    return (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1.5 text-lg rounded-md transition-all duration-200 ${
                        language === lang.code
                            ? 'bg-accent/30 ring-2 ring-accent'
                            : 'bg-dark/50 hover:bg-dark'
                    }`}
                    title={`Switch to ${lang.code.toUpperCase()}`}
                >
                    {lang.flag}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
