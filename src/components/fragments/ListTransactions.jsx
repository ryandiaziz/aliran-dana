import List from '@mui/material/List';
import ListItemTrasaction from '../elements/ListItemTransaction';
import { useSelector } from 'react-redux';

export default function ListTransactions() {
    const {transactions} = useSelector((state) => state.transaction.list);

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
