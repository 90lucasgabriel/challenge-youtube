import { YoutubeSafeUrlPipe } from './youtube-safe-url.pipe';

describe('YoutubeSafeUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new YoutubeSafeUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
