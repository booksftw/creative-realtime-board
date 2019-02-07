import { Component, OnInit, Input } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import * as $ from 'node_modules/jquery'

@Component({
  selector: 'app-youtube-frame',
  templateUrl: './youtube-frame.component.html',
  styleUrls: ['./youtube-frame.component.css']
})
export class YoutubeFrameComponent implements OnInit {
  // @Input('userYoutubeLink') userYoutubeLink
  userYoutubeLink
  constructor(
    private sanitizer: DomSanitizer,
  ) {

    // this.userYoutubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.userYoutubeLink)
  }

  ngOnInit() {
    console.log(this.userYoutubeLink, ' user youtue link')
    // const frame: any = document.querySelector('#nzYoutubeFrame')
    // frame.src = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/watch?v=KqJSiBkETXY')
    const x = $('#nzFrameEntry').append(`
    <iframe width="560" height="315" 
    src=${this.userYoutubeLink} 
    frameborder="0" allow="accelerometer; autoplay; 
    encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `)

    console.log(x, 'jq')
  }

}
