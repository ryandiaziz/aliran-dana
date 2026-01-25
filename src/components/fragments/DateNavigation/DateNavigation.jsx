import { useState, useEffect } from 'react';
import { 
    ChevronLeft as ChevronLeftIcon, 
    ChevronRight as ChevronRightIcon,
    CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { filterTransactions } from '../../../redux/transaction.js/transactionReducers';
import { getFilterDataTransaction, setFilterDataTransaction } from '../../../utils/helper';
import dayjs from 'dayjs';
import TransactionFilter from '../../fragments/transactionFilter';

const DateNavigation = () => {
    const dispatch = useDispatch();
    const [currentDate, setCurrentDate] = useState(dayjs());

    // Initialize state from existing filter if available
    useEffect(() => {
        const filter = getFilterDataTransaction();
        if (filter && filter.transaction_date_from) {
            setCurrentDate(dayjs(filter.transaction_date_from));
        }
    }, []);

    const updateFilterDate = (newDate) => {
        const dateStr = newDate.format('YYYY-MM-DD');
        const currentFilter = getFilterDataTransaction();
        const newFilter = {
            ...currentFilter,
            transaction_date_from: dateStr,
            transaction_date_to: dateStr
        };
        setFilterDataTransaction(newFilter);
        setCurrentDate(newDate);
        dispatch(filterTransactions());
    };

    const handlePreviousDay = () => {
        const newDate = currentDate.subtract(1, 'day');
        updateFilterDate(newDate);
    };

    const handleNextDay = () => {
        const newDate = currentDate.add(1, 'day');
        updateFilterDate(newDate);
    };

    const formatDate = (date) => {
        return date.format('ddd, D MMM YYYY');
    };

    return (
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
            <div className="flex items-center bg-white p-1 rounded-xl border border-gray-200 shadow-sm flex-1">
                <button 
                    onClick={handlePreviousDay}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                >
                    <ChevronLeftIcon />
                </button>

                <div className="flex-1 flex items-center justify-center gap-2 text-gray-800 font-medium px-2 py-1">
                    <CalendarIcon className="text-emerald-500 text-sm" fontSize="small" />
                    <span className="whitespace-nowrap text-sm md:text-base">{formatDate(currentDate)}</span>
                </div>

                <button 
                    onClick={handleNextDay}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                >
                    <ChevronRightIcon />
                </button>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <TransactionFilter />
            </div>
        </div>
    );
};

export default DateNavigation;
