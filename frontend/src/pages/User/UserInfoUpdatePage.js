import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "../../styles/UserInfoUpdate.module.scss";
import Grid from "@mui/material/Grid"; // Grid version 1
import Button from "@mui/material/Button";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from '@mui/icons-material/PhotoCamera';

// radio
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

// datepicker
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function UserInfoUpdatePage() {
  const movePage = useNavigate();
  function goMyPage() {
    movePage("/mypage");
  }

  const [form, setForm] = useState({
    nickname: "",
    onoff: "",
    region: "",
    frequency: "",
  });

  // 날짜 데이터
  const [birth, setBirth] = React.useState(dayjs());
  // 날짜 형식 변경
  const dateFormat = dayjs(birth.$d).format("YYYY-MM-DD");
  const userAge = 2023 - Number(dateFormat.slice(0, 4)) + 1;

  // 장르 리스트
  const [userGenre, setUserGenre] = useState([]);
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
    if (userGenre.includes(choice)) {
      console.log(2222222222);
      setUserGenre(userGenre.filter((genre) => genre !== choice));
    } else {
      setUserGenre([...userGenre, choice]);
    }
  };

  // axios 보낼 데이터
  const userUpdateInfo = {
    name: "",
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
    gender: "",
    onoff: "",
    region: "",
    frequency: "",
    genre1: "",
    genre2: "",
    genre3: "",
    age: 0,
  };

  const nickDuplication = () => {
    // if (form.nickname) {
    //   axios({
    //     methods: 'get',
    //     url: `http://localhost:3000/api/v1/user/checkEmail/${form.nickname}`
    //   })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // }
  };

  // 정보 업데이트 함수
  const userupdate = () => {
    userUpdateInfo.name = form.name;
    userUpdateInfo.email = form.email;
    userUpdateInfo.nickname = form.nickname;
    userUpdateInfo.password = form.password;
    userUpdateInfo.passwordConfirm = form.passwordConfirm;
    userUpdateInfo.gender = form.gender;
    userUpdateInfo.onoff = form.onoff;
    userUpdateInfo.region = form.region;
    userUpdateInfo.frequency = form.frequency;
    userUpdateInfo.genre1 = userGenre[0];
    userUpdateInfo.genre2 = userGenre[1];
    userUpdateInfo.genre3 = userGenre[2];
    userUpdateInfo.age = userAge;
    // axios({
    //   methods: 'post',
    //   url: 'http://localhost:3000/api/v1/user',
    //   data: userUpdateInfo,
    // })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // console.log(form);
    // console.log(2023 - Number(dateFormat.slice(0,4)) + 1);
    // console.log(userGenre[0]);
    // console.log(userGenre[1]);
    // console.log(userGenre[2]);
    // console.log(userGenre);
    // console.log(userUpdateInfo);
  };

  // 유효성 검사
  const nickname_validation = () => {
    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"]/;
    return check.test(form.nickname);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <h2>Oh Do Dok!</h2>
      <div className={styles["updateBox"]}>
        <h3 className={styles["title"]}>회원 정보 수정</h3>
        <br />
        <br />
        <div className={styles["userImg-box"]}>
          <p>프로필 사진</p>
          <Button variant="outlined" component="label" color="success">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          {/* <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton> */}
        </div>
        <div className={styles["userImg-div"]}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifB4Vg3_ARc3CQag2UroPpXuJnujae0a-dA&usqp=CAU"
            alt=""
          />
        </div>
        <br />
        <br />
        <Grid container direction="row" columnGap={10}>
          <p className={styles["update-blank-little"]}>이름</p>
          <TextField
            required
            id="name"
            disabled
            value="유저 이름"
            variant="standard"
          />
          <br />
          <br />
          <br />
        </Grid>
        <Grid container direction="row" columnGap={8}>
          <p className={styles["update-blank-little"]}>이메일</p>
          <TextField
            sx={{
              width: { md: 250 },
            }}
            required
            disabled
            id="email"
            value="test@test.com"
            variant="standard"
          />
        </Grid>
        <br />
        <Grid container direction="row" columnGap={8}>
          <p className={styles["update-blank"]}>닉네임</p>
          <TextField
            sx={{
              width: { md: 250 },
            }}
            required
            id="nickname"
            label="Required"
            value={form.nickname}
            placeholder="2 ~ 12자 이내로 입력해주세요"
            variant="standard"
            onChange={(e) => setForm({ ...form, nickname: e.target.value })}
            error={nickname_validation()}
            helperText={
              nickname_validation() ? "특수기호는 하실 수 없습니다." : ""
            }
          />
          <Button
            variant="outlined"
            className={styles["update-dupli"]}
            color="success"
            onClick={nickDuplication()}
          >
            중복확인
          </Button>
        </Grid>
        <br /> <br />
        <FormControl>
          <p id="demo-row-radio-buttons-group-label">성별</p>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              disabled
              value="male"
              control={<Radio />}
              label="남성"
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            />
            <FormControlLabel
              disabled
              value="female"
              control={<Radio />}
              label="여성"
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <div>
          <p>생년월일</p>
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disabled
              value={birth}
              onChange={(newValue) => setBirth(newValue)}
            />
          </LocalizationProvider>
        </div>
        <br />
        <br />
        <div>
          <p>선호 장르</p>
          <br />
          <div className={styles["genre-box"]}>
            <div
              onClick={() => {
                clickreason();
                clickGenre("reason");
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
                clickGenre("thril");
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
                clickGenre("horror");
              }}
              className={
                genreList.horror ? styles["active"] : styles["notActive"]
              }
            >
              #공포
            </div>
            <div
              onClick={() => {
                clicksf();
                clickGenre("sf");
              }}
              className={genreList.sf ? styles["active"] : styles["notActive"]}
            >
              #과학
            </div>
            <div
              onClick={() => {
                clickfantasy();
                clickGenre("fantasy");
              }}
              className={
                genreList.fantasy ? styles["active"] : styles["notActive"]
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
                genreList.drama ? styles["active"] : styles["notActive"]
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
                genreList.game ? styles["active"] : styles["notActive"]
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
                genreList.romance ? styles["active"] : styles["notActive"]
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
                genreList.animation ? styles["active"] : styles["notActive"]
              }
            >
              #만화
            </div>
          </div>
        </div>
        <br />
        <br />
        <FormControl>
          <p id="demo-row-radio-buttons-group-label">온/오프라인</p>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="online"
              control={<Radio />}
              label="온라인"
              onChange={(e) => setForm({ ...form, onoff: e.target.value })}
            />
            <FormControlLabel
              value="offline"
              control={<Radio />}
              label="오프라인"
              onChange={(e) => setForm({ ...form, onoff: e.target.value })}
            />
            <FormControlLabel
              value="onoff"
              control={<Radio />}
              label="병행"
              onChange={(e) => setForm({ ...form, onoff: e.target.value })}
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <Grid container direction="row" columnGap={8}>
          <p className={styles["update-blank"]}>활동지역</p>
          <TextField
            required
            id="region"
            label="Required"
            placeholder="활동지역을 입력해주세요"
            value={form.region}
            variant="standard"
            onChange={(e) => setForm({ ...form, region: e.target.value })}
          />
        </Grid>
        <br />
        <br />
        <FormControl>
          <p id="demo-row-radio-buttons-group-label">독서빈도</p>
          <br />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="underthril"
              control={<Radio />}
              label="2권 이하"
              onChange={(e) => setForm({ ...form, frequency: 2 })}
            />
            <FormControlLabel
              value="horrorfantasy"
              control={<Radio />}
              label="3권 ~ 5권"
              onChange={(e) => setForm({ ...form, frequency: 5 })}
            />
            <FormControlLabel
              value="oversix"
              control={<Radio />}
              label="6권 이상"
              onChange={(e) => setForm({ ...form, frequency: 6 })}
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <div className={styles["btns"]}>
          <Button variant="contained" color="error" onClick={goMyPage}>
            취소
          </Button>
          <div className={styles["btn-blank"]}></div>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              goMyPage();
                userupdate();
            }}
          >
            수정 완료
          </Button>
        </div>
        <br />
        <br />
      </div>
    </Grid>
  );
}

export default UserInfoUpdatePage;
