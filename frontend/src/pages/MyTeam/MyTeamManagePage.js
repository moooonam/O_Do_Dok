import React from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import teamstyles from "../../styles/MyTeamManage.module.scss";

// 모달
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function MyTeamManagePage() {
  const [teamInfoModal, setTeamInfoModal] = React.useState(false);
  const teamInfoModalOpen = () => {
    setTeamInfoModal(true);
  };
  const teamInfoModalClose = () => {
    setTeamInfoModal(false);
  };
  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar />
      <div className={sidestyles.others}>
        <div className={teamstyles["teammanage-container"]}>
          <div className={teamstyles["teammanage-header"]}>
            <h2>개미들</h2>
            <div onClick={teamInfoModalOpen}>정보 수정</div>
          </div>
          <hr />
          <div className={teamstyles["teamInfoBox"]}>
            <img
              src="https://cdn.pixabay.com/photo/2018/05/14/16/54/alpine-3400788_960_720.jpg"
              alt=""
              className={teamstyles["teamInfo-left"]}
            />
            <div className={teamstyles["teamInfo-right"]}>
              <div className={teamstyles["right-top-content"]}>
                <div className={teamstyles["content-left"]}>
                  <p>모임 인원 수</p>
                  <p>모임원 모집</p>
                </div>
                <div className={teamstyles["content-right"]}>
                  <p>9명 / 15명</p>
                  <p>비공개</p>
                </div>
              </div>
              <div className={teamstyles["right-bottom-content"]}>
                <div className={teamstyles["tag-top"]}>
                  <div>온라인</div>
                  <div>전지역</div>
                </div>
                <div className={teamstyles["tag-bottom"]}>
                  <div>스릴러</div>
                  <div>추리</div>
                  <div>로맨스</div>
                </div>
              </div>
            </div>
          </div>
          <div className={teamstyles["second-box"]}>
            <h2>모임규칙</h2>
            <hr />
            <div className={teamstyles["rule-box"]}>
              <h4>1. 모임의 첫번째 규칙이 들어갈 자리 입니다.</h4>
              <h4>2. 모임의 첫번째 규칙이 들어갈 자리 입니다.</h4>
              <h4>3. 모임의 첫번째 규칙이 들어갈 자리 입니다.</h4>
            </div>
          </div>
          <div className={teamstyles["third-box"]}>
            <h2>홍보글</h2>
            <hr />
            <div className={teamstyles["introduction-box"]}>ddd</div>
          </div>

          {/* 모임 정보 수정 모달 */}
          <Dialog
            open={teamInfoModal}
            onClose={teamInfoModalClose}
            fullScreen
          >
            <DialogTitle>{"모임 정보 수정"}</DialogTitle>
            <DialogContent>
              <DialogContentText>정말 퇴출하시겠습니까?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button>예</Button>
              <Button onClick={teamInfoModalClose}>취소</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default MyTeamManagePage;
