package com.ssafy.ododok.api.request;

import lombok.Data;

@Data
public class BookAddRequestReq {
    String bookTitle;
    String bookAuthor;
    String genre;
    int page;
}
