import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ClipboardService } from 'ng2-clipboard/ng2-clipboard';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  @Input() url:string;
  @Input() category:string;
  @Output() done = new EventEmitter();
  constructor(
    private clipboard:ClipboardService
  ) { }
  private close(){
    this.done.emit(true);
  }
  private shareToFacebook(){
    console.log(this.url)
    let shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" +this.url
    window.open( shareUrl,'popUpWindow');
    this.close();
    // <a class = "button-link" href = "https://www.facebook.com/sharer/sharer.php?u=http%3A//renegademba.club/?referral={{signup.id}}" target="_blank">

  }
  private shareToTwitter(){
    console.log(this.url)
    let shareUrl = "https://twitter.com/home?status=I%20just%20found%20this%20cool%20" + this.category.toLowerCase() + "%20on%20Wick Wock%20" +this.url
    window.open( shareUrl,'popUpWindow');
    this.close();

  }
  private copyToClipboard(){
    this.clipboard.copy(this.url);
    this.close();
  }
  ngOnInit() {
  }

}
