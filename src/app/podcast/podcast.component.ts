import { Component, OnInit, EventEmitter } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { SeoService } from '../seo.service'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class Podcast {
  duration: number;
  id: number;
  image: string;
  link: string;
  published: string;
  source: string;
  title: string;
  tag: string;
  tags: Array<any>;
}

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.css']
})
export class PodcastComponent implements OnInit {
  public playing = false;
  public url = window.location
  public podcast: Podcast = {
    duration: 10,
    id: 10,
    image: "",
    link: "",
    published: "",
    source: "",
    title: "",
    tag: "",
    tags: [""],
  };
  public listInfo = new EventEmitter();
  public audio = new Audio();
  public usefulAudioInfo ={
    currentTime: {
      rawTimeInSeconds:0,
      hours:0,
      minutes:0,
      seconds:0
    },
    totalTime:{
      rawTimeInSeconds:0,
      hours:0,
      minutes:0,
      seconds:0
    },
    percentCompleted:0
  }
  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService
  ) { }
  public play(){
    this.audio.play();
    this.trackCurrentTime();
    console.log(this.audio.duration)
    this.setTotalTime(this.audio.duration)
    this.playing = true;

  }
  public pause(){
    this.audio.pause();
    this.playing = false;
  }
  public fastForward(sec){
    this.audio.currentTime = this.audio.currentTime + sec
  }
  public rewind(sec){
    this.audio.currentTime = this.audio.currentTime - sec
  }
  public trackCurrentTime(){
    setInterval(()=>{
      this.usefulAudioInfo.currentTime.rawTimeInSeconds = this.audio.currentTime
      this.usefulAudioInfo.currentTime.hours =Math.trunc(this.usefulAudioInfo.currentTime.rawTimeInSeconds/3600)
      this.usefulAudioInfo.currentTime.minutes = Math.trunc(this.usefulAudioInfo.currentTime.rawTimeInSeconds%3600/60)
      this.usefulAudioInfo.currentTime.seconds = Math.trunc(this.usefulAudioInfo.currentTime.rawTimeInSeconds%60)
      this.usefulAudioInfo.percentCompleted = this.usefulAudioInfo.currentTime.rawTimeInSeconds /this.usefulAudioInfo.totalTime.rawTimeInSeconds
    },50);
  }
  public setTotalTime(sec){
    this.usefulAudioInfo.totalTime.rawTimeInSeconds = sec
    this.usefulAudioInfo.totalTime.hours =Math.trunc(this.usefulAudioInfo.totalTime.rawTimeInSeconds/3600)
    this.usefulAudioInfo.totalTime.minutes = Math.trunc(this.usefulAudioInfo.totalTime.rawTimeInSeconds%3600/60)
    this.usefulAudioInfo.totalTime.seconds = Math.trunc(this.usefulAudioInfo.currentTime.rawTimeInSeconds%60)
    console.log(this.usefulAudioInfo.totalTime.rawTimeInSeconds)
  }
  public getKnobPos(){
    return ((window.innerWidth * this.usefulAudioInfo.percentCompleted) - 11) + "px"
  }
  public getTopWidth(){
    return Math.trunc(this.usefulAudioInfo.percentCompleted *100) + "%";
  }
  public setMetaTags(){
    let tagArr = [
      // {
      //   name: "twitter:card",
      //   content: "Find the best content that the web has to offer." //this should be value not content
      // },
      {
        name: "og:title",
        content: this.podcast.title + " - WickWock"
      },
      {
        name: "og:url",
        content: window.location.href
      },
      {
        name: "og:image",
        content: this.podcast.image
      },
      {
        name: "og:description",
        content: "Find the best content that the web has to offer."
      }
    ]
    this.seoService.setManyTags(tagArr)
  }
  ngOnInit() {

    this.route.params.subscribe((p:{id:string})=>{
      let url = "https://m.wickwock.com/api/podcasts/" + p.id
      this.http.get(url)
        .map(response => response.json())
        .subscribe((res)=>{
          this.audio.src = res.link;
          this.audio.load();
          this.trackCurrentTime()
          this.setTotalTime(res.duration*60)
          this.podcast = res
          this.setMetaTags();
          console.log(this.podcast)
          let dur = parseInt(res.duration) - 1
          let u= 'https://m.wickwock.com/api/podcasts/?duration='+ dur
          for(let tag of res.tags) {
            url = url + "&tags="+ tag.id
          }
          this.listInfo.emit(
            {
              url: u,
              category: "podcasts"
            }
          );
      })
    })
    this.router.events.subscribe((event) => {
      console.log(event)
      this.audio.pause()
    });
  }

}
