import React from 'react'
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";

function MyTeamManagePage() {
  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar />
      <div className={sidestyles.others}>
        <h2>모임관리</h2>
      </div>
    </div>
  )
}

export default MyTeamManagePage