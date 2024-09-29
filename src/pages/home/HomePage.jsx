import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch } from "react-redux";

import MainLayout from "../../components/layouts/MainLayout"
import ListTransactions from "../../components/fragments/ListTransactions"
import { listTransactions } from '../../redux/transaction.js/transactionReducers';
import BasicSpeedDial from '../../components/elements/BasicSpeedDial';

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const currentDate = dayjs().format('YYYY-MM-DD');
        dispatch(listTransactions(currentDate));
    }, [dispatch])

    return (
        <MainLayout>
            <ListTransactions />
            <BasicSpeedDial />
        </MainLayout>
    )
}

export default HomePage