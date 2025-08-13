'use client';

interface FilterPillsProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const FilterPills = ({ activeFilter, setActiveFilter }: FilterPillsProps) => {
  const filters = ["All", "Professional", "Hobby"];

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeFilter === filter
              ? 'bg-primaryBlue text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterPills; 