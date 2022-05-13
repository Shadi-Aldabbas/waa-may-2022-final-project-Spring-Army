package com.project.pmp.controller;

import com.project.pmp.service.AmazonClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/api/v1/file-uploads")
public class PhotoUploadController {


    @Autowired
    private AmazonClientService amazonClientService;

    @PostMapping
    public String uploadFile(@RequestPart(value = "file") MultipartFile file) {
        return amazonClientService.upload(file);
    }

}
