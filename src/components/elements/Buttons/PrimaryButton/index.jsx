/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';

export default function PrimaryButton({
    type = 'button',
    text = 'Click',
    disabled = false,
    onclick
}) {
    return (
        <Button
            sx={{ color: 'white', flexGrow: 1 }}
            variant='contained'
            type={type}
            disabled={disabled}
            onClick={onclick}
        >
            {text}
        </Button>
    );
}
