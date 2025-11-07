import React from 'react';
import { useBook } from '../contexts/BookContext';
import { useNavigate } from 'react-router-dom';
import StepProgress from '../components/StepProgress';
import Layout from '../components/Layout';
import Card from '../components/UI/Card';

const options = [
    { id: 'inspire', icon: '🌟' },
    { id: 'educate', icon: '🧠' },
    { id: 'entertain', icon: '😂' },
    { id: 'position', icon: '👑' },
    { id: 'sell', icon: '💸' },
];

const Purpose: React.FC = () => {
    const { t, bookState, setBookState, currentStep, setCurrentStep } = useBook();
    const navigate = useNavigate();

    const handleContinue = () => {
        if (bookState.purpose) {
            setCurrentStep(currentStep + 1);
            navigate('/audience');
        }
    };

    return (
        <Layout>
            <StepProgress currentStep={currentStep} />
            <h1 className="text-3xl md:text-4xl font-black text-light mb-4 text-center">
                {t('purpose_title')}
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 w-full max-w-4xl my-8">
                {options.map(option => (
                     <Card 
                        key={option.id}
                        id={option.id}
                        icon={option.icon}
                        title={t(`purpose_${option.id}`)}
                        description={t(`purpose_${option.id}_desc`)}
                        isSelected={bookState.purpose === option.id}
                        onSelect={(id) => setBookState(prev => ({...prev, purpose: id}))}
                    />
                ))}
            </div>

            <div className="w-full max-w-xl">
                 <label htmlFor="purposeDetail" className="block text-sm font-medium text-gray-300 mb-2">{t('purpose_detail_label')}</label>
                 <input
                    type="text"
                    id="purposeDetail"
                    value={bookState.purposeDetail}
                    onChange={(e) => setBookState(p => ({...p, purposeDetail: e.target.value}))}
                    placeholder={t('purpose_detail_placeholder')}
                    className="w-full bg-dark/50 border-2 border-gray-700 rounded-lg py-3 px-5 text-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                 />
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
                    disabled={!bookState.purpose}
                    className="bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                >
                    {t('continue_button')}
                </button>
            </div>
        </Layout>
    );
};

export default Purpose;