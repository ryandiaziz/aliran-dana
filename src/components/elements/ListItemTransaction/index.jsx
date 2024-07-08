/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { styled } from "@mui/material"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import ListItemTransactionText from "./ListItemTransactionText";
import ListItemTransactionIcon from "./ListItemTransactionIcon";

const ListItemTrasaction = ({ category }) => {
    const ListItemTransactionContainer = styled('li')(({ theme }) => ({
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textDecoration: 'none',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'left',
        padding: '8px 16px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#F5F7F8'
        }
    }))

    return (
        <ListItemTransactionContainer>
            <ListItemTransactionIcon category={category}>
                <AttachMoneyIcon />
            </ListItemTransactionIcon>
            <ListItemTransactionText category={category} />
        </ListItemTransactionContainer>
    )
}

export default ListItemTrasaction