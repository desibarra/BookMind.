import React from 'react';
import { useBook } from '../contexts/BookContext';
import type { LanguageCode } from '../contexts/BookContext';

const LanguageSwitcher: React.FC = () => {
  const { bookState, setBookState } = useBook();

  const languages = [
      { code: 'es', flag: '🇪🇸' },
      { code: 'en', flag: '🇺🇸' },
      { code: 'fr', flag: '🇫🇷' },
      { code: 'de', flag: '🇩🇪' },
  ] as const;

  const getButtonClasses = (langCode: LanguageCode) => {
      const base = "px-3 py-1 text-lg rounded-md transition-colors duration-200";
      if (bookState.language === langCode) {
          return `${base} bg-accent/50 cursor-default`;
      }
      return `${base} hover:bg-gray-700/50`;
  };
  
  return (
    <div className="absolute top-5 right-5 z-20 bg-gray-800/50 p-1 rounded-lg backdrop-blur-sm flex gap-1">
        {languages.map(({ code, flag }) => (
            <button 
                key={code}
                onClick={() => setBookState(prev => ({ ...prev, language: code }))}
                className={getButtonClasses(code)}
                aria-label={code.toUpperCase()}
            >
                {flag}
            </button>
        ))}
    </div>
  );
};

export default LanguageSwitcher;