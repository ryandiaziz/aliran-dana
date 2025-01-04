import PropTypes from 'prop-types';
import { Typography } from '@mui/material'

const PrimaryText = ({ text, color = "primary.main" }) => {
    return (
        <Typography sx={{
            fontSize: { xs: '.9rem', md: '1rem' },
            color: color
        }}>
            {text}
        </Typography>
    )
}

PrimaryText.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string
};

export default PrimaryText;