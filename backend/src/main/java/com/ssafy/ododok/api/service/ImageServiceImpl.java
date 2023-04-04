package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.dto.ImageUploadDto;
import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;

    @Value("${file.path}")
    private String uploadFolder;

    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public void upload(ImageUploadDto imageUploadDto, User user) {

        String originalFileName = imageUploadDto.getFile().getOriginalFilename();
        File destination = new File("upload/dir" + originalFileName);
        try {
            imageUploadDto.getFile().transferTo(destination);
        } catch (IOException e) {
            e.printStackTrace();
        }
//        UUID uuid = UUID.randomUUID();
//        String imageFileName = uuid + "_" + imageUploadDto.getFile().getOriginalFilename();
//
//        Path imageFilePath = Paths.get(uploadFolder + imageFileName);
//
//        try {
//            Files.write(imageFilePath, imageUploadDto.getFile().getBytes());
//        } catch(Exception e) {
//            e.printStackTrace();
//        }
    }
}
