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




//MAIN -------------------------------------------------
  private start() {
    this.service.query().subscribe(t => console.log(t));
  }




//OTHERS -----------------------------------------------
  constructor(private service: VideoService) { }

  ngOnInit() {
    this.start();
  }

}
