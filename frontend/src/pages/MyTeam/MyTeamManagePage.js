import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import teamstyles from "../../styles/MyTeamManage.module.scss";
import TextField from "@mui/material/TextField";
import { Api } from "../../Api";

// 모달
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// radio
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function MyTeamManagePage() {
  const [teamInfoModal, setTeamInfoModal] = React.useState(false);
  const teamInfoModalOpen = () => {
    setTeamInfoModal(true);
  };
  const teamInfoModalClose = () => {
    setTeamInfoModal(false);
  };

  // 팀 정보 불러오기
  const access_token = localStorage.getItem("access-token");
  const refresh_token = localStorage.getItem("refresh-token");
  const [teamDetail, setTeamDetail] = useState({
    teamName: "",
    teamMemberCnt: "",
    teamMemberCntMax: "",
    teamImage: "",
    teamGenre1: "",
    teamGenre2: "",
    teamGenre3: "",
    teamOnoff: "",
    teamRegion: "",
    teamRule1: "",
    teamRule2: "",
    teamRule3: "",
    teamRecruitText: "",
  });

  useEffect(() => {
    Api.get("/user/myTeam", {
      headers: {
        "access-token": `Bearer ${access_token}`,
        "refresh-token": `Bearer ${refresh_token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setTeamDetail({
          ...teamDetail,
          teamName: res.data.teamName,
          teamMemberCnt: res.data.teamMemberCnt,
          teamMemberCntMax: res.data.teamMemberCntMax,
          teamImage: res.data.teamImage,
          teamGenre1: res.data.teamGenre1,
          teamGenre2: res.data.teamGenre2,
          teamGenre3: res.data.teamGenre3,
          teamOnoff: res.data.teamOnoff,
          teamRegion: res.data.teamRegion,
          teamRule1: res.data.teamRule1,
          teamRule2: res.data.teamRule2,
          teamRule3: res.data.teamRule3,
          teamRecruitText: res.data.teamRecruitText,
        });
        setForm({
          ...form,
          team_onoff: res.data.teamOnoff,
          team_region: res.data.teamMemberCnt,
          team_membercnt_max: res.data.teamMemberCntMax,
          team_recruit: false,
          team_recruit_text: res.data.teamRecruitText,
          team_rule1: res.data.teamRule1,
          team_rule2: res.data.teamRule2,
          team_rule3: res.data.teamRule3,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 팀 정보 수정에 사용할 데이터
  const [form, setForm] = useState({
    team_onoff: "",
    team_region: "",
    team_membercnt_max: "",
    team_recruit: false,
    team_recruit_text: "",
    team_rule1: "",
    team_rule2: "",
    team_rule3: "",
  });

  // 장르 리스트
  const [teamGenre, setTeamGenre] = useState([]);
  // 장르 데이터
  const [genreList, setGenreList] = useState({
    reason: false,
    thril: false,
    horror: false,
    sf: false,
    fantasy: false,
    drama: false,
    game: false,
    romance: false,
    animation: false,
  });

  // 장르 클릭했을때 클래스 변경
  const clickreason = () => {
    if (genreList.reason) {
      setGenreList({ ...genreList, reason: false });
    } else {
      setGenreList({ ...genreList, reason: true });
    }
  };
  const clickthril = () => {
    if (genreList.thril) {
      setGenreList({ ...genreList, thril: false });
    } else {
      setGenreList({ ...genreList, thril: true });
    }
  };
  const clickhorror = () => {
    if (genreList.horror) {
      setGenreList({ ...genreList, horror: false });
    } else {
      setGenreList({ ...genreList, horror: true });
    }
  };
  const clicksf = () => {
    if (genreList.sf) {
      setGenreList({ ...genreList, sf: false });
    } else {
      setGenreList({ ...genreList, sf: true });
    }
  };
  const clickfantasy = () => {
    if (genreList.fantasy) {
      setGenreList({ ...genreList, fantasy: false });
    } else {
      setGenreList({ ...genreList, fantasy: true });
    }
  };
  const clickdrama = () => {
    if (genreList.drama) {
      setGenreList({ ...genreList, drama: false });
    } else {
      setGenreList({ ...genreList, drama: true });
    }
  };
  const clickgame = () => {
    if (genreList.game) {
      setGenreList({ ...genreList, game: false });
    } else {
      setGenreList({ ...genreList, game: true });
    }
  };
  const clickromance = () => {
    if (genreList.romance) {
      setGenreList({ ...genreList, romance: false });
    } else {
      setGenreList({ ...genreList, romance: true });
    }
  };
  const clickanimation = () => {
    if (genreList.animation) {
      setGenreList({ ...genreList, animation: false });
    } else {
      setGenreList({ ...genreList, animation: true });
    }
  };
  // 유저 정보에 선호 장르 담기
  const clickGenre = (choice) => {
    if (teamGenre.includes(choice)) {
      console.log(2222222222);
      setTeamGenre(teamGenre.filter((genre) => genre !== choice));
    } else {
      setTeamGenre([...teamGenre, choice]);
    }
  };

  // axios 보낼 데이터
  const teamInfo = {
    team_onoff: "",
    team_region: "",
    team_membercnt_max: null,
    team_recruit: false,
    team_recruit_text: "",
    team_rule1: "",
    team_rule2: "",
    team_rule3: "",
    team_genre1: "",
    team_genre2: "",
    team_genre3: "",
  };

  // 모임 정보 수정
  const teamInfoUpdate = () => {
    teamInfo.team_onoff = form.team_onoff;
    teamInfo.team_region = form.team_region;
    teamInfo.team_membercnt_max = form.team_membercnt_max;
    teamInfo.team_recruit = form.team_recruit;
    teamInfo.team_recruit_text = form.team_recruit_text;
    teamInfo.team_rule1 = form.team_rule1;
    teamInfo.team_rule2 = form.team_rule2;
    teamInfo.team_rule3 = form.team_rule3;
    teamInfo.team_genre1 = teamGenre[0];
    teamInfo.team_genre2 = teamGenre[1];
    teamInfo.team_genre3 = teamGenre[2];


  };

  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"teamManage"} />
      <div className={sidestyles.others}>
        <div className={teamstyles["teammanage-container"]}>
          <div className={teamstyles["teammanage-header"]}>
            <h2>{teamDetail.teamName}</h2>
            <div onClick={teamInfoModalOpen}>정보 수정</div>
          </div>
          <hr />
          <div className={teamstyles["teamInfoBox"]}>
            <img
              src={teamDetail.teamImage}
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
                  <div>{teamDetail.teamOnoff}</div>
                  <div>{teamDetail.teamRegion}</div>
                </div>
                <div className={teamstyles["tag-bottom"]}>
                  <div>{teamDetail.teamGenre1}</div>
                  <div>{teamDetail.teamGenre2}</div>
                  <div>{teamDetail.teamGenre3}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={teamstyles["second-box"]}>
            <h2>모임규칙</h2>
            <hr />
            <div className={teamstyles["rule-box"]}>
              <h4>1. {teamDetail.teamRule1}</h4>
              <h4>2. {teamDetail.teamRule2}</h4>
              <h4>3. {teamDetail.teamRule3}</h4>
            </div>
          </div>
          <div className={teamstyles["third-box"]}>
            <h2>홍보글</h2>
            <hr />
            <div className={teamstyles["introduction-box"]}>
              {teamDetail.teamRecruitText}
            </div>
          </div>

          {/* 모임 정보 수정 모달 */}
          <Dialog
            open={teamInfoModal}
            onClose={teamInfoModalClose}
            fullWidth
            scroll={"paper"}
          >
            <DialogTitle>{"모임 정보 수정"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    온/오프라인
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    row
                    value={form.team_onoff}
                    onChange={(e) =>
                      setForm({ ...form, team_onoff: e.target.value })
                    }
                  >
                    <FormControlLabel
                      value="ON"
                      control={<Radio />}
                      label="온라인"
                    />
                    <FormControlLabel
                      value="OFF"
                      control={<Radio />}
                      label="오프라인"
                    />
                    <FormControlLabel
                      value="BOTH"
                      control={<Radio />}
                      label="병행"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <br />
                <p>활동 지역</p>
                <TextField
                  required
                  id="team_region"
                  value={form.team_region}
                  variant="standard"
                  onChange={(e) =>
                    setForm({ ...form, team_region: e.target.value })
                  }
                />
                <br />
                <br />
                <p>선호 장르</p>
                <div className={teamstyles["genre-box"]}>
                  <div
                    onClick={() => {
                      clickreason();
                      clickGenre("reason");
                    }}
                    className={
                      genreList.reason
                        ? teamstyles["active"]
                        : teamstyles["notActive"]
                    }
                  >
                    #추리
                  </div>
                  <div
                    onClick={() => {
                      clickthril();
                      clickGenre("thril");
                    }}
                    className={
                      genreList.thril
                        ? teamstyles["active"]
                        : teamstyles["notActive"]
                    }
                  >
                    #스릴러
                  </div>
                  <div
                    onClick={() => {
                      clickhorror();
                      clickGenre("horror");
                    }}
                    className={
                      genreList.horror
                        ? teamstyles["active"]
                        : teamstyles["notActive"]
                    }
                  >
                    #공포
                  </div>
                  <div
                    onClick={() => {
                      clicksf();
                      clickGenre("sf");
                    }}
                    className={
                      genreList.sf
                        ? teamstyles["active"]
                        : teamstyles["notActive"]
                    }
                  >
                    #과학
                  </div>
                  <div
                    onClick={() => {
                      clickfantasy();
                      clickGenre("fantasy");
                    }}
                    className={
                      genreList.fantasy
                        ? teamstyles["active"]
                        : teamstyles["notActive"]
                    }
                  >
                    #판타지
                  </div>
                  <div
                    onClick={() => {
                      clickdrama();
                      clickGenre("drama");
                    }}
                    className={
                      genreList.drama
                        ? teamstyles["active"]
                        : teamstyles["notActive"]
                    }
                  >
                    #드라마
                  </div>
                  <div
                    onClick={() => {
                      clickgame();
                      clickGenre("game");
                    }}
                    className={
                      genreList.game
                        ? teamstyles["active"]
                        : teamstyles["notActive"]
                    }
                  >
                    #게임
                  </div>
                  <div
                    onClick={() => {
                      clickromance();
                      clickGenre("romance");
                    }}
                    className={
                      genreList.romance
                        ? teamstyles["active"]
                        : teamstyles["notActive"]
                    }
                  >
                    #로맨스
                  </div>
                  <div
                    onClick={() => {
                      clickanimation();
                      clickGenre("animation");
                    }}
                    className={
                      genreList.animation
                        ? teamstyles["active"]
                        : teamstyles["notActive"]
                    }
                  >
                    #만화
                  </div>
                </div>
                <br />
                <br />
                <p>최대 인원수</p>
                <TextField
                  required
                  id="team_membercnt_max"
                  value={form.team_membercnt_max}
                  variant="standard"
                  onChange={(e) =>
                    setForm({ ...form, team_membercnt_max: e.target.value })
                  }
                />
                <br />
                <br />
                <br />
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    모임원 모집 공개 여부
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    row
                    value={form.team_recruit}
                    onChange={(e) =>
                      setForm({ ...form, team_onoff: e.target.value })
                    }
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="공개"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="비공개"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <br />
                <h3>모임 규칙</h3>
                <p>1.</p>
                <TextField
                  required
                  multiline
                  id="team_rule1"
                  value={form.team_rule1}
                  variant="standard"
                  fullWidth
                  onChange={(e) =>
                    setForm({ ...form, team_rule1: e.target.value })
                  }
                />
                <br />
                <br />
                <p>2.</p>
                <TextField
                  required
                  multiline
                  id="team_rule2"
                  value={form.team_rule2}
                  variant="standard"
                  fullWidth
                  onChange={(e) =>
                    setForm({ ...form, team_rule2: e.target.value })
                  }
                />
                <br />
                <br />
                <p>3.</p>
                <TextField
                  multiline
                  required
                  id="team_rule3"
                  value={form.team_rule3}
                  variant="standard"
                  fullWidth
                  onChange={(e) =>
                    setForm({ ...form, team_rule3: e.target.value })
                  }
                />
                <br />
                <br />
                <h3>모임 홍보 글</h3>
                <TextField
                  required
                  multiline
                  id="team_recruit_text"
                  value={form.team_recruit_text}
                  variant="outlined"
                  fullWidth
                  onChange={(e) =>
                    setForm({ ...form, team_recruit_text: e.target.value })
                  }
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={teamInfoModalClose}>취소</Button>
              <Button
                onClick={() => {
                  teamInfoModalClose();
                  teamInfoUpdate();
                }}
              >
                수정 완료
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default MyTeamManagePage;
