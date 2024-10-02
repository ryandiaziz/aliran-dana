import React from "react";
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import CategoryIcon from '@mui/icons-material/Category';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import MainLayout from "../../components/layouts/MainLayout";
import useData from "../../helper/useData";
import ListItemContainer from "../../components/elements/ListItemContainer";
import Wrapper from '../../components/elements/Wrapper';
import PrimaryText from "../../components/elements/Texts/PrimaryText";
import SecondaryText from "../../components/elements/Texts/SecondaryText";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDialogOpen } from "../../redux/dialog/dialogSlice";
import { setSelectedCategory } from "../../redux/category/categorySlice";
import ShowLoading from "../../components/elements/Loading";

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const renderCategoryItems = (items, onClick, dispatch) => {
    const ListItemContent = styled('div')({
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBlock: 6,
        minWidth: 0,
        height: 40,
    });

    const wrapperStyle1 = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }

    const handleDeleteCategory = (e, id) => {
        e.stopPropagation();
        dispatch(setDialogOpen({
            type: 'delete-category',
            data: id,
            desc: 'Deleting this will affect the related transaction data'
        }));
    }

    return items.map((item, i) => (
        <ListItemContainer key={item.name + i} onClick={() => onClick(item)}>
            <ListItemAvatar>
                <Avatar sx={{ backgroundColor: item.type === 'income' ? '#50B498' : '#DF826C' }}>
                    <CategoryIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemContent>
                <Wrapper style={wrapperStyle1}>
                    <PrimaryText text={item.name} />
                    <SecondaryText text={item.type} />
                </Wrapper>
                <IconButton edge="end" aria-label="delete" onClick={(e) => handleDeleteCategory(e, item.value)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemContent>
        </ListItemContainer>
    ));
}

const CategoriesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryItems } = useData();
    const [dense] = React.useState(false);
    const { list } = useSelector((state) => state.category);

    const handleOnClick = (category) => {
        dispatch(setSelectedCategory(category));
        navigate(`/categories/${category.name}`)
    }

    return (
        <>
            <MainLayout>
                {
                    list.isLoading ? <ShowLoading />
                        : <Grid item xs={12} md={6}>
                            <Demo>
                                <List dense={dense}>
                                    {renderCategoryItems(categoryItems, handleOnClick, dispatch)}
                                </List>
                            </Demo>
                        </Grid>
                }
            </MainLayout>
            <Fab onClick={() => navigate("/categories/add-category")} color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 30, right: 30 }}>
                <AddIcon sx={{ color: 'white' }} />
            </Fab>
        </>
    )
}

export default CategoriesPage