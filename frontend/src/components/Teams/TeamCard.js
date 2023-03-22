import React from "react";
import styles from "../../styles/Teams.module.scss";
function TeamCard() {
  const teams = [
    {
      id: 1,
      teamName: "개발진스1",
      isOnline: true,
      genre: "공포",
      teamImg:
        "https://velog.velcdn.com/images/heelieben/post/85d5650b-0108-4e9a-89f7-d16f0288d020/image.png",
    },
    {
      id: 2,
      teamName: "개발진스2",
      isOnline: true,
      genre: "공포",
      teamImg:
        "https://velog.velcdn.com/images/heelieben/post/bfa1ec30-4514-4d01-aa1d-52011a5fcf91/image.png",
    },
    {
      id: 3,
      teamName: "개발진스3",
      isOnline: true,
      genre: "공포",
      teamImg:
        "https://velog.velcdn.com/images/heelieben/post/33a67fb4-edd9-475b-b5e7-6a5f765f601f/image.png",
    },
    {
      id: 4,
      teamName: "개발진스4",
      isOnline: false,
      genre: "공포",
      teamImg:
        "https://velog.velcdn.com/images/heelieben/post/85d5650b-0108-4e9a-89f7-d16f0288d020/image.png",
    },
    {
      id: 5,
      teamName: "개발진스5",
      isOnline: true,
      genre: "공포",
      teamImg:
        "https://velog.velcdn.com/images/heelieben/post/bfa1ec30-4514-4d01-aa1d-52011a5fcf91/image.png",
    },
    // {
    //   id: 6,
    //   teamName: "개발진스6",
    //   isOnline: true,
    //   genre: "공포",
    //   teamImg:
    //     "https://velog.velcdn.com/images/heelieben/post/33a67fb4-edd9-475b-b5e7-6a5f765f601f/image.png",
    // },
  ];

  const renderTeamCard = teams.map((team) => {
    return (
      <div key={team.id} className={styles["wrap-team"]}>
        <img src={team.teamImg} alt="" />
        <div className={styles.teamname}>{team.teamName}</div>
        <div className={styles["wrap-isonline-genre"]}>
          <div>
            {team.isOnline ? 
            <div>#온라인</div> 
            : 
            <div>#오프라인</div>}
            </div>
          <div>#{team.genre}</div>
        </div>
      </div>
    );
  });
  return <div className={styles["wrap-teamcards"]}>{renderTeamCard}</div>;
}

export default TeamCard;
