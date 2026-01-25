import PropTypes from 'prop-types';

const Button = ({ 
    children, 
    variant = 'primary', 
    className = '', 
    disabled, 
    isLoading,
    type = 'button',
    ...props 
}) => {
    const baseStyles = "w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:active:scale-100 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2";
    
    const variants = {
        primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 hover:shadow-emerald-300",
        secondary: "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300",
        ghost: "bg-transparent hover:bg-gray-100 text-emerald-600 hover:text-emerald-700"
    };

    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                </>
            ) : children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Button;
