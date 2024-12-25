import { useState } from "react";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useDispatch, useSelector } from 'react-redux';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { IconButton } from '@mui/material';

import { setCategorySearch } from '../../../../redux/menu/menuSlice';
import PrimaryButton from '../../../elements/Buttons/PrimaryButton';
import SelectInput from '../../../elements/Inputs/SelectInput';
import useSearchDrawerCategory from "../useSearchDrawerCategory";
import { getFilterDataCategory, resetFilterDataCategory, setFilterDataCategory } from "../../../../utils/helper";
import { setCategoriesFilter } from "../../../../redux/category/categorySlice";

const SearchDrawerCategory = () => {
    const dispatch = useDispatch();
    const { transactionTypesItems } = useSearchDrawerCategory();
    const { isOpen, anchor } = useSelector((state) => state.menu.categorySearch);
    const [formValues, setFormValues] = useState(getFilterDataCategory());

    const handleClick = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) return;
        dispatch(setCategorySearch(open));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleResetFilter = () => {
        setFormValues(resetFilterDataCategory());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFilterDataCategory(formValues);
        dispatch(setCategorySearch(false));
        dispatch(setCategoriesFilter(formValues.transaction_type));
    }

    return (
        <SwipeableDrawer
            anchor={anchor}
            open={isOpen}
            onClose={handleClick(false)}
            onOpen={handleClick(true)}
        >
            <Box
                sx={{ width: 300, padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
                component={'form'}
                onSubmit={handleSubmit}
            >
                <SelectInput
                    name={'transaction_type'}
                    label={'Transaction Type'}
                    value={formValues.transaction_type}
                    values={transactionTypesItems}
                    onChange={handleChange}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <PrimaryButton
                        text='Filter'
                        type='submit'
                    />
                    <IconButton onClick={handleResetFilter}>
                        <FilterAltOffIcon />
                    </IconButton>
                </Box>
            </Box>
        </SwipeableDrawer>
    );
}

export default SearchDrawerCategory