import { Injectable } from '@angular/core';
import { of, Observable, timer, Subject, fromEvent } from 'rxjs';
import { map, takeUntil, repeatWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  readonly observable$: Observable<any>;
  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();
  delay: number;
  val: number;

  constructor() {
    this.observable$ = timer(0, this.delay)
    //this.observable$ = timer(1000, 1000)
    .pipe(
      map((val) => {
        this.val = val;        
      }),
      takeUntil(this._stop),
      repeatWhen(() => this._start)
    );
  }
  init(delay: number){
    this.delay = delay;
    this.start();
  }

  start(): void {
    this._start.next();
  }

  stop(): void {
    this._stop.next();
  }
}



