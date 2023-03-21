package com.ssafy.ododok.api.request;

import lombok.Data;

@Data
public class BookAddPostReq {
    String bookTitle;
    String bookAuthor;
    String genre;
    int page;
}
