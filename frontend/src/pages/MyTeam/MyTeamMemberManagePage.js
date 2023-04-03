import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import memberstyles from "../../styles/MyTeamMemberManage.module.scss";
import { Api } from "../../Api";
// import { useSelector } from "react-redux";
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
    name: "",
    role: "",
    imgurl: "",
    date: "",
    teamUserId: "",
    userId: "",
  });

  const clickMember = (member) => {
    setMemberInfo({
      ...memberInfo,
      teamUserId: member.teamUserId,
      name: member.user.userNickname,
      imgurl: member.user.userImage,
      date: member.joinDate,
      role: member.role,
      userId: member.user.userId
    });
  };

  // 선택한 가입신청자 정보 저장
  const [applicantInfo, setApplicantInfo] = useState({
    applyId: "",
    name: "",
    imgurl: "",
    comment: "",
    date: "",
  });

  const clickApplicant = (member) => {
    setApplicantInfo({
      ...applicantInfo,
      applyId: member.applyId,
      name: member.nickname,
      imgurl: member.img,
      comment: member.msg,
      date: member.date,
    });
  };

  // 모임원 데이터
  const myTeamId = localStorage.getItem("myTeamId");
  const [members, setMembers] = useState([]);
  useEffect(() => {
    Api.get(`/teams/member/${myTeamId}`)
      .then((res) => {
        setMembers(...members, res.data);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 모임원 반복 출력
  const renderUserImg = members.map((member) => {
    return (
      <div
        key={member.teamUserId}
        onClick={() => {
          memberModalOpen();
          clickMember(member);
        }}
      >
        <div key={member.teamUserId} className={memberstyles["userImg-div"]}>
          <img src={member.user.userImage} alt="프로필" />
        </div>

        <div className={memberstyles["name-container"]}>
          {member.role === "ADMIN" ? <div>🍀</div> : null}
          {member.role === "MANAGER" ? <div>☘️</div> : null}
          {member.role === "USER" ? <div>🌱</div> : null}
          
          <div className={memberstyles["username"]}>
            {member.user.userNickname}
          </div>
        </div>
      </div>
    );
  });

  // 가입 신청자 데이터
  const [apllyMembers, setApllyMembers] = useState([]);
  useEffect(() => {
    Api.get(`teams/apply/${myTeamId}`)
      .then((res) => {
        setApllyMembers(...apllyMembers, res.data);
        // console.log(res.data)
        // console.log(apllyMembers)
      })
      .catch((err) => {
        console.log(err);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 가입 신청자 반복 출력
  const renderNewApply = apllyMembers.map((member) => {
    return (
      <div
        key={member.nickname}
        onClick={() => {
          applicantModalOpen();
          clickApplicant(member);
        }}
      >
        <div key={member.nickname} className={memberstyles["userImg-div"]}>
          <img src={member.img} alt="프로필" />
        </div>
        <p className={memberstyles["username"]}>{member.nickname}</p>
      </div>
    );
  });

  //가입신청 수락, 거절
  const acceptApply = () => {
    const acceptForm = {
      applyId: applicantInfo.applyId,
      isAccept: true,
    };
    console.log(acceptForm);
    Api.post("/teams/accept", acceptForm)
      .then((res) => {
        alert("수락이 완료되었습니다");
        window.location.reload();
        // goMyTeamMemberManage()
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const rejectAplly = () => {
    const rejectForm = {
      applyId: applicantInfo.applyId,
      isAccept: false,
    };
    console.log(rejectForm);
    Api.post("/teams/accept", rejectForm)
      .then((res) => {
        alert("가입신청 거절이 완료되었습니다");
        window.location.reload();
        // goMyTeamMemberManage()
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
  const deleteMember = ((userId) => {
    if (userId) {
      Api.delete(`/teams/member/${userId}`)
      .then((res) => {
        alert('모임원을 퇴출했습니다')
        window.location.reload()
        console.log(res)
      })
    }
  })

  // 모임원 관리자등록 모달 관련 데이터 및 함수
  const [managerModal, setManagerModal] = React.useState(false);
  const managerModalOpen = () => {
    setManagerModal(true);
  };
  const managerModalClose = () => {
    setManagerModal(false);
  };
  const switchRole = ((teamUserId) => {
    if (teamUserId) {
      Api.patch(`/teams/member/${teamUserId}`)
      .then((res) => {
        alert('권한변경을 성공했습니다.')
        window.location.reload()
        console.log(res)
      })
    }
  })

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
      <SideBar location={"memberManage"} />
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
                <p>가입일자 : {memberInfo.date}</p>
              </div>
            </DialogContent>
            {memberInfo.role === "USER" ? (
              <DialogActions>
                <Button onClick={memberOutModalOpen}>퇴출</Button>
                <Button onClick={managerModalOpen} autoFocus>
                  관리자 등록
                </Button>
              </DialogActions>
            ) : memberInfo.role === "MANAGER" ? (
              <DialogActions>
                <Button onClick={memberOutModalOpen}>퇴출</Button>
                <Button onClick={managerModalOpen} autoFocus>
                  관리자 해제
                </Button>
              </DialogActions>
            ) : null}
          </Dialog>

          {/* 모임원 퇴출 모달*/}
          <Dialog open={memberOutModal} onClose={memberOutModalClose}>
            <DialogTitle>{"모임원 퇴출"}</DialogTitle>
            <DialogContent>
              <DialogContentText>정말 퇴출하시겠습니까?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => deleteMember(memberInfo.userId)}>예</Button>
              <Button autoFocus onClick={memberOutModalClose}>아니오</Button>
            </DialogActions>
          </Dialog>

          {/* 모임원 관리자등록 모달*/}
          <Dialog open={managerModal} onClose={managerModalClose}>
            {memberInfo.role === "USER" ? (
              <div>
                <DialogTitle>{"관리자 등록"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {memberInfo.name} 님을 관리자로 등록하시겠습니까?
                  </DialogContentText>
                </DialogContent>
              </div>
            ) : (
              <div>
                <DialogTitle>{"관리자 등록"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {memberInfo.name} 님의 관리자 권한을 해제하시겠습니까?
                  </DialogContentText>
                </DialogContent>
              </div>
            )}
            <DialogActions>
              <Button onClick={() => switchRole(memberInfo.teamUserId)}>예</Button>
              <Button autoFocus onClick={managerModalClose}>
                아니오
              </Button>
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
                <p>닉네임 : {applicantInfo.name}</p>
                <p>신청일자 : {applicantInfo.date}</p>
                <p>하고싶은말</p>
                <p className={memberstyles.comment}>{applicantInfo.comment}</p>
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
              <Button onClick={rejectAplly}>예</Button>
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
              <Button onClick={acceptApply}>예</Button>
              <Button autoFocus>아니오</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default MyTeamMemberManagePage;
