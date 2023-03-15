import { BrowserRouter, Routes, Route } from "react-router-dom";
import Heaader from './components/Header'
import MainPage from './pages/MainPage'
import SignupPage from './pages/User/SignupPage'
import LoginPage from "./pages/User/LoginPage";

// 나의 모임 관련
import MyTeamMainPage from "./pages/MyTeam/MyTeamMainPage";
import MyTeamDodokPage from "./pages/MyTeam/MyTeamDodokPage";
import MyTeamArticlePage from "./pages/MyTeam/MyTeamArticlePage";
import MyTeamRecordPage from "./pages/MyTeam/MyTeamRecordPage";

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
        <Route exact path="/myteammain" element={<MyTeamMainPage/>}/>
        <Route exact path="/myteamdodok" element={<MyTeamDodokPage/>}/>
        <Route exact path="/myteamarticle" element={<MyTeamArticlePage/>}/>
        <Route exact path="/myteamrecord" element={<MyTeamRecordPage/>}/>
        <Route exact path="/about-us" element={<AboutUsPage/>}/>
        <Route exact path="/teams" element={<TeamsMainPage/>}/>
        <Route exact path="/openreviews" element={<OpenReviewsPage/>}/>

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
