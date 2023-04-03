package com.ssafy.ododok.api.response;

import com.ssafy.ododok.db.model.Dodok;
import com.ssafy.ododok.db.model.ReviewEnd;
import com.ssafy.ododok.db.model.ReviewPage;
import lombok.Getter;

import java.util.List;

@Getter
public class DodokInfoRes2 {
    Dodok dodok;
    List<ReviewPageRes> reviewPageList;
    List<ReviewEndRes> reviewEndList;
    public DodokInfoRes2(Dodok dodok,List<ReviewPageRes> reviewPageList, List<ReviewEndRes> reviewEndList){
        this.dodok=dodok;
        this.reviewPageList=reviewPageList;
        this.reviewEndList=reviewEndList;
    }
}
