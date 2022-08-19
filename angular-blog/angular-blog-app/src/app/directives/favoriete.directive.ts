import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFavoriete]'
})
export class FavorieteDirective {

  @HostBinding('class.disliked') disliked = true;
  @HostBinding('class.liked') liked = false;
  @HostBinding('class.notresponded') notresponded = false;
  @HostBinding('class.hover') hover = false;
  
  @HostListener('mouseenter') onMouseEnter()
  {
    this.hover = true;
  }
  @HostListener('mouseleave') onMouseLeave()
  {
    this.hover = false;
  }
  @Input() set appFavoriete (station : string){
    if(station == "NaN")
    {
      this.notresponded = true;
      this.disliked = false;
      this.liked = false;
    }
    else if(station == "like")
    {
      this.liked = true;
      this.disliked = false;
      this.notresponded = false;
    }
    else
    {
      this.disliked=true;
      this.liked=false;
      this.notresponded=false;
    }
  }
  constructor() { }

}
