import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

export default function TextInput({ value, label, type, name, onChange, inputMode = 'text' }) {
    return (
        <TextField
            sx={{ width: '100%' }}
            id="outlined-basic"
            variant="outlined"
            value={value}
            label={label}
            type={type}
            name={name}
            onChange={onChange}
            inputMode={inputMode}
        />
    );
}

TextInput.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    inputMode: PropTypes.string
}