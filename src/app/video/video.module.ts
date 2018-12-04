// IMPORTS ---------------------------------------
  import { NgModule }                 from '@angular/core';
  import { CommonModule }             from '@angular/common';
  import { HttpClientModule }         from '@angular/common/http';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { MaterialModule }           from '../material/material.module';

  import { VideoRoutingModule }       from './video-routing.module';
  import { VideoService }             from './video.service';

  import { VideoFeaturedComponent }   from './video-featured/video-featured.component';
  import { VideoListComponent }       from './video-list/video-list.component';
  import { VideoSearchComponent }     from './video-search/video-search.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    VideoRoutingModule
  ],
  declarations: [VideoFeaturedComponent, VideoListComponent, VideoSearchComponent],
  providers:    [VideoService]
})
export class VideoModule { }
