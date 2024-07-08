/* eslint-disable react/prop-types */
import { styled } from '@mui/material';

const SecondaryText = ({ text }) => {
    const Text = styled('p')(({ theme }) => ({
        color: theme.palette.textSecondary.main,
        fontSize: 16,
        width: '100%'
    }));

    return (
        <Text>{text}</Text>
    )
}

export default SecondaryText