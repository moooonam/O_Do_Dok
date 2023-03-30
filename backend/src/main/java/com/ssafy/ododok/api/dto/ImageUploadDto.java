package com.ssafy.ododok.api.dto;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class ImageUploadDto {
    MultipartFile file;
}
