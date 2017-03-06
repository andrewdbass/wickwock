import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() listItem;
  @Output() share = new EventEmitter();
  private showPlayButton = false;
  constructor() {}
  shareItem(item){
    this.share.emit(item)
  }
  ngOnInit() {
    if (this.listItem.source.indexOf("Youtube") !== -1) {
      this.showPlayButton = true;
    }
    // console.log(this.listItem)
  }

}
