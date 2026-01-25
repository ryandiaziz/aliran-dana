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
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label 
                    htmlFor={id || name} 
                    className="text-sm font-medium text-gray-700 ml-1"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id={id || name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`
                        w-full px-4 py-3 rounded-xl border appearance-none outline-none transition-all duration-200
                        bg-gray-50 focus:bg-white
                        text-gray-900
                        ${error 
                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                            : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 hover:border-gray-300'
                        }
                    `}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option) => (
                        <option 
                            key={option.value || option.id} 
                            value={option.value || option.id}
                        >
                            {option.label || option.name}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
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
