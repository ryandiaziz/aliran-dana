/* eslint-disable no-unused-vars */
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { setTransactionSearch } from '../../../redux/menu/menuSlice';
import { useDispatch } from 'react-redux';
import SearchDrawerTransaction from './components/SearchDrawerTransaction';

const TransactionFilter = () => {
    const dispatch = useDispatch();
    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) return;
        dispatch(setTransactionSearch(open));
    };
    return (
        <>
            <button 
                onClick={toggleDrawer(true)}
                className="p-3 text-gray-600 hover:text-emerald-600 transition-colors"
                aria-label="Filter transactions"
            >
                <FilterAltIcon />
            </button>
            <SearchDrawerTransaction/>
        </>
    )
}

export default TransactionFilter