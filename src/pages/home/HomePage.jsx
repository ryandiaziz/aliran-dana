/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../components/layouts/MainLayout"
import ListTransactions from "../../components/fragments/listTransaction"
import { filterTransactions } from '../../redux/transaction.js/transactionReducers';
import BasicSpeedDial from '../../components/elements/BasicSpeedDial';
import TotalDailyTransaction from '../../components/elements/TotalDailyTransaction';
import TransactionFilter from '../../components/fragments/transactionFilter';
import { resetFilterDataTransaction } from '../../helper/helper';

const HomePage = () => {
    const dispatch = useDispatch();
    const { isTransactionInitial } = useSelector((state) => state.transaction)

    useEffect(() => {
        if (isTransactionInitial) {
            resetFilterDataTransaction();
            dispatch(filterTransactions());
        }
    }, [dispatch])

    return (
        <MainLayout>
            <TransactionFilter/>
            <TotalDailyTransaction/>
            <ListTransactions />
            <BasicSpeedDial />
        </MainLayout>
    )
}

export default HomePage