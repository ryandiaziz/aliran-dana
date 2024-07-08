import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import MainLayout from "../../components/layouts/MainLayout"
import ListTransactions from "../../components/fragments/ListTransactions"

const HomePage = () => {
    return (
        <MainLayout>
            <ListTransactions />
            <Fab color="primary" aria-label="add" sx={{ position:'absolute', bottom: 15, right:15 }}>
                <AddIcon sx={{ color : 'white' }} />
            </Fab>
        </MainLayout>
    )
}

export default HomePage