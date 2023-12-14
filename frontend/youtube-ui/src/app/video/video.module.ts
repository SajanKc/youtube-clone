import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VideoRoutingModule} from './video-routing.module';
import { SavedVideoDetailsComponent } from './saved-video-details/saved-video-details.component';


@NgModule({
  declarations: [
    SavedVideoDetailsComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule
  ]
})
export class VideoModule {
}
