package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.DodokCreateReq;
import com.ssafy.ododok.db.model.*;
import com.ssafy.ododok.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DodokServiceImpl implements DodokService {
    @Autowired
    DodokRepository dodokRepository;
    @Autowired
    ReviewPageRepository reviewPageRepository;
    @Autowired
    ReviewEndRepository reviewEndRepository;
    @Autowired
    TeamUserRepository teamUserRepository;
    @Autowired
    BookRepository bookRepository;

    @Override
    public List<Dodok> showLastAllDodoks(User user) {
//        List<Dodok> lastDodokList = new ArrayList<>();
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        List<Dodok>lastDodokList = dodokRepository.findAllByTeamAndDodokComplete(team,true)
                .orElseThrow(()-> new NoSuchElementException());
        return lastDodokList;
    }
    @Override
    public List<ReviewPage> getReviewPageList(Dodok dodok) {
        List<ReviewPage> reviewPageList = reviewPageRepository.findAllByDodok(dodok);
        return reviewPageList;
    }

    @Override
    public List<ReviewPage> getCurReviewPageList(User user) {
        TeamUser teamUser= teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        Optional<List<Dodok>>list = dodokRepository.findAllByTeamAndDodokComplete(team,false);
        if(list.isPresent()){
            Dodok dodok = list.get().get(0);
            List<ReviewPage> reviewPageList= reviewPageRepository.findAllByDodok(dodok);
            return reviewPageList;
        }else{
            return null;
        }
    }

    @Override
    public List<ReviewEnd> getRivewEndList(Dodok dodok) {
        List<ReviewEnd> reviewEndList = reviewEndRepository.findAllByDodok(dodok);
        return reviewEndList;
    }
    @Override
    public void startDodok(User user, DodokCreateReq dodokCreateReq) {
        String BookTitle= dodokCreateReq.getBookTitle();
        String BookAuthor = dodokCreateReq.getAuthor();
        int BookPage = dodokCreateReq.getPage();
        Book newBook = new Book(dodokCreateReq.getBookTitle(),
                dodokCreateReq.getAuthor(),dodokCreateReq.getPage());
        Book saveBook= bookRepository.findByBookTitleAndBookAuthor(BookTitle,BookAuthor)
                .orElse(newBook);


        TeamUser teamUser=teamUserRepository.findByUser(user);
        Team team =teamUser.getTeam();

        Dodok dodok=new Dodok(team,saveBook,dodokCreateReq.getStartDate(),dodokCreateReq.getEndDate());
        dodokRepository.save(dodok);
        return;
    }
}
