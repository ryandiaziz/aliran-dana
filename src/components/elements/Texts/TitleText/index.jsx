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
            color: 'primary.main',
            letterSpacing: '.1rem'
        }} >
            {text}
        </Typography>
    )
}

TitleText.propTypes = {
    text: PropTypes.string.isRequired
};

export default TitleText;