/* eslint-disable react/prop-types */
import { styled, Typography } from '@mui/material'

const PrimaryText = ({ text, color }) => {
    const Text = styled('div')(({ theme }) => ({
        color: color || theme.palette.textPrimary.main,
        fontSize: 18
    }));

    return (
        <Text>
            <Typography>
                {text}
            </Typography>
        </Text>
    )
}

export default PrimaryText