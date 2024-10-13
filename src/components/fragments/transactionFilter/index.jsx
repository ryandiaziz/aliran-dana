/* eslint-disable no-unused-vars */
import { IconButton, styled } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { setTransactionSearch } from '../../../redux/menu/menuSlice';
import { useDispatch } from 'react-redux';
import SearchDrawerTransaction from './components/SearchDrawerTransaction';

const TransactionFilter = () => {
    const dispatch = useDispatch();
    const TransactionFilterContainer = styled('div')({
        minWidth: 56
    });

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
            <TransactionFilterContainer>
                <IconButton edge="end" aria-label="delete" onClick={toggleDrawer(true)}>
                    <FilterAltIcon />
                </IconButton>
            </TransactionFilterContainer>
            <SearchDrawerTransaction/>
        </>
    )
}

export default TransactionFilter