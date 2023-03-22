import { Component, Input, OnChanges, OnInit, ViewEncapsulation, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit, OnChanges {
  @Input('srvElement') element:{type:string, name:string, content:string};

  constructor() { 
    console.log("Constructor called");
    
  }

  ngOnChanges(changes: SimpleChanges){
    console.log("NgOnChanges called");
    console.log(changes);
    
    
  }

  ngOnInit(): void {
    console.log("NgOnInit called");
    
  }

}
