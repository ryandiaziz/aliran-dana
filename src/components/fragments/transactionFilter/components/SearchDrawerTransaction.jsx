import dayjs from "dayjs";
import { useState } from "react";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useDispatch, useSelector } from 'react-redux';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { IconButton } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { setTransactionSearch } from '../../../../redux/menu/menuSlice';
import TextInput from '../../../elements/Inputs/TextInput';
import PrimaryButton from '../../../elements/Buttons/PrimaryButton';
import SelectInput from '../../../elements/Inputs/SelectInput';
import useSearchDrawerTransaction from "../useSearchDrawerTransaction";
import { getFilterData, setFilterData } from "../../../../helper/helper";
import { filterTransactions } from "../../../../redux/transaction.js/transactionReducers";

const SearchDrawerTransaction = () => {
    const dispatch = useDispatch();
    const [date, setDate] = useState(dayjs());
    const {categoryItems, accountItems, transactionTypesItems} = useSearchDrawerTransaction();
    const { isOpen, anchor } = useSelector((state) => state.menu.transactionSearch);
    const [formValues, setFormValues] = useState(getFilterData());

    const handleClick = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) return;
        dispatch(setTransactionSearch(open));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        let dateFormat = date.format('YYYY-MM-DD');
        setDate(date);
        setFormValues((prevValues) => ({
            ...prevValues,
            transaction_date: dateFormat,
        }));
    };

    const handleResetFilter = () => {
        setFormValues({
            user_id: 2,
            account_id: '0',
            category_id: '0',
            transaction_note: '',
            transaction_type: 'all',
            transaction_date: dayjs().format('YYYY-MM-DD')
        });
        setDate(dayjs());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFilterData(formValues);
        dispatch(setTransactionSearch(false));
        dispatch(filterTransactions());
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={date}
                            onChange={handleDateChange}
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