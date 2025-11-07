import React from 'react';
import { useBook } from '../contexts/BookContext';
import { useNavigate } from 'react-router-dom';
import StepProgress from '../components/StepProgress';
import Layout from '../components/Layout';

const GenerateCover: React.FC = () => {
    const { t, bookState, generateCover, isGenerating, error, currentStep, setCurrentStep } = useBook();
    const navigate = useNavigate();

    const handleGenerate = async () => {
        await generateCover();
    };

    const handleContinue = () => {
        setCurrentStep(currentStep + 1);
        navigate('/result');
    };

    return (
        <Layout>
            <StepProgress currentStep={currentStep} />
            <h1 className="text-3xl md:text-4xl font-black text-light mb-4 text-center">
                {t('cover_title')}
            </h1>
            <p className="text-md text-gray-400 mb-8 text-center">
               {t('cover_subtitle')}
            </p>

            <div className="w-full max-w-md p-6 bg-dark/50 border border-gray-700 rounded-lg flex flex-col items-center gap-6">
                {bookState.coverImageUrl ? (
                    <img src={bookState.coverImageUrl} alt="Generated book cover" className="w-full rounded-md shadow-lg" />
                ) : (
                    <div className="w-full aspect-[3/4] bg-gray-800 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">{t('cover_placeholder')}</p>
                    </div>
                )}
                
                {isGenerating && (
                    <div className="flex items-center gap-2 text-accent">
                         <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-accent"></div>
                         <span>{t('cover_generating')}</span>
                    </div>
                )}
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="bg-gray-700 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                    {bookState.coverImageUrl ? t('cover_regenerate_button') : t('cover_generate_button')}
                </button>
            </div>
            
            <div className="flex items-center gap-4 mt-8">
                 <button
                    onClick={() => { setCurrentStep(currentStep - 1); navigate(-1); }}
                    className="text-gray-400 font-semibold py-3 px-8 rounded-full hover:bg-gray-800/50 transition-all duration-300"
                >
                    {t('back_button')}
                </button>
                <button 
                    onClick={handleContinue}
                    disabled={!bookState.coverImageUrl || isGenerating}
                    className="bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                >
                    {t('continue_button')}
                </button>
            </div>
        </Layout>
    );
};

export default GenerateCover;
