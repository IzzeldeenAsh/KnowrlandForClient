'use client'

interface ViewModeToggleProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 rounded-md p-2">
      <button 
        onClick={() => setViewMode('grid')}
        className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white text-[#299af8] shadow-md' : 'text-gray-400 hover:bg-gray-100'}`}
        aria-label="Grid View"
      >
        <i className={`ki-outline ki-element-11 ${viewMode === 'grid' ? 'text-[#299af8]' : 'text-gray-500'}`} style={{ fontSize: '17px' }}></i>
      </button>
      <button 
        onClick={() => setViewMode('list')}
        className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-[#299af8] shadow-md' : 'text-gray-300 hover:bg-gray-100'}`}
        aria-label="List View"
      >
        <i className={`ki-outline ki-row-horizontal ${viewMode === 'list' ? 'text-[#299af8]' : 'text-gray-500'}`} style={{ fontSize: '17px' }}></i>
      </button>
    </div>
  );
};

export default ViewModeToggle;
