import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'
import { YoutubeFrameComponent } from './youtube-frame/youtube-frame.component'

@Component({
  selector: 'app-youtube-upload',
  templateUrl: './youtube-upload.component.html',
  styleUrls: ['./youtube-upload.component.css']
})
export class YoutubeUploadComponent implements OnInit {

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef

  constructor(
    private sanitizer: DomSanitizer,
    private el: ElementRef,
    private resolver: ComponentFactoryResolver,

  ) {
  }

  ngOnInit() {}

  onYoutubeInput(input) {
    const userYoutubeLink = input.value
    const youtubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(
      userYoutubeLink
    )

    const youtubeFrameFactory = this.resolver.resolveComponentFactory(YoutubeFrameComponent)
    const youtubeFrame = this.entry.createComponent(youtubeFrameFactory)
    youtubeFrame.instance.userYoutubeLink = userYoutubeLink

  }

}
