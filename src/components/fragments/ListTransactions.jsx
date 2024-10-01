import List from '@mui/material/List';
import ListItemTrasaction from '../elements/ListItemTransaction';

import { useSelector } from 'react-redux';
import Loading from '../elements/Loading';

export default function ListTransactions() {
    const { transactions, isLoading } = useSelector((state) => state.transaction.list);

    return (
        isLoading
            ? <Loading/>
            : <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    transactions.map((transaction) => (
                        <ListItemTrasaction
                            key={transaction.transaction_id}
                            transactionData={transaction}
                        />
                    ))
                }
            </List>
    );
}
