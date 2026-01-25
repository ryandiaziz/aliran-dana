import PropTypes from 'prop-types';

const Input = ({ 
    label, 
    type = 'text', 
    id, 
    error, 
    errorMessage, 
    className = '',
    endAdornment,
    ...props 
}) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label 
                    htmlFor={id} 
                    className="text-sm font-medium text-gray-700 ml-1"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={id}
                    type={type}
                    className={`
                        w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none
                        bg-gray-50 focus:bg-white
                        placeholder-gray-400 text-gray-900
                        ${error 
                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                            : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 hover:border-gray-300'
                        }
                        ${endAdornment ? 'pr-12' : ''}
                    `}
                    {...props}
                />
                {endAdornment && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {endAdornment}
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

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    className: PropTypes.string,
    endAdornment: PropTypes.node
};

export default Input;
