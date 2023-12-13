package com.iamsajan.youtubeclone.dto;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Data
public class UploadResponseDto implements Serializable {
    private HttpStatus status;
    private String message;
    private UploadDto data;
}
