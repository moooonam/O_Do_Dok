import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import memberstyles from "../../styles/MyTeamMemberManage.module.scss";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// onClick={() => {
//     addComment();
//     count();
//     }}
function MyTeamMemberManagePage() {
  // 선택한 모임원 정보 저장
  const [memberInfo, setMemberInfo] = useState({
    id: null,
    name: "",
    imgurl: "",
  });

  const clickMember = (member) => {
    setMemberInfo({
      ...memberInfo,
      id: member.id,
      name: member.name,
      imgurl: member.imgurl,
    });
  };

  // 선택한 가입신청자 정보 저장
  const [applicantInfo, setApplicantInfo] = useState({
    id: null,
    name: "",
    imgurl: "",
    comment: "",
  });

  const clickApplicant = (member) => {
    setApplicantInfo({
      ...applicantInfo,
      id: member.id,
      name: member.name,
      imgurl: member.imgurl,
      comment: member.comment,
    });
  };

  // 모임원 데이터
  const userImgs = [
    {
      id: 1,
      name: "독린이",
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ44sVUht3bLlDctgqfTi8KWR7Cfr2x3ZRrbWWC4kOLM3E7TRxzwcvn73BpvwEU29REi4&usqp=CAU",
    },
    {
      id: 2,
      name: "무",
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsQXUFrVgeu47HOQSfq0H--H9UXXQgxlY6Tw&usqp=CAU",
    },
    {
      id: 3,
      name: "경삼",
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX0Gyy5AmeuuEZDj4r7VfhMZuPzehhxn6fdDLzqiXpuX0-HYQt8auxVkEOcnXxE2pTTxo&usqp=CAU",
    },
    {
      id: 4,
      name: "사번",
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ44sVUht3bLlDctgqfTi8KWR7Cfr2x3ZRrbWWC4kOLM3E7TRxzwcvn73BpvwEU29REi4&usqp=CAU",
    },
    {
      id: 5,
      name: "오번",
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsQXUFrVgeu47HOQSfq0H--H9UXXQgxlY6Tw&usqp=CAU",
    },
    {
      id: 6,
      name: "6번",
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX0Gyy5AmeuuEZDj4r7VfhMZuPzehhxn6fdDLzqiXpuX0-HYQt8auxVkEOcnXxE2pTTxo&usqp=CAU",
    },
    {
      id: 7,
      name: "칠번",
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ44sVUht3bLlDctgqfTi8KWR7Cfr2x3ZRrbWWC4kOLM3E7TRxzwcvn73BpvwEU29REi4&usqp=CAU",
    },
    {
      id: 8,
      name: "팔번",
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsQXUFrVgeu47HOQSfq0H--H9UXXQgxlY6Tw&usqp=CAU",
    },
    {
      id: 9,
      name: "구번",
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX0Gyy5AmeuuEZDj4r7VfhMZuPzehhxn6fdDLzqiXpuX0-HYQt8auxVkEOcnXxE2pTTxo&usqp=CAU",
    },
  ];

  // 모임원 반복 출력
  const renderUserImg = userImgs.map((member) => {
    return (
      <div
        onClick={() => {
          memberModalOpen();
          clickMember(member);
        }}
      >
        <div key={member.id} className={memberstyles["userImg-div"]}>
          <img src={member.imgurl} alt="프로필" />
        </div>
        <p className={memberstyles["username"]}>{member.name}</p>
      </div>
    );
  });

  // 가입 신청자 데이터
  const newapply = [
    {
      id: 1,
      name: "오도독짱",
      comment: "안녕하세요!!!!!!!!!!오도독짱",
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ44sVUht3bLlDctgqfTi8KWR7Cfr2x3ZRrbWWC4kOLM3E7TRxzwcvn73BpvwEU29REi4&usqp=CAU",
    },
    {
      id: 2,
      name: "오도독러뷰",
      comment: "안녕하세요!!!!!!!!!!오도독러뷰",
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsQXUFrVgeu47HOQSfq0H--H9UXXQgxlY6Tw&usqp=CAU",
    },
    {
      id: 3,
      name: "마이럽오도독",
      comment: "안녕하세요!!!!!!!!!!마이럽",
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX0Gyy5AmeuuEZDj4r7VfhMZuPzehhxn6fdDLzqiXpuX0-HYQt8auxVkEOcnXxE2pTTxo&usqp=CAU",
    },
  ];

  // 가입 신청자 반복 출력
  const renderNewApply = newapply.map((member) => {
    return (
      <div
        onClick={() => {
          applicantModalOpen();
          clickApplicant(member);
        }}
      >
        <div key={member.id} className={memberstyles["userImg-div"]}>
          <img src={member.imgurl} alt="프로필" />
        </div>
        <p className={memberstyles["username"]}>{member.name}</p>
      </div>
    );
  });

  // 모임원 정보 모달 관련 데이터 및 함수
  const [memberModal, setMemberModal] = React.useState(false);
  const memberModalOpen = () => {
    setMemberModal(true);
  };
  const memberModalClose = () => {
    setMemberModal(false);
  };

  // 모임원 퇴출 모달 관련 데이터 및 함수
  const [memberOutModal, setMemberOutModal] = React.useState(false);
  const memberOutModalOpen = () => {
    setMemberOutModal(true);
  };
  const memberOutModalClose = () => {
    setMemberOutModal(false);
  };

  // 모임원 관리자등록 모달 관련 데이터 및 함수
  const [managerModal, setManagerModal] = React.useState(false);
  const managerModalOpen = () => {
    setManagerModal(true);
  };
  const managerModalClose = () => {
    setManagerModal(false);
  };

  // 가입 신청자 정보 모달 관련 데이터 및 함수
  const [applicantModal, setApplicantModal] = React.useState(false);
  const applicantModalOpen = () => {
    setApplicantModal(true);
  };
  const applicantModalClose = () => {
    setApplicantModal(false);
  };

  // 가입 신청자 거절 모달 관련 데이터 및 함수
  const [applicantRefuseModal, setApplicantRefuseModal] = React.useState(false);
  const applicantRefuseModalOpen = () => {
    setApplicantRefuseModal(true);
  };
  const applicantRefuseModalClose = () => {
    setApplicantRefuseModal(false);
  };

  // 가입 신청자 수락 모달 관련 데이터 및 함수
  const [applicantAcceptModal, setApplicantAcceptModal] = React.useState(false);
  const applicantAcceptModalOpen = () => {
    setApplicantAcceptModal(true);
  };
  const applicantAcceptModalClose = () => {
    setApplicantAcceptModal(false);
  };

  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar />
      <div className={sidestyles.others}>
        <div className={memberstyles["members-container"]}>
          <h2>개미들 모임원</h2>
          <hr />
          <div className={memberstyles["userImgBox"]}>{renderUserImg}</div>
          <h2>가입 신청자</h2>
          <hr />
          <div className={memberstyles["userImgBox"]}>{renderNewApply}</div>

          {/* 모임원 관리 모달*/}
          <Dialog open={memberModal} onClose={memberModalClose}>
            <DialogTitle>{"모임원 정보"}</DialogTitle>
            <DialogContent className={memberstyles["membermodal-content"]}>
              <div className={memberstyles["content-left"]}>
                <img src={memberInfo.imgurl} alt="" />
              </div>
              <div className={memberstyles["content-right"]}>
                <p>닉네임 : {memberInfo.name}</p>
                <p>가입일자 : 2023.03.15</p>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={memberOutModalOpen}>퇴출</Button>
              <Button onClick={managerModalOpen} autoFocus>
                관리자 등록
              </Button>
            </DialogActions>
          </Dialog>

          {/* 모임원 퇴출 모달*/}
          <Dialog open={memberOutModal} onClose={memberOutModalClose}>
            <DialogTitle>{"모임원 퇴출"}</DialogTitle>
            <DialogContent>
              <DialogContentText>정말 퇴출하시겠습니까?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button>예</Button>
              <Button autoFocus>아니오</Button>
            </DialogActions>
          </Dialog>

          {/* 모임원 관리자등록 모달*/}
          <Dialog open={managerModal} onClose={managerModalClose}>
            <DialogTitle>{"관리자 등록"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {memberInfo.name} 님을 관리자로 등록하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button>예</Button>
              <Button autoFocus>아니오</Button>
            </DialogActions>
          </Dialog>

          {/* 가입 신청자 정보 모달*/}
          <Dialog open={applicantModal} onClose={applicantModalClose}>
            <DialogTitle>{"가입신청자 정보"}</DialogTitle>
            <DialogContent className={memberstyles["membermodal-content"]}>
              <div className={memberstyles["content-left"]}>
                <img src={applicantInfo.imgurl} alt="" />
              </div>
              <div className={memberstyles["content-right"]}>
                <p>닉예임 : {applicantInfo.name}</p>
                <p>가입일자 : 2023.03.15</p>
                <p>가입인사</p>
                <textarea cols="30" rows="3">
                  {applicantInfo.comment}
                </textarea>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={applicantRefuseModalOpen}>거절</Button>
              <Button onClick={applicantAcceptModalOpen} autoFocus>
                수락
              </Button>
            </DialogActions>
          </Dialog>

          {/* 가입 신청자 거절 모달*/}
          <Dialog
            open={applicantRefuseModal}
            onClose={applicantRefuseModalClose}
          >
            <DialogTitle>{"가입신청 거절"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                가입 신청을 거절하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button>예</Button>
              <Button autoFocus>아니오</Button>
            </DialogActions>
          </Dialog>

          {/* 가입 신청자 수락 모달*/}
          <Dialog
            open={applicantAcceptModal}
            onClose={applicantAcceptModalClose}
          >
            <DialogTitle>{"가입신청 수락"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                가입 신청을 수락하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button>예</Button>
              <Button autoFocus>아니오</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default MyTeamMemberManagePage;
