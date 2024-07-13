import MainLayout from "../../components/layouts/MainLayout";
// import CustomDialog from "../../components/elements/CusDialog";
import SelectInput from "../../components/elements/Inputs/SelectInput";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../components/elements/Inputs/TextInput";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from "react";
import { listCategories } from "../../redux/category/categoryReducers";
import { listAccounts } from "../../redux/account/accountReducers";

const AddTransactionPage = () => {
    const dispatch = useDispatch();
    const transactionTypesItems = [
        {
            name: "Pendapatan"
        },
        {
            name: "Pengeluaran"
        }
    ]
    const { categories } = useSelector((state) => state.category);
    const categoryItems = categories.map((item) => ({ name: item.category_name }));

    const { accounts } = useSelector((state) => state.account);
    const accountItems = accounts.map((item) => ({ name: item.account_name }));

    useEffect(()=>{
        dispatch(listCategories());
        dispatch(listAccounts());
    },[])

    return (
        <MainLayout>
            <Box sx={{ marginInline: 10, marginTop: 5, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <SelectInput
                    values={transactionTypesItems}
                    label={'Jenis Transaksi'}
                />
                <SelectInput
                    values={categoryItems}
                    label={'Kategori'}
                />
                <SelectInput
                    values={accountItems}
                    label={'Rekening'}
                />
                <TextInput
                    label={'Jumlah'}
                    type={'number'}
                />
                <TextInput
                    label={'Catatan'}
                    type={'text'}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker />
                </LocalizationProvider>
                <Button variant="contained" sx={{ color : 'white' }}>SIMPAN</Button>
            </Box>
        </MainLayout>
    )
}

export default AddTransactionPage