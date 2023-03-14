import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "../../styles/Signup.module.scss";
import Grid from "@mui/material/Grid"; // Grid version 1
import Button from "@mui/material/Button";

// radio
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//

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
    year: "",
    month: "",
    day: "",
    genre: [],
    onoff: "",
    area: "",
    frequency: "",
  });
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
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
          <Button variant="outlined" color="success" className={styles["signup-dupli"]}>
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
          <Button variant="outlined" className={styles["signup-dupli"]}  color="success" >
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
          <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="male" control={<Radio />} label="남성" />
            <FormControlLabel value="female" control={<Radio />} label="여성" />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <div>
          <p>생년월일</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
        </div>
        <br />
        <div>
          <p>선호장르</p>
          <Grid container direction="row" columnGap={3}>
            <div className={styles["signup-genre"]}>#소설</div>
            <div className={styles["signup-genre"]}>#자서전</div>
            <div className={styles["signup-genre"]}>#스릴러</div>
            <div className={styles["signup-genre"]}>#추리</div>
            <div className={styles["signup-genre"]}>#로맨스</div>
          </Grid>
        </div>
        <br />
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            온/오프라인
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="online"
              control={<Radio />}
              label="온라인"
            />
            <FormControlLabel
              value="offline"
              control={<Radio />}
              label="오프라인"
            />
            <FormControlLabel value="onoff" control={<Radio />} label="병행" />
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
        <br />
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            독서빈도
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="undertwo"
              control={<Radio />}
              label="2권 이하"
            />
            <FormControlLabel
              value="threefive"
              control={<Radio />}
              label="3권 ~ 5권"
            />
            <FormControlLabel
              value="oversix"
              control={<Radio />}
              label="6권 이상"
            />
          </RadioGroup>
        </FormControl>
        <br /><br />
        <Button variant="contained" color="success" fullWidth>
          가입하기
        </Button>
      </div>
    </Grid>
  );
}

export default SignupPage;
