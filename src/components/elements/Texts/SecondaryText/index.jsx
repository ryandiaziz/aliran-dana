import PropTypes from 'prop-types';
import { Typography } from '@mui/material';


const SecondaryText = ({ text }) => {
    return (
        <Typography sx={{
            fontSize: {
                xs: '.8rem',
                md: '.9rem'
            },
            color: 'textSecondary.main'
        }}>
            {text}
        </Typography>
    )
}

SecondaryText.propTypes = {
    text: PropTypes.string.isRequired
}

export default SecondaryText;