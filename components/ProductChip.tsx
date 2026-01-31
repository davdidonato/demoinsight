import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { ImportanceLevel } from '../types-enhanced';

interface ProductChipProps {
  id: string;
  name: string;
  importance: ImportanceLevel;
  isEdited?: boolean;
  onEdit: (id: string, newImportance: ImportanceLevel) => void;
  onRemove: (id: string) => void;
  timeSpent?: number;
}

const ProductChip: React.FC<ProductChipProps> = ({
  id,
  name,
  importance,
  isEdited,
  onEdit,
  onRemove,
  timeSpent
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getImportanceStyles = (level: ImportanceLevel) => {
    switch (level) {
      case 'High':
        return 'bg-black text-white border-black border-2 font-semibold';
      case 'Medium':
        return 'bg-white text-black border-gray-400 border';
      case 'Low':
        return 'bg-white text-gray-400 border-gray-200 border';
    }
  };

  const handleImportanceChange = (newImportance: ImportanceLevel) => {
    onEdit(id, newImportance);
    setShowDropdown(false);
  };

  return (
    <div 
      className="relative inline-block group"
      data-testid={`product-chip-${id}`}
      ref={dropdownRef}
    >
      <div 
        className={`
          ${getImportanceStyles(importance)}
          px-3 py-2 text-xs font-medium
          transition-all duration-150
          cursor-pointer hover:shadow-md
          flex items-center gap-2
          ${isEdited ? 'ring-1 ring-gray-400' : ''}
        `}
        onClick={() => setShowDropdown(!showDropdown)}
        role="button"
        aria-label={`Edit ${name} importance level`}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setShowDropdown(!showDropdown)}
      >
        <span>{name}</span>
        
        {timeSpent && (
          <span className="text-[10px] opacity-60">
            {timeSpent}m
          </span>
        )}

        <ChevronDown 
          size={12} 
          className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600"
          aria-label={`Remove ${name}`}
          data-testid={`remove-chip-${id}`}
        >
          <X size={12} />
        </button>

        {isEdited && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-gray-600 rounded-full" title="Edited" />
        )}
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div 
          className="absolute top-full mt-1 left-0 bg-white border border-black shadow-lg z-50 min-w-[120px]"
          data-testid="importance-dropdown"
          role="menu"
        >
          <button
            onClick={() => handleImportanceChange('High')}
            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors font-semibold"
            role="menuitem"
            data-testid="importance-high"
          >
            High
          </button>
          <button
            onClick={() => handleImportanceChange('Medium')}
            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors border-t border-gray-200"
            role="menuitem"
            data-testid="importance-medium"
          >
            Medium
          </button>
          <button
            onClick={() => handleImportanceChange('Low')}
            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors border-t border-gray-200 text-gray-600"
            role="menuitem"
            data-testid="importance-low"
          >
            Low
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductChip;
