import React, { useState, useEffect } from "react";
import styles from "../styles/Sidebar.module.scss";
import { useNavigate } from "react-router-dom";
import { Api } from "../Api";
import { getMyRole } from "../redux/slice/userSlice";
import { useSelector, useDispatch } from "react-redux";

const SideBar = ({ location }) => {
  const myTeamId = useSelector((state) => state.user.myTeamId)
  const dispatch = useDispatch();
  const [status, setStatus] = useState({
    main: false,
    dodok: false,
    article: false,
    record: false,
    teamManage: false,
    memberManage: false,
  });
  const myRole = useSelector((state) => state.user.myRole);

  useEffect(() => {
    setStatus({
      ...status,
      [location]: true,
    });
    Api.get("/teams/user/myRole", {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        dispatch(getMyRole({ myRole: res.data }));
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(myRole)
  const movePage = useNavigate();
  function goMyTeamMain() {
    movePage(`/myteam/${myTeamId}/main`);
  }
  function goMyTeamDodok() {
    movePage(`/myteam/${myTeamId}/dodok`);
  }
  function goMyTeamArticle() {
    movePage(`/myteam/${myTeamId}/article`);
  }

  function goMyTeamRecord() {
    movePage(`/myteam/${myTeamId}/record`);
  }

  function goMyTeamManage() {
    movePage(`/myteam/${myTeamId}/manage`);
  }

  function goMyTeamMemberManage() {
    movePage(`/myteam/${myTeamId}/membermanage`);
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles["wrap-sidebar"]}>
        <ul className={styles["sidebar-list"]}>
          <li
            onClick={goMyTeamMain}
            className={status.main ? styles["active"] : styles["notActive"]}
          >
            소식
          </li>
          <li
            onClick={goMyTeamDodok}
            className={status.dodok ? styles["active"] : styles["notActive"]}
          >
            도독
          </li>
          <li
            onClick={goMyTeamArticle}
            className={status.article ? styles["active"] : styles["notActive"]}
          >
            게시판
          </li>
          <li
            onClick={goMyTeamRecord}
            className={status.record ? styles["active"] : styles["notActive"]}
          >
            지난활동
          </li>
          {myRole === "USER"  ? 
          null : (
            <div>
              <li
                onClick={goMyTeamManage}
                className={
                  status.teamManage ? styles["active"] : styles["notActive"]
                }
              >
                모임 관리
              </li>
              <li
                onClick={goMyTeamMemberManage}
                className={
                  status.memberManage ? styles["active"] : styles["notActive"]
                }
              >
                모임원 관리
              </li>
            </div>)}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
