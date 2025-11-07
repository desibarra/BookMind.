import React from 'react';

interface CardProps {
    id: string;
    icon: string;
    title: string;
    description: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ id, icon, title, description, isSelected, onSelect }) => {
    
    const cardClasses = `
        relative p-4 md:p-6 rounded-lg border-2
        cursor-pointer transition-all duration-200
        text-center w-full flex flex-col items-center justify-start gap-2 aspect-square
        ${isSelected
            ? 'bg-accent/20 border-accent ring-2 ring-accent/50'
            : 'bg-dark/30 border-gray-700 hover:border-gray-500 hover:bg-dark/50'
        }
    `;

    return (
        <div 
            onClick={() => onSelect(id)} 
            className={cardClasses} 
            role="button" 
            tabIndex={0} 
            onKeyDown={(e) => e.key === 'Enter' && onSelect(id)}
        >
            <span className="text-3xl md:text-4xl">{icon}</span>
            <h3 className="font-bold text-sm md:text-md text-light">{title}</h3>
            <p className="text-xs text-gray-400 hidden md:block">{description}</p>
        </div>
    );
};

export default Card;
