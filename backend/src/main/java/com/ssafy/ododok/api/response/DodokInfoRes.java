package com.ssafy.ododok.api.response;

import com.ssafy.ododok.db.model.Dodok;
import com.ssafy.ododok.db.model.ReviewEnd;
import com.ssafy.ododok.db.model.ReviewPage;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DodokInfoRes {
    Dodok dodok;
    List<ReviewPage> reviewPageList;
    List<ReviewEnd> reviewEndList;
    public DodokInfoRes(Dodok dodok,List<ReviewPage> reviewPageList, List<ReviewEnd> reviewEndList){
        this.dodok=dodok;
        this.reviewPageList=reviewPageList;
        this.reviewEndList=reviewEndList;
    }

}
