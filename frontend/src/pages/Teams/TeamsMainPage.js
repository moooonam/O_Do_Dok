import React, { useState } from "react";
import styles from "../../styles/Teams.module.scss";
import TeamCard from "../../components/Teams/TeamCard";
import TextField from "@mui/material/TextField";
import createstyles from "../../styles/Teams.module.scss";
import { Api } from "../../Api";
import { useNavigate } from "react-router-dom";

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

function TeamsMainPage() {
  const movePage = useNavigate();
  const [teamCreateModal, setTeamCreateModal] = React.useState(false);
  const teamCreateModalOpen = () => {
    setTeamCreateModal(true);
  };
  const teamCreateModalClose = () => {
    setTeamCreateModal(false);
  };

  const [form, setForm] = useState({
    team_name: "",
    team_onoff: "",
    team_region: "",
    team_membercnt_max: "",
    team_name_check: false,
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
      // console.log(2222222222);
      setTeamGenre(teamGenre.filter((genre) => genre !== choice));
    } else {
      setTeamGenre([...teamGenre, choice]);
    }
  };

  // 모임 생성 axios에 사용할 데이터
  // axios 보낼 데이터
  const teamInfo = {
    teamName: "",
    teamMemberCntMax: "",
    teamOnoff: "",
    teamRegion: "",
    teamGenre1: "",
    teamGenre2: "",
    teamGenre3: "",
  };

  // 모임 생성 axios
  const teamCreate = () => {
      const access_token = localStorage.getItem("access-token")
      const refresh_token = localStorage.getItem("refresh-token")
      // console.log(access_token)
      // console.log(refresh_token)

      teamInfo.teamName = form.team_name;
      teamInfo.teamGenre1 = teamGenre[0];
      teamInfo.teamGenre2 = teamGenre[1];
      teamInfo.teamGenre3 = teamGenre[2];
      teamInfo.teamRegion = form.team_region;
      teamInfo.teamOnoff = form.team_onoff;
      teamInfo.teamMemberCntMax = form.team_membercnt_max;
    if (form.team_name_check) {
      if (
        teamInfo.teamName &&
        teamInfo.teamMemberCntMax &&
        teamInfo.teamOnoff &&
        teamInfo.teamRegion &&
        teamInfo.teamGenre1 &&
        teamInfo.teamGenre2 &&
        teamInfo.teamGenre3
      ) {
        Api.post("/teams",
          teamInfo,
          {headers: {'access-token': `Bearer ${access_token}`, 'refresh-token': `Bearer ${refresh_token}`}}
          )
          .then((res) => {
            // console.log(res);
            alert('모임 생성이 완료되었습니다')
            teamCreateModalClose()
            window.location.reload()
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("모든 항목에 대해 답변해주세요");
      }
    } else {
      alert('중복 검사를 진행해주세요')
    }
  };

  const teamName_validation = () => {
    let check = /^[가-힣a-zA-Z].{1,11}$/;
    // let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"]/;
    return check.test(form.team_name);
  };

  // 팀 이름 중복검사
  const teamNameDupli = () => {
    if (form.team_name) {
      Api.get(`teams/check/${form.team_name}`)
      .then((res) => {
        console.log(res)
        if (res.data) {
          alert('사용 가능한 모임 이름 입니다')
          form.team_name_check = true
        } else {
          alert('사용할 수 없는 모임 이름 입니다')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      alert('모임 이름을 입력해주세요')
    }
  }

  return (
    <div className={styles["wrap-all"]}>
      <div className={styles.title}>모임 신청</div>
      <div className={styles["wrap-bar"]}>
        <div>필터</div>
        <div className={styles["maketeam-btn"]} onClick={teamCreateModalOpen}>
          모임생성
        </div>
        <Dialog
          open={teamCreateModal}
          onClose={teamCreateModalClose}
          fullWidth
          scroll={"paper"}
        >
          <DialogTitle>{"모임 생성"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <br />
              <p>모임 이름</p>
              <div className={styles["btns"]}>
                <TextField
                  required
                  id="team_region"
                  value={form.team_name}
                  variant="standard"
                  onChange={(e) =>
                    setForm({ ...form, team_name: e.target.value })
                  }
                  error={!teamName_validation() && form.team_name.length > 0}
                  helperText={
                    !teamName_validation() && form.team_name.length > 0
                      ? "한글 혹은 영문 2글자 이상 12글자 이내로 작성해주세요."
                      : ""
                  }
                />
                <div className={styles["btn-blank"]}></div>
                <Button variant="outlined" color="success" onClick={() => {teamNameDupli()}}>
                  중복확인
                </Button>
              </div>
              <br />
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
              <div className={createstyles["genre-box"]}>
                <div
                  onClick={() => {
                    clickreason();
                    clickGenre("reason");
                  }}
                  className={
                    genreList.reason
                      ? createstyles["active"]
                      : createstyles["notActive"]
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
                      ? createstyles["active"]
                      : createstyles["notActive"]
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
                      ? createstyles["active"]
                      : createstyles["notActive"]
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
                      ? createstyles["active"]
                      : createstyles["notActive"]
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
                      ? createstyles["active"]
                      : createstyles["notActive"]
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
                      ? createstyles["active"]
                      : createstyles["notActive"]
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
                      ? createstyles["active"]
                      : createstyles["notActive"]
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
                      ? createstyles["active"]
                      : createstyles["notActive"]
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
                      ? createstyles["active"]
                      : createstyles["notActive"]
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
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={teamCreateModalClose}>취소</Button>
            <Button
              onClick={() => {
                // teamCreateModalClose();
                teamCreate();
              }}
            >
              생성
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <TeamCard />
    </div>
  );
}

export default TeamsMainPage;
