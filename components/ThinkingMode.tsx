
import React, { useState } from 'react';
import { enhanceCVSummary } from '../services/geminiService';
import { PortfolioData } from '../types';

interface ThinkingModeProps {
    data: PortfolioData;
    focus: string;
    onSummaryEnhanced: (summary: string | null) => void;
    isEnhanced: boolean;
}

const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
);

const ThinkingMode: React.FC<ThinkingModeProps> = ({ data, focus, onSummaryEnhanced, isEnhanced }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleEnhance = async () => {
        if (focus === 'all') {
            setError("Please select a specific career focus to enhance your summary.");
            setTimeout(() => setError(null), 4000);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const newSummary = await enhanceCVSummary(data, focus);
            onSummaryEnhanced(newSummary);
        } catch (err) {
            setError("Failed to generate summary. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleReset = () => {
        onSummaryEnhanced(null);
    }

    return (
        <div className="flex flex-col items-start gap-2">
            {isEnhanced ? (
                <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-500 rounded-md hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                >
                    Reset Summary
                </button>
            ) : (
                <button
                    onClick={handleEnhance}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isLoading ? <LoadingSpinner/> : '✨'}
                    <span>{isLoading ? 'Thinking...' : `Enhance for "${focus}"`}</span>
                </button>
            )}
             {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default ThinkingMode;
