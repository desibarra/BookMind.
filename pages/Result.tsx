import React, { useEffect } from 'react';
import { useBook } from '../contexts/BookContext';
import { useNavigate } from 'react-router-dom';
import StepProgress from '../components/StepProgress';
import Layout from '../components/Layout';
import ReactMarkdown from 'react-markdown';
import { exportAsPdf } from '../services/pdfService';
import { exportAsEpub } from '../services/epubService';

const Result: React.FC = () => {
    const { t, bookState, setCurrentStep } = useBook();
    const navigate = useNavigate();

    useEffect(() => {
        if (!bookState.topic) {
            navigate('/');
        }
        setCurrentStep(10);
    }, [bookState.topic, navigate, setCurrentStep]);
    
    const handleStartOver = () => {
        window.location.hash = '/';
        window.location.reload();
    }

    return (
        <Layout>
            <StepProgress currentStep={10} />
            <h1 className="text-3xl md:text-4xl font-black text-light mb-2 text-center">
                {t('result_title')}
            </h1>
            <p className="text-md text-gray-400 mb-8 text-center">
                {t('result_subtitle')}
            </p>

            <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
                {/* Left side: Cover and details */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                    <img 
                        src={bookState.coverImageUrl || 'https://via.placeholder.com/300x400.png?text=No+Cover'} 
                        alt="Book Cover" 
                        className="w-full rounded-lg shadow-2xl mb-6 aspect-[3/4] object-cover bg-gray-800"
                    />
                    <h2 className="text-2xl font-bold text-accent">{bookState.title}</h2>
                    <p className="text-gray-300 mt-2">{t('result_topic')}: {bookState.topic}</p>
                    <p className="text-gray-300">{t('result_type')}: {t(`book_type_${bookState.bookType}`)}</p>
                </div>

                {/* Right side: Structure and export */}
                <div className="w-full md:w-2/3 bg-dark/50 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-bold text-light mb-4">{t('result_structure_title')}</h3>
                    <div className="prose prose-invert prose-sm max-h-96 overflow-y-auto pr-4">
                        <ReactMarkdown>{bookState.structure}</ReactMarkdown>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={() => exportAsPdf(bookState)} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-500 transition-colors w-full sm:w-auto">
                            {t('result_export_pdf')}
                        </button>
                        <button onClick={() => exportAsEpub(bookState)} className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-500 transition-colors w-full sm:w-auto">
                           {t('result_export_epub')}
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={handleStartOver}
                className="mt-12 text-gray-400 font-semibold py-3 px-8 rounded-full hover:bg-gray-800/50 transition-all duration-300"
            >
                {t('result_start_over')}
            </button>
        </Layout>
    );
};

export default Result;
