package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ImageRepository extends JpaRepository<Image,Long> {

}
