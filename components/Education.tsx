
import React from 'react';
import { Education as EducationType } from '../types';

interface EducationProps {
    education: EducationType[];
}

const Education: React.FC<EducationProps> = ({ education }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-teal-500 pb-2 mb-4">Education</h2>
            <div className="space-y-4">
                {education.map((edu, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-semibold text-slate-800">{edu.degree}</h3>
                        <p className="text-md text-slate-600">{edu.institution}</p>
                        <p className="text-sm text-slate-500">{edu.period}</p>
                        {edu.details && <p className="text-sm text-slate-500 mt-1">{edu.details}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;
