import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VideoUploadComponent} from "./video-upload/video-upload.component";
import {SavedVideoDetailsComponent} from "./saved-video-details/saved-video-details.component";

const routes: Routes = [
  {
    path: "video-upload",
    component: VideoUploadComponent
  },
  {
    path: "saved-video-details/:videoId",
    component: SavedVideoDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule {
}
