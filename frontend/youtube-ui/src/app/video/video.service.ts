import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseUrl = 'http://localhost:8080/api/v1/videos';

  constructor(private httpClient: HttpClient) {
  }

  uploadVideo(file: File): Observable<any> {
    let formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post(this.baseUrl, formData)
  }


}
