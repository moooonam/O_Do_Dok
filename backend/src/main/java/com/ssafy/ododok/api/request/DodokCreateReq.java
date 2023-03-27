package com.ssafy.ododok.api.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
public class DodokCreateReq{
    String bookTitle;
    String author;
    String genre;
    int page;
    LocalDate endDate;
}

