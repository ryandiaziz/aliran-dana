/* eslint-disable react/prop-types */
import { styled } from '@mui/material'

const PrimaryText = ({ text, color }) => {
    const Text = styled('p')(({theme})=>({
        color : color || theme.palette.textPrimary.main,
        fontSize : 18,
        width : '100%'
    }));

    return (
        <Text>
            {text}
        </Text>
    )
}

export default PrimaryText