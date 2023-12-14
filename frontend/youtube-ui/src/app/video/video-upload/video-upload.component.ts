import {Component} from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";
import {VideoService} from "../video.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent {
  public files: NgxFileDropEntry[] = [];
  fileUploaded: boolean = false;
  fileEntry: FileSystemFileEntry | undefined;

  constructor(private videoService: VideoService,
              private router: Router) {
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.fileUploaded = true;
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  uploadVideo() {
    if (this.fileEntry != undefined) {
      this.fileEntry.file((file: File) => {
        this.videoService.uploadVideo(file).subscribe(
          response => {
            this.fileUploaded = false;
            console.log("Video uploaded successfully.", response);
            this.router.navigateByUrl("/saved-video-details/" + response.videoId);
          },
          error => {
            console.log("Error uploading video.", error);
          }
        )
      });
    }
  }
}
