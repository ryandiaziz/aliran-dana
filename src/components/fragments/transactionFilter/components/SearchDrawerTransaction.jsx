import dayjs from "dayjs";
import { useState } from "react";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useDispatch, useSelector } from 'react-redux';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { IconButton, Switch } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { setTransactionSearch } from '../../../../redux/menu/menuSlice';
import TextInput from '../../../elements/Inputs/TextInput';
import PrimaryButton from '../../../elements/Buttons/PrimaryButton';
import SelectInput from '../../../elements/Inputs/SelectInput';
import useSearchDrawerTransaction from "../useSearchDrawerTransaction";
import { getFilterDataTransaction, resetFilterDataTransaction, setFilterDataTransaction } from "../../../../helper/helper";
import { filterTransactions } from "../../../../redux/transaction.js/transactionReducers";

const SearchDrawerTransaction = () => {
    const dispatch = useDispatch();
    const { categoryItems, accountItems, transactionTypesItems } = useSearchDrawerTransaction();
    const { isOpen, anchor } = useSelector((state) => state.menu.transactionSearch);
    const [formValues, setFormValues] = useState(getFilterDataTransaction());

    const handleClick = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) return;
        dispatch(setTransactionSearch(open));
    }

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: name === 'is_relative_date_enabled' ? checked : value,
        }));
    };

    const handleDateFromChange = (date) => {
        let dateFormat = date.format('YYYY-MM-DD');
        
        setFormValues((prevValues) => ({
            ...prevValues,
            transaction_date_from: dateFormat,
        }));
        if (!formValues.is_relative_date_enabled) {
            setFormValues((prevValues) => ({
                ...prevValues,
                transaction_date_to: dateFormat,
            }));
        }
    };

    const handleDateToChange = (date) => {
        let dateFormat = date.format('YYYY-MM-DD');
        setFormValues((prevValues) => ({
            ...prevValues,
            transaction_date_to: dateFormat,
        }));
    };

    const handleResetFilter = () => {
        resetFilterDataTransaction();
        setFormValues(getFilterDataTransaction());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFilterDataTransaction(formValues);
        dispatch(setTransactionSearch(false));
        dispatch(filterTransactions(getFilterDataTransaction()));
    }

    return (
        <div>
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
                    <TextInput
                        value={formValues.transaction_note}
                        name={'transaction_note'}
                        label={'Note'}
                        onChange={handleChange}
                    />
                    <SelectInput
                        name={'transaction_type'}
                        label={'Transaction Type'}
                        value={formValues.transaction_type}
                        values={transactionTypesItems}
                        onChange={handleChange}
                    />
                    <SelectInput
                        name={'category_id'}
                        label={'Category'}
                        value={formValues.category_id}
                        values={categoryItems}
                        onChange={handleChange}
                    />
                    <SelectInput
                        name={'account_id'}
                        label={'Accounts'}
                        value={formValues.account_id}
                        values={accountItems}
                        onChange={handleChange}
                    />
                    <Switch
                        checked={formValues.is_relative_date_enabled}
                        name='is_relative_date_enabled'
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="From Date"
                            value={dayjs(formValues.transaction_date_from)}
                            onChange={handleDateFromChange}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="To Date"
                            value={formValues.is_relative_date_enabled ? dayjs(formValues.transaction_date_to) : null}
                            onChange={handleDateToChange}
                            minDate={formValues.transaction_date_from ? dayjs(formValues.transaction_date_from) : null}
                            disabled={!formValues.is_relative_date_enabled}
                        />
                    </LocalizationProvider>
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
        </div>
    );
}

export default SearchDrawerTransaction