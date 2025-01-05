import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { TransactionType } from "../../../../enums/Index.js";

function AmountText({ text, category = TransactionType.Total }) {
    return (
        <Typography sx={{
            color: category === TransactionType.Income
                ? 'income.main'
                : category === TransactionType.Expense
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

AmountText.propTypes = {
    text: PropTypes.string.isRequired,
    category: PropTypes.string
}

export default AmountText;