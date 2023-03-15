import React, { useState } from "react";
import styles from "../../styles/Teams.module.scss";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#FBFFF9',
  // border: '1px solid #000',
  borderRadius:2,
  // boxShadow: 24,
  p: 4,
};
function TeamsMainPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div className={styles.title}>모임 신청</div>
      <div className={styles['wrap-bar']}>
        <Button
          variant="contained"
          color="success"
          className={styles["join-btn"]}
          onClick={handleOpen}
        >
          모임생성
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1> Oh Do Dok </h1>
            <div>저기기</div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default TeamsMainPage;
