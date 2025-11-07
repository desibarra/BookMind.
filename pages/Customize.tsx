import React from 'react';
import { useBook } from '../contexts/BookContext';
import { useNavigate } from 'react-router-dom';
import StepProgress from '../components/StepProgress';
import Layout from '../components/Layout';

// Define the props for the TextArea component
interface TextAreaProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
}

// Define the TextArea component OUTSIDE of the Customize component
const TextArea: React.FC<TextAreaProps> = ({ id, label, placeholder, value, onChange, rows = 3 }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <textarea
            id={id}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-dark/50 border-2 border-gray-700 rounded-lg py-3 px-5 text-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
        />
    </div>
);

const Customize: React.FC = () => {
    const { t, bookState, setBookState, currentStep, setCurrentStep } = useBook();
    const navigate = useNavigate();

    const handleContinue = () => {
        setCurrentStep(currentStep + 1);
        navigate('/generate-cover');
    };

    return (
        <Layout>
            <StepProgress currentStep={currentStep} />
            <h1 className="text-3xl md:text-4xl font-black text-light mb-4 text-center">
                {t('customize_title')}
            </h1>
            <p className="text-md text-gray-400 mb-8 text-center">
               {t('customize_subtitle')}
            </p>

            <div className="w-full max-w-2xl flex flex-col gap-6">
                <TextArea id="dedication" label={t('customize_dedication_label')} placeholder={t('customize_dedication_placeholder')} value={bookState.dedication} onChange={(e) => setBookState(p => ({...p, dedication: e.target.value}))} />
                <TextArea id="authorBio" label={t('customize_author_bio_label')} placeholder={t('customize_author_bio_placeholder')} value={bookState.authorBio} onChange={(e) => setBookState(p => ({...p, authorBio: e.target.value}))} rows={5} />
                <TextArea id="quotes" label={t('customize_quotes_label')} placeholder={t('customize_quotes_placeholder')} value={bookState.quotes} onChange={(e) => setBookState(p => ({...p, quotes: e.target.value}))} />
                <TextArea id="coverSpecs" label={t('customize_cover_specs_label')} placeholder={t('customize_cover_specs_placeholder')} value={bookState.coverSpecs} onChange={(e) => setBookState(p => ({...p, coverSpecs: e.target.value}))} />
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
                    className="bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/50"
                >
                    {t('continue_button')}
                </button>
            </div>
        </Layout>
    );
};

export default Customize;