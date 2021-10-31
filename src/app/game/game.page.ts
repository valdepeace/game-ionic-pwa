import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-play-screen',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss']
})
export class GamePage implements OnInit {
    nick: string;
    enabled = true;
    score = 0;
    left = false;
    right = true;
    greenLight = false;
    lengthTimer = 10000;

    walkPos = 0;
    walkDivPos = 0;
    walkDirection = 10;
    walkStepTimeout: any;
    speed: any;
    stepSub: any;
    init = false;

    constructor(
        private router: Router,
        private userService: UserService,
    ) {
        this.userService.change.subscribe(() => {
            this.nick = this.userService.username;
            this.score = this.userService.score;
        });
    }

    ngOnInit() {
        if (this.userService.username === undefined) {
            this.userService.setCurrentUser('current_user');
        }
        this.nick = this.userService.username;
        this.score = this.userService.score;
    }

    green() {
        this.lengthTimer = this.getTimer(this.lengthTimer);
        const n = interval(this.lengthTimer);
        const sub = n.subscribe((data) => {
            sub.unsubscribe();
            this.step();
            this.green();
        });
    }

    getTimer(current) {
        this.greenLight = this.greenLight ? false : true;
        current = this.getNumberRandom();
        const value = this.greenLight ? current : 3000;
        return value;
    }

    moveLeft() {
        if (!this.init) {
            this.init = true;
            this.green();
            this.step();
        }
        if (this.left || !this.greenLight) {
            this.score = 0;
        } else if (this.greenLight) {
            this.score++;
        }
        this.left = true;
        this.right = false;
        this.userService.score = this.score;
        this.userService.saveUserLocalStorage();
    }

    moveRigth() {
        if (!this.init) {
            this.init = true;
            this.green();
            this.step();
        }
        if (this.right || !this.greenLight) {
            this.score = 0;
        } else if (this.greenLight) {
            this.score++;
        }
        this.left = false;
        this.right = true;
        this.userService.score = this.score;
        this.userService.saveUserLocalStorage();
    }

    getNumberRandom() {
        return (
            Math.max(10000 - this.score * 100, 2000) +
            Math.random() * (1500 + 1500) +
            -1500
        );
    }

    step() {
        const speed = 100 - this.score;
        this.speed = speed;
        const n = interval(speed);
        const sub = n.subscribe((data) => {
            if (this.greenLight) {
                this.walkPos = this.walkPos > -600 ? (this.walkPos -= 75) : 0;
            } else {
                sub.unsubscribe();
            }
        });
    }

    exit() {
        this.userService.score = this.score;
        this.userService.saveUserLocalStorage();
        this.router.navigate(['/home']);
    }
}
