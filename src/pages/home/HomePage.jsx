import React, { useEffect } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import MainLayout from "../../components/layouts/MainLayout"
import ListTransactions from "../../components/fragments/ListTransactions"
import CustomDialog from "../../components/elements/CusDialog"
import { listTransactions } from '../../redux/transaction.js/transactionReducers';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);    

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
            <CustomDialog
                open={open}
                onClose={handleClose}
            />
        </MainLayout>
    )
}

export default HomePage