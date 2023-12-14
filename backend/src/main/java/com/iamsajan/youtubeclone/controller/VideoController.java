package com.iamsajan.youtubeclone.controller;

import com.iamsajan.youtubeclone.dto.UploadVideoResponseDto;
import com.iamsajan.youtubeclone.dto.VideoDto;
import com.iamsajan.youtubeclone.service.VideoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/api/v1/videos")
public class VideoController {
    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UploadVideoResponseDto uploadVideo(@RequestParam("file") MultipartFile multipartFile) {
        return videoService.uploadVideo(multipartFile);
    }

    @PostMapping("/thumbnail")
    @ResponseStatus(HttpStatus.CREATED)
    public String uploadThumbnail(@RequestParam("file") MultipartFile multipartFile, @RequestParam("videoId") String videoId) {
        return videoService.uploadThumbnail(multipartFile, videoId);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public VideoDto editVideoMetaData(@RequestBody VideoDto videoDto) {
        return videoService.editVideoMetaData(videoDto);

    }
}
