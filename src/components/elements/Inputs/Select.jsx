import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Select = ({ 
    label, 
    id, 
    value, 
    onChange, 
    options = [], 
    placeholder = 'Select an option',
    error,
    errorMessage,
    className = '',
    name
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef(null);

    // Find the current selected option label to display
    // Support options as objects with label/value or label/id
    const selectedOption = options.find(opt => (opt.value || opt.id) == value);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm(''); // Reset search when closing
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        // Call onChange with synthetic event structure to match native select usage in parent
        onChange({
            target: {
                name: name,
                value: option.value || option.id
            }
        });
        setIsOpen(false);
        setSearchTerm('');
    };

    const filteredOptions = options.filter(option => {
        const label = option.label || option.name;
        return label.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className={`flex flex-col gap-1.5 ${className}`} ref={containerRef}>
            {label && (
                <label 
                    htmlFor={id || name} 
                    className="text-sm font-medium text-gray-700 ml-1"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full px-4 py-3 rounded-xl border text-left flex justify-between items-center bg-gray-50 
                        transition-all duration-200 outline-none
                        ${isOpen ? 'ring-2 ring-emerald-100 border-emerald-500 bg-white' : ''}
                        ${error 
                            ? 'border-red-300 focus:ring-red-100' 
                            : 'border-gray-200 hover:border-gray-300'
                        }
                    `}
                >
                    <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedOption ? (selectedOption.label || selectedOption.name) : placeholder}
                    </span>
                    <svg 
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto overflow-hidden">
                        <div className="p-2 sticky top-0 bg-white border-b border-gray-50">
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                                onClick={(e) => e.stopPropagation()} 
                            />
                        </div>
                        <div className="p-1">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <button
                                        key={option.value || option.id}
                                        type="button"
                                        onClick={() => handleSelect(option)}
                                        className={`
                                            w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors
                                            ${(option.value || option.id) == value 
                                                ? 'bg-emerald-50 text-emerald-700 font-medium' 
                                                : 'text-gray-700 hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        {option.label || option.name}
                                    </button>
                                ))
                            ) : (
                                <div className="px-3 py-4 text-center text-sm text-gray-400">
                                    No options found
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {error && errorMessage && (
                <span className="text-xs text-red-500 font-medium ml-1 animate-fadeIn">
                    {errorMessage}
                </span>
            )}
        </div>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string
};

export default Select;
