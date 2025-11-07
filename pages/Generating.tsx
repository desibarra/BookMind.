import React, { useEffect } from 'react';
import { useBook } from '../contexts/BookContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Generating: React.FC = () => {
    const { t, generateStructure, setCurrentStep } = useBook();
    const navigate = useNavigate();

    useEffect(() => {
        const generate = async () => {
            const result = await generateStructure();
            setCurrentStep(7); // Move to the next step
            if (result) {
                navigate('/generate-structure');
            } else {
                // Handle error, maybe navigate back or show message
                navigate('/language'); 
            }
        };
        generate();
    }, [generateStructure, navigate, setCurrentStep]);

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-accent"></div>
                <h1 className="text-2xl font-bold text-accent mt-4">{t('generating_title')}</h1>
                <p className="text-gray-400">{t('generating_subtitle')}</p>
            </div>
        </Layout>
    );
};

export default Generating;
