
import React from 'react';
import { Experience as ExperienceType } from '../types';

interface ExperienceProps {
    experience: ExperienceType[];
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-teal-500 pb-2 mb-4">Experience</h2>
            <div className="space-y-8">
                {experience.map((job, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-1/4 text-sm text-slate-500">
                            <p className="font-semibold">{job.period}</p>
                            <p>{job.location}</p>
                        </div>
                        <div className="sm:w-3/4">
                            <h3 className="text-lg font-semibold text-slate-800">{job.title}</h3>
                            <p className="text-md font-medium text-slate-600">{job.company}</p>
                            <ul className="mt-2 space-y-2 list-disc list-inside text-slate-600">
                                {job.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {job.technologies.map(tech => (
                                    <span key={tech} className="bg-slate-200 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
