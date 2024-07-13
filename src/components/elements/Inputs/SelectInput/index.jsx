/* eslint-disable react/prop-types */
import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectInput = ({values, label, }) => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label={label}
                    onChange={handleChange}
                >
                    {
                        values.map((item, i) => (
                            <MenuItem
                            key={item.name + i}
                            value={item.name}
                            >
                                {item.name}
                            </MenuItem>
                        ))
                    }
                    {/* <MenuItem value={'income'}>Pendapatan</MenuItem>
                    <MenuItem value={'expense'}>Pengeluaran</MenuItem> */}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectInput