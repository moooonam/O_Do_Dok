import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from '../../../styles/MyTeamAfterDodok.module.scss'

export default function EndDodokModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={styles['default-btn']} onClick={handleClickOpen}>
        도독종료
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"도독을 종료하시겠습니까?"}
        </DialogTitle>
        <DialogContent>
          <div className={styles['wrap-modal-btn']}>
            <div className={styles['cancle-btn']}>아니요</div>
            <div className={styles['allow-btn']}>네</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}