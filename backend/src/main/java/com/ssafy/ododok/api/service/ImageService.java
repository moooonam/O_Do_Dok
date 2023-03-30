package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.dto.ImageUploadDto;
import com.ssafy.ododok.db.model.User;

public interface ImageService {

    void upload(ImageUploadDto imageUploadDto, User user);
}
