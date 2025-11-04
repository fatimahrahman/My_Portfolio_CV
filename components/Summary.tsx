
import React from 'react';
import { Summary } from '../types';

interface SummaryProps {
    summary: Summary;
}

const SummaryComponent: React.FC<SummaryProps> = ({ summary }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-teal-500 pb-2 mb-4">Professional Summary</h2>
            <p className="text-slate-600 leading-relaxed mb-4">{summary.introduction}</p>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
                {summary.body.map((point, index) => <li key={index}>{point}</li>)}
            </ul>
        </section>
    );
};

export default SummaryComponent;
