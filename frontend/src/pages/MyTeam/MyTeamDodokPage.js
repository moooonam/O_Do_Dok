import React, { useState, useEffect } from "react";
import BeforeDodok from "../../components/MyTeam/BeforeDodok";
import AfterDodok from "../../components/MyTeam/AfterDodok";
import { Api } from "../../Api";

function MyTeamDodokPage() {
  const [dodokCheck, setDodokCheck] = useState({
    ongoingDodok : null,
  })
  useEffect(() => {
    Api.get('/user/myTeam',{headers: {
      "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
      "access-token": `Bearer ${localStorage.getItem("access-token")}`,
    }})
      .then((res) => {
        // console.log('마이팅정보',res)
        setDodokCheck({ ...dodokCheck, ongoingDodok: res.data.ongoingDodok})
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>{ dodokCheck.ongoingDodok ? <AfterDodok /> : <BeforeDodok />}
    </div>
  );
}

export default MyTeamDodokPage;
