import List from '@mui/material/List';
import ListItemTrasaction from '../../elements/ListItemTransaction';

import { useSelector } from 'react-redux';
import ShowLoading from '../../elements/Loading';
import TitleText from '../../elements/Texts/TitleText';
import { Box } from '@mui/material';

export default function ListTransactions() {
    const { transactions, isLoading } = useSelector((state) => state.transaction.list);


    return (
        isLoading
            ? <ShowLoading />
            : Object.keys(transactions).map((date) => (
                <Box key={date} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 2,
                    mt: 2
                }}>
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
                </Box>
            ))
    );
}
