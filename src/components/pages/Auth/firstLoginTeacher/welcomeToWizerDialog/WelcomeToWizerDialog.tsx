import Dialog from '@mui/material/Dialog';
import {Button, IconButton} from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import Confetti from '../confetti/Confetti';
import { CancelIcon, CloseIcon, WizerLogo } from '../../../../../assets/svgs/svg-components';
import '../FirstLoginTeacher.css';
import { useTranslation } from 'react-i18next';

type Props = {
    open:boolean;
    handleClose:()=>void
}

const WelcomeToWizerDialog = ({open,handleClose}:Props) => {
    const {t} = useTranslation();
    return (
        <>
        <Dialog className='WelcomeToWizerDialog' open={open} onClose={handleClose} fullWidth maxWidth={'sm'} sx={{ '& .MuiDialog-paper': { minHeight: '386px' } }}>
        <DialogContent className='WelcomeToWizerDialogContent'>
            <div className='CloseIconContainer'>
                <IconButton onClick={handleClose}>
                <CloseIcon/>
                </IconButton>
            </div>
            <Confetti/>
            <div className='WelcomeToWizerTitle'>
                {t("WelcomeToWizerDialog.title")}
            </div>
            <div className='WizerLogo'>
                <WizerLogo/>
            </div>
            <div className='WelcomeToWizerLetsStartButtonContainer'>
                <Button className="WelcomeToWizerLetsStartButton">
                {t("WelcomeToWizerDialog.letsStart")}
                </Button>
            </div>
        </DialogContent>
        </Dialog>
        </>
    )
}

export default WelcomeToWizerDialog