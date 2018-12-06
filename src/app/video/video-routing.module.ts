// IMPORTS -----------------------------------------
  import { NgModule }                   from '@angular/core';
  import { RouterModule, Routes }       from '@angular/router';

  import { VideoFeaturedComponent }     from './video-featured/video-featured.component';
  import { VideoListComponent }         from './video-list/video-list.component';



// ROUTES -----------------------------------------
  const videoRoutes: Routes = [
    { path: '',                 redirectTo: 'video',                pathMatch: 'full' },
    { path: 'video',            component: VideoFeaturedComponent,  pathMatch: 'full' },
    { path: 'video/list',       component: VideoListComponent,      pathMatch: 'full' },
    { path: 'video/list/:q',    component: VideoListComponent,      pathMatch: 'full' },
    { path: 'video/:id',        component: VideoFeaturedComponent,  pathMatch: 'full' },
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
