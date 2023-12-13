package com.iamsajan.youtubeclone.service;

import com.iamsajan.youtubeclone.model.Video;
import com.iamsajan.youtubeclone.repository.VideoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
public class VideoService {
    private final LocalBucketService localBucketService;
    private final VideoRepository videoRepository;

    public VideoService(LocalBucketService localBucketService, VideoRepository videoRepository) {
        this.localBucketService = localBucketService;
        this.videoRepository = videoRepository;
    }

    public void uploadVideo(MultipartFile multipartFile) {
        // upload file to local storage get the path
        log.info("Uploading video to local storage");
        String videoUrl = localBucketService.uploadFile(multipartFile);
        log.info("Video url: {}", videoUrl);

        // save video details to db
        Video video = Video.builder()
                .title(multipartFile.getOriginalFilename())
                .url(videoUrl)
                .build();
        log.info("Saving video details to db");
        videoRepository.save(video);

    }
}
