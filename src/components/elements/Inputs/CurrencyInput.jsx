import PropTypes from 'prop-types';
import Input from './Input';

const CurrencyInput = ({ 
    label, 
    value, 
    onChange, 
    name, 
    placeholder = '0',
    ...props 
}) => {
    
    // Format display value with thousand separators
    const formatValue = (val) => {
        if (!val) return '';
        // Ensure it's treated as a string for regex replacement
        const stringVal = val.toString();
        return stringVal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleChange = (e) => {
        // Remove dots to get raw number
        const rawValue = e.target.value.replace(/\./g, '');
        
        // Only allow numbers
        if (/^\d*$/.test(rawValue)) {
            // Call parent onChange with the synthetic event expected structure
            // passing the raw numeric value (or string representation of it)
            onChange({
                target: {
                    name: name,
                    value: rawValue
                }
            });
        }
    };

    return (
        <Input
            label={label}
            name={name}
            value={formatValue(value)}
            onChange={handleChange}
            placeholder={placeholder}
            type="text"
            inputMode="numeric"
            endAdornment={<span className="font-semibold text-gray-500">IDR</span>}
            {...props}
        />
    );
};

CurrencyInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string
};

export default CurrencyInput;
