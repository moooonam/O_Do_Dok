import React, { useState } from "react";
import styles from "../../styles/Teams.module.scss";
import TeamCard from "../../components/Teams/TeamCard";
import SearchedTeamCard from "../../components/Teams/SearchedTeamCard";
import TextField from "@mui/material/TextField";
import createstyles from "../../styles/Teams.module.scss";
import { Api } from "../../Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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

//filter
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function TeamsMainPage() {
  const movePage = useNavigate();
  const [teamCreateModal, setTeamCreateModal] = React.useState(false);

  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [isSearched, setIsSearched] = React.useState(false);
  const [searchedTeamData, setSearchedTeamData] = React.useState([]);

  const isLogin = useSelector((state) => state.user.isLogin);
  const myTeamId = useSelector((state) => state.user.myTeamId);

  const teamCreateModalOpen = () => {
    if (isLogin) {
      if (myTeamId) {
        alert("이미 모임에 가입되어 있습니다.");
      } else {
        setTeamCreateModal(true);
      }
    } else {
      alert("로그인을 해주세요");
      movePage("/login");
    }
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
    game: false,
    romance: false,
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
  // 유저 정보에 선호 장르 담기
  const clickGenre = (choice) => {
    if (teamGenre.includes(choice)) {
      let newGenres = teamGenre.filter((genre) => genre !==choice)
      setTeamGenre(newGenres);
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

  // 검색
  const searchTeam = () => {
    if (searchKeyword) {
      Api.get(`/teams/${searchKeyword}`).then((res) => {
        setSearchedTeamData(...searchedTeamData, res.data);
        setIsSearched(true);
      });
    }
  };

  // 모임 생성 axios
  const teamCreate = () => {
    const access_token = localStorage.getItem("access-token");
    const refresh_token = localStorage.getItem("refresh-token");
    if (teamGenre.length !== 3) {
      alert('장르를 3가지 선택해주세요')
    } else {  
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
            Api.post("/teams", teamInfo, {
              headers: {
                "access-token": `Bearer ${access_token}`,
                "refresh-token": `Bearer ${refresh_token}`,
              },
            })
          .then((res) => {
            alert("모임 생성이 완료되었습니다");
            teamCreateModalClose();
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          alert("모든 항목에 대해 답변해주세요");
        }
      } else {
        alert("중복 검사를 진행해주세요");
      }
    };
  }
    
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
          if (res.data) {
            alert("사용 가능한 모임 이름 입니다");
            form.team_name_check = true;
          } else {
            alert("사용할 수 없는 모임 이름 입니다");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("모임 이름을 입력해주세요");
    }
  };

  // 필터
  const [menu, setMenu] = useState({
    choice: "장르",
  });

  const options = ["장르", "추리", "스릴러", "공포", "SF", "판타지", "무협", "로맨스"];

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickOption = (option) => {
    setMenu({ ...menu, choice: option });
  };

  return (
    <div className={styles["wrap-all"]}>
      <div className={styles.title}>모임 신청</div>
      <div className={styles["wrap-bar"]}>
        <div className={styles["filter-div"]}>
          <h4>{menu.choice}</h4>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className={styles["dropdown"]}
          >
            <ArrowDropDownCircleIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "10ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                //   selected={option === "선택"}
                onClick={() => {
                  handleClose();
                  clickOption(option);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className={styles["search-maketeam-container"]}>
          <div className={styles["search-container"]}>
            <input
              type="text"
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
            />
            <div className={styles.searchicon} onClick={searchTeam}>
              🔍
            </div>
          </div>
          <div className={styles["maketeam-btn"]} onClick={teamCreateModalOpen}>
            모임생성
          </div>
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
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => {
                    teamNameDupli();
                  }}
                >
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
                    clickGenre("추리");
                  }}
                  className={
                    genreList.reason ? styles["active"] : styles["notActive"]
                  }
                >
                  #추리
                </div>
                <div
                  onClick={() => {
                    clickthril();
                    clickGenre("스릴러");
                  }}
                  className={
                    genreList.thril ? styles["active"] : styles["notActive"]
                  }
                >
                  #스릴러
                </div>
                <div
                  onClick={() => {
                    clickhorror();
                    clickGenre("호러");
                  }}
                  className={
                    genreList.horror ? styles["active"] : styles["notActive"]
                  }
                >
                  #호러
                </div>
                <div
                  onClick={() => {
                    clicksf();
                    clickGenre("SF");
                  }}
                  className={
                    genreList.sf ? styles["active"] : styles["notActive"]
                  }
                >
                  #SF
                </div>
                <div
                  onClick={() => {
                    clickfantasy();
                    clickGenre("판타지");
                  }}
                  className={
                    genreList.fantasy ? styles["active"] : styles["notActive"]
                  }
                >
                  #판타지
                </div>
                <div
                  onClick={() => {
                    clickgame();
                    clickGenre("무협");
                  }}
                  className={
                    genreList.game ? styles["active"] : styles["notActive"]
                  }
                >
                  #무협
                </div>
                <div
                  onClick={() => {
                    clickromance();
                    clickGenre("로맨스");
                  }}
                  className={
                    genreList.romance ? styles["active"] : styles["notActive"]
                  }
                >
                  #로맨스
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
      {isSearched ? (
        <SearchedTeamCard teams={searchedTeamData} />
      ) : (
        <TeamCard genre={menu.choice}/>
      )}
    </div>
  );
}

export default TeamsMainPage;
