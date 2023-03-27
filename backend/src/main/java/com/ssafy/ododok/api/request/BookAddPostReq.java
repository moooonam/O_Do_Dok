package com.ssafy.ododok.api.request;

import lombok.Getter;

@Getter
public class BookAddPostReq {
    String bookTitle;
    String bookAuthor;
    String genre;
    int page;
}
