import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnChanges {
  @Input({required: true}) bannerTitle: string = '';
  @Input({required: true}) bannerContent: string = '';
  @Input({required: true}) videoKey: string = 'cT4CCK3lxiI';

  sanitizer = inject(DomSanitizer);
  videoUrl = this.sanitizer.bypassSecurityTrustUrl(`https://www.youtube.com/embed/${this.videoKey}?autoplay=1&mute=1&loop=1&controls=0`);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['key']) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(`https://www.youtube.com/embed/${this.videoKey}?autoplay=1&mute=1&loop=1&controls=0`);
    }
  }
}
