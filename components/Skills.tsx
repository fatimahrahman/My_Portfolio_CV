
import React, { useMemo } from 'react';
import { Skill } from '../types';

interface SkillsProps {
    skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    const groupedSkills = useMemo(() => {
        return skills.reduce((acc, skill) => {
            const { category } = skill;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(skill);
            return acc;
        }, {} as Record<string, Skill[]>);
    }, [skills]);

    return (
        <section>
            <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-teal-500 pb-2 mb-4">Skills</h2>
            <div className="space-y-4">
                {Object.entries(groupedSkills).map(([category, skillList]) => (
                    <div key={category}>
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {skillList.map(skill => (
                                <span key={skill.name} className="bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
