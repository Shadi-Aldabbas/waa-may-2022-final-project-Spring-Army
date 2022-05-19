package com.project.pmp.service;

import org.springframework.web.multipart.MultipartFile;

public interface AmazonClientService {
    public String upload(MultipartFile multipartFile);
    public String delete(String fileUrl);
}
