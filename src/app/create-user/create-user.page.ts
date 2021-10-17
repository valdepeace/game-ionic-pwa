import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {

  nick: string;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  logForm(form){
    console.log("nick: "+ this.nick);
    this.userService.current = this.nick;
    this.router.navigate(['/play-screen']);
  }

}
