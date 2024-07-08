/* eslint-disable react/prop-types */
import { styled } from "@mui/material"

function AmountText({ text, category = 'total' }) {

    const Text = styled('p')(({ theme }) => ({
        color: category === 'income'
            ? theme.palette.primary.main
            : category === 'expense'
                ? theme.palette.expense.main
                : theme.palette.textPrimary.main,
        fontSize : 18
    }))
    return (
        <Text>{text}</Text>
    )
}

export default AmountText