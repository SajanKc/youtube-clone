import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VideoRoutingModule} from './video-routing.module';
import { SaveVideoDetailsComponent } from './save-video-details/save-video-details.component';
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SaveVideoDetailsComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class VideoModule {
}
