/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { styled } from "@mui/material"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import ListItemTransactionText from "./ListItemTransactionText";
import ListItemTransactionIcon from "./ListItemTransactionIcon";

const ListItemTrasaction = ({ transactionData }) => {
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
            <ListItemTransactionIcon transactionType={transactionData.transaction_type}>
                <AttachMoneyIcon />
            </ListItemTransactionIcon>
            <ListItemTransactionText
                transactionAmount={transactionData.transaction_amount}
                transactionType={transactionData.transaction_type}
                transactionDate={transactionData.transaction_date}
                transactionNote={transactionData.transaction_note}
                accountName={transactionData.account.account_name}
                categoryName={transactionData.category.category_name}
            />
        </ListItemTransactionContainer>
    )
}

export default ListItemTrasaction