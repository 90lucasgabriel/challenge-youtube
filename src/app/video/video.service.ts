// IMPORTS -----------------------------------------------------
  import { Injectable }                 from '@angular/core';
  import { Observable, combineLatest }  from 'rxjs';
  import { map, switchMap }             from 'rxjs/operators';
  import { HttpClient }                 from '@angular/common/http';

  import { AppConfig }                  from '../app.config';
  import { SearchParam }                from '../common/models/search-param.model';
  import { VideoParam }                 from '../common/models/video-param.model.';
  import { UtilService }                from '../common/services/util.service';

  import { Video }                      from './video.model';




@Injectable()
export class VideoService {
// DECLARATIONS --------------------------------------------------
  private searchUrl:                    string = `https://www.googleapis.com/youtube/v3/search?`;
  private videoUrl:                     string = `https://www.googleapis.com/youtube/v3/videos?`;




// METHODS -------------------------------------------------------
  /**
   * GET Search List
   */
  public query(searchParam: SearchParam): Observable<any> {
    const searchQueryString = this.util.ObjectToQuerystring(searchParam);
    return this.http.get(`${this.searchUrl}&${searchQueryString}`);
  }

  /**
   * GET Videos List with videos Ids
   */
  public queryDetails(searchParam: SearchParam, videoParam: VideoParam): Observable<any> {
    let videosId;

    // Return search list
    return this.query(searchParam).pipe(
      map(search => {

        videosId      = search.items.map(item => item.id.videoId);            // Create a videos id array
        videoParam.id = videosId.join();                                      // Set id list to object videoParam
        const videoQueryString = this.util.ObjectToQuerystring(videoParam);   // Convert videoParam into queryString

        // Return a video list by ids
        return this.http.get(`${this.videoUrl}${videoQueryString}`).pipe(
          map(videos => {

            // Merge results of search and videoList
            return {search, ...videos};
          })
        );
      })
    );
  }

  /**
   * GET Search List
   */
  public loadMore(searchParam: SearchParam, videoParam: VideoParam): Observable<any> {
    return this.query(searchParam);
  }



// OTHERS ---------------------------------------------------------
  constructor(
    private http: HttpClient,
    private util: UtilService) { }

}
