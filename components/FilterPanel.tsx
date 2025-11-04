
import React from 'react';

interface FilterPanelProps {
    filters: string[];
    selectedFilter: string;
    onSelectFilter: (filter: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, selectedFilter, onSelectFilter }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
                <button
                    key={filter}
                    onClick={() => onSelectFilter(filter)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                        ${selectedFilter === filter 
                            ? 'bg-teal-600 text-white shadow' 
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default FilterPanel;
