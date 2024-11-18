import List from '@mui/material/List';
import ListItemTrasaction from '../../elements/ListItemTransaction';

import { useSelector } from 'react-redux';
import ShowLoading from '../../elements/Loading';
import Wrapper from '../../elements/Wrapper';
import TitleText from '../../elements/Texts/TitleText';

export default function ListTransactions() {
    const { transactions, isLoading } = useSelector((state) => state.transaction.list);


    return (
        isLoading
            ? <ShowLoading />
            : Object.keys(transactions).map((date) => (
                <Wrapper key={date} style={{ marginTop: '1em' }}>
                    <TitleText text={date} />
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {
                            transactions[date].map((transaction) => (
                                <ListItemTrasaction
                                    key={transaction.transaction_id}
                                    transactionData={transaction}
                                />
                            ))
                        }
                    </List>
                </Wrapper>
            ))
    );
}
