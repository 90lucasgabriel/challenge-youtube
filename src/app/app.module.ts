// IMPORTS -------------------------------------
  import { BrowserModule }              from '@angular/platform-browser';
  import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';
  import { NgModule }                   from '@angular/core';
  import { HttpClientModule, HTTP_INTERCEPTORS }  from '@angular/common/http';

  import { AppRoutingModule }           from './app-routing.module';
  import { MaterialModule }             from './material/material.module';
  import { PipesModule }                from './common/pipes/pipes.module';
  import { Globals }                    from './app.globals';

  import { LoaderService }              from './common/services/loader.service';
  import { LoaderInterceptor }          from './common/interceptors/loader.interceptor';

  import { VideoModule }                from './video/video.module';

  import { AppComponent }               from './app.component';


@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    PipesModule,
    MaterialModule,

    VideoModule
  ],
  providers: [
    LoaderService,
    Globals,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      useFactory: (service: LoaderService) => new LoaderInterceptor(service),
      multi: true,
      deps: [LoaderService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
