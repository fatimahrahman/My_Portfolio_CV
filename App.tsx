
import React, { useState, useEffect, useMemo } from 'react';
import { PortfolioData } from './types';
import Header from './components/Header';
import Summary from './components/Summary';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import FilterPanel from './components/FilterPanel';
import CVDownload from './components/CVDownload';

const App: React.FC = () => {
    const [fullData, setFullData] = useState<PortfolioData | null>(null);
    const [filters, setFilters] = useState<string[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    // Removed AI enhancer per request

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/developer.json');
                const data: PortfolioData = await response.json();
                setFullData(data);

                const allRelevanceTags = new Set<string>();
                data.skills.forEach(item => item.relevance.forEach(tag => allRelevanceTags.add(tag)));
                data.experience.forEach(item => item.relevance.forEach(tag => allRelevanceTags.add(tag)));
                data.projects.forEach(item => item.relevance.forEach(tag => allRelevanceTags.add(tag)));
                // Ensure single 'all' option only
                const tags = Array.from(allRelevanceTags).filter(t => t.toLowerCase() !== 'all');
                setFilters(['all', ...tags]);
            } catch (error) {
                console.error("Failed to load portfolio data:", error);
            }
        };
        fetchData();
    }, []);

    const filteredData = useMemo<PortfolioData | null>(() => {
        if (!fullData) return null;
        if (selectedFilter === 'all') return fullData;

        const filterItem = <T extends { relevance: string[] }>(item: T) => item.relevance.includes(selectedFilter);

        return {
            ...fullData,
            skills: fullData.skills.filter(filterItem),
            experience: fullData.experience.filter(filterItem),
            projects: fullData.projects.filter(filterItem),
        };
    }, [fullData, selectedFilter]);

    if (!fullData || !filteredData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl font-semibold">Loading Portfolio...</div>
            </div>
        );
    }
    
    const currentSummary = filteredData.summary;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <Header personal={fullData.personal} />
            
            <main className="mt-8">
                <div className="sticky top-0 bg-slate-50/80 backdrop-blur-md z-10 py-4 mb-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">Tailor Your CV</h2>
                  <FilterPanel filters={filters} selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />
                  <div className="flex items-center justify-end mt-4">
                    <CVDownload data={filteredData} />
                  </div>
                </div>

                <div className="space-y-12">
                    <Summary summary={currentSummary} />
                    <Skills skills={filteredData.skills} />
                    <Experience experience={filteredData.experience} />
                    <Projects projects={filteredData.projects} />
                    <Education education={filteredData.education} />
                </div>
            </main>

             <footer className="text-center mt-16 py-6 border-t border-slate-200">
                <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} {fullData.personal.name}. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
