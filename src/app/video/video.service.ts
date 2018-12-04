// IMPORTS -----------------------------------------------------
  import { Injectable }                 from '@angular/core';
  import { Observable }                 from 'rxjs';
  import { HttpClient }                 from '@angular/common/http';

  import { AppConfig }                  from '../app.config';
  import { Video }                      from './video.model';


@Injectable()
export class VideoService {
// DECLARATIONS --------------------------------------------------
  private path:                         string = `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${AppConfig.YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`;
  private entity:                       string = 'videos';
  private videoList:                    Observable<Video[]>;




// METHODS -------------------------------------------------------
  public query(): Observable<Array<Video>> {
    return this.http.get(this.path);
  }

  /*public get(id: string): Observable<Video> {
    //return this.fs.docWithIds$(`${this.entity}/${id}`);
  }
  */



// OTHERS ---------------------------------------------------------
  constructor(private http: HttpClient) {

  }

}
