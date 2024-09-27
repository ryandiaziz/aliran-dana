import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import MainLayout from "../../components/layouts/MainLayout"
import ListTransactions from "../../components/fragments/ListTransactions"
import CustomDialog from "../../components/elements/CusDialog"
import { listTransactions } from '../../redux/transaction.js/transactionReducers';
import BasicSpeedDial from '../../components/elements/BasicSpeedDial';

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

    useEffect(() => {
        const currentDate = dayjs().format('YYYY-MM-DD');
        dispatch(listTransactions(currentDate));
    }, [dispatch])

    return (
        <>
            <MainLayout>
                <ListTransactions />
                <CustomDialog
                    open={open}
                    onClose={handleClose}
                />
            </MainLayout>
            <BasicSpeedDial/>
            {/* <Fab onClick={handleClickOpen} color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 30, right: 30 }}>
                <AddIcon sx={{ color: 'white' }} />
            </Fab> */}
        </>
    )
}

export default HomePage