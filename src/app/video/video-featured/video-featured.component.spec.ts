import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFeaturedComponent } from './video-featured.component';

describe('VideoFeaturedComponent', () => {
  let component: VideoFeaturedComponent;
  let fixture: ComponentFixture<VideoFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
