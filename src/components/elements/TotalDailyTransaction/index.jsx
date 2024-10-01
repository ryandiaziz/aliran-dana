import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AmountText from '../Texts/AmoutText';
import { showRupiah } from '../../../helper/helper';
import PrimaryText from '../Texts/PrimaryText';
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
                    <AmountText category='income' text={showRupiah(count.income)} />
                </Stack>
                <Divider />
                <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center', padding: 2 }}
                >
                    <PrimaryText text={'Expense'} />
                    <AmountText category='expense' text={showRupiah(count.expense)} />
                </Stack>
            </Box>
        </Card>
    )
}

export default TotalDailyTransaction