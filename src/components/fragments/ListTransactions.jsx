import List from '@mui/material/List';
import ListItemTrasaction from '../elements/ListItemTransaction';

export default function ListTransactions() {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItemTrasaction
                category={'income'}
            />
            <ListItemTrasaction
                category={'expense'}
            />
            <ListItemTrasaction
                category={'expense'}
            />
            <ListItemTrasaction
                category={'income'}
            />            
        </List>
    );
}
