import { BrowserRouter, Routes, Route } from "react-router-dom";
import Heaader from './components/Header'
import MainPage from './pages/MainPage'

// 유저 관련
import SignupPage from './pages/User/SignupPage'
import LoginPage from "./pages/User/LoginPage";
import MyPage from "./pages/User/MyPage";
import UserInfoUpdatePage from "./pages/User/UserInfoUpdatePage";
import UserPasswordUpdatePage from "./pages/User/UserPasswordUpdatePage";

// 나의 모임 관련
import MyTeamMainPage from "./pages/MyTeam/MyTeamMainPage";
import MyTeamDodokPage from "./pages/MyTeam/MyTeamDodokPage";
import MyTeamArticlePage from "./pages/MyTeam/MyTeamArticlePage";
import MyTeamRecordPage from "./pages/MyTeam/MyTeamRecordPage";
import MyTeamMemberManagePage from "./pages/MyTeam/MyTeamMemberManagePage";
import MyTeamManagePage from "./pages/MyTeam/MyTeamManagePage";
import MyTeamRecordDetail from "./pages/MyTeam/MyTeamRecordDetailPage";

// 소개 페이지
import AboutUsPage from "./pages/AboutUsPage";

// 모임신청 관련

import TeamsMainPage from "./pages/Teams/TeamsMainPage";

//오도독 책장

import OpenReviewsPage from "./pages/OpenReviewsPage"; 

// css
import styles from './styles/App.module.scss'

function App() {
  return (
    <div className={styles.app}>
    <BrowserRouter>
      <Heaader/>
      <Routes>
        <Route exact path="/" element={<MainPage/>}/>
        <Route exact path="/signup" element={<SignupPage/>}/>
        <Route exact path="/login" element={<LoginPage/>}/>
        <Route exact path="/mypage" element={<MyPage/>}/>
        <Route exact path="/mypage/update" element={<UserInfoUpdatePage/>}/>
        <Route exact path="/mypage/update/password" element={<UserPasswordUpdatePage/>}/>
        <Route exact path="/myteammain" element={<MyTeamMainPage/>}/>
        <Route exact path="/myteamdodok" element={<MyTeamDodokPage/>}/>
        <Route exact path="/myteamarticle" element={<MyTeamArticlePage/>}/>
        <Route exact path="/myteamrecord" element={<MyTeamRecordPage/>}/>
        <Route exact path="/myteamrecorddetail" element={<MyTeamRecordDetail/>}/>
        <Route exact path="/myteam/membermanage" element={<MyTeamMemberManagePage/>}/>
        <Route exact path="/myteam/manage" element={<MyTeamManagePage/>}/>
        <Route exact path="/about-us" element={<AboutUsPage/>}/>
        <Route exact path="/teams" element={<TeamsMainPage/>}/>
        <Route exact path="/openreviews" element={<OpenReviewsPage/>}/>

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
