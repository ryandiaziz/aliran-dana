/* eslint-disable react/prop-types */
import { Typography } from "@mui/material"

function AmountText({ text, category = 'total' }) {
    return (
        <Typography sx={{
            color: category === 'income'
                ? 'income.main'
                : category === 'expense'
                    ? 'expense.main'
                    : 'textPrimary.main',
            fontSize: {
                xs: '.9rem',
                md: '1rem'
            },
            fontWeight: '500'
        }}>
            {text}
        </Typography>
    )
}

export default AmountText