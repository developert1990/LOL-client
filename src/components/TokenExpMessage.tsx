import React, { Dispatch, SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

interface TokenExpMessageProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    handleCloseAndLogOut: () => void;
    handleCloseAndRefreshToken: () => void;
}

export const TokenExpMessage: React.FC<TokenExpMessageProps> = ({ open, setOpen, handleCloseAndLogOut, handleCloseAndRefreshToken }) => {
    return (
        <Dialog
            open={open}
        >
            <DialogTitle id="alert-dialog-title">{"Your token is expired."}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    If you want to keep log in, press 'Agree', or not 'Disagree'.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAndLogOut} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleCloseAndRefreshToken} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}
