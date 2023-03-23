import React from 'react'
import SideBar from '../../components/SideBar'
import sidestyles from '../../styles/Sidebar.module.scss'
import articlestyles from '../../styles/MyTeamArticle.module.scss'
import { useNavigate } from "react-router-dom";

function MyTeamArticlePage() {
  const movePage = useNavigate();
  function goArticleCreate() {
    movePage("/myteamarticle/create");
  }

  return (
    <div className={sidestyles['myteam-container']}> 
        <SideBar location={"article"}/>
        <div className={sidestyles.others}>
          <div className={articlestyles["articles-container"]}>
            <h2>게시판</h2>
            <div className={articlestyles["menuBox"]}>
              <div className={articlestyles["menuLeft"]}>
                <p className={articlestyles["menuOne"]}>전체(27)</p>
                <p className={articlestyles["menuOne"]}>공지사항(12)</p>
                <p>자유게시판(15)</p>
              </div>
              <div className={articlestyles["menuRight"]} onClick={goArticleCreate}>+</div>
            </div>
            <hr />
            <div className={articlestyles["articleOne"]}>
              <p className={articlestyles["articleType"]}>분류</p>
              <p className={articlestyles["articleTitle"]}>게시글 내용이 들어갈 자리입니다. 게시글 내용이 들어갈 자리입니다.</p>
              <p className={articlestyles["articleUser"]}>작성자이름</p>
            </div>
            <div className={articlestyles["articleOne"]}>
              <p className={articlestyles["articleType"]}>분류</p>
              <p className={articlestyles["articleTitle"]}>게시글 내용이 들어갈 자리입니다. 게시글 내용이 들어갈 자리입니다.</p>
              <p className={articlestyles["articleUser"]}>작성자이름</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default MyTeamArticlePage