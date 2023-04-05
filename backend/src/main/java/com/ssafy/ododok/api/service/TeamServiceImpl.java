package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.TeamCreatePostReq;
import com.ssafy.ododok.api.request.TeamModifyPatchReq;
import com.ssafy.ododok.db.model.*;
import com.ssafy.ododok.db.repository.TeamRepository;
import com.ssafy.ododok.db.repository.TeamUserRepository;
import com.ssafy.ododok.db.repository.UserSurveyRepository;
import com.ssafy.ododok.db.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static com.ssafy.ododok.db.model.Role.MANAGER;
import static com.ssafy.ododok.db.model.Role.USER;
import static java.time.LocalTime.now;

@Service
public class TeamServiceImpl implements TeamService{

    private final TeamRepository teamRepository;
    private final TeamUserRepository teamUserRepository;
    private final DodokRepository dodokRepository;
    private final ReviewPageRepository reviewPageRepository;
    private final ReviewEndRepository reviewEndRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final UserSurveyRepository userSurveyRepository;
    private final GenreRepository genreRepository;

    public TeamServiceImpl(TeamRepository teamRepository, TeamUserRepository teamUserRepository,
                           DodokRepository dodokRepository, ReviewPageRepository reviewPageRepository, ReviewEndRepository reviewEndRepository, UserRepository userRepository, CommentRepository commentRepository, BoardRepository boardRepository, UserSurveyRepository userSurveyRepository, GenreRepository genreRepository) {
        this.teamRepository = teamRepository;
        this.teamUserRepository = teamUserRepository;
        this.dodokRepository = dodokRepository;
        this.reviewPageRepository = reviewPageRepository;
        this.reviewEndRepository = reviewEndRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
        this.userSurveyRepository = userSurveyRepository;
        this.genreRepository = genreRepository;
    }

    // 팀 생성
    @Override
    public void createTeam(TeamCreatePostReq teamCreatePostReq, User user) {

        // 팀에 속해있다면 팀 생성 불가
        if(teamUserRepository.findByUser(user) != null) {
            System.out.println("팀 생성 불가");
            return;
        }

        UserSurvey userSurvey = userSurveyRepository.findByUser(user);

        Team team = Team.builder()
                .teamName(teamCreatePostReq.getTeamName())
                .teamMemberCntMax(teamCreatePostReq.getTeamMemberCntMax())
                .teamOnoff(teamCreatePostReq.getTeamOnoff())
                .teamRegion(teamCreatePostReq.getTeamRegion())
                .teamGenre1(teamCreatePostReq.getTeamGenre1())
                .teamGenre2(teamCreatePostReq.getTeamGenre2())
                .teamGenre3(teamCreatePostReq.getTeamGenre3())
                .teamRecruit(true)
                .teamAge(userSurvey.getUserAge())
                .build();
        teamRepository.save(team);

        // 자기 자신 팀에 추가
        addAdmin(team.getTeamId(), user);
        System.out.println("팀 생성 성공");
    }

    // 모든 팀 조회
    public List<Team> getAllTeams(){
        return teamRepository.findAll();
    }

    // 팀 이름으로 조회
    @Override
    public List<Team> getTeamInfoByTeamName(String teamName) {
        List<Team> list = teamRepository.findByTeamNameContaining(teamName);
        return list;
    }

    // 팀 정보 수정
    @Override
    public Team modifyTeam(Long teamId, TeamModifyPatchReq teamModifyPatchReq) {
        Optional<Team> oTeam = teamRepository.findById(teamId);

        Team team = oTeam.get();

        // Team 수정
        team.updateTeam(teamModifyPatchReq);

        return teamRepository.save(team);
    }

    // 팀 삭제
    @Transactional
    @Override
    public void deleteTeam(Long teamId) {
        // GenreRepository에서도 삭제
        List<Genre> genreList = genreRepository.findAllByTeam_TeamId(teamId);
        for(Genre genre : genreList){
            genreRepository.delete(genre);
        }

        // 도독이 삭제되어야 함
        // 도독이 삭제되려면 페이지별 리뷰 책별 리뷰 다 삭제되어야 함
        List<Dodok> dodokList = dodokRepository.findAllByTeam_TeamId(teamId);
        for(Dodok dodok : dodokList){
            // 페이지별 리뷰, 총평 삭제
            List<ReviewPage> pageReviewList =reviewPageRepository.findAllByDodok(dodok);
            for(ReviewPage reviewPage: pageReviewList){
                User user = reviewPage.getUser();
                user.changeReviewcnt(user.getUserReviewcnt()-1);
                userRepository.save(user);
            }

            List<ReviewEnd> endReviewList =reviewEndRepository.findAllByDodok(dodok);
            for(ReviewEnd reviewEnd : endReviewList){
                User user = reviewEnd.getUser();
                user.changeReviewcnt(user.getUserReviewcnt()-1);
                userRepository.save(user);
            }
            reviewPageRepository.deleteAllByDodok(dodok);
            reviewEndRepository.deleteAllByDodok(dodok);

            //도독 삭제 추가해야함.
            dodokRepository.delete(dodok);
        }

        // 게시판 글 삭제
        List<Board> list_board = boardRepository.findAllByTeam_TeamId(teamId);
        for(Board board : list_board){
            commentRepository.deleteAllByBoard_BoardId(board.getBoardId());
        }
        Team team = teamRepository.findByTeamId(teamId).get();
        boardRepository.deleteAllByTeam(team);

        // teamUser 먼저 삭제
        teamUserRepository.deleteByTeam_TeamId(teamId);
        // team
        // team 삭제
        teamRepository.deleteById(teamId);
    }

    // 팀을 만들 때 - ADMIN으로 지정
    @Override
    public void addAdmin(Long teamId, User user) {

        Optional<Team> oTeam = teamRepository.findById(teamId);
        Team team = oTeam.get();

        TeamUser teamUser = TeamUser.builder()
                .team(team)
                .user(user)
                .role(Role.ADMIN)
                .joinDate(LocalDate.now())
                .build();

        System.out.println("teamUser = " + teamUser);
        teamUserRepository.save(teamUser);
    }

    // 팀 신청 / 멤버 초대할 시 - USER로 지정
//    @Override
//    public void addMember(Long teamId, User user, String msg) {
//
//        // 팀에 속해있다면 팀 신청 불가
//        if(teamUserRepository.findByUser(user) != null) {
//            System.out.println("팀 가입 불가");
//            return;
//        }
//
//        Optional<Team> oTeam = teamRepository.findById(teamId);
//        Team team = oTeam.get();
//
//        TeamUser teamUser = TeamUser.builder()
//                .team(team)
//                .user(user)
//                .role(USER)
//                .build();
//
//        System.out.println("teamUser = " + teamUser);
//        teamUserRepository.save(teamUser);
//        System.out.println("팀 가입 성공");
//    }

    // 팀ID로 팀 멤버 조회
    @Override
    public List<TeamUser> getMemberByTeamId(Long teamId) {
        List<TeamUser> teamUserList = teamUserRepository.findTeamUsersByTeam_TeamId(teamId);
        return teamUserList;
    }

    // 모임의 구성원 삭제
    @Transactional
    @Override
    public void deleteMember(Long userId) {
        // 인원 감소시킬 팀 테이블 찾기
        TeamUser teamUser = teamUserRepository.findTeamUserByUser_UserId(userId);
        User user = teamUser.getUser();
        Team team = teamUser.getTeam();

        // 삭제되면 팀 인원 -1
        Team updateTeam = teamRepository.findByTeamId(team.getTeamId()).get();
        updateTeam.changeTeamMemberCnt(updateTeam.getTeamMemberCnt()-1);

        // 테이블에서 멤버 삭제
        teamUserRepository.deleteByUser_UserId(userId);

        // 테이블 업데이트
        teamRepository.save(updateTeam);

        // 팀원 평균 나이 갱신
        double x = team.getTeamAge(); // 33.5
        System.out.println("x : "+x);
        double y = team.getTeamMemberCnt()+1; // 2
        System.out.println("y : "+y);
        double z = ((x * y) - (double) userSurveyRepository.findByUser(user).getUserAge()) / (y-1);
        System.out.println("z : "+z);
        updateTeam.changeTeamAge(z);
//        updateTeam.setTeamAge(z);
        teamRepository.save(updateTeam);
    }

    // 모임 구성원 직책 변경
    @Override
    public int modifyGrade(Long userId) {
        Optional<TeamUser> oTeamUser = teamUserRepository.findById(userId);
        TeamUser teamUser = oTeamUser.get();

        // 관리자로 변경하면 1 일반 유저로 변경하면 0
        if(teamUser.getRole().equals(USER)) {
            teamUser.changeRole(MANAGER);
            teamUserRepository.save(teamUser);
            return 1;
        }

        if (teamUser.getRole().equals(MANAGER)){
            teamUser.changeRole(USER);
            teamUserRepository.save(teamUser);
            return 2;
        }

        return 0;
    }

    @Override
    public Team getTeamByTeamName(String teamName) {
        Team team = teamRepository.findByTeamName(teamName).get();
        return team;
    }

    @Override
    public Team getTeamInfoByTeamId(Long teamId) {
        Team team = teamRepository.findByTeamId(teamId).get();
        return team;
    }

}
