/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ListItemTransactionText from "./ListItemTransactionText";
import ListItemTransactionIcon from "./ListItemTransactionIcon";
import ListItemContainer from "../ListItemContainer";
import TransactionType from '../../../enums/TransactionType';

const ListItemTrasaction = ({ transactionData }) => {
    return (
        <ListItemContainer>
            <ListItemTransactionIcon transactionType={transactionData.transaction_type}>
                {
                    transactionData.transaction_type === TransactionType.Income || transactionData.transaction_type === TransactionType.Expense
                        ? <AttachMoneyIcon />
                        : <SwapVertIcon />
                }
            </ListItemTransactionIcon>
            <ListItemTransactionText
                transactionAmount={transactionData.transaction_amount}
                transactionType={transactionData.transaction_type}
                transactionDate={transactionData.transaction_date}
                transactionNote={transactionData.transaction_note}
                accountName={transactionData.account.account_name}
                categoryName={transactionData.category.category_name}
            />
        </ListItemContainer>
    )
}

export default ListItemTrasaction