import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "../../styles/Signup.module.scss";
import Grid from "@mui/material/Grid"; // Grid version 1
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

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

import { Api } from "../../Api";
function SignupPage() {
  const movePage = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    gender: "",
    onoff: "",
    region: "",
    frequency: "",
    nickCheck: false,
    emailCheck: false,
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
    if (userGenre.includes(choice)) {
      let newGenres = userGenre.filter((genre) => genre !== choice);
      setUserGenre(newGenres);
    } else {
      setUserGenre([...userGenre, choice]);
    }
  };

  // axios 보낼 데이터
  const userInfo = {
    name: "",
    email: "",
    nickname: "",
    password: "",
    phone: "",
    gender: "",
    onoff: "",
    region: "",
    frequency: "",
    genre1: "",
    genre2: "",
    genre3: "",
    age: 0,
  };

  const emailDuplication = () => {
    if (form.email) {
      Api.get(`/user/checkEmail/${form.email}`)
        .then((res) => {
          if (res.data) {
            form.emailCheck = true;
            alert("사용 가능한 이메일입니다.");
          } else {
            alert("이미 존재하는 이메일입니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const nickDuplication = () => {
    if (form.nickname) {
      Api.get(`/user/checkNickname/${form.nickname}`)
        .then((res) => {
          if (res.data) {
            alert("사용 가능한 닉네임입니다.");
            form.nickCheck = true;
          } else {
            alert("이미 존재하는 닉네임입니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 가입하기 함수
  const userSignup = () => {
    if (userGenre.length !== 3) {
      alert("장르를 3가지 선택해주세요");
    } else {
      if (form.emailCheck && form.nickCheck) {
        userInfo.name = form.name;
        userInfo.email = form.email;
        userInfo.nickname = form.nickname;
        userInfo.password = form.password;
        userInfo.phone = form.phone;
        userInfo.gender = form.gender;
        userInfo.age = userAge;
        userInfo.genre1 = userGenre[0];
        userInfo.genre2 = userGenre[1];
        userInfo.genre3 = userGenre[2];
        userInfo.region = form.region;
        userInfo.onoff = form.onoff;
        userInfo.frequency = form.frequency;
        if (
          userInfo.name &&
          userInfo.email &&
          userInfo.nickname &&
          userInfo.password &&
          userInfo.phone &&
          userInfo.gender &&
          userInfo.onoff &&
          userInfo.region &&
          userInfo.frequency &&
          userInfo.genre1 &&
          userInfo.genre2 &&
          userInfo.genre3 &&
          userInfo.age
        ) {
          Api.post("/user", userInfo)
            .then((res) => {
              alert("회원가입 성공!");
              movePage("/login");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("모든 항목에 대해 답변해주세요");
        }
      } else {
        alert("중복검사를 진행해주세요");
      }
    }

  };

  // 유효성 검사
  const nickname_validation = () => {
    let check = /^[가-힣a-zA-Z].{1,11}$/;
    // let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"]/;
    return check.test(form.nickname);
  };

  const name_validation = () => {
    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"]/;
    return check.test(form.name);
  };

  const password_validation = () => {
    let check = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    return check.test(form.password);
  };

  const email_validation = () => {
    if (form.email) {
      let check =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      return check.test(form.email);
    }
  };

  const phone_validation = () => {
    if (form.phone) {
      let check = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
      return check.test(form.phone)
    }
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <h2>O Do Dok!</h2>
      <div className={styles["signupBox"]}>
        <h3 className={styles["title"]}>회원가입</h3>
        <Grid container direction="row" columnGap={10}>
          <p className={styles["signup-blank"]}>이름</p>
          <TextField
            required
            id="name"
            label="Required"
            placeholder="이름을 입력해주세요"
            value={form.name}
            variant="standard"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={name_validation()}
            helperText={
              name_validation() ? "특수문자는 입력할 수 없습니다." : ""
            }
          />
        </Grid>
        <Grid container direction="row" columnGap={8}>
          <p className={styles["signup-blank"]}>이메일</p>
          <TextField
            sx={{
              width: { md: 250 },
            }}
            required
            id="email"
            label="Required"
            placeholder="이메일을 입력해주세요"
            value={form.email}
            variant="standard"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={!email_validation() && form.email.length > 0}
            helperText={
              !email_validation() && form.email.length > 0
                ? "이메일 형식에 맞춰 작성해주세요."
                : ""
            }
          />
          <Button
            variant="outlined"
            color="success"
            className={styles["signup-dupli"]}
            onClick={() => emailDuplication()}
          >
            중복확인
          </Button>
        </Grid>
        <Grid container direction="row" columnGap={8}>
          <p className={styles["signup-blank"]}>닉네임</p>
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
            error={!nickname_validation() && form.nickname.length > 0}
            helperText={
              !nickname_validation() && form.nickname.length > 0
                ? "한글 혹은 영문 2글자 이상 12글자 이내로 작성해주세요."
                : ""
            }
          />
          <Button
            variant="outlined"
            className={styles["signup-dupli"]}
            color="success"
            onClick={() => nickDuplication()}
          >
            중복확인
          </Button>
        </Grid>
        <Grid container direction="row" columnGap={8}>
          <p className={styles["signup-blank"]}>비밀번호</p>
          <TextField
            sx={{
              width: { md: 250 },
            }}
            required
            type="password"
            id="password"
            label="Required"
            placeholder="비밀번호를 입력해주세요"
            value={form.password}
            variant="standard"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={!password_validation() && form.password.length > 0}
            helperText={
              !password_validation() && form.password.length > 0
                ? "영문, 숫자, 특수문자를 조합하여 8자 이상 16자 이내로 작성해주세요"
                : ""
            }
          />
        </Grid>
        <Grid container direction="row" columnGap={4}>
          <p className={styles["signup-blank"]}>비밀번호 확인</p>
          <TextField
            sx={{
              width: { md: 250 },
            }}
            required
            type="password"
            id="passwordConfirm"
            label="Required"
            placeholder="비밀번호를 다시 입력해주세요"
            value={form.passwordConfirm}
            variant="standard"
            onChange={(e) =>
              setForm({ ...form, passwordConfirm: e.target.value })
            }
            error={
              form.password !== form.passwordConfirm &&
              form.passwordConfirm.length > 0
            }
            helperText={
              form.password !== form.passwordConfirm &&
              form.passwordConfirm.length > 0
                ? "비밀번호가 일치하지 않습니다."
                : ""
            }
          />
        </Grid>
        <Grid container direction="row" columnGap={5.5}>
          <p className={styles["signup-blank"]}>휴대폰 번호</p>
          <TextField
            sx={{
              width: { md: 250 },
            }}
            required
            type="tel"
            id="phone"
            label="Required"
            placeholder="휴대폰 번호를 입력해주세요"
            value={form.phone}
            variant="standard"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            error={!phone_validation() && form.phone.length > 0}
            helperText={
              !phone_validation() && form.phone.length > 0
                ? "휴대폰 번호를 올바르게 입력해주세요"
                : ""
            }
          />
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
              value="M"
              control={<Radio />}
              label="남성"
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            />
            <FormControlLabel
              value="W"
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
              value={birth}
              onChange={(newValue) => setBirth(newValue)}
            />
          </LocalizationProvider>
        </div>
        <br />
        <br />
        <div>
          <p>선호 장르 (*총 3가지 장르를 선택해주세요)</p>
          <br />
          <Grid container direction="row" columnGap={3}>
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
              className={genreList.sf ? styles["active"] : styles["notActive"]}
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
          </Grid>
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
              value="ON"
              control={<Radio />}
              label="온라인"
              onChange={(e) => setForm({ ...form, onoff: e.target.value })}
            />
            <FormControlLabel
              value="OFF"
              control={<Radio />}
              label="오프라인"
              onChange={(e) => setForm({ ...form, onoff: e.target.value })}
            />
            <FormControlLabel
              value="BOTH"
              control={<Radio />}
              label="병행"
              onChange={(e) => setForm({ ...form, onoff: e.target.value })}
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <Grid container direction="row" columnGap={8}>
          <p className={styles["signup-blank"]}>활동지역</p>
          <TextField
            sx={{
              width: { md: 310 },
            }}
            required
            id="region"
            label="Required"
            placeholder="온라인의 경우 '전지역'으로 입력해주세요"
            value={form.region}
            variant="standard"
            onChange={(e) => setForm({ ...form, region: e.target.value })}
          />
        </Grid>
        <br />
        <br />
        <FormControl>
          <p id="demo-row-radio-buttons-group-label">독서빈도 (한 달 기준)</p>
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
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={userSignup}
        >
          가입하기
        </Button>
        <br />
        <br />
      </div>
    </Grid>
  );
}

export default SignupPage;
