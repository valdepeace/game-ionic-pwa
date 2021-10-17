import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subject, timer } from 'rxjs';
import { UserService } from '../api/user.service';
import { takeUntil, startWith, switchMap, map, repeatWhen  } from 'rxjs/operators';
import { TimerService } from '../service/timer.service';


@Component({
  selector: 'app-play-screen',
  templateUrl: './play-screen.page.html',
  styleUrls: ['./play-screen.page.scss'],
})
export class PlayScreenPage implements OnInit {

  nick: string;
  enabled: boolean = true;
  score: number = 0;
  left: boolean = false;
  right: boolean = true;
  color: string = 'danger';
  greenLight: boolean = false;
  lengthTimer: number = 10000;
  
  
  constructor(private userService: UserService, private timerService: TimerService) { 
    this.nick = this.userService.current;
    console.log(this.nick)  
    
  }

  ngOnInit() {    
    this.green();  
  }

  green(){
    this.lengthTimer = this.getTimer(this.lengthTimer);
    let number = interval(this.lengthTimer);
    let sub = number.subscribe((data)=>{
      console.log(data);
      sub.unsubscribe();      
      this.green();
    })
  }
  //rojo cada 3seg
    //verde: 0 punto cada 10seg, 
    // cada cambio sera reducida en 100 ms hasta un minimo de 2 segundos
    // +- 1500 ms verde.
  getTimer(current){
    this.greenLight = (this.greenLight)? false: true;    
    current = this.getNumberRamdon();
    let value = (this.greenLight)? current: 3000; //green sequence light: red 3000ms    
    return value;
  }
  moveLeft(){
    if(this.left || this.greenLight)
      this.score ++;
    else
      this.score ++
    this.left = true;
    this.right = false;
    
  }

  moveRigth(){
    if(this.right || this.greenLight)
      this.score ++;
    else
      this.score ++
      this.left = false;
      this.right = true;
  }
  
  getNumberRamdon(){
    return Math.max(10000 - this.score * 100, 2000) + Math.random() * (1500 + 1500) + (-1500);

  }
}
