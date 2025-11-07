import React, { useEffect } from 'react';
import { useBook } from '../contexts/BookContext';
import { useNavigate } from 'react-router-dom';
import StepProgress from '../components/StepProgress';
import Layout from '../components/Layout';
import ReactMarkdown from 'react-markdown';
import { exportAsPdf } from '../services/pdfService';
import { exportAsEpub } from '../services/epubService';

const Result: React.FC = () => {
    const { t, bookState, currentStep, setCurrentStep, resetBook } = useBook();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to start if there's no topic, which means a new session
        if (!bookState.topic) {
            navigate('/');
        }
        setCurrentStep(10);
    }, [bookState.topic, navigate, setCurrentStep]);

    const handleStartOver = () => {
        resetBook();
        navigate('/');
    };

    const handleExportPdf = async () => {
        await exportAsPdf(bookState);
    }
    
    const handleExportEpub = async () => {
        await exportAsEpub(bookState);
    }

    return (
        <Layout>
            <StepProgress currentStep={currentStep} />
            <h1 className="text-3xl md:text-4xl font-black text-light mb-4 text-center">
                {t('result_title')}
            </h1>
            <p className="text-md text-gray-400 mb-8 text-center">
               {t('result_subtitle')}
            </p>

            <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
                {/* Left side: Cover */}
                <div className="flex-shrink-0 w-full md:w-1/3">
                    {bookState.coverImageUrl ? (
                        <img src={bookState.coverImageUrl} alt="Generated book cover" className="w-full rounded-md shadow-lg shadow-accent/20" />
                    ) : (
                        <div className="w-full aspect-[3/4] bg-gray-800 rounded-md flex items-center justify-center">
                            <p className="text-gray-500">{t('cover_placeholder')}</p>
                        </div>
                    )}
                </div>

                {/* Right side: Details */}
                <div className="flex-grow bg-dark/50 p-6 rounded-lg border border-gray-700">
                    <h2 className="text-lg font-bold text-gray-300 mb-2">{t('result_book_title_label')}</h2>
                    <p className="text-2xl font-bold text-accent mb-6">{bookState.title || t('default_book_title')}</p>

                    <h2 className="text-lg font-bold text-gray-300 mb-2">{t('result_book_structure_label')}</h2>
                    <div className="prose prose-sm prose-invert prose-headings:text-accent prose-strong:text-light max-w-none text-left h-64 overflow-y-auto pr-2 border-l-2 border-gray-700 pl-4">
                        <ReactMarkdown>{bookState.structure}</ReactMarkdown>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                <button
                    onClick={handleExportPdf}
                    className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-500 transition-colors"
                >
                    {t('result_export_pdf')}
                </button>
                 <button
                    onClick={handleExportEpub}
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-500 transition-colors"
                >
                    {t('result_export_epub')}
                </button>
                <button
                    onClick={handleStartOver}
                    className="bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    {t('result_start_over')}
                </button>
            </div>
        </Layout>
    );
};

export default Result;
