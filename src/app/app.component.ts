// IMPORTS -----------------------------------------------------
  import { Component, ChangeDetectorRef, OnInit, AfterViewInit, ViewChild }                from '@angular/core';
  import { Router }                   from '@angular/router';
  import { AppConfig }                from './app.config';

  import { LoaderService }            from './common/services/loader.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { VideoService } from './video/video.service';
import { ChannelParam } from './common/models/channel-param.model';
import { Globals } from './app.globals';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, AfterViewInit   {
// DECLARATIONS -------------------------------------------------
  public progressBarVisible:  boolean = false;
  public showSearch:          boolean = false;
  public name:                string  = 'Angular';
  public background:          string  = '';
  public themeList:           any     = AppConfig.THEME_LIST;
  
  public channelIdList:       any     = AppConfig.CHANNEL_ID_LIST;
  public channelParam:        ChannelParam;
  public channelList;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @ViewChild('sidenav') sidenav: MatSidenav;

  menus       = [{
      name: 'Destaques',
      icon: 'star_border',
      link: `video`
    }, {
      name: 'Vídeos',
      icon: 'play_circle_outline',
      link: `video/list`
    }
  ];





// METHODS ------------------------------------------------------
  constructor(
    private router:             Router,
    private changeDetectorRef:  ChangeDetectorRef,
    private media:              MediaMatcher,
    private loader:             LoaderService,
    private globals:            Globals,
    private videoService:       VideoService) {
    // change isLoading status whenever notified
    loader
      .onLoadingChanged
      .subscribe(isLoading => {
        this.progressBarVisible = isLoading;
      });

    // Change mode of sidenav if mobile
    this.verifyMobile(changeDetectorRef, media);
    this.startProperties();
    this.videoService.queryChannelDetails(this.channelParam).subscribe( channel => {
      this.channelList = channel.items;
    });
  }

  public changeFeaturedChannel(channel: any) {
    this.globals.CHANNEL_ID = channel.id;
    this.router.navigate(['/video', this.globals.CHANNEL_ID ]);
  }


  /**
   * Initialize properties
   */
  private startProperties(): void {
    this.channelParam = {
      key:            AppConfig.YOUTUBE_API_KEY,
      id:             this.channelIdList,
      part:           'snippet',
    };
  }

  public onActivate(event) {
    document.getElementById('main-content').scrollTo(0, 0);
  }

  public toggleBackground() {
    this.background = this.background ? '' : 'primary';
  }

  public selectTheme(theme) {
    document.body.className = '';
    document.body.classList.add(theme, 'mat-app-background');
  }

  public toggleSearch(): boolean {
    this.showSearch = !this.showSearch;
    return this.showSearch;
  }

  public submitSearch(q: string) {
    this.router.navigate(['/video', 'list', q]);
  }

  /**
   * Execute after load
   */
  public ngOnInit() { }

  /**
   * Execute after load all components
   */
  public ngAfterViewInit() {
    this.openSideNav();
    // this.location.go('company/1/branch');
  }

  private verifyMobile(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery          = media.matchMedia('(max-width: 1280px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public closeSideNav() {
    if (this.mobileQuery.matches) {
      this.sidenav.close();
    }
  }

  public openSideNav() {
    if (!this.mobileQuery.matches) {
      this.sidenav.open();
    }
  }
}
