// IMPORTS ---------------------------------------
  // ANGULAR ------------------------
  import { NgModule }                 from '@angular/core';
  import { CommonModule }             from '@angular/common';
  import { HttpClientModule }         from '@angular/common/http';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { MaterialModule }           from '../material/material.module';

  // SERVICES -----------------------
  import { PipesModule }              from '../common/pipes/pipes.module';
  import { UtilService }              from '../common/services/util.service';

  // OBJECT -------------------------
  import { VideoRoutingModule }       from './video-routing.module';
  import { VideoService }             from './video.service';
  import { VideoFeaturedComponent }   from './video-featured/video-featured.component';
  import { VideoListComponent }       from './video-list/video-list.component';




@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    VideoRoutingModule
  ],
  declarations: [
    VideoFeaturedComponent, VideoListComponent
  ],
  providers:    [VideoService, UtilService]
})
export class VideoModule { }
