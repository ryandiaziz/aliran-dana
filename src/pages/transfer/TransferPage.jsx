/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';

import SelectInput from "../../components/elements/Inputs/SelectInput";
import TextInput from "../../components/elements/Inputs/TextInput";
import useData from "../../utils/useData";
import { transferTransactions } from "../../redux/transaction.js/transactionReducers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const TransferPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { accountItems } = useData();
    const { enqueueSnackbar } = useSnackbar();
    const [date, setDate] = useState(dayjs());
    const [isInitialRender, setIsInitialRender] = useState(true);
    const { isLoading, isError, errorMessage } = useSelector((state) => state.transaction.transfer);
    const [formValues, setFormValues] = useState({
        from_account: "",
        to_account: "",
        transaction_amount: 0,
        admin_fee: 0,
        transaction_date: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
    });

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'transaction_amount' || name === 'admin_fee') value = parseInt(value);

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        let dateFormat = date.format('YYYY-MM-DD HH:mm:ss.SSS');
        setDate(date);
        setFormValues((prevValues) => ({
            ...prevValues,
            transaction_date: dateFormat,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(transferTransactions(formValues));
    }

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
            return;
        }

        if (!isLoading) {
            if (isError) {
                enqueueSnackbar(errorMessage, { variant: "error" });
            } else {
                enqueueSnackbar("Berhasil menambahkan", { variant: "success" });
                navigate("/");
            }
        }
    }, [isLoading])

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit}
            sx={{ marginInline: 'auto', marginTop: '64px', paddingInline: 2, paddingBlock: 2, maxWidth: 768, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <SelectInput
                value={formValues.from_account}
                values={accountItems}
                onChange={handleChange}
                name={'from_account'}
                label={'From Account'}
            />
            <SelectInput
                value={formValues.to_account}
                values={accountItems}
                onChange={handleChange}
                name={'to_account'}
                label={'To Account'}
            />
            <TextInput
                label={'Amount'}
                type={'number'}
                inputMode="numeric"
                name={'transaction_amount'}
                value={formValues.transaction_amount}
                onChange={handleChange}
            />
            <TextInput
                label={'Admin Fee'}
                type={'number'}
                inputMode="numeric"
                name={'admin_fee'}
                value={formValues.admin_fee}
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

export default TransferPage