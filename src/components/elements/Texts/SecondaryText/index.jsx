/* eslint-disable react/prop-types */
import { styled, Typography } from '@mui/material';


const SecondaryText = ({ text }) => {
    const Text = styled('div')(({ theme }) => ({
        color: theme.palette.textSecondary.main,
        width: '100%'
    }));

    return (
        <Text>
            <Typography sx={{ fontSize : 14 }}>
                {text}
            </Typography>
        </Text>
    )
}

export default SecondaryText