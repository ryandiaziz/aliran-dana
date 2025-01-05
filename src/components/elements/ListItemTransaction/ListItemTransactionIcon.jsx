import { styled } from '@mui/material';
import PropTypes from "prop-types";
import TransactionType from '../../../enums/TransactionType';

const ListItemTransactionIcon = ({ children, transactionType }) => {
    const Container = styled('div')({
        minWidth: 56
    });

    const IconWrapper = styled('div')(({ theme }) => ({
        background: transactionType === TransactionType.Income || transactionType === TransactionType.ReceiveBalance
            ? theme.palette.income.main
            : theme.palette.expense.main,
        borderRadius: '50%',
        height: 40,
        width: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    }));

    return (
        <Container>
            <IconWrapper>
                {children}
            </IconWrapper>
        </Container>
    )
}

ListItemTransactionIcon.propTypes = {
    children: PropTypes.node,
    transactionType: PropTypes.string
}

export default ListItemTransactionIcon;