import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadVideoResponse} from "./UploadVideoResponse";

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


}
