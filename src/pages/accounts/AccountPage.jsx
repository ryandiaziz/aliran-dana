import React from "react";
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import MainLayout from "../../components/layouts/MainLayout";
import useData from "../../helper/useData";
import ListItemContainer from "../../components/elements/ListItemContainer";
import Wrapper from '../../components/elements/Wrapper';
import PrimaryText from "../../components/elements/Texts/PrimaryText";
import SecondaryText from "../../components/elements/Texts/SecondaryText";
import { showRupiah } from "../../helper/helper";
import { useNavigate } from "react-router-dom";

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const renderAccountItems = (items) => {
    const wrapperStyle1 = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }

    return items.map((item, i) => (
        <ListItemContainer key={item.name + i}>
            <ListItemAvatar>
                <Avatar>
                    <AccountBalanceIcon />
                </Avatar>
            </ListItemAvatar>
            <Wrapper style={wrapperStyle1}>
                <PrimaryText text={item.name} />
                <SecondaryText text={showRupiah(item.balance)} />
            </Wrapper>
            <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </ListItemContainer>
    ));
}

const AccountPage = () => {
    const { accountItems } = useData();
    const navigate = useNavigate();
    const [dense] = React.useState(false);
    const [secondary] = React.useState(false);

    return (
        <>
            <MainLayout>
                <Grid item xs={12} md={6}>
                    <Demo>
                        <List dense={dense}>
                            {renderAccountItems(accountItems, secondary)}
                        </List>
                    </Demo>
                </Grid>
            </MainLayout>            
            <Fab onClick={()=> navigate("/accounts/add-account")} color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 30, right: 30 }}>
                <AddIcon sx={{ color: 'white' }} />
            </Fab>
        </>
    )
}

export default AccountPage