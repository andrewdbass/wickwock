import { Component, OnInit, EventEmitter } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { SeoService } from '../seo.service'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


export class Video {
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
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  public url = window.location
  public video: Video = {
    duration: 10,
    id: 10,
    image: "",
    link: "",
    published: "",
    source: "",
    title: "",
    tag: "",
    tags: [""]
  }
  public listInfo = new EventEmitter();
  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private seoService: SeoService
  ) { }
  public setMetaTags(){
    let tagArr = [
      // {
      //   name: "twitter:card",
      //   content: "Find the best content that the web has to offer." //this should be value not content
      // },
      {
        name: "og:title",
        content: this.video.title + " - WickWock"
      },
      {
        name: "og:url",
        content: window.location.href
      },
      {
        name: "og:image",
        content: this.video.image
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
      let url = "https://m.wickwock.com/api/videos/" + p.id
      this.http.get(url)
        .map(response => response.json())
        .subscribe((res)=>{
          console.log(res)
          this.video = res
          this.video.tag = res.tags[0].name
          console.log(this.video)
          this.setMetaTags();
          let dur = parseInt(res.duration) - 1
          let u= 'https://m.wickwock.com/api/videos/?duration='+ dur
          for(let tag of res.tags) {
            u = u + "&tags="+ tag.id
          }
          this.listInfo.emit({
            url: u,
            category: "videos"
          });
      })
    })
  }

}
