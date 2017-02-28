import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  listInfo = new EventEmitter();
  tab = "videos"
  time = 0;
  tags = [{id:1}]

  changeUrl(){
    let u = 'https://m.wickwock.com/api/'+this.tab+'/?duration='+this.time
    for(let tag of this.tags) {
      u = u + "&tags="+ tag.id
    }
    this.listInfo.emit(
      {
        url: u,
        category: this.tab
      }
    )
  }
  changeTime($event){
    this.time = $event.value;
    this.changeUrl();
  }
  changeTab($event){
    this.tab = $event;
    this.changeUrl();
  }
  changeTags($event){
    this.tags = $event;
    this.changeUrl();
  }
}
