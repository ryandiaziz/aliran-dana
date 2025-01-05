import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AmountText from '../Texts/AmoutText';
import PrimaryText from '../Texts/PrimaryText';
import { TransactionType } from '../../../enums/Index.js';
import { showRupiah } from '../../../utils/helper';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';

const TotalDailyTransaction = () => {
    const { count } = useSelector((state) => state.transaction);

    return (
        <Card variant="outlined" sx={{ backgroundColor: 'white' }}>
            <Box>
                <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center', padding: 2 }}
                >
                    <PrimaryText text={'Income'} />
                    <AmountText category={TransactionType.Income} text={showRupiah(count.income)} />
                </Stack>
                <Divider />
                <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center', padding: 2 }}
                >
                    <PrimaryText text={'Expense'} />
                    <AmountText category={TransactionType.Expense} text={showRupiah(count.expense)} />
                </Stack>
                <Divider />
                <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center', padding: 2 }}
                >
                    <PrimaryText text={'Total'} />
                    <AmountText category={TransactionType.Total} text={showRupiah(count.total)} />
                </Stack>
            </Box>
        </Card>
    )
}

export default TotalDailyTransaction;