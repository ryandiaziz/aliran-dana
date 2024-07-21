import dayjs from "dayjs";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from "react-redux";

import SelectInput from "../../components/elements/Inputs/SelectInput";
import TextInput from "../../components/elements/Inputs/TextInput";
import useTransaction from "./useTransaction";
import { useSnackbar } from "notistack";
import { createTransactions } from "../../redux/transaction.js/transactionReducers";
import { useNavigate } from "react-router-dom";

const AddTransactionPage = () => {
    const { transactionTypesItems, categoryItems, accountItems } = useTransaction();
    const { isLoading, isError, errorMessage } = useSelector((state) => state.transaction.create);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [date, setDate] = useState(dayjs());
    const [formValues, setFormValues] = useState({
        transaction_type: "",
        transaction_amount: 0,
        transaction_note: "",
        transaction_date: dayjs().format('DD/MM/YYYY'),
        user_id: 2,
        category_id: "",
        account_id: ""
    });

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'transaction_amount') value = +value;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        let dateFormat = date.format('DD/MM/YYYY');
        setDate(date);
        setFormValues((prevValues) => ({
            ...prevValues,
            transaction_date: dateFormat
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(createTransactions(formValues));

        if (!isLoading) {
            if (isError) {
                enqueueSnackbar(errorMessage, { variant: "error" });
            } else {
                enqueueSnackbar("Berhasil menambahkan", { variant: "success" });
                navigate("/");
            }
        }
    }

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit}
            sx={{ marginInline: 10, marginTop: 5, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <SelectInput
                value={formValues.transaction_type}
                values={transactionTypesItems}
                onChange={handleChange}
                name={'transaction_type'}
                label={'Jenis Transaksi'}
            />
            <SelectInput
                value={formValues.category_id}
                values={categoryItems}
                onChange={handleChange}
                name={'category_id'}
                label={'Kategori'}
            />
            <SelectInput
                value={formValues.account_id}
                values={accountItems}
                onChange={handleChange}
                name={'account_id'}
                label={'Rekening'}
            />
            <TextInput
                label={'Jumlah'}
                type={'number'}
                name={'transaction_amount'}
                value={formValues.transaction_amount}
                onChange={handleChange}
            />
            <TextInput
                label={'Catatan'}
                type={'text'}
                name={'transaction_note'}
                value={formValues.transaction_note}
                onChange={handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    value={date}
                    onChange={handleDateChange}
                    name="transaction_date"
                />
            </LocalizationProvider>
            <Button type="submit" variant="contained" sx={{ color: 'white' }} disabled={isLoading}>SIMPAN</Button>
        </Box>
    )
}

export default AddTransactionPage