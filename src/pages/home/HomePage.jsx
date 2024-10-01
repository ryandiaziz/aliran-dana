/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../components/layouts/MainLayout"
import ListTransactions from "../../components/fragments/ListTransactions"
import { listTransactions } from '../../redux/transaction.js/transactionReducers';
import BasicSpeedDial from '../../components/elements/BasicSpeedDial';
import { getCurrentDate } from '../../helper/helper';
import TotalDailyTransaction from '../../components/elements/TotalDailyTransaction';

const HomePage = () => {
    const dispatch = useDispatch();
    const { isTransactionInitial } = useSelector((state) => state.transaction)

    useEffect(() => {
        if (isTransactionInitial) dispatch(listTransactions(getCurrentDate()));
    }, [dispatch])

    return (
        <MainLayout>
            <TotalDailyTransaction/>
            <ListTransactions />
            <BasicSpeedDial />
        </MainLayout>
    )
}

export default HomePage