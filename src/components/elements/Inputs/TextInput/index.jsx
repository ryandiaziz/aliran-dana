/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';

export default function TextInput({ value, label, type, name, onChange }) {

    return (
        <TextField
            id="outlined-basic"
            variant="outlined"
            value={value}
            label={label}
            type={type}
            name={name}
            onChange={onChange}
        />
    );
}
