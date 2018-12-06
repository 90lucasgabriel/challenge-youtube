import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

import { VideoFeaturedComponent }     from './video-featured/video-featured.component';
import { VideoSearchComponent }       from './video-search/video-search.component';
import { VideoListComponent }         from './video-list/video-list.component';

const videoRoutes: Routes = [
  { path: '',                component: VideoFeaturedComponent, pathMatch: 'full' },
  { path: 'video',           component: VideoFeaturedComponent, pathMatch: 'full' },
  { path: 'video/list',      component: VideoListComponent,     pathMatch: 'full' },
  { path: 'video/search',    component: VideoSearchComponent,   pathMatch: 'full' },

];

@NgModule({
  imports: [
    RouterModule.forChild(videoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class VideoRoutingModule { }
