import { BrowserModule }              from '@angular/platform-browser';
import { NgModule }                   from '@angular/core';

import { AppRoutingModule }           from './app-routing.module';
import { MaterialModule }             from './material/material.module';

import { AppComponent }               from './app.component';
import { VideoListComponent } from './video/video-list/video-list.component';
import { HomeListComponent } from './home/home-list/home-list.component';
import { VideoSearchComponent } from './video/video-search/video-search.component';
import { VideoFeaturedComponent } from './video/video-featured/video-featured.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoListComponent,
    HomeListComponent,
    VideoSearchComponent,
    VideoFeaturedComponent
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
