import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import styles from "../../styles/Signup.module.scss";
import Grid from "@mui/material/Grid"; // Grid version 1
import Button from "@mui/material/Button";

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

function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
    gender: "",
    onoff: "",
    area: "",
    frequency: "",
  });


  // 날짜 데이터
  const [birth, setBirth] = React.useState(dayjs("2022-04-17"));
  // 날짜 형식 변경
  const dateFormat = dayjs(birth.$d).format("YYYY-MM-DD");


  // 장르 리스트
  const [userGenre, setUserGenre] = useState([]);
  // 장르 데이터 
  const [genreList, setGenreList] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });

  // 장르 클릭
  const clickone = () => {
    if (genreList.one) {
      setGenreList({ ...genreList, one: false })
    } else {
      setGenreList({ ...genreList, one: true })
    }
  };
  const clicktwo = () => {
    if (genreList.two) {
      setGenreList({ ...genreList, two: false })
    } else {
      setGenreList({ ...genreList, two: true })
    }
  };
  const clickthree = () => {
    if (genreList.three) {
      setGenreList({ ...genreList, three: false })
    } else {
      setGenreList({ ...genreList, three: true })
    }
  };
  const clickfour = () => {
    if (genreList.four) {
      setGenreList({ ...genreList, four: false })
    } else {
      setGenreList({ ...genreList, four: true })
    }
  };
  const clickfive = () => {
    if (genreList.five) {
      setGenreList({ ...genreList, five: false })
    } else {
      setGenreList({ ...genreList, five: true })
    }
  };

  useEffect(() => {
    // setUserGenre([])
    for (let i in genreList) {
      if (genreList[i]=== true) {
        console.log(i)
        setUserGenre([...userGenre, i])
        console.log(userGenre)
      } 
    }
  },[genreList]);

  // 가입하기 함수
  const userSignup = () => {
    setUserGenre([])
    for (let i in genreList) {
      if (genreList[i]=== true) {
        console.log(i)
        setUserGenre([...userGenre, i])
        console.log(userGenre)
      } 
    }
    console.log(form);
    console.log(dateFormat);
    console.log(userGenre)
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <h2>Oh Do Dok!</h2>
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
          />
        </Grid>
        <Grid container direction="row" columnGap={8}>
          <p className={styles["signup-blank"]}>이메일</p>
          <TextField
            required
            id="email"
            label="Required"
            placeholder="이메일을 입력해주세요"
            value={form.email}
            variant="standard"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Button
            variant="outlined"
            color="success"
            className={styles["signup-dupli"]}
          >
            중복확인
          </Button>
        </Grid>
        <Grid container direction="row" columnGap={8}>
          <p className={styles["signup-blank"]}>닉네임</p>
          <TextField
            required
            id="nickname"
            label="Required"
            value={form.nickname}
            placeholder="2 ~ 12자 이내로 입력해주세요"
            variant="standard"
            onChange={(e) => setForm({ ...form, nickname: e.target.value })}
          />
          <Button
            variant="outlined"
            className={styles["signup-dupli"]}
            color="success"
          >
            중복확인
          </Button>
        </Grid>
        <Grid container direction="row" columnGap={8}>
          <p className={styles["signup-blank"]}>비밀번호</p>
          <TextField
            required
            id="password"
            label="Required"
            placeholder="비밀번호를 입력해주세요"
            value={form.password}
            variant="standard"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Grid>
        <Grid container direction="row" columnGap={3}>
          <p className={styles["signup-blank"]}>비밀번호 확인</p>
          <TextField
            required
            id="passwordConfirm"
            label="Required"
            placeholder="비밀번호를 다시 입력해주세요"
            value={form.passwordConfirm}
            variant="standard"
            onChange={(e) =>
              setForm({ ...form, passwordConfirm: e.target.value })
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
              value="male"
              control={<Radio />}
              label="남성"
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            />
            <FormControlLabel
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
              value={birth}
              onChange={(newValue) => setBirth(newValue)}
            />
          </LocalizationProvider>
        </div>
        <br /><br />
        <div>
          <p>선호 장르</p>
          <br />
          <Grid container direction="row" columnGap={3}>
            <div onClick={clickone} className={ genreList.one ? styles['active'] : styles['notActive'] }>
              #소설
            </div>
            <div onClick={clicktwo} className={ genreList.two ? styles['active'] : styles['notActive'] }>
              #자서전
            </div>
            <div onClick={clickthree} className={ genreList.three ? styles['active'] : styles['notActive'] }>
              #스릴러
            </div>
            <div onClick={clickfour} className={ genreList.four ? styles['active'] : styles['notActive'] }>
              #추리
            </div>
            <div onClick={clickfive} className={ genreList.five ? styles['active'] : styles['notActive'] }>
              #로맨스
            </div>
          </Grid>
        </div>
        <br />
        <br />
        <FormControl>
          <p id="demo-row-radio-buttons-group-label">
            온/오프라인
          </p>
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
          <p className={styles["signup-blank"]}>활동지역</p>
          <TextField
            required
            id="area"
            label="Required"
            placeholder="활동지역을 입력해주세요"
            value={form.area}
            variant="standard"
            onChange={(e) => setForm({ ...form, area: e.target.value })}
          />
        </Grid>
        <br /><br />
        <FormControl>
          <p id="demo-row-radio-buttons-group-label">
            독서빈도
          </p>
          <br />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="undertwo"
              control={<Radio />}
              label="2권 이하"
              onChange={(e) => setForm({ ...form, frequency: 2 })}
            />
            <FormControlLabel
              value="threefive"
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
