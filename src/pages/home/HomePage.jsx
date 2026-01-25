/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../components/layouts/MainLayout"
import ListTransactions from "../../components/fragments/listTransaction"
import { filterTransactions } from '../../redux/transaction.js/transactionReducers';
import BasicSpeedDial from '../../components/elements/BasicSpeedDial';
import TotalDailyTransaction from '../../components/elements/TotalDailyTransaction';
import DateNavigation from '../../components/fragments/DateNavigation/DateNavigation';
import { resetFilterDataTransaction } from '../../utils/helper';

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
            <div className="flex flex-col gap-6">
                <section>
                    <DateNavigation />
                </section>
                
                <section>
                    <TotalDailyTransaction />
                </section>

                <section>
                   <ListTransactions />
                </section>
            </div>
            
            <BasicSpeedDial />
        </MainLayout>
    )
}

export default HomePage