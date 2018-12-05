//IMPORTS ---------------------------------------------
  import { Component, OnInit }            from '@angular/core';
  import { VideoService }                 from '../video.service';




@Component({
  selector: 'app-video-featured',
  templateUrl: './video-featured.component.html',
  styleUrls: ['./video-featured.component.scss']
})
export class VideoFeaturedComponent implements OnInit {
//DECLARATIONS ----------------------------------------- 
  public videoList: any;
  public featuredVideo: any;


//MAIN -------------------------------------------------
  private start() {
    this.service.queryDetails().subscribe(v => {
      v.subscribe(t => {
        // console.log('t', t);
        this.videoList = t.items;
        this.featuredVideo = t.items[0];
      });
    });
  }




//OTHERS -----------------------------------------------
  constructor(private service: VideoService) { }

  ngOnInit() {
    this.start();
  }

}
