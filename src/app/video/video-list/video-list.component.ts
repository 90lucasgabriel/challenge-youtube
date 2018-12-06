// IMPORTS ---------------------------------------------
  // ANGULAR ------------------
  import { Component, OnInit }            from '@angular/core';
  import { ActivatedRoute }               from '@angular/router';
  import { MatDialog, MatDialogConfig }   from "@angular/material";

  // CONFIG --------------------
  import { AppConfig }                    from '../../app.config';
  import { SearchParam }                  from 'src/app/common/models/search-param.model';
  import { VideoParam }                   from 'src/app/common/models/video-param.model.';

  // SERVICES ------------------
  import { VideoService }                 from '../video.service';
  import { DialogContentComponent }       from '../../material/dialog/dialog-content.component';
import { Globals } from 'src/app/app.globals';




@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
//DECLARATIONS ----------------------------------------- 
  public q:               string = '';
  public videoList:       any = null;
  public featuredVideo:   any = null;
  private nextPageToken:  string;
  public searchParam:     SearchParam;
  public videoParam:      VideoParam;
  public pageTitle:       string;

  public loadingFeatured: boolean = true;
  public loadingMore:     boolean = true;




//MAIN -------------------------------------------------
  /**
   * Start main functions
   */
  private start() {
    this.startProperties();
    this.queryDetails(this.searchParam, this.videoParam);
  }

  /**
   * Returns a detailed video list
   * @param searchParam SearchParam
   * @param videoParam VideoParam
   */
  private queryDetails(searchParam: SearchParam, videoParam: VideoParam): void {
    this.service.queryDetails(this.searchParam, this.videoParam).subscribe(search => {
      search.subscribe(videos => {
        this.videoList            = videos.items;
        this.nextPageToken        = videos.search.nextPageToken;
        this.featuredVideo        = videos.items[0];

        if (this.q !== '') {
          this.pageTitle = `Resultados para: '${this.q}' em ${this.featuredVideo.snippet.channelTitle}`;
        } else {
          this.pageTitle = `Todos os vídeos do canal ${this.featuredVideo.snippet.channelTitle}`;
        }

        this.loadingFeatured      = false;
        this.loadingMore          = false;
      });
    });
  }

  /**
   * Load more detailed videos list
   */
  public loadMore(): void {
    this.loadingMore              = true;
    const loadParam: SearchParam  = JSON.parse(JSON.stringify(this.searchParam));
    loadParam.pageToken           = this.nextPageToken;

    this.service.queryDetails(loadParam, this.videoParam).subscribe(search => {
      search.subscribe(videos => {
        console.log(videos);
        this.videoList            = this.videoList.concat(videos.items);
        this.nextPageToken        = videos.search.nextPageToken;
        this.loadingMore          = false;
      });
    });
  }

  /**
   * Change current featured video
   * @param video any
   */
  public selectFeatured(video: any): void {
    this.featuredVideo            = video;
  }




//OTHERS -----------------------------------------------
  constructor(
    private route:      ActivatedRoute,
    private dialog:     MatDialog,
    private globals:    Globals,
    private service:    VideoService) {
      this.route.params.subscribe( params => {
        if (params['q']) {
          this.q = params['q'];
          this.start();
        }
      });
  }

  /**
   * Initialize properties
   */
  private startProperties(): void {
    this.searchParam = {
      key:            AppConfig.YOUTUBE_API_KEY,
      channelId:      this.globals.CHANNEL_ID,
      maxResults:     9,
      order:          'date',
      part:           'snippet',
      type:           'video',
      q:              this.q
    };

    this.videoParam = {
      key:            this.searchParam.key,
      channelId:      this.searchParam.channelId,
      maxResults:     this.searchParam.maxResults,
      part:           'id,snippet,contentDetails,recordingDetails,statistics',
    };
  }

  /**
   * Execute when component start
   */
  ngOnInit() {
    this.start();
  }

  /**
   * Open Dialog (modal) with video and informations
   * @param video any
   */
  public openDialog(video: any) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      width:  '650px',
      height: '550px',
      data:   video
    };

    this.dialog.open(DialogContentComponent, dialogConfig);
  }
}
