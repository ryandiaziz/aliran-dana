/* eslint-disable react/prop-types */
import { styled } from '@mui/material';
import PrimaryText from '../Texts/PrimaryText';
import Wrapper from '../Wrapper';
import SecondaryText from '../Texts/SecondaryText';
import AmountText from '../Texts/AmoutText';
import { showDateTime, showRupiah } from '../../../utils/helper';

const ListItemTransactionText = ({
    transactionType,
    transactionAmount,
    transactionNote,
    transactionDate,
    categoryName,
    accountName
}) => {
    const ListItemTransactionText = styled('div')({
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

    const wrapperStyle2 = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'end'
    }

    return (
        <ListItemTransactionText>
            <Wrapper style={wrapperStyle1}>
                <PrimaryText text={categoryName} />
                <SecondaryText text={`${accountName} - ${transactionNote}`} />
            </Wrapper>
            <Wrapper style={wrapperStyle2}>
                <AmountText
                    text={showRupiah(transactionAmount)}
                    category={transactionType}
                />
                <SecondaryText text={showDateTime(transactionDate)} />
            </Wrapper>
        </ListItemTransactionText>
    )
}

export default ListItemTransactionText;