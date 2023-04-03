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
import ArticleDetailPage from "./pages/MyTeam/ArticleDetailPage";
import ArticleCreatePage from "./pages/MyTeam/ArticleCreatePage";
import ArticleUpdatePage from "./pages/MyTeam/ArticleUpdatePage";

// 소개 페이지
import AboutUsPage from "./pages/AboutUsPage";

// 모임신청 관련

import TeamsMainPage from "./pages/Teams/TeamsMainPage";
import TeamDetailPage from "./pages/Teams/TeamDetailPage";
//오도독 책장

import OpenReviewsPage from "./pages/OpenReviewsPage"; 
import OpenReviewDetailPage from "./pages/OpenReviewDetailPage"; 

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
        <Route exact path="/myteam/:teamId/main" element={<MyTeamMainPage/>}/>
        <Route exact path="/myteam/:teamId/dodok" element={<MyTeamDodokPage/>}/>
        <Route exact path="/myteam/:teamId/article" element={<MyTeamArticlePage/>}/>
        <Route exact path="/myteam/:teamId/article/:articleId" element={<ArticleDetailPage/>}/>
        <Route exact path="/myteam/:teamId/article/create" element={<ArticleCreatePage/>}/>
        <Route exact path="/myteam/:teamId/article/:articleId/update" element={<ArticleUpdatePage/>}/>
        <Route exact path="/myteam/:teamId/record" element={<MyTeamRecordPage/>}/>
        <Route exact path="/myteam/:teamId/record/:recordId" element={<MyTeamRecordDetail/>}/>
        <Route exact path="/myteam/:teamId/membermanage" element={<MyTeamMemberManagePage/>}/>
        <Route exact path="/myteam/:teamId/manage" element={<MyTeamManagePage/>}/>
        <Route exact path="/about-us" element={<AboutUsPage/>}/>
        <Route exact path="/teams" element={<TeamsMainPage/>}/>
        <Route exact path="/teams/:teamId" element={<TeamDetailPage/>}/>
        <Route exact path="/openreviews" element={<OpenReviewsPage/>}/>
        <Route exact path="/openreviews/:recordId" element={<OpenReviewDetailPage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
