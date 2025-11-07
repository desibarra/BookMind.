import React from 'react';
import { useBook } from '../contexts/BookContext';

interface StepProps {
    label: string;
    isCurrent: boolean;
    isCompleted: boolean;
}

const Step: React.FC<StepProps> = ({ label, isCurrent, isCompleted }) => {
    const getDotClasses = () => {
        if (isCompleted) return "bg-accent";
        if (isCurrent) return "bg-blue-400 ring-4 ring-accent/50";
        return "bg-gray-700";
    }

    return (
        <div className="flex flex-col items-center text-center flex-shrink-0" style={{ width: '8rem'}}>
            <div className={`w-4 h-4 rounded-full transition-all duration-300 ${getDotClasses()}`}></div>
            <p className={`mt-2 text-xs font-semibold w-full truncate ${isCurrent || isCompleted ? 'text-light' : 'text-gray-500'}`}>{label}</p>
        </div>
    );
};

interface StepProgressProps {
    currentStep: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
    const { t } = useBook();
    const steps = [
        { id: 1, label: t('step_topic') },
        { id: 2, label: t('step_type') },
        { id: 3, label: t('step_purpose') },
        { id: 4, label: t('step_audience') },
        { id: 5, label: t('step_tone') },
        { id: 6, label: t('step_language') },
        { id: 7, label: t('step_structure') },
        { id: 8, label: t('step_customize') },
        { id: 9, label: t('step_cover') },
        { id: 10, label: t('step_result') },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto mb-12 overflow-x-auto pb-4">
            <div className="flex items-start justify-between relative min-w-[70rem]">
                <div className="absolute top-1.5 left-0 w-full h-0.5 bg-gray-700" />
                <div 
                    className="absolute top-1.5 left-0 h-0.5 bg-accent transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`}}
                />
                {steps.map((step) => (
                    <Step
                        key={step.id}
                        label={step.label}
                        isCurrent={currentStep === step.id}
                        isCompleted={currentStep > step.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default StepProgress;