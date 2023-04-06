import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "../../styles/UserInfoUpdate.module.scss";
import Grid from "@mui/material/Grid"; // Grid version 1
import Button from "@mui/material/Button";
import { Api } from "../../Api";
import { useNavigate } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// radio

import { useSelector, useDispatch } from "react-redux";
import { getUserInfo, logout } from "../../redux/slice/userSlice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";

// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// datepicker
function UserInfoUpdatePage() {
  const movePage = useNavigate();
  const dispatch = useDispatch();
  function goMyPage() {
    movePage("/mypage");
  }
  const userInfo = useSelector((state) => state.user);
  const [form, setForm] = useState({
    userName: userInfo.userName,
    userEmail: userInfo.userEmail,
    userNickname: userInfo.userNickname,
    userPhone : userInfo.userPhone,
    userImage: userInfo.profileImg,
    userOnoff: userInfo.userOnoff,
    userRegion: userInfo.userRegion,
    userFrequency: userInfo.userFrequency,
    userGenre1: "",
    userGenre2: "",
    userGenre3: "",
    nickCheck: false,
  });

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

  // 닉네임 중복체크
  const nickDuplication = () => {
    if (form.userNickname) {
      Api.get(`/user/checkNickname/${form.userNickname}`)
        .then((res) => {
          if (res.data) {
            setForm({ ...form, nickCheck: true });
            alert("사용 가능한 닉네임입니다.");
          } else if (form.userNickname === userInfo.userNickname) {
            alert("사용 가능한 기존 닉네임입니다.");
            setForm({ ...form, nickCheck: true });
          } else {
            setForm({ ...form, nickCheck: false });
            alert("이미 존재하는 닉네임입니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 정보 제출
  const userUpdate = () => {
    if (userGenre.length !== 3) {
      alert("장르를 3가지 선택해주세요");
    } else {
      form.userGenre1 = userGenre[0];
      form.userGenre2 = userGenre[1];
      form.userGenre3 = userGenre[2];
      if (form.nickCheck) {
        //axios 들어갈 자리
        Api.put("/user", form, {
          headers: {
            "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
            "access-token": `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
          .then((res) => {
            dispatch(
              getUserInfo({
                userName: form.userName,
                userEmail: form.userEmail,
                profileImg: form.userImage,
                userNickname: form.userNickname,
                userPhone: form.userPhone,
                userGenre1: form.userGenre1,
                userGenre2: form.userGenre2,
                userGenre3: form.userGenre3,
                userFrequency: form.userFrequency,
                userOnoff: form.userOnoff,
                userRegion: form.userRegion,
                userGender: userInfo.userGender,
                userAge: userInfo.userAge,
              })
            );
            alert("회원정보 수정완료!");
            goMyPage();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("닉네임 중복체크를 해주세요!");
      }
    }
  };

  // 유효성 검사
  const nickname_validation = () => {
    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"]/;
    return check.test(form.nickname);
  };

  let Frequency = "";
  if (userInfo.userFrequency < 3) {
    Frequency = "under2";
  } else if (userInfo.userFrequency < 6) {
    Frequency = "under5";
  } else {
    Frequency = "oversix";
  }

  // 회원 탈퇴 모달
  const [open, setOpen] = React.useState(false);

  const userDeleteModalOpen = () => {
    setOpen(true);
  };

  const userDeleteModalClose = () => {
    setOpen(false);
  };

  // 회원탈퇴
  const userDelete = () => {
    const access_token = localStorage.getItem("access-token");
    const refresh_token = localStorage.getItem("refresh-token");
    Api.delete("/user", {
      headers: {
        "access-token": `Bearer ${access_token}`,
        "refresh-token": `Bearer ${refresh_token}`,
      },
    })
      .then((res) => {
        if (res.data === "삭제 완료") {
          alert("회원 탈퇴가 완료되었습니다.");
          dispatch(logout());
          movePage("/");
        } else {
          alert("회원 탈퇴에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 유저 이미지 변경
  const images = [
    "https://cdn.pixabay.com/photo/2023/01/11/17/29/bird-7712374__340.jpg",
    "https://cdn.pixabay.com/photo/2012/04/02/14/24/bee-24633__340.png",
    "https://cdn.pixabay.com/photo/2020/10/23/17/52/fox-5679446__340.png",
    "https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913__340.jpg",
    "https://cdn.pixabay.com/photo/2022/09/04/21/05/seal-7432797__340.png",
    "https://cdn.pixabay.com/photo/2020/11/24/18/19/cat-5773481__340.jpg",
  ];

  const clickImage = (image) => {
    setForm({ ...form, userImage: image });
  };

  const renderImage = images.map((image) => {
    return (
      <div>
        <div key={image} className={styles["userImg-div"]}>
          <img
            src={image}
            alt=""
            onClick={() => {
              clickImage(image);
            }}
          />
        </div>
        {image === form.userImage ? <p className={styles["userImg-check"]}>✔</p> : <p></p>}
      </div>
    );
  });

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <h2>O Do Dok!</h2>
      <div className={styles["updateBox"]}>
        <h3 className={styles["title"]}>회원 정보 수정</h3>
        <br />
        <br />
        <p>프로필 사진 수정</p>
        <div className={styles["images-div"]}>{renderImage}</div>
        <br />
        <br />
        <Grid container direction="row" columnGap={10}>
          <p className={styles["update-blank-little"]}>이름</p>
          <TextField
            required
            id="name"
            disabled
            value={userInfo.userName}
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
            value={userInfo.userEmail}
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
            // value={form.nickname}
            placeholder="2 ~ 12자 이내로 입력해주세요"
            variant="standard"
            onChange={(e) => setForm({ ...form, userNickname: e.target.value })}
            error={nickname_validation()}
            defaultValue={userInfo.userNickname}
            helperText={
              nickname_validation() ? "특수기호는 하실 수 없습니다." : ""
            }
          />
          <Button
            variant="outlined"
            className={styles["update-dupli"]}
            color="success"
            onClick={nickDuplication}
          >
            중복확인
          </Button>
        </Grid>
        <br />
        <Grid container direction="row" columnGap={4}>
          <p className={styles["update-blank-little"]}>휴대폰 번호</p>
          <TextField
            required
            id="phone"
            disabled
            value={userInfo.userPhone}
            variant="standard"
          />
          <br />
          <br />
          <br />
        </Grid>
        <br /><br />
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
              checked={userInfo.userGender === "M" ? true : false}
              // { userInfo.userGender === 'm' ?  checked='true' : checked="false"}
              onChange={(e) => setForm({ ...form, userGender: e.target.value })}
            />
            <FormControlLabel
              disabled
              value="female"
              control={<Radio />}
              label="여성"
              checked={userInfo.userGender === "W" ? true : false}
              onChange={(e) => setForm({ ...form, userGender: e.target.value })}
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <div>
          <p>선호 장르 (*총 3가지 장르를 선택해주세요)</p>
          <br />
          <p className={styles["origin-genre"]}>
            기존 선호 장르 : #{userInfo.userGenre1} #{userInfo.userGenre2} #
            {userInfo.userGenre3}
          </p>
          <br />
          <div className={styles["genre-box"]}>
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
            defaultValue={userInfo.userOnoff}
          >
            <FormControlLabel
              value="ON"
              control={<Radio />}
              label="온라인"
              onChange={(e) => setForm({ ...form, userOnoff: e.target.value })}
            />
            <FormControlLabel
              value="OFF"
              control={<Radio />}
              label="오프라인"
              onChange={(e) => setForm({ ...form, userOnoff: e.target.value })}
            />
            <FormControlLabel
              value="BOTH"
              control={<Radio />}
              label="병행"
              onChange={(e) => setForm({ ...form, userOnoff: e.target.value })}
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
            // value={form.region}
            defaultValue={userInfo.userRegion}
            variant="standard"
            onChange={(e) => setForm({ ...form, userRegion: e.target.value })}
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
            defaultValue={Frequency}
          >
            <FormControlLabel
              value="under2"
              control={<Radio />}
              label="2권 이하"
              onChange={(e) => setForm({ ...form, userFrequency: 2 })}
            />
            <FormControlLabel
              value="under5"
              control={<Radio />}
              label="3권 ~ 5권"
              onChange={(e) => setForm({ ...form, userFrequency: 5 })}
            />
            <FormControlLabel
              value="oversix"
              control={<Radio />}
              label="6권 이상"
              onChange={(e) => setForm({ ...form, userFrequency: 6 })}
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <br />
        <div className={styles["btns"]}>
          <Button color="error" onClick={userDeleteModalOpen}>
            회원 탈퇴
          </Button>
          <div>
            <Button color="success" onClick={goMyPage}>
              취소
            </Button>
            {/* <div className={styles["btn-blank"]}></div> */}
            <Button
              color="success"
              onClick={() => {
                userUpdate();
                // goMyPage();
              }}
            >
              수정 완료
            </Button>
            <Dialog
              open={open}
              onClose={userDeleteModalClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Bye Bye!"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  회원탈퇴를 진행하시겠습니까?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={userDeleteModalClose}>아니오</Button>
                <Button
                  onClick={() => {
                    userDeleteModalClose();
                    userDelete();
                  }}
                >
                  예
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <br />
        <br />
      </div>
    </Grid>
  );
}

export default UserInfoUpdatePage;
