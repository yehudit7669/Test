import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

type Props = {
    open:boolean;
    handleClose:()=>void
}

const WelcomeToWizerDialog = ({open,handleClose}:Props) => {

    return (
        <>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'} sx={{ '& .MuiDialog-paper': { minHeight: '386px' } }}>
        <DialogContent className='WelcomeToWizerDialogBg'>
            
        </DialogContent>
        </Dialog>
        </>
    )
}

export default WelcomeToWizerDialog