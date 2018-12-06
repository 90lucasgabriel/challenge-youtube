import { NgModule }             from '@angular/core';
import { SanitizeHtmlPipe }     from './sanitize-html.pipe';
import { YoutubeSafeUrlPipe }   from './youtube-safe-url.pipe';

@NgModule({
  imports: [ ],
  exports: [
    SanitizeHtmlPipe,
    YoutubeSafeUrlPipe
  ],
  declarations: [
    SanitizeHtmlPipe,
    YoutubeSafeUrlPipe
  ],
  entryComponents: [ ]
})
export class PipesModule { }
