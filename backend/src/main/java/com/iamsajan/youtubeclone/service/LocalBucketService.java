package com.iamsajan.youtubeclone.service;

import com.iamsajan.youtubeclone.dto.UploadResponseDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class LocalBucketService implements FileService {

    String localBucketPath = "http://localhost:8079/bucket/upload/multipart";
    String folder = "youtube-videos";

    @Override
    public String uploadFile(MultipartFile multipartFile) {
        String contentType = multipartFile.getContentType();
        // add exception for invalid file type
        String fileType = contentType != null ? contentType.substring(0, contentType.indexOf("/")).toUpperCase() : null;

        RestTemplate restTemplate = new RestTemplate();

        // Create headers with Content-Type set to multipart/form-data
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // Create the request body with file, folder, and fileType parameters
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", multipartFile.getResource());
        body.add("folder", folder);
        body.add("fileType", fileType);

        // Create the HTTP entity with headers and body
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        UploadResponseDto uploadResponseDto = restTemplate.postForObject(localBucketPath, requestEntity, UploadResponseDto.class);

        return uploadResponseDto.getData().getAbsolutePath();
    }
}
