//IMPORTS ---------------------------------------------
  // ANGULAR -------------------------
  import { Component, OnInit }            from '@angular/core';
  import { VideoService }                 from '../video.service';

  // CONFIG --------------------------
  import { AppConfig }                    from '../../app.config';
  import { SearchParam }                  from 'src/app/common/models/search-param.model';
  import { VideoParam }                   from 'src/app/common/models/video-param.model.';
import { Globals } from 'src/app/app.globals';
import { Router } from '@angular/router';




@Component({
  selector: 'app-video-featured',
  templateUrl: './video-featured.component.html',
  styleUrls: ['./video-featured.component.scss']
})
export class VideoFeaturedComponent implements OnInit {
//DECLARATIONS ----------------------------------------- 
  public videoList:       any = null;
  public featuredVideo:   any = null;
  private nextPageToken:  string;
  public searchParam:     SearchParam;
  public videoParam:      VideoParam;

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
    private router:     Router,
    private globals:    Globals,
    private service:    VideoService) {
      router.events.subscribe((val) => {
        this.start();
      });
  }

  /**
   * Initialize properties
   */
  private startProperties(): void {
    this.searchParam = {
      key:            AppConfig.YOUTUBE_API_KEY,
      channelId:      this.globals.CHANNEL_ID,
      maxResults:     4,
      order:          'date',
      part:           'snippet',
      type:           'video',
    };

    this.videoParam = {
      key:            this.searchParam.key,
      channelId:      this.globals.CHANNEL_ID,
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
}
