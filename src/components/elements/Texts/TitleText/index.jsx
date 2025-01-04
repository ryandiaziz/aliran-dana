import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const TitleText = ({ text }) => {
    return (
        <Typography sx={{
            fontSize: {
                xs: '.9rem',
                md: '1rem'
            },
            fontWeight: 600,
            color: 'textSecondary.main'
        }} >
            {text}
        </Typography>
    )
}

TitleText.propTypes = {
    text: PropTypes.string.isRequired
};

export default TitleText;