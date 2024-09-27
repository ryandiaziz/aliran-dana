import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { useNavigate } from 'react-router-dom';

const actions = [
    { icon: <CurrencyExchangeIcon />, name: 'add transaction', link: '/add-transaction' },
    { icon: <SwapHorizIcon />, name: 'balance transfer', link: '' },
    { icon: <ImportContactsIcon />, name: 'debt', link: '' },
];

export default function BasicSpeedDial() {
    const navigate = useNavigate()

    const handleClick = (path) => {
        navigate(path)
    }
    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: 30, right: 30 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon sx={{ color: 'white' }} />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleClick(action.link)}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
