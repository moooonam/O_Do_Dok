package com.ssafy.ododok;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class OdodokApplication {
	public static void main(String[] args) {
		SpringApplication.run(OdodokApplication.class, args);
	}
}
