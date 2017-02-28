import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url = new EventEmitter();
  tab = "videos"
  time = 0;
  tags = [{id:1}]

  changeUrl(){
    let url = 'https://m.wickwock.com/api/'+this.tab+'/?duration='+this.time
    for(let tag of this.tags) {
      url = url + "&tags="+ tag.id
    }
    this.url.emit(url)
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
