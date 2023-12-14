package com.iamsajan.youtubeclone.service;

import com.iamsajan.youtubeclone.dto.UploadVideoResponseDto;
import com.iamsajan.youtubeclone.dto.VideoDto;
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

    public UploadVideoResponseDto uploadVideo(MultipartFile multipartFile) {
        // upload file to local storage get the path
        log.info("Uploading video to local storage");
        String videoUrl = localBucketService.uploadFile(multipartFile);
        log.info("Video url: {}", videoUrl);

        // save video details to db
        Video video = Video.builder()
                .url(videoUrl)
                .build();
        log.info("Saving video details to db");
        Video savedVideo = videoRepository.save(video);
        return new UploadVideoResponseDto(savedVideo.getId(), videoUrl);
    }

    public VideoDto editVideoMetaData(VideoDto videoDto) {
        // find the video by video id
        Video savedVideo = getVideoById(videoDto.getId());

        // map the videoDto to video
        savedVideo.setTitle(videoDto.getTitle());
        savedVideo.setDescription(videoDto.getDescription());
        savedVideo.setTags(videoDto.getTags());
        savedVideo.setThumbnailUrl(videoDto.getThumbnailUrl());
        savedVideo.setVideoStatus(videoDto.getVideoStatus());

        // save the video to the database
        videoRepository.save(savedVideo);
        log.info("Video metadata updated successfully");

        return videoDto;
    }

    public String uploadThumbnail(MultipartFile multipartFile, String videoId) {
        // find the video by video id
        Video savedVideo = getVideoById(videoId);
        log.info("Uploading thumbnails to local storage");
        String thumbnailUrl = localBucketService.uploadFile(multipartFile);
        savedVideo.setThumbnailUrl(thumbnailUrl);

        return thumbnailUrl;
    }

    public Video getVideoById(String videoId) {
        return videoRepository.findById(videoId)
                .orElseThrow(() -> new IllegalArgumentException("Video not found"));
    }
}
