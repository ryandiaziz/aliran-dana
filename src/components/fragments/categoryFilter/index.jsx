/* eslint-disable no-unused-vars */
import { IconButton, styled } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { setCategorySearch } from '../../../redux/menu/menuSlice';
import { useDispatch } from 'react-redux';
import SearchDrawerCategory from './components/SearchDrawerCategory';

const CategoryFilter = () => {
    const dispatch = useDispatch();
    const CategoryFilterContainer = styled('div')({
        minWidth: 56
    });

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) return;
        dispatch(setCategorySearch(open));
    };
    return (
        <>
            <CategoryFilterContainer>
                <IconButton edge="end" aria-label="delete" onClick={toggleDrawer(true)}>
                    <FilterAltIcon />
                </IconButton>
            </CategoryFilterContainer>
            <SearchDrawerCategory/>
        </>
    )
}

export default CategoryFilter