// IMPORTS -----------------------------------------------------
  import { Injectable }                 from '@angular/core';
  import { Observable, combineLatest }  from 'rxjs';
  import { map, switchMap }             from 'rxjs/operators';
  import { HttpClient }                 from '@angular/common/http';

  import { AppConfig }                  from '../app.config';
  import { Video }                      from './video.model';


@Injectable()
export class VideoService {
// DECLARATIONS --------------------------------------------------
  private youtubeApiKey:                string = AppConfig.YOUTUBE_API_KEY;
  private channelId:                    string = 'UCKHhA5hN2UohhFDfNXB_cvQ';
  private maxResults:                   number = 10;
  private entity:                       string = 'videos';
  private videoList:                    Observable<Video[]>;
  private searchUrl:                    string = `https://www.googleapis.com/youtube/v3/search?key=${this.youtubeApiKey}&channelId=${this.channelId}&order=date&maxResults=${this.maxResults}&part=snippet`;
  private videoUrl:                     string = `https://www.googleapis.com/youtube/v3/videos?key=${this.youtubeApiKey}&part=id,snippet,contentDetails,statistics&id=`;




// METHODS -------------------------------------------------------
  /**
   * GET Search List
   */
  public query(): Observable<any> {
    return this.http.get(this.searchUrl);
  }

  /**
   * GET Videos List with videos Ids
   */
  public queryDetails(): Observable<any> {
    let videosId;
    return this.query().pipe(
      map(v => {
        videosId = v.items.map(item => item.id.videoId);
        console.log(videosId);
        return this.http.get(`${this.videoUrl}${videosId.join()}`);
      })
    );
  }





// OTHERS ---------------------------------------------------------
  constructor(private http: HttpClient) { }

}
