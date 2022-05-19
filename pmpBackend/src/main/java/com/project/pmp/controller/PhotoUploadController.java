package com.project.pmp.controller;

import com.project.pmp.security.Constants;
import com.project.pmp.service.AmazonClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/api/v1/file-uploads")
@CrossOrigin
public class PhotoUploadController {


    @Autowired
    private AmazonClientService amazonClientService;

    @PostMapping
    @RolesAllowed({Constants.ADMIN, Constants.LANDLOARD})
    public String uploadFile(@RequestPart(value = "file") MultipartFile file) {
        return amazonClientService.upload(file);
    }

    @DeleteMapping
    @RolesAllowed({Constants.ADMIN,  Constants.LANDLOARD})
    public String deleteFile(@RequestPart(value = "url") String fileUrl) {
        return this.amazonClientService.delete(fileUrl);
    }

}
