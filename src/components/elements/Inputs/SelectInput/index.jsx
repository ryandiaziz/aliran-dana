/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectInput = ({name, value, values, label, onChange }) => {    

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={name}
                    value={value}
                    label={label}
                    onChange={onChange}
                >
                    {
                        values.map((item, i) => (
                            <MenuItem
                            key={i}
                            value={item.value}
                            >
                                {item.name}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectInput