import React from 'react';
import { useBook } from '../contexts/BookContext';
import { useNavigate } from 'react-router-dom';
import StepProgress from '../components/StepProgress';
import Layout from '../components/Layout';
import Card from '../components/UI/Card';

const options = [
    { id: 'professional', icon: '👔' },
    { id: 'conversational', icon: '👋' },
    { id: 'inspirational', icon: '✨' },
    { id: 'academic', icon: '🔬' },
    { id: 'friendly', icon: '😊' },
];

const Tone: React.FC = () => {
    const { t, bookState, setBookState, currentStep, setCurrentStep } = useBook();
    const navigate = useNavigate();

    const handleContinue = () => {
        if (bookState.tone) {
            setCurrentStep(currentStep + 1);
            navigate('/language');
        }
    };

    return (
        <Layout>
            <StepProgress currentStep={currentStep} />
            <h1 className="text-3xl md:text-4xl font-black text-light mb-4 text-center">
                {t('tone_title')}
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 w-full max-w-4xl my-8">
                {options.map(option => (
                     <Card 
                        key={option.id}
                        id={option.id}
                        icon={option.icon}
                        title={t(`tone_${option.id}`)}
                        description={t(`tone_${option.id}_desc`)}
                        isSelected={bookState.tone === option.id}
                        onSelect={(id) => setBookState(prev => ({...prev, tone: id}))}
                    />
                ))}
            </div>

            {bookState.tone && (
                <div className="w-full max-w-xl p-4 bg-dark/50 border-l-4 border-accent rounded-r-lg">
                    <p className="text-sm italic text-gray-300">
                        {t(`tone_${bookState.tone}_preview`)}
                    </p>
                </div>
            )}
            
            <div className="flex items-center gap-4 mt-8">
                 <button
                    onClick={() => { setCurrentStep(currentStep - 1); navigate(-1); }}
                    className="text-gray-400 font-semibold py-3 px-8 rounded-full hover:bg-gray-800/50 transition-all duration-300"
                >
                    {t('back_button')}
                </button>
                <button 
                    onClick={handleContinue}
                    disabled={!bookState.tone}
                    className="bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                >
                    {t('continue_button')}
                </button>
            </div>
        </Layout>
    );
};

export default Tone;