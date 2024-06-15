import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { GoPlusCircle } from "react-icons/go";
import AddButtonForm from './AddButtonForm';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <div className='w-fit m-auto'>
                <Button type="button" className='shurq-add-button flex items-center gap-2 px-6 py-4' onClick={handleClickOpen}>
                    <GoPlusCircle className='w-6 h-6' />
                    <span className='text-sm'>Add Product</span>
                </Button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className='text-3xl text-shurqBlue font-semibold'>
                        Add Product
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 50,
                            top: 8,
                        }}
                        className='mt-6 text-black text-lg'
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent>
                        <AddButtonForm></AddButtonForm>
                    </DialogContent>
                </BootstrapDialog>
            </div>
        </React.Fragment>
    );
}