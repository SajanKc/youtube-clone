import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadVideoResponse} from "./dto/UploadVideoResponse";
import {VideoDto} from "./dto/VideoDto";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseUrl = 'http://localhost:8080/api/v1/videos';

  constructor(private httpClient: HttpClient) {
  }

  uploadVideo(file: File): Observable<UploadVideoResponse> {
    let formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post<UploadVideoResponse>(this.baseUrl, formData)
  }

  updateVideoMetaData(videoDto: VideoDto): Observable<any> {
    return this.httpClient.put(this.baseUrl, videoDto)
  }

}
