import React from 'react';
import { useBook } from '../contexts/BookContext';
import { useNavigate } from 'react-router-dom';
import StepProgress from '../components/StepProgress';
import Layout from '../components/Layout';
import Card from '../components/UI/Card';
import type { LanguageCode } from '../contexts/BookContext';

const options = [
    { id: 'es', flag: '🇪🇸' },
    { id: 'en', flag: '🇺🇸' },
    { id: 'fr', flag: '🇫🇷' },
    { id: 'de', flag: '🇩🇪' },
];

const Language: React.FC = () => {
    const { t, bookState, setBookState, currentStep, setCurrentStep } = useBook();
    const navigate = useNavigate();

    const handleContinue = () => {
        if (bookState.language) {
            setCurrentStep(currentStep + 1);
            navigate('/generating');
        }
    };
    
    return (
        <Layout>
            <StepProgress currentStep={currentStep} />
            <h1 className="text-3xl md:text-4xl font-black text-light mb-4 text-center">
                {t('language_title')}
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl my-8">
                {options.map(option => (
                    <Card 
                        key={option.id}
                        id={option.id}
                        icon={option.flag}
                        title={t(`language_${option.id}`)}
                        description={t(`language_${option.id}_desc`)}
                        isSelected={bookState.language === option.id}
                        onSelect={(id) => setBookState(prev => ({...prev, language: id as LanguageCode}))}
                    />
                ))}
            </div>
            
            <div className="flex items-center gap-4">
                 <button
                    onClick={() => { setCurrentStep(currentStep - 1); navigate(-1); }}
                    className="text-gray-400 font-semibold py-3 px-8 rounded-full hover:bg-gray-800/50 transition-all duration-300"
                >
                    {t('back_button')}
                </button>
                <button 
                    onClick={handleContinue}
                    disabled={!bookState.language}
                    className="bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                >
                    {t('continue_button')}
                </button>
            </div>
        </Layout>
    );
};

export default Language;