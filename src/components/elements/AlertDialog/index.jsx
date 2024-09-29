import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { setDialogOpen } from '../../../redux/dialog/dialogSlice';
import { deleteAccount } from '../../../redux/account/accountReducers';
import { deleteCategory } from '../../../redux/category/categoryReducers';

export default function AlertDialog() {
    const { isOpen, title, desc, type, data } = useSelector((state) => state.dialog);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setDialogOpen());
    };

    const handleSubmit = () => {
        switch (type) {
            case 'delete-account':
                dispatch(deleteAccount(data));
                break;
            case 'delete-category':
                dispatch(deleteCategory(data));
                break;
            default:
                alert("No handle");
                dispatch(setDialogOpen());
                break;
        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {desc}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button sx={{ color : '#DF826C' }} onClick={handleSubmit} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
