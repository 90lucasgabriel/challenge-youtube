// IMPORTS -----------------------------------------------------
  import { Component }                from '@angular/core';
  import { AppConfig }                from './app.config';

  import { LoaderService }            from './common/services/loader.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
// DECLARATIONS -------------------------------------------------
  public progressBarVisible: boolean = false;
  name        = 'Angular';
  themeList   = AppConfig.THEME_LIST;
  background  = '';

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
    private loader:             LoaderService) {
    // change isLoading status whenever notified
    loader
      .onLoadingChanged
      .subscribe(isLoading => {
        this.progressBarVisible = isLoading;
      });

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
}
