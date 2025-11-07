import React, { useEffect, useState } from 'react';
import { useBook } from '../contexts/BookContext';
import { useNavigate } from 'react-router-dom';
import StepProgress from '../components/StepProgress';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const GenerateStructure: React.FC = () => {
    const { t, bookState, setBookState, error, isGenerating, currentStep, setCurrentStep } = useBook();
    const navigate = useNavigate();
    const [editableStructure, setEditableStructure] = useState(bookState.structure || '');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!bookState.topic) {
            navigate('/');
        }
        setEditableStructure(bookState.structure || '');
    }, [bookState.structure, bookState.topic, navigate]);

    const handleContinue = () => {
        setBookState(prev => ({...prev, structure: editableStructure}));
        setCurrentStep(currentStep + 1);
        navigate('/customize');
    };

    return (
        <Layout>
            <StepProgress currentStep={currentStep} />
            <h1 className="text-3xl md:text-4xl font-black text-light mb-4 text-center">
                {t('structure_title')}
            </h1>
            <p className="text-md text-gray-400 mb-8 text-center">
               {t('structure_subtitle')} "{bookState.topic}".
            </p>
            <div className="w-full max-w-3xl p-4 md:p-6 bg-dark/50 border border-gray-700 rounded-lg min-h-[400px]">
                {error ? (
                    <p className="text-red-400 bg-red-900/30 px-4 py-2 rounded-md text-center">{error}</p>
                ) : (
                    <>
                        <div className="text-right mb-4">
                            <button onClick={() => setIsEditing(!isEditing)} className="text-sm text-accent font-semibold hover:underline">
                                {isEditing ? 'Vista Previa' : 'Editar'}
                            </button>
                        </div>
                        {isEditing ? (
                             <textarea
                                value={editableStructure}
                                onChange={(e) => setEditableStructure(e.target.value)}
                                className="w-full h-[400px] bg-primary/50 p-4 rounded-md text-light border border-gray-600 focus:ring-accent focus:border-accent"
                             />
                        ) : (
                            <div className="prose prose-invert prose-headings:text-accent prose-strong:text-light w-full max-w-none text-left">
                               <ReactMarkdown>{editableStructure}</ReactMarkdown>
                            </div>
                        )}
                    </>
                )}
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
                    disabled={isGenerating || !bookState.structure}
                    className="bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                >
                    {t('continue_button')}
                </button>
            </div>
        </Layout>
    );
};

export default GenerateStructure;