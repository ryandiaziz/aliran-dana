import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { blue } from '@mui/material/colors';
// import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const items = [
    {
        name: 'Tambah Transaksi',
        link: '/add-transaction',
        icon: <CurrencyExchangeIcon />
    },
    {
        name: 'Transfer Saldo',
        link: '/transfer-saldo',
        icon: <SwapHorizIcon />
    },
    {
        name: 'Hutang',
        link: '/dept',
        icon: <ImportContactsIcon />
    }
];

export default function CustomDialog(props) {
    const { onClose, open } = props;

    // const handleClose = () => {
    //     onClose(selectedValue);
    // };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Pilih jenis transaksi</DialogTitle>
            <List sx={{ pt: 0 }}>
                {items.map((item) => (
                    <ListItem disableGutters key={item.name}>
                            <ListItemButton onClick={() => handleListItemClick(item.link)}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                        {item.icon}
                                    </Avatar>
                                </ListItemAvatar>
                                <Typography>
                                    {item.name}
                                </Typography>
                                {/* <ListItemText sx={{ textDecoration : 'none' }} primary={item.name} /> */}
                            </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

CustomDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    // selectedValue: PropTypes.string.isRequired,
};