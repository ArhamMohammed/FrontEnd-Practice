import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent {
  @Output() intervalFired = new EventEmitter<number>();
  interval;
  lastNumber = 0;

  onStartGame(){
    this.interval = setInterval(() => {
      this.intervalFired.emit(this.lastNumber+1);
      this.lastNumber++;
    },1000)

  }

  onPauseGame(){
    clearInterval(this.interval);
  }

}
