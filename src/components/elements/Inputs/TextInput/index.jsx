/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';

export default function TextInput({label, type}) {    

    return (
        <TextField id="outlined-basic" label={label} variant="outlined" type={type} />
    );
}
