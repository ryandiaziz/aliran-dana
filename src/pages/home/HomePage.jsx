import React, { useEffect } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import MainLayout from "../../components/layouts/MainLayout"
import ListTransactions from "../../components/fragments/ListTransactions"
import CustomDialog from "../../components/elements/CusDialog"
import { listTransactions } from '../../redux/transaction.js/transactionReducers';


// const emails = ['username@gmail.com', 'user02@gmail.com'];

const HomePage = () => {
    const [open, setOpen] = React.useState(false);
    // const { transactions } = useSelector((state) => state.transaction);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        navigate(value);
    };

    useEffect(()=>{
        dispatch(listTransactions());
    },[dispatch])

    return (
        <MainLayout>
            <ListTransactions />
            <Fab onClick={handleClickOpen} color="primary" aria-label="add" sx={{ position:'absolute', bottom: 15, right:15 }}>
                <AddIcon sx={{ color : 'white' }} />
            </Fab>
            {/* {
                transactions.map((v)=>{
                    <p>{v.transaction_id}</p>
                })
            } */}
            <CustomDialog
                open={open}
                onClose={handleClose}
            />
        </MainLayout>
    )
}

export default HomePage