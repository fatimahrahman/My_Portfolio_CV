
import React from 'react';
import { Project } from '../types';

interface ProjectsProps {
    projects: Project[];
}

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
    </svg>
);


const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-teal-500 pb-2 mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-800">{project.title}</h3>
                        <p className="mt-2 text-slate-600 text-sm">{project.description}</p>
                        {project.link && (
                            <a
                              href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-teal-600 hover:underline mt-3"
                            >
                                <LinkIcon />
                                View Project
                            </a>
                        )}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.technologies.map(tech => (
                                <span key={tech} className="bg-slate-200 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
