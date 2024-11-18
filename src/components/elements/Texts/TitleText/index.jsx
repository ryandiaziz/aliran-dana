/* eslint-disable react/prop-types */
import {Typography } from '@mui/material'

const TitleText = ({ text }) => {
    return (
        <Typography fontSize={'1.3em'} color={'#686D76'} fontWeight={600}>
            {text}
        </Typography>
    )
}

export default TitleText