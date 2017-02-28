import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @ViewChild("slider") slider: any;
  @Output() time = new EventEmitter();
  public displayTime = 0;
  constructor() { }
  resetTime(){
    $(this.slider.nativeElement).roundSlider("setValue", 0)
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    var slider = $(this.slider.nativeElement).roundSlider({
      radius: (192)/2,
      startAngle:90,
      showTooltip:false,
      handleSize:"+12",
      max:60,
      width:7,
      sliderType: "min-range",
    });
    setInterval(()=>{
      let sliderTime=$(this.slider.nativeElement).roundSlider("getValue")
      if(sliderTime !== this.displayTime){
        this.time.emit({value: sliderTime});
        this.displayTime = sliderTime;
      }
    },50);
  }
}
