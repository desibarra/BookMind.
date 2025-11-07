import React from 'react';
import { useBook } from '../contexts/BookContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const BookIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const Welcome: React.FC = () => {
  const { t, bookState, setBookState, setCurrentStep } = useBook();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookState.topic.trim()) {
        setCurrentStep(2);
        navigate('/book-type');
    }
  };

  return (
    <Layout>
        <BookIcon />
        <h1 className="text-4xl md:text-5xl font-black text-light mb-4 text-center">
          {t('welcome_title')}
        </h1>
        
        <form onSubmit={handleSubmit} className="w-full max-w-xl mt-8 flex flex-col items-center gap-4">
            <input
              type="text"
              value={bookState.topic}
              onChange={(e) => setBookState(prev => ({ ...prev, topic: e.target.value }))}
              placeholder={t('welcome_placeholder')}
              className="w-full bg-dark/50 border-2 border-gray-700 rounded-full py-4 px-6 text-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              aria-label={t('welcome_placeholder')}
              required
            />
            <button 
                type="submit"
                disabled={!bookState.topic.trim()}
                className="bg-gradient-to-r from-secondary to-accent text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
            >
                {t('welcome_button')}
            </button>
        </form>
    </Layout>
  );
};

export default Welcome;